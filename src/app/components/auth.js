/**
 * Created by homker on 15/11/24.
 */

let auth = function (userName, passWord, callback) {
    if (userName === 'admin' && passWord === 'admin') {
        callback({
            authed: true,
            token: Math.random().toString(36).substring(7)
        });
    } else {
        callback({
            authed: false
        });
    }
};

module.exports = {
    login: function (userName, passWord, callback) {
        let cb = arguments[arguments.length - 1];
        let self = this;
        if (localStorage.token) {
            cb && cb();
            this.onChange(true);
        }
        auth(userName, passWord, function (res) {
            if (res.authed) {
                localStorage.token = res.token;
                localStorage.user = userName;
                cb && cb(true);
                self.onChange(true);
            } else {
                cb && cb(false);
                self.onChange(false);
            }
        });
    },
    getUserName(){
        return localStorage.user;
    },
    logout: function () {
        delete localStorage.token;
        delete localStorage.user;
        this.onChange(false);
    },
    getToken: function () {
        return localStorage.token
    },
    isLogin: function () {
        return !!localStorage.token
    },
    onChange: function () {

    }
};