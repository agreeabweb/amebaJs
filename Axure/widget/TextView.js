function TextView() {

    this.id;
    this.location;
    this.size;
};
TextView.prototype = {
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
        if(actionName === "OnClick") {
            $("#" + this.id + "_input").on("click", function() {
                console.log("onClick");
            });
        } else if(actionName === "onFocus") {
            $("#" + this.id + "_input").on("focus", function() {
                console.log("onFocus");
            });
        } else if(actionName === "onTextChange") {
            $("#" + this.id + "_input").on("change", function() {
                console.log("onTextChange");
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

        var input = $("#" + this.id + "_input");
        input.css("width", "inherit");
        input.css("height", "inherit");
    }
};