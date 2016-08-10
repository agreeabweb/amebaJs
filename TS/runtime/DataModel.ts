import {HashMap} from "../lib/HashMap";
//import {Context} from "../runtime/Context";


class DataModel{

    
    private  memberMap:HashMap = new HashMap();


    public constructor()
    { 
    }
    
    protected createSimpleMember(memberName: string): Object
    {
        // 1. create
        var result = new Object();
        memberMap.put(memberName, result);
        //
        return result;
    }
   
    protected createSubModelMember(memberName: string): DataModel 
    {
        
        subModel:DataModel = (DataModel) createSimpleMember(memberName);
        return subModel;
    }
    
    
     private doGet(memberName:string): Object 
    {
        candidate:Object = getMember(memberName);
        if (candidate == null)
        {
            return null;
        }
        return candidate;
    }
    
    
    private doGetMember(memberName: string,
            create: boolean): Object
    {
        dotIndex: number = memberName.indexOf('.');
        if (dotIndex > 0)
        {
            prefix: string = memberName.substring(0, dotIndex);
            suffix: string = memberName.substring(dotIndex + 1);
            subModel: DataModel = (DataModel) get(prefix);
            if (subModel == null)
            {
                if (!create)
                {
                    return null;
                }
                subModel = createSubModelMember(prefix);
            }
            return subModel.getMember(suffix, create);
        }
        result:Object = memberMap.get(memberName);
        if (create && result == null)
        {
            return this;
        }
        return result;
    }
    
     private doSet(memberName: string,memberContent: Object): void
    {
        dm: DataModel  = (DataModel)getMember(memberName, true);
        dm.memberMap.put(memberName, memberContent);

    }
    
    public get(final memberName: string): Object
    {
        
        return doGet(memberName);
        
    }
    
    public getMember(memberName:string ): Object
    {
        return getMember(memberName, false);
    }

    public getMember(final memberName: string,
            final create: boolean): Object
    {
        return doGetMember(memberName, create);
     
    }
    
    public set(final memberName: string, final memberContent: Object): void
    {
        doSet(memberName, memberContent);
    }
    
}

export {DataModel};
