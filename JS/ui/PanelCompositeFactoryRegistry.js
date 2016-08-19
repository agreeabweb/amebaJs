define(["require", "exports", "../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-16 0016.
     */
    var PanelCompositeFactoryRegistry = (function () {
        function PanelCompositeFactoryRegistry() {
            this.cache = new HashMap_1.HashMap();
        }
        PanelCompositeFactoryRegistry.prototype.getPanelFactory = function (target) {
            return this.cache.get(target);
        };
        PanelCompositeFactoryRegistry.prototype.addPanelFactory = function (target, factory) {
            this.cache.put(target, factory);
        };
        PanelCompositeFactoryRegistry.prototype.removePanelFactory = function (target) {
            this.cache.remove(target);
        };
        return PanelCompositeFactoryRegistry;
    }());
    exports.PanelCompositeFactoryRegistry = PanelCompositeFactoryRegistry;
});
//# sourceMappingURL=PanelCompositeFactoryRegistry.js.map