import {HashMap} from "../../lib/HashMap";

class SedaMappingTargetEntry {
    private path: string;
    private mapping: HashMap;

    //----------------------------------------getter----------------------------------
    public getPath(): string {
        return this.path;
    }
    public getMapping(): HashMap {
        return this.mapping;
    }

    //-----------------------------------------setter-----------------------------------
    public setPath(path: string): void {
        this.path = path;
    }
    public setMapping(mapping: HashMap): void {
        this.mapping = mapping;
    }
}

export {SedaMappingTargetEntry};