define(["require", "exports"], function (require, exports) {
    "use strict";
    var AEvent = (function () {
        function AEvent() {
        }
        AEvent.addEvent = function (target, type, fn) {
            if (typeof this._listeners[target] === "undefined") {
                this._listeners[target] = {};
            }
            if (typeof this._listeners[target][type] === "undefined") {
                this._listeners[target][type] = [];
            }
            if (typeof fn === "function") {
                this._listeners[target][type].push(fn);
                return true;
            }
            else {
                return false;
            }
        };
        AEvent.fireEvent = function (target, type) {
            if (typeof this._listeners[target] === "undefined") {
                return false;
            }
            if (typeof this._listeners[target][type] === "undefined") {
                return false;
            }
            var arrayEvent = this._listeners[target][type];
            if (arrayEvent instanceof Array) {
                for (var i = 0; i < arrayEvent.length; i++) {
                    if (typeof arrayEvent[i] === "function") {
                        arrayEvent[i]({ type: type });
                    }
                }
            }
        };
        AEvent.checkEventIsExsit = function (target, type) {
            if (typeof this._listeners[target] === "undefined") {
                return false;
            }
            else if (typeof this._listeners[target][type] === "undefined") {
                return false;
            }
            else {
                return true;
            }
        };
        AEvent._listeners = {};
        return AEvent;
    }());
    exports.AEvent = AEvent;
});
//# sourceMappingURL=Event.js.map