import DS = require('dslink');
import HAP = require('hap-nodejs');

export class CharacteristicNode extends DS.SimpleNode {
  characteristic: HAP.Characteristic;
  service: HAP.Service;

  constructor(path: string, provider: DS.SimpleNodeProvider, service: HAP.Service) {
    super(path, provider);

    this.service = service;
  }

  load(map: any): any {
    super.load(map);
    
    const validValues = map['?validValues'];
    const writable = map['?writable'];

    this.characteristic = new HAP.Characteristic(map.$name, map.$$uuid, {
      format: HAP.Characteristic.Formats[map.$$format],
      perms: (writable && Array.isArray(writable)) ? writable : (writable ?
        [HAP.Characteristic.Perms.READ, HAP.Characteristic.Perms.WRITE,
            HAP.Characteristic.Perms.NOTIFY] :
        [HAP.Characteristic.Perms.READ, HAP.Characteristic.Perms.NOTIFY])
    });

    if (map.$$unit) {
      this.characteristic.setProps({ unit: map.$$unit });
    }

    this.characteristic.setValue(map['?value'], null, null);

    this.subscribe(value => {
      try {
        if (validValues != null) {
          this.characteristic.setValue(validValues[value.value], null, null);
          return;
        }

        this.characteristic.setValue(value.value, null, null);
      } catch(e) {
        console.log(e);
      }
    });

    if (writable) {
      this.characteristic.on('change', change => {
        let value = change.newValue;

        if (validValues != null) {
          Object.keys(validValues).forEach(key => {
            if (validValues[key] === value) {
              value = key;
            }
          });
        }

        if (this.value !== value) {
          this.updateValue(value);
        }
      });
    }

    if (this.service != null) {
      if (map.$$prefab && map.removeCharacteristic) {
        this.service.addOptionalCharacteristic(this.characteristic);
        return;
      }

      this.service.addCharacteristic(this.characteristic);
    }
  }

  onRemoving(): any {
    if (this.service != null && this.characteristic != null) {
      this.service.removeCharacteristic(this.characteristic);

      this.characteristic.removeAllListeners('change');

      this.service = null;
      this.characteristic = null;
    }

    super.onRemoving();
  }

  hasBounds(): boolean {
    return Object.keys(this.children).indexOf('minValue') != -1;
  }

  addBounds(minValue: number, maxValue: number, minStep: number): void {
    this.provider.addNode(`${this.path}/minValue`, {
      $name: 'Minimum Value',
      $type: 'number',
      $writable: 'write',
      '?value': minValue
    });

    this.children['minValue'].subscribe(value => {
      this.characteristic.setProps({ minValue: value.value });
    });

    this.provider.addNode(`${this.path}/maxValue`, {
      $name: 'Maximum Value',
      $type: 'number',
      $writable: 'write',
      '?value': maxValue
    });

    this.children['maxValue'].subscribe(value => {
      this.characteristic.setProps({ maxValue: value.value });
    });

    this.provider.addNode(`${this.path}/minStep`, {
      $name: 'Minimum Step',
      $type: 'number',
      $writable: 'write',
      '?value': minStep
    });

    this.children['minStep'].subscribe(value => {
      this.characteristic.setProps({ minStep: value.value });
    });

    this.characteristic.setProps({
      minValue,
      maxValue,
      minStep
    });
  }
} 