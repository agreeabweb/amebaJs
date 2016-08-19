define(["require", "exports"], function (require, exports) {
    "use strict";
    var ButtonView = (function () {
        function ButtonView() {
        }
        ButtonView.prototype.bindEvent = function (actionName, action) {
            if (actionName === "onClick") {
                $("#" + this.id + "_input").on("click", function () {
                    console.log("onClick");
                });
            }
        };
        ButtonView.prototype.setId = function (id) {
            this.id = id;
        };
        ButtonView.prototype.setSize = function (size) {
            this.size = size;
        };
        ButtonView.prototype.setLocation = function (location) {
            this.location = location;
        };
        ButtonView.prototype.layout = function () {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
            $(dom.find("p")[0]).css("line-height", this.size.height + "px");
        };
        return ButtonView;
    }());
    exports.ButtonView = ButtonView;
});
//# sourceMappingURL=ButtonView.js.map