 <pre>
-[root](#root)
 |-[@addAccessory(displayName)](#addaccessory)
 |-[@startBridge()](#startbridge)
 |-[@stopBridge()](#stopbridge)
 |-[@restartBridge()](#restartbridge)
 |-[accessories](#accessories)
 | |-[AccessoryNode](#accessorynode)
 | | |-[@addServicePrefab(displayName, type, includeOptionalCharacteristics)](#addserviceprefab)
 | | |-[@addService(displayName)](#addservice)
 | | |-[@removeAccessory()](#removeaccessory)
 | | |-[services](#services)
 | | | |-[ServiceNode](#servicenode)
 | | | | |-[@removeService()](#removeservice)
 | | | | |-[@addCharacteristic(name, format, unit, writable)](#addcharacteristic)
 | | | | |-[CharacteristicNode](#characteristicnode)
 | | | | | |-[@removeCharacteristic()](#removecharacteristic)
 | | | | | |-[@addBounds(minValue, maxValue, minStep)](#addbounds)
 | | | | | |-[format](#format) - enum[BOOL,INT,FLOAT,STRING,UINT8,UINT16,UINT32,UINT64]
 | | | | | |-[unit](#unit) - enum[NONE,CELSIUS,PERCENTAGE,ARC_DEGREE,LUX,SECONDS]
 |-[name](#name) - string
 |-[pincode](#pincode) - string
 |-[started](#started) - bool
 </pre>

---

### root  

Root node of the DsLink  

Type: Node   

---

### addAccessory  

Adds a HomeKit accessory to the link. This accessory can be found in Accessories, and should be viewable in HomeKit after connecting to the default bridge accessory.  

Type: Action   
$is: addAccessory   
Parent: [root](#root)  
Params:  

Name | Type | Description
--- | --- | ---
displayName | `string` | Name that is used for the accessory by the link and HomeKit.

Return type:    

---

### startBridge  

Starts the HomeKit bridge if it was not already running.  

Type: Action   
$is: startBridge   
Parent: [root](#root)  
Return type:    

---

### stopBridge  

Stops the HomeKit bridge if it's currently running.  

Type: Action   
$is: stopBridge   
Parent: [root](#root)  
Return type:    

---

### restartBridge  

Stops and then starts the HomeKit bridge, regardless of it's current state.  

Type: Action   
$is: restartBridge   
Parent: [root](#root)  
Return type:    

---

### accessories  

A node that contains all of the HomeKit accessories added by the link.  

Type: Node   
Parent: [root](#root)  

---

### AccessoryNode  

The top level structure in HomeKit.  

Type: Node   
$is: accessory   
Parent: [accessories](#accessories)  

Description:  
An accessory in HomeKit is the top level structure that contains services and characteristics to provide functionality.  


---

### addServicePrefab  

Adds a service to the node from a set of Apple-defined prefabs.  

Type: Action   
$is: addServicePrefab   
Parent: [AccessoryNode](#accessorynode)  

Description:  
Adds a service to the node from a set of Apple-defined prefabs. These prefabs are given special priority and functionality within various HomeKit apps and Siri. In most cases, this should be used over the regular Add Service action.  

Params:  

Name | Type | Description
--- | --- | ---
displayName | `string` | The display name of the service.
type | `enum` | The type of prefab to use. This includes, but is not limited to, types such as a thermostat, garage door, or lightbulb.
includeOptionalCharacteristics | `bool` | Determines if the service should include characteristics allowed by the Apple prefab but not required.

Return type:    

---

### addService  

Adds a service to the node.  

Type: Action   
$is: addService   
Parent: [AccessoryNode](#accessorynode)  

Description:  
Adds a service to the node. This action should only be used in rare cases, as the Home app or Siri may not be able to comprehend the function of your service. In most cases, the Add Service Prefab action should be used instead.  

Params:  

Name | Type | Description
--- | --- | ---
displayName | `string` | The display name of the service.

Return type:    

---

### removeAccessory  

Removes this accessory from the HomeKit bridge.  

Type: Action   
$is: remove   
Parent: [AccessoryNode](#accessorynode)  
Return type:    

---

### services  

A node that contains all of the accessory's services.  

Type: Node   
Parent: [AccessoryNode](#accessorynode)  

---

### ServiceNode  

A service is the layer in HomeKit that provides functionality to accessories.  

Type: Node   
$is: service   
Parent: [services](#services)  

Description:  
A service is the layer in HomeKit that provides functionality to accessories. Services are responsible for what you'd most likely consider devices, like the ability to be a door, thermostat, etc.  


---

### removeService  

Removes this service from the parent accessory.  

Type: Action   
$is: remove   
Parent: [ServiceNode](#servicenode)  
Return type:    

---

### addCharacteristic  

Adds a characteristic to the node.  

Type: Action   
$is: addCharacteristic   
Parent: [ServiceNode](#servicenode)  
Params:  

Name | Type | Description
--- | --- | ---
name | `string` | The name of the characteristic.
format | `enum[BOOL,INT,FLOAT,STRING,UINT8,UINT16,UINT32,UINT64]` | The HomeKit data format of the new characteristic.
unit | `enum[NONE,CELSIUS,PERCENTAGE,ARC_DEGREE,LUX,SECONDS]` | The data unit that used by an iOS device to interpret the new characteristic.
writable | `bool` | Determines if a HomeKit app can change the value of the characteristic.

Return type:    

---

### CharacteristicNode  

A characteristic is a data point in HomeKit.  

Type: Node   
$is: characteristic   
Parent: [ServiceNode](#servicenode)  

Description:  
A characteristic is a data point in HomeKit. Examples of these can be specific things like temperature, if a door is open, if a fan is running, etc.  


---

### removeCharacteristic  

Removes this characteristic from the parent servuce.  

Type: Action   
$is: remove   
Parent: [CharacteristicNode](#characteristicnode)  
Return type:    

---

### addBounds  

Bounds a characteristic in HomeKit that has a numerical format.  

Type: Action   
$is: addBounds   
Parent: [CharacteristicNode](#characteristicnode)  
Params:  

Name | Type | Description
--- | --- | ---
minValue | `number` | The minimum value.
maxValue | `number` | The maximum value.
minStep | `number` | The minimum step value.

Return type:    

---

### format  

The HomeKit data format of the characteristic.  

Type: Node   
Parent: [CharacteristicNode](#characteristicnode)  
Value Type: `enum[BOOL,INT,FLOAT,STRING,UINT8,UINT16,UINT32,UINT64]`  
Writable: `never`  

---

### unit  

The data unit that used by an iOS device to interpret the characteristic.  

Type: Node   
Parent: [CharacteristicNode](#characteristicnode)  
Value Type: `enum[NONE,CELSIUS,PERCENTAGE,ARC_DEGREE,LUX,SECONDS]`  
Writable: `never`  

---

### name  

Name for the bridge accessory. By default, this value is 'HomeKit + DSA'.  

Type: Node   
Parent: [root](#root)  
Value Type: `string`  
Writable: `write`  

---

### pincode  

Pin-code for the bridge accessory. By default, this value is '465-46-465'.  

Type: Node   
Parent: [root](#root)  
Value Type: `string`  
Writable: `write`  

---

### started  

Indicates if the bridge accessory is currently running.  

Type: Node   
Parent: [root](#root)  
Value Type: `bool`  
Writable: `never`  

---

