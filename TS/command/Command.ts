
import * as ShowMessage from "./component/ShowMessage_1.0";
import * as ControllerCallMethod from "./component/ControllerCallMethod_1.0";
import * as StringJoint from "./component/StringJoint_1.0";
import * as SetParameter from "./component/SetParameter_1.0";

import {Context} from "../runtime/Context";
import {EventHub} from "../runtime/EventHub";
import {EngineEvent} from "../const/EngineEvent";

 export function call(componentElement, callback: Function) {
    var name, inArg;
    
    name = componentElement.getName();
    inArg = componentElement.getInArgMap();


    if(name === "ShowMessage" || name === "ControllerCallMethod") {
        // ShowMessage.execute(inArg, function(result) {
        //     callback(result);
        // });
        let data = {
            msg:EngineEvent.ENGINE_EVENT + name,
            param: inArg,
            callback: callback,
            context: Context.getCurrent()
        };
        EventHub.publish(EngineEvent.ENGINE_EVENT + name,data);
    } 
    // else if(name === "ControllerCallMethod") {
    //     let data = {
    //         msg:EngineEvent.ENGINE_EVENT + name,
    //         param: inArg,
    //         callback: callback,
    //         context: Context.getCurrent()
    //     };
    //     EventHub.publish(EngineEvent.ENGINE_EVENT + name,data);
    // }
     else if(name === "StringJoint") {
        StringJoint.execute(inArg, function(result) {
            callback(result);
        });
    } else if(name === "SetParameter") {
        SetParameter.execute(inArg, function(result) {
            callback(result);
        })
    }

    // let callback = function () {
    //     alert("callback");
    // }
    
};