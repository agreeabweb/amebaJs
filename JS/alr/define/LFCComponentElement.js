var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./ComponentElement"], function (require, exports, ComponentElement_1) {
    "use strict";
    var LFCComponentElement = (function (_super) {
        __extends(LFCComponentElement, _super);
        function LFCComponentElement() {
            _super.apply(this, arguments);
        }
        //--------------------------------------------------------adder-------------------------------------------
        LFCComponentElement.prototype.addMapping = function (target, source) {
            this.mapping.put(target, source);
        };
        //------------------------------------------------------getter--------------------------------------------
        LFCComponentElement.prototype.getMapping = function () {
            return this.mapping;
        };
        LFCComponentElement.prototype.getPath = function () {
            return this.path;
        };
        //------------------------------------------------------setter---------------------------------------------
        LFCComponentElement.prototype.setPath = function (path) {
            this.path = path;
        };
        return LFCComponentElement;
    }(ComponentElement_1.ComponentElement));
    exports.LFCComponentElement = LFCComponentElement;
});
//# sourceMappingURL=LFCComponentElement.js.map