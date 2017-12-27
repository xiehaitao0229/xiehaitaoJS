/*
* 实现列表类list
* @time:2017-12-27
* @author:谢海涛
* */
function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = []; //  初始化一个空数组来保存列表元素
    this.clear = clear;
    this.find = find;   //  给列表添加元素
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.hasNext = hasNext;
    this.hasPrev = hasPrev;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.contains = contains;
}

/**
 *  给列表添加元素
 * @param element
 */
function append(element) {
    this.dataStore[this.listSize++] = element;
}

/**
 * 从列表中删除元素
 * @param element
 * @return 成功返回true,失败返回false
 */
function remove(element) {
    var index = this.find(element);
    if (index > -1) {
        this.dataStore.splice(index, 1);
        --this.listSize;
        return true
    }
    return false;
}

/*
* 在列表中查找某个元素
* return 找到就返回元素的索引，否则返回-1
* */
function find(element) {
    for (var i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] == element) {
            return i;
        }
    }
    return -1;
}

/**
 * 返回列表的元素个数
 */
function length() {
    return this.listSize;
}

/**
 * 显示列表中的元素
 */
function toString() {
    return this.dataStore;
}


/**
 *
 * @param element  插入元素
 * @param after  插入元素的前一个元素
 * @return 插入成功返回true,否则返回false
 */
function insert(element, after) {
    var index = this.find(after);
    if (index > -1) {
        this.dataStore.splice(index + 1, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}

/**
 * 清空列表中所有元素
 */
function clear() {
    delete this.dataStore;
    this.dataStore.length = 0;
    this.listSize = this.pos = 0;
}

/**
 * 判断给定的元素是否在列表中
 * @param element
 * @return 存在返回true,否则返回false
 */
function contains(element) {
    for (var i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}

//  第一个元素索引
function front() {
    this.pos = 0;
}

//  最后一个元素的索引
function end() {
    this.pos = this.listSize - 1
}

//  向前移一个索引
function prev() {
    --this.pos;
}

//  向后移一个索引
function next() {
    if (this.pos < this.listSize ) {
        ++this.pos;
    }
}

//  当前的索引位置
function currPos() {
    return this.pos;
}

/**
 * 移到指定的索引文职
 * @param position  指定的索引位置
 */
function moveTo(position) {
    this.pos = position;
}

/**
 * 得到当前索引的元素
 */
function getElement() {
    return this.dataStore[this.pos];
}

//  是否可以移到下一个索引位置
function hasNext() {
    return this.pos < this.listSize ? true : false;
}

//  是否可以移到上一个索引位置
function hasPrev() {
    return this.pos >= 0 ? true : false;
}

var names = new List();
names.append('zhangsan')
names.append('lisi')
names.append('wangwu')



for(names.front();names.hasNext();names.next()){
    console.log(names.getElement())
}
