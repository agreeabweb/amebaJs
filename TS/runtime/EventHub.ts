/**
 * Created by Oliver on 2016-08-04 0004.
 */
/// <reference path="../lib/amplify.d.ts" />
export class EventHub {

    /*
    * engine.command.*：订阅流程中的Command
    * model.change.*: 订阅dm变化
    * */
    public static subscribe(topic:string, context:any, callback:any): void{
        // if(context == null)
        // {
        //     amplify.subscribe(topic,callback);
        // }else{
            amplify.subscribe(topic,context,callback);
        // }

    }

    public static unsubscribe( topic:string, context:any, callback:any ): void{
        amplify.unsubscribe(topic,context,callback);
    }

    // public static clearAllSubscriptions():void{
    //     PubSub.clearAllSubscriptions();
    // }

    public static publish(topic:string,data:any): void{
        amplify.publish(topic,data);
    }
}