/**
 * Created by Oliver on 2016-08-09 0009.
 */
export interface IView {

    /**
     * dm的变化更新到视图
     * @param val
     */
     modelChanged(val:any):void;


    /**
     * 视图的变化更新到dm
     * @param val
     */
     updateModel(key:string,val:any):void;



    /**
     * 将本控件与dm绑定
     * @param name
     */
    bindModel(name:string):void;

    /**
     * 将UI事件与流程绑定
     * @param type
     * @param name
     * @param path
     */
    bindEvent(eventType:string, flowType:string, path:string):void;
}