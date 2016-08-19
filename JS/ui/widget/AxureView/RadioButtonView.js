define(["require", "exports"], function (require, exports) {
    "use strict";
    var RadioButtonView = (function () {
        function RadioButtonView() {
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
        RadioButtonView.prototype.setId = function (id) {
            this.id = id;
        };
        RadioButtonView.prototype.setSize = function (size) {
            this.size = size;
        };
        RadioButtonView.prototype.setLocation = function (location) {
            this.location = location;
        };
        RadioButtonView.prototype.layout = function (objs, objPaths) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
            var objects = objs.objects;
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    this.layoutChild(objects[i], objPaths);
                }
            }
        };
        RadioButtonView.prototype.layoutChild = function (obj, objPaths) {
            var idMap = obj.id;
            var id = objPaths[idMap].scriptId;
            var childDom = $("#" + id);
            var size = obj.style.size;
            var location = obj.style.location;
            childDom.css("position", "absolute");
            if (size != undefined) {
                childDom.css("width", size.width);
                childDom.css("height", size.height);
            }
            if (location != undefined) {
                childDom.css("top", location.y - this.location.y);
                childDom.css("left", location.x - this.location.x);
            }
        };
        return RadioButtonView;
    }());
    exports.RadioButtonView = RadioButtonView;
});
//# sourceMappingURL=RadioButtonView.js.map