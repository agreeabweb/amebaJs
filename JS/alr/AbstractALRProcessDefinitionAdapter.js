define(["require", "exports", "./define/ComponentElement", "./define/LogicletComponentElement", "./define/LFCComponentElement", "./define/AftComponentElement", "../runtime/Context", "../command/Command"], function (require, exports, ComponentElement_1, LogicletComponentElement_1, LFCComponentElement_1, AftComponentElement_1, Context_1, Command) {
    "use strict";
    var AbstractALRProcessDefinitionAdapter = (function () {
        function AbstractALRProcessDefinitionAdapter() {
        }
        AbstractALRProcessDefinitionAdapter.prototype.createInitRunnable = function (pits, definitionBean) {
            return null;
        };
        AbstractALRProcessDefinitionAdapter.prototype.createNodeRunnable = function (pits, definitionBean, nodeId) {
            var bean, node, varMap, keySet, endValue, pit, currentTask, ce;
            bean = definitionBean;
            node = bean.getNode(nodeId);
            if (bean.getVarMap() != null) {
                varMap = bean.getVarMap();
                keySet = varMap.keySet();
                for (var i = 0; i < keySet.length; i++) {
                    pits.addVarMap(keySet[i], varMap.get(keySet[i]));
                }
            }
            pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            if (node == null) {
                endValue = bean.getEndValue(nodeId);
                if (endValue != null) {
                    currentTask.end(endValue);
                }
                else {
                    currentTask.end("Not Found Process End Exception");
                }
            }
            else if (node instanceof LogicletComponentElement_1.LogicletComponentElement) {
                ce = node;
                this.performLogicletComponentElement(pits, bean, nodeId, ce);
            }
            else if (node instanceof LFCComponentElement_1.LFCComponentElement) {
                ce = node;
                this.performLfcComponentElement(pits, bean, nodeId, ce);
            }
            else if (node instanceof AftComponentElement_1.AftComponentElement) {
                ce = node;
                this.performAftComponentElement(pits, bean, nodeId, ce);
            }
        };
        AbstractALRProcessDefinitionAdapter.prototype.performLogicletComponentElement = function (pits, bean, nodeId, ce) {
            var name, pit, currentTask;
            name = ce.getName();
            pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            pit.getLogicRealm().setState("suspended");
            currentTask.setSuspend(true);
            // 调用组件
            Command.call(ce, function (result) {
                currentTask.setSuspend(false);
                // 出参处理
                var outArgMap = ce.getOutArgMap();
                if (outArgMap != undefined) {
                    var outArg = outArgMap.get("result");
                    if (outArg != undefined) {
                        Context_1.Context.getCurrent().get("DefaultExpressionEngine").assign(outArg.getContent(), result.outArgs.result, pits);
                    }
                }
                // 处理返回的执行结果
                console.log("组件返回结果： ");
                console.log(result);
                currentTask.end(result.end);
            });
        };
        AbstractALRProcessDefinitionAdapter.prototype.performLfcComponentElement = function (pits, bean, nodeId, ce) {
            var path, inArgMap, context, pif, pit, currentTask;
            path = ce.getPath();
            context = Context_1.Context.getCurrent();
            pif = context.get("ProcessInstanceFactory");
            pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            pit.getLogicRealm().setState("suspended");
            currentTask.setSuspend(true);
            pif.pitsByGettingPIT(pit.getLogicRealm(), path, function (newpits) {
                currentTask.setSuspend(false);
                // 启动新的PITS
                newpits.start(inArgMap, function (processResult) {
                    currentTask.end(processResult.getEnd()); // 完结父流程的当前节点
                    console.log("执行第PITS回调");
                    console.log("结束PITS：" + newpits.getId());
                });
            });
        };
        AbstractALRProcessDefinitionAdapter.prototype.performAftComponentElement = function (pits, bean, nodeId, ace) {
            var pit, currentTask, path, context, pif, inArgMap;
            path = ace.getPath();
            context = Context_1.Context.getCurrent();
            pif = context.get("ProcessInstanceFactory");
            pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            pit.getLogicRealm().setState("suspended");
            currentTask.setSuspend(true);
            pif.pitsByGettingPIT(pit.getLogicRealm(), path, function (newpits) {
                currentTask.setSuspend(false);
                // 启动新的PITS
                newpits.start(inArgMap, function (processResult) {
                    currentTask.end(processResult.getEnd()); // 完结父流程的当前节点
                    console.log("执行第PITS回调");
                    console.log("结束PITS：" + newpits.getId());
                });
            });
        };
        AbstractALRProcessDefinitionAdapter.prototype.getExceptionNext = function (definitionBean, nodeId) {
            var bean, node, ce;
            bean = definitionBean;
            node = bean.getNode(nodeId);
            if (node instanceof ComponentElement_1.ComponentElement) {
                ce = node;
                return ce.getExceptionNext();
            }
            return null;
        };
        AbstractALRProcessDefinitionAdapter.prototype.getNodeCaption = function (definitionBean, nodeId) {
            var bean, node, ce, endValue;
            bean = definitionBean;
            node = bean.getNode(nodeId);
            if (node == null) {
                endValue = bean.getEndValue(nodeId);
                return endValue + "( " + nodeId + " )";
            }
            else if (node instanceof ComponentElement_1.ComponentElement) {
                ce = node;
                return ce.getCaption() + "( " + nodeId + " )" + ", showId( " + ce.getShowId() + " )";
            }
            return "节点( " + nodeId + " )";
        };
        AbstractALRProcessDefinitionAdapter.prototype.getOutNextMap = function (definitionBean, nodeId) {
            var bean, node, ce;
            bean = definitionBean;
            node = bean.getNode(nodeId);
            if (node instanceof ComponentElement_1.ComponentElement) {
                ce = node;
                return ce.getOutNextMap();
            }
            return null;
        };
        AbstractALRProcessDefinitionAdapter.prototype.getStartNodeId = function (definitionBean) {
            return definitionBean.getStartNodeId();
        };
        AbstractALRProcessDefinitionAdapter.prototype.getEndValueMap = function (definitionBean) {
            return definitionBean.getEndValueMap();
        };
        return AbstractALRProcessDefinitionAdapter;
    }());
    exports.AbstractALRProcessDefinitionAdapter = AbstractALRProcessDefinitionAdapter;
});
//# sourceMappingURL=AbstractALRProcessDefinitionAdapter.js.map