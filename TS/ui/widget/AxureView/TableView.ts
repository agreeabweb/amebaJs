import {AbstractAxureView} from "./AbstractAxureView";
import {TadPanel} from "../../TadPanel";
import {AEvent} from "../../eventpub/Event";

class TableView extends AbstractAxureView {
    private eTargetId: string; // 触发事件的不一定是table，可能是table_cell

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        this.bindEventToTarget($("#" + this.eTargetId), actionName, action);
    }

    public SetCheckState(value: string): void {
        let targetId, target;
        if(this.eTargetId) {
            targetId = this.eTargetId;
        } else {
            targetId = this.id;
        }

        target = $("#" + targetId);

        if(value === "true") {
            target.addClass("selected");
            if(AEvent.checkEventIsExsit(targetId, "onSelect")) {
                AEvent.fireEvent(targetId, "onSelect");
            }
        } else if(value === "false") {
            target.removeClass("selected");
            if(AEvent.checkEventIsExsit(targetId, "onUnselect")) {
                AEvent.fireEvent(targetId, "onUnselect");
            }
        } else {
            if(target.hasClass("selected")) {
                target.removeClass("selected");
                if(AEvent.checkEventIsExsit(targetId, "onUnselect")) {
                    AEvent.fireEvent(targetId, "onUnselect");
                }
            } else {
                target.addClass("selected");
                if(AEvent.checkEventIsExsit(targetId, "onSelect")) {
                    AEvent.fireEvent(targetId, "onSelect");
                }
            }
        }
    }

    public GetWidgetText(): string {
        return $("#" + this.eTargetId + " .text span").text();
    }

    public layout(obj): void {
        let dom, objects;

        dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                this.layoutChild(objects[i]);
            }
        }
    }

    public layoutChild(obj: any): void {
        let objPaths, idMap, id, childDom, size, location, interactionMap, objects;

        objPaths = this.host.getAxureObjPaths();
        idMap = obj.id;
        id = objPaths[idMap].scriptId;
        childDom = $("#" + id);
        size = obj.style.size;
        location = obj.style.location;
        interactionMap = obj.interactionMap;  // 表格单元的事件
        
        if(interactionMap != undefined) {
            this.eTargetId = id;
            for(let actionName in interactionMap) {
                this.bindEvent(actionName, interactionMap[actionName]);
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

        objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                this.layoutChild(objects[i]);
            }
        }
    }
}

export {TableView};