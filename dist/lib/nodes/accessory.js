"use strict";
const DS = require('dslink');
const HAP = require('hap-nodejs');
const store = require('../store');
class AccessoryNode extends DS.SimpleNode {
    constructor(path, provider) {
        super(path, provider);
    }
    load(map) {
        store.accessories.push((this.accessory = new HAP.Accessory(map.$name, map.$$uuid)));
        super.load(map);
        if (store.store.has('bridge')) {
            store.store.state.bridge().addBridgedAccessory(this.accessory, false);
        }
    }
    onRemoving() {
        if (this.accessory != null) {
            store.accessories.splice(store.accessories.indexOf(this.accessory));
            if (store.store.has('bridge')) {
                store.store.state.bridge().removeBridgedAccessory(this.accessory, false);
            }
            this.accessory = null;
        }
        super.onRemoving();
    }
}
exports.AccessoryNode = AccessoryNode;
