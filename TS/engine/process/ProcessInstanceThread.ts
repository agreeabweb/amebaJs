import {ProcessInstance} from "./processInstance";
import {ProcessInstanceThreadSegment} from "./ProcessInstanceThreadSegment";
import {Context} from "../../runtime/Context";
import {LogicRealm} from "../../runtime/realm/LogicRealm";
import GUID from "../../lib/GUID";

/**
 * PIT流程实例线程。并不是物理线程，而是逻辑意义上一个流程的线程。
 */
class ProcessInstanceThread {
    private id: string;
    private processInstance: ProcessInstance;
    private logicRealm: LogicRealm;

    public constructor(id: string, processInstance: ProcessInstance) {
        this.id = id;
        this.processInstance = processInstance;

        this.logicRealm = new LogicRealm(processInstance.getSimpleName() + ":" + id, processInstance.getContext());
        this.logicRealm.set("ProcessInstanceThread", this);  // 绑定PIT到LR里
    }

    /**
     * 根据流程定义资源创建一个子流程。然后可以对segment对象的LRT进行服务对象配置，并调用其start方法启动。
     */
    public openSegment(definitionPath: string, callback: Function): void {
        let pit, id;
        
        pit = this;
        id = GUID();
        Context.getCurrent().get("ResourceDocumentTable").getDocument(definitionPath, 'ProcessDefinition', function(definition) {
            callback(new ProcessInstanceThreadSegment(id, pit, definitionPath, definition));
        });
    };
    
    //------------------------------------------------------getter------------------------------------------------
    public getId(): string {
        return this.id;
    };
    public getProcessInstance(): ProcessInstance {
        return this.processInstance;
    };
    /**
     * 获取当前PIT下的LR
     */
    public getLogicRealm(): LogicRealm {
        return this.logicRealm;
    };
};

export {ProcessInstanceThread};