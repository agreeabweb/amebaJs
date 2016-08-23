import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class CheckboxView extends AbstractView {
    private location;
    private size;

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        var view = this;
        if(actionName === "onSelected") {
            this.$thisNode.on("selected", function() {
                console.log("onSelected");
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

        else if(actionName === "onUnselected") {
            this.$thisNode.on("unselected", function() {
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

    public setSize(size): void {
        this.size = size;
    }

    public setLocation(location): void {
        this.location = location;
    }

    public SetCheckState(check: boolean): void {
        if(check) {
            this.$thisNode.find("input[type='checkbox']").attr("checked", "true");
        } else {
            this.$thisNode.find("input[type='checkbox']").removeAttr("checked");
        }
    }

    public layout(objs, objPaths): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute");
        dom.css("width", this.size.width);
        dom.css("height", this.size.height);
        dom.css("left", this.location.x);
        dom.css("top", this.location.y);

        var objects = objs.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                var idMap = objects[i].id;
                var id = objPaths[idMap].scriptId;
                var childDom = $("#" + id);
                var size = objects[i].style.size;
                var location = objects[i].style.location;
                childDom.css("position", "absolute");
                if(size != undefined) {
                    childDom.css("width", size.width);
                    childDom.css("height", size.height);
                }
                if(location != undefined) {
                    childDom.css("top", location.y - this.location.y);
                    childDom.css("left", location.x - this.location.x);
                }
            }
        }
    }
}

export {CheckboxView};