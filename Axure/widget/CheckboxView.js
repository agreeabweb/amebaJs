function CheckboxView() {
    this.id;
    this.location;
    this.size;

};
CheckboxView.prototype = {
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
        if(actionName === "onSelect" || actionName === "onUnselect") {
            $("#" + this.id + "_input").on("click", function() {
                let checked = $(this).prop("checked");
                if(checked) {
                    console.log("onSelected");
                } else {
                    console.log("onUnselected");
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

        var layoutChild = function(obj) {
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
                childDom.css("top", location.y - this.location.y);
                childDom.css("left", location.x - this.location.x);
            }
        };
        var objects = objs.objects;
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                layoutChild(objects[i]);
            }
        }
    }
};