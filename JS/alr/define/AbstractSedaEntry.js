define(["require", "exports"], function (require, exports) {
    "use strict";
    var AbstractSedaEntry = (function () {
        function AbstractSedaEntry() {
        }
        //-------------------------------------------getter-------------------------------------------
        AbstractSedaEntry.prototype.getNodeId = function () {
            return this.nodeId;
        };
        ;
        AbstractSedaEntry.prototype.getPath = function () {
            return this.path;
        };
        AbstractSedaEntry.prototype.getCaption = function () {
            return this.caption;
        };
        AbstractSedaEntry.prototype.getListAlr = function () {
            return this.listAlr;
        };
        //-------------------------------------------setter-------------------------------------------
        AbstractSedaEntry.prototype.setNodeId = function (nodeId) {
            this.nodeId = nodeId;
        };
        ;
        AbstractSedaEntry.prototype.setPath = function (path) {
            this.path = path;
        };
        AbstractSedaEntry.prototype.setCaption = function (caption) {
            this.caption = caption;
        };
        AbstractSedaEntry.prototype.setListAlr = function (listAlr) {
            this.listAlr = listAlr;
        };
        return AbstractSedaEntry;
    }());
    exports.AbstractSedaEntry = AbstractSedaEntry;
});
//# sourceMappingURL=AbstractSedaEntry.js.map