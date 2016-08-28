// rather hacky, should PR later
export function unpublishAccessory(acc: any): void {
  // stop advertising on mdns
  acc._advertiser.stopAdvertising();
  acc._advertiser = null;
  
  // stop tcp server
  acc._server._httpServer._tcpServer.close();
  
  acc._server.removeAllListeners();
  acc._server = null;
}

export class LifecycleStore<T extends Object> {
  _state: Object;
  state: T;

  _when: Object;
  _whenDelete: Object;

  constructor() {
    this._state = {};
    
    this.state = <T>{};
    
    this._when = {};
    this._whenDelete = {};
  }
  
  when(name: string, cb: () => any): void {
    this._when[name] = cb;
    
    this.state[name] = () => this.get(name);
  }
  
  whenDelete(name: string, cb: (value: any) => void): void {
    this._whenDelete[name] = cb;
  }
  
  get(name: string): any {  
    if(this._state[name])
      return this._state[name];
      
    return (this._state[name] = this._when[name]());
  }

  has(name: string): boolean {
    return !!this._state[name];
  }
  
  deleteKey(name: string): void {
    if(this._whenDelete[name])
      this._whenDelete[name](this._state[name]);
    delete this._state[name];
  }
}