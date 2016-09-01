import {AbstractAxureView} from "./AbstractAxureView";
import {TadPanel} from "../../TadPanel";

class TextView extends AbstractAxureView {

    constructor(id:string, host:TadPanel,dmEntry:string, thisNode:JQuery) {
        super(id, host,dmEntry, thisNode);

        var view = this;
        if(this.dmEntry!=null)
        {
            this.$thisNode.on("change",function(){
                view.updateModel(view.dmEntry,view.$thisNode.val());
            });
        }
    }

    public bindEvent(actionName: string, action: any): void {
        this.bindEventToTarget($("#" + this.id + "_input"), actionName, action);
    }

    public SetWidgetFormText(text: string): void {
        this.$thisNode.find("input[type='text']").val(text);
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        var input = $("#" + this.id + "_input");
        input.css("width", "inherit").css("height", "inherit");
        if(obj.style.fontSize != undefined) {
            input.css("font-szie", obj.style.fontSize);
        }
    }
}

export {TextView};