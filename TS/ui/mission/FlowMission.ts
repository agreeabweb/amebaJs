import {IMission} from "./IMission";
import {TadPanel} from "../TadPanel";
import {Context} from "../../runtime/Context";
import {HashMap} from "../../lib/HashMap";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class FlowMission implements  IMission {
    private missionPath: string;
    private inArgMap: HashMap;

    public constructor(missionPath, inArgMap) {
        this.missionPath = missionPath;
        this.inArgMap = inArgMap;
    }

    execute(panel: TadPanel, callback:any):void{
        console.log("execute flow mission");
        var mission, pits, logicRealm, currentTask, pif;

        mission = this;

        pits = panel.getProcessInstanceThreadSegment();
        logicRealm = pits.getProcessInstanceThread().getLogicRealm();
        currentTask = logicRealm.getCurrentTask();
        pif = Context.getCurrent().get("ProcessInstanceFactory");

        logicRealm.setState("suspended");

        pif.pitsByGettingPIT(logicRealm, this.missionPath, function(newpits) {
            newpits.start(mission.inArgMap, function(processResult) {
                console.log("执行第PITS回调");
                console.log("结束PITS：" + newpits.getId());
            });
        });
    }
}