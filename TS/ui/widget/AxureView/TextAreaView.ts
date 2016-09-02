import {AbstractAxureView} from "./AbstractAxureView";
import {TadPanel} from "../../TadPanel";

class TextAreaView extends AbstractAxureView {

    constructor(id:string, host:TadPanel, thisNode:JQuery) {
        super(id, host, null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        this.bindEventToTarget($("#" + this.id + "_input"), actionName, action);
    }

    public SetWidgetFormText(text: string): void {
        this.$thisNode.find("textarea").text(text);
    }

    public layout(obj: any): void {
        let dom, textArea;

        dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        textArea = $("#" + this.id + " textarea");
        textArea.css("width", obj.style.size.width).css("height", obj.style.size.height);
        if(obj.style.fontSize != undefined) {
            textArea.css("font-size", obj.style.fontSize);
        }
    }
}

export {TextAreaView};