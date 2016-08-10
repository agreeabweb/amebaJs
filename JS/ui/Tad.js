define(["require", "exports", "../runtime/Context", "../lib/GUID", "../const/ServiceObj", "../lib/HashMap"], function (require, exports, Context_1, GUID_1, ServiceObj_1, HashMap_1) {
    "use strict";
    var Tad = (function () {
        function Tad(id, host, path) {
            this.id = "";
            this.panels = new HashMap_1.HashMap();
            this.id = id;
            this.host = host;
            this.path = path;
        }
        Tad.prototype.addPanel = function (id, panel) {
            this.panels[id] = panel;
        };
        Tad.prototype.getPanel = function (id) {
            return this.panels[id];
        };
        Tad.prototype.start = function () {
            //0.创建DM
            //1.启动流程
            var contextId = GUID_1.default();
            this.tadContext = this.host.getContext().createChild("tadContext_" + contextId);
            Context_1.Context.prototype.setCurrent(this.tadContext);
            var pif = this.tadContext.get(ServiceObj_1.ServiceObj.ProcessInstanceFactory);
            // var tadPath = "/AppFramework_2013B/trade/test/bug0041/Bug0041.tad";
            pif.pitsByCreatingPI(this.tadContext, this.path, function (segment) {
                segment.start(null, function (processResult) {
                    console.log("执行PITS回调");
                    var outArgMap = processResult.getOutArgMap();
                    //处理出参
                    console.log("出口信息：" + processResult.getEnd());
                    console.log("结束PITS: " + segment.getId());
                });
            });
        };
        return Tad;
    }());
    exports.Tad = Tad;
});
//# sourceMappingURL=Tad.js.map