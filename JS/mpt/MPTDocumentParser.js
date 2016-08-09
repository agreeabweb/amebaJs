define(["require", "exports", "../lib/HashMap", "./define/MainProcessTemplate", "./define/MPTFile", "./define/LFCFile", "./define/UIFile", "./define/UIStep", "./define/LogicStep", "./define/SedaStep"], function (require, exports, HashMap_1, MainProcessTemplate_1, MPTFile_1, LFCFile_1, UIFile_1, UIStep_1, LogicStep_1, SedaStep_1) {
    "use strict";
    var MPTDocumentParser = (function () {
        function MPTDocumentParser() {
        }
        ;
        MPTDocumentParser.prototype.parse = function (path, input, callback) {
            var MPTDP, doc, mpt, root, startNodeId, lfcs, logicsteps, sedasteps, uisteps, uis, xml2json;
            MPTDP = this;
            // 把xml转化为json
            xml2json = new X2JS();
            doc = xml2json.xml_str2json(input);
            mpt = new MainProcessTemplate_1.MainProcessTemplate();
            root = doc.MainProcessTemplate;
            startNodeId = root._start;
            if (startNodeId == undefined || startNodeId === "") {
                mpt.setStartNodeId(1);
            }
            else {
                mpt.setStartNodeId(startNodeId);
            }
            lfcs = root.LFC;
            if (lfcs != undefined) {
                if (lfcs instanceof Array) {
                    for (var i = 0; i < lfcs.length; i++) {
                        mpt.addStep(MPTDP.parseStepElement(new LFCFile_1.LFCFile(), lfcs[i]));
                    }
                }
                else {
                    mpt.addStep(MPTDP.parseStepElement(new LFCFile_1.LFCFile(), lfcs));
                }
            }
            logicsteps = root.LogicStep;
            if (logicsteps != undefined) {
                if (logicsteps instanceof Array) {
                    for (var i = 0; i < logicsteps.length; i++) {
                        mpt.addStep(MPTDP.parseStepElement(new LogicStep_1.LogicStep(), logicsteps[i]));
                    }
                }
                else {
                    mpt.addStep(MPTDP.parseStepElement(new LogicStep_1.LogicStep(), logicsteps));
                }
            }
            sedasteps = root.SedaStep;
            if (sedasteps != undefined) {
                if (sedasteps instanceof Array) {
                    for (var i = 0; i < sedasteps.length; i++) {
                        mpt.addStep(MPTDP.parseStepElement(new SedaStep_1.SedaStep(), sedasteps[i]));
                    }
                }
                else {
                    mpt.addStep(MPTDP.parseStepElement(new SedaStep_1.SedaStep(), sedasteps));
                }
            }
            uisteps = root.UIStep;
            if (uisteps != undefined) {
                if (uisteps instanceof Array) {
                    for (var i = 0; i < uisteps.length; i++) {
                        mpt.addStep(MPTDP.parseStepElement(new UIStep_1.UIStep(), uisteps[i]));
                    }
                }
                else {
                    mpt.addStep(MPTDP.parseStepElement(new UIStep_1.UIStep(), uisteps));
                }
            }
            uis = root.UI;
            if (uis != undefined) {
                if (uis instanceof Array) {
                    for (var i = 0; i < uis.length; i++) {
                        mpt.addStep(MPTDP.parseStepElement(new UIFile_1.UIFile(), uis[i]));
                    }
                }
                else {
                    mpt.addStep(MPTDP.parseStepElement(new UIFile_1.UIFile(), uis));
                }
            }
            // 处理内部变量
            if (root.InternalVars != undefined && root.InternalVars != "") {
                var vars = root.InternalVars.Var;
                if (vars instanceof Array) {
                    for (var i = 0; i < vars.length; i++) {
                        mpt.addVarMap(vars[i]._name);
                    }
                }
                else {
                    mpt.addVarMap(vars._name);
                }
            }
            callback(mpt);
        };
        ;
        MPTDocumentParser.prototype.parseStepElement = function (step, element) {
            var outs, ex, inArg, inArgMap, inArgName, inArgText, outArg, outArgMap, outArgName, outArgText, mappings;
            step.setId(element._id);
            step.setShowId(element._showId === undefined ? "" : element._showId);
            step.setCaption(element._caption);
            step.setDescription(element._description);
            outs = element.Out;
            if (outs instanceof Array) {
                for (var i = 0; i < outs.length; i++) {
                    step.addOutNext(outs[i]._name, outs[i]._next);
                }
            }
            else {
                step.addOutNext(outs._name, outs._next);
            }
            ex = element.Exception;
            step.setExceptionNext(ex._next);
            if (step instanceof MPTFile_1.MPTFile) {
                step.setPath(element._path);
                inArg = element.InArg;
                if (inArg != undefined) {
                    inArgMap = new HashMap_1.HashMap();
                    inArgName = inArg._name;
                    inArgText = inArg.__text;
                    inArgMap.put(inArgName, inArgText);
                    step.setInArgMap(inArgMap);
                }
                outArg = element.OutArg;
                if (outArg != undefined) {
                    outArgMap = new HashMap_1.HashMap();
                    outArgName = outArg._name;
                    outArgText = outArg.__text;
                    outArgMap.put(outArgName, outArgText);
                    step.setOutArgMap(outArgMap);
                }
                // 处理映射
                mappings = element.Mappings;
            }
            if (step instanceof UIFile_1.UIFile) {
                if (element._target != undefined) {
                    step.setTarget(element._target);
                }
            }
            return step;
        };
        ;
        return MPTDocumentParser;
    }());
    exports.MPTDocumentParser = MPTDocumentParser;
    ;
});
//# sourceMappingURL=MPTDocumentParser.js.map