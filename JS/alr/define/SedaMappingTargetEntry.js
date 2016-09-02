define(["require", "exports"], function (require, exports) {
    "use strict";
    var SedaMappingTargetEntry = (function () {
        function SedaMappingTargetEntry() {
        }
        //----------------------------------------getter----------------------------------
        SedaMappingTargetEntry.prototype.getPath = function () {
            return this.path;
        };
        SedaMappingTargetEntry.prototype.getMapping = function () {
            return this.mapping;
        };
        //-----------------------------------------setter-----------------------------------
        SedaMappingTargetEntry.prototype.setPath = function (path) {
            this.path = path;
        };
        SedaMappingTargetEntry.prototype.setMapping = function (mapping) {
            this.mapping = mapping;
        };
        return SedaMappingTargetEntry;
    }());
    exports.SedaMappingTargetEntry = SedaMappingTargetEntry;
});
//# sourceMappingURL=SedaMappingTargetEntry.js.map