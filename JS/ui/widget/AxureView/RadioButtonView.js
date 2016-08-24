var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var RadioButtonView = (function (_super) {
        __extends(RadioButtonView, _super);
        function RadioButtonView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        RadioButtonView.prototype.bindEvent = function (actionName, action) {
            if (actionName === "onSelect" || actionName === "onUnselect") {
                $("#" + this.id + "_input").on("click", function () {
                    var checked = $(this).prop("checked");
                    if (checked) {
                        console.log("onSelected");
                    }
                    else {
                        console.log("onUnselected");
                    }
                });
            }
        };
        RadioButtonView.prototype.SetCheckState = function (check) {
            if (check) {
                this.$thisNode.find("input[type='radio']").attr("checked", "true");
            }
            else {
                this.$thisNode.find("input[type='radio']").removeAttr("checked");
            }
        };
        RadioButtonView.prototype.layout = function (obj) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            if (obj.style.fontSize != undefined) {
                dom.find(".text span").css("font-size", obj.style.fontSize);
            }
            var objects = obj.objects;
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    var objPaths = this.host.getAxureObjPaths();
                    var idMap = objects[i].id;
                    var id = objPaths[idMap].scriptId;
                    var childDom = $("#" + id);
                    var size = objects[i].style.size;
                    var location = objects[i].style.location;
                    childDom.css("position", "absolute");
                    if (size != undefined) {
                        childDom.css("width", size.width).css("height", size.height);
                    }
                    if (location != undefined) {
                        childDom.css("top", location.y - obj.style.location.y).css("left", location.x - obj.style.location.x);
                    }
                }
            }
        };
        return RadioButtonView;
    }(AbstractView_1.AbstractView));
    exports.RadioButtonView = RadioButtonView;
});
//# sourceMappingURL=RadioButtonView.js.map