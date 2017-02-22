var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');
//setInterval(function(){
	var value={"badgeID":'1',"badgeEvent":'badgeDetected'};
	client.publish('badgeDetected',JSON.stringify(value));	
	console.log("badge is detected in simulator lab");
//},5000);





