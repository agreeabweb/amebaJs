import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class TextView extends AbstractView {

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
                        view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i], view.id));
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
                        view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i], view.id));
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

        var input = $("#" + this.id + "_input");
        input.css("width", "inherit").css("height", "inherit");
        if(obj.style.fontSize != undefined) {
            input.css("font-szie", obj.style.fontSize);
        }
    }
}

export {TextView};