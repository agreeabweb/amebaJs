define(["require", "exports", "../configure/config", "../lib/cache-1.0.js"], function (require, exports, config_1) {
    "use strict";
    var ResourceManager = (function () {
        function ResourceManager() {
        }
        ;
        ResourceManager.getResourceFile = function (path, callback) {
            // cache.clear();
            // get file from cache
            cache.getItem(path, function (file) {
                console.log("从缓存中取得文件：" + path.substr(path.lastIndexOf("/") + 1, path.length - 1));
                callback(file);
            }, function (error) {
                // get file by ajax
                var xmlhttp;
                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                }
                else {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        console.log("从服务器端取得文件：" + path.substr(path.lastIndexOf("/") + 1, path.length - 1));
                        var file = xmlhttp.responseText;
                        cache.setItem(path, file); // 把该文件放入缓存中，以便下次获取
                        callback(file);
                    }
                };
                xmlhttp.open("GET", config_1.default.TradeIP + path, true);
                xmlhttp.setRequestHeader("Content-type", "application/octet-stream");
                xmlhttp.send();
            });
        };
        ;
        return ResourceManager;
    }());
    exports.ResourceManager = ResourceManager;
    ;
});
//# sourceMappingURL=ResourceManager.js.map