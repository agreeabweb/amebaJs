
class AEvent {
    private static _listeners: Object = {};

    public static addEvent(target: string, type: string, fn: Function): boolean {
        if(typeof this._listeners[target] === "undefined") {
            this._listeners[target] = {};
        }

        if(typeof this._listeners[target][type] === "undefined") {
            this._listeners[target][type] = [];
        }
        if(typeof fn === "function") {
            this._listeners[target][type].push(fn);
            return true;
        } else {
            return false;
        }
    }

    public static fireEvent(target: string, type: string): boolean {
        if(typeof this._listeners[target] === "undefined") {
            return false;
        }
        if(typeof this._listeners[target][type] === "undefined") {
            return false;
        }

        let arrayEvent = this._listeners[target][type];
        if(arrayEvent instanceof Array) {
            for(let i = 0; i < arrayEvent.length; i++) {
                if(typeof arrayEvent[i] === "function") {
                    arrayEvent[i]({type: type});
                }
            }
        }
    }

    public static checkEventIsExsit(target: string, type: string): boolean {
        if(typeof this._listeners[target] === "undefined") {
            return false;
        } else if(typeof this._listeners[target][type] === "undefined") {
            return false;
        } else {
            return true;
        }
    }
}

export {AEvent};