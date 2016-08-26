import {ICommandHandler} from "../ICommandHandler";
import {Command} from "../Command";
import {TadPanel} from "../TadPanel";
import {EventHub} from "../../runtime/EventHub";
/**
 * Created by Oliver on 2016-08-04 0004.
 */
export class ControllerCallMethod implements ICommandHandler {

    handleCommand(command:Command,callback :any):void {
        var controllerId, methodName, method, methodArgs, tad, panel, widget;

            controllerId = command.getExtraData().get("controllerId");
            if(!(typeof controllerId === "string")) {
                controllerId = controllerId.getContent();
            }
            methodName = command.getExtraData().get("methodName");
            if(!(typeof methodName === "string")) {
                methodName = methodName.getContent();
            }
            methodArgs = command.getExtraData().get("methodArgs");
            if(!(methodArgs instanceof Array)) {
                methodArgs = methodArgs.getContent();
                methodArgs = JSON.parse(methodArgs);
            }

            // controllerId = command.getExtraData().get("controllerId").getContent();
            // methodName = command.getExtraData().get("methodName").getContent();
            // methodArgs = command.getExtraData().get("methodArgs").getContent();
            // methodArgs = JSON.parse(methodArgs);
        

        panel = command.getContext().get("Panel");
        widget = panel.getWidget(controllerId);
        method = widget[methodName];
        var result = method.apply(widget, methodArgs);

        var end = "success";

        if(callback != null) {
            callback({
                end: end,
                outArgs: {
                    result: result    
                }
            });
        }
        
    }
}