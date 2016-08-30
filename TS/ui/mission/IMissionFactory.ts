import {IMission} from "./IMission";
/**
 * Created by Oliver on 2016-08-16 0016.
 */
export interface IMissionFactory {

    getMission(type:string, path:string, targetId: string):IMission[];
}