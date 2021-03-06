/**
 * Created by Oliver on 2016-08-04 0004.
 */
import {ICommandHandler} from "./ICommandHandler";
import {Command} from "./Command";
import {HashMap} from "../lib/HashMap";
import {OpenPanel} from "./commandhandlers/OpenPanel";
import {EngineEvent} from "../const/EngineEvent";
import {ServiceObj} from "../const/ServiceObj";
import {Context} from "../runtime/Context";
import {ShowMessage} from "./commandhandlers/ShowMessage";
import {ControllerCallMethod} from "./commandhandlers/ControllerCallMethod";


export class CommandHandlerExecutor {

    private handlers:HashMap = new HashMap();

    constructor (){
        this.registerCommandHandler(EngineEvent.COMMAND_OpenPanel,new OpenPanel());
        this.registerCommandHandler(EngineEvent.COMMAND_ShowMessage,new ShowMessage());
        this.registerCommandHandler(EngineEvent.COMMAND_ControllerCallMethod,new ControllerCallMethod());
    }

    public handleEvent = function(command:Command): void{
        // let ctx : Context = data.context;
        if(command.getContext() ==null)
        {
            return;
        }
        let executor :CommandHandlerExecutor = command.getContext().get(ServiceObj.CommandHandlerExecutor);
        // let command = new Command(data.msg,data);
        executor.execute(command,command.getCallback());
    }

    public registerCommandHandler(name:string, handler:ICommandHandler): void {
        this.handlers.put(name, handler);
    }

    public getCommandHandler(name:string):ICommandHandler {
        return this.handlers.get(name);
    }

    public execute(command:Command, callback:any): void {
        let handler:ICommandHandler = this.handlers.get(command.getName());
        handler.handleCommand(command, callback);
    }
}