var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../lib/HashMap"], function (require, exports, HashMap_1) {
    "use strict";
    //import {BindValue} from 
    var DataModel = (function (_super) {
        __extends(DataModel, _super);
        //private EnumMap enumMap = new EnumMap();
        /**
         * 内部创建的DataModel不具备自动备份能力，例如子DataModel和备份DataModel
         *
         * @param realm
         *        Realm
         */
        function DataModel(realm) {
            _super.call(this, realm);
            this.transient = backup;
            this.createTime = System.currentTimeMillis();
            /**
             * 由Realm控制住并发访问，无需使用ConcurrentHashMap
             */
            this.memberMap = new HashMap_1.HashMap();
            /**
             * 表示是否属于共享数据模型
             */
            this.isShared = false;
        }
        DataModel.prototype.getResult = function () {
            return result;
        };
        DataModel.prototype.setResult = function (result) {
            this.result = result;
        };
        DataModel.prototype.addPrefix = function (prefix, oldList) {
            result: Array < string > ;
            new Array(oldList.size());
            for (var old in oldList) {
                result.add(prefix + "." + old);
            }
            return result;
        };
        DataModel.prototype.create = function (context) {
            realm: Realm = context.get('DataModelRealm');
            dataModel: DataModel = new DataModel(realm);
            dataModel.root = true;
            return dataModel;
        };
        /**
         *
         */
        DataModel.prototype.createSimpleMember = function (memberName) {
            checkRealm();
            // 1. create
            var result = new BindValue(getRealm());
            memberMap.put(memberName, result);
            //
            return result;
        };
        /**
       *
       */
        DataModel.prototype.createSubModelMember = function (memberName) {
            // 0. container
            member: BindValue < Object > ;
            createSimpleMember(memberName);
            // 1. create
            subModel: DataModel = new DataModel(getRealm());
            // 2. hook
            member.set(subModel);
            // $.
            return subModel;
        };
        DataModel.prototype.doGet = function (memberName) {
            checkRealm();
            candidate: : BindValue < Object > ;
            getMember(memberName);
            if (candidate == null) {
                return null;
            }
            return candidate.get();
        };
        DataModel.prototype.doGetAllMemberNames = function () {
            checkRealm();
            Array < String > result;
            new Array();
            Array < String > tmp;
            new Array(memberMap.keySet());
            //Collections.sort(tmp);
            for (var key in tmp) {
                memberContent: Object = get(key);
                if (memberContent instanceof DataModel) {
                    DataModel;
                    subModel = (DataModel);
                    memberContent;
                    result.addAll(addPrefix(key, subModel.getAllMemberNames()));
                }
                else if (memberContent != null) {
                    result.add(key);
                }
            }
            return result;
        };
        DataModel.prototype.doGetMember = function (memberName, create) {
            checkRealm();
            dotIndex: number = memberName.indexOf('.');
            if (dotIndex > 0) {
                prefix: string = memberName.substring(0, dotIndex);
                suffix: string = memberName.substring(dotIndex + 1);
                subModel: DataModel = (DataModel);
                get(prefix);
                if (subModel == null) {
                    if (!create) {
                        return null;
                    }
                    subModel = createSubModelMember(prefix);
                }
                return subModel.getMember(suffix, create);
            }
            result: BindValue < Object > ;
            memberMap.get(memberName);
            if (create && result == null) {
                result = createSimpleMember(memberName);
            }
            return result;
        };
        DataModel.prototype.doRemove = function (memberName) {
            checkRealm();
            dotIndex: number = memberName.indexOf('.');
            if (dotIndex > 0) {
                prefix: string = memberName.substring(0, dotIndex);
                suffix: string = memberName.substring(dotIndex + 1);
                subModel: DataModel = (DataModel);
                get(prefix);
                if (subModel == null) {
                    return;
                }
                subModel.remove(suffix);
                return;
            }
            value: BindValue < Object > ;
            memberMap.remove(memberName);
            if (value != null) {
                value.dispose();
            }
        };
        DataModel.prototype.doSet = function (memberName, memberContent) {
            checkRealm();
            value: BindValue < Object > ;
            getMember(memberName, true);
            /*
            if (memberContent instanceof Collection)
            {
                memberContent = wrapCollection(memberName,
                        (Collection) memberContent);
    
            }
            if (memberContent instanceof Map)
            {
                memberContent = wrapMap(memberName, (Map) memberContent);
            }
            */
            value.set(memberContent);
        };
        /**
         * 获取要素
         *
         * @param memberName
         *        String
         * @return Object
         */
        DataModel.prototype.get = function (final, string) {
            if (final === void 0) { final = memberName; }
            this.result = doGet(memberName);
            setResult(result);
            return getResult();
        };
        /**
        *
        */
        DataModel.prototype.getAllMemberNames = function () {
            this.result = doGetAllMemberNames();
            setResult(result);
            return getResult();
        };
        DataModel.prototype.getCreateTime = function () {
            return createTime;
        };
        DataModel.prototype.getMember = function (memberName) {
            return getMember(memberName, false);
        };
        DataModel.prototype.getMember = function (final, string, final, boolean) {
            if (final === void 0) { final = memberName; }
            if (final === void 0) { final = create; }
            this.result = doGetMember(memberName, create);
            setResult(result);
            return getResult();
        };
        /**
        *
        * @param memberName
        *        String
        * @param memberContent
        *        String
        */
        DataModel.prototype.set = function (final, string, final, Object) {
            if (final === void 0) { final = memberName; }
            if (final === void 0) { final = memberContent; }
            doSet(memberName, memberContent);
        };
        return DataModel;
    }(AbstractObservable));
    exports.DataModel = DataModel;
});
//# sourceMappingURL=DataModel.js.map