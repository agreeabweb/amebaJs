function TreeView() {
    this.id;
    this.location;
    this.size;
};
TreeView.prototype = {
    setId: function(id) {
        this.id = id;
    },
    setLocation: function(location) {
        this.location = location;
    },
    setSize: function(size) {
        this.size = size;
    },
    bindEvent: function(actionName, action) {
        if(actionName === "init") {
            $("#" + this.id + " .image").on("click", function() {
                console.log("click");
                if($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                    $(this).addClass("mouseOver");
                    var src = $(this).children().attr("src").split("_")[0] + ".png";
                    $(this).children().attr("src", src);
                    $($(this).nextAll()[1]).css("display", "none");
                } else {
                    $(this).removeClass("mouseOver");
                    $(this).addClass("selected");
                    var src = $(this).children().attr("src").split(".")[0] + "_selected.png";
                    $(this).children().attr("src", src);
                    $($(this).nextAll()[1]).css("display", "block");
                }
            });
        }
    },
    layout: function(objs, objPaths) {
        var dom = $("#" + this.id);
        dom.css("position", "absolute");
        dom.css("width", this.size.width);
        dom.css("height", this.size.height);
        dom.css("left", this.location.x);
        dom.css("top", this.location.y);

        var objects = objs.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                this.layoutChild(objects[i], objPaths, this.location.x, this.location.y);
            }
        }

        this.bindEvent("init");
    },
    layoutChild: function(obj, objPaths, preLocation) {

        var idMap = obj.id;
        var id = objPaths[idMap].scriptId;
        var childDom = $("#" + id);
        var size = obj.style.size;
        var location = obj.style.location;
        childDom.css("position", "absolute");
        if(size != undefined) {
            childDom.css("width", size.width);
            childDom.css("height", size.height);
        }
        if(location != undefined) {
            if(!childDom.hasClass("text") && childDom.attr("selectiongroup") == undefined) {
                childDom.css("top", location.y);
                childDom.css("left", location.x);
            }
        } else {
            childDom.css("top", 0);
            childDom.css("left", 0);
        }
        if(childDom.attr("selectiongroup") != undefined) {
            childDom.css("left", "20px");
        }
        if(childDom.hasClass("image")) {
            var src = childDom.children().attr("src");
            if(src.match(/selected.png$/)) {
                childDom.addClass("selected");
            } else {
                childDom.addClass("mouseOver");
            }
        }

        var objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                this.layoutChild(objects[i], objPaths, location);
            }
        }
    }
};