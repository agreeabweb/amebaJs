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
    //
    // constructor(name:string, data:any) {
    //     this.name = name;
    //     this.extraData = data;
    // }

    constructor(name:string,ctx:Context,path:string,callback:Function,extra:any){
        this.name = name;
        this.ctx = ctx;
        this.path = path;
        this.callback = callback;
        this.extraData = extra;
    }

    public getCallback():Function {
        return this.callback;
    }

    public setCallback(callback:Function) {
        this.callback = callback;
    }

    public getPath():string {
        return this.path;
    }

    public setPath(path:string):void {
        this.path = path;
    }

    public getContext():Context {
        return this.ctx;
    }

    public setContext(ctx:Context):void {
        this.ctx = ctx;
    }



    getName():string {
        return this.name;
    }

    getExtraData():any {
        return this.extraData;
    }

    setExtraData(extraData:any) {
        this.extraData = extraData;
    }
}
