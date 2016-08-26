define(["require", "exports", "./FlowMission", "../Command", "./CommandMission", "../../const/EngineEvent", "../../lib/HashMap"], function (require, exports, FlowMission_1, Command_1, CommandMission_1, EngineEvent_1, HashMap_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-16 0016.
     */
    var AxureMissionFactory = (function () {
        function AxureMissionFactory() {
        }
        AxureMissionFactory.prototype.getMission = function (type, path) {
            var missions = [];
            if (type === "Flow" || type === "flow") {
                missions.push(new FlowMission_1.FlowMission(path, null /**inArgMap */));
            }
            else if (type === "linkWindow") {
                var inputParams = new HashMap_1.HashMap();
                inputParams.put("path", path.target.url);
                var command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, null, null, null, inputParams);
                var mission = new CommandMission_1.CommandMission(command);
                missions.push(mission);
            }
            else if (type === "setFunction") {
                var expr = path.expr.subExprs[0];
                var inputParams_1 = new HashMap_1.HashMap();
                var exprArgs = void 0, args_1 = [];
                if (expr.exprType === "fcall") {
                    inputParams_1.put("methodName", expr.functionName);
                    exprArgs = expr.arguments;
                    for (var i = 0; i < exprArgs.length; i++) {
                        // 调用方法的主体
                        if (exprArgs[i].exprType === "pathLiteral") {
                            if (exprArgs[i].isThis === true) {
                            }
                            else {
                                inputParams_1.put("controllerId", (exprArgs[i].value)[0]);
                            }
                        }
                        else if (exprArgs[i].exprType === "stringLiteral") {
                            args_1.push(exprArgs[i].value);
                        }
                        else if (exprArgs[i].exprType === "fcall") {
                            var inputParamsInside = new HashMap_1.HashMap();
                            var exprArgsInside = void 0, argsInsid = [];
                            inputParamsInside.put("methodName", exprArgs[i].functionName);
                            exprArgsInside = exprArgs[i].arguments;
                            for (var j = 0; j < exprArgsInside.length; j++) {
                                if (exprArgsInside[j].exprType === "pathLiteral") {
                                    if (exprArgsInside[j].isThis === true) {
                                    }
                                    else {
                                        inputParamsInside.put("controllerId", (exprArgsInside[j].value)[0]);
                                    }
                                }
                            }
                            inputParamsInside.put("methodArgs", argsInsid);
                            var command_1 = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_ControllerCallMethod, null, null, function (result) {
                                args_1.push(result.outArgs.result);
                                inputParams_1.put("methodArgs", args_1);
                            }, inputParamsInside);
                            var mission_1 = new CommandMission_1.CommandMission(command_1);
                            missions.push(mission_1);
                        }
                    }
                    inputParams_1.put("methodArgs", args_1);
                    var command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_ControllerCallMethod, null, null, null, inputParams_1);
                    var mission = new CommandMission_1.CommandMission(command);
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