var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var HtmlButtonView = (function (_super) {
        __extends(HtmlButtonView, _super);
        function HtmlButtonView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        HtmlButtonView.prototype.bindEvent = function (actionName, action) {
            if (actionName === "onClick") {
                this.$thisNode.css("cursor", "pointer");
                this.$thisNode.on("click", function () {
                    console.log("onClick");
                });
            }
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
    }(AbstractView_1.AbstractView));
    exports.HtmlButtonView = HtmlButtonView;
});
//# sourceMappingURL=HtmlButtonView.js.map