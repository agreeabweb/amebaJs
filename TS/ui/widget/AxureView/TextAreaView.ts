import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class TextAreaView extends AbstractView {

    constructor(id:string, host:TadPanel, thisNode:JQuery) {
        super(id, host, null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        var view = this;
        if(actionName === "OnClick") {
            $("#" + this.id + "_input").on("click", function() {
                console.log("onClick");
            });
        } else if(actionName === "onFocus") {
            $("#" + this.id + "_input").on("focus", function() {
                console.log("onFocus");
                if(action.cases.length > 1) {
                    throw "同一事件只能有一个case";
                } else {
                    var actions = action.cases[0].actions;
                    for(var i = 0; i < actions.length; i++) {
                        view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i]));
                    }
                    
                }
            });
        } else if(actionName === "onTextChange") {
            $("#" + this.id + "_input").on("change", function() {
                console.log("onTextChange");
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

    public SetWidgetFormText(text: string): void {
        this.$thisNode.find("input[type='text']").val(text);
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        var textArea = $("#" + this.id + " textarea");
        textArea.css("width", obj.style.size.width).css("height", obj.style.size.height);
        if(obj.style.fontSize != undefined) {
            textArea.css("font-size", obj.style.fontSize);
        }
    }
}

export {TextAreaView};