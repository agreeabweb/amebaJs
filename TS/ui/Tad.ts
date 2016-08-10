/**
 * Created by Oliver on 2016-08-03 0003.
 */
import {TadPanel} from "./TadPanel";
import {DeskTop} from "./DeskTop";
import {Context} from "../runtime/Context";
import GUID from "../lib/GUID";
import {ServiceObj}from "../const/ServiceObj";
import {HashMap} from "../lib/HashMap";
import {DataModel} from "../runtime/DataModel";
import {UIConst}from"../const/UIConst";

export class Tad {

    private id:string = "";
    private host:DeskTop;
    private panels:HashMap = new HashMap();
    private tadContext:Context;
    private path:string;
    private dm:DataModel = new DataModel();

    constructor(id:string, host:DeskTop, path:string) {
        this.id = id;
        this.host = host;
        this.path = path;
    }

    public getContext():Context {
        return this.tadContext;
    }

    public addPanel(id:string, panel:TadPanel):void {
        this.panels[id] = panel;
    }

    public getPanel(id:string):TadPanel {
        return this.panels[id];
    }

    public getDataModel():DataModel {
        return this.dm;
    }

    public start():void {
        // 0.Context
        var contextId = GUID();
        this.tadContext = this.host.getContext().createChild("tadContext_" + contextId);
        this.tadContext.set("Tad", this);
        //1.DM
        this.tadContext.set(UIConst.DataModel, this.dm);

        //3.启动流程
        Context.prototype.setCurrent(this.tadContext);
        let pif = this.tadContext.get(ServiceObj.ProcessInstanceFactory);

        // var tadPath = "/AppFramework_2013B/trade/test/bug0041/Bug0041.tad";

        pif.pitsByCreatingPI(this.tadContext, this.path, function (segment) {
            segment.start(null, function (processResult) {
                console.log("执行PITS回调");

                var outArgMap = processResult.getOutArgMap();
                //处理出参

                console.log("出口信息：" + processResult.getEnd());
                console.log("结束PITS: " + segment.getId());
            });
        });
    }

    public getId(): string {
        return this.id;
    }
}