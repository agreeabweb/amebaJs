define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var Command = (function () {
        //
        // constructor(name:string, data:any) {
        //     this.name = name;
        //     this.extraData = data;
        // }
        function Command(name, ctx, path, callback, extra) {
            this.name = name;
            this.ctx = ctx;
            this.path = path;
            this.callback = callback;
            this.extraData = extra;
        }
        Command.prototype.getCallback = function () {
            return this.callback;
        };
        Command.prototype.setCallback = function (callback) {
            this.callback = callback;
        };
        Command.prototype.getPath = function () {
            return this.path;
        };
        Command.prototype.setPath = function (path) {
            this.path = path;
        };
        Command.prototype.getContext = function () {
            return this.ctx;
        };
        Command.prototype.setContext = function (ctx) {
            this.ctx = ctx;
        };
        Command.prototype.getName = function () {
            return this.name;
        };
        Command.prototype.getExtraData = function () {
            return this.extraData;
        };
        Command.prototype.setExtraData = function (extraData) {
            this.extraData = extraData;
        };
        return Command;
    }());
    exports.Command = Command;
});
//# sourceMappingURL=Command.js.map