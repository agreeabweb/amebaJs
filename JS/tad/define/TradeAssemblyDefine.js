define(["require", "exports", "../../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    var TradeAssemblyDefine = (function () {
        function TradeAssemblyDefine() {
            this.nodeInArgExpressionMap = new HashMap_1.HashMap();
            this.nodeOutArgExpressionMap = new HashMap_1.HashMap();
            this.nodeMapping = new HashMap_1.HashMap();
            this.varMap = new HashMap_1.HashMap();
        }
        ;
        //------------------------------------------adder--------------------------------------------------------
        TradeAssemblyDefine.prototype.addNodeInArg = function (nodeId, argName, argExpression) {
            if (argExpression == undefined) {
                return;
            }
            var map = this.nodeInArgExpressionMap.get(nodeId);
            if (map == null) {
                this.nodeInArgExpressionMap.put(nodeId, new HashMap_1.HashMap());
                map = this.nodeInArgExpressionMap.get(nodeId);
            }
            map.put(argName, argExpression);
        };
        ;
        TradeAssemblyDefine.prototype.addNodeOutArg = function (nodeId, argName, argExpression) {
            if (argExpression == undefined) {
                return;
            }
            var map = this.nodeOutArgExpressionMap.get(nodeId);
            if (map == null) {
                this.nodeOutArgExpressionMap.put(nodeId, new HashMap_1.HashMap());
                map = this.nodeOutArgExpressionMap.get(nodeId);
            }
            map.put(argName, argExpression);
        };
        ;
        TradeAssemblyDefine.prototype.addNodeMapping = function (nodeId, target, source) {
            var map = this.nodeMapping.get(nodeId);
            if (map == null) {
                this.nodeMapping.put(nodeId, new HashMap_1.HashMap());
                map = this.nodeMapping.get(nodeId);
            }
            map.put(target, source);
        };
        ;
        TradeAssemblyDefine.prototype.addVarMap = function (expression, value) {
            this.varMap.put(expression, value);
        };
        ;
        //------------------------------------------setter-------------------------------------------------------
        TradeAssemblyDefine.prototype.setPath = function (path) {
            this.path = path;
        };
        ;
        TradeAssemblyDefine.prototype.setMPT = function (mpt) {
            this.mpt = mpt;
        };
        ;
        TradeAssemblyDefine.prototype.setMPTPath = function (mptPath) {
            this.mptPath = mptPath;
        };
        ;
        //------------------------------------------getter-------------------------------------------------------
        TradeAssemblyDefine.prototype.getPath = function () {
            return this.path;
        };
        ;
        TradeAssemblyDefine.prototype.getMPT = function () {
            return this.mpt;
        };
        ;
        TradeAssemblyDefine.prototype.getMPTPath = function () {
            return this.mptPath;
        };
        ;
        TradeAssemblyDefine.prototype.getVarMap = function () {
            return this.varMap;
        };
        ;
        TradeAssemblyDefine.prototype.getNodeInArgExpressionMap = function (nodeId) {
            return this.nodeInArgExpressionMap.get(nodeId);
        };
        ;
        TradeAssemblyDefine.prototype.getNodeOutArgExpressionMap = function (nodeId) {
            return this.nodeOutArgExpressionMap.get(nodeId);
        };
        ;
        TradeAssemblyDefine.prototype.getNodeMapping = function (nodeId) {
            return this.nodeMapping.get(nodeId);
        };
        ;
        return TradeAssemblyDefine;
    }());
    exports.TradeAssemblyDefine = TradeAssemblyDefine;
    ;
});
//# sourceMappingURL=TradeAssemblyDefine.js.map