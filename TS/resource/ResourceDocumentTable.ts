import {ResourceManager} from "./ResourceManager";
import {ProcessDefinitionParser} from "../engine/process/ProcessDefinitionParser";
import {LFCDocumentParser} from "../lfc/LFCDocumentParser";
import {TADDocumentParser} from "../tad/TADDocumentParser";
import {MPTDocumentParser} from "../mpt/MPTDocumentParser";
import {SEDADocumentParser} from "../alr/SEDADocumentParser";
import {ALRDocumentParser} from "../alr/ALRDocumentParser";

/**
 * 资源文件对象
 */
class ResourceDocumentTable {
    public constructor() {};

    //--------------------------------------------------------getter------------------------------------------
    public getDocument(path: string, clazz: string, callback: Function): void {
        ResourceManager.getResourceFile(path, function(file) {
            let parser;
        
            if(clazz === "ProcessDefinition") {
                parser = new ProcessDefinitionParser();
            } else if(clazz === "LogicFlowControl") {
                parser = new LFCDocumentParser();
            } else if(clazz === "TradeAssemblyDefine") {
                parser = new TADDocumentParser();
            } else if(clazz === "MainProcessTemplate") {
                parser = new MPTDocumentParser();
            } else if(clazz === "SedaEntry") {
                parser = new SEDADocumentParser();
            } else if(clazz === "AgreeLogicRule") {
                parser = new ALRDocumentParser();
            }
            parser.parse(path, file, function(result) {
                callback(result);
            });
        });
    };
};

export {ResourceDocumentTable};