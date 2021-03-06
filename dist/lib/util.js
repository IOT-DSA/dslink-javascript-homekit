"use strict";
var os = require('os');
function unpublishAccessory(acc) {
    acc._advertiser.stopAdvertising();
    acc._advertiser = null;
    clearInterval(acc._server._keepAliveTimerID);
    acc._server._httpServer._connections.forEach(function (s) { return s._onServerSocketClose(); });
    acc._server._httpServer._tcpServer.removeAllListeners();
    acc._server._httpServer._tcpServer.close();
    acc._server.removeAllListeners();
    acc._server = null;
    acc.removeAllListeners();
}
exports.unpublishAccessory = unpublishAccessory;
function getMac() {
    var okayInterfaces = ['eth0', 'eth1', 'en0', 'en1'];
    var interfaces = os.networkInterfaces();
    okayInterfaces.forEach(function (okay) {
        if (interfaces[okay]) {
            var list_1 = interfaces[okay];
            if (list_1.length > 0 && list_1[list_1.length - 1].mac)
                return list_1[list_1.length - 1].mac.toUpperCase();
        }
    });
    var keys = Object.keys(interfaces);
    var list = interfaces[keys[keys.length - 1]];
    if (list.length > 0 && list[list.length - 1].mac && list[list.length - 1].mac != '00:00:00:00:00:00')
        return list[list.length - 1].mac.toUpperCase();
    return 'DC:FE:BA:AB:3F:27';
}
exports.getMac = getMac;
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
