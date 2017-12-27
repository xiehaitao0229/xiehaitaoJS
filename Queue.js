/*
* 实现队列类Queue
* @time:2017-12-27
* @author:谢海涛
* */

function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}

/**
 * 向队尾添加一个元素
 * @param element
 */
function enqueue(element) {
    this.dataStore.push(element)
}

/*
* 删除队首的元素
* */
function dequeue() {
    return this.dataStore.shift();
}

//  读取队首元素
function front() {
    return this.dataStore[0]
}

//  读取队尾元素
function back() {
    return this.dataStore[this.dataStore.length-1];
}

//  显示队列内所有的元素
function toString() {
    var result = "";
    for(var i=0;i<this.dataStore.length;i++){
        result+=this.dataStore[i]+"\n";
    }
    return result;
}

//  判断队列是否为空
function empty() {
    if(this.dataStore.length==0){
        return true;
    }else{
        return false;
    }
}

/*-----------测试代码---------------*/
/*var q = new Queue();
q.enqueue('zhangsan');
q.enqueue('lisi');
q.enqueue('wangwu');
console.log(q.toString()) //  zhangsan lisi wangwu
q.dequeue();
console.log(q.toString())  //  lisi wangwu
console.log("队首:"+q.front());  //  lisi
console.log("队尾:"+q.back()); //  wangwu*/


/*-------------使用队列的运用例子1：使用队列之优先队列---------------------*/
//  前言：从优先队列中删除元素，需要考虑优先权的限制。比如医院急诊科，评估患者的病情给一个优先级代码
//  高优先级的患者先于低优先级的患者就医，同样优先级的患者按照先来先服务的顺序就医  优先码越大优先级越高 5>1优先级
//  定义优先队列系统
function Patient(name, code) {
    this.name = name;
    this.code = code;
}

//  重新定义dequeue方法
function dequeue() {
    var entry = 0;
    for(var i=1;i<this.dataStore.length;i++){
        if(this.dataStore[i].code>this.dataStore[entry].code){
            entry = i;
        }
    }
    return this.dataStore.splice(entry,1);
}

//  重新定义toString()方法显示Patient对象
function toString() {
    var result = '';
    for(var i=0;i<this.dataStore.length;i++){
        result+=this.dataStore[i].name+" code"+this.dataStore[i].code+"\n";
    }
    return result;
}

//  优先队列的实现
var zhangsan = new Patient("zhangsan",5);
var lisi = new Patient('lisi',4);
var wangwu = new Patient('wangwu',6);
var liuliu = new Patient('liuliu',1);
var qiqi = new Patient('qiqi',1);
var queue = new Queue();
queue.enqueue(zhangsan,5)
queue.enqueue(lisi,4);
queue.enqueue(wangwu,6);
queue.enqueue(liuliu,1);
queue.enqueue(qiqi,1);
console.log(queue.toString())

//  第一轮
var seen1 = queue.dequeue();
console.log('正在治疗病人:'+seen1[0].name);
console.log('正在等待病人:\n'+queue.toString());

//  第二轮
var seen2 = queue.dequeue();
console.log('正在治疗病人:'+seen2[0].name);
console.log("正在等待病人:\n"+queue.toString());


