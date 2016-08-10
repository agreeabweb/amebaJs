import {HashMap} from "../lib/HashMap";
import {EventHub} from "../runtime/EventHub";
import {Tad} from "./Tad";
import {IView}from "./IView";
import {IMission}from "./mission/IMission";
import {DataModel} from "../runtime/DataModel";

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


    constructor(host:Tad, parentId:string, id:string, path:string) {
        this.host = host;
        this.parentId = parentId;
        this.id = id;
        this.host.addPanel(id, this);
        this.path = path;
        let dm:DataModel = this.host.getDataModel();
        dm.notifyThis(this.doUpdateViews,this);
    }

    public registerEntryView(name:string, view:any) {
        let views = this.entryToViews.get(name);
        if (views == null) {
            views = new Array();
        }
        views.push(view);
    }

    public registerWidget(id:string, view:any):void {
        this.widgetRegistry.put(id, view);
    }

    public getWidget(id:string) {
        return this.widgetRegistry.get(id);
    }

    public start():void {
        // 0.获取html

        // 1.解析出view

        // 2.展现
    }

    public getViewsByEntry(name:string):IView[] {
        return this.entryToViews.get(name);
    }

    public queueTaskPack(mission:IMission) {

        mission.execute(function () {

        });
    }

    public doUpdateViews(key,old,now) {
        //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))
        console.log("dm变化，刷新UI..." + name);
        let views = this.entryToViews.get(name);
        views.forEach((v, i, a) => function (v) {
            let v1:IView = v;
            v1.modelChanged(now);
        });
    }

}