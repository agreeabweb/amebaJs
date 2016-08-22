var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var TableView = (function (_super) {
        __extends(TableView, _super);
        function TableView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        TableView.prototype.bindEvent = function (actionName, action) {
        };
        TableView.prototype.setSize = function (size) {
            this.size = size;
        };
        TableView.prototype.setLocation = function (location) {
            this.location = location;
        };
        TableView.prototype.layout = function (objs, objPaths) {
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
        TableView.prototype.layoutChild = function (obj, objPaths) {
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
            if (obj.type === "richTextPanel") {
                childDom.css("top", 0);
                childDom.css("left", 0);
                $(childDom.find("p")[0]).css("line-height", size.height + "px");
            }
            else if (location != undefined) {
                childDom.css("top", location.y);
                childDom.css("left", location.x);
            }
            var objects = obj.objects;
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    this.layoutChild(objects[i], objPaths);
                }
            }
        };
        return TableView;
    }(AbstractView_1.AbstractView));
    exports.TableView = TableView;
});
//# sourceMappingURL=TableView.js.map