define(["require", "exports", "../../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    var LogicRealmTask = (function () {
        /**
          * 构造函数
          */
        function LogicRealmTask(realm, name, logic) {
            this.endToNext = new HashMap_1.HashMap();
            this.storage = {}; ///////////是否有用？？？
            this.returnToParent = false;
            this.realm = realm;
            this.name = name;
            this.logic = logic;
        }
        /**
         * 创建一个流程分支
         * then - function 全部子任务结束后当前任务的然后逻辑
         */
        LogicRealmTask.prototype.startSub = function (then) {
            var subHead;
            subHead = new LogicRealmTask(this.realm, "subOf_" + this.name, function () { });
            // 保存父任务信息
            subHead.parent = this;
            subHead.parentThen = then;
            this.realm.setCurrentTask(subHead); // 设置为任务队列中的当前任务，下一次getNext的时候就可以取到挂接到新芽下的任务
            return subHead; // 返回新芽
        };
        ;
        /**
         * 向指定的任务挂接一个任务
         */
        LogicRealmTask.prototype.hook = function (nextLRT, endName) {
            if (endName != undefined) {
                this.endToNext.put(endName, nextLRT); // 不同结束类型对应不同的衍生任务
            }
            else {
                this.defaultNext = nextLRT;
            }
            return nextLRT;
        };
        ;
        /**
        * 提交逻辑位面调度，自动安排执行。
        */
        LogicRealmTask.prototype.schedule = function () {
            this.realm.exec(this);
            return this;
        };
        ;
        /**
         * 此方法为逻辑代码多封一层统一的前后逻辑。
         */
        LogicRealmTask.prototype.run = function () {
            if (!this.isEnded()) {
                this.execute();
            }
            var current = this.realm.getCurrentTask();
            if (current != undefined && !current.isEnded() && !current.isSuspended()) {
                current.end(null);
            }
        };
        ;
        /**
         * 执行逻辑。除了首次执行，若还有子任务存在，这个方法在每次的子任务返回后也会被调用，当然，可以执行不同的logic对象。
         */
        LogicRealmTask.prototype.execute = function () {
            if (this.logic != undefined) {
                this.logic(); // 调用LRT的logic
            }
        };
        ;
        /**
         * 完结当前任务
         */
        LogicRealmTask.prototype.end = function (endId) {
            console.log(this.getName() + "LRT end任务: " + endId);
            if (endId != null) {
                this.selectedEnd = endId; // 标记结束出口
            }
            if (this.checkAlreadyEnd()) {
                return;
            }
            var current = this.realm.getCurrentTask();
            this.endFlag = true;
            if (this.realm.isSuspended()) {
                // 激活下一个任务
                console.log("contine Exec");
                this.realm.continueExec();
            }
        };
        ;
        /**
         * 标记是否返回父任务
         */
        LogicRealmTask.prototype.markReturnToParent = function () {
            this.returnToParent = true;
            this.parent.logic = this.parentThen; // 将回调函数作为父任务的逻辑进行执行
            if (this.selectedEnd == undefined) {
                // 异常处理
                var t = this.getLocal("Throwable");
                if (t != undefined) {
                    this.parent.set("Throwable", t);
                }
            }
        };
        ;
        //----------------------------------------------setter--------------------------------------------------------
        /**
         * 设置某种类型的资源
         */
        LogicRealmTask.prototype.set = function (className, value) {
            if (value == undefined) {
                this.storage[className] = null;
            }
            else {
                this.storage[className] = value;
            }
        };
        ;
        LogicRealmTask.prototype.setSuspend = function (value) {
            this.suspendFlag = value;
        };
        //-----------------------------------------------getter-----------------------------------------------------
        /**
         * 获取storage里的值
         */
        LogicRealmTask.prototype.getLocal = function (clazz) {
            return this.storage[clazz];
        };
        /**
         * 获取下一个任务
         */
        LogicRealmTask.prototype.getNext = function () {
            // 1. 提前结束子任务
            if (this.returnToParent) {
                return this.parent;
            }
            // 2. 找到兄弟任务
            var siblingNext;
            if (this.selectedEnd == undefined || this.endToNext.get(this.selectedEnd) == undefined) {
                siblingNext = this.defaultNext;
            }
            else {
                siblingNext = this.endToNext.get(this.selectedEnd);
            }
            // $. 返回结果
            if (siblingNext != undefined) {
                // $.1 传递父任务回调对象
                siblingNext.parent = this.parent;
                siblingNext.parentThen = this.parentThen;
                return siblingNext;
            }
            else if (this.parent != null) {
                // $.2 回归任务
                this.markReturnToParent();
                return this.parent;
            }
            else {
                // $.3 没有后续任务
                return null;
            }
        };
        ;
        /**
         * 获取所选的出口
         */
        LogicRealmTask.prototype.getSelectedEnd = function () {
            return this.selectedEnd;
        };
        ;
        /**
         * 获取当前LRT所处的realm
         */
        LogicRealmTask.prototype.getRealm = function () {
            return this.realm;
        };
        ;
        /**
         * 获取当前realm中的当前任务
         */
        LogicRealmTask.prototype.getCurrent = function () {
            return this.realm.getCurrentTask();
        };
        ;
        /**
         * 获取指定类型的资源
         */
        LogicRealmTask.prototype.get = function (className) {
            return this.storage[className];
        };
        ;
        LogicRealmTask.prototype.getName = function () {
            return this.name;
        };
        ;
        LogicRealmTask.prototype.getParent = function () {
            return this.parent;
        };
        ;
        //------------------------------------------------checker--------------------------------------------------
        /**
         * 判断该任务是否已经结束
         */
        LogicRealmTask.prototype.checkAlreadyEnd = function () {
            var walker;
            if (this.isEnded()) {
                for (walker = this; walker != null; walker = walker.parent) {
                    if (walker.endFlag) {
                        return true;
                    }
                }
            }
            return false;
        };
        ;
        LogicRealmTask.prototype.isEnded = function () {
            return this.endFlag;
        };
        ;
        LogicRealmTask.prototype.isSuspended = function () {
            return this.suspendFlag;
        };
        ;
        return LogicRealmTask;
    }());
    exports.LogicRealmTask = LogicRealmTask;
});
//# sourceMappingURL=LogicRealmTask.js.map