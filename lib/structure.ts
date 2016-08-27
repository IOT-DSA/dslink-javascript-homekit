export const defaultNodes: Object = {
  services: {
    
  },
  addService: {
    
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
    '?value': '123-45-678'
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
