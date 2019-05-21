"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require('axios');

var Request = function () {
    function Request(url, param) {
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "json";
        var condition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "success";
        var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        _classCallCheck(this, Request);

        this.url = url;
        this.param = param;
        this.flag = true;
        this.type = type.toLowerCase();
        this.resData = {};
        this.headers = headers;
        this.condition = condition;
    }

    _createClass(Request, [{
        key: "processParame",
        value: function processParame(type) {
            if (type == 'formdata') {
                var $param = new FormData();
                for (var key in this.param) {
                    if (Object.prototype.toString.call(this.param[key]) === '[object Object]') {
                        $param.append(key, JSON.stringify(this.param[key]));
                    } else {
                        $param.append(key, this.param[key]);
                    }
                }
                this.param = $param;
            }
        }
        // post请求

    }, {
        key: "post",
        value: function post(success, err) {
            var _this = this;

            this.processParame(this.type);
            var postParam = {
                method: "post",
                url: this.url,
                data: this.param != null ? this.param : ''
            };
            if (this.headers) {
                postParam['headers'] = this.headers;
            }
            axios(postParam).then(function (res) {
                _this.resData = res;
                if (res.data.code == _this.condition) {
                    _this.flag = true;
                    success(res.data.data, null);
                } else {
                    if (_this.flag) {
                        err(null, res.data.msg);
                        _this.flag = false;
                        return false;
                    }
                }
            }).catch(function (error) {
                if (error) throw error;
                if (_this.resData) {
                    err(null, _this.resData.data.msg);
                } else {
                    err(null, '服务器错误请稍后再试!');
                }
            });
        }
        // get请求

    }, {
        key: "get",
        value: function get(success, err) {
            this.processParame(this.type);
            var postParam = {
                method: "post",
                url: this.url,
                data: this.param != null ? this.param : ''
            };
            if (this.headers) {
                postParam['headers'] = this.headers;
            }
            axios(postParam).then(function (res) {
                success(res);
            }).catch(function (error) {
                err(error);
            });
        }
        // 统一处理请求中的返回值

    }, {
        key: "handlData",
        value: function handlData(callback) {
            var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'post';

            if (method.toLowerCase() == 'post') {
                this.post(function (res) {
                    callback && callback(res);
                }, function (res, err) {
                    callback && callback(res, err);
                });
            } else {
                this.get(function (res) {
                    callback && callback(res);
                }, function (err, msg) {
                    callback && callback(err, msg);
                });
            }
        }
    }]);

    return Request;
}();
// 入口函数


function init(url, param, type, condition, headers) {
    return new Request(url, param, type, condition, headers);
}

module.exports = init;
// Allow use of default import syntax in TypeScript
module.exports.default = init;