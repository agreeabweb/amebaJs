class TextView {
    private id: string;
    private location;
    private size;

    public bindEvent(actionName: string, action: string): void {
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

        var input = $("#" + this.id + "_input");
        input.css("width", "inherit");
        input.css("height", "inherit");
    }
}

export {TextView};