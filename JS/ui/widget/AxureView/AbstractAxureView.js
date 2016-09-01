var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView", "../../eventpub/Event"], function (require, exports, AbstractView_1, Event_1) {
    "use strict";
    var AbstractAxureView = (function (_super) {
        __extends(AbstractAxureView, _super);
        function AbstractAxureView(id, host, dmEntry, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        AbstractAxureView.prototype.bindEventToTarget = function (target, actionName, action) {
            var view = this;
            if (actionName === "onClick") {
                target.css("cursor", "pointer");
                target.on("click", function () {
                    console.log("onClick");
                    view.dealwithEvent(target, actionName, action, view);
                });
            }
            else if (actionName === "onTextChange") {
                target.on("change", function () {
                    console.log("onTextChange");
                    view.dealwithEvent(target, actionName, action, view);
                });
            }
            else if (actionName === "onSelect") {
                if (view.$thisNode.hasClass("radio_button") || view.$thisNode.hasClass("checkbox")) {
                    target.on("change", function () {
                        console.log("onSelect");
                        view.dealwithEvent(target, actionName, action, view);
                    });
                }
                else {
                    Event_1.AEvent.addEvent(target.attr("id"), "onSelect", function () {
                        console.log("onSelect");
                        view.dealwithEvent(target, actionName, action, view);
                    });
                }
            }
            else if (actionName === "onSelectionChange") {
                target.on("change", function () {
                    console.log("onSelectionChange");
                    view.dealwithEvent(target, actionName, action, view);
                });
            }
        };
        AbstractAxureView.prototype.dealwithEvent = function (target, actionName, action, view) {
            if (target.hasClass("table_cell")) {
                view.eTargetId = target.attr("id");
            }
            if (action.cases.length > 1) {
                throw "同一事件只能有一个case";
            }
            else {
                var actions = action.cases[0].actions;
                for (var i = 0; i < actions.length; i++) {
                    view.getHost().queueTaskPack(view.getMission(actions[i].action, actions[i], view.id));
                }
            }
        };
        return AbstractAxureView;
    }(AbstractView_1.AbstractView));
    exports.AbstractAxureView = AbstractAxureView;
});
//# sourceMappingURL=AbstractAxureView.js.map