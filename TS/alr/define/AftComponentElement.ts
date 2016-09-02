import {ComponentElement} from "./ComponentElement";
import {HashMap} from "../../lib/HashMap";

class AftComponentElement extends ComponentElement {
    private path: string;
    private mapping: HashMap;

    //-------------------------------------------------------adder----------------------------------------
    public addMapping(target: string, source: string): void {
        this.mapping.put(target, source);
    }

    //------------------------------------------------------getter---------------------------------------
    public getMapping(): HashMap {
        return this.mapping;
    }
    public getPath(): string {
        return this.path;
    }

    //-------------------------------------------------------setter--------------------------------------
    public setPath(path: string): void {
        this.path = path;
    }
}

export {AftComponentElement};