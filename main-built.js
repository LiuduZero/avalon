/**
 * @license RequireJS text 2.0.13+ Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define("aaa",[],function(){return"AAA"}),define("bbb",[],function(){return"bbb"}),define("eee/eee",[],function(){return 333}),define("eee/ddd",["./eee"],function(e){return 222+e}),define("ccc",["./eee/ddd"],function(e){return"ccc"+e}),define("text",["module"],function(e){var t,n,r,i,s,o=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],u=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,a=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,f=typeof location!="undefined"&&location.href,l=f&&location.protocol&&location.protocol.replace(/\:/,""),c=f&&location.hostname,h=f&&(location.port||undefined),p={},d=e.config&&e.config()||{};t={version:"2.0.13+",strip:function(e){if(e){e=e.replace(u,"");var t=e.match(a);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:d.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=o[t];try{e=new ActiveXObject(n)}catch(r){}if(e){o=[n];break}}return e},parseName:function(e){var t,n,r,i=!1,s=e.lastIndexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,d.isBuild&&(p[e]=r),i(r)},load:function(e,n,r,i){if(i&&i.isBuild&&!i.inlineText){r();return}d.isBuild=i&&i.isBuild;var s=t.parseName(e),o=s.moduleName+(s.ext?"."+s.ext:""),u=n.toUrl(o),a=d.useXhr||t.useXhr;if(u.indexOf("empty:")===0){r();return}!f||a(u,l,c,h)?t.get(u,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([o],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(p.hasOwnProperty(n)){var s=t.jsEscape(p[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.ext?"."+o.ext:"",a=o.moduleName+u,f=r.toUrl(o.moduleName+u)+".js";t.load(a,r,function(n){var r=function(e){return i(f,e)};r.asModule=function(e,t){return i.asModule(e,f,t)},t.write(e,a,r,s)},s)}};if(d.env==="node"||!d.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"])n=require.nodeRequire("fs"),t.get=function(e,t,r){try{var i=n.readFileSync(e,"utf8");i[0]==="﻿"&&(i=i.substring(1)),t(i)}catch(s){r&&r(s)}};else if(d.env==="xhr"||!d.env&&t.createXhr())t.get=function(e,n,r,i){var s=t.createXhr(),o;s.open("GET",e,!0);if(i)for(o in i)i.hasOwnProperty(o)&&s.setRequestHeader(o.toLowerCase(),i[o]);d.onXhr&&d.onXhr(s,e),s.onreadystatechange=function(t){var i,o;s.readyState===4&&(i=s.status||0,i>399&&i<600?(o=new Error(e+" HTTP status: "+i),o.xhr=s,r&&r(o)):n(s.responseText),d.onXhrComplete&&d.onXhrComplete(s,e))},s.send(null)};else if(d.env==="rhino"||!d.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),r!==null&&n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};else if(d.env==="xpconnect"||!d.env&&typeof Components!="undefined"&&Components.classes&&Components.interfaces)r=Components.classes,i=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),s="@mozilla.org/windows-registry-key;1"in r,t.get=function(e,t){var n,o,u,a={};s&&(e=e.replace(/\//g,"\\")),u=new FileUtils.File(e);try{n=r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),n.init(u,1,0,!1),o=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),o.init(n,"utf-8",n.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),o.readString(n.available(),a),o.close(),n.close(),t(a.value)}catch(f){throw new Error((u&&u.path||"")+": "+f)}};return t}),define("text!xxx.htm",[],function(){return"1111111"}),define("normalize",[],function(){function s(e,i,s){if(e.match(r)||e.match(n))return e;e=t(e);var a=s.match(n),f=i.match(n);return f&&(!a||a[1]!=f[1]||a[2]!=f[2])?o(e,i):u(o(e,i),s)}function o(e,t){e.substr(0,2)=="./"&&(e=e.substr(2));if(e.match(r)||e.match(n))return e;var i=t.split("/"),s=e.split("/");i.pop();while(curPart=s.shift())curPart==".."?i.pop():i.push(curPart);return i.join("/")}function u(e,t){var n=t.split("/");n.pop(),t=n.join("/")+"/",i=0;while(t.substr(i,1)==e.substr(i,1))i++;while(t.substr(i,1)!="/")i--;t=t.substr(i+1),e=e.substr(i+1),n=t.split("/");var r=e.split("/");out="";while(n.shift())out+="../";while(curPart=r.shift())out+=curPart+"/";return out.substr(0,out.length-1)}var e=/([^:])\/+/g,t=function(t){return t.replace(e,"$1/")},n=/[^\:\/]*:\/\/([^\/])*/,r=/^(\/|data:)/,a=function(e,n,r){n=t(n),r=t(r);var i=/@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/ig,o,u,e;while(o=i.exec(e)){u=o[3]||o[2]||o[5]||o[6]||o[4];var a;a=s(u,n,r);var f=o[5]||o[6]?1:0;e=e.substr(0,i.lastIndex-u.length-f-1)+a+e.substr(i.lastIndex-f-1),i.lastIndex=i.lastIndex+(a.length-u.length)}return e};return a.convertURIBase=s,a.absoluteURI=o,a.relativeURI=u,a}),define("css",[],function(){if(typeof window=="undefined")return{load:function(e,t,n){n()}};var e=document.getElementsByTagName("head")[0],t=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,n=!1,r=!0;t[1]||t[7]?n=parseInt(t[1])<6||parseInt(t[7])<=9:t[2]||t[8]?r=!1:t[4]&&(n=parseInt(t[4])<18);var i={};i.pluginBuilder="./css-builder";var s,o,u=function(){s=document.createElement("style"),e.appendChild(s),o=s.styleSheet||s.sheet},a=0,f=[],l,c=function(e){a++,a==32&&(u(),a=0),o.addImport(e),s.onload=function(){h()}},h=function(){l();var e=f.shift();if(!e){l=null;return}l=e[1],c(e[0])},p=function(e,t){(!o||!o.addImport)&&u();if(o&&o.addImport)l?f.push([e,t]):(c(e),l=t);else{s.textContent='@import "'+e+'";';var n=setInterval(function(){try{s.sheet.cssRules,clearInterval(n),t()}catch(e){}},10)}},d=function(t,n){var i=document.createElement("link");i.type="text/css",i.rel="stylesheet";if(r)i.onload=function(){i.onload=function(){},setTimeout(n,7)};else var s=setInterval(function(){for(var e=0;e<document.styleSheets.length;e++){var t=document.styleSheets[e];if(t.href==i.href)return clearInterval(s),n()}},10);i.href=t,e.appendChild(i)};return i.normalize=function(e,t){return e.substr(e.length-4,4)==".css"&&(e=e.substr(0,e.length-4)),t(e)},i.load=function(e,t,r,i){(n?p:d)(t.toUrl(e+".css"),r)},i}),define("css!style",[],function(){}),require.config({baseUrl:"./kkk",paths:{jquery:"jQuery/jquery"}}),require(["./aaa","./bbb","./ccc","text!xxx.htm","css!style"],function(e,t,n,r){console.log([e,t,n,r]+" complete")}),define("main",function(){}),function(e){var t=document,n="appendChild",r="styleSheet",i=t.createElement("style");i.type="text/css",t.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=e:i[n](t.createTextNode(e))}("body{\r\n    border:1px solid red\r\n}");