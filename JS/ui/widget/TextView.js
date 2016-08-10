var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-09 0009.
     */
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
        TextView.prototype.bindEvent = function (eventType, flowType, path) {
            var view = this;
            if (eventType === "click") {
                view.getNode().on("click", function () {
                    alert("click");
                    view.getHost().queueTaskPack(view.getMission(flowType, path));
                });
            }
            if (eventType === "change") {
                view.getNode().on("change", function () {
                    alert("change");
                    view.getHost().queueTaskPack(view.getMission(flowType, path));
                });
            }
        };
        return TextView;
    }(AbstractView_1.AbstractView));
    exports.TextView = TextView;
});
//# sourceMappingURL=TextView.js.map