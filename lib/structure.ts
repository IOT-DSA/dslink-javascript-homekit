import DS = require('dslink');
import HAP = require('hap-nodejs');

export const defaultNodes: Object = {
  accessories: {
    '$is': 'node',
    '$name': 'Accessories'
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
    '?value': 'HomeKit + DSA'
  },
  pincode: {
    $is: 'node',
    $name: 'Bridge Pincode',
    $type: 'string',
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
    $invokable: 'write'
  },
  stopBridge: {
    $is: 'stopBridge',
    $name: 'Stop Bridge',
    $invokable: 'write'
  }
};

export function accessoryStructure(displayName: string): any {
  return {
    $is: 'accessory',
    $name: displayName,
    $$uuid: HAP.uuid.generate(displayName),
    remove: {
      '$is': 'removeAccessory',
      '$name': 'Remove Accessory',
      '$invokable': 'write'
    },
    addService: {
      '$is': 'addService',
      '$name': 'Add Service',
      '$invokable': 'write'
    }
  };
}

/*
export function serviceStructure() {
  
}
*/