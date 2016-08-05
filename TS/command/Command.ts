
// import * as ShowMessage from "./component/ShowMessage_1.0";
// import * as ControllerCallMethod from "./component/ControllerCallMethod_1.0";
// import * as StringJoint from "./component/StringJoint_1.0";
// import * as SetParameter from "./component/SetParameter_1.0";

import {Context} from "../runtime/Context";
import {EventHub} from "../runtime/EventHub";
import {EngineEvent} from "../const/EngineEvent";

 export function call(componentElement, callback: Function) {
    var name, inArg;
    
    name = componentElement.getName();
    inArg = componentElement.getInArgMap();

    let data = {
        param: inArg,
        callback: callback,
        context: Context.baseContext
    };
    EventHub.publish(EngineEvent.ENGINE_EVENT + name, data);
    
    // if(name === "ShowMessage") {
    //     ShowMessage.execute(inArg, function(result) {
    //         callback(result);
    //     });
    // } else if(name === "ControllerCallMethod") {
    //     ControllerCallMethod.execute(inArg, function(result) {
    //         callback(result);
    //     });
    // } else if(name === "StringJoint") {
    //     StringJoint.execute(inArg, function(result) {
    //         callback(result);
    //     });
    // } else if(name === "SetParameter") {
    //     SetParameter.execute(inArg, function(result) {
    //         callback(result);
    //     })
    // }

    // let callback = function () {
    //     alert("callback");
    // }
    
};