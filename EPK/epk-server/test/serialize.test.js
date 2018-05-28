const Serialize = require('../util/Serialize');
// nodejs断言模块
const assert = require('assert');

// 定义Person类
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.run = function() {
    console.log(this.name + ' is running');
}

// Json数据
const json = {
    name: '张三',
    age: 20,
    address: '北京市朝阳区'
}

// json数据序列化为实体对象
let person = Serialize.toObject(new Person(), json);
assert.equal(person.name, '张三')

// 实体对象序列化为JSON格式的字符串
let string = Serialize.toString(person);
assert.equal(typeof string, 'string');
