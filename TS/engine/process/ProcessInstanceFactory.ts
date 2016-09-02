import {ProcessInstance} from "./ProcessInstance";
import {Context} from "../../runtime/Context";
import GUID from "../../lib/GUID";
import {LogicRealm} from "../../runtime/realm/LogicRealm";

/**
 * PIF流程实例工厂，创建PI相关资源，PI放入上下文Context中存储，PIT放入逻辑位面LogicRealm存储，PITS放入逻辑任务LogicRealmTask存储。
 */
class ProcessInstanceFactory {
    public constructor() {};

    /**
     * 执行新流程，并获得根流程的PITS。该方法会在上下文中创建PI，并创建PIT及其首个PITS。 返回的PITS对象支持在start方法启动前对其LRT进行服务对象配置。
     */
    public pitsByCreatingPI(context: Context, definitionPath: string, callback: Function): void {
        let pi, id, pit;
        
        // 判断该context下是否已经存在PI
        pi = context.getLocal("ProcessInstance");
        if(pi != null) {
            console.log("PI is existed");
        }
        id = "PI-" + GUID();
        pi = new ProcessInstance(id, context, definitionPath);  // 创建PI
        pit = pi.openThread();  // 创建PIT
        pit.openSegment(definitionPath, function(pits) {
            callback(pits); //返回PITS
        }); 
    };
    /**
     * 执行子流程，并获得子流程的PITS。该方法可以自动根据LR找到已知的PIT，并在最终PITS创建子一级的PITS。
     * 返回的PITS对象支持在start方法启动前对其LRT进行服务对象配置。
     */
    public pitsByGettingPIT(logicRealm: LogicRealm, definitionPath: string, callback: Function): void {
        let pit = logicRealm.get("ProcessInstanceThread");
        pit.openSegment(definitionPath, function(pits) {
            callback(pits);
        });
    };
};

export {ProcessInstanceFactory};