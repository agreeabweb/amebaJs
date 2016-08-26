import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class CheckboxView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        var view = this;

        if(actionName === "onSelect" || actionName === "onUnselect") {
            $("#" + this.id + "_input").on("click", function() {
                console.log("onClick");
                let checked = $(this).prop("checked");
                if(checked) {
                    console.log("onSelected");
                    if(action.cases.length > 1) {
                        throw "同一事件只能有一个case";
                    } else {
                        var actions = action.cases[0].actions;
                        for(var i = 0; i < actions.length; i++) {
                            view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i]));
                        }
                        
                    }
                } else {
                    console.log("onUnselected");
                    if(action.cases.length > 1) {
                        throw "同一事件只能有一个case";
                    } else {
                        var actions = action.cases[0].actions;
                        for(var i = 0; i < actions.length; i++) {
                            view.getHost().queueTaskPack(view.getMission(actions[i].action,actions[i]));
                        }
                        
                    }
                }
            });
        }
    }

    public SetCheckState(check: boolean): void {
        if(check) {
            this.$thisNode.find("input[type='checkbox']").attr("checked", "true");
        } else {
            this.$thisNode.find("input[type='checkbox']").removeAttr("checked");
        }
    }

    public GetWidgetText(): string {
        return this.$thisNode.find(".text span").text();
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        if(obj.style.fontSize != undefined) {
            dom.find(".text span").css("font-size", obj.style.fontSize);
        }

        var objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                var objPaths = this.host.getAxureObjPaths();
                var idMap = objects[i].id;
                var id = objPaths[idMap].scriptId;
                var childDom = $("#" + id);
                var size = objects[i].style.size;
                var location = objects[i].style.location;
                childDom.css("position", "absolute");
                if(size != undefined) {
                    childDom.css("width", size.width).css("height", size.height);
                }
                if(location != undefined) {
                    childDom.css("top", location.y - obj.style.location.y).css("left", location.x - obj.style.location.x);
                }
            }
        }
    }
}

export {CheckboxView};