import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";
import {AEvent} from "../../eventpub/Event";

abstract class AbstractAxureView extends AbstractView {

    constructor(id:string,host:TadPanel,dmEntry:string,thisNode:JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEventToTarget(target: JQuery, actionName: string, action: any):void {
        var view = this;
        if(actionName === "onClick") {
            target.css("cursor", "pointer");
            target.on("click", function() {
                console.log("onClick");
                view.dealwithEvent(target, actionName, action, view);
            });
        } else if(actionName === "onTextChange") {
            target.on("change", function() {
                console.log("onTextChange");
                view.dealwithEvent(target, actionName, action, view);
            });
        } else if(actionName === "onSelect") {
            if(view.$thisNode.hasClass("radio_button") || view.$thisNode.hasClass("checkbox")) {
                target.on("change", function() {
                    console.log("onSelect");
                    view.dealwithEvent(target, actionName, action, view);
                });
            } else {
                AEvent.addEvent(target.attr("id"), "onSelect", function() {
                    console.log("onSelect");
                    view.dealwithEvent(target, actionName, action, view);
                });
            }
        } else if(actionName === "onSelectionChange") {
            target.on("change", function() {
                console.log("onSelectionChange");
                view.dealwithEvent(target, actionName, action, view);
            });
        }
    }

    public dealwithEvent(target: JQuery, actionName: string, action: any, view) {
        if(target.hasClass("table_cell") || target.hasClass("treenode")) {
            view.eTargetId = target.attr("id");
        }

        if(action.cases.length > 1) {
            throw "同一事件只能有一个case";
        } else {
            var actions = action.cases[0].actions;
            for(var i = 0; i < actions.length; i++) {
                view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i], view.id));
            }
        }
    }

    abstract bindEvent(actionName: string, action: any): void;
}

export {AbstractAxureView}