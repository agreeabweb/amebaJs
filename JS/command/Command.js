define(["require", "exports", "./component/StringJoint_1.0", "./component/SetParameter_1.0", "../runtime/Context", "../runtime/EventHub", "../const/EngineEvent", "../ui/Command"], function (require, exports, StringJoint, SetParameter, Context_1, EventHub_1, EngineEvent_1, Command_1) {
    "use strict";
    function call(componentElement, callback) {
        var name, inArg;
        name = componentElement.getName();
        inArg = componentElement.getInArgMap();
        if (name === "ShowMessage" || name === "ControllerCallMethod") {
            // ShowMessage.execute(inArg, function(result) {
            //     callback(result);
            // });
            var command = new Command_1.Command(EngineEvent_1.EngineEvent.ENGINE_EVENT + name, Context_1.Context.getCurrent(), null, callback, inArg);
            //
            // let data = {
            //     msg:EngineEvent.ENGINE_EVENT + name,
            //     param: inArg,
            //     callback: callback,
            //     context: Context.getCurrent()
            // };
            EventHub_1.EventHub.publish(EngineEvent_1.EngineEvent.ENGINE_EVENT + name, command);
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