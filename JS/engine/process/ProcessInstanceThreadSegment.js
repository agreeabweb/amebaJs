define(["require", "exports", "../../lib/HashMap", "../../runtime/realm/LogicRealmTask", "./ProcessResult"], function (require, exports, HashMap_1, LogicRealmTask_1, ProcessResult_1) {
    "use strict";
    /**
     * PITC流程实例线程片段。一个流程实例线程可以嵌套依次执行多个文件，每个文件的执行为一个线段(segment)。
     */
    var ProcessInstanceThreadSegment = (function () {
        function ProcessInstanceThreadSegment(id, pit, definitionPath, definition) {
            this.varMap = new HashMap_1.HashMap();
            this.exceptionStack = [];
            this.id = id;
            this.pit = pit;
            this.definitionPath = definitionPath;
            this.definition = definition;
            var PITS = this;
            this.coreTask = new LogicRealmTask_1.LogicRealmTask(PITS.getProcessInstanceThread().getLogicRealm(), PITS.getSimplePathName(definitionPath), function () {
                PITS.stepCoreStart();
            });
            this.coreTask.set("ProcessInstanceThreadSegment", this);
        }
        /**
         * PITS启动函数
         * callback 流程完毕或异常的回调逻辑函数对象
         */
        ProcessInstanceThreadSegment.prototype.start = function (inArgMap, callback) {
            console.log("启动PITS： " + this.id);
            var PITS, controlTask;
            PITS = this; // 避免this指代混乱
            // 处理入参
            if (inArgMap != undefined) {
                this.inArgMap = inArgMap;
            }
            // 构造控制任务
            controlTask = new LogicRealmTask_1.LogicRealmTask(PITS.coreTask.getRealm(), "Control(" + PITS.coreTask.getName() + ")", /* LRT的具体逻辑实现 */ function () {
                var subHead = controlTask.startSub(function () {
                    PITS.stepControlFinal(callback); // 该分支执行完之后的逻辑控制
                });
                subHead.hook(PITS.coreTask); //将coreTask核心任务挂接到controlTask任务下
            });
            // 返回
            return controlTask.schedule();
        };
        ;
        /**
         * 全部lfc节点执行完之后再执行
         * 用于控制整个lfc执行完之后的走向
         */
        ProcessInstanceThreadSegment.prototype.stepControlFinal = function (callback) {
            var current, endValueMap, endName;
            this.currentNodeId = undefined;
            current = this.pit.getLogicRealm().getCurrentTask();
            // 做成功标记
            endValueMap = this.definition.getEndValueMap();
            if (endValueMap != undefined) {
                endName = endValueMap.get(this.currentNodeEndId);
            }
            else {
                endName = "success";
            }
            current.end(endName);
            if (this.exceptionStack.length != 0) {
            }
            else {
                var processResult = new ProcessResult_1.ProcessResult();
                processResult.setEnd(this.coreTask.getParent().getSelectedEnd());
                processResult.setOutArgMap(this.outArgMap);
                callback(processResult);
            }
        };
        ;
        /**
         * 开始执行流程
         */
        ProcessInstanceThreadSegment.prototype.stepCoreStart = function () {
            var PITS, currentTask, sub;
            PITS = this; // 避免this指代混乱
            // 1. 本地执行
            // 1.0 子任务流开始
            currentTask = PITS.coreTask.getCurrent();
            sub = currentTask.startSub(function () {
                PITS.createCoreLogic(); // 子任务结束后的逻辑执行
            });
            // 1.1 初始化任务
            sub = sub.hook(PITS.createInitTask());
            // 1.2 开始节点任务
            sub.hook(PITS.createNodeTask(PITS.getStartNodeId()));
        };
        ;
        /**
         * 流程节点完结后的逻辑执行
         */
        ProcessInstanceThreadSegment.prototype.createCoreLogic = function () {
            this.stepCoreLogic();
        };
        ;
        /**
         * 处理节点完结后的逻辑去向
         */
        ProcessInstanceThreadSegment.prototype.stepCoreLogic = function () {
            var PITS;
            PITS = this; // 避免this指代混乱
            if (PITS.currentNodeEndId > 1000) {
                console.log("流程结束");
                console.log("----------------------------");
            }
            else {
                var currentTask = void 0, subHead = void 0;
                // 创建下一个节点任务
                currentTask = PITS.pit.getLogicRealm().getCurrentTask();
                subHead = currentTask.startSub(function () {
                    PITS.createCoreLogic();
                });
                subHead.hook(PITS.createNodeTask(PITS.currentNodeEndId));
            }
        };
        ;
        /**
         * 创建初始化任务
         */
        ProcessInstanceThreadSegment.prototype.createInitTask = function () {
            var PITS = this; // 避免this指代混乱
            return new LogicRealmTask_1.LogicRealmTask(PITS.coreTask.getRealm(), "init", function () {
                PITS.definition.createInitRunnable(PITS);
            });
        };
        ;
        /**
         * 创建节点任务
         */
        ProcessInstanceThreadSegment.prototype.createNodeTask = function (nodeId) {
            var PITS, nodeLRT, outs;
            PITS = this; // 避免this指代混乱
            // 创建节点任务
            nodeLRT = new LogicRealmTask_1.LogicRealmTask(PITS.coreTask.getRealm(), "节点-" + nodeId, function () {
                PITS.stepNodeIn(nodeId);
            });
            // 获取节点出口，给节点后续进行挂钩
            outs = PITS.definition.getOutNextMap(nodeId);
            if (outs != undefined) {
                var keySet_1 = outs.keySet();
                for (var i = 0; i < keySet_1.length; i++) {
                    (function (i) {
                        var endName, endId;
                        endName = keySet_1[i];
                        endId = outs.get(keySet_1[i]);
                        nodeLRT.hook(new LogicRealmTask_1.LogicRealmTask(nodeLRT.realm, "StepNodeOut-" + endName, function () {
                            PITS.stepNodeOut(endName, endId);
                        }), endName);
                    })(i);
                }
            }
            return nodeLRT;
        };
        ;
        /**
         * 开始执行节点任务
         */
        ProcessInstanceThreadSegment.prototype.stepNodeIn = function (nodeId) {
            console.log("-----------------------------");
            this.currentNodeId = nodeId;
            console.log("开始执行" + this.definitionPath + "的节点：" + nodeId);
            // con
            this.definition.createNodeRunnable(this, nodeId); // 托管给ProcessDefinition对象执行
        };
        ;
        /**
         * 处理节点出口
         */
        ProcessInstanceThreadSegment.prototype.stepNodeOut = function (endName, endId) {
            console.log("end.name为：" + endName);
            console.log("end.next为：" + endId);
            this.currentNodeEndId = endId; // 标记出口信息
            this.currentNodeEndName = endName;
        };
        ;
        ProcessInstanceThreadSegment.prototype.addVarMap = function (expression, value) {
            this.varMap.put(expression, value);
        };
        ;
        //------------------------------------------------------getter-----------------------------------------------
        /**
         * 获取当前PITS所属的PIT
         */
        ProcessInstanceThreadSegment.prototype.getProcessInstanceThread = function () {
            return this.pit;
        };
        ;
        ProcessInstanceThreadSegment.prototype.getSimplePathName = function (path) {
            return path.substring(path.lastIndexOf('/') + 1);
        };
        ;
        /**
         * 获取流程开始的节点ID
         */
        ProcessInstanceThreadSegment.prototype.getStartNodeId = function () {
            if (this.currentNodeId != undefined) {
                return this.currentNodeId;
            }
            return this.definition.getStartNodeId();
        };
        ;
        ProcessInstanceThreadSegment.prototype.getCurrentNodeId = function () {
            return this.currentNodeId;
        };
        ;
        /**
         * 获取流程的内部变量
         */
        ProcessInstanceThreadSegment.prototype.getVarMap = function (expression) {
            var value = this.varMap.get(expression);
            if (value == null) {
                return "";
            }
            else {
                return value;
            }
        };
        ;
        ProcessInstanceThreadSegment.prototype.getVarMaps = function () {
            return this.varMap;
        };
        ;
        ProcessInstanceThreadSegment.prototype.getId = function () {
            return this.id;
        };
        ;
        ProcessInstanceThreadSegment.prototype.getCoreTask = function () {
            return this.coreTask;
        };
        return ProcessInstanceThreadSegment;
    }());
    exports.ProcessInstanceThreadSegment = ProcessInstanceThreadSegment;
    ;
});
//# sourceMappingURL=ProcessInstanceThreadSegment.js.map