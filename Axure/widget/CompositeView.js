function CompositeView() {
    this.id;
    this.location;
    this.size;
};
CompositeView.prototype = {
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
    layout: function() {
        var dom = $("#" + this.id);
        dom.css("position", "absolute");
        dom.css("width", this.size.width);
        dom.css("height", this.size.height);
        dom.css("left", this.location.x);
        dom.css("top", this.location.y);

    }
};