define(["require", "exports", "../../configure/config", "./HTMLView/ButtonView", "./HTMLView/TextView", "./HTMLView/TreeView", "./AxureView/ButtonView", "./AxureView/CheckboxView", "./AxureView/CompositeView", "./AxureView/HtmlButtonView", "./AxureView/LabelView", "./AxureView/RadioButtonView", "./AxureView/TableView", "./AxureView/TextView", "./AxureView/TreeView"], function (require, exports, config_1, ButtonView_1, TextView_1, TreeView_1, ButtonView_2, CheckboxView_1, CompositeView_1, HtmlButtonView_1, LabelView_1, RadioButtonView_1, TableView_1, TextView_2, TreeView_2) {
    "use strict";
    var ViewControl = (function () {
        function ViewControl() {
        }
        ViewControl.buildView = function (type, id, panel, dm, dom) {
            var view;
            if (config_1.default.UIType === "Axure" || config_1.default.UIType === "axure") {
                if (type === "textBox") {
                    view = new TextView_2.TextView();
                }
                else if (type === "radioButton") {
                    view = new RadioButtonView_1.RadioButtonView();
                }
                else if (type === "checkbox") {
                    view = new CheckboxView_1.CheckboxView();
                }
                else if (type === "table") {
                    view = new TableView_1.TableView();
                }
                else if (type === "button") {
                    view = new HtmlButtonView_1.HtmlButtonView();
                }
                else if (type === "treeNodeObject") {
                    view = new TreeView_2.TreeView();
                }
                else if (type === "vectorShape") {
                    // 判断是否为按钮
                    if (dom.hasClass("button") || dom.hasClass("primary_button") || dom.hasClass("link_button")) {
                        view = new ButtonView_2.ButtonView();
                    }
                    else if (dom.hasClass("box_1") || dom.hasClass("box_2") || dom.hasClass("box_3")) {
                        view = new CompositeView_1.CompositeView();
                    }
                    else if (dom.hasClass("heading_1") || dom.hasClass("heading_2") || dom.hasClass("heading_3")) {
                        view = new LabelView_1.LabelView();
                    }
                }
            }
            else {
                if (type === "Button") {
                    view = new ButtonView_1.ButtonView(id, panel, dom);
                }
                else if (type === "Text") {
                    view = new TextView_1.TextView(id, panel, dm, dom);
                }
                else if (type === "Tree") {
                    view = new TreeView_1.TreeView(id, panel, dom);
                }
            }
            return view;
        };
        return ViewControl;
    }());
    exports.ViewControl = ViewControl;
});
//# sourceMappingURL=ViewControl.js.map