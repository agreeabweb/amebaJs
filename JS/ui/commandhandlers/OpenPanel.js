define(["require", "exports", "../TadPanel", "../../lib/GUID"], function (require, exports, TadPanel_1, GUID_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    var OpenPanel = (function () {
        function OpenPanel() {
        }
        OpenPanel.prototype.handleCommand = function (command, callack) {
            var path, tad, tadPanel, pits, target;
            if (command.getPath() != null) {
                path = command.getPath();
            }
            else if (command.getExtraData().get("path") != undefined) {
                path = command.getExtraData().get("path");
            }
            else {
                throw "没有画面路径信息";
            }
            target = command.getExtraData().get("target");
            tad = command.getContext().get("Tad");
            pits = command.getExtraData().get("ProcessInstanceThreadSegment");
            tadPanel = new TadPanel_1.TadPanel(pits, tad, tad.getId(), "Panel_" + GUID_1.default(), path);
            tadPanel.start();
        };
        return OpenPanel;
    }());
    exports.OpenPanel = OpenPanel;
});
//# sourceMappingURL=OpenPanel.js.map