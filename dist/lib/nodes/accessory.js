"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DS = require('dslink');
var HAP = require('hap-nodejs');
var state = require('../state');
var AccessoryNode = (function (_super) {
    __extends(AccessoryNode, _super);
    function AccessoryNode(path, provider) {
        _super.call(this, path, provider);
    }
    AccessoryNode.prototype.load = function (map) {
        this.accessory = new HAP.Accessory(map.$name, map.$$uuid);
        _super.prototype.load.call(this, map);
        state.bridge.addBridgedAccessory(this.accessory, false);
    };
    AccessoryNode.prototype.onRemoving = function () {
        if (this.accessory != null) {
            state.bridge.removeBridgedAccessory(this.accessory, false);
            this.accessory = null;
        }
        _super.prototype.onRemoving.call(this);
    };
    return AccessoryNode;
}(DS.SimpleNode));
exports.AccessoryNode = AccessoryNode;
