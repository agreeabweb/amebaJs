define(["require", "exports", "../runtime/Context", "../mpt/define/LogicStep", "../mpt/define/LFCFile", "../mpt/define/UIFile", "../mpt/define/SedaStep", "../mpt/define/UIStep", "../lib/HashMap", "../trade/logiclet/UIStepLogiclet"], function (require, exports, Context_1, LogicStep_1, LFCFile_1, UIFile_1, SedaStep_1, UIStep_1, HashMap_1, UIStepLogiclet_1) {
    "use strict";
    var TADProcessDefinitionAdapter = (function () {
        function TADProcessDefinitionAdapter() {
            this.uiStepLogiclet = new UIStepLogiclet_1.UIStepLogiclet();
        }
        ;
        TADProcessDefinitionAdapter.prototype.parse = function (path, inputStream, callback) {
            Context_1.Context.getCurrent().get("ResourceDocumentTable").getDocument(path, "TradeAssemblyDefine", function (tad) {
                Context_1.Context.getCurrent().get("ResourceDocumentTable").getDocument(tad.getMPTPath(), "MainProcessTemplate", function (mpt) {
                    tad.setMPT(mpt);
                    callback(tad);
                });
            });
        };
        ;
        TADProcessDefinitionAdapter.prototype.createInitRunnable = function () {
        };
        ;
        TADProcessDefinitionAdapter.prototype.createNodeRunnable = function (pits, definitionBean, nodeId) {
            var tadBean, mptBean, node, varMap;
            if (nodeId == undefined) {
                console.log("no nodeId");
                return;
            }
            // 1. 获取node
            tadBean = this.getTAD(definitionBean);
            mptBean = this.getMPT(definitionBean);
            node = mptBean.getStep(nodeId);
            // tadVarMap处理
            if (mptBean.getVarMap() != null) {
                varMap = mptBean.getVarMap();
                for (var i = 0; i < varMap.length; i++) {
                    Context_1.Context.getCurrent().get("DefaultExpressionEngine").addTadVarMap("tadVarMap()." + varMap[i]);
                }
            }
            if (tadBean.getVarMap() != null) {
                varMap = tadBean.getVarMap();
                for (var i = 0; i < varMap.length; i++) {
                    Context_1.Context.getCurrent().get("DefaultExpressionEngine").addTadVarMap("tadVarMap()." + varMap[i]);
                }
            }
            if (node == null) {
            }
            // 3. 分类执行
            if (node instanceof LFCFile_1.LFCFile) {
                this.performLfc(pits, tadBean, mptBean, node);
            }
            else if (node instanceof LogicStep_1.LogicStep) {
                this.performLogicStep(pits, tadBean, mptBean, node);
            }
            else if (node instanceof SedaStep_1.SedaStep) {
                this.performSedaStep(pits, tadBean, mptBean, node);
            }
            else if (node instanceof UIFile_1.UIFile) {
                this.performUI(pits, mptBean, node);
            }
            else if (node instanceof UIStep_1.UIStep) {
                this.performUIStep(pits, tadBean, mptBean, node);
            }
        };
        ;
        TADProcessDefinitionAdapter.prototype.performLfc = function (pits, tadBean, mptBean, step) {
            var context, pif, pit, currentTask, inArgMap, path;
            path = step.getPath();
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
                    console.log("执行PITS回调");
                    console.log("结束PITS：" + newpits.getId());
                });
            });
        };
        ;
        TADProcessDefinitionAdapter.prototype.performLogicStep = function (pits, tadBean, mptBean, step) {
            var context, pif, pit, currentTask, inArgMap, inArgExprMap, path;
            // 1. 出入参表达式
            inArgExprMap = tadBean.getNodeInArgExpressionMap(step.getId());
            inArgMap = new HashMap_1.HashMap();
            var keySet = inArgExprMap.keySet();
            for (var i = 0; i < keySet.length; i++) {
                var name = keySet[i];
                var expr = inArgExprMap.get(keySet[i]);
                var value = Context_1.Context.getCurrent().get("DefaultExpressionEngine").evaluate(expr);
                inArgMap.put(name, value);
            }
            path = inArgMap.get("path");
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
                    console.log("执行PITS回调");
                    console.log("结束PITS：" + newpits.getId());
                });
            });
        };
        ;
        TADProcessDefinitionAdapter.prototype.performSedaStep = function (pits, tadBean, mptBean, step) {
            var tadPath, temp, sedaPath, pit, currentTask, listAse, abstractEntryList;
            tadPath = tadBean.getPath();
            temp = tadPath.split("/");
            sedaPath = "";
            for (var i = 0; i < temp.length - 1; i++) {
                sedaPath += temp[i] + "/";
            }
            sedaPath += "seda.conf";
            pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            pit.getLogicRealm().setState("suspended");
            currentTask.setSuspend(true);
            Context_1.Context.getCurrent().get("ResourceDocumentTable").getDocument(sedaPath, "SedaEntry", function (sedaEntry) {
                currentTask.setSuspend(false);
                if (sedaEntry == null) {
                    return;
                }
                var pass = true;
                listAse = new Array();
                abstractEntryList = sedaEntry.getListAbstractEntry();
                for (var i = 0; i < abstractEntryList.length; i++) {
                    if (tadBean.getMPTPath() === abstractEntryList[i].getPath() && step.getId() === abstractEntryList[i].getNodeId()) {
                        listAse.push(abstractEntryList[i]);
                    }
                    if (tadPath === abstractEntryList[i].getPath() && step.getId() === abstractEntryList[i].getNodeId()) {
                        listAse.push(abstractEntryList);
                    }
                }
                for (var i = 0; i < listAse.length; i++) {
                    if (listAse[i] != null && listAse[i].getListAlr() != null && listAse[i].getListAlr().length > 0) {
                        pass = true;
                        var mapping = new HashMap_1.HashMap();
                        var alrList = listAse[i].getListAlr();
                        var _loop_1 = function(j) {
                            alrPath = alrList[j].getPath();
                            if (alrList[j].getListDataMapping() != null && alrList[i].getListDataMapping().length > 0) {
                                listDataMapping = alrList[i].getListDataMapping();
                                for (k = 0; k < listDataMapping.length; k++) {
                                    mapping = listDataMapping[k].getMapping();
                                }
                            }
                            pit.getLogicRealm().setState("suspended");
                            currentTask.setSuspend(true);
                            Context_1.Context.getCurrent().get("ProcessInstanceFactory").pitsByGettingPIT(pit.getLogicRealm(), alrPath, function (newpits) {
                                var temp = j;
                                currentTask.setSuspend(false);
                                newpits.start(null, function (processResult) {
                                    if (processResult.getEnd() === "pass") {
                                        pass = pass && true;
                                    }
                                    else {
                                        pass = pass && false;
                                    }
                                    console.log("执行PITS回调");
                                    console.log("结束PITS：" + newpits.getId());
                                    if (temp <= 0) {
                                        if (pass) {
                                            currentTask.end("pass");
                                        }
                                        else {
                                            currentTask.end("block");
                                        }
                                    }
                                    else {
                                        pit.getLogicRealm().setState("suspended");
                                        currentTask.setSuspend(true);
                                    }
                                });
                            });
                        };
                        var alrPath, listDataMapping, k;
                        for (var j = alrList.length - 1; j >= 0; j--) {
                            _loop_1(j);
                        }
                    }
                }
            });
        };
        ;
        TADProcessDefinitionAdapter.prototype.performUI = function (pits, mptBean, step) {
            console.log("此节点为UIStep");
            var uiFile, path, inArgExprMap, inArgMap, inArgExprMapKeySet, mapping, target, currentTask;
            uiFile = step;
            inArgExprMap = uiFile.getInArgMap();
            inArgMap = new HashMap_1.HashMap();
            inArgExprMapKeySet = inArgExprMap.keySet();
            for (var i = 0; i < inArgExprMapKeySet.length; i++) {
                var name_1 = void 0, expr = void 0, value = void 0;
                name_1 = inArgExprMapKeySet[i];
                expr = inArgExprMap.get(name_1);
                value = Context_1.Context.getCurrent().get("DefaultExpressionEngine").evaluate(expr);
                if (value == null) {
                    continue;
                }
                inArgMap.put(name_1, value);
            }
            mapping = uiFile.getMapping();
            path = uiFile.getPath();
            inArgMap.put("path", path);
            inArgMap.put("mapping", mapping);
            target = Context_1.Context.getCurrent().get("DefaultExpressionEngine").evaluate(uiFile.getTarget());
            inArgMap.put("target", target);
            var pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            pit.getLogicRealm().setState("suspended");
            currentTask.setSuspend(true);
            this.uiStepLogiclet.call(pits, inArgMap, function (processResult) {
                currentTask.setSuspend(false);
                currentTask.end(processResult.getEnd());
            });
        };
        ;
        TADProcessDefinitionAdapter.prototype.performUIStep = function (pits, tadBean, mptBean, step) {
            var inArgExprMap, inArgExprMapKeySet, inArgMap, mapping, currentTask;
            inArgExprMap = tadBean.getNodeInArgExpressionMap(step.getId());
            inArgMap = new HashMap_1.HashMap();
            inArgExprMapKeySet = inArgExprMap.keySet();
            for (var i = 0; i < inArgExprMapKeySet.length; i++) {
                var name_2 = void 0, expr = void 0, value = void 0;
                name_2 = inArgExprMapKeySet[i];
                expr = inArgExprMap.get(name_2);
                value = Context_1.Context.getCurrent().get("DefaultExpressionEngine").evaluate(expr);
                if (value == null) {
                    continue;
                }
                inArgMap.put(name_2, value);
            }
            mapping = tadBean.getNodeMapping(step.getId());
            if (mapping != null) {
                inArgMap.put("mapping", mapping);
            }
            var pit = pits.getProcessInstanceThread();
            currentTask = pit.getLogicRealm().getCurrentTask(); // 取得父流程的当前节点
            pit.getLogicRealm().setState("suspended");
            currentTask.setSuspend(true);
            this.uiStepLogiclet.call(pits, inArgMap, function (processResult) {
                currentTask.setSuspend(false);
                currentTask.end(processResult.getEnd());
            });
        };
        //-----------------------------------------------getter-----------------------------------------------------
        TADProcessDefinitionAdapter.prototype.getStartNodeId = function (definitionBean) {
            return this.getMPT(definitionBean).getStartNodeId();
        };
        ;
        TADProcessDefinitionAdapter.prototype.getMPT = function (definitionBean) {
            return this.getTAD(definitionBean).getMPT();
        };
        ;
        TADProcessDefinitionAdapter.prototype.getTAD = function (definitionBean) {
            return definitionBean;
        };
        ;
        TADProcessDefinitionAdapter.prototype.getExceptionNext = function (definitionBean, nodeId) {
            var step;
            step = this.getMPT(definitionBean).getStep(nodeId);
            if (step == null) {
                return null;
            }
            return step.getExceptionNext();
        };
        ;
        TADProcessDefinitionAdapter.prototype.getNodeCaption = function (definitionBean, nodeId) {
            var bean, node;
            // 1. 获取node
            bean = this.getMPT(definitionBean);
            node = bean.getStep(nodeId);
            if (node == null) {
                // 2.a 是一个结束，返回
                var endValue = bean.getEndValue(nodeId);
                return "End:" + nodeId + "->" + endValue;
            }
            // 2.b 是一个普通节点
            return node.getClass().getSimpleName() + "(" + node.getId() + "):"
                + bean.getStep(node.getId()).getCaption() + ",showId("
                + node.getShowId() + ")";
        };
        ;
        TADProcessDefinitionAdapter.prototype.getOutNextMap = function (definitionBean, nodeId) {
            var step = this.getMPT(definitionBean).getStep(nodeId);
            if (step == null) {
                return null;
            }
            return step.getOutNextMap();
        };
        ;
        TADProcessDefinitionAdapter.prototype.getEndValueMap = function (definitionBean) {
            return null;
        };
        ;
        TADProcessDefinitionAdapter.prototype.getFileExtension = function () {
            return "tad";
        };
        ;
        return TADProcessDefinitionAdapter;
    }());
    exports.TADProcessDefinitionAdapter = TADProcessDefinitionAdapter;
    ;
});
//# sourceMappingURL=TADProcessDefinitionAdapter.js.map