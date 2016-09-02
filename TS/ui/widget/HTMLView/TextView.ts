import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";
import {UIConst}from "../../../const/UIConst";

/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class TextView extends AbstractView {

    constructor(id:string, host:TadPanel,dmEntry:string, thisNode:JQuery) {
        super(id, host,dmEntry, thisNode);

        let view = this;
        if(this.dmEntry!=null)
        {
            this.$thisNode.on("change",function(){
                view.updateModel(view.dmEntry,view.$thisNode.val());
            });
        }
    }

    bindEvent(eventType:string, flowType:string, path:string):void {
        let view = this;
        if (eventType === "click") {
            view.getNode().on("click", function () {
                alert("click");
                view.getHost().queueTaskPack(view.getMission(flowType, path, view.id));
            });
        }
        if(eventType === "change") {
            view.getNode().on("change", function () {
                alert("change");
                view.getHost().queueTaskPack(view.getMission(flowType, path, view.id));
            });
        }
    }
}