define(["require", "exports"], function (require, exports) {
    "use strict";
    var TreeView = (function () {
        function TreeView() {
        }
        TreeView.prototype.bindEvent = function (actionName, action) {
            var tree = this;
            if (actionName === "init") {
                $("#" + this.id + " .image").on("click", function () {
                    console.log("click");
                    console.log($(this).parent().attr("id"));
                    var parentId = $(this).parent().attr("id");
                    var childrenContainer = $("#" + parentId + "_children");
                    if (childrenContainer.css("visibility") === "visible") {
                        childrenContainer.css("visibility", "hidden");
                    }
                    else {
                        childrenContainer.css("visibility", "visible");
                    }
                    // if($(this).hasClass("selected")) {
                    // } else {
                    // }
                    tree.layout();
                });
            }
        };
        TreeView.prototype.setId = function (id) {
            this.id = id;
        };
        TreeView.prototype.setSize = function (size) {
            this.size = size;
        };
        TreeView.prototype.setLocation = function (location) {
            this.location = location;
        };
        TreeView.prototype.layout = function () {
            // 整体布局
            $("#" + this.id).css("position", "absolute")
                .css("width", this.size.width).css("height", this.size.height)
                .css("top", this.location.y).css("left", this.location.x);
            // 孩子节点的布局
            var children = $("#" + this.id + "_children").children();
            for (var i = 0; i < children.length; i++) {
                this.layoutChild(children[0]);
            }
            // var objects = this.objs.objects;
            // if(objects != undefined) {
            //     for(let i = 0; i < objects.length; i++) {
            //         var idMap = objects[i].id;
            //         var id = this.objPaths[idMap].scriptId;
            //         this.layoutChild(objects[i]);
            //         this.visibleLeavesNum ++;
            //     }
            // }
        };
        TreeView.prototype.layoutChild = function (obj) {
            //     var idMap = obj.id;
            //     var id = this.objPaths[idMap].scriptId;
            //     var childDom = $("#" + id);
            //     var size = obj.style.size;
            //     var location = obj.style.location;
            //     childDom.css("position", "absolute");
            //     if(size != undefined) {
            //         childDom.css("width", size.width).css("height", size.height);
            //     }
            //     if(location != undefined) {
            //         if(!childDom.hasClass("text") && childDom.attr("selectiongroup") == undefined) {
            //             childDom.css("top", location.y).css("left", location.x);
            //         }
            //     } else {
            //         childDom.css("top", 0).css("left", 0);
            //     }
            //     if(childDom.attr("selectiongroup") != undefined) {
            //         childDom.css("left", "20px");
            //     }
            //     if(childDom.hasClass("image")) {
            //         var src = childDom.children().attr("src");
            //         if(src.match(/selected.png$/)) {
            //             childDom.addClass("selected");
            //         } else {
            //             childDom.addClass("mouseOver");
            //         }
            //     }
            //     var children = $("#" + id + "_children");
            //     if(children.length != 0) {
            //         var visible = children.css("visibility");
            //         if(visible === "hidden") {
            //             children.css("display", "none");
            //         } else {
            //             children.css("display", "block");
            //         }
            //     }
            //     var objects = obj.objects;
            //     if(objects != undefined) {
            //         for(let i = 0; i < objects.length; i++) {
            //             this.layoutChild(objects[i]);
            //         }
            //     }
        };
        return TreeView;
    }());
    exports.TreeView = TreeView;
});
//# sourceMappingURL=TreeView.js.map