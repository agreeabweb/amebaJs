import {HashMap} from "../lib/HashMap";
import {EventHub} from "../runtime/EventHub";
import {Tad} from "./Tad";
import {IView}from "./IView";
import {IMission}from "./mission/IMission";
import {DataModel} from "../runtime/DataModel";
import {Context} from "../runtime/Context";
import {ProcessInstanceThreadSegment} from "../engine/process/ProcessInstanceThreadSegment";
import {UIConst} from "../const/UIConst";
import {IPageParser} from "./pageparsers/IPageParser";



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

    private axureObjPaths;

    private configTarget(target:string, targetArgMap:HashMap) {
        this.target = target;
        this.targetArgMap = targetArgMap;
    }

    constructor(pits:ProcessInstanceThreadSegment, host:Tad, parentId:string, id:string, path:string) {
        this.processInstanceThreadSegment = pits;
        this.host = host;
        this.parentId = parentId;
        this.id = id;
        this.host.addPanel(id, this);
        this.path = path;
        this.panelContext = this.host.getContext().createChild(this.id);
        let dm:DataModel = this.host.getDataModel();
        dm.notifyThis(this.doUpdateViews, this);
    }

    public getPath():string {
        return this.path;
    }

    public getContext():Context {
        return this.panelContext;
    }

    public  getHost():Tad {
        return this.host;
    }

    public getProcessInstanceThreadSegment():ProcessInstanceThreadSegment {
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
        this.entryToViews.put(name, views);
    }

    public registerWidget(id:string, view:any):void {
        this.widgetRegistry.put(id, view);
    }

    public getWidget(id:string) {
        var widget;
        widget = this.widgetRegistry.get(id);
        if(widget == undefined) {
            widget = this.widgetRegistry.get(this.axureObjPaths[id].scriptId);
        }
        return widget;
    }

    public setAxureObjPaths(paths: Object): void {
        this.axureObjPaths = paths;
    }

    public start():void {
        var panel = this;
        this.getContext().set(UIConst.Panel, this);
        var ctx = this.getContext();
        var target = this.target;
        let parser:IPageParser = this.getContext().get(UIConst.PageParser);
        parser.parsePage(this.target, this.getContext());
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

    public doUpdateViews(key, old, now) {
        //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))
        console.log("dm变化，刷新UI..." + key);
        let views = this.entryToViews.get(key);
        let i:number;
        let size:number = views.length;
        for (i = 0; i < size; i++) {
            let v:IView = views[i];
            v.modelChanged(now);
        }
    }

}