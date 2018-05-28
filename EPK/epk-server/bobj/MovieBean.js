/**
 * 电影实体Bean
 */

function MovieBean (id, title, rating, genres, year, images) {
    this.id = id;           // 电影id
    this.title = title;     // 电影名称
    this.rating = rating;   // 评分
    this.genres = genres;   // 类型
    this.year = year;       // 年份
    this.images = images;   // 封面图
}

MovieBean.prototype.toString = function () {
    return `id: ${this.id}, title: ${this.title}, rating: ${this.rating}, 
    genres: ${this.genres}, year: ${this.year}`
}

module.exports = MovieBean;