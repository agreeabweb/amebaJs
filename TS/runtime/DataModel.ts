/**
 * Created by Oliver on 2016-08-10 0010.
 */
import {HashMap} from "../lib/HashMap";

export class DataModel {

    private memberMap:HashMap = new HashMap();

    private doSetMemeber(memberName:string, memberContent:any):void {

        let dotIndex:number = memberName.indexOf('.');

        if (dotIndex > 0) {
            let prefix:string = memberName.substring(0, memberName.lastIndexOf("."));
            let suffix:string = memberName.substring(memberName.lastIndexOf(".") + 1);

            let subModel:DataModel = this.getLastDataModel(prefix);
            subModel.setLocalValue(suffix, memberContent);
        } else {
            this.setLocalValue(memberName, memberContent);
        }
    }

    private setLocalValue(memberName:string, memberContent:any):void {
        this.memberMap.put(memberName, memberContent);
    }

    private getLocalValue(memberName:string):any {
        return this.memberMap.get(memberName);
    }


    public  set(memberName:string, memberContent:any):void {
        this.doSetMemeber(memberName, memberContent);
    }

    private getLastDataModel(memberName:string):any {
        let dotIndex:number = memberName.indexOf('.');

        if (dotIndex > 0) {
            let prefix:string = memberName.substring(0, dotIndex);

            let suffix:string = memberName.substring(dotIndex + 1);

            let subModel:DataModel = this.get(prefix);
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

    private doGetMember(memberName:string):any {
        let dotIndex:number = memberName.indexOf('.');

        if (dotIndex > 0) {
            let prefix:string = memberName.substring(0, dotIndex);

            let suffix:string = memberName.substring(dotIndex + 1);
            let subModel:DataModel = this.get(prefix);
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

    public getMember(memberName:string):any {
        return this.doGetMember(memberName);
    }


    private doGet(memberName:string):any {
        return this.doGetMember(memberName);
    }

    public get(memberName:string):any {
        return this.doGet(memberName);
    }
}