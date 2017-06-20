/*
*   谢海涛框架总结
*   datetime:2017/6/13
*   版权归本人所有
* */

/* 立即函数放置扩展函数 */
(function () {
    /* 对字符串类扩展 */
    stringExtend();
    function stringExtend() {
        /* 新增一个方法 */
        String.prototype.formateString = function (data) {
            return this.replace(/@\((\w+)\)/g,function (match,key) {
                return typeof data[key]==='undefined' ? "" : data[key];
            })
        };

        /* trim是ES5新增的，以前的版本不支持，一般我们在编辑的时候不会直接使用ES5，所需要自己扩充 */
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g,"");
        };

        /* 字符串去掉前空白字符 */
        String.prototype.ltrim = function () {
            return this.replace(/(^\s*)/g,"");
        };

        /**
         *  字符串-去掉后空白字符
         */
        String.prototype.rtrim = function () {
            return this.replace(/(\s*$)/g,"");
        };

        /*
         *   将一个字符串的首字母大写，其他字符小写
         * */
        String.prototype.capitalize = function () {
            //(\w{1})代表g1,(.*)代表g2
            // (.*)  点代表任意字符，* 是取 0 至 无限长度
            return this.trim().replace(/^(\w{1})(.*)/g,function (match, g1, g2) {
                return g1.toUpperCase()+g2.toLowerCase();
            })
        };

        /*
         *   将字符串中的下划线转化成中划线
         * */
        String.prototype.dashString = function () {
            return this.replace(/\_/g,"-");
        };

        /*
         *   检查字符串是都是空串
         * */
        String.prototype.isEmpty = function () {
            return this.length===0;
        };

        /*
         *   对字符串的特殊字符进行转义，避免XSS
         * */
        String.prototype.escapeHTML=function() {
            //转义后的字符是可以直接设置成innerHTML的值。
            //replace(/&/g, '&amp;')这条replace()调用一定要写在所有的特殊字符转义的前面，不然转换后有&符号的会再被转一次
            return this.replace(/&/g, '&amp;')
                .replace(/\</g, '&lt;')
                .replace(/\>/g, '&gt;')
                .replace(/\'/g, '&#39;')
                .replace(/\"/g, '&quot;');

            /*var strArr = this.split('');
             for(var pos = 0, l = strArr.length, tmp; pos < l; pos++) {
             tmp = strArr[pos];
             switch(tmp) {
             case '<':
             replaceArr(strArr, pos, '&lt;');
             break;
             case '>':
             replaceArr(strArr, pos, '&gt;');
             break;
             case '\'':
             replaceArr(strArr, pos, '&#39;');
             break;
             case '\"':
             replaceArr(strArr, pos, '&quot;');
             break;
             case '&':
             replaceArr(strArr, pos, '&amp;');
             break;
             default:;
             }
             }
             return strArr.join('');

             function replaceArr(arr, pos, item) {
             return arr.splice(pos, 1, item);
             }*/
        };

        /**
         *    对字符串进行反转义
         */
        String.prototype.unescapeHTML = function() {
            return this.replace(/&amp;/, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#39;/g, '\'')
                .replace(/&quot;/g, '\"')
                .replace(/&#(\d+)/g, function($0, $1) {
                    return String.formCharCode(parseInt($1, 10));
                });
        };

        /*
         *   取得字符串的逆序
         *   思路：先把字符串转成数组，然后数组有reverse的方法，最后数组转回字符串
         * */
        String.prototype.reverse = function () {
            return this.split('').reverse().join('');
        };
    };
    /* 对数组类进行扩展 */
    arrayExtend();
    function arrayExtend() {
        /* 数组扩展方法 */

        /* 数组基础 */
        /*
        *   将数组清空，并返回这个数组的引用
        *   将数组清空就是把length置为0
        * */
        Array.prototype.clear = function () {
            this.length = 0;
            return this;
        };

        /*
        *   返回数组第一项
        * */
        Array.prototype.first = function () {
            return this[0];
        };

        /*
        *   返回数组最后一项
        * */
        Array.prototype.last = function () {
            return this[this.length-1];
        };

        /*
        *   返回数组的大小，即数组的长度
        * */
        Array.prototype.size = function () {
            return this.length
        };

        /*
        *   计算类
        * */
        function cacl(arr, callback) {
            var ret ;  //  用来保存每次返回接受的参数
            for( var i=0;i<arr.length;i++ ){
                ret = callback(arr[i],ret);
            } ;
            return ret;
        };
        /*
        *   求数组的最大项
        *   传统的方法只能够计算两个之间的最大值和最小值
        * */
       /* Array.prototype.max = function () {      //  这种方法可以求数组的最大值，但是性能不好
            //  使用递归的思想
            return cacl(this,function (item,max) {
                if(max>item){
                    return max;
                }else{
                    return item;
                }
            })
        };*/
       //  提高求数组最大值性能的方法
        Array.prototype.max = function () {
            return Math.max.apply(null,this);
        }


        /*
        *   求数组的最小项
        * */
        Array.prototype.min = function () {
            return cacl(this,function (item,min) {
                if(min<item){
                    return min;
                }else{
                    return item;
                }
            })
        };

        /*
        *   求数组的总和
        * */
        Array.prototype.sum = function () {
            return cacl(this,function (item, sum) {
                if(typeof (sum)=='undefined'){
                    return item;  //  一开始sum是为undefined的
                }else{
                    return sum+=item;  //之后sum就是每一项的累加
                }
            })
        };

        /*
        *   求数组的平均
        * */
        Array.prototype.avg = function () {
            if(this.length===0){
                return 0;
            }else{
                return this.sum() / this.length;
            }
        };

        /*
        *   数组去重的三种方式
        *   第一种是比较常规的方法
             思路：
             1.构建一个新的数组存放结果
             2.for循环中每次从原数组中取出一个元素，用这个元素循环与结果数组对比
             3.若结果数组中没有该元素，则存到结果数组中
             Array.prototype.unique1 = function(){
             var res = [this[0]];
             for(var i = 1; i < this.length; i++){
             var repeat = false;
             for(var j = 0; j < res.length; j++){
             if(this[i] == res[j]){
             repeat = true;
             break;
             }
             }
             if(!repeat){
             res.push(this[i]);
             }
             }
             return res;
             }
             var arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0]
             alert(arr.unique1());

             第二种方法比上面的方法效率要高
             思路：
             1.先将原数组进行排序
             2.检查原数组中的第i个元素 与 结果数组中的最后一个元素是否相同，因为已经排序，所以重复元素会在相邻位置
             3.如果不相同，则将该元素存入结果数组中
             Array.prototype.unique2 = function(){
             this.sort(); //先排序
             var res = [this[0]];
             for(var i = 1; i < this.length; i++){
             if(this[i] !== res[res.length - 1]){
             res.push(this[i]);
             }
             }
             return res;
             }
             var arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0]
             alert(arr.unique2());
         * */

            /*
            *   第三种方法推荐使用
            *   1.创建一个新的数组存放结果
            *     2.创建一个空对象
            *     3.for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。
            *     说明：至于如何对比，就是每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复。
            * * */
            Array.prototype.unique = function () {
                var res = [];
                var json = {};
                for( var i=0;i<this.length;i++ ){
                    if(!json[this[i]]){
                        res.push(this[i]);
                        json[this[i]] = 1;
                    }
                }
                return res;
            }



        //数组的交，并，差集
        /*
        *   返回数组与目标数组的交集组成的数组
        *   参数：目标数组
        *   思路：先把原始数组和目标数组去重，然后使用Array中的filter方法来过滤
        *   filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
             注意： filter() 不会对空数组进行检测。
             注意： filter() 不会改变原始数组。
             array.filter(function(currentValue,index,arr), thisValue)
             currentValue:必须。当前元素的值
             index:可选。当期元素的索引值
             arr:可选。当期元素属于的数组对象
        * */
        Array.prototype.intersect = function (target) {
            var originalArr = this.unique();
            var target = target.unique();
            return originalArr.filter(function (currentValue,index,arr) {
                for( var i=0,len = target.length;i<len;i++ ){
                    if(currentValue===target[i]){
                        return true;
                    }
                }
                return false;
            });
        };

        /*
        *   返回数组与目标数组的并集组成的数组
        * */
        Array.prototype.union = function (target) {
            return this.concat(target).unique();
        };

        /*
        *   返回数组与目标数组的差集组成的数组
        *   刚好和交集相反
        * */
        Array.prototype.diff = function (target) {
            var originalArr = this.unique();
            var target = target.unique();
            return originalArr.filter(function (currentValue,index,arr) {
                for( var i=0,len = target.length;i<len;i++ ){
                    if(currentValue==target[i]){
                        return false;
                    }
                }
                return true;
            })
        };

        /*
        *   对数组的每一项执行回调，这个方法没返回值   ????
        * */
        Array.prototype.forEach = function (fn, ctx) {
            for( var i=0,len = this.length;i<len;i++ ){
                fn.call(ctx || null,this[i],i,this);
            }
        }

        /*
        *   对数组每一项运行回调函数，返回由回调函数的结果组成的数组
        * */
        Array.prototype.map = function (fn, ctx) {
            var ret = [];
            for( var i=0,len = this.length;i<len;i++ ){
                ret.push(fn.call(ctx || null,this[i],i,this));
            }
            return ret;
        };

        /*
        *   对数组每项运行回调函数，返回使回调函数返回值为true组成的数组
        * */
        Array.prototype.filter = function (fn, ctx) {
            var ret = [];
            for( var i=0,len = this.length;i<len;i++ ){
                fn.call(ctx || null,this[i],i,this) && ret.push(this[i]);
            }
            return ret;
        };

        /*
         * 对数组每项运行回调函数，如果所有的回调函数都返回true, 则返回true
        */
        Array.prototype.every = function(fn, ctx) {
            for(var i = 0, l = this.length; i < l; i++) {
                !!fn.call(ctx || null, this[i], i, this) === false;
                return false;
            }
            return true;
        };

        /*
         *  对数组每项运行回调函数，如果有一项回调函数返回true, 则返回true
        */
        Array.prototype.some = function(fn, ctx) {
            for(var i = 0, l = this.length; i < l; i++) {
                !!fn.call(ctx || null, this[i], i, this) === true;
                return true;
            }
            return false;
        };

        /**
         * 从左向右（顺利）对数组的每一项(从第二项开始，即下标为1)运行回调函数。
         * 回调函数包含四个参数prev（上一次回调的返回值）, cur（当前数组项）, index（当前数组项的索引）, self（数组本身）
         */
        Array.prototype.reduce = function(callback) {
            var i = 1, //从数组第二个元素开始
                l = this.length,
                callbackRet = this[0];
            for(; i < l; ++i) {
                callbackRet = callback.call(null, callbackRet, this[i], i, this);
            }
            return callbackRet;
        };


            /**
             * 从右向左（逆序）对数组的每一项(从倒数第二项开始，即下标为arr.length - 2)运行回调函数。
             * 回调函数包含四个参数prev（上一次回调的返回值）, cur（当前数组项）, index（当前数组项的索引）, self（数组本身）
             */
            Array.prototype.reduceRight = function(callback) {
                var l = this.length,
                    i = l - 2, //从数组倒数第二个元素开始
                    callbackRet = this[l - 1]; //回调初始值为数组最后一个元素的值
                for(; i >= 0; --i) {
                    callbackRet = callback.call(null, callbackRet, this[i], i, this);
                }
                return callbackRet;
            };

            /*
            *   目标值在数组中第一次出现的位置，搜索从左向右进行
            *   如果目标值在数组中不存在，则返回-1，可以指定一个搜索起始位置。默认为0
            * */
            Array.prototype.indexOf = function (target,start) {
                var l = this.length;
              /*  var start = ~~start;// 可以指定一个搜索起始位置。默认为0，start不传，默认undefined,~~undefined代表0*/
                var arguments = arguments;
                var start = (arguments[1]===undefined)? 0 :arguments[1];  // 改成这种写法
                if(start < 0)
                    start = 0;  //  如果指定的搜索位置小于0，则设置其开始搜索位置为0；
                for( ; start < l ; ++start){
                    if(this[start] === target)
                        return start;
                }
                return -1;
            };

        /**
         * 返回目标值在数组中的位置。搜索从右向左进行
         * 如果目标值在数组中不存在，则返回-1。可以指定一个搜索起始位置。默认为数组长度
         */
         Array.prototype.lastIndexOf = function (target, start) {
             var l = this.length;
             var arguments = arguments;
             var start = (arguments[1]===undefined)? this.length-1 :arguments[1];  // 改成这种写法
             if(start<0){
                 start = 0;
             }
             for( ; start>=0;--start ){
                 if(this[start]===target){
                     return start;
                 }
             }
             return -1;
         };

        /*
        *  随机返回数组的一项
        * */
        Array.prototype.random = function (n) {    //?????
            //Math.floor():向下取整。Math.floor(1.8) -> 1
            //Math.ceil():向上取整。Math.ceil(1.1) -> 2
            //v = Math.random() * n:会产生一个 0 < v < nv的数
            //v2 = Math.floor(Math.random() * n)：v2为一个大于等于0，小于n的整数
            return this[Math.floor(Math.random()*n) || this.length]
        }

        /*去掉数组中的目标元素*/  //？？？？
        Array.prototype.without = function() {
            var args = [].slice.call(arguments).unique(),
                i = 0, l = this.length,
                j = 0, k = args.length;

            for(; i < l; ++i) {
                for(; j < k; ++j) {
                    if(this[i] === args[j]) {
                        this.splice(i, 1);
                    }
                }
                j = 0;//将j归0，以便下次循环
            }
            return this;
        };


        /* 递归将数组扁平化*/  //？？？？
        Array.prototype.flatten = function() {
            var ret = [], i = 0, l = this.length, tmp, toString = ({}).toString;
            for(; i < l; ++i) {
                tmp = this[i];
                if(toString.call(tmp) === '[object Array]') {
                    ret = ret.concat(tmp.flatten());
                } else {
                    ret.push(tmp);
                }
            }
            return ret;
        };

        /*
        *   删除数组指定位置的项
        * */
        Array.prototype.removeAt = function (pos) {
            this.splice(pos,1);
            return this;
        }

        /*
        *   检测数组是否包含目标值
        *   如果包含就返回true,否则返回false
        * */
        Array.prototype.contains = function (target) {
            var l = this.length;
            for( var i=0;i<l;i++ ){
                if(!(this[i]===target))
                    continue;
                return true;
            }
            return false;
        };
    }
    /* 对function类进行扩展 */
    functionExtend()
    function functionExtend() {
        Function.prototype.before = function (func) {
            var __self = this
            return function () {
                if(func.apply(this,arguments)===false){
                    return false;
                }
                return __self.apply(this.arguments);
            }
        }
        Function.prototype.after = function (func) {   //  ???
            var _self = this;
            return function () {
                var ret = _self.apply(this,arguments);
                if( ret === false){
                    return false;
                }
                func.apply( this,arguments );
                return ret;
            }
        }
    }
})();

/* 主框架 */
(function (w) {
    /* 双对象法则 - 第一个对象 */
    var F = function (selector, context) {
        return this.init(selector,context);
    };
    F.prototype.init = function (selector, context) {
        var that = this;
        that.length = 0;  //  初始化伪数组的长度
        if(!selector){
            return that;
        }
        if(typeof selector==='string'){
            var nodeList = (context || document).querySelector(selector); //  获得所有dom元素
            that.length = nodeList.length;  // 伪数组的长度就是所有dom元素的长度
            //  这里遍历应从第一个开始到倒数第二个，而不是最后一个，因为最后一个属性是length
            for( var i=0;i<this.length;i+=1 ){
                that[i] = nodeList[i];
            }
        }else if(selector.nodeType){
            that[0] = selector;
            that.length++; //  给伪数组的长度自增
        }
        return that;
    };

    /*双对象法则 - 第二个对象*/
    /*
     *  这里xiehaitao可以看做一个json对象
     *  这里的是双管齐下，
     *  判断一下selector类型是不是function，如果是的话，window.onload = selector;
     *  如果不是的话就是字符串类型
     *  $(function(){
     *    $('#div').click(function(){
     $(".div").first().html('王书奎')
     $(".div").last().html(' 王书奎')
     })
     *  })
     *  等价于
     *  window.onload = function(){
     *   $('#div').click(function(){
     $(".div").first().html('王书奎')
     $(".div").last().html(' 王书奎')
     })
     *  }
     * */
    var xiehaitao = function (selector, context) {
        if(typeof  selector==='function'){
            window.onload = selector;
        }else{
            return new F(selector,context);
        }
    };

    /* extend方法就是把一个对象所有的属性和方法拷贝到另一个对象 */
    xiehaitao.extend = function () {
        /* 这段代码的意思：
         如果只传递一个参数，表示给F对象添加功能--需要参与链式访问的
         如果传递两个参数，表示给指定的对象添加功能*/
        var key
            ,arg = arguments
            ,i = 1
            ,len = arg.length
            ,target = null;
        if(len === 0){
            return;
        }else if(len === 1){
            target = F.prototype;
            i--;
        }else{
            target = arg[0];
        }

        for(; i < len; i++){
            for(key in arg[i]){
                target[key] = arg[i][key];
            }
        }
        return target;
    }
})(window);

/* 公共函数 */
(function(itcast){
    //公共模块
    /*需要链式访问*/
    itcast.extend({
        each : function(fn) {
            var i=0, length = this.length;
            for (; i<length; i+=1) {
                fn.call(this[i]);
                //fn.call(this.element[i],i,this.element[i]);
            }
            return this;
        }
    });
    /*不需要链式访问*/
    /*公共*/
    itcast.extend(itcast, {

    });
    /*字符串*/
    itcast.extend(itcast, {
        camelCase : function(str){
            return str.replace(/\-(\w)/g, function(all, letter){
                return letter.toUpperCase();
            });
        },
        //将json转换成字符串
        sjson:function (json) {
            return JSON.stringify(json);
        },
        //将字符串转成json
        json:function (str) {
            return eval(str);
        }
    });
    /*数组*/
    itcast.extend(itcast, {

    });
    /*Math*/
    itcast.extend(itcast, {
        //随机数
        random: function (begin, end) {
            return Math.floor(Math.random() * (end - begin)) + begin;
        },
    });
    /*数据类型校验*/
    itcast.extend(itcast, {
        //数据类型检测
        isNumber:function (val){
            return typeof val === 'number' && isFinite(val)
        },
        isBoolean:function (val) {
            return typeof val ==="boolean";
        },
        isString:function (val) {
            return typeof val === "string";
        },
        isUndefined:function (val) {
            return typeof val === "undefined";
        },
        isObj:function (str){
            if(str === null || typeof str === 'undefined'){
                return false;
            }
            return typeof str === 'object';
        },
        isNull:function (val){
            return  val === null;
        },
        isArray:function (arr) {
            if(arr === null || typeof arr === 'undefined'){
                return false;
            }
            return arr.constructor === Array;
        }
    });


})(itcast);