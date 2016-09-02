var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView"], function (require, exports, AbstractAxureView_1) {
    "use strict";
    var TreeView = (function (_super) {
        __extends(TreeView, _super);
        function TreeView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
            this.init();
        }
        TreeView.prototype.bindEvent = function (actionName, action) {
            this.bindEventToTarget($("#" + this.eTargetId), actionName, action);
        };
        TreeView.prototype.init = function () {
            var tree = this;
            $("#" + this.id + " .image").on("click", function () {
                var parentId, childrenContainer, img;
                parentId = $(this).parent().attr("id");
                childrenContainer = $("#" + parentId + "_children");
                img = $(this).find("img");
                if (childrenContainer.css("visibility") === "visible") {
                    img.attr("src", (img.attr("src")).replace("_selected", ""));
                    childrenContainer.css("visibility", "hidden").css("display", "none");
                }
                else {
                    img.attr("src", (img.attr("src")).split(".")[0] + "_selected.png");
                    childrenContainer.css("visibility", "visible").css("display", "block");
                }
                //重新布局
                tree.layout(tree.obj);
            });
        };
        TreeView.prototype.layout = function (obj) {
            var dom, childrenContainer, children, childNum;
            this.obj = obj;
            // 整体布局
            dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("top", obj.style.location.y).css("left", obj.style.location.x);
            // 孩子节点的布局
            childrenContainer = $("#" + this.id + "_children");
            children = childrenContainer.children();
            childNum = 0;
            for (var i = 0; i < children.length; i++) {
                childNum += this.layoutChild(children[i], i + childNum);
            }
        };
        TreeView.prototype.layoutChild = function (obj, top) {
            var id, dom, idMap, size, location, fontSize, interactionMap, childrenContainer;
            id = $(obj).attr("id");
            dom = $("#" + id);
            idMap = this.getIdMap(id);
            size = this.getObjInfo(idMap, this.obj.objects, "size");
            location = this.getObjInfo(idMap, this.obj.objects, "location");
            fontSize = this.getObjInfo(idMap, this.obj.objects, "fontSize");
            interactionMap = this.getObjInfo(idMap, this.obj.objects, "interactionMap");
            if (interactionMap != undefined) {
                this.eTargetId = id;
                for (var actionName in interactionMap) {
                    this.bindEvent(actionName, interactionMap[actionName]);
                }
            }
            dom.css("position", "absolute");
            if (size != undefined) {
                dom.css("width", size.width).css("height", size.height);
            }
            if (location != undefined) {
                dom.css("top", top * 20).css("left", location.x);
            }
            else {
                dom.css("top", 0).css("left", 0);
            }
            if (fontSize != undefined) {
                dom.find(".text span").css("font-size", fontSize);
            }
            if (dom.find(".image").length != 0) {
                var image = void 0, selectiongroup = void 0;
                image = dom.find(".image");
                idMap = this.getIdMap(image.attr("id"));
                size = this.getObjInfo(idMap, this.obj.objects, "size");
                location = this.getObjInfo(idMap, this.obj.objects, "location");
                image.css("position", "absolute").css("cursor", "pointer");
                if (size != undefined) {
                    image.css("width", size.width).css("height", size.height);
                }
                if (location != undefined) {
                    image.css("top", 6).css("left", 0);
                }
                else {
                    image.css("top", 6).css("left", 0);
                }
                selectiongroup = $(image).next();
                idMap = this.getIdMap(selectiongroup.attr("id"));
                size = this.getObjInfo(idMap, this.obj.objects, "size");
                location = this.getObjInfo(idMap, this.obj.objects, "location");
                selectiongroup.css("position", "absolute");
                if (size != undefined) {
                    selectiongroup.css("width", size.width).css("height", size.height);
                }
                if (location != undefined) {
                    selectiongroup.css("top", 0).css("left", 20);
                }
                else {
                    selectiongroup.css("top", 0).css("left", 20);
                }
            }
            else {
                var selectiongroup = $(dom).children();
                idMap = this.getIdMap(selectiongroup.attr("id"));
                size = this.getObjInfo(idMap, this.obj.objects, "size");
                location = this.getObjInfo(idMap, this.obj.objects, "location");
                selectiongroup.css("position", "absolute");
                if (size != undefined) {
                    selectiongroup.css("width", size.width).css("height", size.height);
                }
                if (location != undefined) {
                    selectiongroup.css("top", 0).css("left", 20);
                }
                else {
                    selectiongroup.css("top", 0).css("left", 20);
                }
            }
            // 孩子节点的布局
            childrenContainer = $("#" + id + "_children");
            if (childrenContainer.length != 0) {
                if (childrenContainer.css("visibility") === "hidden") {
                    childrenContainer.css("display", "none");
                    return 0; // 当作没孩子节点
                }
                else {
                    var children = void 0, childNum = void 0;
                    childrenContainer.css("display", "block");
                    children = childrenContainer.children();
                    childNum = 0;
                    for (var i = 0; i < children.length; i++) {
                        childNum += this.layoutChild(children[i], i + 1 + childNum);
                    }
                    return children.length + childNum;
                }
            }
            else {
                return 0; //没有孩子节点
            }
        };
        TreeView.prototype.getObjInfo = function (idMap, objects, info) {
            if (idMap == undefined) {
                throw "找不到此id对应的idMap";
            }
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].id === idMap) {
                        if (info === "fontSize") {
                            return objects[i].style.fontSize;
                        }
                        else if (info === "location") {
                            return objects[i].style.location;
                        }
                        else if (info === "size") {
                            return objects[i].style.size;
                        }
                        else if (info === "interactionMap") {
                            return objects[i].interactionMap;
                        }
                    }
                    else {
                        var result = this.getObjInfo(idMap, objects[i].objects, info);
                        if (result != undefined) {
                            return result;
                        }
                    }
                }
            }
        };
        TreeView.prototype.getIdMap = function (id) {
            var objPaths = this.host.getAxureObjPaths();
            for (var idMap in objPaths) {
                if (objPaths[idMap].scriptId === id) {
                    return idMap;
                }
            }
            return undefined;
        };
        return TreeView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.TreeView = TreeView;
});
//# sourceMappingURL=TreeView.js.map