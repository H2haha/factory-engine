/**
 * 请求参数配置
 * 1、访问配置
 * 2、业务api
 */

// schema
const http_schema = 'http://'
const https_schema = 'https://'

// 大地院线微服务
const app_name = 'v2'
const domain_online = 'api.douban.com'
const domain_dev = 'dev.douban.com'
const domain_test = 'test.douban.com'
const domain_pre = 'pre.douban.com'

// 模板微服务
const tmpt_host = 'localhost'
const port = '3088'

module.exports = {
    dadi: {
        // 大地院线接口统一配置
        config: {
            baseURL: `${http_schema}${domain_online}/${app_name}`,
            timeout: 5000,              // 接口请求超时时间(ms)
            responseType: 'json'        // 响应类型
        },
        // 微服务业务数据接口
        api: {
            hot: '/movie/in_theaters',  // 热门电影接口
            detail: '/movie/subject/'   // 电影详情接口
        }
    },
    tmpt: {
        // 模板微服务接口统一配置
        config: {
            baseURL: `${http_schema}${tmpt_host}:${port}`,
            timeout: 5000,              // 接口请求超时时间(ms)
            responseType: 'json'        // 响应类型
        },
        // 微服务模板数据接口
        api: {
            list: '/tmpt/list',         // list模板数据接口
        }
    }
}