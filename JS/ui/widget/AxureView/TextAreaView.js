var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView"], function (require, exports, AbstractAxureView_1) {
    "use strict";
    var TextAreaView = (function (_super) {
        __extends(TextAreaView, _super);
        function TextAreaView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        TextAreaView.prototype.bindEvent = function (actionName, action) {
            this.bindEventToTarget($("#" + this.id + "_input"), actionName, action);
        };
        TextAreaView.prototype.SetWidgetFormText = function (text) {
            this.$thisNode.find("textarea").text(text);
        };
        TextAreaView.prototype.layout = function (obj) {
            var dom, textArea;
            dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            textArea = $("#" + this.id + " textarea");
            textArea.css("width", obj.style.size.width).css("height", obj.style.size.height);
            if (obj.style.fontSize != undefined) {
                textArea.css("font-size", obj.style.fontSize);
            }
        };
        return TextAreaView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.TextAreaView = TextAreaView;
});
//# sourceMappingURL=TextAreaView.js.map