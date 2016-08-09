import {IProcessDefinitionAdapter} from "../engine/process/IProcessDefinitionAdapter";
import {ProcessInstanceThreadSegment} from "../engine/process/ProcessInstanceThreadSegment";
import {AgreeLogicRule} from "./define/AgreeLogicRule";
import {ComponentElement} from "./define/ComponentElement";
import {LogicletComponentElement} from "./define/LogicletComponentElement";
import {LFCComponentElement} from "./define/LFCComponentElement";
import {AftComponentElement} from "./define/AftComponentElement";
import {Context} from "../runtime/Context";
import {HashMap} from "../lib/HashMap";
import {LogicRealmTask} from "../runtime/realm/LogicRealmTask";
import * as Command from "../command/Command";

abstract class AbstractALRProcessDefinitionAdapter implements IProcessDefinitionAdapter {
    
    public createInitRunnable(pits: ProcessInstanceThreadSegment, definitionBean: Object): void {
        return null;
    }

    public createNodeRunnable(pits: ProcessInstanceThreadSegment, definitionBean: Object, nodeId: string): void {
        var bean, node, varMap, keySet, endValue, pit, currentTask, ce;

        bean = <AgreeLogicRule> definitionBean;
        node = bean.getNode(nodeId);
        if(bean.getVarMap() != null) {
            varMap = bean.getVarMap();
            keySet = varMap.keySet();
            for(var i = 0; i < keySet.length; i++) {
                pits.addVarMap(keySet[i], varMap.get(keySet[i]));
            }
        }

        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点
            
        if(node == null) {
            endValue = bean.getEndValue(nodeId);
            if(endValue != null) {
                currentTask.end(endValue);
            } else {
                currentTask.end("Not Found Process End Exception");
            }
        } else if(node instanceof LogicletComponentElement) {
            ce = <LogicletComponentElement> node;
            this.performLogicletComponentElement(pits, bean, nodeId, ce);
        } else if(node instanceof LFCComponentElement) {
            ce = <LFCComponentElement> node;
            this.performLfcComponentElement(pits, bean, nodeId, ce);
        } else if(node instanceof AftComponentElement) {
            ce = <AftComponentElement> node;
            this.performAftComponentElement(pits, bean, nodeId, ce);
        }
    }

    public performLogicletComponentElement(pits: ProcessInstanceThreadSegment, bean: AgreeLogicRule, nodeId: string, ce: LogicletComponentElement): void {
        var name, pit, currentTask;

        name = ce.getName();
        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点
        
        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);
        // 调用组件
        Command.call(ce, function(result) {
            // 出参处理
            var outArgMap = ce.getOutArgMap();
            if(outArgMap != undefined) {
                var outArg = outArgMap.get("result");
                if(outArg != undefined) {
                    Context.getCurrent().get("DefaultExpressionEngine").assign(outArg.getContent(), result.outArgs.result, pits);
                }
            }

            // 处理返回的执行结果
            console.log("组件返回结果： ");
            console.log(result);
            currentTask.end(result.end);
        });
        
    }

    public performLfcComponentElement(pits: ProcessInstanceThreadSegment, bean: AgreeLogicRule, nodeId: string, ce: LFCComponentElement): void {
        var path, inArgMap, context, pif, pit, currentTask;
        
        path = ce.getPath();
            
        context = Context.getCurrent();
        pif = context.get("ProcessInstanceFactory");
        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点

        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);

        pif.pitsByGettingPIT(pit.getLogicRealm(), path, function(newpits) { // 创建新的PITS
            currentTask.setSuspend(false);
            // 启动新的PITS
            newpits.start(inArgMap, function(processResult) {
                currentTask.end(processResult.getEnd()); // 完结父流程的当前节点
                console.log("执行第PITS回调");
                console.log("结束PITS：" + newpits.getId());
            });
        });
    }

    public performAftComponentElement(pits: ProcessInstanceThreadSegment, bean: AgreeLogicRule, nodeId: string, ace: AftComponentElement): void {
        var pit, currentTask, path, context, pif, inArgMap;
        
        path = ace.getPath();

        context = Context.getCurrent();
        pif = context.get("ProcessInstanceFactory");
        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点

        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);

        pif.pitsByGettingPIT(pit.getLogicRealm(), path, function(newpits) { // 创建新的PITS
            currentTask.setSuspend(false);
            // 启动新的PITS
            newpits.start(inArgMap, function(processResult) {
                currentTask.end(processResult.getEnd()); // 完结父流程的当前节点
                console.log("执行第PITS回调");
                console.log("结束PITS：" + newpits.getId());
            });
        });
        
    }

    public getExceptionNext(definitionBean: Object, nodeId: string): string {
        var bean, node, ce;
        bean = <AgreeLogicRule> definitionBean;
        node = bean.getNode(nodeId);
        if(node instanceof ComponentElement) {
            ce = <ComponentElement> node;
            return ce.getExceptionNext();
        }
        return null;
    }

    public getNodeCaption(definitionBean: Object, nodeId: string): string {
        var bean, node, ce, endValue;

        bean = <AgreeLogicRule> definitionBean;
        node = bean.getNode(nodeId);
        if(node == null) {
            endValue = bean.getEndValue(nodeId);
            return endValue + "( " + nodeId + " )";
        } else if(node instanceof ComponentElement) {
            ce = <ComponentElement> node;
            return ce.getCaption() + "( " + nodeId + " )" + ", showId( " + ce.getShowId() + " )";
        }
        return "节点( " + nodeId + " )";
    }

    public getOutNextMap(definitionBean: Object, nodeId: string): HashMap {
        var bean, node, ce;
        bean = <AgreeLogicRule> definitionBean;
        node = bean.getNode(nodeId);
        if(node instanceof ComponentElement) {
            ce = <ComponentElement> node;
            return ce.getOutNextMap();
        }
        return null;
    }

    public getStartNodeId(definitionBean: Object): string {
        return (<AgreeLogicRule> definitionBean).getStartNodeId();
    }

    public getEndValueMap(definitionBean: Object): HashMap {
        return (<AgreeLogicRule> definitionBean).getEndValueMap();
    }

    abstract getFileExtension(): string;
    abstract parse(path: string, input: string, callback: Function): void;

}

export {AbstractALRProcessDefinitionAdapter};