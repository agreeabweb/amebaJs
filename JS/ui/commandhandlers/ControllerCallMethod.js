define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var ControllerCallMethod = (function () {
        function ControllerCallMethod() {
        }
        ControllerCallMethod.prototype.handleCommand = function (command, callback) {
            var controllerId, methodName, method, methodArgs, tad, panel, widget;
            controllerId = command.getExtraData().get("controllerId").getContent();
            methodName = command.getExtraData().get("methodName").getContent();
            methodArgs = command.getExtraData().get("methodArgs").getContent();
            methodArgs = JSON.parse(methodArgs);
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