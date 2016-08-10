import {AbstractView} from "../AbstractView";
import {TadPanel} from "../TadPanel";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class TextView extends AbstractView {

    constructor(id:string, host:TadPanel, thisNode:JQuery) {
        super(id, host, thisNode);
    }

    bindEvent(type:string, event:string, path:string):void {
        if (event === "click") {
            this.$thisNode.on("click", function () {
                this.host.queueTaskPack(this.getMission(type, path));
            });
        }
    }


    modelChanged(val:any):void {

    }

    updateModel(val:any):void {

    }
}