define(["require", "exports"], function (require, exports) {
    "use strict";
    var HtmlButtonView = (function () {
        function HtmlButtonView() {
        }
        HtmlButtonView.prototype.bindEvent = function (actionName, action) {
            if (actionName === "onClick") {
                $("#" + this.id + "_input").on("click", function () {
                    console.log("onClick");
                });
            }
        };
        HtmlButtonView.prototype.setId = function (id) {
            this.id = id;
        };
        HtmlButtonView.prototype.setSize = function (size) {
            this.size = size;
        };
        HtmlButtonView.prototype.setLocation = function (location) {
            this.location = location;
        };
        HtmlButtonView.prototype.layout = function () {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
            var input = $("#" + this.id + "_input");
            input.css("width", "inherit");
            input.css("height", "inherit");
        };
        return HtmlButtonView;
    }());
    exports.HtmlButtonView = HtmlButtonView;
});
//# sourceMappingURL=HtmlButtonView.js.map