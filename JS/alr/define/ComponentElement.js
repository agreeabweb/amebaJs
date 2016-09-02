define(["require", "exports", "../../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    var ComponentElement = (function () {
        function ComponentElement() {
            this.inArgMap = new HashMap_1.HashMap();
            this.outArgMap = new HashMap_1.HashMap();
            this.outNextMap = new HashMap_1.HashMap();
        }
        //-------------------------------------------------adder-------------------------------------------------
        ComponentElement.prototype.addInArg = function (ae) {
            this.inArgMap.put(ae.getName(), ae);
        };
        ComponentElement.prototype.addOutArg = function (ae) {
            this.outArgMap.put(ae.getName(), ae);
        };
        ComponentElement.prototype.addOutNext = function (id, next) {
            this.outNextMap.put(id, next);
        };
        //-------------------------------------------------getter-------------------------------------------------
        ComponentElement.prototype.getCaption = function () {
            return this.caption;
        };
        ComponentElement.prototype.getDescription = function () {
            return this.description;
        };
        ComponentElement.prototype.getExceptionNext = function () {
            return this.exceptionNext;
        };
        ComponentElement.prototype.getId = function () {
            return this.id;
        };
        ComponentElement.prototype.getShowId = function () {
            return this.showId;
        };
        ComponentElement.prototype.getInArgMap = function () {
            return this.inArgMap;
        };
        ComponentElement.prototype.getOutArgMap = function () {
            return this.outArgMap;
        };
        ComponentElement.prototype.getOutNextMap = function () {
            return this.outNextMap;
        };
        //-------------------------------------------------------------setter--------------------------------------
        ComponentElement.prototype.setCaption = function (caption) {
            this.caption = caption;
        };
        ComponentElement.prototype.setDescription = function (description) {
            this.description = description;
        };
        ComponentElement.prototype.setExceptionNext = function (exceptionNext) {
            this.exceptionNext = exceptionNext;
        };
        ComponentElement.prototype.setId = function (id) {
            this.id = id;
        };
        ComponentElement.prototype.setShowId = function (showId) {
            this.showId = showId;
        };
        return ComponentElement;
    }());
    exports.ComponentElement = ComponentElement;
});
//# sourceMappingURL=ComponentElement.js.map