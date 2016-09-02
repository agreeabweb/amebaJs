define(["require", "exports", "./define/SedaEntry", "./define/SedaMptTargetEntry", "./define/SedaAlrTargetEntry"], function (require, exports, SedaEntry_1, SedaMptTargetEntry_1, SedaAlrTargetEntry_1) {
    "use strict";
    var SEDADocumentParser = (function () {
        function SEDADocumentParser() {
        }
        SEDADocumentParser.prototype.parse = function (path, input, callback) {
            var xml2json, doc, root, sedaEntry, parseSedaEntries;
            // 把xml转化为json
            xml2json = new X2JS();
            doc = xml2json.xml_str2json(input);
            root = doc.SEDA;
            sedaEntry = new SedaEntry_1.SedaEntry();
            parseSedaEntries = this.parseAbstractSedaEntry(root);
            sedaEntry.setListAbstractEntry(parseSedaEntries);
            callback(sedaEntry);
        };
        SEDADocumentParser.prototype.parseAbstractSedaEntry = function (root) {
            var result, mpts, ase, listState, element, state, alrs;
            result = new Array();
            mpts = root.MPT;
            if (mpts != undefined) {
                ase = new SedaMptTargetEntry_1.SedaMptTargetEntry();
                element = mpts;
            }
            listState = new Array();
            ase.setNodeId(element._nodeId);
            ase.setPath(element._path);
            ase.setCaption(element._caption);
            alrs = element.ALR;
            if (alrs instanceof Array) {
                for (var i = 0; i < alrs.length; i++) {
                    state = new SedaAlrTargetEntry_1.SedaAlrTargetEntry();
                    state.setPath(alrs[i]._path);
                    state.setCaption(alrs[i]._caption);
                    listState.push(state);
                }
            }
            else {
                state = new SedaAlrTargetEntry_1.SedaAlrTargetEntry();
                state.setPath(alrs._path);
                state.setCaption(alrs._caption);
                listState.push(state);
            }
            ase.setListAlr(listState);
            result.push(ase);
            return result;
        };
        return SEDADocumentParser;
    }());
    exports.SEDADocumentParser = SEDADocumentParser;
});
//# sourceMappingURL=SEDADocumentParser.js.map