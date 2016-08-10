/**
 * Created by Oliver on 2016-08-10 0010.
 */
interface amplify {

    subscribe( topic:string, callback:any):amplify;

    subscribe( topic:string, context:any, callback:any, priority:any):amplify;

    unsubscribe( topic:string, context:any, callback:any ):amplify;

    publish(topic:string,data:any):amplify;
}
declare module "amplify" {
    export = amplify;
}
declare var amplify: amplify;