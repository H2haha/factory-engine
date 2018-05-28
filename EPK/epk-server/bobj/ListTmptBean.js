/**
 * List模板Bean
 */

function ListTmptBean (theme, styleId) {
    this.theme = theme;
    this.styleId = styleId;
}

ListTmptBean.prototype.toString = function () {
    return `theme: ${this.theme}, styleId: ${this.styleId}`;
}

module.exports = ListTmptBean;

