var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView"], function (require, exports, AbstractAxureView_1) {
    "use strict";
    var TextView = (function (_super) {
        __extends(TextView, _super);
        function TextView(id, host, dmEntry, thisNode) {
            _super.call(this, id, host, dmEntry, thisNode);
            var view = this;
            if (this.dmEntry != null) {
                this.$thisNode.on("change", function () {
                    view.updateModel(view.dmEntry, view.$thisNode.val());
                });
            }
        }
        TextView.prototype.bindEvent = function (actionName, action) {
            this.bindEventToTarget($("#" + this.id + "_input"), actionName, action);
        };
        TextView.prototype.SetWidgetFormText = function (text) {
            this.$thisNode.find("input[type='text']").val(text);
        };
        TextView.prototype.layout = function (obj) {
            var dom, input;
            dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            input = $("#" + this.id + "_input");
            input.css("width", "inherit").css("height", "inherit");
            if (obj.style.fontSize != undefined) {
                input.css("font-szie", obj.style.fontSize);
            }
        };
        return TextView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.TextView = TextView;
});
//# sourceMappingURL=TextView.js.map