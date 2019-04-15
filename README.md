# azrequests
针对公司的业务流程封装的请求插件
###在组件中的使用方式
```
let azrequests = require('azrequests')
new azrequests(url,param,type).handlData(method,callback(res,err))
```
###api
| 变量名 | 描述 | 默认值 |
| :------| ------: | :------: |
| url | 接口地址 | String ：例如“https://api.apiopen.top/recommendPoetry” |
| param | 请求参数 | String或者Object |
| type | 数据类型 | "formData" 默认值：‘json’ |
| method | 请求方式 | ‘get’或者‘post’ |
| callback | 回调函数 | res返回值，err错误信息 |
