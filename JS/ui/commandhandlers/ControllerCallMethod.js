define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var ControllerCallMethod = (function () {
        function ControllerCallMethod() {
        }
        ControllerCallMethod.prototype.handleCommand = function (command, callback) {
            var controllerId, methodName, method, methodArgs, tad, panel, widget, result, end;
            controllerId = command.getExtraData().get("controllerId");
            if (!(typeof controllerId === "string")) {
                controllerId = controllerId.getContent();
            }
            methodName = command.getExtraData().get("methodName");
            if (!(typeof methodName === "string")) {
                methodName = methodName.getContent();
            }
            methodArgs = command.getExtraData().get("methodArgs");
            if (!(methodArgs instanceof Array)) {
                methodArgs = methodArgs.getContent();
                methodArgs = JSON.parse(methodArgs);
            }
            panel = command.getContext().get("Panel");
            widget = panel.getWidget(controllerId);
            method = widget[methodName];
            result = method.apply(widget, methodArgs);
            end = "success";
            if (callback != null) {
                callback({
                    end: end,
                    outArgs: {
                        result: result
                    }
                });
            }
        };
        return ControllerCallMethod;
    }());
    exports.ControllerCallMethod = ControllerCallMethod;
});
//# sourceMappingURL=ControllerCallMethod.js.map