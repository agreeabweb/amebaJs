import {SedaMappingTargetEntry} from "./SedaMappingTargetEntry";

class SedaAlrTargetEntry {
    private path: string;
    private caption: string;
    private listDataMapping: Array<SedaMappingTargetEntry>;

    //--------------------------------------------------getter------------------------------------------
    public getPath(): string {
        return this.path;
    }
    public getCaption(): string {
        return this.caption;
    }
    public getListDataMapping(): Array<SedaMappingTargetEntry> {
        return this.listDataMapping;
    }

    //---------------------------------------------------setter------------------------------------------
    public setPath(path: string): void {
        this.path = path;
    }
    public setCaption(caption: string): void {
        this.caption = caption;
    }
    public setListDataMapping(listDataMapping: Array<SedaMappingTargetEntry>): void {
        this.listDataMapping = listDataMapping;
    }
}

export {SedaAlrTargetEntry};