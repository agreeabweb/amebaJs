import {HashMap} from "../lib/HashMap";

class Context {

    private name: string;
    private parent: Context;
    private localValues: HashMap = new HashMap();
    private childrenMap: HashMap = new HashMap();
    private disposed: boolean;

    static baseContext: Context = new Context(null, "base");
    static currentContext: Context;

    /**
     * 构造函数
     */
    public constructor(parent: Context, name: string) {
        this.parent = parent;
        this.name = name;
    }

    public createChild(name: string): Context {
        let ctx = new Context(this, name);
        this.addChild(name, ctx);
        return ctx;
    };
    public addChild(name: string, context: Context): void {
        if(this.childrenMap.get(name) == null) {
            this.childrenMap.put(name, context);
        }
    };
    public remove(name: string): void {
        this.localValues.remove(name);
    };
    public removeChild(context: Context): void {
        this.childrenMap.remove(context.getName());
    };
    /**
     * 通过名字找指定的context
     * 往孩子中查找，向下查找
     */
    public downSearch(name: string): Context {
        let ctx, keySet;
        keySet = this.childrenMap.keySet();
        if(this.getName() == name){
            return this;
        }
        for(let i = 0; i < keySet.length; i++) {
            ctx = this.childrenMap.get(keySet[i]).downSearch(name);
            if(ctx != null){
                return ctx;
            }
        }
        return null;
    };
    /**
     * 通过名字找指定的context
     * 往父亲中查找，向上查找
     */
    public upSearch(name: string): Context {
        let ctx, par;
        if(this.getName() == name) {
            return this;
        }
        while(par = this.getParentContext() != null) {
            ctx = par.upSearch(name);
            if(ctx != null){
                return ctx;
            }
        }
        return null;	
    };
    public dispose(): void {
        let current, changeCurrent, parentContext;
        // 0. 保存父亲
        current = Context.getCurrent();
        changeCurrent = (this == current || this.isAncestorOf(current));
        parentContext = this.getParentContext();
        // 1. 取消位于父节点的注册
        this.unregister();
        // 2. 执行标准操作
        this.localValues.removeAll();
        this.disposed = true;
        // $. 更新current
        if(changeCurrent) {
            Context.prototype.setCurrent(parentContext);
        }
    };
    public unregister(): void {
        let parentContext = this.getParentContext();
        if(parentContext != undefined) {
            parentContext.removeChild(this);
        }
    };
    
    //-------------------------------------------------getter--------------------------------------------------
    
    public static getCurrent(): Context {
        return Context.currentContext;  //静态变量  //////是否正确？？？？
    };
    /**
     * 往当前context的localValues里找值，找不到则不断往上向父亲找
     */
    public get(name: string): any {
        let result = this.localValues.get(name);
        if(result != null) {
            return result;
        }
        if(this.parent != null) {
            return this.parent.get(name);
        }
        return null;
    };
    public getName(): string {
        return this.name;
    };
    public getParentContext(): Context {
        return this.parent;
    };
    public getChild(name: string): Context {
        return this.childrenMap.get(name);
    };
    public getChildren() {
        
    };
    /**
     * 往当前Context的localValues里找值
     */
    public getLocal(name: string): any {
        return this.localValues.get(name);
    };
    
    //----------------------------------------------------setter--------------------------------------------------
    public set(name: string, value: any): void {
        this.localValues.put(name, value);
    };
    public setCurrent(ctx: Context) {
        Context.currentContext = ctx;  // currentContext用静态变量就否合适？？
    };
    
    //----------------------------------------------------checker-------------------------------------------------
    public isDisposed(): boolean {
        if(this.disposed) {
            return true;
        }
        let parent = this.getParentContext();
        if(parent != undefined) {
            return parent.isDisposed();
        }
        return false;
    };
    public isAncestorOf(context): boolean {
        let cParent = context.getParentContext();
        if(cParent == null) {
            return false;
        }
        if(cParent == this) {
            return true;
        }
        return this.isAncestorOf(cParent);
    };
}

export {Context};