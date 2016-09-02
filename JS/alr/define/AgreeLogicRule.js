define(["require", "exports", "../../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    var AgreeLogicRule = (function () {
        function AgreeLogicRule() {
            this.componentElementMap = new HashMap_1.HashMap();
            this.endValueMap = new HashMap_1.HashMap();
            this.nodesList = new Array();
            this.lanes = new Array();
        }
        ;
        //--------------------------------------------------------adder------------------------------------------------
        AgreeLogicRule.prototype.addLane = function (lane) {
            this.lanes.push(lane);
        };
        AgreeLogicRule.prototype.addVarMap = function (expression, value) {
            if (this.varMap == undefined) {
                this.varMap = new HashMap_1.HashMap();
            }
            this.varMap.put(expression, value);
        };
        AgreeLogicRule.prototype.addComponentElement = function (ce) {
            this.componentElementMap.put(ce.getId(), ce);
        };
        AgreeLogicRule.prototype.addEndValue = function (id, value) {
            this.endValueMap.put(id, value);
        };
        //--------------------------------------------------------getter------------------------------------------------
        AgreeLogicRule.prototype.getLanes = function () {
            return this.lanes;
        };
        AgreeLogicRule.prototype.getVarMap = function () {
            return this.varMap;
        };
        AgreeLogicRule.prototype.getEndValue = function (end) {
            return this.endValueMap.get(end);
        };
        AgreeLogicRule.prototype.getEndValueMap = function () {
            return this.endValueMap;
        };
        AgreeLogicRule.prototype.getNode = function (nodeId) {
            return this.componentElementMap.get(nodeId);
        };
        AgreeLogicRule.prototype.getPath = function () {
            return this.path;
        };
        AgreeLogicRule.prototype.getStartNodeId = function () {
            return this.startNodeId;
        };
        AgreeLogicRule.prototype.getListNodes = function () {
            return this.nodesList;
        };
        //-------------------------------------------------------setter--------------------------------------------------
        AgreeLogicRule.prototype.setPath = function (path) {
            this.path = path;
        };
        AgreeLogicRule.prototype.setStartNodeId = function (startNodeId) {
            this.startNodeId = startNodeId;
        };
        return AgreeLogicRule;
    }());
    exports.AgreeLogicRule = AgreeLogicRule;
});
//# sourceMappingURL=AgreeLogicRule.js.map