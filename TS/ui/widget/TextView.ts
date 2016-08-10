import {AbstractView} from "../AbstractView";
import {TadPanel} from "../TadPanel";
import {UIConst}from "../../const/UIConst";

/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class TextView extends AbstractView {

    constructor(id:string, host:TadPanel,dmEntry:string, thisNode:JQuery) {
        super(id, host,dmEntry, thisNode);
        if(this.dmEntry!=null)
        {
            this.$thisNode.on("change",function(){
                this.updateModel(this.dmEntry,this.$thisNode.val());
            });
        }
    }

    bindEvent(eventType:string, flowType:string, path:string):void {
        var view = this;
        if (eventType === "click") {
            view.getNode().on("click", function () {
                alert("click");
                view.getHost().queueTaskPack(view.getMission(flowType, path));
            });
        }
        if(eventType === "change") {
            view.getNode().on("change", function () {
                alert("change");
                view.getHost().queueTaskPack(view.getMission(flowType, path));
            });
        }
    }
}