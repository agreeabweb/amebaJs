import {IDocumentParser} from "../resource/IDocumentParser";
import {AgreeLogicRule} from "./define/AgreeLogicRule";
import {Lane} from "./define/Lane";
import {LogicletComponentElement} from "./define/LogicletComponentElement";
import {ArgElement} from "./define/ArgElement";
import {LFCComponentElement} from "./define/LFCComponentElement";

declare let X2JS;

class ALRDocumentParser implements IDocumentParser {
    public parse(path: string, input: string, callback: Function): void {
        let xml2json, doc, alr, root, components, lfcs, afts, ends, lanes;
        
        // 把xml转化为json
        xml2json = new X2JS();
        doc = xml2json.xml_str2json(input);
        root = doc.AgreeLogicRule;

        alr = new AgreeLogicRule();
        alr.setPath(path);
        alr.setStartNodeId(root._start);

        components = root.Component;
        if(components != undefined) {
            if(components instanceof Array) {
                for(let i = 0; i < components.length; i++) {
                    this.parseLogicletComponentElement(alr, components[i]);
                }
            } else {
                this.parseLogicletComponentElement(alr, components);
            }
        }

        lfcs = root.LFC;
        if(lfcs != undefined) {
            if(lfcs instanceof Array) {
                for(let i = 0; i < lfcs.length; i++) {
                    this.parseLfcComponentElement(alr, lfcs[i]);
                }
            } else {
                this.parseLfcComponentElement(alr, lfcs);
            }
        }

        afts = root.AFT;
        if(afts != undefined) {
            if(afts instanceof Array) {
                for(let i = 0; i < afts.length; i++) {
                    this.parseAftComponentElement(alr, afts[i]);
                }
            } else {
                this.parseAftComponentElement(alr, afts);
            }
        }

        lanes = root.Lanes;
        if(lanes != undefined) {
            let lane, contains;
            if(lanes instanceof Array) {
                for(let i = 0; i < lanes.length; i++) {
                    lane = new Lane();
                    lane.setName(lanes[i]._name);
                    lane.setWidth(lanes[i]._width);
                    contains = (lanes[i]._contains).split(",");
                    for(let j = 0; j < contains.length; j++) {
                        lane.addNodeId(contains[j]);
                    }
                    alr.addLane(lane);
                }
            } else {
                lane = new Lane();
                lane.setName(lanes._name);
                lane.setWidth(lanes._width);
                contains = (lanes._contains).split(",");
                for(let i = 0; i < contains.length; i++) {
                    lane.addNodeId(contains[i]);
                }
                alr.addLane(lane);
            }
        }

        ends = root.End;
        if(ends != undefined) {
            if(ends instanceof Array) {
                for(let i = 0; i < ends.length; i++) {
                    alr.addEndValue(ends[i]._id, ends[i]._name);
                }
            } else {
                alr.addEndValue(ends._id, ends._name);
            }
            
        }

        callback(alr);
    }

    public parseLogicletComponentElement(alr: AgreeLogicRule, element: any): void {
        let ce, inArgs, outArgs, outs, exceptions;

        ce = new LogicletComponentElement();
        ce.setId(element._id);
        ce.setShowId(element._showId == undefined? "": element._showId);
        ce.setCaption(element.caption);
        ce.setName(element._name);
        ce.setDescription(element._description);
        
        inArgs = element.InArg;
        if(inArgs != undefined) {
            if(inArgs instanceof Array) {
                for(let i = 0; i < inArgs.length; i++) {
                    let ae = new ArgElement();
                    ae.setCaption(inArgs[i]._caption);
                    ae.setName(inArgs[i]._name);
                    let argText = inArgs[i].__text;
                    if(argText != undefined && argText.match(/^\"/) && argText.match(/\"$/)) {
                        argText = argText.substring(1, argText.length - 1);
                    }
                    ae.setContent(argText);
                    ce.addInArg(ae);
                }
            } else {
                let ae = new ArgElement();
                ae.setCaption(inArgs._caption);
                ae.setName(inArgs._name);
                let argText = inArgs.__text;
                if(argText != undefined && argText.match(/^\"/) && argText.match(/\"$/)) {
                    argText = argText.substring(1, argText.length - 1);
                }
                ae.setContent(argText);
                ce.addInArg(ae);
            }
        }

        outArgs = element.OutArg;
        if(outArgs != undefined) {
            if(outArgs instanceof Array) {
                for(let i = 0; i < outArgs.length; i++) {
                    let ae = new ArgElement();
                    ae.setCaption(outArgs[i]._caption);
                    ae.setName(outArgs[i]._name);
                    ae.setContent(outArgs[i].__text);
                    ce.addInArg(ae);
                }
            } else {
                let ae = new ArgElement();
                ae.setCaption(outArgs._caption);
                ae.setName(outArgs._name);
                ae.setContent(outArgs.__text);
                ce.addInArg(ae);
            }
        }

        outs = element.Out;
        if(outs != undefined) {
            if(outs instanceof Array) {
                for(let i = 0; i < outs.length; i++) {
                    ce.addOutNext(outs[i]._name, outs[i]._next);
                }
            } else {
                ce.addOutNext(outs._name, outs._next);
            }
        }

        exceptions = element.Exception;
        if(exceptions != undefined) {
            if(exceptions instanceof Array) {
                for(let i = 0; i < exceptions.length; i++) {
                    ce.addOutNext(exceptions[i]._name, exceptions[i]._next);
                }
            } else {
                ce.addOutNext(exceptions._name, exceptions._next);
            }
        }

        alr.addComponentElement(ce);
    }

    public parseLfcComponentElement(alr: AgreeLogicRule, element: any): void {
        let ce, outs, exceptions;

        ce = new LFCComponentElement();
        ce.setId(element._id);
        ce.setShowId(element._showId == undefined? "": element._showId);
        ce.setCaption(element._caption);
        ce.setPath(element._path);
        ce.setDescription(element._description);

        outs = element.Out;
        if(outs != undefined) {
            if(outs instanceof Array) {
                for(let i = 0; i < outs.length; i++) {
                    ce.addOutNext(outs[i]._name, outs[i]._next);
                }
            } else {
                ce.addOutNext(outs._name, outs._next);
            }
        }

        exceptions = element.Exception;
        if(exceptions != undefined) {
            if(exceptions instanceof Array) {
                for(let i = 0; i < exceptions.length; i++) {
                    ce.addOutNext(exceptions[i]._name, exceptions[i]._next);
                }
            } else {
                ce.addOutNext(exceptions._name, exceptions._next);
            }
        }

        alr.addComponentElement(ce);
    }

    public parseAftComponentElement(alr: AgreeLogicRule, element: any): void {
        let ce, outs, exceptions;

        ce = new LFCComponentElement();
        ce.setId(element._id);
        ce.setShowId(element._showId == undefined? "": element._showId);
        ce.setCaption(element._caption);
        ce.setPath(element._path);
        ce.setDescription(element._description);

        outs = element.Out;
        if(outs != undefined) {
            if(outs instanceof Array) {
                for(let i = 0; i < outs.length; i++) {
                    ce.addOutNext(outs[i]._name, outs[i]._next);
                }
            } else {
                ce.addOutNext(outs._name, outs._next);
            }
        }

        exceptions = element.Exception;
        if(exceptions != undefined) {
            if(exceptions instanceof Array) {
                for(let i = 0; i < exceptions.length; i++) {
                    ce.addOutNext(exceptions[i]._name, exceptions[i]._next);
                }
            } else {
                ce.addOutNext(exceptions._name, exceptions._next);
            }
        }

        alr.addComponentElement(ce);
    }

}

export {ALRDocumentParser};