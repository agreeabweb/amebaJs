import {IDocumentParser} from "../resource/IDocumentParser";
import {SedaEntry} from "./define/SedaEntry";
import {AbstractSedaEntry} from "./define/AbstractSedaEntry";
import {SedaMptTargetEntry} from "./define/SedaMptTargetEntry";
import {SedaAlrTargetEntry} from "./define/SedaAlrTargetEntry";
import {SedaMappingTargetEntry} from "./define/SedaMappingTargetEntry";

declare var X2JS;

class SEDADocumentParser implements IDocumentParser {
    public parse(path: string, input: string, callback: Function): void {
        var xml2json, doc, root, sedaEntry, parseSedaEntries;
        
        // 把xml转化为json
        xml2json = new X2JS();
        doc = xml2json.xml_str2json(input);
        
        root = doc.SEDA;

        sedaEntry = new SedaEntry();

        parseSedaEntries = this.parseAbstractSedaEntry(root);
        sedaEntry.setListAbstractEntry(parseSedaEntries);

        callback(sedaEntry);
    }

    public parseAbstractSedaEntry(root) {
        var result, mpts, ase, listState, element, state, alrs, listSmte;

        result = new Array<AbstractSedaEntry>();
        
        mpts = root.MPT;
        if(mpts != undefined) {
            ase = new SedaMptTargetEntry();
            element = mpts;
        }

        listState = new Array<SedaAlrTargetEntry>();
        ase.setNodeId(element._nodeId);
        ase.setPath(element._path);
        ase.setCaption(element._caption);
        
        alrs = element.ALR;
        if(alrs instanceof Array) {
            for(var i = 0; i < alrs.length; i++) {
                state = new SedaAlrTargetEntry();
                state.setPath(alrs[i]._path);
                state.setCaption(alrs[i]._caption);
                
                listState.push(state);
            }
        } else {
            state = new SedaAlrTargetEntry();
            state.setPath(alrs._path);
            state.setCaption(alrs._caption);
            
            listState.push(state);
        }
        ase.setListAlr(listState);
        result.push(ase);

        return result;
    }
}

export {SEDADocumentParser};