define(["require", "exports"], function (require, exports) {
    "use strict";
    var ArgElement = (function () {
        function ArgElement() {
        }
        //----------------------------------------getter------------------------------------------
        ArgElement.prototype.getName = function () {
            return this.name;
        };
        ArgElement.prototype.getCaption = function () {
            return this.caption;
        };
        ArgElement.prototype.getContent = function () {
            return this.content;
        };
        //-------------------------------------------setter---------------------------------------
        ArgElement.prototype.setName = function (name) {
            this.name = name;
        };
        ArgElement.prototype.setCaption = function (caption) {
            this.caption = caption;
        };
        ArgElement.prototype.setContent = function (content) {
            this.content = content;
        };
        return ArgElement;
    }());
    exports.ArgElement = ArgElement;
});
//# sourceMappingURL=ArgElement.js.map