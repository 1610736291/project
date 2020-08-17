//1.随机数如何设定范围（封装函数）
function ranNum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//2.获取任意css属性值。
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

//3.事件绑定
function addEvent(obj, etype, fn, bool) {
    var bool = bool || false; //设置默认值flase 冒泡
    if (obj.addEventListener) {
        obj.addEventListener(etype, fn, bool);
    } else {
        obj.attachEvent('on' + etype, fn);
    }
}

//4.取消事件绑定
function removeEvent(obj, etype, fn, bool) {
    var bool = bool || false; //设置默认值flase 冒泡
    if (obj.removeEventListener) {
        obj.removeEventListener(etype, fn, bool);
    } else {
        obj.detachEvent('on' + etype, fn);
    }
}

//5.缓冲运动
function bufferMove(obj, attrobj, fn) { //obj:元素对象 attrobj:属性对象  fn:回调函数
    var speed = 0;
    clearInterval(obj.timer); //obj.timer:每一次的返回都不一样。
    obj.timer = setInterval(function() {
        //对传入的属性对象进行遍历
        var flag = true; //运动完成的标记
        for (var attr in attrobj) {
            //1.求速度-透明度不能取整
            var currentvalue = null;
            if (attr === 'opacity') { //透明度
                currentvalue = Math.round(getStyle(obj, attr) * 100); //扩大100倍
            } else {
                currentvalue = parseInt(getStyle(obj, attr)); //当前改变属性值
            }

            //如果是透明度，目标扩大100倍
            speed = (attrobj[attr] - currentvalue) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //2.判断运动是否停止
            if (currentvalue !== attrobj[attr]) { //没到目标点继续运动
                if (attr === 'opacity') { //继续运动 判断透明度，透明度没有单位。
                    obj.style.opacity = (currentvalue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (currentvalue + speed) + ')';
                } else {
                    obj.style[attr] = currentvalue + speed + 'px';
                }
                flag = false; //继续运动,改变flag的值
            }
        }

        if (flag) { //如果flag=true，运动已经结束啦，如果有一个没到，flag=false
            clearInterval(obj.timer);
            //fn链式运动，不是每一个运动都是链式的，判断是否存在第四个参数。
            fn && typeof fn === 'function' && fn();
        }


    }, 1000 / 60);
}


//获取元素的封装
function $(selector, all) { //selector:选择器  all：获取多个设置
    if (!all) {
        return document.querySelector(selector); //1
    } else {
        return document.querySelectorAll(selector);
    }
}

//封装ajax
function $ajax(option) {
    let promise = new Promise(function(resolve, reject) {
        option.type = option.type || 'get';
        let ajax = new XMLHttpRequest();
        if (!option.url) {
            throw new Error('接口地址不能为空，请输入接口地址');
        }
        if (option.async === false || option.async === 'false') {
            option.async = false;
        } else {
            option.async = true;
        }
        if (option.data) {
            if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') {
                let arr = [];
                for (let i in option.data) {
                    arr.push(i + '=' + option.data[i]);
                }
                option.data = arr.join('&');
            }
        }
        if (option.data && option.type === 'get') {
            option.url += '?' + option.data
        }
        ajax.open(option.type, option.url, option.async);
        if (option.data && option.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(option.data);
        } else {
            ajax.send();
        }
        if (option.async) {
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        let jsondata = null;
                        if (option.dataType === 'json') {
                            jsondata = JSON.parse(ajax.responseText);
                        } else {
                            jsondata = ajax.responseText
                        }
                        resolve(jsondata);
                    } else {
                        reject('接口地址错误');
                    }
                }
            }
        } else {
            if (ajax.status === 200) {
                let jsondata = null;
                if (option.dataType === 'json') {
                    jsondata = JSON.parse(ajax.responseText);
                } else {
                    jsondata = ajax.responseText
                }
                resolve(jsondata);
            } else {
                reject('接口地址错误');
            }
        }
    });
    return promise;
}

//设置获取删除cookie
let cookie = {
    set: function(key, value, days) {
        let d = new Date();
        d.setDate(d.getDate() + days);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d};path=/`;
    },
    get: function(key) {
        let arr = decodeURIComponent(document.cookie).split('; '); //转数组
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i].split('='); //['name','zhangsan']数组的第一项是key，第二项是value
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    },
    remove: function(key) {
        cookie.set(key, '', -1);
    }
}