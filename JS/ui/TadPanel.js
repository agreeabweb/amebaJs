define(["require", "exports", "../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-03 0003.
     */
    var TadPanel = (function () {
        function TadPanel(tadId, parentId, id) {
            this.widgetRegistry = new HashMap_1.HashMap();
            this.id = "";
            this.parentId = "";
            this.tadId = "";
            this.entryToViews = new HashMap_1.HashMap();
            this.tadId = tadId;
            this.parentId = parentId;
            this.id = id;
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
            var views = this.entryToViews.get(name);
            views.forEach(function (v, i, a) { return function (v) {
                var v1 = v;
                v1.modelChanged(val);
            }; });
            // let size: number  =.length, i: number =0;
            //
            // for(i=0;i<size;i++)
            // {
            //     let view : IView = this.entryToViews.get(name)[i];
            //     view.modelChanged(val);
            // }
        };
        return TadPanel;
    }());
    exports.TadPanel = TadPanel;
});
//# sourceMappingURL=TadPanel.js.map