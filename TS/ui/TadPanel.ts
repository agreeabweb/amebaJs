import {HashMap} from "../lib/HashMap";
import {EventHub} from "../runtime/EventHub";
import {Tad} from "./Tad";
import {IView}from "./IView";
import {IMission}from "./mission/IMission";
import {DataModel} from "../runtime/DataModel";
import {Context} from "../runtime/Context";
import {ResourceManager} from "../resource/ResourceManager";
import {ProcessInstanceThreadSegment} from "../engine/process/ProcessInstanceThreadSegment";
import {ServiceObj} from "../const/ServiceObj";
import {PanelCompositeFactoryRegistry} from "./PanelCompositeFactoryRegistry";
import {IPanelCompositeFactory} from "./IPanelCompositeFactory";
import config from "../configure/config";
import {ViewControl} from "./widget/ViewControl";

declare var $axure;

/**
 * Created by Oliver on 2016-08-03 0003.
 */
export class TadPanel {

    private widgetRegistry:HashMap = new HashMap();
    private id:string = "";
    private parentId:string = "";
    private host:Tad;
    private entryToViews:HashMap = new HashMap();
    private path:string;
    private taskQueue:Array<IMission> = new Array<IMission>();
    private state:string = "idle";
    private panelContext:Context;
    private processInstanceThreadSegment;
    /*busy,idle*/
    private target:string;//根据target获取面板工厂
    private targetArgMap:HashMap;

    private configTarget(target:string,targetArgMap:HashMap){
        this.target = target;
        this.targetArgMap = targetArgMap;
    }

    constructor(pits: ProcessInstanceThreadSegment, host:Tad, parentId:string, id:string, path:string) {
        this.processInstanceThreadSegment = pits;
        this.host = host;
        this.parentId = parentId;
        this.id = id;
        this.host.addPanel(id, this);
        this.path = path;
        this.panelContext = this.host.getContext().createChild(this.id);
        let dm:DataModel = this.host.getDataModel();
        dm.notifyThis(this.doUpdateViews,this);
    }

    public getContext():Context {
        return this.panelContext;
    }

    public  getHost():Tad {
        return this.host;
    }

    public getProcessInstanceThreadSegment(): ProcessInstanceThreadSegment {
        return this.processInstanceThreadSegment;
    }

    public isBusy():boolean {
        return this.state === "busy";
    }

    public idle():void {
        this.state = "idle";
    }

    public busy():void {
        this.state = "busy";
    }
    
    public registerEntryView(name:string, view:any) {
        let views = this.entryToViews.get(name);
        if (views == null) {
            views = new Array();
        }
        views.push(view);
        this.entryToViews.put(name,views);
    }

    public registerWidget(id:string, view:any):void {
        this.widgetRegistry.put(id, view);
    }

    public getWidget(id:string) {
        return this.widgetRegistry.get(id);
    }

    public start():void {
        var panel = this;
        this.getContext().set("Panel", this);
        var ctx = this.getContext();
        var target = this.target;
        // 0.获取html
        ResourceManager.getResourceFile(this.path, function(html) {
            let div, domContent;
            div = $("<div>");
            div.html(html);

            // 通过Axure生成
            if(config.UIType === "Axure" || config.UIType === "axure") {
                domContent = $(div).find("#base");
            } 
            // 一体式设计
            else {
                domContent = $(div).find("#contentPanel");
            }

            // 展现
            let registry : PanelCompositeFactoryRegistry = ctx.get(ServiceObj.PanelCompositeFactoryRegistry);
            var scripts;
            if(target)
            {
                let factory:IPanelCompositeFactory = registry.getPanelFactory(target);
                let pane:JQuery = factory.getPanelComposite();
                pane.prepend(domContent);
                scripts = $(div).find("script");
                for(let i = 0; i < scripts.length; i++) {
                    $("body").append(scripts[i]);
                }
            }else{
                console.log(domContent);
                $("body").prepend(domContent);
                scripts = $(div).find("script");
                for(let i = 0; i < scripts.length; i++) {
                    $("body").append(scripts[i]);
                }
            }

            // 解析出view
            // 要先展现再解析，否则Axure的data读不出
            if(config.UIType === "Axure" || config.UIType === "axure") {
                panel.translateAxureHTML($axure.data);
            } 
            else {
                panel.translateNormalHTML(domContent);
            }

        });
    }

    public translateAxureHTML(obj) {
        var objs, objPaths;
    
        objs = obj.page.diagram.objects;
        objPaths = obj.objectPaths;

        for(let i = 0; i < objs.length; i++) {
            let idMap, id, type, location, size, interactionMap, view;

            idMap = objs[i].id;
            id = objPaths[idMap].scriptId;
            type = objs[i].type;
            location = objs[i].style.location;
            size = objs[i].style.size;
            interactionMap = objs[i].interactionMap;

            // 通过ViewControl类来统一创建view
            view = ViewControl.buildView(type, id, this, null, $("#" + id));

            if(view != undefined) {

                view.setId(id);
                view.setLocation(location);
                view.setSize(size);

                if(interactionMap != undefined) {
                    for(let actionName in interactionMap) {
                        let action = interactionMap[actionName];
                        let cases = action.cases;
                        for(let j = 0; j < cases.length; j++) {
                            let actions = cases[j].actions;
                            for(let k = 0; k < actions.length; k++) {
                                view.bindEvent(actionName, actions[k]);
                            }
                        }
                    }
                }
                // 组件布局控制
                view.layout(objs[i], objPaths);
            
                // 向当前panel中注册该组件
                this.registerWidget(id, view);
            }
        }
    }

    public translateNormalHTML(dom: JQuery) {
        var id, prop, children, view;

        id = $(dom).attr("id");
        prop = $(dom).attr("prop");

        if(prop != undefined) {
            let feature, dm, events;

            prop = JSON.parse(prop);
            feature = prop.feature;
            dm = prop.dm;
            events = prop.event;
            
            // 通过ViewControl类来统一创建view
            view = ViewControl.buildView(feature, id, this, dm, $(dom));

            if(view != undefined) {
                // 向当前panel中注册该组件
                this.registerWidget(id, view);
                // 处理event
                if(events != undefined && events.length != 0) {
                    for(let i = 0; i < events.length; i++) {
                        view.bindEvent(events[i].eventType, events[i].flowType, events[i].path);
                    }
                }
                // 注册dm
                if(dm != undefined) {
                    this.registerEntryView(dm, view);
                }
            }
        }

        // 解析该元素的孩子节点
        children = $(dom).children();
        if(children.length != 0) {
            for(let i = 0; i < children.length; i++) {
                this.translateNormalHTML(children[i]);
            }
        }
    }
    
    public getViewsByEntry(name:string):IView[] {
        return this.entryToViews.get(name);
    }

    public queueTaskPack(mission:IMission) {

        // if (this.isBusy()) {
            this.taskQueue.push(mission);   // busy和idle状态下的处理？？？
        //     return;
        // }
        this.state = "busy";
        let current:IMission = this.taskQueue.shift();
        while (current != null) {
            // 这里同步还是异步看具体情况
            setTimeout(current.execute(this, function () {

            }), 0);
            current = this.taskQueue.shift();
        }
        this.state = "idle";
    }

    public doUpdateViews(key,old,now) {
        //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))
        console.log("dm变化，刷新UI..." + key);
        let views = this.entryToViews.get(key);
        let i:number;
        let size:number = views.length;
        for(i=0;i<size;i++)
        {
            let v:IView = views[i];
            v.modelChanged(now);
        }
    }

}