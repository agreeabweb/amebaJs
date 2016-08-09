/**
 * Created by Oliver on 2016-08-03 0003.
 */
import {TadPanel} from "./TadPanel";
import {DeskTop} from "./DeskTop";
import {Context} from "../runtime/Context";
import GUID from "../lib/GUID";
import {ServiceObj}from　"../const/ServiceObj";

export class Tad {

    private id:string = "";
    private host:DeskTop;
    private panels = {};
    private tadContext:Context;
    private path:string;

    constructor(id:string,host:DeskTop,path:string) {
        this.id = id;
        this.host = host;
        this.path = path;
    }

    public addPanel(id:string, panel:TadPanel):void  {
        this.panels[id] = panel;
    }

    public getPanel(id:string):TadPanel {
        return this.panels[id];
    }

    public start():void {
        //0.创建DM

        //1.启动流程
        var contextId = GUID();
        this.tadContext = this.host.getContext().createChild("tadContext_" + contextId);
        Context.prototype.setCurrent(this.tadContext);

        let pif = this.tadContext.get(ServiceObj.ProcessInstanceFactory);

        // var tadPath = "/AppFramework_2013B/trade/test/bug0041/Bug0041.tad";
        
        pif.pitsByCreatingPI(this.tadContext, this.path, function(segment) {
            segment.start(null, function(processResult) {
                console.log("执行PITS回调");

                var outArgMap = processResult.getOutArgMap();
                //处理出参

                console.log("出口信息：" + processResult.getEnd());
                console.log("结束PITS: " + segment.getId());
            });
        });
    }
}