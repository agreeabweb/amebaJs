define(["require", "exports", "../../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var ControllerCallMethod = (function () {
        function ControllerCallMethod() {
        }
        ControllerCallMethod.prototype.handleCommand = function (command, callback) {
            var controllerId, methodName, method, methodArgs, tad, panel, widget;
            if (command.getExtraData() instanceof HashMap_1.HashMap) {
                controllerId = command.getExtraData().get("controllerId");
                methodName = command.getExtraData().get("methodName");
                methodArgs = command.getExtraData().get("methodArgs");
            }
            else {
                controllerId = command.getExtraData().get("controllerId").getContent();
                methodName = command.getExtraData().get("methodName").getContent();
                methodArgs = command.getExtraData().get("methodArgs").getContent();
                methodArgs = JSON.parse(methodArgs);
            }
            panel = command.getContext().get("Panel");
            widget = panel.getWidget(controllerId);
            method = widget[methodName];
            method.apply(widget, methodArgs);
        };
        return ControllerCallMethod;
    }());
    exports.ControllerCallMethod = ControllerCallMethod;
});
//# sourceMappingURL=ControllerCallMethod.js.map