let axios = require('axios')
class Request {
    constructor(url, param, type = "JSON") {
        this.url = url
        this.param = param
        this.flag = true
        this.type = type
        this.resData = {}
    }
    // post请求
    post(success, err) {
        if (this.type == 'formData') {
            var $param = new FormData()
            for (let key in this.param) {
                if (Object.prototype.toString.call(this.param[key]) === '[object Object]') {
                    $param.append(key, JSON.stringify(this.param[key]))
                } else {
                    $param.append(key, this.param[key])
                }
            }
            this.param = $param
        }
        axios({
            method: "post",
            url: this.url,
            data: this.param != null ? this.param : ''
        }).then(res => {
            this.resData = res
            if (res.data.code > 0) {
                this.flag = true
                success(res)
            } else {
                if (this.flag) {
                    err(res.data.msg)
                    this.flag = false
                    return false;
                }
            }
        }).catch(error => {
            if (this.resData) {
                err(this.resData.data.code, this.resData.data.msg)
            } else {
                err(null, '服务器错误请稍后再试!')
            }
        })
    }
    // get请求
    get(success, err) {
        axios({
            method: "get",
            url: this.url,
            data: this.param != null ? this.param : ''
        }).then(res => {
            success(res);
        }).catch(error => {
            err(error)
        })
    }
    // 统一处理请求中的返回值
    handlData(method, callback) {
        if (method.toLowerCase() == 'post') {
            this.post((res) => {
                callback && callback(res)
            }, (err, msg) => {
                callback && callback(err, msg)
            })
        } else {
            this.get(res => {
                callback && callback(res)
            }, (err, msg) => {
                callback && callback(err, msg)
            })
        }
    }
}
// 入口函数
function init(url, param, type) {
    return new Request(url, param, type)
}

module.exports = init