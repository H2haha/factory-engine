
/*1.创建列表解析器引擎
  2.继承解析器的类型
  3.将服务端返回的模板数据解析为vue所需的模板*/

const BaseTmptParser = require('../parse/BaseTmptParser');
//1.创建列表解析器引擎
var ListTmptParser = function(){
  
}
// 2.继承解析器的类型
BaseTmptParser(ListTmptParser,'BaseParser');
/*
 * 将服务端返回的模板数据解析为vue所需的模板
 * @param {json} json 
 */
ListTmptParser.prototype.parsing = function (movieList) {
    let template = '';
    // 解析模板
    movieList.forEach(movie => {
        template += handle(movie);
    });
    function handle(movie) {
        let str = `
            <div class="movie">
                <img class="cover" src="${movie.images}">
                <div class="info">
                <p class="title">${movie.title}</p>
                <p class="rating">评分：${movie.rating} 分</p>
                <p class="year">年份：${movie.year}</p>
                </div>
            </div>`
        return str;
    }

    // 返回模板给页面
    return template;
}

export {ListTmptParser}