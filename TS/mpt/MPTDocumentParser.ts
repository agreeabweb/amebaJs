import {HashMap} from "../lib/HashMap";
import {MainProcessTemplate} from "./define/MainProcessTemplate";
import {MPTStep} from "./define/MPTStep";
import {MPTFile} from "./define/MPTFile";
import {LFCFile} from "./define/LFCFile";
import {UIFile} from "./define/UIFile";
import {LogicStep} from "./define/LogicStep";
import {SedaStep} from "./define/SedaStep";
import {IDocumentParser} from "../resource/IDocumentParser";

declare var X2JS

class MPTDocumentParser implements IDocumentParser {

    public constructor() {};

    public parse(path: string, input: string, callback: Function): void {
        var MPTDP, doc, mpt, root, startNodeId, lfcs, logicsteps, sedasteps, uisteps, xml2json;
        
        MPTDP = this;
        
        // 把xml转化为json
        xml2json = new X2JS();
        doc = xml2json.xml_str2json(input);
        
        mpt = new MainProcessTemplate();
        root = doc.MainProcessTemplate;
        
        startNodeId = root._start;
        if(startNodeId == undefined || startNodeId === "") {
            mpt.setStartNodeId(1);
        } else {
            mpt.setStartNodeId(startNodeId);
        }
        
        lfcs = root.LFC;
        if(lfcs != undefined) {
            if(lfcs instanceof Array) {
                for(var i = 0; i < lfcs.length; i++) {
                    mpt.addStep(MPTDP.parseStepElement(new LFCFile(), lfcs[i]));
                }
            } else {
                mpt.addStep(MPTDP.parseStepElement(new LFCFile(), lfcs));
            }
        }

        logicsteps = root.LogicStep;
        if(logicsteps != undefined) {
            if(logicsteps instanceof Array) {
                for(var i = 0; i < logicsteps.length; i++) {
                    mpt.addStep(MPTDP.parseStepElement(new LogicStep(), logicsteps[i]));
                }
            } else {
                mpt.addStep(MPTDP.parseStepElement(new LogicStep(), logicsteps));
            }
        }

        sedasteps = root.SedaStep;
        if(sedasteps != undefined) {
            if(sedasteps instanceof Array) {
                for(var i = 0; i < sedasteps.length; i++) {
                    mpt.addStep(MPTDP.parseStepElement(new SedaStep(), sedasteps[i]));
                }
            } else {
                mpt.addStep(MPTDP.parseStepElement(new SedaStep(), sedasteps));
            }
        }
        
        uisteps = root.UIStep;
        if(uisteps != undefined) {
            if(uisteps instanceof Array) {
                for(var i = 0; i < uisteps.length; i++) {
                    mpt.addStep(MPTDP.parseStepElement(new UIFile(), uisteps[i]));
                }
            } else {
                mpt.addStep(MPTDP.parseStepElement(new UIFile(), uisteps));
            }
        }
        
        // 处理内部变量
        if(root.InternalVars != undefined && root.InternalVars != "") {
            var vars = root.InternalVars.Var;
            if(vars instanceof Array) {
                for(var i = 0; i < vars.length; i++) {
                    mpt.addVarMap(vars[i]._name);
                }
            } else {
                mpt.addVarMap(vars._name);
            }
        }
        callback(mpt);
    };
    public parseStepElement(step: MPTStep, element): MPTStep {
        var out, ex, inArg, inArgMap, inArgName, inArgText, outArg, outArgMap, outArgName, outArgText,
            mappings;
        
        step.setId(element._id);
        step.setShowId(element._showId === undefined? "" : element._showId);
        step.setCaption(element._caption);
        step.setDescription(element._description);
        
        out = element.Out;
        step.addOutNext(out._name, out._next);
        
        ex = element.Exception;
        step.setExceptionNext(ex._next);
        
        if(step instanceof MPTFile) {
            (<MPTFile>step).setPath(element._path);
        
            inArg = element.InArg;
            if(inArg != undefined) {
                inArgMap = new HashMap();
                inArgName = inArg._name;
                inArgText = inArg.__text;
                inArgMap.put(inArgName, inArgText);
                (<MPTFile>step).setInArgMap(inArgMap);
            }
            
            outArg = element.OutArg;
            if(outArg != undefined) {
                outArgMap = new HashMap();
                outArgName = outArg._name;
                outArgText = outArg.__text;
                outArgMap.put(outArgName, outArgText);
                (<MPTFile>step).setOutArgMap(outArgMap);
            }
            
            // 处理映射
            mappings = element.Mappings;
        }

        if(step instanceof UIFile) {
            if(element._target != undefined) {
                (<UIFile>step).setTarget(element._target);
            }
        }
        
        return step;
    };
};

export {MPTDocumentParser};