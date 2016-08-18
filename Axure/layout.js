function layout(widget) {

    var dom = $("#" + widget.id);
    dom.css("position", "absolute");
    dom.css("width", widget.size.width);
    dom.css("height", widget.size.height);
    dom.css("left", widget.location.x);
    dom.css("top", widget.location.y);
}