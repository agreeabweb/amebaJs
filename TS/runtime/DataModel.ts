/**
 * Created by Oliver on 2016-08-10 0010.
 */
import {HashMap} from "../lib/HashMap";
import {EventHub} from "./EventHub";

export class DataModel {

    private memberMap:HashMap = new HashMap();
    private subscriptions:Array<any> = new Array<any>();

    public notifyThis(callback:any, context:any): void {
        let subscribe, v;

        subscribe = {
            "callback": callback,
            "context": context
        };

        v = this.subscriptions.push(subscribe);
        console.log("DataModel注册后长度: " + v);
    }
    private notifyChange(key: string, old: any, now: any): void {
        console.log("开始通知变化..." + this.subscriptions.length);
        for (let i = 0; i < this.subscriptions.length; i++) {
            let v, data;
            v = this.subscriptions[i];
            data = {
                "key": key,
                "old": old,
                "new": now
            };
            console.log("监听器：" + v.callback);
            v.callback.apply(v.context, [key, old, now]);
        }
    }

    private doSetMemeber(memberName: string, memberContent: any): void {
        let dotIndex:number;

        dotIndex = memberName.indexOf('.');
        if (dotIndex > 0) {
            let prefix:string, suffix:string, subModel:DataModel;

            prefix = memberName.substring(0, memberName.lastIndexOf("."));
            suffix = memberName.substring(memberName.lastIndexOf(".") + 1);

            subModel = this.getLastDataModel(prefix);
            subModel.setLocalValue(suffix, memberContent);
        } else {
            this.setLocalValue(memberName, memberContent);
        }
    }
    public  doSetWithNotify(memberName:string, memberContent:any,notify:boolean):void {
        let old:any = this.getMember(memberName);
        if (old === memberContent) {
            return;
        }
        this.doSetMemeber(memberName, memberContent);
        if(notify){
            setTimeout(this.notifyChange(memberName, old, memberContent), 0);
        }
    }
    private doGet(memberName:string):any {
        return this.doGetMember(memberName);
    }
    private doGetMember(memberName:string):any {
        let dotIndex:number = memberName.indexOf('.');

        if (dotIndex > 0) {
            let prefix: string, suffix: string, subModel: DataModel;

            prefix = memberName.substring(0, dotIndex);

            suffix = memberName.substring(dotIndex + 1);
            subModel = this.get(prefix);
            if (subModel == null) {
                // if (!create) {
                //     return null;
                // }
                subModel = this.createSubModelMember(prefix);
            }
            return subModel.getMember(suffix);
        }
        return this.getLocalValue(memberName);
    }

    protected createSubModelMember(memberName:string):DataModel {
        let subModel:DataModel = new DataModel();
        this.setLocalValue(memberName, subModel)
        return subModel;
    }

    protected createSimpleMember(memberName:string) {
        // let result = new Object();
        this.memberMap.put(memberName, null);
    }

    //-----------------------------------------------------------setter---------------------------------------------
    public  set(memberName:string, memberContent:any):void {
        this.doSetWithNotify(memberName,memberContent,true);
    }
    private setLocalValue(memberName:string, memberContent:any):void {
        this.memberMap.put(memberName, memberContent);
    }

    //----------------------------------------------------------getter-----------------------------------------------
    public get(memberName:string):any {
        return this.doGet(memberName);
    }
    private getLocalValue(memberName:string):any {
        return this.memberMap.get(memberName);
    }
    private getLastDataModel(memberName:string):any {
        let dotIndex:number = memberName.indexOf('.');

        if (dotIndex > 0) {
            let prefix: string, suffix: string, subModel: DataModel;

            prefix = memberName.substring(0, dotIndex);
            suffix = memberName.substring(dotIndex + 1);

            subModel = this.get(prefix);
            if (subModel == null) {
                // if (!create)
                // {
                //     return null;
                // }
                subModel = this.createSubModelMember(prefix);
            }
            return subModel.getLastDataModel(suffix);
        } else {
            let subModel:DataModel = this.get(memberName);
            if (subModel == null) {
                subModel = this.createSubModelMember(memberName);
            }
            return subModel;
        }

    }
    public getMember(memberName:string):any {
        return this.doGetMember(memberName);
    }
}