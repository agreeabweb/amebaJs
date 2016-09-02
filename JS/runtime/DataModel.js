define(["require", "exports", "../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    var DataModel = (function () {
        function DataModel() {
            this.memberMap = new HashMap_1.HashMap();
            this.subscriptions = new Array();
        }
        DataModel.prototype.notifyThis = function (callback, context) {
            var subscribe, v;
            subscribe = {
                "callback": callback,
                "context": context
            };
            v = this.subscriptions.push(subscribe);
            console.log("DataModel注册后长度: " + v);
        };
        DataModel.prototype.notifyChange = function (key, old, now) {
            console.log("开始通知变化..." + this.subscriptions.length);
            for (var i = 0; i < this.subscriptions.length; i++) {
                var v = void 0, data = void 0;
                v = this.subscriptions[i];
                data = {
                    "key": key,
                    "old": old,
                    "new": now
                };
                console.log("监听器：" + v.callback);
                v.callback.apply(v.context, [key, old, now]);
            }
        };
        DataModel.prototype.doSetMemeber = function (memberName, memberContent) {
            var dotIndex;
            dotIndex = memberName.indexOf('.');
            if (dotIndex > 0) {
                var prefix = void 0, suffix = void 0, subModel = void 0;
                prefix = memberName.substring(0, memberName.lastIndexOf("."));
                suffix = memberName.substring(memberName.lastIndexOf(".") + 1);
                subModel = this.getLastDataModel(prefix);
                subModel.setLocalValue(suffix, memberContent);
            }
            else {
                this.setLocalValue(memberName, memberContent);
            }
        };
        DataModel.prototype.doSetWithNotify = function (memberName, memberContent, notify) {
            var old = this.getMember(memberName);
            if (old === memberContent) {
                return;
            }
            this.doSetMemeber(memberName, memberContent);
            if (notify) {
                setTimeout(this.notifyChange(memberName, old, memberContent), 0);
            }
        };
        DataModel.prototype.doGet = function (memberName) {
            return this.doGetMember(memberName);
        };
        DataModel.prototype.doGetMember = function (memberName) {
            var dotIndex = memberName.indexOf('.');
            if (dotIndex > 0) {
                var prefix = void 0, suffix = void 0, subModel = void 0;
                prefix = memberName.substring(0, dotIndex);
                suffix = memberName.substring(dotIndex + 1);
                subModel = this.get(prefix);
                if (subModel == null) {
                    // if (!create) {
                    //     return null;
                    // }
                    subModel = this.createSubModelMember(prefix);
                }
                return subModel.getMember(suffix);
            }
            return this.getLocalValue(memberName);
        };
        DataModel.prototype.createSubModelMember = function (memberName) {
            var subModel = new DataModel();
            this.setLocalValue(memberName, subModel);
            return subModel;
        };
        DataModel.prototype.createSimpleMember = function (memberName) {
            // let result = new Object();
            this.memberMap.put(memberName, null);
        };
        //-----------------------------------------------------------setter---------------------------------------------
        DataModel.prototype.set = function (memberName, memberContent) {
            this.doSetWithNotify(memberName, memberContent, true);
        };
        DataModel.prototype.setLocalValue = function (memberName, memberContent) {
            this.memberMap.put(memberName, memberContent);
        };
        //----------------------------------------------------------getter-----------------------------------------------
        DataModel.prototype.get = function (memberName) {
            return this.doGet(memberName);
        };
        DataModel.prototype.getLocalValue = function (memberName) {
            return this.memberMap.get(memberName);
        };
        DataModel.prototype.getLastDataModel = function (memberName) {
            var dotIndex = memberName.indexOf('.');
            if (dotIndex > 0) {
                var prefix = void 0, suffix = void 0, subModel = void 0;
                prefix = memberName.substring(0, dotIndex);
                suffix = memberName.substring(dotIndex + 1);
                subModel = this.get(prefix);
                if (subModel == null) {
                    // if (!create)
                    // {
                    //     return null;
                    // }
                    subModel = this.createSubModelMember(prefix);
                }
                return subModel.getLastDataModel(suffix);
            }
            else {
                var subModel = this.get(memberName);
                if (subModel == null) {
                    subModel = this.createSubModelMember(memberName);
                }
                return subModel;
            }
        };
        DataModel.prototype.getMember = function (memberName) {
            return this.doGetMember(memberName);
        };
        return DataModel;
    }());
    exports.DataModel = DataModel;
});
//# sourceMappingURL=DataModel.js.map