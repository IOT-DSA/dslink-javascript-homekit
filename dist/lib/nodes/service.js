"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DS = require('dslink');
var HAP = require('hap-nodejs');
var ServiceNode = (function (_super) {
    __extends(ServiceNode, _super);
    function ServiceNode(path, provider, accessory) {
        _super.call(this, path, provider);
        this.accessory = accessory;
    }
    ServiceNode.prototype.load = function (map) {
        this.service = new HAP.Service(map.$name, map.$$uuid, map.$name);
        _super.prototype.load.call(this, map);
        if (this.accessory != null) {
            this.accessory.addService(this.service);
        }
    };
    ServiceNode.prototype.onRemoving = function () {
        if (this.accessory != null && this.service != null) {
            this.accessory.removeService(this.service);
            this.accessory = null;
            this.service = null;
        }
        _super.prototype.onRemoving.call(this);
    };
    return ServiceNode;
}(DS.SimpleNode));
exports.ServiceNode = ServiceNode;
