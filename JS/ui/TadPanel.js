define(["require", "exports", "../lib/HashMap", "../runtime/EventHub"], function (require, exports, HashMap_1, EventHub_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-03 0003.
     */
    var TadPanel = (function () {
        function TadPanel(host, parentId, id, path) {
            this.widgetRegistry = new HashMap_1.HashMap();
            this.id = "";
            this.parentId = "";
            this.entryToViews = new HashMap_1.HashMap();
            this.host = host;
            this.parentId = parentId;
            this.id = id;
            // this.host.addPanel(id, this);
            this.path = path;
            EventHub_1.EventHub.subscribe("model.change", this, this.doUpdateViews);
        }
        TadPanel.prototype.registerEntryView = function (name, view) {
            var views = this.entryToViews.get(name);
            if (views == null) {
                views = new Array();
            }
            views.push(view);
        };
        TadPanel.prototype.registerWidget = function (id, view) {
            this.widgetRegistry.put(id, view);
        };
        TadPanel.prototype.getWidget = function (id) {
            return this.widgetRegistry.get(id);
        };
        TadPanel.prototype.start = function () {
            // 0.获取html
            // 1.解析出view
            // 2.展现
        };
        TadPanel.prototype.getViewsByEntry = function (name) {
            return this.entryToViews.get(name);
        };
        TadPanel.prototype.queueTaskPack = function (mission) {
            mission.execute(function () {
            });
        };
        TadPanel.prototype.doUpdateViews = function (name, val) {
            //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))
            // let views = this.entryToViews.get(name);
            // views.forEach((v, i, a) => function (v) {
            //     let v1:IView = v;
            //     v1.modelChanged(val);
            // });
            console.log("收到模型变化消息.." + this.id);
        };
        return TadPanel;
    }());
    exports.TadPanel = TadPanel;
});
//# sourceMappingURL=TadPanel.js.map