/**
 * 1.创建模板解析器抽象工厂方法
 * 2、创建解析器的抽象类
 * 3.创建解析器的抽象类的方法
 * 4..解析服务接口协议数据
 */
/*1.创建模板解析器抽象工厂方法*/
var BaseTmptParser = function(subType,superType){
	//判断抽象工厂中是否有抽象类
    if( typeof BaseTmptParser [superType]==='function'){
         //缓存类
         function F(){};
         //继承父类属性和方法
         F.prototype = new BaseTmptParser[superType]();
         //将子类的constructor指向子类
         subType.constructor=subType;
         //子类原型继承“父类”
         subType.prototype=new F();
    }else{
         //不存在该抽象类抛出错误
         throw new Error('未创建该抽象类');       
    }
}
//抽象工厂的结束
/*2.、创建解析器的抽象类*/
BaseTmptParser.BaseParser=function(){
      this.type ='Parser';
}
/*3.创建解析器的抽象类的方法*/
 BaseTmptParser.BaseParser.prototype={
             //1.解析服务接口协议数据
              parsing:function(json){
                console.log("解析数据");
                }
 }   
module.exports = BaseTmptParser;