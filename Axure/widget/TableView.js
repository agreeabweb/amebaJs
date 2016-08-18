function TableView() {

    this.id;
    this.location;
    this.size;
};
TableView.prototype = {
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
                this.layoutChild(objects[i], objPaths, this.location);
            }
        }
    },
    layoutChild: function(obj, objPaths) {

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
        if(obj.type === "richTextPanel") {
            childDom.css("top", 0);
            childDom.css("left", 0);
            $(childDom.find("p")[0]).css("line-height", size.height + "px");
        } else if(location != undefined) {
            childDom.css("top", location.y);
            childDom.css("left", location.x);
        }

        var objects = obj.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                this.layoutChild(objects[i], objPaths);
            }
        }
    }
};