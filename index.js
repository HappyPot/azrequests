let axios = require('axios')
class Request {
    constructor(url, param, type = "JSON") {
        this.url = url
        this.param = param
        this.flag = true
        this.type = type
        this.resData = {}
    }
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
                if (flag) {
                    err(res.data.msg)
                    this.flag = false
                    return false;
                }
            }
        }).catch(err => {
            if (this.resData) {
                err(this.resData.data.code, this.resData.data.msg)
            } else {
                err(null, '服务器错误请稍后再试!')
            }
        })
    }
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

function init(url, param, type) {
    return new Request(url, param, type)
}

module.exports = init