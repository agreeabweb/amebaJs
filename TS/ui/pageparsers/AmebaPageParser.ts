import {IPageParser} from "./IPageParser";
import {Context} from "../../runtime/Context";
import {TadPanel} from "../TadPanel";
import {UIConst} from "../../const/UIConst";
import {ResourceManager} from "../../resource/ResourceManager";
import {ViewControl} from "../widget/ViewControl";
import {PanelCompositeFactoryRegistry} from "../PanelCompositeFactoryRegistry";
import {IPanelCompositeFactory} from "../IPanelCompositeFactory";
import {ServiceObj} from "../../const/ServiceObj";
/**
 * Created by Oliver on 2016-08-23 0023.
 */
export class AmebaPageParser implements IPageParser {


    parsePage(target:string, ctx:Context): void {
        let panel:TadPanel = ctx.get(UIConst.Panel);

        // 0.获取html
        ResourceManager.getResourceFile(panel.getPath(), function (html) {
            let div, domContent, registry:PanelCompositeFactoryRegistry;
            div = $("<div>");
            div.html(html);


            domContent = $(div).find("#contentPanel");

            // 展现
            registry = ctx.get(ServiceObj.PanelCompositeFactoryRegistry);
            if (target) {
                let scripts, factory:IPanelCompositeFactory, pane:JQuery;

                factory = registry.getPanelFactory(target);
                pane = factory.getPanelComposite();
                pane.prepend(domContent);
                scripts = $(div).find("script");
                for (let i = 0; i < scripts.length; i++) {
                    $("body").append(scripts[i]);
                }
            } else {
                let scripts;
                $("body").prepend(domContent);
                scripts = $(div).find("script");
                for (let i = 0; i < scripts.length; i++) {
                    $("body").append(scripts[i]);
                }
            }
            AmebaPageParser.translateNormalHTML(domContent, panel);
        });
    }

    private static translateNormalHTML(dom:JQuery, panel:TadPanel): void {
        let id, prop, children;

        id = $(dom).attr("id");
        prop = $(dom).attr("prop");

        if (prop != undefined) {
            let view, feature, dm, events;

            prop = JSON.parse(prop);
            feature = prop.feature;
            dm = prop.dm;
            events = prop.event;

            // 通过ViewControl类来统一创建view
            view = ViewControl.buildView(feature, id, panel, dm, $(dom));

            if (view != undefined) {
                // 向当前panel中注册该组件
                panel.registerWidget(id, view);
                // 处理event
                if (events != undefined && events.length != 0) {
                    for (let i = 0; i < events.length; i++) {
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
            for (let i = 0; i < children.length; i++) {
                AmebaPageParser.translateNormalHTML(children[i], panel);
            }
        }
    }
}