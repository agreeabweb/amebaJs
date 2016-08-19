define(["require", "exports"], function (require, exports) {
    "use strict";
    var CompositeView = (function () {
        function CompositeView() {
        }
        CompositeView.prototype.bindEvent = function (actionName, action) {
        };
        CompositeView.prototype.setId = function (id) {
            this.id = id;
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
    }());
    exports.CompositeView = CompositeView;
});
//# sourceMappingURL=CompositeView.js.map