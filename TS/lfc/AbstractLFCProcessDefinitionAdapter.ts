import {HashMap} from "../lib/HashMap";
import {Context} from "../runtime/Context";
import {IProcessDefinitionAdapter} from "../engine/process/IProcessDefinitionAdapter";
import {ProcessInstanceThreadSegment} from "../engine/process/ProcessInstanceThreadSegment";
import {ComponentElement} from "./define/ComponentElement";
import {LogicletComponentElement} from "./define/LogicletComponentElement";
import {LFCComponentElement} from "./define/LFCComponentElement";
import {LogicFlowControl} from "./define/LogicFlowControl";
import {ProcessDefinition} from "../engine/process/ProcessDefinition";
import * as Command from "../command/Command";

abstract class AbstractLFCProcessDefinitionAdapter implements IProcessDefinitionAdapter {
    public constructor() {};

    /**
     * 创建流程初始化的执行对象
     */
    public createInitRunnable(pits: ProcessInstanceThreadSegment, definitionBean: Object) {
        // 将LFC的内部变量保存到pits里
        // var varMap = definitionBean.getVarMap();
        // for(var i = 0; i < varMap.length; i++) {
        //     pits.addVarMap("varMap()." + varMap[i]);
        // }
        
    };
    /**
     * 创建指定节点的执行对象
     */
    public createNodeRunnable(pits: ProcessInstanceThreadSegment, definitionBean: Object, nodeId: string) {
        var bean, node;
        
        // 获取节点信息
        bean = <LogicFlowControl>definitionBean;
        node = bean.getNode(nodeId);
        
        var inArgMap = node.inArgMap;
        if(inArgMap != undefined) {
            for(var inArg in inArgMap.map) {
                var arg = inArgMap.get(inArg);
                if(arg != undefined) {
                    var value = Context.getCurrent().get("DefaultExpressionEngine").evaluate(arg.getContent(), pits);
                    arg.setContent(value);
                }
            }
        }
        
        // 判断节点类型并进行相应的处理
        if(node instanceof LogicletComponentElement) {
            console.log("该节点为component组件: " + node.getName());
            this.performLogicletComponentElement(pits, node);
        } else if(node instanceof LFCComponentElement) {
            console.log("该节点为lfc组件");
            this.performLfcComponentElement(pits, node);
        }
    };
    /**
     * 处理指令形式的技术组件
     */
    public performLogicletComponentElement(pits: ProcessInstanceThreadSegment, componentElement: LogicletComponentElement): void {
        var outArgMap, currentTask, pit;
        
        pit = pits.getProcessInstanceThread();
        currentTask = pit.getLogicRealm().getCurrentTask();  // 取得父流程的当前节点
        
        pit.getLogicRealm().setState("suspended");
        currentTask.setSuspend(true);
        // 调用组件
        Command.call(componentElement, function(result) {
            currentTask.setSuspend(false);
            // 出参处理
            console.log("执行callback："+result.end);
            outArgMap = componentElement.getOutArgMap();
            if(outArgMap != undefined) {
                var outArg = outArgMap.get("result");
                if(outArg != undefined) {
                    Context.getCurrent().get("DefaultExpressionEngine").assign(outArg.getContent(), result.outArgs.result, pits);
                }
            }
            
            // 处理返回的执行结果
            console.log(currentTask.getName()+" 组件返回结果： ");
            console.log(result.end);
            currentTask.end(result.end);
        });
    };
    /**
     * 处理LFC逻辑技术组件
     */
    public performLfcComponentElement(pits: ProcessInstanceThreadSegment, componentElement: LFCComponentElement): void {
        var path, inArgMap, context, pif, pit, currentTask;
        
        path = componentElement.getPath();
            
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
        
    };
    
    //----------------------------------------------------getter------------------------------------------------------
    public getStartNodeId(definitionBean: Object): string {
        return (<LogicFlowControl>definitionBean).getStartNodeId();
    };
    public getOutNextMap(definitionBean: Object, nodeId: string): HashMap {
        var node;
        
        node = (<LogicFlowControl>definitionBean).getNode(nodeId);
        return node.getOutNextMap();
    };
    public getExceptionNext(definitionBean: Object, nodeId: string): string {
        var node;

        node = (<LogicFlowControl>definitionBean).getNode(nodeId);
        return node.getExceptionNext();
    };
    public getNodeCaption(definitionBean: Object, nodeId: string): string {
        var node;

        node = (<LogicFlowControl>definitionBean).getNode(nodeId);
        return node.getNodeCaption();
    };
    public getEndValueMap(definitionBean: Object): HashMap {
        return (<LogicFlowControl>definitionBean).getEndValueMap();
    };

    abstract getFileExtension(): string;
    abstract parse(path: string, input: string, callback: Function): void;
}

export {AbstractLFCProcessDefinitionAdapter};