define(["require", "exports", "../../runtime/Context", "../../runtime/EventHub", "../../const/EngineEvent"], function (require, exports, Context_1, EventHub_1, EngineEvent_1) {
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
            else {
                throw "Not Supported UI: " + path;
            }
        };
        UIStepLogiclet.prototype.callABF = function (pits, inputParams, callback) {
            var data = {
                param: inputParams,
                callback: callback,
                context: Context_1.Context.getCurrent()
            };
            EventHub_1.EventHub.publish(EngineEvent_1.EngineEvent.ENGINE_EVENT + "OpenPanel", data);
        };
        UIStepLogiclet.prototype.callAUF = function (pits, uiPath, mapping, inputParams, callback) {
        };
        return UIStepLogiclet;
    }());
    exports.UIStepLogiclet = UIStepLogiclet;
});
//# sourceMappingURL=UIStepLogiclet.js.map