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
        var ul, li, a, i, span, mainMenu, parent, parentUL;

        // 创建新菜单节点
        li = $("<li>");
        li.attr("id", id);
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

    public deleteNode(index: string): void {
        var selector, lis;

        selector = "#" + this.id + " #main-menu";
        lis = $(selector).find("li");
        lis[index].remove();
    }
}