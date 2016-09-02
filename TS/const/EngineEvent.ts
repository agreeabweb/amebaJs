/**
 * Created by Oliver on 2016-08-04 0004.
 */
export class EngineEvent {

    public static  ENGINE_EVENT: string ="engine.command.";
    public static COMMAND_OpenPanel: string = EngineEvent.ENGINE_EVENT+"OpenPanel";
    public static COMMAND_ShowMessage: string = EngineEvent.ENGINE_EVENT+"ShowMessage";
    public static COMMAND_ControllerCallMethod: string = EngineEvent.ENGINE_EVENT+"ControllerCallMethod";

}