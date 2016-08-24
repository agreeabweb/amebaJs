var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var ListBoxView = (function (_super) {
        __extends(ListBoxView, _super);
        function ListBoxView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        ListBoxView.prototype.bindEvent = function (actionName, action) {
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
        ListBoxView.prototype.layout = function (obj) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            var list = $("#" + this.id + " select");
            list.css("width", obj.style.size.width).css("height", obj.style.size.height);
            if (obj.style.fontSize != undefined) {
                list.css("font-size", obj.style.fontSize);
            }
        };
        return ListBoxView;
    }(AbstractView_1.AbstractView));
    exports.ListBoxView = ListBoxView;
});
//# sourceMappingURL=ListBoxView.js.map