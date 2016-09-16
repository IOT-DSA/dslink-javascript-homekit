import os = require('os');

// rather hacky, should PR later
export function unpublishAccessory(acc: any): void {
  // stop advertising on mdns
  acc._advertiser.stopAdvertising();
  acc._advertiser = null;
  
  // stop tcp server
  clearInterval(acc._server._keepAliveTimerID);
  acc._server._httpServer._connections.forEach(s => s._onServerSocketClose());

  acc._server._httpServer._tcpServer.removeAllListeners();
  acc._server._httpServer._tcpServer.close();
  
  acc._server.removeAllListeners();
  acc._server = null;

  acc.removeAllListeners();
}

export function getMac(): string {
  const okayInterfaces: string[] = ['eth0', 'eth1', 'en0', 'en1'];
  const interfaces: any = os.networkInterfaces();

  okayInterfaces.forEach(okay => {
    if (interfaces[okay]) {
      const list: any[] = interfaces[okay];
      if (list.length > 0 && list[list.length - 1].mac)
        return (<string>list[list.length - 1].mac).toUpperCase();
    }
  });

  const keys = Object.keys(interfaces);
  const list: any[] = interfaces[keys[keys.length - 1]];

  if (list.length > 0 && list[list.length - 1].mac && list[list.length - 1].mac != '00:00:00:00:00:00')
    return (<string>list[list.length - 1].mac).toUpperCase();

  return 'DC:FE:BA:AB:3F:27';
}

export function assign(dest, ...args) {
  var count = 0;
  var length = args.length;

  for(; count < length; count++) {
    var arg = args[count];

    for(var prop in arg) {
      if(arg.hasOwnProperty(prop)) {
        dest[prop] = arg[prop];
      }
    }
  }

  return dest;
}

export class StateFactory<T extends Object> {
  _state: Object;
  state: T;

  _values: Object;

  constructor() {
    this._state = {};
    
    this.state = <T>{};
    
    this._values = {};
  }
  
  add(name: string, cb: () => any): void {
    this._values[name] = cb;
    
    this.state[name] = () => this.get(name);
  }
  
  get(name: string): any {  
    if(this._state[name])
      return this._state[name];
      
    return (this._state[name] = this._values[name]());
  }
}