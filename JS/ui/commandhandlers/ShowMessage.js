define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var ShowMessage = (function () {
        function ShowMessage() {
        }
        ShowMessage.prototype.handleCommand = function (command, callback) {
            var type = command.getExtraData().get("type").getContent();
            var content = command.getExtraData().get("content").getContent();
            if (type === "info" || type === "Info") {
                alert(content);
            }
            var end = "success";
            callback({
                end: end
            });
        };
        return ShowMessage;
    }());
    exports.ShowMessage = ShowMessage;
});
//# sourceMappingURL=ShowMessage.js.map