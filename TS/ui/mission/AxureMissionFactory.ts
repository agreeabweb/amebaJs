import {IMissionFactory} from "./IMissionFactory";
import {FlowMission} from "./FlowMission";
import {Command} from "../Command";
import {CommandMission} from "./CommandMission";
import {EngineEvent} from "../../const/EngineEvent";
import {HashMap} from "../../lib/HashMap";
import {IMission} from "./IMission";

/**
 * Created by Oliver on 2016-08-16 0016.
 */
export class AxureMissionFactory implements IMissionFactory{


    public getMission(type:string,path:string):IMission{
        if(type === "Flow" || type === "flow")
        {
            return new FlowMission(path, null/**inArgMap */);
        }else if(type ==="linkwindow"){
            let inputParams = new HashMap();
            let data = {
                msg:EngineEvent.COMMAND_OpenPanel,
                param: inputParams,
                // callback: callback,
                // context: Context.getCurrent()
            };
            let command:Command = new Command(EngineEvent.COMMAND_OpenPanel,data);
            let mission = new CommandMission(command);
            return mission;
        }
        return null;
    }
}