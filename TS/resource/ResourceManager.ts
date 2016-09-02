import config from "../configure/config";
import "../lib/cache-1.0.js";

declare let cache;

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
            let xmlhttp;

            if(window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest(); 
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    console.log("从服务器端取得文件：" + path.substr(path.lastIndexOf("/") + 1, path.length - 1));
                    let file = xmlhttp.responseText;
                    cache.setItem(path, file);  // 把该文件放入缓存中，以便下次获取
                    callback(file);
                }
            }
            xmlhttp.open("GET", config.TradeIP + path, true);
            xmlhttp.setRequestHeader("Content-type","application/octet-stream");
            xmlhttp.send();
        });
    };
};

export {ResourceManager};