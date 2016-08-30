define(["require", "exports", "../lib/HashMap", "../const/UIConst", "../const/ServiceObj"], function (require, exports, HashMap_1, UIConst_1, ServiceObj_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-09 0009.
     */
    var AbstractView = (function () {
        function AbstractView(id, host, dmEntry, thisNode) {
            this.missions = new HashMap_1.HashMap();
            this.id = id;
            this.host = host;
            this.$thisNode = thisNode;
            this.dmEntry = dmEntry;
            if (this.dmEntry != null) {
                this.bindModel(this.dmEntry);
            }
        }
        AbstractView.prototype.bindModel = function (name) {
            this.host.registerEntryView(name, this);
        };
        AbstractView.prototype.getMission = function (type, path, targetId) {
            return this.getHost().getContext().get(ServiceObj_1.ServiceObj.MissionFactory).getMission(type, path, targetId);
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
            dm.doSetWithNotify(key, val, false);
        };
        return AbstractView;
    }());
    exports.AbstractView = AbstractView;
});
//# sourceMappingURL=AbstractView.js.map