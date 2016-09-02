var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./ComponentElement"], function (require, exports, ComponentElement_1) {
    "use strict";
    var LogicletComponentElement = (function (_super) {
        __extends(LogicletComponentElement, _super);
        function LogicletComponentElement() {
            _super.apply(this, arguments);
        }
        //--------------------------------------getter-----------------------------
        LogicletComponentElement.prototype.getName = function () {
            return this.name;
        };
        //--------------------------------------setter-------------------------------
        LogicletComponentElement.prototype.setName = function (name) {
            this.name = name;
        };
        return LogicletComponentElement;
    }(ComponentElement_1.ComponentElement));
    exports.LogicletComponentElement = LogicletComponentElement;
});
//# sourceMappingURL=LogicletComponentElement.js.map