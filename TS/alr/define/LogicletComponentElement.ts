import {ComponentElement} from "./ComponentElement";

class LogicletComponentElement extends ComponentElement {
    private name: string;

    //--------------------------------------getter-----------------------------
    public getName(): string {
        return this.name;
    }

    //--------------------------------------setter-------------------------------
    public setName(name: string): void {
        this.name = name;
    }
}

export {LogicletComponentElement};