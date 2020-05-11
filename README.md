# Controlling-IoT-Devices-Over-Web
Demo on Controlling IoT Devices Using ThingSpeak Channel

## Adding Controls
1. Select "Controls"
2. Select "Manage Controls"
3. Enter a JSON array of controls using the appropriate formatting

```javascript
[{
	"name": "Switch 1",
	"control": "switch",
	"source": {"type":"thingspeak_channel", "field":1, "readKey":"XXX", "writeKey":"YYY"}
}]
```

## Demo
* [Open IoT Devices Control for ThingSpeak](https://htmlpreview.github.io/?https://github.com/harsharora94/Controlling-IoT-Devices-Over-Web/blob/master/controls.html)
* Create a new private ThingSpeak channel and enable 3 fields
* Add controls_structure.json under "Manage Controls"
* Change readKey and writeKey to match your ThingSpeak channel settings

![IoT Devices Control Application screenshot](./images/Devices_Control_Screenshot.png 'IoT Devices Control screenshot')
