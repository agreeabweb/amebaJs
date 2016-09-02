import {HashMap} from "../../lib/HashMap";
import {Lane} from "./Lane";
import {ComponentElement} from "./ComponentElement";

class AgreeLogicRule {
    private componentElementMap: HashMap = new HashMap();
    private endValueMap: HashMap = new HashMap();
    private nodesList: Array<Object> = new Array<Object>();
    private path: string;
    private startNodeId: string;
    private varMap: HashMap;
    private lanes: Array<Lane> = new Array();

    public constructor() {};

    //--------------------------------------------------------adder------------------------------------------------
    public addLane(lane: Lane): void {
        this.lanes.push(lane);
    }
    public addVarMap(expression: string, value: string): void {
        if(this.varMap == undefined) {
            this.varMap = new HashMap();
        } 
        this.varMap.put(expression, value);
    }
    public addComponentElement(ce: ComponentElement): void {
        this.componentElementMap.put(ce.getId(), ce);
    }
    public addEndValue(id: string, value: string): void {
        this.endValueMap.put(id, value);
    }

    //--------------------------------------------------------getter------------------------------------------------
    public getLanes(): Array<Lane> {
        return this.lanes;
    }
    public getVarMap(): HashMap {
        return this.varMap;
    }
    public getEndValue(end: string): string {
        return this.endValueMap.get(end);
    }
    public getEndValueMap(): HashMap {
        return this.endValueMap;
    }
    public getNode(nodeId: string): Object {
        return this.componentElementMap.get(nodeId);
    }
    public getPath(): string {
        return this.path;
    }
    public getStartNodeId(): string {
        return this.startNodeId;
    }
    public getListNodes(): Array<Object> {
        return this.nodesList;
    }

    //-------------------------------------------------------setter--------------------------------------------------
    public setPath(path: string): void {
        this.path = path;
    }
    public setStartNodeId(startNodeId: string): void {
        this.startNodeId = startNodeId;
    }
}

export {AgreeLogicRule};