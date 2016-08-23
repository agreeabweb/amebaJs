define(["require", "exports", "../../resource/ResourceManager", "../widget/ViewControl", "../../const/ServiceObj", "../../const/UIConst"], function (require, exports, ResourceManager_1, ViewControl_1, ServiceObj_1, UIConst_1) {
    "use strict";
    var AxurePageParser = (function () {
        function AxurePageParser() {
        }
        AxurePageParser.prototype.parsePage = function (target, ctx) {
            var panel = ctx.get(UIConst_1.UIConst.Panel);
            // 0.获取html
            ResourceManager_1.ResourceManager.getResourceFile(panel.getPath(), function (html) {
                var div, domContent;
                // 清除之前页面的内容
                if ($("body").find("#base").length != 0) {
                    $("#base").remove();
                }
                div = $("<div>");
                div.html(html);
                domContent = $(div).find("#base");
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
                    $("body").prepend(domContent);
                    scripts = $(div).find("script");
                    for (var i = 0; i < scripts.length; i++) {
                        $("body").append(scripts[i]);
                    }
                }
                // 解析出view
                // 要先展现再解析，否则Axure的data读不出
                AxurePageParser.translateAxureHTML($axure.data, panel);
            });
        };
        AxurePageParser.translateAxureHTML = function (obj, panel) {
            var objs, objPaths;
            objs = obj.page.diagram.objects;
            objPaths = obj.objectPaths;
            panel.setAxureObjPaths(objPaths);
            for (var i = 0; i < objs.length; i++) {
                var idMap = void 0, id = void 0, type = void 0, location_1 = void 0, size = void 0, interactionMap = void 0, view = void 0;
                idMap = objs[i].id;
                id = objPaths[idMap].scriptId;
                type = objs[i].type;
                location_1 = objs[i].style.location;
                size = objs[i].style.size;
                interactionMap = objs[i].interactionMap;
                // 通过ViewControl类来统一创建view
                view = ViewControl_1.ViewControl.buildView(type, id, panel, null, $("#" + id));
                if (view != undefined) {
                    view.setLocation(location_1);
                    view.setSize(size);
                    if (interactionMap != undefined) {
                        for (var actionName in interactionMap) {
                            view.bindEvent(actionName, interactionMap[actionName]);
                        }
                    }
                    // 组件布局控制
                    view.layout(objs[i], objPaths);
                    // 向当前panel中注册该组件
                    panel.registerWidget(id, view);
                }
            }
        };
        return AxurePageParser;
    }());
    exports.AxurePageParser = AxurePageParser;
});
//# sourceMappingURL=AxurePageParser.js.map