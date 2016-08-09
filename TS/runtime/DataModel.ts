import {HashMap} from "../lib/HashMap";
import {Context} from "../runtime/Context";

//import {BindValue} from 

class DataModel extends AbstractObservable{

	result: Array<string>;
	
	public getResult(){
		return result;
	}
	
	public setResult(result: Array<string>){
		this.result = result;
	}
	
	public addPrefix(prefix: string,oldList: Array<string>): Array<string> 
    {	
    	
       	result:Array<string> = new Array<string>(oldList.size());
        for (var old in oldList)
        {
            result.add(prefix + "." + old);
        }
        return result;
    }
    public create(context: Context):DataModel 
    {
        realm:Realm = context.get('DataModelRealm');
        dataModel:DataModel = new DataModel(realm);
        dataModel.root = true;
        return dataModel;
    }
    protected transient backup:DataModel;

    private  createTime:number = System.currentTimeMillis();

    /**
     * 由Realm控制住并发访问，无需使用ConcurrentHashMap
     */
    private  memberMap:HashMap = new HashMap();

    /**
     * 根数据模型，即放在上下文里数据模型，而不是放在数据模型里的子数据模型
     */
    private  root:boolean;

    /**
     * 表示是否属于共享数据模型
     */
    private  isShared:boolean = false;

    private  stale:boolean;

    private  version:number;

    //private EnumMap enumMap = new EnumMap();

    /**
     * 内部创建的DataModel不具备自动备份能力，例如子DataModel和备份DataModel
     * 
     * @param realm
     *        Realm
     */
    public constructor(realm: Realm)
    {
        super(realm);
    }
    

	/**
     * 
     */
    protected createSimpleMember(memberName: string): BindValue<Object> 
    {
        checkRealm();
        // 1. create
        var result = new BindValue<Object>(getRealm());
        memberMap.put(memberName, result);
        //
        return result;
    }
   
      /**
     * 
     */
    protected createSubModelMember(memberName: string): DataModel 
    {
        // 0. container
        member:BindValue<Object> = createSimpleMember(memberName);
        // 1. create
        subModel:DataModel = new DataModel(getRealm());
        // 2. hook
        member.set(subModel);
        // $.
        return subModel;
    }
    
    
     private doGet(memberName:string): Object 
    {
        checkRealm();
        candidate::BindValue<Object> = getMember(memberName);
        if (candidate == null)
        {
            return null;
        }
        return candidate.get();
    }
    
    private doGetAllMemberNames(): Array<string> 
    {
        checkRealm();
        Array<String> result = new Array<string>();
        Array<String> tmp = new Array<string>(memberMap.keySet());
        //Collections.sort(tmp);
        for (var key in tmp)
        {
            memberContent: Object = get(key);
            if (memberContent instanceof DataModel)
            {
                DataModel subModel = (DataModel) memberContent;
                result.addAll(addPrefix(key, subModel.getAllMemberNames()));
            } else if (memberContent != null)
            {
                result.add(key);
            }
        }
        return result;
    }
    
    private doGetMember(memberName: string,
            create: boolean): BindValue<Object>
    {

        checkRealm();
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
        result: BindValue<Object> = memberMap.get(memberName);
        if (create && result == null)
        {
            result = createSimpleMember(memberName);
        }
        return result;
    }
    
     private doRemove(memberName: string): void
    {
        checkRealm();
        dotIndex: number = memberName.indexOf('.');
        if (dotIndex > 0)
        {
            prefix: string = memberName.substring(0, dotIndex);
            suffix: string = memberName.substring(dotIndex + 1);
            subModel:DataModel = (DataModel) get(prefix);
            if (subModel == null)
            {
                return;
            }
            subModel.remove(suffix);
            return;
        }
        value: BindValue<Object> = memberMap.remove(memberName);
        if (value != null)
        {
            value.dispose();
        }
    }
    
     private doSet(memberName: string,memberContent: Object): void
    {
        checkRealm();

        value: BindValue<Object>  = getMember(memberName, true);
        /*
        if (memberContent instanceof Collection)
        {
            memberContent = wrapCollection(memberName,
                    (Collection) memberContent);

        }
        if (memberContent instanceof Map)
        {
            memberContent = wrapMap(memberName, (Map) memberContent);
        }
        */
        value.set(memberContent);

    }
    
    /**
     * 获取要素
     * 
     * @param memberName
     *        String
     * @return Object
     */
    public get(final memberName: string): Object
    {
        
        this.result = doGet(memberName);
        setResult(result);
        return getResult();
    }
    
     /**
     * 
     */
    public getAllMemberNames(): Array<string>
    {

        this.result = doGetAllMemberNames();
        setResult(result);
        return getResult();
    }
    
    public getCreateTime():number
    {
        return createTime;
    }

    public getMember(memberName:string ): BindValue<Object>
    {
        return getMember(memberName, false);
    }

    public getMember(final memberName: string,
            final create: boolean): BindValue<Object>
    {
        this.result = doGetMember(memberName, create);
        setResult(result);
        return getResult();
    }
    
     /**
     * 
     * @param memberName
     *        String
     * @param memberContent
     *        String
     */
    public set(final memberName: string, final memberContent: Object): void
    {
        doSet(memberName, memberContent);
    }
    
}

export {DataModel};
