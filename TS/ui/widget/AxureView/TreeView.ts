import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class TreeView extends AbstractView {

    private obj;
    private visibleLeavesNum;

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: string): void {
        var tree = this;
        if(actionName === "init") {
            $("#" + this.id + " .image").on("click", function() {
                var parentId = $(this).parent().attr("id");
                var childrenContainer = $("#" + parentId + "_children");
                var img = $(this).find("img");
                if(childrenContainer.css("visibility") === "visible") {
                    img.attr("src", (img.attr("src")).replace("_selected", ""));
                    childrenContainer.css("visibility", "hidden").css("display", "none");
                } else {
                    img.attr("src", (img.attr("src")).split(".")[0] + "_selected.png");
                    childrenContainer.css("visibility", "visible").css("display", "block");
                }

                //重新布局
                tree.layout(tree.obj);         
            });
        }
    }

    public layout(obj): void {
        this.obj = obj;

        // 整体布局
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("top", obj.style.location.y).css("left", obj.style.location.x);

        // 孩子节点的布局
        var childrenContainer = $("#" + this.id + "_children");
        var children = childrenContainer.children();
        var childNum = 0;
        for(var i = 0; i < children.length; i++) {
            childNum += this.layoutChild(children[i], i + childNum);
        }
    }

    public layoutChild(obj, top) {
        var id = $(obj).attr("id");
        var dom = $("#" + id);
        var idMap = this.getIdMap(id);
        var size: any = this.getObjSize(idMap, this.obj.objects);
        var location = this.getObjLocation(idMap, this.obj.objects);
        var fontSize = this.getFontSize(idMap, this.obj.objects);

        dom.css("position", "absolute");
        if(size != undefined) {
            dom.css("width", size.width).css("height", size.height);
        }
        if(location != undefined) {
            dom.css("top", top * 20).css("left", location.x);
        } else {
            dom.css("top", 0).css("left", 0);
        }
        if(fontSize != undefined) {
            dom.find(".text span").css("font-size", fontSize);
        }

        if(dom.find(".image").length != 0) {
            var image = dom.find(".image");
            idMap = this.getIdMap(image.attr("id"));
            size = this.getObjSize(idMap, this.obj.objects);
            location = this.getObjLocation(idMap, this.obj.objects);

            image.css("position", "absolute");
            if(size != undefined) {
                image.css("width", size.width).css("height", size.height);
            }
            if(location != undefined) {
                image.css("top", 6).css("left", 0);
            } else {
                image.css("top", 6).css("left", 0);
            }

            var selectiongroup = $(image).next();
            idMap = this.getIdMap(selectiongroup.attr("id"));
            size = this.getObjSize(idMap, this.obj.objects);
            location = this.getObjLocation(idMap, this.obj.objects);

            selectiongroup.css("position", "absolute");
            if(size != undefined) {
                selectiongroup.css("width", size.width).css("height", size.height);
            }
            if(location != undefined) {
                selectiongroup.css("top", 0).css("left", 20);
            } else {
                selectiongroup.css("top", 0).css("left", 20);
            }
        } else {
            var selectiongroup = $(dom).children();
            idMap = this.getIdMap(selectiongroup.attr("id"));
            size = this.getObjSize(idMap, this.obj.objects);
            location = this.getObjLocation(idMap, this.obj.objects);

            selectiongroup.css("position", "absolute");
            if(size != undefined) {
                selectiongroup.css("width", size.width).css("height", size.height);
            }
            if(location != undefined) {
                selectiongroup.css("top", 0).css("left", 20);
            } else {
                selectiongroup.css("top", 0).css("left", 20);
            }
        }

        // 孩子节点的布局
        var childrenContainer = $("#" + id + "_children");
        if(childrenContainer.length != 0) {
           if(childrenContainer.css("visibility") === "hidden") {
                childrenContainer.css("display", "none");
                return 0; // 当作没孩子节点
            } else {
                childrenContainer.css("display", "block");
                var children = childrenContainer.children();
                var childNum = 0;
                for(var i = 0; i < children.length; i++) {
                    childNum += this.layoutChild(children[i], i + 1 + childNum);
                }
                return children.length + childNum;
            }
        } else {
            return 0; //没有孩子节点
        }
    }

    public getObjLocation(idMap, objects) {
        if(idMap == undefined) {
            throw "找不到此id对应的idMap";
        } 
        
        if(objects != undefined) {
            for(var i = 0; i < objects.length; i++) {
                if(objects[i].id === idMap) {
                    return objects[i].style.location;
                } else {
                    var result = this.getObjLocation(idMap, objects[i].objects);
                    if(result != undefined) {
                        return result;
                    }
                }
            }
        } 
    }

    public getObjSize(idMap, objects) {
        
        if(idMap == undefined) {
            throw "找不到此id对应的idMap";
        }
        if(objects != undefined) {
            for(var i = 0; i < objects.length; i++) {
                if(objects[i].id === idMap) {
                    return objects[i].style.size;
                } else {
                    var result = this.getObjSize(idMap, objects[i].objects);
                    if(result != undefined) {
                        return result;
                    }
                }
            }
        } 
    }

    public getFontSize(idMap, objects) {
        if(idMap == undefined) {
            throw "找不到此id对应的idMap";
        }
        if(objects != undefined) {
            for(var i = 0; i < objects.length; i++) {
                if(objects[i].id === idMap) {
                    return objects[i].style.fontSize;
                } else {
                    var result = this.getFontSize(idMap, objects[i].objects);
                    if(result != undefined) {
                        return result;
                    }
                }
            }
        } 
    }

    public getIdMap(id) {
        var objPaths = this.host.getAxureObjPaths();
        for(var idMap in objPaths) {
            if(objPaths[idMap].scriptId === id) {
                return idMap;
            }
        }
        return undefined;
    }
}

export {TreeView};