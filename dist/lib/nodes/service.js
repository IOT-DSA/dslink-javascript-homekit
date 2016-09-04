"use strict";
const DS = require('dslink');
const HAP = require('hap-nodejs');
class ServiceNode extends DS.SimpleNode {
    constructor(path, provider, accessory) {
        super(path, provider);
        this.accessory = accessory;
    }
    load(map) {
        this.service = new HAP.Service(map.$name, map.$$uuid, map.$name);
        super.load(map);
        if (this.accessory != null) {
            this.accessory.addService(this.service);
        }
    }
    onRemoving() {
        if (this.accessory != null && this.service != null) {
            this.accessory.removeService(this.service);
            this.accessory = null;
            this.service = null;
        }
        super.onRemoving();
    }
}
exports.ServiceNode = ServiceNode;
