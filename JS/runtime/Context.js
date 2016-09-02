define(["require", "exports", "../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    var Context = (function () {
        /**
         * 构造函数
         */
        function Context(parent, name) {
            this.localValues = new HashMap_1.HashMap();
            this.childrenMap = new HashMap_1.HashMap();
            this.parent = parent;
            this.name = name;
        }
        Context.prototype.createChild = function (name) {
            var ctx = new Context(this, name);
            this.addChild(name, ctx);
            return ctx;
        };
        ;
        Context.prototype.addChild = function (name, context) {
            if (this.childrenMap.get(name) == null) {
                this.childrenMap.put(name, context);
            }
        };
        ;
        Context.prototype.remove = function (name) {
            this.localValues.remove(name);
        };
        ;
        Context.prototype.removeChild = function (context) {
            this.childrenMap.remove(context.getName());
        };
        ;
        /**
         * 通过名字找指定的context
         * 往孩子中查找，向下查找
         */
        Context.prototype.downSearch = function (name) {
            var ctx, keySet;
            keySet = this.childrenMap.keySet();
            if (this.getName() == name) {
                return this;
            }
            for (var i = 0; i < keySet.length; i++) {
                ctx = this.childrenMap.get(keySet[i]).downSearch(name);
                if (ctx != null) {
                    return ctx;
                }
            }
            return null;
        };
        ;
        /**
         * 通过名字找指定的context
         * 往父亲中查找，向上查找
         */
        Context.prototype.upSearch = function (name) {
            var ctx, par;
            if (this.getName() == name) {
                return this;
            }
            while (par = this.getParentContext() != null) {
                ctx = par.upSearch(name);
                if (ctx != null) {
                    return ctx;
                }
            }
            return null;
        };
        ;
        Context.prototype.dispose = function () {
            var current, changeCurrent, parentContext;
            // 0. 保存父亲
            current = Context.getCurrent();
            changeCurrent = (this == current || this.isAncestorOf(current));
            parentContext = this.getParentContext();
            // 1. 取消位于父节点的注册
            this.unregister();
            // 2. 执行标准操作
            this.localValues.removeAll();
            this.disposed = true;
            // $. 更新current
            if (changeCurrent) {
                Context.prototype.setCurrent(parentContext);
            }
        };
        ;
        Context.prototype.unregister = function () {
            var parentContext = this.getParentContext();
            if (parentContext != undefined) {
                parentContext.removeChild(this);
            }
        };
        ;
        //-------------------------------------------------getter--------------------------------------------------
        Context.getCurrent = function () {
            return Context.currentContext; //静态变量  //////是否正确？？？？
        };
        ;
        /**
         * 往当前context的localValues里找值，找不到则不断往上向父亲找
         */
        Context.prototype.get = function (name) {
            var result = this.localValues.get(name);
            if (result != null) {
                return result;
            }
            if (this.parent != null) {
                return this.parent.get(name);
            }
            return null;
        };
        ;
        Context.prototype.getName = function () {
            return this.name;
        };
        ;
        Context.prototype.getParentContext = function () {
            return this.parent;
        };
        ;
        Context.prototype.getChild = function (name) {
            return this.childrenMap.get(name);
        };
        ;
        Context.prototype.getChildren = function () {
        };
        ;
        /**
         * 往当前Context的localValues里找值
         */
        Context.prototype.getLocal = function (name) {
            return this.localValues.get(name);
        };
        ;
        //----------------------------------------------------setter--------------------------------------------------
        Context.prototype.set = function (name, value) {
            this.localValues.put(name, value);
        };
        ;
        Context.prototype.setCurrent = function (ctx) {
            Context.currentContext = ctx; // currentContext用静态变量就否合适？？
        };
        ;
        //----------------------------------------------------checker-------------------------------------------------
        Context.prototype.isDisposed = function () {
            if (this.disposed) {
                return true;
            }
            var parent = this.getParentContext();
            if (parent != undefined) {
                return parent.isDisposed();
            }
            return false;
        };
        ;
        Context.prototype.isAncestorOf = function (context) {
            var cParent = context.getParentContext();
            if (cParent == null) {
                return false;
            }
            if (cParent == this) {
                return true;
            }
            return this.isAncestorOf(cParent);
        };
        ;
        Context.baseContext = new Context(null, "base");
        return Context;
    }());
    exports.Context = Context;
});
//# sourceMappingURL=Context.js.map