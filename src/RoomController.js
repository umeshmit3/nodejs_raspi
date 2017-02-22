var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');
client.subscribe('roomAvgTemp');
client.on('message',function(topic,payload){
	
	sensorMeasurement=JSON.parse(payload);
	console.log(sensorMeasurement);
	if (sensorMeasurement.avgTemp <= 10 || sensorMeasurement.avgTemp >= 40) {
        // maintain temperature between 10'C-40'C
        var tempValue={"tempValue":parseFloat(sensorMeasurement.avgTemp),"unitofMeasurement":sensorMeasurement.unitofMeasurement};
    	client.publish('DisplayTemp',JSON.stringify(tempValue));    	
    }
	
	});

