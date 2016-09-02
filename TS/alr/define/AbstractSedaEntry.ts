import {SedaAlrTargetEntry} from "./SedaAlrTargetEntry";

class AbstractSedaEntry {
    private path: string;
    private caption: string;
    private nodeId: string;
    private listAlr: Array<SedaAlrTargetEntry>;

    //-------------------------------------------getter-------------------------------------------
    public getNodeId(): string {
        return this.nodeId;
    };
    public getPath(): string {
        return this.path;
    }
    public getCaption(): string {
        return this.caption;
    }
    public getListAlr(): Array<SedaAlrTargetEntry> {
        return this.listAlr;
    }
    
    //-------------------------------------------setter-------------------------------------------
    public setNodeId(nodeId: string) {
        this.nodeId = nodeId;
    };
    public setPath(path: string): void {
        this.path = path;
    }
    public setCaption(caption: string): void {
        this.caption = caption;
    }
    public setListAlr(listAlr: Array<SedaAlrTargetEntry>): void {
        this.listAlr = listAlr;
    }
}

export {AbstractSedaEntry};