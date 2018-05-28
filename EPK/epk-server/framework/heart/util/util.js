/**
 * 工具方法
 */

 const util = {
     /**
      * 生成随机id字符串
      */
     genRandomId: function() {
         return Math.random().toString(16).substr(2);
     },
     /**
      * 分布式锁-加锁
      */
     lock: async function (redis, lockKey, requestId, expireTime) {
         const SET_IF_NOT_EXIST = "NX";
         const SET_WITH_EXPIRE_TIME = "PX";

         const result = await redis.setAsync(lockKey, requestId, SET_IF_NOT_EXIST, SET_WITH_EXPIRE_TIME, expireTime);
         return result;
     },
     /**
      * 分布式锁-解锁
      */
     unlock: async function (redis, lockKey, requestId) {
         const value = await redis.getAsync(lockKey);
         if (requestId === value) {
             redis.del(lockKey);
             return 1;
         } else {
             return 0;
         }
     }
 }

 module.exports = util;