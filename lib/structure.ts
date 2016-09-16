import DS = require('dslink');
import HAP = require('hap-nodejs');

import types = require('./gen/types');
import util = require('./util');

const enumFormats = DS.buildEnumType([
  'BOOL',
  'INT',
  'FLOAT',
  'STRING',
  'UINT8',
  'UINT16',
  'UINT32',
  'UINT64',
  // 'TLV8'
]);

const hapToDSAFormats = {
  'INT': 'int',
  'UINT8': 'int',
  'UINT16': 'int',
  'UINT32': 'int',
  'UINT64': 'int',
  'BOOL': 'bool',
  'FLOAT': 'number',
  'STRING': 'string'
};

const defaultValues = {
  'int': 0,
  'number': 0,
  'bool': false,
  'string': ''
};

const enumUnits = DS.buildEnumType([
  'NONE',
  'CELSIUS',
  'PERCENTAGE',
  'ARC_DEGREE',
  'LUX',
  'SECONDS'
]);

const enumPrefabServices = DS.buildEnumType(Object.keys(types.types.services).filter(
    t => t.toLowerCase().indexOf('bridg') < 0 && t.toLowerCase().indexOf('tunnel') < 0));

export const defaultNodes: Object = {
  //* @Node accessories
  //* @Parent root
  //*
  //* A node that contains all of the HomeKit accessories added by the link.
  accessories: {
    $is: 'node',
    $name: 'Accessories'
  },
  //* @Action addAccessory
  //* @Is addAccessory
  //* @Parent root
  //*
  //* Adds a HomeKit accessory to the link. This accessory can be found in Accessories,
  //* and should be viewable in HomeKit after connecting to the default bridge accessory.
  //*
  //* @Param displayName string Name that is used for the accessory by the link and HomeKit.
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
  //* @Node name
  //* @Parent root
  //*
  //* Name for the bridge accessory. By default, this value is 'HomeKit + DSA'.
  //*
  //* @Value string write
  name: {
    $is: 'node',
    $name: 'Bridge Name',
    $type: 'string',
    $writable: 'write',
    '?value': 'HomeKit + DSA'
  },
  //* @Node pincode
  //* @Parent root
  //*
  //* Pin-code for the bridge accessory. By default, this value is '465-46-465'.
  //*
  //* @Value string write
  pincode: {
    $is: 'node',
    $name: 'Bridge Pincode',
    $type: 'string',
    $writable: 'write',
    '?value': '465-46-465'
  },
  //* @Node started
  //* @Parent root
  //*
  //* Indicates if the bridge accessory is currently running.
  //*
  //* @Value bool
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

export function accessoryStructure(displayName: string): any {
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

export function serviceStructure(displayName: string): any {
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

export function characteristicStructure(displayName: string, format: string, unit: string,
    writable: boolean) {
  const dsaFormat = hapToDSAFormats[format] || 'dynamic';
  
  const map = {
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

interface _CharacteristicPrefab {
  uuid: string;
  prettyName: string;
  name: string;
  format: string;
  perms: string[];
  unit?: string;
  validValues?: any;
  minValue?: number;
  maxValue?: number;
  minStep?: number;
}

export function characteristicPrefabStructure(prefab: _CharacteristicPrefab, isRequired: boolean) {
  const { uuid, prettyName, format, perms } = prefab;
  const dsaFormat = hapToDSAFormats[format] || 'dynamic';

  const isEnum = prefab.validValues != null;
  
  const map: any = {
    $is: 'characteristic',
    $name: prettyName,
    $$uuid: uuid,
    $$format: format,
    $$prefab: 'true',
    $writable: 'write',
    '?writable': perms.filter(p => !!p).map(p => HAP.Characteristic.Perms[p]),
    format: {
      $is: 'node',
      $name: 'Format',
      $type: enumFormats,
      '?value': format
    }
  }; 

  if (isEnum) {
    const e = Object.keys(prefab.validValues);
    util.assign(map, {
      $type: DS.buildEnumType(e),
      $$type: dsaFormat,
      '?validValues': prefab.validValues
    });
  } else {
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

interface _ServicePrefab {
  uuid: string;
  prettyName: string;
  name: string;
  required: string[];
  optional: string[];
}

export function servicePrefabStructure(displayName: string, type: string, includeOptionalCharacteristics: boolean): any {
  const prefab: _ServicePrefab = types.types.services[type];

  var map: any = {
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

  prefab.required.forEach(name => {
    const cPrefab: _CharacteristicPrefab = types.types.characteristics[name];

    map[`_${cPrefab.name}`] = characteristicPrefabStructure(cPrefab, true);
  });

  if (includeOptionalCharacteristics) {
    prefab.optional.forEach(name => {
      const cPrefab: _CharacteristicPrefab = types.types.characteristics[name];
    
      map[`_${cPrefab.name}`] = characteristicPrefabStructure(cPrefab, false);
    });
  }

  return map;
}