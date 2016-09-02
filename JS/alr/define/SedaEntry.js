define(["require", "exports"], function (require, exports) {
    "use strict";
    var SedaEntry = (function () {
        function SedaEntry() {
        }
        //----------------------------------------------------------getter---------------------------------------
        SedaEntry.prototype.getListAbstractEntry = function () {
            return this.listAbstractEntry;
        };
        //----------------------------------------------------------setter----------------------------------------
        SedaEntry.prototype.setListAbstractEntry = function (listAbstractEntry) {
            this.listAbstractEntry = listAbstractEntry;
        };
        return SedaEntry;
    }());
    exports.SedaEntry = SedaEntry;
});
//# sourceMappingURL=SedaEntry.js.map