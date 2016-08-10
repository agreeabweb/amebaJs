import {ILogiclet} from "../../engine/logiclet/ILogiclet";
import {HashMap} from "../../lib/HashMap";
import {ProcessInstanceThreadSegment} from "../../engine/process/ProcessInstanceThreadSegment";
import {Context} from "../../runtime/Context";
import {EventHub} from "../../runtime/EventHub";
import {EngineEvent} from "../../const/EngineEvent";

class UIStepLogiclet implements ILogiclet {
    public call(pits: ProcessInstanceThreadSegment, inputParams: HashMap, callback: Function): void {
        var path, check;

        path = inputParams.get("path");
        if(path == null || path.length === 0) {
            throw "NULL UI PATH";
        }
        check = path.split(".")[1];
        if(check === "abf" || check === "abf4a") {
            this.callABF(pits, inputParams, callback);
        } else if(check === "auf") {
            this.callAUF(pits, path, inputParams.get("mapping"), inputParams, callback);
        } else {
            throw "Not Supported UI: " + path;
        }
    }

    public callABF(pits: ProcessInstanceThreadSegment, inputParams: HashMap, callback: Function): void {
        let data = {
            msg: EngineEvent.ENGINE_EVENT + "OpenPanel",
            param: inputParams,
            callback: callback,
            context: Context.getCurrent()
        };
        EventHub.publish(EngineEvent.ENGINE_EVENT + "OpenPanel", data);
    }

    public callAUF(pits: ProcessInstanceThreadSegment, uiPath: string, mapping: HashMap, inputParams: HashMap, callback: Function): void {

    }
}

export {UIStepLogiclet};