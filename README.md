# dslink-javascript-homekit

A DSLink for exposing a HomeKit accessory to the local network, ultimately to
use Siri and other HomeKit apps with DSA.

Allows DSLink users to create HomeKit accessories, services, and characteristics
that mimic those available in the HAP HomeKit specification.

*In development. Link is feature complete but bugs may occur.*

### Documentation

Documentation for the DSLink can be found in api.md.

### Quick Start

###### Automatic installation:

- Bundle HomeKit with your Get DSA package.
- Download HomeKit from the DSLink Manager (DGLux).
- Install it in the DSLink Manager from git.

###### Manual installation:

```sh
git clone https://github.com/IOT-DSA/dslink-javascript-homekit.git
cd dslink-javascript-homekit
npm install
node dist/index.js --broker https://www.broker.com/conn
```

We've tested with third-party HomeKit apps in the past, but now recommend you
use the official Home app included within iOS 10.

Unless you change it from the link, the link will display in HomeKit as
*HomeKit + DSA*, and the pincode will be 465-46-465.

### License

The code in this repository is licensed under the Apache License (copy found
in **LICENSE.md**) unless stated otherwise.