import DS = require('dslink');
import HAP = require('hap-nodejs');

export class ServiceNode extends DS.SimpleNode {
  service: HAP.Service;
  accessory: HAP.Accessory;

  constructor(path: string, provider: DS.SimpleNodeProvider, accessory: HAP.Accessory) {
    super(path, provider);

    this.accessory = accessory;
  }

  load(map: any): any {
    super.load(map);

    this.service = new HAP.Service(map.$name,
        map.$$uuid, map.$name);

    if (this.accessory != null) {
      this.accessory.addService(this.service);
    }
  }

  onRemoving(): any {
    if (this.accessory != null && this.service != null) {
      this.accessory.removeService(this.service);
      
      this.accessory = null;
      this.service = null;
    }

    super.onRemoving();
  }
} 