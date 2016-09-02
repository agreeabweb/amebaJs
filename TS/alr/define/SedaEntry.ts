import {AbstractSedaEntry} from "./AbstractSedaEntry";

class SedaEntry {
    private listAbstractEntry: Array<AbstractSedaEntry>;
    
    //----------------------------------------------------------getter---------------------------------------
    public getListAbstractEntry(): Array<AbstractSedaEntry> {
        return this.listAbstractEntry;
    }

    //----------------------------------------------------------setter----------------------------------------
    public setListAbstractEntry(listAbstractEntry: Array<AbstractSedaEntry>): void {
        this.listAbstractEntry = listAbstractEntry;
    } 
}

export {SedaEntry};