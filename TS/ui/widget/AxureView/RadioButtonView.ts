import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class RadioButtonView extends AbstractView {
    private location;
    private size;

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: string): void {
        if(actionName === "onSelect" || actionName === "onUnselect") {
            $("#" + this.id + "_input").on("click", function() {
                let checked = $(this).prop("checked");
                if(checked) {
                    console.log("onSelected");
                } else {
                    console.log("onUnselected");
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

export {RadioButtonView};