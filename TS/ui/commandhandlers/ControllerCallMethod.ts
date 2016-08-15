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

        controllerId = command.getData().param.get("controllerId").getContent();
        methodName = command.getData().param.get("methodName").getContent();
        methodArgs = command.getData().param.get("methodArgs").getContent();
        methodArgs = JSON.parse(methodArgs);

        panel = command.getData().context.get("Panel");
        widget = panel.getWidget(controllerId);
        method = widget[methodName];
        method.apply(widget, methodArgs);
    }
}