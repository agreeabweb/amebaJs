function LabelView() {

    this.id;
    this.location;
    this.size;
};
LabelView.prototype = {
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
        dom.css("font-weight", 700);
        dom.css("font-family", "Arial Bold', 'Arial");
    }
};