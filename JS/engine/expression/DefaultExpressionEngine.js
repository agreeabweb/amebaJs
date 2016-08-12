define(["require", "exports", "../../lib/HashMap", "../../runtime/Context"], function (require, exports, HashMap_1, Context_1) {
    "use strict";
    var DefaultExpressionEngine = (function () {
        function DefaultExpressionEngine() {
            this.expression = new HashMap_1.HashMap();
        }
        ;
        /**
         * 赋值
         */
        DefaultExpressionEngine.prototype.assign = function (expression, value, pits) {
            if (expression != undefined) {
                if (expression.match(/^varMap()./)) {
                    pits.addVarMap(expression, value);
                }
                else if (expression.match(/^tadVarMap()./)) {
                    this.expression.put(expression, value);
                }
            }
        };
        ;
        /**
         * 取值
         */
        DefaultExpressionEngine.prototype.evaluate = function (expression, pits) {
            var value;
            if (expression != undefined) {
                if (expression.match(/^varMap()./)) {
                    value = pits.getVarMap(expression);
                    console.log(pits.getCoreTask().getName() + " 中表达式：" + expression + " 的值为: " + value);
                    if (value == null) {
                        return "";
                    }
                    else {
                        return value;
                    }
                }
                else if (expression.match(/^tadVarMap()./)) {
                    value = this.expression.get(expression);
                    console.log(pits.getCoreTask().getName() + " 中表达式：" + expression + " 的值为: " + value);
                    if (value == null) {
                        return "";
                    }
                    else {
                        return value;
                    }
                }
                else if (expression.match(/^dm()./)) {
                    var dm = expression.split(".")[1];
                    var dataModel = Context_1.Context.getCurrent().get("DataModel");
                    value = dataModel.get(dm);
                    if (value == undefined) {
                        return "";
                    }
                    else {
                        return value;
                    }
                }
                else {
                    return expression;
                }
            }
            else {
                return "";
            }
        };
        ;
        DefaultExpressionEngine.prototype.addTadVarMap = function (expression) {
            if (expression != undefined) {
                this.expression.put(expression, null);
            }
        };
        ;
        return DefaultExpressionEngine;
    }());
    exports.DefaultExpressionEngine = DefaultExpressionEngine;
    ;
});
//# sourceMappingURL=DefaultExpressionEngine.js.map