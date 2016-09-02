var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView"], function (require, exports, AbstractAxureView_1) {
    "use strict";
    var ListBoxView = (function (_super) {
        __extends(ListBoxView, _super);
        function ListBoxView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        ListBoxView.prototype.bindEvent = function (actionName, action) {
            this.bindEventToTarget($("#" + this.id + " select"), actionName, action);
        };
        ListBoxView.prototype.GetSelectedOption = function () {
            var options = $("#" + this.id + " select option");
            for (var i = 0; i < options.length; i++) {
                if ($(options[i]).prop("selected") === true) {
                    return $(options[i]).val();
                }
            }
            return null;
        };
        ListBoxView.prototype.layout = function (obj) {
            var dom, list;
            dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            list = $("#" + this.id + " select");
            list.css("width", obj.style.size.width).css("height", obj.style.size.height);
            if (obj.style.fontSize != undefined) {
                list.css("font-size", obj.style.fontSize);
            }
        };
        return ListBoxView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.ListBoxView = ListBoxView;
});
//# sourceMappingURL=ListBoxView.js.map