
class ArgElement {
    private caption: string;
    private content: string;
    private name: string;
    
    //----------------------------------------getter------------------------------------------
    public getName(): string {
        return this.name;
    }
    public getCaption(): string {
        return this.caption;
    }
    public getContent(): string {
        return this.content;
    }

    //-------------------------------------------setter---------------------------------------
    public setName(name: string): void {
        this.name = name;
    }
    public setCaption(caption): void {
        this.caption = caption;
    }
    public setContent(content: string): void {
        this.content = content;
    }
}

export {ArgElement};