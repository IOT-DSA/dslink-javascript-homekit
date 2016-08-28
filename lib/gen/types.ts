export const types: any = {
    "characteristics": {
        "Accessory Identifier": {
            "uuid": "00000057-0000-1000-8000-0026BB765291",
            "prettyName": "Accessory Identifier",
            "name": "AccessoryIdentifier",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Administrator Only Access": {
            "uuid": "00000001-0000-1000-8000-0026BB765291",
            "prettyName": "Administrator Only Access",
            "name": "AdministratorOnlyAccess",
            "format": "BOOL",
            "perms": ["READ", "WRITE", "NOTIFY"]
        },
        "Air Particulate Density": {
            "uuid": "00000064-0000-1000-8000-0026BB765291",
            "prettyName": "Air Particulate Density",
            "name": "AirParticulateDensity",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 1000,
            "minValue": 0,
            "minStep": 1
        },
        "Air Particulate Size": {
            "uuid": "00000065-0000-1000-8000-0026BB765291",
            "prettyName": "Air Particulate Size",
            "name": "AirParticulateSize",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "validValues": {
                "2_5_M": "0",
                "10_M": "1"
            }
        },
        "Air Quality": {
            "uuid": "00000095-0000-1000-8000-0026BB765291",
            "prettyName": "Air Quality",
            "name": "AirQuality",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "UNKNOWN": "0",
                "EXCELLENT": "1",
                "GOOD": "2",
                "FAIR": "3",
                "INFERIOR": "4",
                "POOR": "5"
            }
        },
        "Audio Feedback": {
            "uuid": "00000005-0000-1000-8000-0026BB765291",
            "prettyName": "Audio Feedback",
            "name": "AudioFeedback",
            "format": "BOOL",
            "perms": ["READ", "WRITE", "NOTIFY"]
        },
        "Battery Level": {
            "uuid": "00000068-0000-1000-8000-0026BB765291",
            "prettyName": "Battery Level",
            "name": "BatteryLevel",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Brightness": {
            "uuid": "00000008-0000-1000-8000-0026BB765291",
            "prettyName": "Brightness",
            "name": "Brightness",
            "format": "INT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Carbon Dioxide Detected": {
            "uuid": "00000092-0000-1000-8000-0026BB765291",
            "prettyName": "Carbon Dioxide Detected",
            "name": "CarbonDioxideDetected",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "CO2_LEVELS_NORMAL": "0",
                "CO2_LEVELS_ABNORMAL": "1"
            }
        },
        "Carbon Dioxide Level": {
            "uuid": "00000093-0000-1000-8000-0026BB765291",
            "prettyName": "Carbon Dioxide Level",
            "name": "CarbonDioxideLevel",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 100000,
            "minValue": 0,
            "minStep": 100
        },
        "Carbon Dioxide Peak Level": {
            "uuid": "00000094-0000-1000-8000-0026BB765291",
            "prettyName": "Carbon Dioxide Peak Level",
            "name": "CarbonDioxidePeakLevel",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 100000,
            "minValue": 0,
            "minStep": 100
        },
        "Carbon Monoxide Detected": {
            "uuid": "00000069-0000-1000-8000-0026BB765291",
            "prettyName": "Carbon Monoxide Detected",
            "name": "CarbonMonoxideDetected",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "CO_LEVELS_NORMAL": "0",
                "CO_LEVELS_ABNORMAL": "1"
            }
        },
        "Carbon Monoxide Level": {
            "uuid": "00000090-0000-1000-8000-0026BB765291",
            "prettyName": "Carbon Monoxide Level",
            "name": "CarbonMonoxideLevel",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 100,
            "minValue": 0,
            "minStep": 0.1
        },
        "Carbon Monoxide Peak Level": {
            "uuid": "00000091-0000-1000-8000-0026BB765291",
            "prettyName": "Carbon Monoxide Peak Level",
            "name": "CarbonMonoxidePeakLevel",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 100,
            "minValue": 0,
            "minStep": 0.1
        },
        "Category": {
            "uuid": "000000A3-0000-1000-8000-0026BB765291",
            "prettyName": "Category",
            "name": "Category",
            "format": "UINT16",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 16,
            "minValue": 1,
            "minStep": 1
        },
        "Charging State": {
            "uuid": "0000008F-0000-1000-8000-0026BB765291",
            "prettyName": "Charging State",
            "name": "ChargingState",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "validValues": {
                "NOT_CHARGING": "0",
                "CHARGING": "1"
            }
        },
        "Configure Bridged Accessory": {
            "uuid": "000000A0-0000-1000-8000-0026BB765291",
            "prettyName": "Configure Bridged Accessory",
            "name": "ConfigureBridgedAccessory",
            "format": "TLV8",
            "perms": ["WRITE"]
        },
        "Configure Bridged Accessory Status": {
            "uuid": "0000009D-0000-1000-8000-0026BB765291",
            "prettyName": "Configure Bridged Accessory Status",
            "name": "ConfigureBridgedAccessoryStatus",
            "format": "TLV8",
            "perms": ["READ", "NOTIFY"]
        },
        "Contact Sensor State": {
            "uuid": "0000006A-0000-1000-8000-0026BB765291",
            "prettyName": "Contact Sensor State",
            "name": "ContactSensorState",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "CONTACT_DETECTED": "0",
                "CONTACT_NOT_DETECTED": "1"
            }
        },
        "Cooling Threshold Temperature": {
            "uuid": "0000000D-0000-1000-8000-0026BB765291",
            "prettyName": "Cooling Threshold Temperature",
            "name": "CoolingThresholdTemperature",
            "format": "FLOAT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "CELSIUS",
            "maxValue": 35,
            "minValue": 10,
            "minStep": 0.1
        },
        "Current Ambient Light Level": {
            "uuid": "0000006B-0000-1000-8000-0026BB765291",
            "prettyName": "Current Ambient Light Level",
            "name": "CurrentAmbientLightLevel",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "unit": "LUX",
            "maxValue": 100000,
            "minValue": 0.0001,
            "minStep": 0.0001
        },
        "Current Door State": {
            "uuid": "0000000E-0000-1000-8000-0026BB765291",
            "prettyName": "Current Door State",
            "name": "CurrentDoorState",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "OPEN": "0",
                "CLOSED": "1",
                "OPENING": "2",
                "CLOSING": "3",
                "STOPPED": "4"
            }
        },
        "Current Heating Cooling State": {
            "uuid": "0000000F-0000-1000-8000-0026BB765291",
            "prettyName": "Current Heating Cooling State",
            "name": "CurrentHeatingCoolingState",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "OFF": "0",
                "HEAT": "1",
                "COOL": "2"
            }
        },
        "Current Horizontal Tilt Angle": {
            "uuid": "0000006C-0000-1000-8000-0026BB765291",
            "prettyName": "Current Horizontal Tilt Angle",
            "name": "CurrentHorizontalTiltAngle",
            "format": "INT",
            "perms": ["READ", "NOTIFY"],
            "unit": "ARC_DEGREE",
            "maxValue": 90,
            "minValue": -90,
            "minStep": 1
        },
        "Current Position": {
            "uuid": "0000006D-0000-1000-8000-0026BB765291",
            "prettyName": "Current Position",
            "name": "CurrentPosition",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Current Relative Humidity": {
            "uuid": "00000010-0000-1000-8000-0026BB765291",
            "prettyName": "Current Relative Humidity",
            "name": "CurrentRelativeHumidity",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Current Temperature": {
            "uuid": "00000011-0000-1000-8000-0026BB765291",
            "prettyName": "Current Temperature",
            "name": "CurrentTemperature",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"],
            "unit": "CELSIUS",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 0.1
        },
        "Current Time": {
            "uuid": "0000009B-0000-1000-8000-0026BB765291",
            "prettyName": "Current Time",
            "name": "CurrentTime",
            "format": "STRING",
            "perms": ["READ", "WRITE"]
        },
        "Current Vertical Tilt Angle": {
            "uuid": "0000006E-0000-1000-8000-0026BB765291",
            "prettyName": "Current Vertical Tilt Angle",
            "name": "CurrentVerticalTiltAngle",
            "format": "INT",
            "perms": ["READ", "NOTIFY"],
            "unit": "ARC_DEGREE",
            "maxValue": 90,
            "minValue": -90,
            "minStep": 1
        },
        "Day of the Week": {
            "uuid": "00000098-0000-1000-8000-0026BB765291",
            "prettyName": "Day of the Week",
            "name": "DayoftheWeek",
            "format": "UINT8",
            "perms": ["READ", "WRITE"],
            "maxValue": 7,
            "minValue": 1,
            "minStep": 1
        },
        "Discover Bridged Accessories": {
            "uuid": "0000009E-0000-1000-8000-0026BB765291",
            "prettyName": "Discover Bridged Accessories",
            "name": "DiscoverBridgedAccessories",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "validValues": {
                "START_DISCOVERY": "0",
                "STOP_DISCOVERY": "1"
            }
        },
        "Discovered Bridged Accessories": {
            "uuid": "0000009F-0000-1000-8000-0026BB765291",
            "prettyName": "Discovered Bridged Accessories",
            "name": "DiscoveredBridgedAccessories",
            "format": "UINT16",
            "perms": ["READ", "NOTIFY"]
        },
        "Firmware Revision": {
            "uuid": "00000052-0000-1000-8000-0026BB765291",
            "prettyName": "Firmware Revision",
            "name": "FirmwareRevision",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Hardware Revision": {
            "uuid": "00000053-0000-1000-8000-0026BB765291",
            "prettyName": "Hardware Revision",
            "name": "HardwareRevision",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Heating Threshold Temperature": {
            "uuid": "00000012-0000-1000-8000-0026BB765291",
            "prettyName": "Heating Threshold Temperature",
            "name": "HeatingThresholdTemperature",
            "format": "FLOAT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "CELSIUS",
            "maxValue": 25,
            "minValue": 0,
            "minStep": 0.1
        },
        "Hold Position": {
            "uuid": "0000006F-0000-1000-8000-0026BB765291",
            "prettyName": "Hold Position",
            "name": "HoldPosition",
            "format": "BOOL",
            "perms": ["WRITE"]
        },
        "Hue": {
            "uuid": "00000013-0000-1000-8000-0026BB765291",
            "prettyName": "Hue",
            "name": "Hue",
            "format": "FLOAT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "ARC_DEGREE",
            "maxValue": 360,
            "minValue": 0,
            "minStep": 1
        },
        "Identify": {
            "uuid": "00000014-0000-1000-8000-0026BB765291",
            "prettyName": "Identify",
            "name": "Identify",
            "format": "BOOL",
            "perms": ["WRITE"]
        },
        "Leak Detected": {
            "uuid": "00000070-0000-1000-8000-0026BB765291",
            "prettyName": "Leak Detected",
            "name": "LeakDetected",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "LEAK_NOT_DETECTED": "0",
                "LEAK_DETECTED": "1"
            }
        },
        "Link Quality": {
            "uuid": "0000009C-0000-1000-8000-0026BB765291",
            "prettyName": "Link Quality",
            "name": "LinkQuality",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 4,
            "minValue": 1,
            "minStep": 1
        },
        "Lock Control Point": {
            "uuid": "00000019-0000-1000-8000-0026BB765291",
            "prettyName": "Lock Control Point",
            "name": "LockControlPoint",
            "format": "TLV8",
            "perms": ["WRITE"]
        },
        "Lock Current State": {
            "uuid": "0000001D-0000-1000-8000-0026BB765291",
            "prettyName": "Lock Current State",
            "name": "LockCurrentState",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "UNSECURED": "0",
                "SECURED": "1",
                "JAMMED": "2",
                "UNKNOWN": "3"
            }
        },
        "Lock Last Known Action": {
            "uuid": "0000001C-0000-1000-8000-0026BB765291",
            "prettyName": "Lock Last Known Action",
            "name": "LockLastKnownAction",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "validValues": {
                "SECURED_PHYSICALLY_INTERIOR": "0",
                "UNSECURED_PHYSICALLY_INTERIOR": "1",
                "SECURED_PHYSICALLY_EXTERIOR": "2",
                "UNSECURED_PHYSICALLY_EXTERIOR": "3",
                "SECURED_BY_KEYPAD": "4",
                "UNSECURED_BY_KEYPAD": "5",
                "SECURED_REMOTELY": "6",
                "UNSECURED_REMOTELY": "7",
                "SECURED_BY_AUTO_SECURE_TIMEOUT": "8"
            }
        },
        "Lock Management Auto Security Timeout": {
            "uuid": "0000001A-0000-1000-8000-0026BB765291",
            "prettyName": "Lock Management Auto Security Timeout",
            "name": "LockManagementAutoSecurityTimeout",
            "format": "UINT32",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "SECONDS",
            "maxValue": 86400,
            "minValue": 0,
            "minStep": 1
        },
        "Lock Target State": {
            "uuid": "0000001E-0000-1000-8000-0026BB765291",
            "prettyName": "Lock Target State",
            "name": "LockTargetState",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "validValues": {
                "UNSECURED": "0",
                "SECURED": "1"
            }
        },
        "Logs": {
            "uuid": "0000001F-0000-1000-8000-0026BB765291",
            "prettyName": "Logs",
            "name": "Logs",
            "format": "TLV8",
            "perms": ["READ", "NOTIFY"]
        },
        "Manufacturer": {
            "uuid": "00000020-0000-1000-8000-0026BB765291",
            "prettyName": "Manufacturer",
            "name": "Manufacturer",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Model": {
            "uuid": "00000021-0000-1000-8000-0026BB765291",
            "prettyName": "Model",
            "name": "Model",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Motion Detected": {
            "uuid": "00000022-0000-1000-8000-0026BB765291",
            "prettyName": "Motion Detected",
            "name": "MotionDetected",
            "format": "BOOL",
            "perms": ["READ", "NOTIFY", null]
        },
        "Name": {
            "uuid": "00000023-0000-1000-8000-0026BB765291",
            "prettyName": "Name",
            "name": "Name",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Obstruction Detected": {
            "uuid": "00000024-0000-1000-8000-0026BB765291",
            "prettyName": "Obstruction Detected",
            "name": "ObstructionDetected",
            "format": "BOOL",
            "perms": ["READ", "NOTIFY", null]
        },
        "Occupancy Detected": {
            "uuid": "00000071-0000-1000-8000-0026BB765291",
            "prettyName": "Occupancy Detected",
            "name": "OccupancyDetected",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "OCCUPANCY_NOT_DETECTED": "0",
                "OCCUPANCY_DETECTED": "1"
            }
        },
        "On": {
            "uuid": "00000025-0000-1000-8000-0026BB765291",
            "prettyName": "On",
            "name": "On",
            "format": "BOOL",
            "perms": ["READ", "WRITE", "NOTIFY"]
        },
        "Outlet In Use": {
            "uuid": "00000026-0000-1000-8000-0026BB765291",
            "prettyName": "Outlet In Use",
            "name": "OutletInUse",
            "format": "BOOL",
            "perms": ["READ", "NOTIFY"]
        },
        "Pair Setup": {
            "uuid": "0000004C-0000-1000-8000-0026BB765291",
            "prettyName": "Pair Setup",
            "name": "PairSetup",
            "format": "TLV8",
            "perms": ["READ", "WRITE"]
        },
        "Pair Verify": {
            "uuid": "0000004E-0000-1000-8000-0026BB765291",
            "prettyName": "Pair Verify",
            "name": "PairVerify",
            "format": "TLV8",
            "perms": ["READ", "WRITE"]
        },
        "Pairing Features": {
            "uuid": "0000004F-0000-1000-8000-0026BB765291",
            "prettyName": "Pairing Features",
            "name": "PairingFeatures",
            "format": "UINT8",
            "perms": ["READ"]
        },
        "Pairing Pairings": {
            "uuid": "00000050-0000-1000-8000-0026BB765291",
            "prettyName": "Pairing Pairings",
            "name": "PairingPairings",
            "format": "TLV8",
            "perms": ["READ", "WRITE"]
        },
        "Position State": {
            "uuid": "00000072-0000-1000-8000-0026BB765291",
            "prettyName": "Position State",
            "name": "PositionState",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "validValues": {
                "DECREASING": "0",
                "INCREASING": "1",
                "STOPPED": "2"
            }
        },
        "Programmable Switch Event": {
            "uuid": "00000073-0000-1000-8000-0026BB765291",
            "prettyName": "Programmable Switch Event",
            "name": "ProgrammableSwitchEvent",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 1,
            "minValue": 0,
            "minStep": 1
        },
        "Programmable Switch Output State": {
            "uuid": "00000074-0000-1000-8000-0026BB765291",
            "prettyName": "Programmable Switch Output State",
            "name": "ProgrammableSwitchOutputState",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "maxValue": 1,
            "minValue": 0,
            "minStep": 1
        },
        "Reachable": {
            "uuid": "00000063-0000-1000-8000-0026BB765291",
            "prettyName": "Reachable",
            "name": "Reachable",
            "format": "BOOL",
            "perms": ["READ", "NOTIFY"]
        },
        "Rotation Direction": {
            "uuid": "00000028-0000-1000-8000-0026BB765291",
            "prettyName": "Rotation Direction",
            "name": "RotationDirection",
            "format": "INT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "validValues": {
                "CLOCKWISE": "0",
                "COUNTER_CLOCKWISE": "1"
            }
        },
        "Rotation Speed": {
            "uuid": "00000029-0000-1000-8000-0026BB765291",
            "prettyName": "Rotation Speed",
            "name": "RotationSpeed",
            "format": "FLOAT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Saturation": {
            "uuid": "0000002F-0000-1000-8000-0026BB765291",
            "prettyName": "Saturation",
            "name": "Saturation",
            "format": "FLOAT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Security System Alarm Type": {
            "uuid": "0000008E-0000-1000-8000-0026BB765291",
            "prettyName": "Security System Alarm Type",
            "name": "SecuritySystemAlarmType",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY"],
            "maxValue": 1,
            "minValue": 0,
            "minStep": 1
        },
        "Security System Current State": {
            "uuid": "00000066-0000-1000-8000-0026BB765291",
            "prettyName": "Security System Current State",
            "name": "SecuritySystemCurrentState",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "STAY_ARM": "0",
                "AWAY_ARM": "1",
                "NIGHT_ARM": "2",
                "DISARMED": "3",
                "ALARM_TRIGGERED": "4"
            }
        },
        "Security System Target State": {
            "uuid": "00000067-0000-1000-8000-0026BB765291",
            "prettyName": "Security System Target State",
            "name": "SecuritySystemTargetState",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "validValues": {
                "STAY_ARM": "0",
                "AWAY_ARM": "1",
                "NIGHT_ARM": "2",
                "DISARM": "3"
            }
        },
        "Serial Number": {
            "uuid": "00000030-0000-1000-8000-0026BB765291",
            "prettyName": "Serial Number",
            "name": "SerialNumber",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Smoke Detected": {
            "uuid": "00000076-0000-1000-8000-0026BB765291",
            "prettyName": "Smoke Detected",
            "name": "SmokeDetected",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "SMOKE_NOT_DETECTED": "0",
                "SMOKE_DETECTED": "1"
            }
        },
        "Software Revision": {
            "uuid": "00000054-0000-1000-8000-0026BB765291",
            "prettyName": "Software Revision",
            "name": "SoftwareRevision",
            "format": "STRING",
            "perms": ["READ"]
        },
        "Status Active": {
            "uuid": "00000075-0000-1000-8000-0026BB765291",
            "prettyName": "Status Active",
            "name": "StatusActive",
            "format": "BOOL",
            "perms": ["READ", "NOTIFY"]
        },
        "Status Fault": {
            "uuid": "00000077-0000-1000-8000-0026BB765291",
            "prettyName": "Status Fault",
            "name": "StatusFault",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null]
        },
        "Status Jammed": {
            "uuid": "00000078-0000-1000-8000-0026BB765291",
            "prettyName": "Status Jammed",
            "name": "StatusJammed",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "NOT_JAMMED": "0",
                "JAMMED": "1"
            }
        },
        "Status Low Battery": {
            "uuid": "00000079-0000-1000-8000-0026BB765291",
            "prettyName": "Status Low Battery",
            "name": "StatusLowBattery",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "BATTERY_LEVEL_NORMAL": "0",
                "BATTERY_LEVEL_LOW": "1"
            }
        },
        "Status Tampered": {
            "uuid": "0000007A-0000-1000-8000-0026BB765291",
            "prettyName": "Status Tampered",
            "name": "StatusTampered",
            "format": "UINT8",
            "perms": ["READ", "NOTIFY", null],
            "validValues": {
                "NOT_TAMPERED": "0",
                "TAMPERED": "1"
            }
        },
        "Target Door State": {
            "uuid": "00000032-0000-1000-8000-0026BB765291",
            "prettyName": "Target Door State",
            "name": "TargetDoorState",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "validValues": {
                "OPEN": "0",
                "CLOSED": "1"
            }
        },
        "Target Heating Cooling State": {
            "uuid": "00000033-0000-1000-8000-0026BB765291",
            "prettyName": "Target Heating Cooling State",
            "name": "TargetHeatingCoolingState",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "validValues": {
                "OFF": "0",
                "HEAT": "1",
                "COOL": "2",
                "AUTO": "3"
            }
        },
        "Target Horizontal Tilt Angle": {
            "uuid": "0000007B-0000-1000-8000-0026BB765291",
            "prettyName": "Target Horizontal Tilt Angle",
            "name": "TargetHorizontalTiltAngle",
            "format": "INT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "ARC_DEGREE",
            "maxValue": 90,
            "minValue": -90,
            "minStep": 1
        },
        "Target Position": {
            "uuid": "0000007C-0000-1000-8000-0026BB765291",
            "prettyName": "Target Position",
            "name": "TargetPosition",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Target Relative Humidity": {
            "uuid": "00000034-0000-1000-8000-0026BB765291",
            "prettyName": "Target Relative Humidity",
            "name": "TargetRelativeHumidity",
            "format": "FLOAT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "PERCENTAGE",
            "maxValue": 100,
            "minValue": 0,
            "minStep": 1
        },
        "Target Temperature": {
            "uuid": "00000035-0000-1000-8000-0026BB765291",
            "prettyName": "Target Temperature",
            "name": "TargetTemperature",
            "format": "FLOAT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "CELSIUS",
            "maxValue": 38,
            "minValue": 10,
            "minStep": 0.1
        },
        "Target Vertical Tilt Angle": {
            "uuid": "0000007D-0000-1000-8000-0026BB765291",
            "prettyName": "Target Vertical Tilt Angle",
            "name": "TargetVerticalTiltAngle",
            "format": "INT",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "unit": "ARC_DEGREE",
            "maxValue": 90,
            "minValue": -90,
            "minStep": 1
        },
        "Temperature Display Units": {
            "uuid": "00000036-0000-1000-8000-0026BB765291",
            "prettyName": "Temperature Display Units",
            "name": "TemperatureDisplayUnits",
            "format": "UINT8",
            "perms": ["READ", "WRITE", "NOTIFY"],
            "validValues": {
                "CELSIUS": "0",
                "FAHRENHEIT": "1"
            }
        },
        "Time Update": {
            "uuid": "0000009A-0000-1000-8000-0026BB765291",
            "prettyName": "Time Update",
            "name": "TimeUpdate",
            "format": "BOOL",
            "perms": ["READ", "NOTIFY"]
        },
        "Tunnel Connection Timeout ": {
            "uuid": "00000061-0000-1000-8000-0026BB765291",
            "prettyName": "Tunnel Connection Timeout ",
            "name": "TunnelConnectionTimeout",
            "format": "UINT32",
            "perms": ["WRITE", "READ", "NOTIFY"]
        },
        "Tunneled Accessory Advertising": {
            "uuid": "00000060-0000-1000-8000-0026BB765291",
            "prettyName": "Tunneled Accessory Advertising",
            "name": "TunneledAccessoryAdvertising",
            "format": "BOOL",
            "perms": ["WRITE", "READ", "NOTIFY"]
        },
        "Tunneled Accessory Connected": {
            "uuid": "00000059-0000-1000-8000-0026BB765291",
            "prettyName": "Tunneled Accessory Connected",
            "name": "TunneledAccessoryConnected",
            "format": "BOOL",
            "perms": ["WRITE", "READ", "NOTIFY"]
        },
        "Tunneled Accessory State Number": {
            "uuid": "00000058-0000-1000-8000-0026BB765291",
            "prettyName": "Tunneled Accessory State Number",
            "name": "TunneledAccessoryStateNumber",
            "format": "FLOAT",
            "perms": ["READ", "NOTIFY"]
        },
        "Version": {
            "uuid": "00000037-0000-1000-8000-0026BB765291",
            "prettyName": "Version",
            "name": "Version",
            "format": "STRING",
            "perms": ["READ", "NOTIFY"]
        }
    },
    "services": {
        "Accessory Information": {
            "uuid": "0000003E-0000-1000-8000-0026BB765291",
            "className": "AccessoryInformation",
            "name": "Accessory Information",
            "required": ["Identify", "Manufacturer", "Model", "Name", "Serial Number"],
            "optional": ["Firmware Revision", "Hardware Revision", "Software Revision"]
        },
        "Air Quality Sensor": {
            "uuid": "0000008D-0000-1000-8000-0026BB765291",
            "className": "AirQualitySensor",
            "name": "Air Quality Sensor",
            "required": ["Air Quality"],
            "optional": ["Air Particulate Density", "Air Particulate Size", "Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Battery Service": {
            "uuid": "00000096-0000-1000-8000-0026BB765291",
            "className": "BatteryService",
            "name": "Battery Service",
            "required": ["Battery Level", "Charging State", "Status Low Battery"],
            "optional": ["Name"]
        },
        "Bridge Configuration": {
            "uuid": "000000A1-0000-1000-8000-0026BB765291",
            "className": "BridgeConfiguration",
            "name": "Bridge Configuration",
            "required": ["Configure Bridged Accessory Status", "Discover Bridged Accessories", "Discovered Bridged Accessories", "Configure Bridged Accessory"],
            "optional": []
        },
        "Bridging State": {
            "uuid": "00000062-0000-1000-8000-0026BB765291",
            "className": "BridgingState",
            "name": "Bridging State",
            "required": ["Reachable", "Link Quality", "Accessory Identifier", "Category"],
            "optional": ["Name"]
        },
        "Carbon Dioxide Sensor": {
            "uuid": "00000097-0000-1000-8000-0026BB765291",
            "className": "CarbonDioxideSensor",
            "name": "Carbon Dioxide Sensor",
            "required": ["Carbon Dioxide Detected"],
            "optional": ["Status Active", "Status Fault", "Status Low Battery", "Status Tampered", "Carbon Dioxide Level", "Carbon Dioxide Peak Level", "Name"]
        },
        "Carbon Monoxide Sensor": {
            "uuid": "0000007F-0000-1000-8000-0026BB765291",
            "className": "CarbonMonoxideSensor",
            "name": "Carbon Monoxide Sensor",
            "required": ["Carbon Monoxide Detected"],
            "optional": ["Status Active", "Status Fault", "Status Low Battery", "Status Tampered", "Carbon Monoxide Level", "Carbon Monoxide Peak Level", "Name"]
        },
        "Contact Sensor": {
            "uuid": "00000080-0000-1000-8000-0026BB765291",
            "className": "ContactSensor",
            "name": "Contact Sensor",
            "required": ["Contact Sensor State"],
            "optional": ["Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Door": {
            "uuid": "00000081-0000-1000-8000-0026BB765291",
            "className": "Door",
            "name": "Door",
            "required": ["Current Position", "Position State", "Target Position"],
            "optional": ["Hold Position", "Obstruction Detected", "Name"]
        },
        "Fan": {
            "uuid": "00000040-0000-1000-8000-0026BB765291",
            "className": "Fan",
            "name": "Fan",
            "required": ["On"],
            "optional": ["Rotation Direction", "Rotation Speed", "Name"]
        },
        "Garage Door Opener": {
            "uuid": "00000041-0000-1000-8000-0026BB765291",
            "className": "GarageDoorOpener",
            "name": "Garage Door Opener",
            "required": ["Current Door State", "Target Door State", "Obstruction Detected"],
            "optional": ["Lock Current State", "Lock Target State", "Name"]
        },
        "Humidity Sensor": {
            "uuid": "00000082-0000-1000-8000-0026BB765291",
            "className": "HumiditySensor",
            "name": "Humidity Sensor",
            "required": ["Current Relative Humidity"],
            "optional": ["Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Leak Sensor": {
            "uuid": "00000083-0000-1000-8000-0026BB765291",
            "className": "LeakSensor",
            "name": "Leak Sensor",
            "required": ["Leak Detected"],
            "optional": ["Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Light Sensor": {
            "uuid": "00000084-0000-1000-8000-0026BB765291",
            "className": "LightSensor",
            "name": "Light Sensor",
            "required": ["Current Ambient Light Level"],
            "optional": ["Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Lightbulb": {
            "uuid": "00000043-0000-1000-8000-0026BB765291",
            "className": "Lightbulb",
            "name": "Lightbulb",
            "required": ["On"],
            "optional": ["Brightness", "Hue", "Saturation", "Name"]
        },
        "Lock Management": {
            "uuid": "00000044-0000-1000-8000-0026BB765291",
            "className": "LockManagement",
            "name": "Lock Management",
            "required": ["Lock Control Point", "Version"],
            "optional": ["Logs", "Audio Feedback", "Lock Management Auto Security Timeout", "Administrator Only Access", "Lock Last Known Action", "Current Door State", "Motion Detected", "Name"]
        },
        "Lock Mechanism": {
            "uuid": "00000045-0000-1000-8000-0026BB765291",
            "className": "LockMechanism",
            "name": "Lock Mechanism",
            "required": ["Lock Current State", "Lock Target State"],
            "optional": ["Name"]
        },
        "Motion Sensor": {
            "uuid": "00000085-0000-1000-8000-0026BB765291",
            "className": "MotionSensor",
            "name": "Motion Sensor",
            "required": ["Motion Detected"],
            "optional": ["Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Occupancy Sensor": {
            "uuid": "00000086-0000-1000-8000-0026BB765291",
            "className": "OccupancySensor",
            "name": "Occupancy Sensor",
            "required": ["Occupancy Detected"],
            "optional": ["Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Outlet": {
            "uuid": "00000047-0000-1000-8000-0026BB765291",
            "className": "Outlet",
            "name": "Outlet",
            "required": ["On", "Outlet In Use"],
            "optional": ["Name"]
        },
        "Security System": {
            "uuid": "0000007E-0000-1000-8000-0026BB765291",
            "className": "SecuritySystem",
            "name": "Security System",
            "required": ["Security System Current State", "Security System Target State"],
            "optional": ["Status Fault", "Status Tampered", "Security System Alarm Type", "Name"]
        },
        "Smoke Sensor": {
            "uuid": "00000087-0000-1000-8000-0026BB765291",
            "className": "SmokeSensor",
            "name": "Smoke Sensor",
            "required": ["Smoke Detected"],
            "optional": ["Status Active", "Status Fault", "Status Tampered", "Status Low Battery", "Name"]
        },
        "Stateful Programmable Switch": {
            "uuid": "00000088-0000-1000-8000-0026BB765291",
            "className": "StatefulProgrammableSwitch",
            "name": "Stateful Programmable Switch",
            "required": ["Programmable Switch Event", "Programmable Switch Output State"],
            "optional": ["Name"]
        },
        "Stateless Programmable Switch": {
            "uuid": "00000089-0000-1000-8000-0026BB765291",
            "className": "StatelessProgrammableSwitch",
            "name": "Stateless Programmable Switch",
            "required": ["Programmable Switch Event"],
            "optional": ["Name"]
        },
        "Switch": {
            "uuid": "00000049-0000-1000-8000-0026BB765291",
            "className": "Switch",
            "name": "Switch",
            "required": ["On"],
            "optional": ["Name"]
        },
        "Temperature Sensor": {
            "uuid": "0000008A-0000-1000-8000-0026BB765291",
            "className": "TemperatureSensor",
            "name": "Temperature Sensor",
            "required": ["Current Temperature"],
            "optional": ["Status Active", "Status Fault", "Status Low Battery", "Status Tampered", "Name"]
        },
        "Thermostat": {
            "uuid": "0000004A-0000-1000-8000-0026BB765291",
            "className": "Thermostat",
            "name": "Thermostat",
            "required": ["Current Heating Cooling State", "Target Heating Cooling State", "Current Temperature", "Target Temperature", "Temperature Display Units"],
            "optional": ["Current Relative Humidity", "Target Relative Humidity", "Cooling Threshold Temperature", "Heating Threshold Temperature", "Name"]
        },
        "Time Information": {
            "uuid": "00000099-0000-1000-8000-0026BB765291",
            "className": "TimeInformation",
            "name": "Time Information",
            "required": ["Current Time", "Day of the Week", "Time Update"],
            "optional": []
        },
        "Tunneled BTLE Accessory Service": {
            "uuid": "00000056-0000-1000-8000-0026BB765291",
            "className": "TunneledBTLEAccessoryService",
            "name": "Tunneled BTLE Accessory Service",
            "required": ["Name", "Accessory Identifier", "Tunneled Accessory State Number", "Tunneled Accessory Connected", "Tunneled Accessory Advertising", "Tunnel Connection Timeout "],
            "optional": []
        },
        "Window": {
            "uuid": "0000008B-0000-1000-8000-0026BB765291",
            "className": "Window",
            "name": "Window",
            "required": ["Current Position", "Target Position", "Position State"],
            "optional": ["Hold Position", "Obstruction Detected", "Name"]
        },
        "Window Covering": {
            "uuid": "0000008C-0000-1000-8000-0026BB765291",
            "className": "WindowCovering",
            "name": "Window Covering",
            "required": ["Current Position", "Target Position", "Position State"],
            "optional": ["Hold Position", "Target Horizontal Tilt Angle", "Target Vertical Tilt Angle", "Current Horizontal Tilt Angle", "Current Vertical Tilt Angle", "Obstruction Detected", "Name"]
        }
    }
};