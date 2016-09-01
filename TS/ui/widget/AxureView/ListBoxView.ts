import {AbstractAxureView} from "./AbstractAxureView";
import {TadPanel} from "../../TadPanel";

class ListBoxView extends AbstractAxureView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        this.bindEventToTarget($("#" + this.id + " select"), actionName, action);
    }

    public GetSelectedOption(): string {
        var options = $("#" + this.id + " select option");
        for(let i = 0; i < options.length; i++) {
            if($(options[i]).prop("selected") === true) {
                return $(options[i]).val();
            }
        }
        return null;
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        var list = $("#" + this.id + " select");
        list.css("width", obj.style.size.width).css("height", obj.style.size.height);
        if(obj.style.fontSize != undefined) {
            list.css("font-size", obj.style.fontSize);
        }
    }
}

export {ListBoxView};