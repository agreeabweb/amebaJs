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
    public getContext():Context {
        return this.sessionCtx;
    }

    public init() {

        // 0.创建Context
        this.sessionCtx = Context.baseContext.createChild("Desktop_"+GUID());
        // 1.创建面板工厂
        var defaultPanelFactory:IPanelCompositeFactory = new DefaultPanelFactory();
        this.panelCompositeFactoryRegistry.put(DeskTop.PANEL_FACTORY_DEFAULT,defaultPanelFactory);
        // 2.注册事件模块
        let commandExecutor = new CommandHandlerExecutor();
        Context.baseContext.set(ServiceObj.CommandHandlerExecutor,commandExecutor);
        EngineEventManager.init(commandExecutor,commandExecutor.handleEvent);
        // 3.资源
        var resourceDocumentTable = new ResourceDocumentTable();
        Context.baseContext.set(ServiceObj.ResourceDocumentTable, resourceDocumentTable);
        // 4.表达式引擎
        var expressionEngine = new DefaultExpressionEngine();
        Context.baseContext.set(ServiceObj.DefaultExpressionEngine, expressionEngine);
        // 5.PI
        var pif = new ProcessInstanceFactory();
        Context.baseContext.set(ServiceObj.ProcessInstanceFactory, pif);

        // 1.启动tad
        let id:string = "Tad_"+GUID();
        // let tadPath = "/AppFramework_2013B/trade/test/aa/Aa.tad";
        let tadPath = "/AppFramework_2013B/trade/test/bug0041/Bug0041.tad";
        let defaultTad = new Tad(id,this,tadPath);
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
}


let desktop = new DeskTop();
desktop.init();
