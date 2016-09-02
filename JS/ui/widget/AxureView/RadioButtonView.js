var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView"], function (require, exports, AbstractAxureView_1) {
    "use strict";
    var RadioButtonView = (function (_super) {
        __extends(RadioButtonView, _super);
        function RadioButtonView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
            this.hasChecked = false;
        }
        RadioButtonView.prototype.bindEvent = function (actionName, action) {
            this.bindEventToTarget($("#" + this.id + "_input"), actionName, action);
        };
        RadioButtonView.prototype.SetCheckState = function (check) {
            if (check) {
                this.$thisNode.find("input[type='checkbox']").prop("checked", true);
            }
            else {
                this.$thisNode.find("input[type='checkbox']").prop("checked", false);
            }
        };
        RadioButtonView.prototype.GetWidgetText = function () {
            return this.$thisNode.find(".text span").text();
        };
        RadioButtonView.prototype.layout = function (obj) {
            var dom, objects;
            dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            if (obj.style.fontSize != undefined) {
                dom.find(".text span").css("font-size", obj.style.fontSize);
            }
            objects = obj.objects;
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    var objPaths = void 0, idMap = void 0, id = void 0, childDom = void 0, size = void 0, location_1 = void 0;
                    objPaths = this.host.getAxureObjPaths();
                    idMap = objects[i].id;
                    id = objPaths[idMap].scriptId;
                    childDom = $("#" + id);
                    size = objects[i].style.size;
                    location_1 = objects[i].style.location;
                    childDom.css("position", "absolute");
                    if (size != undefined) {
                        childDom.css("width", size.width).css("height", size.height);
                    }
                    if (location_1 != undefined) {
                        childDom.css("top", location_1.y - obj.style.location.y).css("left", location_1.x - obj.style.location.x);
                    }
                }
            }
        };
        return RadioButtonView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.RadioButtonView = RadioButtonView;
});
//# sourceMappingURL=RadioButtonView.js.map