import {Context} from "../../runtime/Context";
/**
 * Created by Oliver on 2016-08-23 0023.
 */
export interface IPageParser {

    parsePage(target:string,ctx:Context):void;

}