define(["require", "exports", "../../runtime/Context", "../../runtime/EventHub", "../../const/EngineEvent", "../../ui/Command"], function (require, exports, Context_1, EventHub_1, EngineEvent_1, Command_1) {
    "use strict";
    var UIStepLogiclet = (function () {
        function UIStepLogiclet() {
        }
        UIStepLogiclet.prototype.call = function (pits, inputParams, callback) {
            var path, check;
            path = inputParams.get("path");
            if (path == null || path.length === 0) {
                throw "NULL UI PATH";
            }
            check = path.split(".")[1];
            if (check === "abf" || check === "abf4a") {
                this.callABF(pits, inputParams, callback);
            }
            else if (check === "auf") {
                this.callAUF(pits, path, inputParams.get("mapping"), inputParams, callback);
            }
            else if (check === "html") {
                this.callHTML(pits, inputParams, callback);
            }
            else {
                throw "Not Supported UI: " + path;
            }
        };
        UIStepLogiclet.prototype.callHTML = function (pits, inputParams, callback) {
            inputParams.put("ProcessInstanceThreadSegment", pits);
            var command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, Context_1.Context.getCurrent(), null, callback, inputParams);
            // let data = {
            //     msg:EngineEvent.COMMAND_OpenPanel,
            //     param: inputParams,
            //     callback: callback,
            //     context: Context.getCurrent()
            // };
            EventHub_1.EventHub.publish(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, command);
        };
        UIStepLogiclet.prototype.callABF = function (pits, inputParams, callback) {
            var command = new Command_1.Command(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, Context_1.Context.getCurrent(), null, callback, inputParams);
            // let data = {
            //     msg: EngineEvent.ENGINE_EVENT + "OpenPanel",
            //     param: inputParams,
            //     callback: callback,
            //     context: Context.getCurrent()
            // };
            EventHub_1.EventHub.publish(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, command);
        };
        UIStepLogiclet.prototype.callAUF = function (pits, uiPath, mapping, inputParams, callback) {
        };
        return UIStepLogiclet;
    }());
    exports.UIStepLogiclet = UIStepLogiclet;
});
//# sourceMappingURL=UIStepLogiclet.js.map