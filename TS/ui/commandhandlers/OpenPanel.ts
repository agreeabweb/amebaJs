import {ICommandHandler} from "../ICommandHandler";
import {Command} from "../Command";
import {TadPanel} from "../TadPanel";
import GUID from "../../lib/GUID";
/**
 * Created by Oliver on 2016-08-04 0004.
 */
export class OpenPanel implements ICommandHandler {

    handleCommand(command:Command, callack:any):void {
        var path, tad, tadPanel, pits;

        path = command.getData().param.get("path");
        tad = command.getData().context.get("Tad");
        pits = command.getData().param.get("ProcessInstanceThreadSegment");
        tadPanel = new TadPanel(pits, tad, tad.getId(), "Panel_" + GUID(), path);
        tadPanel.start();
    }
}