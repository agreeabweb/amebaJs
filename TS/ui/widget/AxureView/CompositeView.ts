class CompositeView {
    private id: string;
    private location;
    private size;

    public bindEvent(actionName: string, action: string): void {
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
    }
}

export {CompositeView};