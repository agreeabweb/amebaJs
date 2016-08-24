var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var ButtonView = (function (_super) {
        __extends(ButtonView, _super);
        function ButtonView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        ButtonView.prototype.bindEvent = function (actionName, action) {
            var view = this;
            if (actionName === "onClick") {
                this.$thisNode.css("cursor", "pointer");
                this.$thisNode.on("click", function () {
                    console.log("onClick");
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
        ButtonView.prototype.setSize = function (size) {
            this.size = size;
        };
        ButtonView.prototype.setLocation = function (location) {
            this.location = location;
        };
        ButtonView.prototype.layout = function () {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
            $(dom.find("p")[0]).css("line-height", this.size.height + "px");
        };
        return ButtonView;
    }(AbstractView_1.AbstractView));
    exports.ButtonView = ButtonView;
});
//# sourceMappingURL=ButtonView.js.map