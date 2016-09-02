
import {HashMap} from "../../lib/HashMap";
import {MainProcessTemplate} from "../../mpt/define/MainProcessTemplate";

class TradeAssemblyDefine {
    private path: string;
    private mpt: MainProcessTemplate;
    private mptPath: string;
    private nodeInArgExpressionMap: HashMap = new HashMap();
    private nodeOutArgExpressionMap: HashMap = new HashMap();
    private nodeMapping: HashMap = new HashMap();
    private varMap: HashMap = new HashMap();

    public constructor() {};

    //------------------------------------------adder--------------------------------------------------------
    public addNodeInArg(nodeId: string, argName: string, argExpression: string): void {
        if(argExpression == undefined) {
            return;
        }
        
        let map = this.nodeInArgExpressionMap.get(nodeId);
        if(map == null) {
            this.nodeInArgExpressionMap.put(nodeId, new HashMap());
            map = this.nodeInArgExpressionMap.get(nodeId);
        }
        map.put(argName, argExpression);
    };
    public addNodeOutArg(nodeId: string, argName: string, argExpression: string): void {
        if(argExpression == undefined) {
            return;
        }
        let map = this.nodeOutArgExpressionMap.get(nodeId);
        if(map == null) {
            this.nodeOutArgExpressionMap.put(nodeId, new HashMap());
            map = this.nodeOutArgExpressionMap.get(nodeId);
        }
        map.put(argName, argExpression);
    };
    public addNodeMapping(nodeId: string, target: string, source: string): void {
        let map = this.nodeMapping.get(nodeId);
        if(map == null) {
            this.nodeMapping.put(nodeId, new HashMap());
            map = this.nodeMapping.get(nodeId);
        }
        map.put(target, source);
    };
    public addVarMap(expression: string, value: any): void {
        this.varMap.put(expression, value);
    };
    
    //------------------------------------------setter-------------------------------------------------------
    public setPath(path: string): void {
        this.path = path;
    };
    public setMPT(mpt: MainProcessTemplate): void {
        this.mpt = mpt;
    };
    public setMPTPath(mptPath: string): void {
        this.mptPath = mptPath;
    };
    
    //------------------------------------------getter-------------------------------------------------------
    public getPath(): string {
        return this.path;
    };
    public getMPT(): MainProcessTemplate {
        return this.mpt;
    };
    public getMPTPath(): string {
        return this.mptPath;
    };
    public getVarMap(): HashMap {
        return this.varMap;
    };
    public getNodeInArgExpressionMap(nodeId: string): HashMap {
        return this.nodeInArgExpressionMap.get(nodeId);
    };
    public getNodeOutArgExpressionMap(nodeId: string): HashMap {
        return this.nodeOutArgExpressionMap.get(nodeId);
    };
    public getNodeMapping(nodeId: string): HashMap {
        return this.nodeMapping.get(nodeId);
    };
};

export {TradeAssemblyDefine};