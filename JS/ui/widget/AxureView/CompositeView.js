var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView"], function (require, exports, AbstractAxureView_1) {
    "use strict";
    var CompositeView = (function (_super) {
        __extends(CompositeView, _super);
        function CompositeView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        CompositeView.prototype.bindEvent = function (actionName, action) {
        };
        CompositeView.prototype.layout = function (obj) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            if (obj.style.fontSize != undefined) {
                dom.find(".text span").css("font-size", obj.style.fontSize);
            }
        };
        return CompositeView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.CompositeView = CompositeView;
});
//# sourceMappingURL=CompositeView.js.map