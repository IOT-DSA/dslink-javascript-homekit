import DS = require('dslink');
import HAP = require('hap-nodejs');

import structure = require('./structure');
import util = require('./util');

interface _State {
  link?: () => DS.LinkProvider;
  bridge?: () => HAP.Bridge;
}

export const store: util.LifecycleStore<_State> = new util.LifecycleStore<_State>();

store.when('link', () => {
  const link = new DS.LinkProvider(process.argv.slice(2), 'HomeKit-', {
    defaultNodes: structure.defaultNodes,
    profiles: {
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
      }
    }
  });

  return link;
});

store.when('bridge', () => {
  const link = store.state.link();
  const name: string = link.val('/name');

  const bridge = new HAP.Bridge(name, HAP.uuid.generate(name));

  bridge.publish({
    username: 'DC:FE:BA:AB:3F:27',
    port: 51826,
    pincode: link.val('/pincode'),
    category: HAP.Accessory.Categories.BRIDGE
  });

  link.val('/started', true);
  return bridge;
});

store.whenDelete('bridge', (bridge: HAP.Bridge) => {
  util.unpublishAccessory(bridge);
  store.state.link().val('/started', false);
});