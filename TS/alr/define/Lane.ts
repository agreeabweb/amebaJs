import {HashMap} from "../../lib/HashMap";

class Lane {
    private name: string;
    private width: string;
    private containsNodesId: Array<string> = new Array();
    private data: HashMap = new HashMap();
    
    
    public clearData(): void {
        this.data.removeAll();
    }
    
    //---------------------------------------------------adder--------------------------------------------
    public addData(key: string, value: Object) {
        this.data.put(key, value);
    }
    public addNodeId(nodeId: string): void {
        this.containsNodesId.push(nodeId);
    }

    //---------------------------------------------------getter-------------------------------------------
    public getData(): HashMap {
        return this.data;
    }
    public getName(): string {
        return this.name;
    }
    public getWidth(): string {
        return this.width;
    }
    public getContainsNodesId(): Array<string> {
        return this.containsNodesId;
    }

    //-------------------------------------------------setter-----------------------------------------------
    public setName(name: string): void {
        this.name = name;
    }
    public setWidth(width: string): void {
        this.width = width;
    }
}

export {Lane};