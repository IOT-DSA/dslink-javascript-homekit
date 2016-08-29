import DS = require('dslink');
import HAP = require('hap-nodejs');

import structure = require('./structure');
import util = require('./util');

import accessory = require('./nodes/accessory');
import service = require('./nodes/service');
import characteristic = require('./nodes/characteristic');

interface _State {
  link?: () => DS.LinkProvider;
  bridge?: () => HAP.Bridge;
}

export const accessories: HAP.Accessory[] = [];

export const store: util.LifecycleStore<_State> = new util.LifecycleStore<_State>();

store.when('link', () => {
  const link = new DS.LinkProvider(process.argv.slice(2), 'HomeKit-', {
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
          store.state.bridge();
        });
      },
      stopBridge(path: string, provider?: DS.SimpleNodeProvider) {
        return new DS.SimpleActionNode(path, provider, _ => {
          if (!link.val('/started'))
            return;
          store.deleteKey('bridge');
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

  return link;
});

store.when('bridge', () => {
  const link = store.state.link();
  const name: string = link.val('/name');

  const bridge = new HAP.Bridge(name, HAP.uuid.generate(name));
  console.log(link.val('/pincode'));

  bridge.publish({
    username: 'DC:FE:BA:AB:3F:27',
    port: 51826,
    pincode: link.val('/pincode'),
    category: HAP.Accessory.Categories.BRIDGE
  });
  
  bridge.addBridgedAccessories(accessories);

  link.val('/started', true);
  return bridge;
});

store.whenDelete('bridge', (bridge: HAP.Bridge) => {
  util.unpublishAccessory(bridge);
  store.state.link().val('/started', false);
});