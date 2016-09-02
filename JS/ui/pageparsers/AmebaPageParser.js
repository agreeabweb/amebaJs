define(["require", "exports", "../../const/UIConst", "../../resource/ResourceManager", "../widget/ViewControl", "../../const/ServiceObj"], function (require, exports, UIConst_1, ResourceManager_1, ViewControl_1, ServiceObj_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-23 0023.
     */
    var AmebaPageParser = (function () {
        function AmebaPageParser() {
        }
        AmebaPageParser.prototype.parsePage = function (target, ctx) {
            var panel = ctx.get(UIConst_1.UIConst.Panel);
            // 0.获取html
            ResourceManager_1.ResourceManager.getResourceFile(panel.getPath(), function (html) {
                var div, domContent, registry;
                div = $("<div>");
                div.html(html);
                domContent = $(div).find("#contentPanel");
                // 展现
                registry = ctx.get(ServiceObj_1.ServiceObj.PanelCompositeFactoryRegistry);
                if (target) {
                    var scripts = void 0, factory = void 0, pane = void 0;
                    factory = registry.getPanelFactory(target);
                    pane = factory.getPanelComposite();
                    pane.prepend(domContent);
                    scripts = $(div).find("script");
                    for (var i = 0; i < scripts.length; i++) {
                        $("body").append(scripts[i]);
                    }
                }
                else {
                    var scripts = void 0;
                    $("body").prepend(domContent);
                    scripts = $(div).find("script");
                    for (var i = 0; i < scripts.length; i++) {
                        $("body").append(scripts[i]);
                    }
                }
                AmebaPageParser.translateNormalHTML(domContent, panel);
            });
        };
        AmebaPageParser.translateNormalHTML = function (dom, panel) {
            var id, prop, children;
            id = $(dom).attr("id");
            prop = $(dom).attr("prop");
            if (prop != undefined) {
                var view = void 0, feature = void 0, dm = void 0, events = void 0;
                prop = JSON.parse(prop);
                feature = prop.feature;
                dm = prop.dm;
                events = prop.event;
                // 通过ViewControl类来统一创建view
                view = ViewControl_1.ViewControl.buildView(feature, id, panel, dm, $(dom));
                if (view != undefined) {
                    // 向当前panel中注册该组件
                    panel.registerWidget(id, view);
                    // 处理event
                    if (events != undefined && events.length != 0) {
                        for (var i = 0; i < events.length; i++) {
                            view.bindEvent(events[i].eventType, events[i].flowType, events[i].path);
                        }
                    }
                    // 注册dm
                    if (dm != undefined) {
                        panel.registerEntryView(dm, view);
                    }
                }
            }
            // 解析该元素的孩子节点
            children = $(dom).children();
            if (children.length != 0) {
                for (var i = 0; i < children.length; i++) {
                    AmebaPageParser.translateNormalHTML(children[i], panel);
                }
            }
        };
        return AmebaPageParser;
    }());
    exports.AmebaPageParser = AmebaPageParser;
});
//# sourceMappingURL=AmebaPageParser.js.map