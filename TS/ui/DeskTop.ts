/**
 * Created by Oliver on 2016-08-04 0004.
 */
/// <reference path="../lib/jquery.d.ts" />
/// <reference path="../lib/pubsub.d.ts" />
import {IPanelCompositeFactory} from "./IPanelCompositeFactory";
import {Context} from "../runtime/Context";
import GUID from "../lib/GUID";
import {HashMap} from "../lib/HashMap";
import {EngineEventManager} from "./EngineEventManager";
import {CommandHandlerExecutor} from "./CommandHandlerExecutor";
import {Tad} from "./Tad";
import {ServiceObj} from "../const/ServiceObj";
import {ResourceDocumentTable}from "../resource/ResourceDocumentTable";
import {DefaultExpressionEngine} from "../engine/expression/DefaultExpressionEngine";
import {ProcessInstanceFactory} from "../engine/process/ProcessInstanceFactory";
import {DataModel}from"../runtime/DataModel";
import {PanelCompositeFactoryRegistry} from "./PanelCompositeFactoryRegistry";
import {AxureMissionFactory} from "./mission/AxureMissionFactory";
import {AxurePageParser} from "./pageparsers/AxurePageParser";
import {UIConst} from "../const/UIConst";
// import {config} from "../configure/config";
import {AmebaPageParser} from "./pageparsers/AmebaPageParser";

class DefaultPanelFactory implements IPanelCompositeFactory {
    getPanelComposite():any {
        return $("BODY");
    }
}

export class DeskTop {

    private sessionCtx:Context;
    private panelCompositeFactoryRegistry:HashMap = new HashMap();
    public static PANEL_FACTORY_DEFAULT = "";
    public static PANEL_FACTORY_WINDOW = "window";
    // private static CONTEXT_PREFIX =""

    private createPanelFactoryRegistry(): void {
        let registry:PanelCompositeFactoryRegistry = new PanelCompositeFactoryRegistry();
        registry.addPanelFactory("", new DefaultPanelFactory());
        this.sessionCtx.set(ServiceObj.PanelCompositeFactoryRegistry, registry);
    }

    public init(): void {

        // 0.创建Context
        this.sessionCtx = Context.baseContext.createChild("Desktop_" + GUID());
        // 1.创建面板工厂
        this.createPanelFactoryRegistry();
        // 2.注册事件模块
        let commandExecutor = new CommandHandlerExecutor();
        Context.baseContext.set(ServiceObj.CommandHandlerExecutor, commandExecutor);
        EngineEventManager.init(commandExecutor, commandExecutor.handleEvent);
        // 3.资源
        let resourceDocumentTable = new ResourceDocumentTable();
        Context.baseContext.set(ServiceObj.ResourceDocumentTable, resourceDocumentTable);
        // 4.表达式引擎
        let expressionEngine = new DefaultExpressionEngine();
        Context.baseContext.set(ServiceObj.DefaultExpressionEngine, expressionEngine);
        // 5.PI
        let pif = new ProcessInstanceFactory();
        Context.baseContext.set(ServiceObj.ProcessInstanceFactory, pif);
        // 6.MissionFactory
        let missionFactory = new AxureMissionFactory();
        Context.baseContext.set(ServiceObj.MissionFactory, missionFactory);
        // 7.PageParser  TODO 换成反射
        let parser = null;
        // if (config.UIType == "Axure") {
            parser = new AxurePageParser();
        // } else {
        //     parser = new AmebaPageParser();
        // }
        Context.baseContext.set(UIConst.PageParser, parser);

        // 1.启动tad
        let id:string = "Tad_" + GUID();
        // let tadPath = "/AppFramework_2013B/trade/test/aa/Aa.tad";
        let tadPath = "/AppFramework_2013B/trade/test/bug0041/Bug0041.tad";
        let defaultTad = new Tad(id, this, tadPath);
        defaultTad.start();

        //DM测试
        // let dm:DataModel = new DataModel();
        //
        // dm.notifyThis(this.modelchanged,this);
        // dm.set("a.b.c","wer");
        // dm.set("t1","aaa");
        // console.log("DM取值: "+dm.get("a.b"));
        // console.log("DM取值: "+dm.get("t1"));
    }

    //
    // public modelchanged(key,old,now)
    // {
    //
    //     console.log("DM值发生了变化: "+key);
    // }

    //-----------------------------------------------getter-------------------------------------------------
    public getContext():Context {
        return this.sessionCtx;
    }
}


let desktop = new DeskTop();
desktop.init();
