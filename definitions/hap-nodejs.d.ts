// Type definitions for HAP-NodeJS 0.3.2
// Definitions by: Michael Bullington <Michael.Bullington@AcuityBrands.com>

declare namespace __Hap {
  function init(storagePath?: string): void;

  interface _UUID {
    generate(data: string): string;
    isValid(UUID: string): boolean;
  }

  var uuid: _UUID;

  class _EventEmitter implements NodeJS.EventEmitter {
    // EventEmitter
    addListener(event: string, listener: Function): this;
    on(event: string, listener: Function): this;
    once(event: string, listener: Function): this;
    removeListener(event: string, listener: Function): this;
    removeAllListeners(event?: string): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string): Function[];
    emit(event: string, ...args: any[]): boolean;
    listenerCount(type: string): number;
  }

  interface _CharacteristicFormats {
    BOOL: string;
    INT: string;
    FLOAT: string;
    STRING: string;
    ARRAY: string;
    DICTIONARY: string;
    UINT8: string;
    UINT16: string;
    UINT32: string;
    UINT64: string;
    DATA: string;
    TLV8: string;
  }

  interface _CharacteristicUnits {
    CELSIUS: string;
    PERCENTAGE: string;
    ARC_DEGREE: string;
    LUX: string;
    SECONDS: string;
  }

  interface _CharacteristicPerms {
    READ: string;
    WRITE: string;
    NOTIFY: string;
    HIDDEN: string;
  }

  interface _CharacteristicProps {
    format?: string;
    unit?: string;
    minValue?: number;
    maxValue?: number;
    minStep?: number;
    perms?: string[];
  }

  class Characteristic extends _EventEmitter {
    static Name: Characteristic;

    static Formats: _CharacteristicFormats;
    static Units: _CharacteristicUnits;
    static Perms: _CharacteristicPerms;

    displayName: string;
    UUID: string;
    
    value: any;
    props: _CharacteristicProps;

    constructor(displayName: string, UUID: string, props?: _CharacteristicProps);

    setProps(props: _CharacteristicProps): Characteristic;
    getValue(callback: Function, context: any): void;
    setValue(newValue: any, callback: Function, context: any): Characteristic;
    getDefaultValue(): any;

    toHAP(opt?: any): string;
  }

  class Service extends _EventEmitter {
    static AccessoryInformation: Service;

    displayName: string;
    UUID: string;
    subtype: string;

    characteristics: Characteristic[];
    optionalCharacteristics: Characteristic[];

    constructor(displayName: string, UUID: string, subtype: string);

    addCharacteristic(characteristic: Characteristic): Characteristic;
    addOptionalCharacteristic(characteristic: Characteristic): void;

    removeCharacteristic(characteristic: Characteristic): void;
    
    getCharacteristic(name: string): Characteristic;
    getCharacteristicByIID(iid: string): Characteristic;

    testCharacteristic(name: string): boolean;
    setCharacteristic(name: string | Characteristic, value: any): Service;

    toHAP(opt?: any): string;
  }

  interface _AccessoryCategories {
    OTHER: number;
    BRIDGE: number;
    FAN: number;
    GARAGE_DOOR_OPENER: number;
    LIGHTBULB: number;
    DOOR_LOCK: number;
    OUTLET: number;
    SWITCH: number;
    THERMOSTAT: number;
    SENSOR: number;
    ALARM_SYSTEM: number;
    DOOR: number;
    WINDOW: number;
    WINDOW_COVERING: number;
    PROGRAMMABLE_SWITCH: number;
    RANGE_EXTENDER: number;
  }

  interface _AccessoryPublishInfo {
    username: string;
    port: number;
    pincode: string;
    category: number;
  }

  class Accessory extends _EventEmitter {
    static Categories: _AccessoryCategories;
    
    displayName : string;
    UUID: string;

    bridged: boolean;
    bridgedAccessories: Accessory[];

    category: number;

    constructor(displayName : string, UUID: string);

    addService(service: Service): Service;
    removeService(service: Service): void;

    getService(name: string | Service): Service;

    updateReachability(reachable: boolean): void;

    addBridgedAccessory(accessory: Accessory, deferUpdate: boolean): Accessory;
    addBridgedAccessories(accessories: Accessory[]): void;

    removeBridgedAccessory(accessory: Accessory, deferUpdate: boolean): void;
    removeBridgedAccessories(accessories: Accessory[]);

    getBridgedAccessoryByAID(aid: string): Accessory;

    getCharacteristicByIID(iid: string): Characteristic;
    findCharacteristic(aid: string, iid: string): boolean;

    toHAP(opt?: any): string;

    publish(info: _AccessoryPublishInfo, allowInsecureRequest?: boolean): void;
  }

  class Bridge extends Accessory {
    constructor(displayName : string, UUID: string);
  }

  interface _AccessoryLoader {
    loadDirectory(dir: string): Accessory[];

    parseAccessoryJSON(json: Object): Accessory;
    parseServiceJSON(json: Object): Service;
    parseCharacteristicJSON(json: Object): Characteristic;
  }

  var AccessoryLoader: _AccessoryLoader;
}

declare module "hap-nodejs" {
    export = __Hap;
}