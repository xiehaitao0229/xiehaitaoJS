/*
* 实现栈类Stack
* @time:2017-12-27
* @author:谢海涛
* */

function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.length = length;
    this.clear = clear;
}

/**
 * 入栈
 * @param element
 */
function push(element) {
    this.dataStore[this.top++] = element;
}

/**
 * 出栈
 */
function pop() {
    return this.dataStore[--this.top];
}

/*
* 返回栈顶元素
* */
function peek() {
    return this.dataStore[this.top - 1];
}

/*
* 查看栈的元素个数
* */
function length() {
    return this.top;
}

/*
* 清空栈
* */
function clear() {
    this.top = 0;
}

//  运用例子1：数制间的相互转换
function mulBase(num, base) {
    var s = new Stack();
    do {
        s.push(num % base)
        num = Math.floor(num /= base)
    } while (num > 0)
    var result = '';
    while (s.length() > 0) {
        result += s.pop();
    }
    return result;
}

console.log(mulBase(10, 8))


function factorial(n) {
    if (n == 0) {
        return 1;
    }else{
        return n*factorial(n-1)
    }
}

console.log(factorial(5))

//  实例运用2：模拟递归
function fact(n) {
    var s = new Stack();
    while(n>1){
        s.push(n--);
    }
    var result = 1;
    while(s.length()>0){
        result*=s.pop();
    }
    return result;
}

console.log(fact(5))


//  实例运用3:回文
function isPalindrome(word) {
    var s = new Stack();
    for(var i=0;i<word.length;i++){
        s.push(word[i]);
    }
    var newWord = '';
    while(s.length()>0){
        newWord+=s.pop();
    }
    if(word==newWord){
        return true;
    }else{
        return false;
    }
}

console.log(isPalindrome('racecar'))
