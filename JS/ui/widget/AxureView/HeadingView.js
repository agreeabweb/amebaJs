var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var HeadingView = (function (_super) {
        __extends(HeadingView, _super);
        function HeadingView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        HeadingView.prototype.bindEvent = function (actionName, action) {
        };
        HeadingView.prototype.layout = function (obj) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y)
                .css("font-weight", 700).css("font-family", "Arial Bold', 'Arial");
            if (obj.style.fontSize != undefined) {
                dom.find(".text span").css("font-size", obj.style.fontSize);
            }
        };
        return HeadingView;
    }(AbstractView_1.AbstractView));
    exports.HeadingView = HeadingView;
});
//# sourceMappingURL=HeadingView.js.map