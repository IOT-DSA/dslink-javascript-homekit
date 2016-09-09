"use strict";
// rather hacky, should PR later
function unpublishAccessory(acc) {
    // stop advertising on mdns
    acc._advertiser.stopAdvertising();
    acc._advertiser = null;
    // stop tcp server
    acc._server._httpServer._tcpServer.close();
    acc._server.removeAllListeners();
    acc._server = null;
}
exports.unpublishAccessory = unpublishAccessory;
function assign(dest) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var count = 0;
    var length = args.length;
    for (; count < length; count++) {
        var arg = args[count];
        for (var prop in arg) {
            if (arg.hasOwnProperty(prop)) {
                dest[prop] = arg[prop];
            }
        }
    }
    return dest;
}
exports.assign = assign;
var LifecycleStore = (function () {
    function LifecycleStore() {
        this._state = {};
        this.state = {};
        this._when = {};
        this._whenDelete = {};
    }
    LifecycleStore.prototype.when = function (name, cb) {
        var _this = this;
        this._when[name] = cb;
        this.state[name] = function () { return _this.get(name); };
    };
    LifecycleStore.prototype.whenDelete = function (name, cb) {
        this._whenDelete[name] = cb;
    };
    LifecycleStore.prototype.get = function (name) {
        if (this._state[name])
            return this._state[name];
        return (this._state[name] = this._when[name]());
    };
    LifecycleStore.prototype.has = function (name) {
        return !!this._state[name];
    };
    LifecycleStore.prototype.deleteKey = function (name) {
        if (this._whenDelete[name])
            this._whenDelete[name](this._state[name]);
        delete this._state[name];
    };
    return LifecycleStore;
}());
exports.LifecycleStore = LifecycleStore;
