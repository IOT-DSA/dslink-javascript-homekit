import DS = require('dslink');
import HAP = require('hap-nodejs');

import structure = require('./structure');
import util = require('./util');

import accessory = require('./nodes/accessory');
import service = require('./nodes/service');
import characteristic = require('./nodes/characteristic');

export function startBridge() {
  const name: string = link.val('/name');
  const mac: string = util.getMac();

  bridge.displayName = name;
  bridge.UUID = HAP.uuid.generate(mac);

  bridge.getService(HAP.Service.AccessoryInformation)
    .setCharacteristic(HAP.Characteristic.Name, name);

  console.log('HomeKit Server Started!');
  console.log(`ID (should be MAC address): ${mac}`);
  console.log(`Pincode: ${link.val('/pincode')}`);

  bridge.publish({
    username: mac,
    port: 51826,
    pincode: link.val('/pincode'),
    category: HAP.Accessory.Categories.BRIDGE
  });
  
  link.val('/started', true);
}

export function stopBridge() {
  util.unpublishAccessory(bridge);

  console.log('HomeKit Server Stopped!');
  link.val('/started', false);
}

export const link: DS.LinkProvider = new DS.LinkProvider(process.argv.slice(2), 'HomeKit-', {
  defaultNodes: structure.defaultNodes,
  profiles: {
    accessory(path: string, provider: DS.SimpleNodeProvider) {
      return new accessory.AccessoryNode(path, provider);
    },
    service(path: string, provider: DS.SimpleNodeProvider) {
      const parentPath = new DS.Path(path).parent.parentPath;

      const a = (<accessory.AccessoryNode>provider.getNode(parentPath)).accessory;
      return new service.ServiceNode(path, provider, a);
    },
    characteristic(path: string, provider: DS.SimpleNodeProvider) {
      const parentPath = new DS.Path(path).parentPath;

      const s = (<service.ServiceNode>provider.getNode(parentPath)).service;
      return new characteristic.CharacteristicNode(path, provider, s);
    },
    startBridge(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, _ => {
        if (link.val('/started'))
          return;
        startBridge();
      });
    },
    stopBridge(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, _ => {
        if (!link.val('/started'))
          return;
        stopBridge();
      });
    },
    restartBridge(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, _ => {
        stopBridge();
        startBridge();
      });
    },
    addAccessory(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, (params, node: DS.SimpleNode) => {
        const pathName = params.displayName.replace(/[\s\-\/]/g, "");
          
        node.provider.addNode(`/accessories/${pathName}`,
            structure.accessoryStructure(params.displayName));
      });
    },
    addService(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, (params, node: DS.SimpleNode) => {
        const parentPath = new DS.Path(path).parentPath;
        const pathName = params.displayName.replace(/[\s\-\/]/g, "");
          
        node.provider.addNode(`${parentPath}/services/${pathName}`,
            structure.serviceStructure(params.displayName));
      });
    },
    addServicePrefab(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, (params, node: DS.SimpleNode) => {
        const parentPath = new DS.Path(path).parentPath;
        const pathName = params.displayName.replace(/[\s\-\/]/g, "");
          
        node.provider.addNode(`${parentPath}/services/${pathName}`,
            structure.servicePrefabStructure(params.displayName, params.type, params.includeOptionalCharacteristics));
      });
    },
    addCharacteristic(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, (params, node: DS.SimpleNode) => {
        const parentPath = new DS.Path(path).parentPath;
        const pathName = params.name.replace(/[\s\-\/]/g, "");

        const { name, format, unit, writable } = params;
          
        node.provider.addNode(`${parentPath}/_${pathName}`,
            structure.characteristicStructure(name, format, unit, writable));
      });
    },
    addBounds(path: string, provider?: DS.SimpleNodeProvider) {
      const parentPath = new DS.Path(path).parentPath;
      const c = <characteristic.CharacteristicNode>provider.getNode(parentPath);

      return new DS.SimpleActionNode(path, provider, (params, node: DS.SimpleNode) => {
        if (c.hasBounds())
          return;

        const { minValue, maxValue, minStep } = params;
        c.addBounds(minValue, maxValue, minStep);
      });
    },
    remove(path: string, provider?: DS.SimpleNodeProvider) {
      return new DS.SimpleActionNode(path, provider, (params, node: DS.SimpleNode) => {
        node.parent.remove();
      });
    }
  }
});

export const bridge: HAP.Bridge = new HAP.Bridge('DSA Temporary Name',
    HAP.uuid.generate("DSA Temporary Name"));