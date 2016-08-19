class ButtonView {
    private id: string;
    private location;
    private size;

    public bindEvent(actionName: string, action: string): void {
        if(actionName === "onClick") {
            $("#" + this.id + "_input").on("click", function() {
                console.log("onClick");
            });
        }
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setSize(size): void {
        this.size = size;
    }

    public setLocation(location): void {
        this.location = location;
    }

    public layout(): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute");
        dom.css("width", this.size.width);
        dom.css("height", this.size.height);
        dom.css("left", this.location.x);
        dom.css("top", this.location.y);

        $(dom.find("p")[0]).css("line-height", this.size.height + "px");
    }
}

export {ButtonView};