/*1.创建模板抽象工厂方法
2.创建基础模板的抽象类
3.创建模板的抽象类的方法
4.解析服务接口协议数据
5.封装处理服务接口数据
6.将封装的结果传输到各个业务的controller
*/
/*1.创建模板抽象工厂方法*/
var BaseTmptEngine = function(subType,superType){
	//判断抽象工厂中是否有抽象类
    if( typeof BaseTmptEngine [superType]==='function'){
         //缓存类
         function F(){};
         //继承父类属性和方法
         F.prototype = new BaseTmptEngine[superType]();
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
/*2.创建基础模板的抽象类*/
BaseTmptEngine.BaseTemplate=function(){
      this.type ='template';
}
/*3.创建模板的抽象类的方法*/
 BaseTmptEngine.BaseTemplate.prototype={
             //1.解析服务接口协议数据
              parsing:function(){
                console.log("解析数据");
                },
             //2.封装处理服务接口数据
               encapsulation:function(){
                console.log("封装数据");
                },
             //3.将封装的结果传输到各个业务的controller
               transmission:function(){
                console.log("传输数据");
                }
 }    
module.exports = BaseTmptEngine;
