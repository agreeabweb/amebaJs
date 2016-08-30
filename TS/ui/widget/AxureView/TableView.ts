import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class TableView extends AbstractView {
    private eTargetId: string; // 触发事件的不一定是table，可能是table_cell

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any, id): void {
        var view = this, targetId;

        targetId = id || this.id;
        this.eTargetId = id;
        if(actionName === "onClick") {
            
            $("#" + targetId).css("cursor", "pointer");
            $("#" + targetId).on("click", function() {
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

    public SetCheckState(value) {
        var targetId;
        if(this.eTargetId) {
            targetId = this.eTargetId;
        } else {
            targetId = this.id;
        }

        if(value) {
            $("#" + targetId).addClass("selected");
        } else {
            $("#" + targetId).removeClass("selected");
        }
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        var objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                this.layoutChild(objects[i]);
            }
        }
    }

    public layoutChild(obj) {
        var objPaths, idMap, id, childDom, size, location, interactionMap;

        objPaths = this.host.getAxureObjPaths();
        idMap = obj.id;
        id = objPaths[idMap].scriptId;
        childDom = $("#" + id);
        size = obj.style.size;
        location = obj.style.location;
        interactionMap = obj.interactionMap;  // 表格单元的事件
        
        if(interactionMap != undefined) {
            for(let actionName in interactionMap) {
                this.bindEvent(actionName, interactionMap[actionName], id);
            }
        }

        childDom.css("position", "absolute");
        if(size != undefined) {
            childDom.css("width", size.width).css("height", size.height);
        }
        if(obj.type === "richTextPanel") {
            childDom.css("top", 0).css("left", 0);
            $(childDom.find("p")[0]).css("line-height", size.height + "px");
        } else if(location != undefined) {
            childDom.css("top", location.y).css("left", location.x);
        }

        if(obj.style.fontSize != undefined) {
            childDom.find(".text span").css("font-size", obj.style.fontSize);
        }

        var objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                this.layoutChild(objects[i]);
            }
        }
    }
}

export {TableView};