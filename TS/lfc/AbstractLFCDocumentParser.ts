import {IDocumentParser} from "../resource/IDocumentParser";
import {LogicFlowControl} from "./define/LogicFlowControl";
import {LFCComponentElement} from "./define/LFCComponentElement";
import {LogicletComponentElement} from "./define/LogicletComponentElement";
import {ArgElement} from "./define/ArgElement";

declare let X2JS;

abstract class AbstractLFCDocumentParser<T extends LogicFlowControl> implements IDocumentParser {
    public constructor() {};

    protected abstract createDocumentObject(): T;

    public parse(path: string, input: string, callback: Function): void {
        let LFCDP, doc, lfc, root, components, end, lfcs, xml2json;
        
        LFCDP = this;  // 避免this指代混乱
        
        // 把xml转化为json
        xml2json = new X2JS();
        doc = xml2json.xml_str2json(input);
        
        lfc = this.createDocumentObject();
        lfc.setPath(path);
        // 数据篮子DataBasket生成DNC-----待定
        // lfc.setDnc(dnc);
        
        /**
         * 所读到的lfc格式待定，目前为json格式
         */
        root = doc.LogicFlowControl;
        // startNodeId
        lfc.setStartNodeId(root._start);
        // end信息
        end = root.End;
        lfc.addEndValueMap(end._name, end._id);
        
        // 节点信息
        components = root.Component;
        if(components != undefined) {
            if(components instanceof Array) {
                for(let i = 0; i < components.length; i++) {
                    LFCDP.parseLogicletComponentElement(lfc, components[i]);
                }
            } else {
                LFCDP.parseLogicletComponentElement(lfc, components);
            }
        }
        
        lfcs = root.LFC;
        if(lfcs != undefined) {
            if(lfcs instanceof Array) {
                for(let i = 0; i < lfcs.length; i++) {
                    LFCDP.parseLfcComponentElement(lfc, lfcs[i]);
                }
            } else {
                LFCDP.parseLfcComponentElement(lfc, lfcs);
            }
        }
        
        // 处理内部变量
        if(root.InternalVars != undefined && root.InternalVars != "") {
            let vars = root.InternalVars.Var;
            if(vars instanceof Array) {
                for(let i = 0; i < vars.length; i++) {
                    lfc.addVarMap(vars[i]._name);
                }
            } else {
                lfc.addVarMap(vars._name);
            }
        }
        
        callback(lfc);
    }

    /**
     * 解析LFC组件
     */
    public parseLfcComponentElement(lfc: any, element: any): void {
        let ce, inArg, outArg, out, ex, mappings;
        
        ce = new LFCComponentElement();
        // 保存基本信息
        ce.setId(element._id);
        ce.setPath(element._path);
        // 保存入参信息
        inArg = element.InArg;
        if(inArg != undefined) {
            let argText;
            if(inArg instanceof Array) {
                for(let i = 0; i < inArg.length; i++) {
                    let ae = new ArgElement();
                    ae.setCaption(inArg[i]._caption);
                    ae.setName(inArg[i]._name);
                    argText = inArg[i].__text;
                    if(argText != undefined && argText.match(/^\"/) && argText.match(/\"$/)) {
                        argText = argText.substring(1, argText.length - 1);
                    }
                    ae.setContent(argText);
                    ce.addInArg(ae);
                }
            } else {
                let ae = new ArgElement();
                ae.setCaption(inArg._caption);
                ae.setName(inArg._name);
                argText = inArg.__text;
                if(argText != undefined && argText.match(/^\"/) && argText.match(/\"$/)) {
                    argText = argText.substring(1, argText.length - 1);
                }
                ae.setContent(argText);
                ce.addInArg(ae);
            }
        }
        // 保存出参信息
        outArg = element.OutArg;
        if(outArg != undefined) {
            if(outArg instanceof Array) {
                for(let i = 0; i < outArg.length; i++) {
                    let ae = new ArgElement();
                    ae.setCaption(outArg[i]._caption);
                    ae.setName(outArg[i]._name);
                    ae.setContent(outArg[i].__text);
                    ce.addOutArg(ae);
                }
            } else {
                let ae = new ArgElement();
                ae.setCaption(outArg._caption);
                ae.setName(outArg._name);
                ae.setContent(outArg.__text);
                ce.addOutArg(ae);
            }
        }
        // 连接信息
        out = element.Out;
        if(out != undefined) {
            if(out instanceof Array) {
                for(let i = 0; i < out.length; i++) {
                    ce.addOutNext(out[i]._name, out[i]._next);
                }
            } else {
                ce.addOutNext(out._name, out._next);
            }
        }
        ex = element.Exception;
        if(ex != undefined) {
            ce.setExceptionNext(ex._next);
        }
        // 数据映射
        mappings = element.Mappings;
        if(mappings != undefined) {
            for (let i = 0; i < mappings.length; i++) {
                let mapping = mappings[i].Mapping;
                if(mapping != undefined) {
                    for (let j = 0; j < mapping.length; j++) {
                        let target, source;

                        target = mapping[j]._target;
                        source = mapping[j]._source;
                        ce.addMapping(target, source);
                    }
                }
            }
        }
        
        lfc.addComponentElement(ce);
    };
    /**
     * 解析component组件
     */
    public parseLogicletComponentElement(lfc: any, element: any): void {
        let ce, inArg, outArg, out, ex;
        
        ce = new LogicletComponentElement();
        // 保存基本信息
        ce.setId(element._id);
        ce.setName(element._name);
        // 保存入参信息
        inArg = element.InArg;
        if(inArg != undefined) {
            let argText;
            if(inArg instanceof Array) {
                for(let i = 0; i < inArg.length; i++) {
                    let ae = new ArgElement();
                    ae.setCaption(inArg[i]._caption);
                    ae.setName(inArg[i]._name);
                    argText = inArg[i].__text;
                    if(argText != undefined && argText.match(/^\"/) && argText.match(/\"$/)) {
                        argText = argText.substring(1, argText.length - 1);
                    }
                    ae.setContent(argText);
                    ce.addInArg(ae);
                }
            } else {
                let ae = new ArgElement();
                ae.setCaption(inArg._caption);
                ae.setName(inArg._name);
                argText = inArg.__text;
                if(argText != undefined && argText.match(/^\"/) && argText.match(/\"$/)) {
                    argText = argText.substring(1, argText.length - 1);
                }
                ae.setContent(argText);
                ce.addInArg(ae);
            }
        }
        // 保存出参信息
        outArg = element.OutArg;
        if(outArg != undefined) {
            if(outArg instanceof Array) {
                for(let i = 0; i < outArg.length; i++) {
                    let ae = new ArgElement();
                    ae.setCaption(outArg[i]._caption);
                    ae.setName(outArg[i]._name);
                    ae.setContent(outArg[i].__text);
                    ce.addOutArg(ae);
                }
            } else {
                let ae = new ArgElement();
                ae.setCaption(outArg._caption);
                ae.setName(outArg._name);
                ae.setContent(outArg.__text);
                ce.addOutArg(ae);
            }
        }
        // 连接信息
        out = element.Out;
        if(out != undefined) {
            if(out instanceof Array) {
                for(let i = 0; i < out.length; i++) {
                    ce.addOutNext(out[i]._name, out[i]._next);
                }
            } else {
                ce.addOutNext(out._name, out._next);
            }
        }
        ex = element.Exception;
        if(ex != undefined) {
            ce.setExceptionNext(ex._next);
        }
        lfc.addComponentElement(ce);
    };
}

export {AbstractLFCDocumentParser};