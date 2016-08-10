define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-04 0004.
     */
    /// <reference path="../lib/amplify.d.ts" />
    var EventHub = (function () {
        function EventHub() {
        }
        /*
        * engine.command.*：订阅流程中的Command
        * model.change.*: 订阅dm变化
        * */
        EventHub.subscribe = function (topic, context, callback, priority) {
            if (context == null) {
                amplify.subscribe(topic, callback);
            }
            else {
                amplify.subscribe(topic, context, callback);
            }
        };
        EventHub.unsubscribe = function (topic, context, callback) {
            amplify.unsubscribe(topic, context, callback);
        };
        // public static clearAllSubscriptions():void{
        //     PubSub.clearAllSubscriptions();
        // }
        EventHub.publish = function (topic, data) {
            amplify.publish(topic, data);
        };
        return EventHub;
    }());
    exports.EventHub = EventHub;
});
//# sourceMappingURL=EventHub.js.map