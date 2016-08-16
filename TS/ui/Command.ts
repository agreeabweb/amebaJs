import {Context} from "../runtime/Context";
/**
 * Created by Oliver on 2016-08-04 0004.
 */
export class Command {

    private name:string;
    private data:any;
    private ctx:Context;

    public getContext():Context{
        return this.ctx;
    }

    public setContext(ctx:Context):void{
        this.ctx = ctx;
    }

    constructor(name:string, data:any) {
        this.name = name;
        this.data = data;
    }
    
    getName():string {
        return this.name;
    }

    getData():any {
        return this.data;
    }
}
