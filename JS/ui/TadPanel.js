define(["require", "exports", "../lib/HashMap", "../const/UIConst"], function (require, exports, HashMap_1, UIConst_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-03 0003.
     */
    var TadPanel = (function () {
        function TadPanel(pits, host, parentId, id, path) {
            this.widgetRegistry = new HashMap_1.HashMap();
            this.id = "";
            this.parentId = "";
            this.entryToViews = new HashMap_1.HashMap();
            this.taskQueue = new Array();
            this.state = "idle";
            this.processInstanceThreadSegment = pits;
            this.host = host;
            this.parentId = parentId;
            this.id = id;
            this.host.addPanel(id, this);
            this.path = path;
            this.panelContext = this.host.getContext().createChild(this.id);
            var dm = this.host.getDataModel();
            dm.notifyThis(this.doUpdateViews, this);
        }
        TadPanel.prototype.configTarget = function (target, targetArgMap) {
            this.target = target;
            this.targetArgMap = targetArgMap;
        };
        TadPanel.prototype.getPath = function () {
            return this.path;
        };
        TadPanel.prototype.getContext = function () {
            return this.panelContext;
        };
        TadPanel.prototype.getHost = function () {
            return this.host;
        };
        TadPanel.prototype.getProcessInstanceThreadSegment = function () {
            return this.processInstanceThreadSegment;
        };
        TadPanel.prototype.isBusy = function () {
            return this.state === "busy";
        };
        TadPanel.prototype.idle = function () {
            this.state = "idle";
        };
        TadPanel.prototype.busy = function () {
            this.state = "busy";
        };
        TadPanel.prototype.registerEntryView = function (name, view) {
            var views = this.entryToViews.get(name);
            if (views == null) {
                views = new Array();
            }
            views.push(view);
            this.entryToViews.put(name, views);
        };
        TadPanel.prototype.registerWidget = function (id, view) {
            this.widgetRegistry.put(id, view);
        };
        TadPanel.prototype.getWidget = function (id) {
            var widget;
            widget = this.widgetRegistry.get(id);
            if (widget == undefined) {
                widget = this.widgetRegistry.get(this.axureObjPaths[id].scriptId);
            }
            return widget;
        };
        TadPanel.prototype.setAxureObjPaths = function (paths) {
            this.axureObjPaths = paths;
        };
        TadPanel.prototype.start = function () {
            var panel = this;
            this.getContext().set(UIConst_1.UIConst.Panel, this);
            var ctx = this.getContext();
            var target = this.target;
            var parser = this.getContext().get(UIConst_1.UIConst.PageParser);
            parser.parsePage(this.target, this.getContext());
        };
        TadPanel.prototype.getViewsByEntry = function (name) {
            return this.entryToViews.get(name);
        };
        TadPanel.prototype.queueTaskPack = function (mission) {
            // if (this.isBusy()) {
            this.taskQueue.push(mission); // busy和idle状态下的处理？？？
            //     return;
            // }
            this.state = "busy";
            var current = this.taskQueue.shift();
            while (current != null) {
                // 这里同步还是异步看具体情况
                setTimeout(current.execute(this, function () {
                }), 0);
                current = this.taskQueue.shift();
            }
            this.state = "idle";
        };
        TadPanel.prototype.doUpdateViews = function (key, old, now) {
            //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))
            console.log("dm变化，刷新UI..." + key);
            var views = this.entryToViews.get(key);
            var i;
            var size = views.length;
            for (i = 0; i < size; i++) {
                var v = views[i];
                v.modelChanged(now);
            }
        };
        return TadPanel;
    }());
    exports.TadPanel = TadPanel;
});
//# sourceMappingURL=TadPanel.js.map