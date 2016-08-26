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


    public getMission(type:string,path: any): IMission[]{
        var missions = [];
        if(type === "Flow" || type === "flow")
        {
            missions.push(new FlowMission(path, null/**inArgMap */));
        }
        else if(type === "linkWindow"){

            let inputParams = new HashMap();
            inputParams.put("path", path.target.url);

            let command:Command = new Command(EngineEvent.COMMAND_OpenPanel,null,null,null,inputParams);
            let mission = new CommandMission(command);
            missions.push(mission);
        }
        else if(type === "setFunction") {

            let expr = path.expr.subExprs[0];
            let inputParams = new HashMap();
            let exprArgs, args = [];

            if(expr.exprType === "fcall") {
                inputParams.put("methodName", expr.functionName);
                exprArgs = expr.arguments;
                for(let i = 0; i < exprArgs.length; i++) {
                    // 调用方法的主体
                    if(exprArgs[i].exprType === "pathLiteral") {
                        if(exprArgs[i].isThis === true) {

                        } else {
                            inputParams.put("controllerId", (exprArgs[i].value)[0]);
                        }
                    } else if(exprArgs[i].exprType === "stringLiteral") {
                        args.push(exprArgs[i].value);
                    } else if(exprArgs[i].exprType === "fcall") {
                        let inputParamsInside = new HashMap();
                        let exprArgsInside, argsInsid = [];
                        inputParamsInside.put("methodName", exprArgs[i].functionName);
                        exprArgsInside = exprArgs[i].arguments;
                        for(let j = 0; j < exprArgsInside.length; j++) {
                            if(exprArgsInside[j].exprType === "pathLiteral") {
                                if(exprArgsInside[j].isThis === true) {

                                } else {
                                    inputParamsInside.put("controllerId", (exprArgsInside[j].value)[0]);
                                }
                            }
                        }
                        inputParamsInside.put("methodArgs", argsInsid);
                        let command: Command = new Command(EngineEvent.COMMAND_ControllerCallMethod, null, null, function(result) {
                            args.push(result.outArgs.result);
                            inputParams.put("methodArgs", args);

                        }, inputParamsInside);
                        let mission: CommandMission = new CommandMission(command);
                        missions.push(mission);
                    }
                }
                inputParams.put("methodArgs", args);

                let command: Command = new Command(EngineEvent.COMMAND_ControllerCallMethod, null, null, null, inputParams);
                let mission: CommandMission = new CommandMission(command);
                missions.push(mission);
            }
        }
        return missions;
    }
}