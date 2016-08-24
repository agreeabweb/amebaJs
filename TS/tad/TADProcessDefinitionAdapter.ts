import {Context} from "../runtime/Context";
import {MPTStep} from "../mpt/define/MPTStep";
import {LogicStep} from "../mpt/define/LogicStep";
import {MPTFile} from "../mpt/define/MPTFile";
import {LFCFile} from "../mpt/define/LFCFile";
import {UIFile} from "../mpt/define/UIFile";
import {SedaStep} from "../mpt/define/SedaStep";
import {UIStep} from "../mpt/define/UIStep";
import {IProcessDefinitionAdapter} from "../engine/process/IProcessDefinitionAdapter";
import {ProcessInstanceThreadSegment} from "../engine/process/ProcessInstanceThreadSegment";
import {TradeAssemblyDefine} from "./define/TradeAssemblyDefine";
import {MainProcessTemplate} from "../mpt/define/MainProcessTemplate";
import {HashMap} from "../lib/HashMap";
import {AbstractSedaEntry} from "../alr/define/AbstractSedaEntry";
import {UIStepLogiclet} from "../trade/logiclet/UIStepLogiclet";

class TADProcessDefinitionAdapter implements IProcessDefinitionAdapter {
    private uiStepLogiclet: UIStepLogiclet;
    
    public constructor() {
        this.uiStepLogiclet = new UIStepLogiclet();
    };

    public parse(path: string, inputStream: string, callback: Function): void {
        
        Context.getCurrent().get("ResourceDocumentTable").getDocument(path, "TradeAssemblyDefine", function(tad) {
            Context.getCurrent().get("ResourceDocumentTable").getDocument(tad.getMPTPath(), "MainProcessTemplate", function(mpt) {
                tad.setMPT(mpt);
                callback(tad);
            });
            
        });
        
    };
    public createInitRunnable(): void {
        
    };
    public createNodeRunnable(pits: ProcessInstanceThreadSegment, definitionBean: Object, nodeId: string): void {
        var tadBean, mptBean, node, varMap;
        if(nodeId == undefined) {
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
            for(var i = 0; i < varMap.length; i++) {
                Context.getCurrent().get("DefaultExpressionEngine").addTadVarMap("tadVarMap()." + varMap[i]);
            }
        }
        if (tadBean.getVarMap() != null) {
            varMap = tadBean.getVarMap();
            for(var i = 0; i < varMap.length; i++) {
                Context.getCurrent().get("DefaultExpressionEngine").addTadVarMap("tadVarMap()." + varMap[i]);
            }
        }
        if(node == null) {
            // 2. 是一个结束，返回
        }
        // 3. 分类执行
        if(node instanceof LFCFile) {
            this.performLfc(pits, tadBean, mptBean, node);
        } else if(node instanceof LogicStep) {
            this.performLogicStep(pits, tadBean, mptBean, node);
        } else if(node instanceof SedaStep) {
            this.performSedaStep(pits, tadBean, mptBean, node);
        } else if(node instanceof UIFile) {
            this.performUI(pits, mptBean, node);
        } else if(node instanceof UIStep) {
            this.performUIStep(pits, tadBean, mptBean, node);
        }
    };

    public performLfc(pits: ProcessInstanceThreadSegment, tadBean: TradeAssemblyDefine, mptBean: MainProcessTemplate, step: MPTStep): void {
        var context, pif, pit, currentTask, inArgMap, path;
        
        path = (<LFCFile>step).getPath();
        
        context = Context.getCurrent();
        pif = context.get("ProcessInstanceFactory");
        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点

        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);

        pif.pitsByGettingPIT(pit.getLogicRealm(), path, function(newpits) {  // 创建新的PITS
            currentTask.setSuspend(false);
            // 启动新的PITS
            newpits.start(inArgMap, function(processResult) {
                
                currentTask.end(processResult.getEnd()); // 完结父流程的当前节点
                
                console.log("执行PITS回调");
                console.log("结束PITS：" + newpits.getId());
            });
        });
    };

    public performLogicStep(pits: ProcessInstanceThreadSegment, tadBean: TradeAssemblyDefine, mptBean: MainProcessTemplate, step: MPTStep): void {
        var context, pif, pit, currentTask, inArgMap, inArgExprMap, path;
        
        // 1. 出入参表达式
        inArgExprMap = tadBean.getNodeInArgExpressionMap(step.getId());
        inArgMap = new HashMap();
        var keySet = inArgExprMap.keySet();
        for(var i = 0; i < keySet.length; i++) {
            var name = keySet[i];
            var expr = inArgExprMap.get(keySet[i]);
            var value = Context.getCurrent().get("DefaultExpressionEngine").evaluate(expr);
            inArgMap.put(name, value);
        }

        path = inArgMap.get("path");

        context = Context.getCurrent();
        pif = context.get("ProcessInstanceFactory");
        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点

        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);

        pif.pitsByGettingPIT(pit.getLogicRealm(), path, function(newpits) {  // 创建新的PITS
            currentTask.setSuspend(false);
            // 启动新的PITS
            newpits.start(inArgMap, function(processResult) {
                
                currentTask.end(processResult.getEnd()); // 完结父流程的当前节点
                
                console.log("执行PITS回调");
                console.log("结束PITS：" + newpits.getId());
            });
        });
    };

    public performSedaStep(pits: ProcessInstanceThreadSegment, tadBean: TradeAssemblyDefine, mptBean: MainProcessTemplate, step: MPTStep) {
        var tadPath, temp, sedaPath, pit, currentTask, listAse, abstractEntryList;

        tadPath = tadBean.getPath();
        temp = tadPath.split("/");
        sedaPath = "";
        for(var i = 0; i < temp.length - 1; i++) {
            sedaPath += temp[i] + "/";
        }
        sedaPath += "seda.conf";

        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点

        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);

        Context.getCurrent().get("ResourceDocumentTable").getDocument(sedaPath, "SedaEntry", function(sedaEntry) {
            currentTask.setSuspend(false);
            if(sedaEntry == null) {
                return;
            }
            var pass = true;

            listAse = new Array<AbstractSedaEntry>();
            abstractEntryList = sedaEntry.getListAbstractEntry();
            for(var i = 0; i < abstractEntryList.length; i++) {
                if(tadBean.getMPTPath() === abstractEntryList[i].getPath() && step.getId() === abstractEntryList[i].getNodeId()) {
                    listAse.push(abstractEntryList[i]);
                }
                if(tadPath === abstractEntryList[i].getPath() && step.getId() === abstractEntryList[i].getNodeId()) {
                    listAse.push(abstractEntryList);
                }
            }
            for(var i = 0; i < listAse.length; i++) {
                if(listAse[i] != null && listAse[i].getListAlr() != null && listAse[i].getListAlr().length > 0) {
                    pass = true;
                    var mapping = new HashMap();
                    var alrList = listAse[i].getListAlr();
                    
                    for(let j = alrList.length - 1; j >= 0; j--) {
                        var alrPath = alrList[j].getPath();
                        if(alrList[j].getListDataMapping() != null && alrList[i].getListDataMapping().length > 0) {
                            var listDataMapping = alrList[i].getListDataMapping();
                            for(var k = 0; k < listDataMapping.length; k++) {
                                mapping = listDataMapping[k].getMapping();
                            }
                        }
                        
                        pit.getLogicRealm().setState("suspended");
                        currentTask.setSuspend(true);

                        Context.getCurrent().get("ProcessInstanceFactory").pitsByGettingPIT(pit.getLogicRealm(), alrPath, function(newpits) {
                   	        let temp = j;
                            currentTask.setSuspend(false);
                            newpits.start(null, function(processResult) {
                                if(processResult.getEnd() === "pass") {
                                    pass = pass && true;
                                } else {
                                    pass = pass && false;
                                }
                                console.log("执行PITS回调");
                                console.log("结束PITS：" + newpits.getId());
                                if(temp <= 0) {
                                    if(pass) {
                                        currentTask.end("pass");
                                    } else {
                                        currentTask.end("block");
                                    }
                                } else {
                                    pit.getLogicRealm().setState("suspended");
                                    currentTask.setSuspend(true);
                                }
                            });
                        });
                    } 
                }
            }
        });
    };

    public performUI(pits: ProcessInstanceThreadSegment, mptBean: MainProcessTemplate, step: MPTStep): void {
        console.log("此节点为UIStep");
        var uiFile, path, inArgExprMap, inArgMap, inArgExprMapKeySet, 
            mapping, target, currentTask;

        uiFile = <UIFile> step;

        inArgExprMap = uiFile.getInArgMap();
        inArgMap = new HashMap();
        inArgExprMapKeySet = inArgExprMap.keySet();
        for(var i = 0; i < inArgExprMapKeySet.length; i++) {
            let name, expr, value;
            name = inArgExprMapKeySet[i];
            expr = inArgExprMap.get(name);
            value = Context.getCurrent().get("DefaultExpressionEngine").evaluate(expr);
            if(value == null) {
                continue;
            }
            inArgMap.put(name, value);
        }

        mapping = uiFile.getMapping();
        path = uiFile.getPath();
        inArgMap.put("path", path);
        inArgMap.put("mapping", mapping);

        target = Context.getCurrent().get("DefaultExpressionEngine").evaluate(uiFile.getTarget());
        inArgMap.put("target", target);

        var pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点
            
        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);

        this.uiStepLogiclet.call(pits, inArgMap, function(processResult) {
            currentTask.setSuspend(false);
            currentTask.end(processResult.getEnd());
        });

        
    };

    public performUIStep(pits: ProcessInstanceThreadSegment, tadBean: TradeAssemblyDefine, mptBean: MainProcessTemplate, step: MPTStep): void {
        var inArgExprMap, inArgExprMapKeySet, inArgMap, mapping, currentTask;

        inArgExprMap = tadBean.getNodeInArgExpressionMap(step.getId());
        inArgMap = new HashMap();
        inArgExprMapKeySet = inArgExprMap.keySet();
        for(var i = 0; i < inArgExprMapKeySet.length; i++) {
            let name, expr, value;
            name = inArgExprMapKeySet[i];
            expr = inArgExprMap.get(name);
            value = Context.getCurrent().get("DefaultExpressionEngine").evaluate(expr);
            if(value == null) {
                continue;
            }
            inArgMap.put(name, value);
        }
        
        mapping = tadBean.getNodeMapping(step.getId());
        if(mapping != null) {
            inArgMap.put("mapping", mapping);
        }

        var pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点
            
        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);

        this.uiStepLogiclet.call(pits, inArgMap, function(processResult) {
            currentTask.setSuspend(false);
            currentTask.end(processResult.getEnd());
        });
    }
    
    //-----------------------------------------------getter-----------------------------------------------------
    public getStartNodeId(definitionBean: Object): string {
        return this.getMPT(definitionBean).getStartNodeId();
    };
    public getMPT(definitionBean: Object): MainProcessTemplate {
        return this.getTAD(definitionBean).getMPT();
    };
    public getTAD(definitionBean: Object): TradeAssemblyDefine {
        return <TradeAssemblyDefine>definitionBean;
    };
    public getExceptionNext(definitionBean: Object, nodeId: string): string {
        var step;

        step = this.getMPT(definitionBean).getStep(nodeId);
        if(step == null) {
            return null;
        }

        return step.getExceptionNext();
    };
    public getNodeCaption(definitionBean: Object, nodeId: string): string {
        var bean, node;

        // 1. 获取node
        bean = this.getMPT(definitionBean);
        node = bean.getStep(nodeId);
        if (node == null)
        {
            // 2.a 是一个结束，返回
            var endValue = bean.getEndValue(nodeId);
            return "End:" + nodeId + "->" + endValue;
        }
        // 2.b 是一个普通节点
        return node.getClass().getSimpleName() + "(" + node.getId() + "):"
                + bean.getStep(node.getId()).getCaption() + ",showId("
                + node.getShowId() + ")";
    };

    public getOutNextMap(definitionBean: Object, nodeId: string): HashMap {
        var step = this.getMPT(definitionBean).getStep(nodeId);
        if (step == null)
        {
            return null;
        }
        return step.getOutNextMap();
    };
    public getEndValueMap(definitionBean: Object): HashMap {
        return null;
    };

    public getFileExtension(): string {
        return "tad";
    };
};

export {TADProcessDefinitionAdapter};