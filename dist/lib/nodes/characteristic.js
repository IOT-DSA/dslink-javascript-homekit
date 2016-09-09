"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DS = require('dslink');
var HAP = require('hap-nodejs');
var util = require('../util');
var CharacteristicNode = (function (_super) {
    __extends(CharacteristicNode, _super);
    function CharacteristicNode(path, provider, service) {
        _super.call(this, path, provider);
        this.service = service;
    }
    CharacteristicNode.prototype.load = function (map) {
        var _this = this;
        _super.prototype.load.call(this, map);
        var convert = function (type) {
            if (map.$$type === 'int' || map.$$type === 'number')
                return parseFloat(type);
            if (map.$$type === 'bool')
                return type === 'type';
            return type;
        };
        var validValues = map['?validValues'];
        var writable = map['?writable'];
        this.characteristic = new HAP.Characteristic(map.$name, map.$$uuid, {
            format: HAP.Characteristic.Formats[map.$$format],
            perms: !!map.$$perms ? map.$$perms : ((writable && Array.isArray(writable)) ? writable : (writable ?
                [HAP.Characteristic.Perms.READ, HAP.Characteristic.Perms.WRITE,
                    HAP.Characteristic.Perms.NOTIFY] :
                [HAP.Characteristic.Perms.READ, HAP.Characteristic.Perms.NOTIFY]))
        });
        this.characteristic.value = this.characteristic.getDefaultValue();
        this.configs = util.assign(this.configs, {
            $$perms: this.characteristic.props.perms
        });
        if (map.$$unit) {
            this.characteristic.setProps({ unit: map.$$unit });
        }
        this.subscribe(function (value) {
            try {
                if (validValues != null) {
                    var val = convert(validValues[value.value]);
                    _this.characteristic.setValue(val, null, null);
                    return;
                }
                _this.characteristic.setValue(convert(value.value), null, null);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.characteristic.on('change', function (change) {
            var value = change.newValue;
            if (validValues != null) {
                Object.keys(validValues).forEach(function (key) {
                    if (validValues[key].toString() === value.toString()) {
                        value = key;
                    }
                });
            }
            if (_this.value !== value) {
                _this.updateValue(value);
            }
        });
        if (this.service != null) {
            if (map.$$prefab && map.removeCharacteristic) {
                this.service.addOptionalCharacteristic(this.characteristic);
                return;
            }
            this.service.addCharacteristic(this.characteristic);
        }
    };
    CharacteristicNode.prototype.onRemoving = function () {
        if (this.service != null && this.characteristic != null) {
            this.service.removeCharacteristic(this.characteristic);
            this.characteristic.removeAllListeners('change');
            this.service = null;
            this.characteristic = null;
        }
        _super.prototype.onRemoving.call(this);
    };
    CharacteristicNode.prototype.hasBounds = function () {
        return Object.keys(this.children).indexOf('minValue') != -1;
    };
    CharacteristicNode.prototype.addBounds = function (minValue, maxValue, minStep) {
        var _this = this;
        this.provider.addNode(this.path + "/minValue", {
            $name: 'Minimum Value',
            $type: 'number',
            $writable: 'write',
            '?value': minValue
        });
        this.children['minValue'].subscribe(function (value) {
            _this.characteristic.setProps({ minValue: value.value });
        });
        this.provider.addNode(this.path + "/maxValue", {
            $name: 'Maximum Value',
            $type: 'number',
            $writable: 'write',
            '?value': maxValue
        });
        this.children['maxValue'].subscribe(function (value) {
            _this.characteristic.setProps({ maxValue: value.value });
        });
        this.provider.addNode(this.path + "/minStep", {
            $name: 'Minimum Step',
            $type: 'number',
            $writable: 'write',
            '?value': minStep
        });
        this.children['minStep'].subscribe(function (value) {
            _this.characteristic.setProps({ minStep: value.value });
        });
        this.characteristic.setProps({
            minValue: minValue,
            maxValue: maxValue,
            minStep: minStep
        });
    };
    return CharacteristicNode;
}(DS.SimpleNode));
exports.CharacteristicNode = CharacteristicNode;
