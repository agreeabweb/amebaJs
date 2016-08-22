var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var CompositeView = (function (_super) {
        __extends(CompositeView, _super);
        function CompositeView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        CompositeView.prototype.bindEvent = function (actionName, action) {
        };
        CompositeView.prototype.setSize = function (size) {
            this.size = size;
        };
        CompositeView.prototype.setLocation = function (location) {
            this.location = location;
        };
        CompositeView.prototype.layout = function () {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
        };
        return CompositeView;
    }(AbstractView_1.AbstractView));
    exports.CompositeView = CompositeView;
});
//# sourceMappingURL=CompositeView.js.map