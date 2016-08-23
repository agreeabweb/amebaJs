import {IPageParser} from "./IPageParser";
import {Context} from "../../runtime/Context";
import {ResourceManager} from "../../resource/ResourceManager";
import {TadPanel} from "../TadPanel";
import {ViewControl} from "../widget/ViewControl";
import {PanelCompositeFactoryRegistry} from "../PanelCompositeFactoryRegistry";
import {IPanelCompositeFactory} from "../IPanelCompositeFactory";
import {ServiceObj} from "../../const/ServiceObj";
import {UIConst} from "../../const/UIConst";
/**
 * Created by Oliver on 2016-08-23 0023.
 */

declare var $axure;

export class AxurePageParser implements IPageParser {

    parsePage(target:string, ctx:Context):void {
        let panel:TadPanel = ctx.get(UIConst.Panel);
        // 0.获取html
        ResourceManager.getResourceFile(panel.getPath(), function (html) {
            let div, domContent;

            // 清除之前页面的内容
            if($("body").find("#base").length != 0) {
                $("#base").remove();
            }

            div = $("<div>");
            div.html(html);
            domContent = $(div).find("#base");


            // 展现
            let registry:PanelCompositeFactoryRegistry = ctx.get(ServiceObj.PanelCompositeFactoryRegistry);
            var scripts;
            if (target) {
                let factory:IPanelCompositeFactory = registry.getPanelFactory(target);
                let pane:JQuery = factory.getPanelComposite();
                pane.prepend(domContent);
                scripts = $(div).find("script");
                for (let i = 0; i < scripts.length; i++) {
                    $("body").append(scripts[i]);
                }
            } else {
                $("body").prepend(domContent);
                scripts = $(div).find("script");
                for (let i = 0; i < scripts.length; i++) {
                    $("body").append(scripts[i]);
                }
            }

            // 解析出view
            // 要先展现再解析，否则Axure的data读不出
            AxurePageParser.translateAxureHTML($axure.data, panel);
        });
    }

    private static translateAxureHTML(obj, panel:TadPanel) {
        var objs, objPaths;

        objs = obj.page.diagram.objects;
        objPaths = obj.objectPaths;
        panel.setAxureObjPaths(objPaths);

        for (let i = 0; i < objs.length; i++) {
            let idMap, id, type, location, size, interactionMap, view;

            idMap = objs[i].id;
            id = objPaths[idMap].scriptId;
            type = objs[i].type;
            location = objs[i].style.location;
            size = objs[i].style.size;
            interactionMap = objs[i].interactionMap;

            // 通过ViewControl类来统一创建view
            view = ViewControl.buildView(type, id, panel, null, $("#" + id));

            if (view != undefined) {
                view.setLocation(location);
                view.setSize(size);

                if (interactionMap != undefined) {
                    for(let actionName in interactionMap) {
                        view.bindEvent(actionName, interactionMap[actionName]);
                    }
                }
                // 组件布局控制
                view.layout(objs[i], objPaths);

                // 向当前panel中注册该组件
                panel.registerWidget(id, view);
            }
        }
    }

}