import {IMissionFactory} from "./IMissionFactory";
import {FlowMission} from "./FlowMission";
import {Command} from "../Command";
import {CommandMission} from "./CommandMission";
import {EngineEvent} from "../../const/EngineEvent";
import {HashMap} from "../../lib/HashMap";
import {IMission} from "./IMission";
import {Context} from "../../runtime/Context";
import config from "../../configure/config";

/**
 * Created by Oliver on 2016-08-16 0016.
 */
export class AxureMissionFactory implements IMissionFactory{


    public getMission(type:string,path: any):IMission{
        if(type === "Flow" || type === "flow")
        {
            return new FlowMission(path, null/**inArgMap */);
        }
        else if(type === "linkWindow"){

            let inputParams = new HashMap();
            inputParams.put("path", path.target.url);

            let command:Command = new Command(EngineEvent.COMMAND_OpenPanel,null,null,null,inputParams);
            let mission = new CommandMission(command);
            return mission;
        }
        else if(type === "setFunction") {

            let expr = path.expr.subExprs[0];
            let inputParams = new HashMap();
            inputParams.put("methodName", expr.functionName);
            inputParams.put("controllerId", expr.arguments[0].value[0]);
            var methodArgs = [];
            for(var i = 1; i < expr.arguments.length; i++) {
                methodArgs.push(expr.arguments[i].value);
            }
            inputParams.put("methodArgs", methodArgs);

            let command: Command = new Command(EngineEvent.COMMAND_ControllerCallMethod, null, null, null, inputParams);
            let mission = new CommandMission(command);
            return mission;
        }
        return null;
    }
}