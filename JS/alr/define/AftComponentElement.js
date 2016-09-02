var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./ComponentElement"], function (require, exports, ComponentElement_1) {
    "use strict";
    var AftComponentElement = (function (_super) {
        __extends(AftComponentElement, _super);
        function AftComponentElement() {
            _super.apply(this, arguments);
        }
        //-------------------------------------------------------adder----------------------------------------
        AftComponentElement.prototype.addMapping = function (target, source) {
            this.mapping.put(target, source);
        };
        //------------------------------------------------------getter---------------------------------------
        AftComponentElement.prototype.getMapping = function () {
            return this.mapping;
        };
        AftComponentElement.prototype.getPath = function () {
            return this.path;
        };
        //-------------------------------------------------------setter--------------------------------------
        AftComponentElement.prototype.setPath = function (path) {
            this.path = path;
        };
        return AftComponentElement;
    }(ComponentElement_1.ComponentElement));
    exports.AftComponentElement = AftComponentElement;
});
//# sourceMappingURL=AftComponentElement.js.map