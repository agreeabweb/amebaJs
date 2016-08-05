import {LogicRealmTask} from "./LogicRealmTask";
import {Context} from "../Context";

class LogicRealm {
    
//--------------------------------------------------------私有变量-------------------------------------
    private name: string;
    private context: Context;
    private previousTask: LogicRealmTask;
    private currentTask: LogicRealmTask;
    private storage: Object = {}; /////是否有用？？？
    private state: string = 'idle'; /////是否有用？？？
    private endFlag: boolean;
    private taskQueue: Array<LogicRealmTask> = new Array();
    private sourceTask: LogicRealmTask;

//--------------------------------------------------------公共方法--------------------------------------
    /**
     * 构造函数
     */
    public constructor(name: string, context: Context) {
        this.name = name;
        this.context = context;
    };

    /**
     * 自动安排时序执行任务。
     */
    public exec(task: LogicRealmTask): void {
        if(this.isDead()) {
            return;
        }
        // 锁定currentTask引用
        var _currentTask = this.currentTask;
        // 2. 选择执行方式
        if(/* 没有任务可以作为父任务，只能队列执行 */_currentTask == undefined) {
            // 2.a 作为队列根任务执行
            this.asyncExec(task);
        } else {
            // 2.b 作为当前任务的子任务执行
            var newSub = _currentTask.startSub(null);
            newSub.hook(task, null);
            newSub.end(null); // 触发子任务推进
        }
    };

    /**
     * 将任务放入队列异步执行。注意如果该任务是其他任务的衍生任务，应该通过它们的源头任务调度，而不应该调用这个方法，否则有可能会造成队列死锁。
     */
    public asyncExec(task: LogicRealmTask): void {
        if(this.isDead()) {
            return;
        }
        this.taskQueue.push(task);
        this.tryToStart();
    };
    /**
     * 尝试启动执行线程，并开始执行任务队列
     */
    public tryToStart(): void {
        if(this.state == 'idle') {
        //   this.state = 'starting';
            this.state = 'running';  // 直接将当前realm设为running状态
            this.configCurrentContext();
            this.runTaskQueue();
        }  
    };
    /**
     * 配置当前上下文
     */
    public configCurrentContext(): void {
        if(this.context != undefined) {
            Context.prototype.setCurrent(this.context);
        }
    };
    /**
     * 执行任务队列
     */
    public runTaskQueue(): void {
        var task, sync;
        // 判断当前realm是否为running状态，taskQueue里是否有任务
        while(this.isRunning() && (task = this.taskQueue.shift()) != null) {
            sync = this.runDirectly(task);
            if(!sync) {
                return;
            }
            
            if(this.state === 'running' && this.taskQueue.length == 0) {
                // 将当前realm状态设置为idle
                this.state = 'idle';
                // 只有自己停下来，才自己尝试继续前行
                this.tryToStart();
            }
        }
    };
    /**
     * 直接运行一个任务，若状态允许，也顺便执行其衍生任务
     */
    public runDirectly(task: LogicRealmTask): boolean {
        // 判断当前realm是否已死
        if(this.isDead()) {
            return;
        }
        while(this.isRunning() && task != null) {
            this.setCurrentTask(task);  // 设置为当前任务
            task.run(); // 执行该任务
            
            // checkDisposeHook();
            
            // 注意，由于移花接木原因，task调用后，此时的currentTask未必就是task
            var currentTaskRef = this.currentTask;
            if(currentTaskRef == null || currentTaskRef.isEnded() || currentTaskRef.isSuspended()) {
                return false;
            }
            // 注意，由于可能出现子任务移花接木的状况，因此需要通过currentTask获取下一个任务
            task = this.currentTask.getNext();
        }
        this.setCurrentTask(task);
        return true;
    };
    /**
     * 继续执行当前任务的衍生任务以及队列里的后续任务
     */
    public continueExec(): void {
        console.log("开始continue..");
        if(this.isDead()) {
            return;
        }
        if(this.currentTask == undefined) {
            console.log("没有当前任务！");
            return;
        }
        // if(this.state === "suspended") {  // 是否有suspended状态
        //     this.state = 'resuming';
        //     return;
        // }
        this.configCurrentContext();
        //找到结束的任务，未必是currentTask，如果是它的父任务结束，那就回到父一级调度
        var endTask = this.currentTask;
        if(endTask.getParent() != undefined && endTask.getParent().isEnded()) {
            endTask = endTask.getParent();
        }
        // 从已经结束的任务继续下一个任务
        var next = endTask.getNext();
        console.log("下一个任务获取: "+next.getName())
        if(next != null) {
            var sync = this.runDirectly(next);
            if(!sync) {
                return;
            }
            this.runTaskQueue();
        }
    };
    
    
    //------------------------------------------setter-------------------------------------------
    /**
     * 设置当前任务
     */
    public setCurrentTask(task: LogicRealmTask): void {
        this.previousTask = this.currentTask;
        this.currentTask = task;
    };
    /**
     * 设置某种类型的资源
     */
    public set(className: string, value: any): void {
        if(value == undefined) {
            this.storage[className] = null;
        } else {
            this.storage[className] = value;
        }
    };
    
    //-------------------------------------------getter-------------------------------------------------
    /**
     * 获取当前任务
     */
    public getCurrentTask(): LogicRealmTask {
        return this.currentTask;
    };
    /**
     * 获取指定类型的资源
     */
    public get(className: string): any {
        return this.storage[className];
    };
    
    //------------------------------------------checker---------------------------------------------------
    public isDead(): boolean {
        this.checkDead();
        return this.state === 'dead';
    };
    public isRunning(): boolean {
        this.checkDead();
        return this.state === 'running';
    };
    public isSuspended(): boolean {
        this.checkDead();
        return this.state === 'suspended';  
    };
    public checkDead(): void {  //////是否需要？？？
        // 维护state
        if(this.state != 'dead') {
            if(this.sourceTask != undefined && this.sourceTask.isEnded()) {
                this.state = 'dead';
            }
            if(this.context != undefined && this.context.isDisposed()) {
                this.state = 'dead';
            }
        }
        // 维护context
        if(this.state === 'dead' && this.context != undefined && !this.context.isDisposed()) {
            this.context.dispose();
        }
    };

}

export { LogicRealm };