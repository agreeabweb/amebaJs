define(["require", "exports", "../lib/HashMap", "../resource/ResourceManager", "../const/ServiceObj", "../configure/config", "./widget/ViewControl"], function (require, exports, HashMap_1, ResourceManager_1, ServiceObj_1, config_1, ViewControl_1) {
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
            var ctx = this.getContext();
            var target = this.target;
            // 0.获取html
            ResourceManager_1.ResourceManager.getResourceFile(this.path, function (html) {
                var div, domContent;
                div = $("<div>");
                div.html(html);
                // 通过Axure生成
                if (config_1.default.UIType === "Axure" || config_1.default.UIType === "axure") {
                    domContent = $(div).find("#base");
                }
                else {
                    domContent = $(div).find("#contentPanel");
                }
                // 展现
                var registry = ctx.get(ServiceObj_1.ServiceObj.PanelCompositeFactoryRegistry);
                var scripts;
                if (target) {
                    var factory = registry.getPanelFactory(target);
                    var pane = factory.getPanelComposite();
                    pane.prepend(domContent);
                    scripts = $(div).find("script");
                    for (var i = 0; i < scripts.length; i++) {
                        $("body").append(scripts[i]);
                    }
                }
                else {
                    console.log(domContent);
                    $("body").prepend(domContent);
                    scripts = $(div).find("script");
                    for (var i = 0; i < scripts.length; i++) {
                        $("body").append(scripts[i]);
                    }
                }
                // 解析出view
                // 要先展现再解析，否则Axure的data读不出
                if (config_1.default.UIType === "Axure" || config_1.default.UIType === "axure") {
                    panel.translateAxureHTML($axure.data);
                }
                else {
                    panel.translateNormalHTML(domContent);
                }
            });
        };
        TadPanel.prototype.translateAxureHTML = function (obj) {
            var objs, objPaths;
            objs = obj.page.diagram.objects;
            objPaths = obj.objectPaths;
            for (var i = 0; i < objs.length; i++) {
                var idMap = void 0, id = void 0, type = void 0, location_1 = void 0, size = void 0, interactionMap = void 0, view = void 0;
                idMap = objs[i].id;
                id = objPaths[idMap].scriptId;
                type = objs[i].type;
                location_1 = objs[i].style.location;
                size = objs[i].style.size;
                interactionMap = objs[i].interactionMap;
                // 通过ViewControl类来统一创建view
                view = ViewControl_1.ViewControl.buildView(type, id, this, null, $("#" + id));
                if (view != undefined) {
                    view.setId(id);
                    view.setLocation(location_1);
                    view.setSize(size);
                    if (interactionMap != undefined) {
                        for (var actionName in interactionMap) {
                            var action = interactionMap[actionName];
                            var cases = action.cases;
                            for (var j = 0; j < cases.length; j++) {
                                var actions = cases[j].actions;
                                for (var k = 0; k < actions.length; k++) {
                                    view.bindEvent(actionName, actions[k]);
                                }
                            }
                        }
                    }
                    // 组件布局控制
                    view.layout(objs[i], objPaths);
                    // 向当前panel中注册该组件
                    this.registerWidget(id, view);
                }
            }
        };
        TadPanel.prototype.translateNormalHTML = function (dom) {
            var id, prop, children, view;
            id = $(dom).attr("id");
            prop = $(dom).attr("prop");
            if (prop != undefined) {
                var feature = void 0, dm = void 0, events = void 0;
                prop = JSON.parse(prop);
                feature = prop.feature;
                dm = prop.dm;
                events = prop.event;
                // 通过ViewControl类来统一创建view
                view = ViewControl_1.ViewControl.buildView(feature, id, this, dm, $(dom));
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
                    this.translateNormalHTML(children[i]);
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