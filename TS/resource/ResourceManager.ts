import config from "../configure/config";
import "../lib/cache-1.0.js";

declare var cache;

class ResourceManager {
    public constructor() {};

    public static getResourceFile(path: string, callback: Function): void {
        // cache.clear();
        // get file from cache
        cache.getItem(path, function(file) {
            console.log("从缓存中取得文件：" + path.substr(path.lastIndexOf("/") + 1, path.length - 1));
            callback(file);
        }, function(error) {
            // get file by ajax
            var xmlhttp;
            if(window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest(); 
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    console.log("从服务器端取得文件：" + path.substr(path.lastIndexOf("/") + 1, path.length - 1));
                    var file = xmlhttp.responseText;
                    cache.setItem(path, file);  // 把该文件放入缓存中，以便下次获取
                    callback(file);
                }
            }
            // xmlhttp.open("GET", "http://192.168.11.112:50002/servlets/downloadResource/AppFramework_2013B/business/commonComponent/ClearAll.lfc", true);
            var seePath = config.TradeIP + path;
            xmlhttp.open("GET", config.TradeIP + path, true);
            xmlhttp.setRequestHeader("Content-type","application/octet-stream");
            xmlhttp.send();
        });
    };
};

export {ResourceManager};