var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var TextView = (function (_super) {
        __extends(TextView, _super);
        function TextView(id, host, dmEntry, thisNode) {
            _super.call(this, id, host, dmEntry, thisNode);
            var view = this;
            if (this.dmEntry != null) {
                this.$thisNode.on("change", function () {
                    view.updateModel(view.dmEntry, view.$thisNode.val());
                });
            }
        }
        TextView.prototype.bindEvent = function (actionName, action) {
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
        TextView.prototype.setSize = function (size) {
            this.size = size;
        };
        TextView.prototype.setLocation = function (location) {
            this.location = location;
        };
        TextView.prototype.SetWidgetFormText = function (text) {
            this.$thisNode.find("input[type='text']").val(text);
        };
        TextView.prototype.layout = function () {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
            var input = $("#" + this.id + "_input");
            input.css("width", "inherit");
            input.css("height", "inherit");
        };
        return TextView;
    }(AbstractView_1.AbstractView));
    exports.TextView = TextView;
});
//# sourceMappingURL=TextView.js.map