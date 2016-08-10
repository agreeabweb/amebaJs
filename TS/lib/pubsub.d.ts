/**
 * Created by Oliver on 2016-08-03 0003.
 */
interface PubSub {

    subscribe(topic:string, subscriber:any):PubSub;

    unsubscribe( subscriber:any ):PubSub;

    clearAllSubscriptions():PubSub;

    publish(topic:string,data:any):PubSub;

}
declare module "PubSub" {
    export = PubSub;
}
declare var PubSub: PubSub;