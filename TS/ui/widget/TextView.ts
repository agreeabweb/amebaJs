import {AbstractView} from "../AbstractView";
import {TadPanel} from "../TadPanel";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class TextView extends AbstractView {

    constructor(id:string,host:TadPanel)
    {
        super(id,host);
    }

    bindEvent(type:string,event:string,path:string):void{
        if(evemt === "click")
        {
            this.$thisNode.on("click",function(){
                this.host.queueTaskPack(this.getMission(type,path));
            });
        }

    }
}