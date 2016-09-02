import {HashMap} from "../../lib/HashMap";
import {IExpressionEngine} from "./IExpressionEngine";
import {ProcessInstanceThreadSegment} from "../process/ProcessInstanceThreadSegment";
import {Context} from "../../runtime/Context";

class DefaultExpressionEngine implements IExpressionEngine {
    private expression: HashMap = new HashMap();

    public constructor() {};

    /**
     * 赋值
     */
    public assign(expression: string, value: any, pits: ProcessInstanceThreadSegment): void {   /////varMap()和tadVarMap()存储的地方是否正确
        if(expression != undefined) {
            if(expression.match(/^varMap()./)) {
                pits.addVarMap(expression, value);
            } else if(expression.match(/^tadVarMap()./)) {
                this.expression.put(expression, value);
            }
        }
    };
    /**
     * 取值
     */
    public evaluate(expression: string, pits: ProcessInstanceThreadSegment): any {
        if(expression != undefined) {
            let value
            if(expression.match(/^varMap()./)) {
                value = pits.getVarMap(expression);
                console.log(pits.getCoreTask().getName() + " 中表达式：" + expression + " 的值为: " + value);
                if(value == null) {
                    return "";
                } else {
                    return value;
                }
            } else if(expression.match(/^tadVarMap()./)) {
                value = this.expression.get(expression);
                console.log(pits.getCoreTask().getName() + " 中表达式：" + expression + " 的值为: " + value);
                if(value == null) {
                    return "";
                } else {
                    return value;
                }
            } else if(expression.match(/^dm()./)) {
                let dm = expression.split(".")[1];
                let dataModel = Context.getCurrent().get("DataModel");
                value = dataModel.get(dm);
                if(value == undefined) {
                    return "";
                } else {
                    return value;
                }
            } else {
                return expression;
            }
        } else {
            return "";
        }
    };

    public addTadVarMap(expression: string): void {
        if(expression != undefined) {
            this.expression.put(expression, null);
        }
    };
};

export {DefaultExpressionEngine};