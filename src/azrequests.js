let axios = require('axios')
url, param, type = "json", condition = "success", headers = null
class Request {
    constructor($obj) {
        this.url = $obj.url
        this.param = $obj.param || {}
        this.type = $obj.type.toLowerCase() || "json"
        this.headers = $obj.headers || null
        this.condition = $obj.condition || "success"
        this.dataStructure = $obj.dataStructure || {
            code,
            data,
            msg
        }
        this.flag = true
        this.resData = {}
    }
    processParame(type) {
        if (type == 'formdata') {
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
    }
    // post请求
    post(success, err) {
        this.processParame(this.type)
        let postParam = {
            method: "post",
            url: this.url,
            data: this.param != null ? this.param : '',
        }
        if (this.headers) {
            postParam['headers'] = this.headers
        }
        axios(postParam).then(res => {
            this.resData = res
            if (res.data[this.dataStructure.code] == this.condition) {
                this.flag = true
                success(res.data[this.dataStructure.data], null)
            } else {
                if (this.flag) {
                    err(null, res.data[this.dataStructure.msg])
                    this.flag = false
                    return false;
                }
            }
        }).catch(error => {
            if (error) throw error
            if (this.resData) {
                err(null, this.resData.data[this.dataStructure.msg])
            } else {
                err(null, '服务器错误请稍后再试!')
            }
        })
    }
    // get请求
    get(success, err) {
        this.processParame(this.type)
        let postParam = {
            method: "get",
            url: this.url,
            data: this.param != null ? this.param : '',
        }
        if (this.headers) {
            postParam['headers'] = this.headers
        }
        axios(postParam).then(res => {
            success(res);
        }).catch(error => {
            err(error)
        })
    }
    // 统一处理请求中的返回值
    handlData(callback, method = 'post') {
        if (method.toLowerCase() == 'post') {
            this.post((res) => {
                callback && callback(res)
            }, (res, err) => {
                callback && callback(res, err)
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
function init($obj) {
    return new Request($obj)
}

module.exports = init
// Allow use of default import syntax in TypeScript
module.exports.default = init;