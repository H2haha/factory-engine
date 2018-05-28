/**
 * 序列化工具类
 */
function Serialize() {
    throw '该工具类不需要产生实例，请直接调用静态方法';
}

/**
 * Json数据序列化为实体对象
 * @param {Object} object   对象实例
 * @param {Json} json   Json数据
 */
Serialize.toObject = function(object, json) {
    Object.keys(object).forEach((key) => {
        object[key] = json[key];
    })
    return object;
}

/**
 * 将对象转换为JSON格式的字符串
 * @param {Object} object 实体对象
 */
Serialize.toString = function(object) {
    return JSON.stringify(object);
}

module.exports = Serialize;