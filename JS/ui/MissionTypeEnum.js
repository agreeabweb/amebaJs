define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-09 0009.
     */
    (function (MissionTypeEnum) {
        MissionTypeEnum[MissionTypeEnum["LEFT"] = 2] = "LEFT";
        MissionTypeEnum[MissionTypeEnum["RIGHT"] = 4] = "RIGHT";
        MissionTypeEnum[MissionTypeEnum["CENTER"] = 8] = "CENTER";
        MissionTypeEnum[MissionTypeEnum["Close"] = 16] = "Close";
    })(exports.MissionTypeEnum || (exports.MissionTypeEnum = {}));
    var MissionTypeEnum = exports.MissionTypeEnum;
});
//# sourceMappingURL=MissionTypeEnum.js.map