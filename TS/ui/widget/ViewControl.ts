import config from "../../configure/config";

import {ButtonView as HTMlButton } from "./HTMLView/ButtonView";
import {TextView as HTMLText} from "./HTMLView/TextView";
import {TreeView as HTMLTree} from "./HTMLView/TreeView";

import {ButtonView as AxureButton} from "./AxureView/ButtonView";
import {CheckboxView as AxureCheckbox} from "./AxureView/CheckboxView";
import {CompositeView as AxureComposite} from "./AxureView/CompositeView";
import {HtmlButtonView as AxureHtmlButton} from "./AxureView/HtmlButtonView";
import {LabelView as AxureLabel} from "./AxureView/LabelView";
import {RadioButtonView as AxureRadioButton} from "./AxureView/RadioButtonView";
import {TableView as AxureTable} from "./AxureView/TableView";
import {TextView as AxureText} from "./AxureView/TextView";
import {TreeView as AxureTree} from "./AxureView/TreeView";

class ViewControl {
    public static buildView(type, id, panel, dm, dom) {
        var view;
        if(config.UIType === "Axure" || config.UIType === "axure") {
            if(type === "textBox") {
                view = new AxureText(id, panel, dm, dom);
            } 
            else if(type === "radioButton") {
                view = new AxureRadioButton(id, panel, dom);
            } else if(type === "checkbox") {
                view = new AxureCheckbox(id, panel, dom);
            } else if(type === "table") {
                view = new AxureTable(id, panel, dom);
            } else if(type === "button") {
                view = new AxureHtmlButton(id, panel, dom);
            } else if(type === "treeNodeObject") {
                view = new AxureTree(id, panel, dom);
                view.bindEvent("init");
            } else if(type === "vectorShape") {
                // 判断是否为按钮
                if(dom.hasClass("button") || dom.hasClass("primary_button") || dom.hasClass("link_button")) {
                    view = new AxureButton(id, panel, dom);
                } else if(dom.hasClass("box_1") || dom.hasClass("box_2") || dom.hasClass("box_3")) {
                    view = new AxureComposite(id, panel, dom);
                } else if(dom.hasClass("heading_1") || dom.hasClass("heading_2") || dom.hasClass("heading_3")) {
                    view = new AxureLabel(id, panel, dom);
                }
            }
        } else {
            if(type === "Button") {
                view = new HTMlButton(id, panel, dom);
            } else if(type === "Text") {
                view = new HTMLText(id, panel, dm, dom);
            } else if(type === "Tree") {
                view = new HTMLTree(id, panel, dom);
            }
        }

        return view;
    }
}

export {ViewControl};
