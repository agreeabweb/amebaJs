import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class TreeView extends AbstractView {
    private location;
    private size;

    private obj;
    private objPaths;
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
                tree.layout(tree.obj, tree.objPaths);         
            });
        }
    }

    public setSize(size): void {
        this.size = size;
    }

    public setLocation(location): void {
        this.location = location;
    }

    public layout(obj, objPaths): void {
        this.obj = obj;
        this.objPaths = objPaths;

        // 整体布局
        $("#" + this.id).css("position", "absolute")
            .css("width", this.size.width).css("height", this.size.height)
            .css("top", this.location.y).css("left", this.location.x);

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

        dom.css("position", "absolute");
        if(size != undefined) {
            dom.css("width", size.width).css("height", size.height);
        }
        if(location != undefined) {
            dom.css("top", top * 20).css("left", location.x);
        } else {
            dom.css("top", 0).css("left", 0);
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

        
        
        // for(var i = 0; i < objects.length; i++) {
        //     if(objects[i].id === idMap) {
        //         return objects[i].style.size;
        //     }
        // }
        
        // if(objects[i].objects != undefined) {
        //     this.getObjSize(idMap, objects[i].objects);
        // }
        // return undefined;
    }

    public getIdMap(id) {
        for(var idMap in this.objPaths) {
            if(this.objPaths[idMap].scriptId === id) {
                return idMap;
            }
        }
        return undefined;
    }
    // public layoutChild(obj) {
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
    // }
}

export {TreeView};