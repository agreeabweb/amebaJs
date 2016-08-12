import {HashMap} from "../lib/HashMap";
import {EventHub} from "../runtime/EventHub";
import {Tad} from "./Tad";
import {IView}from "./IView";
import {IMission}from "./mission/IMission";
import {DataModel} from "../runtime/DataModel";
import {Context} from "../runtime/Context";
import {ResourceManager} from "../resource/ResourceManager";
import {TextView} from "./widget/TextView";
import {ButtonView} from "./widget/ButtonView";
import {TreeView} from "./widget/TreeView";

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
    /*busy,idle*/

    constructor(host:Tad, parentId:string, id:string, path:string) {
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
        // 0.获取html
        ResourceManager.getResourceFile(this.path, function(html) {
            let div, scripts;
            div = $("<div>");
            div.html(html);

            // 1.解析出view
            panel.translateHTML($(div).find("#contentPanel"));
            // 2.展现
            $("body").prepend($(div).find("#contentPanel"));
            scripts = $(div).find("script");
            for(let i = 0; i < scripts.length; i++) {
                $("body").append(scripts[i]);
            }

        });
    }

    public translateHTML(dom: JQuery) {
        var id, prop, children, view;

        id = $(dom).attr("id");
        prop = $(dom).attr("prop");

        if(prop != undefined) {
            let feature, dm, events;

            prop = JSON.parse(prop);
            feature = prop.feature;
            dm = prop.dm;
            events = prop.event;

            //判断view类型
            if(feature === "Text") {
                view = new TextView(id, this, dm, $(dom));
            } else if(feature === "Button") {
                view = new ButtonView(id, this, $(dom));
            } else if(feature === "Tree") {
                view = new TreeView(id,this, $(dom));
            }

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
                this.translateHTML(children[i]);
            }
        }
    }
    
    public getViewsByEntry(name:string):IView[] {
        return this.entryToViews.get(name);
    }

    public queueTaskPack(mission:IMission) {

        if (this.isBusy()) {
            this.taskQueue.push(mission);
            return;
        }
        this.state = "busy";
        let current:IMission = this.taskQueue.shift();
        while (current != null) {
            // 这里同步还是异步看具体情况
            setTimeout(current.execute(function () {

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