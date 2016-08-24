import {HashMap} from "../lib/HashMap";
import {IPanelCompositeFactory} from "./IPanelCompositeFactory";
/**
 * Created by Oliver on 2016-08-16 0016.
 */
export class PanelCompositeFactoryRegistry {

    private cache:HashMap = new HashMap();

    public getPanelFactory(target:string) {
        return this.cache.get(target);
    }

    public addPanelFactory(target:string, factory:IPanelCompositeFactory) {
        this.cache.put(target, factory);
    }

    public removePanelFactory(target:string) {
        this.cache.remove(target);
    }
}