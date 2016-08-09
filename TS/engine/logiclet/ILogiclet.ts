import {HashMap} from "../../lib/HashMap";
import {ProcessInstanceThreadSegment} from ".././process/ProcessInstanceThreadSegment";

interface ILogiclet {
    call(pits: ProcessInstanceThreadSegment, inArgMap: HashMap, callback: Function): void;
}

export {ILogiclet};