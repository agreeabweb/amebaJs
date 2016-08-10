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
        function TextView(id, host, thisNode) {
            _super.call(this, id, host, thisNode);
        }
        TextView.prototype.bindEvent = function (type, event, path) {
            if (event === "click") {
                this.$thisNode.on("click", function () {
                    this.host.queueTaskPack(this.getMission(type, path));
                });
            }
        };
        TextView.prototype.modelChanged = function (val) {
        };
        TextView.prototype.updateModel = function (val) {
        };
        return TextView;
    }(AbstractView_1.AbstractView));
    exports.TextView = TextView;
});
//# sourceMappingURL=TextView.js.map