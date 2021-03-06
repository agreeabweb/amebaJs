define(["require", "exports", "./TadPanel", "../runtime/Context", "../lib/GUID", "../const/ServiceObj", "../lib/HashMap", "../runtime/DataModel", "../const/UIConst"], function (require, exports, TadPanel_1, Context_1, GUID_1, ServiceObj_1, HashMap_1, DataModel_1, UIConst_1) {
    "use strict";
    var Tad = (function () {
        function Tad(id, host, path) {
            this.id = "";
            this.panels = new HashMap_1.HashMap();
            this.dm = new DataModel_1.DataModel();
            this.id = id;
            this.host = host;
            this.path = path;
        }
        Tad.prototype.start = function () {
            var contextId, pif;
            // 0.Context
            contextId = GUID_1.default();
            this.tadContext = this.host.getContext().createChild("tadContext_" + contextId);
            this.tadContext.set("Tad", this);
            //1.DM
            this.tadContext.set(UIConst_1.UIConst.DataModel, this.dm);
            //3.启动流程
            Context_1.Context.prototype.setCurrent(this.tadContext);
            pif = this.tadContext.get(ServiceObj_1.ServiceObj.ProcessInstanceFactory);
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
        Tad.prototype.openPanel = function (path, target, pits) {
            var tadPanelId, tadPanel;
            tadPanelId = "Panel_" + GUID_1.default();
            tadPanel = new TadPanel_1.TadPanel(pits, this, this.id, tadPanelId, path);
            this.panels.put(tadPanelId, tadPanel);
            tadPanel.start();
        };
        //----------------------------------------------adder-------------------------------------------------
        Tad.prototype.addPanel = function (id, panel) {
            this.panels[id] = panel;
        };
        //-----------------------------------------------getter------------------------------------------------
        Tad.prototype.getId = function () {
            return this.id;
        };
        Tad.prototype.getPanel = function (id) {
            return this.panels[id];
        };
        Tad.prototype.getDataModel = function () {
            return this.dm;
        };
        Tad.prototype.getContext = function () {
            return this.tadContext;
        };
        return Tad;
    }());
    exports.Tad = Tad;
});
//# sourceMappingURL=Tad.js.map