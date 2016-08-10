define(["require", "exports", "./component/ControllerCallMethod_1.0", "./component/StringJoint_1.0", "./component/SetParameter_1.0", "../runtime/Context", "../runtime/EventHub", "../const/EngineEvent"], function (require, exports, ControllerCallMethod, StringJoint, SetParameter, Context_1, EventHub_1, EngineEvent_1) {
    "use strict";
    function call(componentElement, callback) {
        var name, inArg;
        name = componentElement.getName();
        inArg = componentElement.getInArgMap();
        if (name === "ShowMessage") {
            // ShowMessage.execute(inArg, function(result) {
            //     callback(result);
            // });
            var data = {
                msg: EngineEvent_1.EngineEvent.ENGINE_EVENT + name,
                param: inArg,
                callback: callback,
                context: Context_1.Context.getCurrent()
            };
            EventHub_1.EventHub.publish(EngineEvent_1.EngineEvent.ENGINE_EVENT + name, data);
        }
        else if (name === "ControllerCallMethod") {
            ControllerCallMethod.execute(inArg, function (result) {
                callback(result);
            });
        }
        else if (name === "StringJoint") {
            StringJoint.execute(inArg, function (result) {
                callback(result);
            });
        }
        else if (name === "SetParameter") {
            SetParameter.execute(inArg, function (result) {
                callback(result);
            });
        }
        // let callback = function () {
        //     alert("callback");
        // }
    }
    exports.call = call;
    ;
});
//# sourceMappingURL=Command.js.map