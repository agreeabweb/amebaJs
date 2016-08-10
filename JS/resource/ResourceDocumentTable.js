define(["require", "exports", "./ResourceManager", "../engine/process/ProcessDefinitionParser", "../lfc/LFCDocumentParser", "../tad/TADDocumentParser", "../mpt/MPTDocumentParser", "../alr/SEDADocumentParser", "../alr/ALRDocumentParser"], function (require, exports, ResourceManager_1, ProcessDefinitionParser_1, LFCDocumentParser_1, TADDocumentParser_1, MPTDocumentParser_1, SEDADocumentParser_1, ALRDocumentParser_1) {
    "use strict";
    /**
     * 资源文件对象
     */
    var ResourceDocumentTable = (function () {
        function ResourceDocumentTable() {
        }
        ;
        //--------------------------------------------------------getter------------------------------------------
        ResourceDocumentTable.prototype.getDocument = function (path, clazz, callback) {
            ResourceManager_1.ResourceManager.getResourceFile(path, function (file) {
                var parser;
                if (clazz === "ProcessDefinition") {
                    parser = new ProcessDefinitionParser_1.ProcessDefinitionParser();
                }
                else if (clazz === "LogicFlowControl") {
                    parser = new LFCDocumentParser_1.LFCDocumentParser();
                }
                else if (clazz === "TradeAssemblyDefine") {
                    parser = new TADDocumentParser_1.TADDocumentParser();
                }
                else if (clazz === "MainProcessTemplate") {
                    parser = new MPTDocumentParser_1.MPTDocumentParser();
                }
                else if (clazz === "SedaEntry") {
                    parser = new SEDADocumentParser_1.SEDADocumentParser();
                }
                else if (clazz === "AgreeLogicRule") {
                    parser = new ALRDocumentParser_1.ALRDocumentParser();
                }
                parser.parse(path, file, function (result) {
                    callback(result);
                });
            });
        };
        ;
        return ResourceDocumentTable;
    }());
    exports.ResourceDocumentTable = ResourceDocumentTable;
    ;
});
//# sourceMappingURL=ResourceDocumentTable.js.map