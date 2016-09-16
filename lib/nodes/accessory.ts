import DS = require('dslink');
import HAP = require('hap-nodejs');

import state = require('../state');

export class AccessoryNode extends DS.SimpleNode {
  accessory: HAP.Accessory;

  constructor(path: string, provider: DS.SimpleNodeProvider) {
    super(path, provider);
  }

  load(map: any): any {
    this.accessory = new HAP.Accessory(map.$name, map.$$uuid);
    super.load(map);
    
    state.stateFactory.state.bridge().addBridgedAccessory(this.accessory, false);
  }

  onRemoving(): any {
    if (this.accessory != null) {
      state.stateFactory.state.bridge().removeBridgedAccessory(this.accessory, false);
      this.accessory = null;
    }

    super.onRemoving();
  }
} 