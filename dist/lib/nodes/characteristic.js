"use strict";
const DS = require('dslink');
const HAP = require('hap-nodejs');
class CharacteristicNode extends DS.SimpleNode {
    constructor(path, provider, service) {
        super(path, provider);
        this.service = service;
    }
    load(map) {
        super.load(map);
        const convert = (type) => {
            if (map.$$type === 'int' || map.$$type === 'number')
                return parseFloat(type);
            if (map.$$type === 'bool')
                return type === 'type';
            return type;
        };
        const validValues = map['?validValues'];
        const writable = map['?writable'];
        this.characteristic = new HAP.Characteristic(map.$name, map.$$uuid, {
            format: HAP.Characteristic.Formats[map.$$format],
            perms: !!map.$$perms ? map.$$perms : ((writable && Array.isArray(writable)) ? writable : (writable ?
                [HAP.Characteristic.Perms.READ, HAP.Characteristic.Perms.WRITE,
                    HAP.Characteristic.Perms.NOTIFY] :
                [HAP.Characteristic.Perms.READ, HAP.Characteristic.Perms.NOTIFY]))
        });
        this.characteristic.value = this.characteristic.getDefaultValue();
        this.configs = Object.assign(this.configs, {
            $$perms: this.characteristic.props.perms
        });
        if (map.$$unit) {
            this.characteristic.setProps({ unit: map.$$unit });
        }
        this.subscribe(value => {
            try {
                if (validValues != null) {
                    const val = convert(validValues[value.value]);
                    this.characteristic.setValue(val, null, null);
                    return;
                }
                this.characteristic.setValue(convert(value.value), null, null);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.characteristic.on('change', change => {
            let value = change.newValue;
            if (validValues != null) {
                Object.keys(validValues).forEach(key => {
                    if (validValues[key] === value.toString()) {
                        value = key;
                    }
                });
            }
            if (this.value !== value) {
                this.updateValue(value);
            }
        });
        if (this.service != null) {
            if (map.$$prefab && map.removeCharacteristic) {
                this.service.addOptionalCharacteristic(this.characteristic);
                return;
            }
            this.service.addCharacteristic(this.characteristic);
        }
    }
    onRemoving() {
        if (this.service != null && this.characteristic != null) {
            this.service.removeCharacteristic(this.characteristic);
            this.characteristic.removeAllListeners('change');
            this.service = null;
            this.characteristic = null;
        }
        super.onRemoving();
    }
    hasBounds() {
        return Object.keys(this.children).indexOf('minValue') != -1;
    }
    addBounds(minValue, maxValue, minStep) {
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
            minValue: minValue,
            maxValue: maxValue,
            minStep: minStep
        });
    }
}
exports.CharacteristicNode = CharacteristicNode;
