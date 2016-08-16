define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var Command = (function () {
        function Command(name, data) {
            this.name = name;
            this.data = data;
        }
        Command.prototype.getContext = function () {
            return this.ctx;
        };
        Command.prototype.setContext = function (ctx) {
            this.ctx = ctx;
        };
        Command.prototype.getName = function () {
            return this.name;
        };
        Command.prototype.getData = function () {
            return this.data;
        };
        return Command;
    }());
    exports.Command = Command;
});
//# sourceMappingURL=Command.js.map