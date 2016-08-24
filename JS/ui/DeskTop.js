define(["require", "exports", "../runtime/Context", "../lib/GUID", "../lib/HashMap", "./EngineEventManager", "./CommandHandlerExecutor", "./Tad", "../const/ServiceObj", "../resource/ResourceDocumentTable", "../engine/expression/DefaultExpressionEngine", "../engine/process/ProcessInstanceFactory", "./PanelCompositeFactoryRegistry", "./mission/AxureMissionFactory", "./pageparsers/AxurePageParser", "../const/UIConst"], function (require, exports, Context_1, GUID_1, HashMap_1, EngineEventManager_1, CommandHandlerExecutor_1, Tad_1, ServiceObj_1, ResourceDocumentTable_1, DefaultExpressionEngine_1, ProcessInstanceFactory_1, PanelCompositeFactoryRegistry_1, AxureMissionFactory_1, AxurePageParser_1, UIConst_1) {
    "use strict";
    var DefaultPanelFactory = (function () {
        function DefaultPanelFactory() {
        }
        DefaultPanelFactory.prototype.getPanelComposite = function () {
            return $("BODY");
        };
        return DefaultPanelFactory;
    }());
    var DeskTop = (function () {
        function DeskTop() {
            this.panelCompositeFactoryRegistry = new HashMap_1.HashMap();
        }
        // private static CONTEXT_PREFIX =""
        DeskTop.prototype.getContext = function () {
            return this.sessionCtx;
        };
        DeskTop.prototype.createPanelFactoryRegistry = function () {
            var registry = new PanelCompositeFactoryRegistry_1.PanelCompositeFactoryRegistry();
            registry.addPanelFactory("", new DefaultPanelFactory());
            this.sessionCtx.set(ServiceObj_1.ServiceObj.PanelCompositeFactoryRegistry, registry);
        };
        DeskTop.prototype.init = function () {
            // 0.创建Context
            this.sessionCtx = Context_1.Context.baseContext.createChild("Desktop_" + GUID_1.default());
            // 1.创建面板工厂
            this.createPanelFactoryRegistry();
            // 2.注册事件模块
            var commandExecutor = new CommandHandlerExecutor_1.CommandHandlerExecutor();
            Context_1.Context.baseContext.set(ServiceObj_1.ServiceObj.CommandHandlerExecutor, commandExecutor);
            EngineEventManager_1.EngineEventManager.init(commandExecutor, commandExecutor.handleEvent);
            // 3.资源
            var resourceDocumentTable = new ResourceDocumentTable_1.ResourceDocumentTable();
            Context_1.Context.baseContext.set(ServiceObj_1.ServiceObj.ResourceDocumentTable, resourceDocumentTable);
            // 4.表达式引擎
            var expressionEngine = new DefaultExpressionEngine_1.DefaultExpressionEngine();
            Context_1.Context.baseContext.set(ServiceObj_1.ServiceObj.DefaultExpressionEngine, expressionEngine);
            // 5.PI
            var pif = new ProcessInstanceFactory_1.ProcessInstanceFactory();
            Context_1.Context.baseContext.set(ServiceObj_1.ServiceObj.ProcessInstanceFactory, pif);
            // 6.MissionFactory
            var missionFactory = new AxureMissionFactory_1.AxureMissionFactory();
            Context_1.Context.baseContext.set(ServiceObj_1.ServiceObj.MissionFactory, missionFactory);
            // 7.PageParser  TODO 换成反射
            var parser = null;
            // if (config.UIType == "Axure") {
            parser = new AxurePageParser_1.AxurePageParser();
            // } else {
            //     parser = new AmebaPageParser();
            // }
            Context_1.Context.baseContext.set(UIConst_1.UIConst.PageParser, parser);
            // 1.启动tad
            var id = "Tad_" + GUID_1.default();
            // let tadPath = "/AppFramework_2013B/trade/test/aa/Aa.tad";
            var tadPath = "/AppFramework_2013B/trade/test/bug0041/Bug0041.tad";
            var defaultTad = new Tad_1.Tad(id, this, tadPath);
            defaultTad.start();
            //DM测试
            // let dm:DataModel = new DataModel();
            //
            // dm.notifyThis(this.modelchanged,this);
            // dm.set("a.b.c","wer");
            // dm.set("t1","aaa");
            // console.log("DM取值: "+dm.get("a.b"));
            // console.log("DM取值: "+dm.get("t1"));
        };
        DeskTop.PANEL_FACTORY_DEFAULT = "";
        DeskTop.PANEL_FACTORY_WINDOW = "window";
        return DeskTop;
    }());
    exports.DeskTop = DeskTop;
    var desktop = new DeskTop();
    desktop.init();
});
//# sourceMappingURL=DeskTop.js.map