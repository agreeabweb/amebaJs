define(["require", "exports", "../../runtime/Context"], function (require, exports, Context_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-09 0009.
     */
    var FlowMission = (function () {
        function FlowMission(missionPath, inArgMap) {
            this.missionPath = missionPath;
            this.inArgMap = inArgMap;
        }
        FlowMission.prototype.execute = function (panel, callback) {
            console.log("execute flow mission");
            var mission, pits, logicRealm, currentTask, context, pif;
            mission = this;
            pits = panel.getProcessInstanceThreadSegment();
            logicRealm = pits.getProcessInstanceThread().getLogicRealm();
            currentTask = logicRealm.getCurrentTask();
            context = Context_1.Context.getCurrent();
            context.set("Panel", panel);
            pif = context.get("ProcessInstanceFactory");
            logicRealm.setState("suspended");
            pif.pitsByGettingPIT(logicRealm, this.missionPath, function (newpits) {
                newpits.start(mission.inArgMap, function (processResult) {
                    console.log("执行第PITS回调");
                    console.log("结束PITS：" + newpits.getId());
                });
            });
        };
        return FlowMission;
    }());
    exports.FlowMission = FlowMission;
});
//# sourceMappingURL=FlowMission.js.map