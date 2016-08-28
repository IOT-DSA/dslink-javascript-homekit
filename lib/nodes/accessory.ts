import DS = require('dslink');
import HAP = require('hap-nodejs');

import store = require('../store');

export class AccessoryNode extends DS.SimpleNode {
  accessory: HAP.Accessory;

  constructor(path: string, provider: DS.SimpleNodeProvider) {
    super(path, provider);
  }

  load(map: any): any {
    super.load(map);

    store.accessories.push((this.accessory = new HAP.Accessory(map.$name, map.$$uuid)));

    if (store.store.has('bridge')) {
      store.store.state.bridge().addBridgedAccessory(this.accessory, false);
    }
  }

  onRemoving(): any {
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