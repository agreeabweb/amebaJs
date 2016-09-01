var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView"], function (require, exports, AbstractAxureView_1) {
    "use strict";
    var HtmlButtonView = (function (_super) {
        __extends(HtmlButtonView, _super);
        function HtmlButtonView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        HtmlButtonView.prototype.bindEvent = function (actionName, action) {
            this.bindEventToTarget($(this.$thisNode), actionName, action);
        };
        HtmlButtonView.prototype.layout = function (obj) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            var input = $("#" + this.id + "_input");
            input.css("width", "inherit").css("height", "inherit");
            if (obj.style.fontSize != undefined) {
                input.css("font-size", obj.style.fontSize);
            }
        };
        return HtmlButtonView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.HtmlButtonView = HtmlButtonView;
});
//# sourceMappingURL=HtmlButtonView.js.map