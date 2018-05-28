/**
 * nodejs后端请求参数配置
 * 1、访问配置
 * 2、业务api
 */
const http_schema = 'http://'
const https_schema = 'https://'

const domain_online = 'localhost:3010'

module.exports = {
    // nodejs大地院线页面业务接口
    dadi: {
        config: {
            baseURL: `${http_schema}${domain_online}`,
            timeout: 5000,        // 接口请求超时时间(ms)
            responseType: 'json'  // 响应类型
        },
        biz_api: {
            hot: '/movie/hot'     // 热门电影接口
        },
        tmpt_api: {
            list: '/tmpt/list'    // list模板数据
        }
    }
}