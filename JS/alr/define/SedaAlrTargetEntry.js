define(["require", "exports"], function (require, exports) {
    "use strict";
    var SedaAlrTargetEntry = (function () {
        function SedaAlrTargetEntry() {
        }
        //--------------------------------------------------getter------------------------------------------
        SedaAlrTargetEntry.prototype.getPath = function () {
            return this.path;
        };
        SedaAlrTargetEntry.prototype.getCaption = function () {
            return this.caption;
        };
        SedaAlrTargetEntry.prototype.getListDataMapping = function () {
            return this.listDataMapping;
        };
        //---------------------------------------------------setter------------------------------------------
        SedaAlrTargetEntry.prototype.setPath = function (path) {
            this.path = path;
        };
        SedaAlrTargetEntry.prototype.setCaption = function (caption) {
            this.caption = caption;
        };
        SedaAlrTargetEntry.prototype.setListDataMapping = function (listDataMapping) {
            this.listDataMapping = listDataMapping;
        };
        return SedaAlrTargetEntry;
    }());
    exports.SedaAlrTargetEntry = SedaAlrTargetEntry;
});
//# sourceMappingURL=SedaAlrTargetEntry.js.map