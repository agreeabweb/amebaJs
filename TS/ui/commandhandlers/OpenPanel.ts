import {ICommandHandler} from "../ICommandHandler";
import {Command} from "../Command";
import {TadPanel} from "../TadPanel";
import GUID from "../../lib/GUID";
/**
 * Created by Oliver on 2016-08-04 0004.
 */
export class OpenPanel implements ICommandHandler {

    handleCommand(command:Command, callack:any):void {
        let path, tad, tadPanel, pits,target;

        if(command.getPath() != null) {
            path = command.getPath();
        } else if(command.getExtraData().get("path") != undefined) {
            path = command.getExtraData().get("path");
        } else {
            throw "没有画面路径信息";
        }
        
        target = command.getExtraData().get("target");
        tad = command.getContext().get("Tad");
        pits = command.getExtraData().get("ProcessInstanceThreadSegment");

        tad.openPanel(path, target, pits);
    }
}