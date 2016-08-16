import {IMission} from "./IMission";
import {TadPanel} from "../TadPanel";
import {Command} from "../Command";
import {Tad} from "../Tad";
import {UIConst} from "../../const/UIConst";
import {CommandHandlerExecutor} from "../CommandHandlerExecutor";
import {ServiceObj} from "../../const/ServiceObj";
/**
 * Created by Oliver on 2016-08-16 0016.
 */
export class CommandMission implements  IMission {

    private command:Command;

    constructor(command:Command){
        this.command = command;
    }

    execute(panel: TadPanel, callback:any):void{
        let commandExecutor:CommandHandlerExecutor = panel.getContext().get(ServiceObj.CommandHandlerExecutor);
        this.command.getData().context = panel.getContext();
        this.command.setContext(panel.getContext());
        commandExecutor.execute(this.command,callback);
    }
}