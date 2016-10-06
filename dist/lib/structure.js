"use strict";
var DS = require('dslink');
var HAP = require('hap-nodejs');
var types = require('./gen/types');
var util = require('./util');
var enumFormats = DS.buildEnumType([
    'BOOL',
    'INT',
    'FLOAT',
    'STRING',
    'UINT8',
    'UINT16',
    'UINT32',
    'UINT64',
]);
var hapToDSAFormats = {
    'INT': 'int',
    'UINT8': 'int',
    'UINT16': 'int',
    'UINT32': 'int',
    'UINT64': 'int',
    'BOOL': 'bool',
    'FLOAT': 'number',
    'STRING': 'string'
};
var defaultValues = {
    'int': 0,
    'number': 0,
    'bool': false,
    'string': ''
};
var enumUnits = DS.buildEnumType([
    'NONE',
    'CELSIUS',
    'PERCENTAGE',
    'ARC_DEGREE',
    'LUX',
    'SECONDS'
]);
var enumPrefabServices = DS.buildEnumType(Object.keys(types.types.services).filter(function (t) { return t.toLowerCase().indexOf('bridg') < 0 && t.toLowerCase().indexOf('tunnel') < 0; }));
exports.defaultNodes = {
    accessories: {
        $is: 'node',
        $name: 'Accessories'
    },
    addAccessory: {
        $is: 'addAccessory',
        $name: 'Add Accessory',
        $invokable: 'write',
        $params: [
            {
                name: 'displayName',
                type: 'string'
            }
        ]
    },
    name: {
        $is: 'node',
        $name: 'Bridge Name',
        $type: 'string',
        $writable: 'write',
        '?value': 'HomeKit + DSA'
    },
    pincode: {
        $is: 'node',
        $name: 'Bridge Pincode',
        $type: 'string',
        $writable: 'write',
        '?value': '465-46-465'
    },
    started: {
        $is: 'node',
        $name: 'Is Bridge Started',
        $type: 'bool',
        '?value': false
    },
    startBridge: {
        $is: 'startBridge',
        $name: 'Start Bridge',
        $invokable: 'write',
        $actionGroup: 'Bridge',
        $actionGroupSubTitle: 'Start'
    },
    stopBridge: {
        $is: 'stopBridge',
        $name: 'Stop Bridge',
        $invokable: 'write',
        $actionGroup: 'Bridge',
        $actionGroupSubTitle: 'Stop'
    },
    restartBridge: {
        $is: 'restartBridge',
        $name: 'Restart Bridge',
        $invokable: 'write',
        $actionGroup: 'Bridge',
        $actionGroupSubTitle: 'Restart'
    }
};
function accessoryStructure(displayName) {
    return {
        $is: 'accessory',
        $name: displayName,
        $$uuid: HAP.uuid.generate(displayName),
        services: {
            $is: 'node',
            $name: 'Services'
        },
        addServicePrefab: {
            $is: 'addServicePrefab',
            $name: 'Add Service Prefab',
            $actionGroup: 'Add Service',
            $actionGroupSubTitle: 'Prefab',
            $invokable: 'write',
            $params: [
                {
                    name: 'displayName',
                    type: 'string'
                },
                {
                    name: 'type',
                    type: enumPrefabServices
                },
                {
                    name: 'includeOptionalCharacteristics',
                    type: 'bool',
                    default: true
                }
            ]
        },
        addService: {
            $is: 'addService',
            $name: 'Add Service',
            $actionGroup: 'Add Service',
            $actionGroupSubTitle: 'Custom',
            $invokable: 'write',
            $params: [
                {
                    name: 'displayName',
                    type: 'string'
                }
            ]
        },
        remove: {
            $is: 'remove',
            $name: 'Remove Accessory',
            $invokable: 'write'
        }
    };
}
exports.accessoryStructure = accessoryStructure;
function serviceStructure(displayName) {
    return {
        $is: 'service',
        $name: displayName,
        $$uuid: HAP.uuid.generate(displayName),
        remove: {
            $is: 'remove',
            $name: 'Remove Service',
            $invokable: 'write'
        },
        addCharacteristic: {
            $is: 'addCharacteristic',
            $name: 'Add Characteristic',
            $invokable: 'write',
            $params: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'format',
                    type: enumFormats
                },
                {
                    name: 'unit',
                    type: enumUnits,
                    default: 'NONE'
                },
                {
                    name: 'writable',
                    type: 'bool',
                    default: true
                }
            ]
        }
    };
}
exports.serviceStructure = serviceStructure;
function characteristicStructure(displayName, format, unit, writable) {
    var dsaFormat = hapToDSAFormats[format] || 'dynamic';
    var map = {
        $is: 'characteristic',
        $name: displayName,
        $$uuid: HAP.uuid.generate(displayName),
        $$format: format,
        $$unit: unit,
        $type: dsaFormat,
        $$type: dsaFormat,
        $writable: 'write',
        '?value': defaultValues[dsaFormat] != null ? defaultValues[dsaFormat] : '',
        '?writable': writable,
        format: {
            $is: 'node',
            $name: 'Format',
            $type: enumFormats,
            '?value': format
        },
        unit: {
            $is: 'node',
            $name: 'Unit',
            $type: enumUnits,
            '?value': unit
        },
        removeCharacteristic: {
            $is: 'remove',
            $name: 'Remove Characteristic',
            $invokable: 'write'
        }
    };
    if (dsaFormat === 'number' || dsaFormat === 'int') {
        util.assign(map, {
            addBounds: {
                $is: 'addBounds',
                $name: 'Add Bounds',
                $invokable: 'write',
                $params: [
                    {
                        name: 'minValue',
                        type: dsaFormat
                    },
                    {
                        name: 'maxValue',
                        type: dsaFormat
                    },
                    {
                        name: 'minStep',
                        type: dsaFormat
                    }
                ]
            }
        });
    }
    return map;
}
exports.characteristicStructure = characteristicStructure;
function characteristicPrefabStructure(prefab, isRequired) {
    var uuid = prefab.uuid, prettyName = prefab.prettyName, format = prefab.format, perms = prefab.perms;
    var dsaFormat = hapToDSAFormats[format] || 'dynamic';
    var isEnum = prefab.validValues != null;
    var map = {
        $is: 'characteristic',
        $name: prettyName,
        $$uuid: uuid,
        $$format: format,
        $$prefab: 'true',
        $writable: 'write',
        '?writable': perms.filter(function (p) { return !!p; }).map(function (p) { return HAP.Characteristic.Perms[p]; }),
        format: {
            $is: 'node',
            $name: 'Format',
            $type: enumFormats,
            '?value': format
        }
    };
    if (isEnum) {
        var e = Object.keys(prefab.validValues);
        util.assign(map, {
            $type: DS.buildEnumType(e),
            $$type: dsaFormat,
            '?validValues': prefab.validValues
        });
    }
    else {
        map.$type = dsaFormat;
        map.$$type = dsaFormat;
        map['?value'] = defaultValues[dsaFormat] != null ? defaultValues[dsaFormat] : '';
    }
    if (prefab.unit != null) {
        util.assign(map, {
            $$unit: prefab.unit,
            unit: {
                $is: 'node',
                $name: 'Unit',
                $type: enumUnits,
                '?value': prefab.unit
            }
        });
    }
    if (!isRequired) {
        map.removeCharacteristic = {
            $is: 'remove',
            $name: 'Remove Characteristic',
            $invokable: 'write'
        };
    }
    if (prefab.minValue != null) {
        map.$$minValue = prefab.minValue;
        map.minValue = {
            $name: 'Minimum Value',
            $type: 'number',
            $writable: 'write',
            '?value': prefab.minValue
        };
    }
    if (prefab.maxValue != null) {
        map.$$maxValue = prefab.maxValue;
        map.maxValue = {
            $name: 'Maximum Value',
            $type: 'number',
            $writable: 'write',
            '?value': prefab.maxValue
        };
    }
    if (prefab.minStep != null) {
        map.$$minStep = prefab.minStep;
        map.minStep = {
            $name: 'Minimum Step',
            $type: 'number',
            $writable: 'write',
            '?value': prefab.minStep
        };
    }
    return map;
}
exports.characteristicPrefabStructure = characteristicPrefabStructure;
function servicePrefabStructure(displayName, type, includeOptionalCharacteristics) {
    var prefab = types.types.services[type];
    var map = {
        $is: 'service',
        $name: displayName,
        $$uuid: prefab.uuid,
        remove: {
            $is: 'remove',
            $name: 'Remove Service',
            $invokable: 'write'
        },
        addCharacteristic: {
            $is: 'addCharacteristic',
            $name: 'Add Characteristic',
            $invokable: 'write',
            $params: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'format',
                    type: enumFormats
                },
                {
                    name: 'unit',
                    type: enumUnits,
                    default: 'NONE'
                },
                {
                    name: 'writable',
                    type: 'bool',
                    default: true
                }
            ]
        }
    };
    prefab.required.forEach(function (name) {
        var cPrefab = types.types.characteristics[name];
        map[("_" + cPrefab.name)] = characteristicPrefabStructure(cPrefab, true);
    });
    if (includeOptionalCharacteristics) {
        prefab.optional.forEach(function (name) {
            var cPrefab = types.types.characteristics[name];
            map[("_" + cPrefab.name)] = characteristicPrefabStructure(cPrefab, false);
        });
    }
    return map;
}
exports.servicePrefabStructure = servicePrefabStructure;
