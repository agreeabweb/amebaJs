import {HashMap} from "../../lib/HashMap";
import {ArgElement} from "./ArgElement";

class ComponentElement {
    private caption: string;
    private description: string;
    private exceptionNext: string;
    private id: string;
    private showId: string;
    private inArgMap: HashMap = new HashMap();
    private outArgMap: HashMap = new HashMap();
    private outNextMap: HashMap = new HashMap();

    //-------------------------------------------------adder-------------------------------------------------
    public addInArg(ae: ArgElement): void {
        this.inArgMap.put(ae.getName(), ae);
    }
    public addOutArg(ae: ArgElement): void {
        this.outArgMap.put(ae.getName(), ae);
    }
    public addOutNext(id: string, next: string): void {
        this.outNextMap.put(id, next);
    }

    //-------------------------------------------------getter-------------------------------------------------
    public getCaption(): string {
        return this.caption;
    }
    public getDescription(): string {
        return this.description;
    }
    public getExceptionNext(): string {
        return this.exceptionNext;
    }
    public getId(): string {
        return this.id;
    }
    public getShowId(): string {
        return this.showId;
    }
    public getInArgMap(): HashMap {
        return this.inArgMap;
    }
    public getOutArgMap(): HashMap {
        return this.outArgMap;
    }
    public getOutNextMap(): HashMap {
        return this.outNextMap;
    }

    //-------------------------------------------------------------setter--------------------------------------
    public setCaption(caption: string): void {
        this.caption = caption;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
    public setExceptionNext(exceptionNext: string): void {
        this.exceptionNext = exceptionNext;
    }
    public setId(id: string): void {
        this.id = id;
    }
    public setShowId(showId: string): void {
        this.showId = showId;
    }
}

export {ComponentElement};