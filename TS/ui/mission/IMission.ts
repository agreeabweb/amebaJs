import {TadPanel} from "../TadPanel";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export interface IMission {
    execute(panel: TadPanel, callback:any):void;
}