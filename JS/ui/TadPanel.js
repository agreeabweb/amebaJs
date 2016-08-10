define(["require", "exports", "../lib/HashMap", "../resource/ResourceManager", "./widget/TextView", "./widget/ButtonView"], function (require, exports, HashMap_1, ResourceManager_1, TextView_1, ButtonView_1) {
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
            this.host.addPanel(id, this);
            this.path = path;
            var dm = this.host.getDataModel();
            dm.notifyThis(this.doUpdateViews, this);
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
            var panel = this;
            // 0.获取html
            ResourceManager_1.ResourceManager.getResourceFile(this.path, function (html) {
                var div;
                div = $("<div>");
                div.html(html);
                // 1.解析出view
                panel.translateHTML($(div).find("#contentPanel"));
                // 2.展现
                $("body").append(div);
            });
        };
        TadPanel.prototype.translateHTML = function (dom) {
            var id, prop, children, view;
            id = $(dom).attr("id");
            prop = $(dom).attr("prop");
            if (prop != undefined) {
                var feature = void 0, dm = void 0, events = void 0;
                prop = JSON.parse(prop);
                feature = prop.feature;
                dm = prop.dm;
                events = prop.event;
                //判断view类型
                if (feature === "Text") {
                    view = new TextView_1.TextView(id, this, $(dom));
                }
                else if (feature === "Button") {
                    view = new ButtonView_1.ButtonView(id, this, $(dom));
                }
                // 处理event
                if (events != undefined && events.length != 0) {
                    for (var i = 0; i < events.length; i++) {
                        view.bindEvent(events[i].eventType, events[i].flowType, events[i].path);
                    }
                }
                // 注册dm
                if (dm != undefined) {
                    this.registerEntryView(dm, view);
                }
            }
            // 解析该元素的孩子节点
            children = $(dom).children();
            if (children.length != 0) {
                for (var i = 0; i < children.length; i++) {
                    this.translateHTML(children[i]);
                }
            }
        };
        TadPanel.prototype.getViewsByEntry = function (name) {
            return this.entryToViews.get(name);
        };
        TadPanel.prototype.queueTaskPack = function (mission) {
            mission.execute(function () {
            });
        };
        TadPanel.prototype.doUpdateViews = function (key, old, now) {
            //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))
            console.log("dm变化，刷新UI..." + name);
            var views = this.entryToViews.get(name);
            views.forEach(function (v, i, a) { return function (v) {
                var v1 = v;
                v1.modelChanged(now);
            }; });
        };
        return TadPanel;
    }());
    exports.TadPanel = TadPanel;
});
//# sourceMappingURL=TadPanel.js.map