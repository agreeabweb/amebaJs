define(["require", "exports", "./FlowMission", "../Command", "./CommandMission", "../../const/EngineEvent", "../../lib/HashMap"], function (require, exports, FlowMission_1, Command_1, CommandMission_1, EngineEvent_1, HashMap_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-16 0016.
     */
    var AxureMissionFactory = (function () {
        function AxureMissionFactory() {
        }
        AxureMissionFactory.prototype.getMission = function (type, path, targetId) {
            var missions = [], inputParams, command, mission;
            inputParams = new HashMap_1.HashMap();
            if (type === "Flow" || type === "flow") {
                missions.push(new FlowMission_1.FlowMission(path, null /**inArgMap */));
            }
            else if (type === "linkWindow") {
                inputParams = new HashMap_1.HashMap();
                inputParams.put("path", path.target.url);
                command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, null, null, null, inputParams);
                mission = new CommandMission_1.CommandMission(command);
                missions.push(mission);
            }
            else if (type === "setFunction") {
                var expr = void 0, exprArgs = void 0, args_1 = [];
                inputParams = new HashMap_1.HashMap();
                expr = path.expr.subExprs[0];
                if (expr.exprType === "fcall") {
                    inputParams.put("methodName", expr.functionName);
                    exprArgs = expr.arguments;
                    for (var i = 0; i < exprArgs.length; i++) {
                        // 调用方法的主体
                        if (exprArgs[i].exprType === "pathLiteral") {
                            if (exprArgs[i].isThis === true) {
                                inputParams.put("controllerId", targetId);
                            }
                            else {
                                inputParams.put("controllerId", (exprArgs[i].value)[0]);
                            }
                        }
                        else if (exprArgs[i].exprType === "stringLiteral") {
                            args_1.push(exprArgs[i].value);
                        }
                        else if (exprArgs[i].exprType === "fcall") {
                            var inputParamsInside = void 0, exprArgsInside = void 0, argsInside = [];
                            inputParamsInside = new HashMap_1.HashMap();
                            inputParamsInside.put("methodName", exprArgs[i].functionName);
                            exprArgsInside = exprArgs[i].arguments;
                            for (var j = 0; j < exprArgsInside.length; j++) {
                                if (exprArgsInside[j].exprType === "pathLiteral") {
                                    if (exprArgsInside[j].isThis === true) {
                                        inputParamsInside.put("controllerId", targetId);
                                    }
                                    else {
                                        inputParamsInside.put("controllerId", (exprArgsInside[j].value)[0]);
                                    }
                                }
                            }
                            inputParamsInside.put("methodArgs", argsInside);
                            command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_ControllerCallMethod, null, null, function (result) {
                                args_1.push(result.outArgs.result);
                                inputParams.put("methodArgs", args_1);
                            }, inputParamsInside);
                            mission = new CommandMission_1.CommandMission(command);
                            missions.push(mission);
                        }
                    }
                    inputParams.put("methodArgs", args_1);
                    command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_ControllerCallMethod, null, null, null, inputParams);
                    mission = new CommandMission_1.CommandMission(command);
                    missions.push(mission);
                }
            }
            return missions;
        };
        return AxureMissionFactory;
    }());
    exports.AxureMissionFactory = AxureMissionFactory;
});
//# sourceMappingURL=AxureMissionFactory.js.map