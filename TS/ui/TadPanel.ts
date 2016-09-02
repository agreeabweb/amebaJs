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
import {CommandMission} from "./mission/CommandMission";



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

    private configTarget(target:string, targetArgMap:HashMap): void {
        this.target = target;
        this.targetArgMap = targetArgMap;
    }

    public start():void {
        let panel, ctx, target, parser: IPageParser;

        panel = this;
        this.getContext().set(UIConst.Panel, this);
        ctx = this.getContext();
        target = this.target;
        parser = this.getContext().get(UIConst.PageParser);
        parser.parsePage(this.target, this.getContext());
    }

    public queueTaskPack(mission:any): void {

        if(mission instanceof Array) {
            for(let i = 0; i < mission.length; i++) {
                this.taskQueue.push(mission[i]); 
            }
        } else {
            // if (this.isBusy()) {
            this.taskQueue.push(mission);   // busy和idle状态下的处理？？？
            //     return;
            // }
        }
        
        this.state = "busy";
        let current:IMission = this.taskQueue.shift();
        while (current != null) {
            // 这里同步还是异步看具体情况
            let callback: Function;
            if(current instanceof CommandMission) {
                callback = (<CommandMission>current).getCommandCallback();
            }
            setTimeout(current.execute(this, callback), 0);
            current = this.taskQueue.shift();
        }
        this.state = "idle";
    }

    public registerEntryView(name:string, view:any): void {
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

    public doUpdateViews(key: string, old: string, now: string): void {
        //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))
        // console.log("dm变化，刷新UI..." + key);
        let views, size;

        views = this.entryToViews.get(key);
        size = views.length;
        for (let i = 0; i < size; i++) {
            let v:IView = views[i];
            v.modelChanged(now);
        }
    }

    public busy():void {
        this.state = "busy";
    }

    //--------------------------------------------------getter--------------------------------------------------
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
    public getAxureObjPaths(): Object {
        return this.axureObjPaths;
    }
    public getWidget(id:string): IView {
        let widget;
        widget = this.widgetRegistry.get(id);
        if(widget == undefined) {
            widget = this.widgetRegistry.get(this.axureObjPaths[id].scriptId);
        }
        return widget;
    }
    public getViewsByEntry(name:string):IView[] {
        return this.entryToViews.get(name);
    }

    //--------------------------------------------------setter-----------------------------------------------------
    public setAxureObjPaths(paths: Object): void {
        this.axureObjPaths = paths;
    }

    //-------------------------------------------------checker----------------------------------------------------
    public isBusy():boolean {
        return this.state === "busy";
    }

    public idle():void {
        this.state = "idle";
    }

}