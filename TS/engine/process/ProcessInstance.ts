import {ProcessInstanceThread} from "./ProcessInstanceThread";
import GUID from "../../lib/GUID";
import {Context} from "../../runtime/Context";

/**
 * PI流程实例
 * -id 
 * -context 上下文
 * -definitionPath 流程文件定义路径
 */
class ProcessInstance {
    private id: string;
    private context: Context;
    private definitionPath: string;
    private pitList: Array<ProcessInstanceThread> = [];
    private simpleName: string;

    public constructor(id: string, context: Context, definitionPath: string) {
        this.id = id;
        this.context = context;
        this.definitionPath = definitionPath;
        this.simpleName = this.definitionPath.substring(this.definitionPath.lastIndexOf('/') + 1) + "@" + this.context.getName();
        context.set("ProcessInstance", this);  // 绑定PI在CTX里
    };

    /**
     * 准备流程执行，创建PIT
     */
    public openThread(): ProcessInstanceThread {
        let id, pit;
        
        id = "PIT-" + GUID();
        pit = new ProcessInstanceThread(id, this); 
        this.pitList.push(pit);
        return pit;
    };
    
    //--------------------------------------------------getter------------------------------------------------
    public getId(): string {
        return this.id;
    };
    public getContext(): Context {
        return this.context;
    };
    public getSimpleName(): string {
        return this.simpleName;
    };
};

export {ProcessInstance};