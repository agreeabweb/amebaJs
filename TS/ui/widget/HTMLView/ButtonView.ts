import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class ButtonView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    bindEvent(eventType:string,flowType:string,path:string):void{
        let view = this; //避免this指代错误
        if(eventType === "click")
        {
            view.getNode().on("click",function(){
                view.getHost().queueTaskPack(view.getMission(flowType,path, view.id));
            });
        }

    }
}