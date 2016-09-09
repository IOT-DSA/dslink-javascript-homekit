"use strict";
var DS = require('dslink');
var HAP = require('hap-nodejs');
var structure = require('./structure');
var util = require('./util');
var accessory = require('./nodes/accessory');
var service = require('./nodes/service');
var characteristic = require('./nodes/characteristic');
exports.accessories = [];
exports.store = new util.LifecycleStore();
exports.store.when('link', function () {
    var link = new DS.LinkProvider(process.argv.slice(2), 'HomeKit-', {
        defaultNodes: structure.defaultNodes,
        profiles: {
            accessory: function (path, provider) {
                return new accessory.AccessoryNode(path, provider);
            },
            service: function (path, provider) {
                var parentPath = new DS.Path(path).parent.parentPath;
                var a = provider.getNode(parentPath).accessory;
                return new service.ServiceNode(path, provider, a);
            },
            characteristic: function (path, provider) {
                var parentPath = new DS.Path(path).parentPath;
                var s = provider.getNode(parentPath).service;
                return new characteristic.CharacteristicNode(path, provider, s);
            },
            startBridge: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (_) {
                    if (link.val('/started'))
                        return;
                    exports.store.state.bridge();
                });
            },
            stopBridge: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (_) {
                    if (!link.val('/started'))
                        return;
                    exports.store.deleteKey('bridge');
                });
            },
            addAccessory: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (params, node) {
                    var pathName = params.displayName.replace(/[\s\-\/]/g, "");
                    node.provider.addNode("/accessories/" + pathName, structure.accessoryStructure(params.displayName));
                });
            },
            addService: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (params, node) {
                    var parentPath = new DS.Path(path).parentPath;
                    var pathName = params.displayName.replace(/[\s\-\/]/g, "");
                    node.provider.addNode(parentPath + "/services/" + pathName, structure.serviceStructure(params.displayName));
                });
            },
            addServicePrefab: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (params, node) {
                    var parentPath = new DS.Path(path).parentPath;
                    var pathName = params.displayName.replace(/[\s\-\/]/g, "");
                    node.provider.addNode(parentPath + "/services/" + pathName, structure.servicePrefabStructure(params.displayName, params.type, params.includeOptionalCharacteristics));
                });
            },
            addCharacteristic: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (params, node) {
                    var parentPath = new DS.Path(path).parentPath;
                    var pathName = params.name.replace(/[\s\-\/]/g, "");
                    var name = params.name, format = params.format, unit = params.unit, writable = params.writable;
                    node.provider.addNode(parentPath + "/_" + pathName, structure.characteristicStructure(name, format, unit, writable));
                });
            },
            addBounds: function (path, provider) {
                var parentPath = new DS.Path(path).parentPath;
                var c = provider.getNode(parentPath);
                return new DS.SimpleActionNode(path, provider, function (params, node) {
                    if (c.hasBounds())
                        return;
                    var minValue = params.minValue, maxValue = params.maxValue, minStep = params.minStep;
                    c.addBounds(minValue, maxValue, minStep);
                });
            },
            remove: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (params, node) {
                    node.parent.remove();
                });
            }
        }
    });
    return link;
});
exports.store.when('bridge', function () {
    var link = exports.store.state.link();
    var name = link.val('/name');
    var bridge = new HAP.Bridge(name, HAP.uuid.generate(name));
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
exports.store.whenDelete('bridge', function (bridge) {
    util.unpublishAccessory(bridge);
    exports.store.state.link().val('/started', false);
});
