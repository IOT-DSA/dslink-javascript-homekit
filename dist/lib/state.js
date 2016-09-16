"use strict";
var DS = require('dslink');
var HAP = require('hap-nodejs');
var structure = require('./structure');
var util = require('./util');
var accessory = require('./nodes/accessory');
var service = require('./nodes/service');
var characteristic = require('./nodes/characteristic');
exports.stateFactory = new util.StateFactory();
function startBridge() {
    var link = exports.stateFactory.state.link();
    var bridge = exports.stateFactory.state.bridge();
    var name = link.val('/name');
    var mac = util.getMac();
    bridge.displayName = name;
    bridge.UUID = HAP.uuid.generate(mac);
    bridge.getService(HAP.Service.AccessoryInformation)
        .setCharacteristic(HAP.Characteristic.Name, name);
    console.log('HomeKit Server Started!');
    console.log("ID (should be MAC address): " + mac);
    console.log("Pincode: " + link.val('/pincode'));
    bridge.publish({
        username: mac,
        port: 51826,
        pincode: link.val('/pincode'),
        category: HAP.Accessory.Categories.BRIDGE
    });
    link.val('/started', true);
}
exports.startBridge = startBridge;
function stopBridge() {
    var link = exports.stateFactory.state.link();
    var bridge = exports.stateFactory.state.bridge();
    util.unpublishAccessory(bridge);
    console.log('HomeKit Server Stopped!');
    link.val('/started', false);
}
exports.stopBridge = stopBridge;
exports.stateFactory.add('link', function () {
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
            restartBridge: function (path, provider) {
                return new DS.SimpleActionNode(path, provider, function (_) {
                    stopBridge();
                    startBridge();
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
exports.stateFactory.add('bridge', function () { return new HAP.Bridge('DSA Temporary Name', HAP.uuid.generate("DSA Temporary Name")); });
