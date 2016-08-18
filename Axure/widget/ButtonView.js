function ButtonView() {
    this.id;
    this.location;
    this.size;
};
ButtonView.prototype = {
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
        if(actionName === "onClick") {
            $("#" + this.id + "_input").on("click", function() {
                console.log("onClick");
            });
        }
    },
    layout: function() {
        var dom = $("#" + this.id);
        dom.css("position", "absolute");
        dom.css("width", this.size.width);
        dom.css("height", this.size.height);
        dom.css("left", this.location.x);
        dom.css("top", this.location.y);

        $(dom.find("p")[0]).css("line-height", this.size.height + "px");
    }
};