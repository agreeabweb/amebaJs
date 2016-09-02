import {TadPanel} from "./TadPanel";
import {HashMap} from "../lib/HashMap";
import {IView} from "./IView";
import {DataModel} from "../runtime/DataModel";
import {UIConst}from "../const/UIConst";
import {ServiceObj} from "../const/ServiceObj";
import {IMission} from "./mission/IMission";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export abstract class AbstractView implements IView{

    protected host:TadPanel;
    protected id:string;
    protected $thisNode: JQuery;
    protected missions:HashMap = new HashMap();
    protected dmEntry:string;

    constructor(id:string,host:TadPanel,dmEntry:string,thisNode:JQuery)
    {
        this.id = id;
        this.host =host;
        this.$thisNode=thisNode;
        this.dmEntry = dmEntry;
        if(this.dmEntry!=null){
            this.bindModel(this.dmEntry);
        }
    }

    bindModel(name:string):void{
        this.host.registerEntryView(name,this);
    }

    modelChanged(val:any):void {
        this.$thisNode.val(val);
    }

    updateModel(key:string, val:any):void {
        let dm:DataModel = this.host.getContext().get(UIConst.DataModel);
        dm.doSetWithNotify(key,val,false);
    }

    //---------------------------------------------------getter-----------------------------------------------
    public getHost(): TadPanel {
        return this.host;
    }
    public getNode(): JQuery {
        return this.$thisNode;
    }
    protected getMission(type:string,path:string, targetId: string):IMission{
        return this.getHost().getContext().get(ServiceObj.MissionFactory).getMission(type,path, targetId);
    }
    
    //---------------------------------------抽象方法-----------------------------------------------------------
    abstract bindEvent(type:string, name:string, path:string):void;
}