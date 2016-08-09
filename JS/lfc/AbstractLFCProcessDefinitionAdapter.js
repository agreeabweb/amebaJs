define(["require", "exports", "../runtime/Context", "./define/LogicletComponentElement", "./define/LFCComponentElement", "../command/Command"], function (require, exports, Context_1, LogicletComponentElement_1, LFCComponentElement_1, Command) {
    "use strict";
    var AbstractLFCProcessDefinitionAdapter = (function () {
        function AbstractLFCProcessDefinitionAdapter() {
        }
        ;
        /**
         * 创建流程初始化的执行对象
         */
        AbstractLFCProcessDefinitionAdapter.prototype.createInitRunnable = function (pits, definitionBean) {
            // 将LFC的内部变量保存到pits里
            // var varMap = definitionBean.getVarMap();
            // for(var i = 0; i < varMap.length; i++) {
            //     pits.addVarMap("varMap()." + varMap[i]);
            // }
        };
        ;
        /**
         * 创建指定节点的执行对象
         */
        AbstractLFCProcessDefinitionAdapter.prototype.createNodeRunnable = function (pits, definitionBean, nodeId) {
            var bean, node;
            // 获取节点信息
            bean = definitionBean;
            node = bean.getNode(nodeId);
            var inArgMap = node.inArgMap;
            if (inArgMap != undefined) {
                for (var inArg in inArgMap.map) {
                    var arg = inArgMap.get(inArg);
                    if (arg != undefined) {
                        var value = Context_1.Context.getCurrent().get("DefaultExpressionEngine").evaluate(arg.getContent(), pits);
                        arg.setContent(value);
                    }
                }
            }
            // 判断节点类型并进行相应的处理
            if (node instanceof LogicletComponentElement_1.LogicletComponentElement) {
                console.log("该节点为component组件: " + node.getName());
                this.performLogicletComponentElement(pits, node);
            }
            else if (node instanceof LFCComponentElement_1.LFCComponentElement) {
                console.log("该节点为lfc组件");
                this.performLfcComponentElement(pits, node);
            }
        };
        ;
        /**
         * 处理指令形式的技术组件
         */
        AbstractLFCProcessDefinitionAdapter.prototype.performLogicletComponentElement = function (pits, componentElement) {
            var outArgMap, currentTask, pit;
            pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            pit.getLogicRealm().setState("suspended");
            currentTask.setSuspend(true);
            // 调用组件
            Command.call(componentElement, function (result) {
                currentTask.setSuspend(false);
                // 出参处理
                console.log("执行callback：" + result.end);
                outArgMap = componentElement.getOutArgMap();
                if (outArgMap != undefined) {
                    var outArg = outArgMap.get("result");
                    if (outArg != undefined) {
                        Context_1.Context.getCurrent().get("DefaultExpressionEngine").assign(outArg.getContent(), result.outArgs.result, pits);
                    }
                }
                // 处理返回的执行结果
                console.log(currentTask.getName() + " 组件返回结果： ");
                console.log(result.end);
                currentTask.end(result.end);
            });
        };
        ;
        /**
         * 处理LFC逻辑技术组件
         */
        AbstractLFCProcessDefinitionAdapter.prototype.performLfcComponentElement = function (pits, componentElement) {
            var path, inArgMap, context, pif, pit, currentTask;
            path = componentElement.getPath();
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
        ;
        //----------------------------------------------------getter------------------------------------------------------
        AbstractLFCProcessDefinitionAdapter.prototype.getStartNodeId = function (definitionBean) {
            return definitionBean.getStartNodeId();
        };
        ;
        AbstractLFCProcessDefinitionAdapter.prototype.getOutNextMap = function (definitionBean, nodeId) {
            var node;
            node = definitionBean.getNode(nodeId);
            return node.getOutNextMap();
        };
        ;
        AbstractLFCProcessDefinitionAdapter.prototype.getExceptionNext = function (definitionBean, nodeId) {
            var node;
            node = definitionBean.getNode(nodeId);
            return node.getExceptionNext();
        };
        ;
        AbstractLFCProcessDefinitionAdapter.prototype.getNodeCaption = function (definitionBean, nodeId) {
            var node;
            node = definitionBean.getNode(nodeId);
            return node.getNodeCaption();
        };
        ;
        AbstractLFCProcessDefinitionAdapter.prototype.getEndValueMap = function (definitionBean) {
            return definitionBean.getEndValueMap();
        };
        ;
        return AbstractLFCProcessDefinitionAdapter;
    }());
    exports.AbstractLFCProcessDefinitionAdapter = AbstractLFCProcessDefinitionAdapter;
});
//# sourceMappingURL=AbstractLFCProcessDefinitionAdapter.js.map