import {TadPanel} from "./TadPanel";
import {HashMap} from "../lib/HashMap";
import {IView} from "./IView";
import {FlowMission} from "./mission/FlowMission";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export abstract class AbstractView implements IView{

    private host:TadPanel;
    private id:string;
    private thisNode: JQuery;
    private missions:HashMap = new HashMap();

    constructor(id:string,host:TadPanel,thisNode:JQuery)
    {
        this.id = id;
        this.host =host;
        this.thisNode=thisNode;
    }

    bindModel(name:string):void{
        this.host.registerEntryView(name,this);
    }

    protected getMission(type:string,path:string){
        if(type === "Flow" || type === "flow")
        {
            return new FlowMission();
        }
    }

    public getHost(): TadPanel {
        return this.host;
    }
    public getNode(): JQuery {
        return this.thisNode;
    }

    abstract bindEvent(type:string,name:string,path:string):void;
    abstract modelChanged(val:any):void;
    abstract updateModel(val:any):void;
}