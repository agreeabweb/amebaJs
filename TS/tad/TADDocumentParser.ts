import {TradeAssemblyDefine} from "./define/TradeAssemblyDefine";
import {IDocumentParser} from "../resource/IDocumentParser";

declare var X2JS

class TADDocumentParser implements IDocumentParser {
    public constructor() {};

    /**
     * 解析方法
     */
    public parse(path:string, input: string, callback: Function): void {
        var xml2json, doc, root, tad, mpt, nodes, nodeId, nodeType, nodeInArgs, nodeOutArgs, argName, argExpression, 
            mappings, mappingPath, mapping, source, target;
        
        // 把xml转化为json
        xml2json = new X2JS();
        doc = xml2json.xml_str2json(input);
        
        tad = new TradeAssemblyDefine();
        tad.setPath(path);
        
        root = doc.TradeAssembly;
        // 数据篮子DataBasket生成DNC-----待定
        
        /**
         * 所读到的tad格式待定，目前为json格式
         */
        
        // 数据规则 DataRule
        if(root.DataRule != undefined) {
            
        }
        
        // 主流程 MainProcess
        if(root.MainProcess != undefined) {
            mpt = root.MainProcess;
            tad.setMPTPath(mpt._path);
            nodes = mpt.Node;
            if(nodes != undefined) {
                for(var i = 0; i < nodes.length; i++) {
                    nodeId = nodes[i]._id;
                    nodeType = nodes[i]._type;
                    // node inArg
                    nodeInArgs = nodes[i].InArg;
                    if(nodeInArgs != undefined && nodeInArgs != "") {
                        for(var j = 0; j < nodeInArgs.length; j++) {
                            argName = nodeInArgs[j]._name;
                            argExpression = nodeInArgs[j].__text;
                            tad.addNodeInArg(nodeId, argName, argExpression);
                        }
                    }
                    
                    // node outArg
                    nodeOutArgs = nodes[i].OutArg;
                    if(nodeOutArgs != undefined && nodeOutArgs != "") {
                        for(var j = 0; j < nodeOutArgs.length; j++) {
                            argName = nodeOutArgs[j]._name;
                            argExpression = nodeOutArgs[j].__text;
                            tad.addNodeOutArg(nodeId, argName, argExpression);
                        }
                    }
                    
                    // mappings
                    mappings = nodes[i].Mappings;
                    if(mappings != undefined && mappings != "") {
                        mapping = mappings.Mapping;
                        if(mapping != undefined) {
                            source = mapping._source;
                            target = mapping._target;
                            tad.addNodeMapping(nodeId, target, source);
                        }
                    }
                }
            }
            
        } 
        
        // 处理内部变量
        if(root.InternalVars != undefined) {
            var vars = root.InternalVars.Var;
            if(vars instanceof Array) {
                for(var i = 0; i < vars.length; i++) {
                    tad.addVarMap(vars[i]._name);
                }
            } else {
                tad.addVarMap(vars._name);
            }
        }
        
        callback(tad);
    };
};

export {TADDocumentParser};