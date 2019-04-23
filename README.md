
# azrequests

[![axios](https://img.shields.io/badge/axios-%5E0.18.0-green.svg)](https://www.npmjs.com/package/azrequests)

A simple request plug-in ,Only suitable for data return format is
```javascript
{
    code:"success",
    msg:null,
    data:{}
}
or
{
    code:200,
    msg:"success",
    data:{}
}
etc
```

## Installation
```shell
npm i azrequests -S
```

## Usage in components

```javascript
import azrequests from 'azrequests';
Vue.prototype.$http = azrequests;

this.$http(url,param,type,headers).handlData(method,callback(res,err))
```
## Usage in non-components
```javascript
let azrequests = require('azrequests')
azrequests(url,param,type,headers).handlData(method,callback(res,err))
```

## Example

Performing a `POST` request

```js
// Make a request for news with a given type
azrequests('http://v.juhe.cn/toutiao/index', {
    type: 'shehui'
}).handlData('post', (res, err) => {
    console.log('res: ', res);
})

```

Performing a `GET` request

```js
// Make a request for news with a given type
azrequests('http://v.juhe.cn/toutiao/index', {
    type: 'shehui'
}).handlData('get', (res, err) => {
    console.log('res: ', res);
})
```

###API
| 变量名 | 描述 | 默认值 |
| :------| ------: | :------: |
| url | 接口地址 | 必选 String ：eg：“https://api.apiopen.top/recommendPoetry” |
| param | 请求参数 | 必选 String or Object |
| type | 数据类型 | 可选 "formData" default：‘json’ |
| headers | 请求头 | 可选 |
| condition | 成功的判断条件 | 可选 默认："success" eg:condition = 200|
| method | 请求方式 | 必选 ‘get’or‘post’ |
| callback | 回调函数 | res返回值，err错误信息 |
## License
MIT
Copyright (c) 2019-present, azrequests