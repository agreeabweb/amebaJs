var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-09 0009.
     */
    var TreeView = (function (_super) {
        __extends(TreeView, _super);
        function TreeView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        TreeView.prototype.bindEvent = function (eventType, flowType, path) {
            var view = this; //避免this指代错误
            // if(eventType === "click")
            // {
            //     view.getNode().on("click",function(){
            //         alert("click");
            //         view.getHost().queueTaskPack(view.getMission(flowType,path));
            //         console.log(view.getHost().getHost().getDataModel().get("UserId"));
            //     });
            // }
        };
        TreeView.prototype.addNode = function (level, parentId, id, title, href, icon) {
            var ul, li, a, i, span, mainMenu, parent, parentUL;
            // 创建新菜单节点
            li = $("<li>");
            li.attr("id", id);
            a = $("<a>");
            a.attr("href", href);
            a.text(title);
            li.append(a);
            // 图标信息
            if (icon != null) {
                i = $("<i>");
                i.attr("class", "fa " + icon);
                a.append(i);
            }
            // 添加一级菜单
            if (level === 1) {
                // 一开始没有任何节点的情况
                mainMenu = $("#" + this.id + " #main-menu");
                if (mainMenu.length === 0) {
                    ul = $("<ul>");
                    ul.attr("class", "nav");
                    ul.attr("id", "main-menu");
                    ul.append(li);
                    $("#" + this.id + " .sidebar-collapse").append(ul);
                }
                else {
                    mainMenu.append(li);
                }
            }
            else {
                parent = $("#" + this.id + " #" + parentId);
                parentUL = parent.find("ul");
                // 父节点下无其他节点
                if (parentUL.length === 0) {
                    // 创建下拉箭头
                    span = $("<span>");
                    span.attr("class", "fa arrow");
                    span.on("click", function () {
                        var ul = $(this).parent().next();
                        if (ul.hasClass("collapse")) {
                            ul.removeClass("collapse");
                        }
                        else {
                            ul.addClass("collapse");
                        }
                    });
                    $(parent.find("a")[0]).append(span);
                    ul = $("<ul>");
                    if (level === 2) {
                        ul.attr("class", "nav nav-second-level collapse");
                    }
                    else if (level === 3) {
                        ul.attr("class", "nav nav-third-level collapse");
                    }
                    else if (level === 4) {
                        ul.attr("class", "nav nav-fourth-level collapse");
                    }
                    else {
                        throw "树节点不支持该深度";
                    }
                    ul.append(li);
                    parent.append(ul);
                }
                else {
                    $(parentUL[0]).append(li);
                }
            }
        };
        TreeView.prototype.deleteNode = function (index) {
            var selector, lis;
            selector = "#" + this.id + " #main-menu";
            lis = $(selector).find("li");
            lis[index].remove();
        };
        return TreeView;
    }(AbstractView_1.AbstractView));
    exports.TreeView = TreeView;
});
//# sourceMappingURL=TreeView.js.map