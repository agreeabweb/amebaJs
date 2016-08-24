import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class TableView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: string): void {
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
        var objPaths = this.host.getAxureObjPaths();
        var idMap = obj.id;
        var id = objPaths[idMap].scriptId;
        var childDom = $("#" + id);
        var size = obj.style.size;
        var location = obj.style.location;
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