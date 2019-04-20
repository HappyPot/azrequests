
# azrequests

[![axios](https://img.shields.io/badge/axios-%5E0.18.0-green.svg)](https://www.npmjs.com/package/azrequests)

A simple request plug-in ,Only suitable for data return format is
```javascript
{
    code:"success",
    msg:null,
    data:{}
}
```

## Installation
```shell
npm i azrequests -S
```

## Usage in components

```javascript
import azrequests from 'azrequests';
Vue.prototype.$http = azrequests;
```
## Usage in non-components
```javascript
let azrequests = require('azrequests')
azrequests(url,param,type).handlData(method,callback(res,err))
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
| url | 接口地址 | String ：eg：“https://api.apiopen.top/recommendPoetry” |
| param | 请求参数 | String or Object |
| type | 数据类型 | "formData" default：‘json’ |
| method | 请求方式 | ‘get’or‘post’ |
| callback | 回调函数 | res返回值，err错误信息 |
## License
MIT
Copyright (c) 2019-present, azrequests