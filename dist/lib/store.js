"use strict";
const DS = require('dslink');
const HAP = require('hap-nodejs');
const structure = require('./structure');
const util = require('./util');
const accessory = require('./nodes/accessory');
const service = require('./nodes/service');
const characteristic = require('./nodes/characteristic');
exports.accessories = [];
exports.store = new util.LifecycleStore();
exports.store.when('link', () => {
    const link = new DS.LinkProvider(process.argv.slice(2), 'HomeKit-', {
        defaultNodes: structure.defaultNodes,
        profiles: {
            accessory(path, provider) {
                return new accessory.AccessoryNode(path, provider);
            },
            service(path, provider) {
                const parentPath = new DS.Path(path).parent.parentPath;
                const a = provider.getNode(parentPath).accessory;
                return new service.ServiceNode(path, provider, a);
            },
            characteristic(path, provider) {
                const parentPath = new DS.Path(path).parentPath;
                const s = provider.getNode(parentPath).service;
                return new characteristic.CharacteristicNode(path, provider, s);
            },
            startBridge(path, provider) {
                return new DS.SimpleActionNode(path, provider, _ => {
                    if (link.val('/started'))
                        return;
                    exports.store.state.bridge();
                });
            },
            stopBridge(path, provider) {
                return new DS.SimpleActionNode(path, provider, _ => {
                    if (!link.val('/started'))
                        return;
                    exports.store.deleteKey('bridge');
                });
            },
            addAccessory(path, provider) {
                return new DS.SimpleActionNode(path, provider, (params, node) => {
                    const pathName = params.displayName.replace(/[\s\-\/]/g, "");
                    node.provider.addNode(`/accessories/${pathName}`, structure.accessoryStructure(params.displayName));
                });
            },
            addService(path, provider) {
                return new DS.SimpleActionNode(path, provider, (params, node) => {
                    const parentPath = new DS.Path(path).parentPath;
                    const pathName = params.displayName.replace(/[\s\-\/]/g, "");
                    node.provider.addNode(`${parentPath}/services/${pathName}`, structure.serviceStructure(params.displayName));
                });
            },
            addServicePrefab(path, provider) {
                return new DS.SimpleActionNode(path, provider, (params, node) => {
                    const parentPath = new DS.Path(path).parentPath;
                    const pathName = params.displayName.replace(/[\s\-\/]/g, "");
                    node.provider.addNode(`${parentPath}/services/${pathName}`, structure.servicePrefabStructure(params.displayName, params.type, params.includeOptionalCharacteristics));
                });
            },
            addCharacteristic(path, provider) {
                return new DS.SimpleActionNode(path, provider, (params, node) => {
                    const parentPath = new DS.Path(path).parentPath;
                    const pathName = params.name.replace(/[\s\-\/]/g, "");
                    const { name, format, unit, writable } = params;
                    node.provider.addNode(`${parentPath}/_${pathName}`, structure.characteristicStructure(name, format, unit, writable));
                });
            },
            addBounds(path, provider) {
                const parentPath = new DS.Path(path).parentPath;
                const c = provider.getNode(parentPath);
                return new DS.SimpleActionNode(path, provider, (params, node) => {
                    if (c.hasBounds())
                        return;
                    const { minValue, maxValue, minStep } = params;
                    c.addBounds(minValue, maxValue, minStep);
                });
            },
            remove(path, provider) {
                return new DS.SimpleActionNode(path, provider, (params, node) => {
                    node.parent.remove();
                });
            }
        }
    });
    return link;
});
exports.store.when('bridge', () => {
    const link = exports.store.state.link();
    const name = link.val('/name');
    const bridge = new HAP.Bridge(name, HAP.uuid.generate(name));
    console.log(link.val('/pincode'));
    bridge.publish({
        username: 'DC:FE:BA:AB:3F:27',
        port: 51826,
        pincode: link.val('/pincode'),
        category: HAP.Accessory.Categories.BRIDGE
    });
    bridge.addBridgedAccessories(exports.accessories);
    link.val('/started', true);
    return bridge;
});
exports.store.whenDelete('bridge', (bridge) => {
    util.unpublishAccessory(bridge);
    exports.store.state.link().val('/started', false);
});
