import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class ButtonView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }


    public bindEvent(actionName: string, action: any): void {
        var view = this;
        if(actionName === "onClick") {
            this.$thisNode.css("cursor", "pointer");
            this.$thisNode.on("click", function() {
                console.log("onClick");
                if(action.cases.length > 1) {
                    throw "同一事件只能有一个case";
                } else {
                    var actions = action.cases[0].actions;
                    for(var i = 0; i < actions.length; i++) {
                        view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i]));
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

        $(dom.find("p")[0]).css("line-height", obj.style.size.height + "px");

        if(obj.style.fontSize != undefined) {
            dom.find(".text span").css("font-size", obj.style.fontSize);
        }
    }
}

export {ButtonView};