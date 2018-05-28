/*1.创建列表引擎*/
/*2.继承模板的类型*/
/*3.list模板的数据解析*/
/*4.list模板的数据传输*/
const ListTmptBean = require('../../bobj/ListTmptBean');
const Serialize = require('../../util/Serialize');
const BaseTmptEngine = require('./BaseTmptEngine.js');
const ListTmptDao = require('../../dao/ListTmptDao.js');
// list模板数据dao
const listTmptDao = new ListTmptDao();
/*1.创建列表引擎*/
var ListTmptEngine = function(json){
	this.json =json;   
}
/*2.继承模板的类型*/
BaseTmptEngine(ListTmptEngine,'BaseTemplate');
//3.list模板的数据解析
ListTmptEngine.prototype.parsing = function(json){
    return this.transmission(json);
}
//4.list模板的数据传输
ListTmptEngine.prototype.transmission = function(json){
   return Serialize.toObject(new ListTmptBean, json);	
}
module.exports = ListTmptEngine;


























