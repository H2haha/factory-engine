// 资源配置管理器

module.exports = {
    source: [
        {
            component: 'table',  // 该资源所属的组件
            url: 'http://baidu.com',   //具体资源
            exeTime: 5000   //资源执行时间
        },
        {
            component: 'list',  // 该资源所属的组件
            url: 'http://google.com',   //具体资源
            exeTime: 5000   //资源执行时间
        }
    ]
}