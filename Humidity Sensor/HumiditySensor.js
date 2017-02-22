var sensorLib = require('node-dht-sensor'); 
var mqtt=require('mqtt'); 
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');  
var sensor = {
    initialize: function () {
        return sensorLib.initialize(22, 4); // here GPIO4 means pin7 
    },
    read: function () {
        var readout = sensorLib.read();
       var value={"humidity": readout.humidity.toFixed(2)}; 
       	client.publish('humidityMeasurement',JSON.stringify(value));  
	console.log('Current humidity value is: ' + readout.humidity.toFixed(2) + '%'); 
        setTimeout(function () {
            sensor.read();
        }, 1000);
    }
}; 
if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}