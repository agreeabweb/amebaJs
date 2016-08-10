define(["require", "exports", "../lib/HashMap", "./mission/FlowMission", "../const/UIConst"], function (require, exports, HashMap_1, FlowMission_1, UIConst_1) {
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
            if (type === "Flow" || type === "flow") {
                return new FlowMission_1.FlowMission();
            }
        };
        AbstractView.prototype.getHost = function () {
            return this.host;
        };
        AbstractView.prototype.getNode = function () {
            return this.$thisNode;
        };
        AbstractView.prototype.modelChanged = function (val) {
            this.$thisNode.val(val);
        };
        AbstractView.prototype.updateModel = function (key, val) {
            var dm = this.host.getContext().get(UIConst_1.UIConst.DataModel);
            dm.set(key, val);
        };
        return AbstractView;
    }());
    exports.AbstractView = AbstractView;
});
//# sourceMappingURL=AbstractView.js.map