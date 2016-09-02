import {HashMap} from "../lib/HashMap";
import {IPanelCompositeFactory} from "./IPanelCompositeFactory";
/**
 * Created by Oliver on 2016-08-16 0016.
 */
export class PanelCompositeFactoryRegistry {

    private cache:HashMap = new HashMap();

    public getPanelFactory(target:string): IPanelCompositeFactory {
        return this.cache.get(target);
    }

    public addPanelFactory(target:string, factory:IPanelCompositeFactory): void {
        this.cache.put(target, factory);
    }

    public removePanelFactory(target:string): void {
        this.cache.remove(target);
    }
}