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
        function TextView(id, host) {
            _super.call(this, id, host);
        }
        TextView.prototype.bindEvent = function (type, event, path) {
            if (evemt === "click") {
                this.$thisNode.on("click", function () {
                    this.host.queueTaskPack(this.getMission(type, path));
                });
            }
        };
        return TextView;
    }(AbstractView_1.AbstractView));
    exports.TextView = TextView;
});
//# sourceMappingURL=TextView.js.map