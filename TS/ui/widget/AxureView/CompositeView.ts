import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class CompositeView extends AbstractView {
    private location;
    private size;

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: string): void {
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
    }
}

export {CompositeView};