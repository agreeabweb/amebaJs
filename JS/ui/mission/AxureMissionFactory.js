define(["require", "exports", "./FlowMission", "../Command", "./CommandMission", "../../const/EngineEvent", "../../lib/HashMap"], function (require, exports, FlowMission_1, Command_1, CommandMission_1, EngineEvent_1, HashMap_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-16 0016.
     */
    var AxureMissionFactory = (function () {
        function AxureMissionFactory() {
        }
        AxureMissionFactory.prototype.getMission = function (type, path) {
            if (type === "Flow" || type === "flow") {
                return new FlowMission_1.FlowMission(path, null /**inArgMap */);
            }
            else if (type === "linkwindow") {
                var inputParams = new HashMap_1.HashMap();
                var data = {
                    msg: EngineEvent_1.EngineEvent.COMMAND_OpenPanel,
                    param: inputParams,
                };
                var command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, null, null, null, data);
                var mission = new CommandMission_1.CommandMission(command);
                return mission;
            }
            return null;
        };
        return AxureMissionFactory;
    }());
    exports.AxureMissionFactory = AxureMissionFactory;
});
//# sourceMappingURL=AxureMissionFactory.js.map