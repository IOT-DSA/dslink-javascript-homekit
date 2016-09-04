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
class LifecycleStore {
    constructor() {
        this._state = {};
        this.state = {};
        this._when = {};
        this._whenDelete = {};
    }
    when(name, cb) {
        this._when[name] = cb;
        this.state[name] = () => this.get(name);
    }
    whenDelete(name, cb) {
        this._whenDelete[name] = cb;
    }
    get(name) {
        if (this._state[name])
            return this._state[name];
        return (this._state[name] = this._when[name]());
    }
    has(name) {
        return !!this._state[name];
    }
    deleteKey(name) {
        if (this._whenDelete[name])
            this._whenDelete[name](this._state[name]);
        delete this._state[name];
    }
}
exports.LifecycleStore = LifecycleStore;
