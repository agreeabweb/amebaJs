import {AbstractAxureView} from "./AbstractAxureView";
import {TadPanel} from "../../TadPanel";

class RadioButtonView extends AbstractAxureView {

    private hasChecked = false

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: any): void {
        this.bindEventToTarget($("#" + this.id + "_input"), actionName, action);
    }

    public SetCheckState(check: boolean): void {
        if(check) {
            this.$thisNode.find("input[type='checkbox']").prop("checked", true);
        } else {
            this.$thisNode.find("input[type='checkbox']").prop("checked", false);
        }
    }

    public GetWidgetText(): string {
        return this.$thisNode.find(".text span").text();
    }

    public layout(obj: any): void {
        let dom, objects;

        dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        if(obj.style.fontSize != undefined) {
            dom.find(".text span").css("font-size", obj.style.fontSize);
        }

        objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                let objPaths, idMap, id, childDom, size, location;

                objPaths = this.host.getAxureObjPaths();
                idMap = objects[i].id;
                id = objPaths[idMap].scriptId;
                childDom = $("#" + id);
                size = objects[i].style.size;
                location = objects[i].style.location;
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

export {RadioButtonView};