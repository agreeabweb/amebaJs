define(["require", "exports", "../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-09 0009.
     */
    var AbstractView = (function () {
        function AbstractView(id, host, thisNode) {
            this.missions = new HashMap_1.HashMap();
            this.id = id;
            this.host = host;
            this.$thisNode = thisNode;
        }
        AbstractView.prototype.bindModel = function (name) {
            this.host.registerEntryView(name, this);
        };
        AbstractView.prototype.getMission = function (type, path) {
            if (type === "Flow") {
                return new FlowMission;
            }
        };
        AbstractView.prototype.bindEvent = function (type, name, path) {
        };
        return AbstractView;
    }());
    exports.AbstractView = AbstractView;
});
//# sourceMappingURL=AbstractView.js.map