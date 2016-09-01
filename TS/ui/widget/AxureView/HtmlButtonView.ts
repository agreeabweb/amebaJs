import {AbstractAxureView} from "./AbstractAxureView";
import {TadPanel} from "../../TadPanel";

class HtmlButtonView extends AbstractAxureView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        this.bindEventToTarget($(this.$thisNode), actionName, action);
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);
        
        var input = $("#" + this.id + "_input");
        input.css("width", "inherit").css("height", "inherit");
        if(obj.style.fontSize != undefined) {
            input.css("font-size", obj.style.fontSize);
        }
    }
}

export {HtmlButtonView};