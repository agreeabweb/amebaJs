import {AbstractView} from "../AbstractView";
import {TadPanel} from "../TadPanel";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class TextView extends AbstractView {

    constructor(id:string, host:TadPanel, thisNode:JQuery) {
        super(id, host, thisNode);
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


    modelChanged(val:any):void {

    }

    updateModel(val:any):void {

    }
}