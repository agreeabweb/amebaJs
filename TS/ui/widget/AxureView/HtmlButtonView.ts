import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class HtmlButtonView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        var view = this;
        if(actionName === "onClick") {
            this.$thisNode.css("cursor", "pointer");
            $("#" + this.id + "_input").on("click", function() {
                console.log("onClick");
                if(action.cases.length > 1) {
                    throw "同一事件只能有一个case";
                } else {
                    var actions = action.cases[0].actions;
                    for(var i = 0; i < actions.length; i++) {
                        view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i], view.id));
                    }
                    
                }
            });
        }
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