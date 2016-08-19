define(["require", "exports"], function (require, exports) {
    "use strict";
    var LabelView = (function () {
        function LabelView() {
        }
        LabelView.prototype.bindEvent = function (actionName, action) {
        };
        LabelView.prototype.setId = function (id) {
            this.id = id;
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
    }());
    exports.LabelView = LabelView;
});
//# sourceMappingURL=LabelView.js.map