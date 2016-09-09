"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DS = require('dslink');
var HAP = require('hap-nodejs');
var store = require('../store');
var AccessoryNode = (function (_super) {
    __extends(AccessoryNode, _super);
    function AccessoryNode(path, provider) {
        _super.call(this, path, provider);
    }
    AccessoryNode.prototype.load = function (map) {
        store.accessories.push((this.accessory = new HAP.Accessory(map.$name, map.$$uuid)));
        _super.prototype.load.call(this, map);
        if (store.store.has('bridge')) {
            store.store.state.bridge().addBridgedAccessory(this.accessory, false);
        }
    };
    AccessoryNode.prototype.onRemoving = function () {
        if (this.accessory != null) {
            store.accessories.splice(store.accessories.indexOf(this.accessory));
            if (store.store.has('bridge')) {
                store.store.state.bridge().removeBridgedAccessory(this.accessory, false);
            }
            this.accessory = null;
        }
        _super.prototype.onRemoving.call(this);
    };
    return AccessoryNode;
}(DS.SimpleNode));
exports.AccessoryNode = AccessoryNode;
