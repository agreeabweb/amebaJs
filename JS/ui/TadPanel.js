define(["require", "exports", "../lib/HashMap", "../resource/ResourceManager", "./widget/TextView", "./widget/ButtonView", "./widget/TreeView"], function (require, exports, HashMap_1, ResourceManager_1, TextView_1, ButtonView_1, TreeView_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-03 0003.
     */
    var TadPanel = (function () {
        /*busy,idle*/
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
            return this.widgetRegistry.get(id);
        };
        TadPanel.prototype.start = function () {
            var panel = this;
            this.getContext().set("Panel", this);
            // 0.获取html
            ResourceManager_1.ResourceManager.getResourceFile(this.path, function (html) {
                var div, scripts;
                div = $("<div>");
                div.html(html);
                // 1.解析出view
                panel.translateHTML($(div).find("#contentPanel"));
                // 2.展现
                $("body").prepend($(div).find("#contentPanel"));
                scripts = $(div).find("script");
                for (var i = 0; i < scripts.length; i++) {
                    $("body").append(scripts[i]);
                }
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
                    view = new TextView_1.TextView(id, this, dm, $(dom));
                }
                else if (feature === "Button") {
                    view = new ButtonView_1.ButtonView(id, this, $(dom));
                }
                else if (feature === "Tree") {
                    view = new TreeView_1.TreeView(id, this, $(dom));
                }
                if (view != undefined) {
                    // 向当前panel中注册该组件
                    this.registerWidget(id, view);
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