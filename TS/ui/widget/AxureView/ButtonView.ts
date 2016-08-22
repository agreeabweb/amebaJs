import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class ButtonView extends AbstractView {

    private location;
    private size;

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }


    public bindEvent(actionName: string, action: string): void {
        if(actionName === "onClick") {
            $("#" + this.id + "_input").on("click", function() {
                console.log("onClick");
            });
        }
    }

    public setSize(size): void {
        this.size = size;
    }

    public setLocation(location): void {
        this.location = location;
    }

    public layout(): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute");
        dom.css("width", this.size.width);
        dom.css("height", this.size.height);
        dom.css("left", this.location.x);
        dom.css("top", this.location.y);

        $(dom.find("p")[0]).css("line-height", this.size.height + "px");
    }
}

export {ButtonView};