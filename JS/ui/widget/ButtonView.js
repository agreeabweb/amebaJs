var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-09 0009.
     */
    var ButtonView = (function (_super) {
        __extends(ButtonView, _super);
        function ButtonView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        ButtonView.prototype.bindEvent = function (eventType, flowType, path) {
            var view = this; //避免this指代错误
            if (eventType === "click") {
                view.getNode().on("click", function () {
                    view.getHost().queueTaskPack(view.getMission(flowType, path));
                });
            }
        };
        return ButtonView;
    }(AbstractView_1.AbstractView));
    exports.ButtonView = ButtonView;
});
//# sourceMappingURL=ButtonView.js.map