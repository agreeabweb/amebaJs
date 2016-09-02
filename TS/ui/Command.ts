import {Context} from "../runtime/Context";
/**
 * Created by Oliver on 2016-08-04 0004.
 */
export class Command {

    private name:string;
    private extraData:any;
    private ctx:Context;
    private path:string;
    private callback:Function;

    constructor(name:string,ctx:Context,path:string,callback:Function,extra:any){
        this.name = name;
        this.ctx = ctx;
        this.path = path;
        this.callback = callback;
        this.extraData = extra;
    }

    //------------------------------------------------getter---------------------------------------------
    public getCallback():Function {
        return this.callback;
    }
    public getPath():string {
        return this.path;
    }
    public getContext():Context {
        return this.ctx;
    }
    getName():string {
        return this.name;
    }
    getExtraData():any {
        return this.extraData;
    }

    //------------------------------------------------setter---------------------------------------------
    public setCallback(callback:Function): void {
        this.callback = callback;
    }
    public setPath(path:string):void {
        this.path = path;
    }
    public setContext(ctx:Context):void {
        this.ctx = ctx;
    }
    setExtraData(extraData:any): void {
        this.extraData = extraData;
    }
}
