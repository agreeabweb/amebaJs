import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class ButtonView extends AbstractView {

    private location;
    private size;

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }


    public bindEvent(actionName: string, action: any): void {
        var view = this;
        if(actionName === "onClick") {
            this.$thisNode.css("cursor", "pointer");
            this.$thisNode.on("click", function() {
                console.log("onClick");
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