var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var TextAreaView = (function (_super) {
        __extends(TextAreaView, _super);
        function TextAreaView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        TextAreaView.prototype.bindEvent = function (actionName, action) {
            var view = this;
            if (actionName === "OnClick") {
                $("#" + this.id + "_input").on("click", function () {
                    console.log("onClick");
                });
            }
            else if (actionName === "onFocus") {
                $("#" + this.id + "_input").on("focus", function () {
                    console.log("onFocus");
                    if (action.cases.length > 1) {
                        throw "同一事件只能有一个case";
                    }
                    else {
                        var actions = action.cases[0].actions;
                        for (var i = 0; i < actions.length; i++) {
                            view.getHost().queueTaskPack(view.getMission(actions[i].action, actions[i]));
                        }
                    }
                });
            }
            else if (actionName === "onTextChange") {
                $("#" + this.id + "_input").on("change", function () {
                    console.log("onTextChange");
                    if (action.cases.length > 1) {
                        throw "同一事件只能有一个case";
                    }
                    else {
                        var actions = action.cases[0].actions;
                        for (var i = 0; i < actions.length; i++) {
                            view.getHost().queueTaskPack(view.getMission(actions[i].action, actions[i]));
                        }
                    }
                });
            }
        };
        TextAreaView.prototype.SetWidgetFormText = function (text) {
            this.$thisNode.find("textarea").text(text);
        };
        TextAreaView.prototype.layout = function (obj) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            var textArea = $("#" + this.id + " textarea");
            textArea.css("width", obj.style.size.width).css("height", obj.style.size.height);
            if (obj.style.fontSize != undefined) {
                textArea.css("font-size", obj.style.fontSize);
            }
        };
        return TextAreaView;
    }(AbstractView_1.AbstractView));
    exports.TextAreaView = TextAreaView;
});
//# sourceMappingURL=TextAreaView.js.map