import {ICommandHandler} from "../ICommandHandler";
import {Command} from "../Command";
import {TadPanel} from "../TadPanel";
import {EventHub} from "../../runtime/EventHub";
/**
 * Created by Oliver on 2016-08-04 0004.
 */
export class ShowMessage implements ICommandHandler {

    handleCommand(command:Command,callback :any):void {
        let type = command.getData().param.get("type");
        let content = command.getData().param.get("content");

        if(type === "info") {
            console.log(content);
        }
        let end = "success";

        callback({
            end: end
        });
    }
}