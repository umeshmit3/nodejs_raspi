var rc522 = require("rc522-rfid-promise"); 
var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883'); 
rc522.startListening()
	.then(function(rfidTag){
        var value={"badgeID":rfidTagm,"badgeEvent":'badgeDetected'};
	client.publish('badgeDetected',JSON.stringify(value));
    	console.log("badge is detected in simulator lab",+rfidTag);	
	});
