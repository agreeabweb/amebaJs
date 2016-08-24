var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var LabelView = (function (_super) {
        __extends(LabelView, _super);
        function LabelView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        LabelView.prototype.bindEvent = function (actionName, action) {
        };
        LabelView.prototype.setSize = function (size) {
            this.size = size;
        };
        LabelView.prototype.setLocation = function (location) {
            this.location = location;
        };
        LabelView.prototype.layout = function () {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
            dom.css("font-weight", 700);
            dom.css("font-family", "Arial Bold', 'Arial");
        };
        return LabelView;
    }(AbstractView_1.AbstractView));
    exports.LabelView = LabelView;
});
//# sourceMappingURL=LabelView.js.map