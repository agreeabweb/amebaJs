import {AbstractView} from "../AbstractView";
import {TadPanel} from "../TadPanel";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class TreeView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    bindEvent(eventType:string,flowType:string,path:string):void{
        var view = this; //避免this指代错误
        // if(eventType === "click")
        // {
        //     view.getNode().on("click",function(){
        //         alert("click");
        //         view.getHost().queueTaskPack(view.getMission(flowType,path));

        //         console.log(view.getHost().getHost().getDataModel().get("UserId"));
        //     });
        // }

    }

    public addNode(level: number, parentId: string, id:string, title: string, href: string, icon: string): void {
        var node, ul, li, a, i, span, mainMenu, parent, parentUL;

        // 检查节点id是否已存在
        node = $("#" + this.id + " #" + id);
        if(node.length != 0) {
            throw "此id已被占用！";
        } else {
            // 创建新菜单节点
            li = $("<li>");
            li.attr("id", id);
            li.on("click", function() {
                if(li.hasClass("active")) {
                    li.removeClass("active");
                } else {
                    li.addClass("active");
                }
            });
            a = $("<a>");
            a.attr("href", href);
            a.text(title);
            li.append(a);
            
            // 图标信息
            if(icon != null) {
                i = $("<i>");
                i.attr("class", "fa " + icon);
                a.append(i);
            }

            // 添加一级菜单
            if(level === 1) {
                // 一开始没有任何节点的情况
                mainMenu = $("#" + this.id + " #main-menu");
                if(mainMenu.length === 0) {
                    ul = $("<ul>");
                    ul.attr("class", "nav");
                    ul.attr("id", "main-menu");
                    ul.append(li);
                    $("#" + this.id + " .sidebar-collapse").append(ul);
                } else {
                    mainMenu.append(li);
                }
            } else {
                parent = $("#" + this.id + " #" + parentId);
                parentUL = parent.find("ul");
                // 父节点下无其他节点
                if(parentUL.length === 0) {
                    // 创建下拉箭头
                    span = $("<span>");
                    span.attr("class", "fa arrow");
                    span.on("click", function() {
                        let ul = $(this).parent().next();
                        if(ul.hasClass("collapse")) {
                            ul.removeClass("collapse");
                        } else {
                            ul.addClass("collapse");
                        }
                    });
                    $(parent.find("a")[0]).append(span);

                    ul = $("<ul>");
                    if(level === 2) {
                        ul.attr("class", "nav nav-second-level collapse");
                    } else if(level === 3) {
                        ul.attr("class", "nav nav-third-level collapse");
                    } else if(level === 4) {
                        ul.attr("class", "nav nav-fourth-level collapse");
                    } else {
                        throw "树节点不支持该深度";
                    }

                    ul.append(li);
                    parent.append(ul);
                }
                // 父节点下已经有其他节点
                else {
                    $(parentUL[0]).append(li);
                }
            }
        }
    }

    public deleteNode(id: string): void {
        var selector, ul, lis;

        selector = "#" + this.id + " #main-menu #" + id;

        if($(selector).length != 0) {
            // 检查该节点的父节点是否还有其他孩子节点
            ul = $(selector).parent();
            $(selector).remove(); // 删除该节点
            // 无其他孩子节点
            lis = $(ul).find("li");
            if(lis.length === 0) {
                var test = $(ul).prev().find("span")[0];
                $(test).remove(); //删除下拉箭头
                $(ul).remove(); // 删除其父容器
            }
            // 还有其他孩子节点，则直接删除该节点 
            else {
                $(selector).remove();
            }
        } else {
            throw "不存在该节点";
        }

        
    }
}