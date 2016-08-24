define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var ControllerCallMethord = (function () {
        function ControllerCallMethord() {
        }
        ControllerCallMethord.prototype.handleCommand = function (command, callback) {
            console.log("ControllerCallMethord");
        };
        return ControllerCallMethord;
    }());
    exports.ControllerCallMethord = ControllerCallMethord;
});
//# sourceMappingURL=ControllerCallMethord.js.map