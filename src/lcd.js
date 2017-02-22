var Lcd = require('lcd'),
  lcd = new Lcd({
    rs: 12,
    e: 21,
    data: [5,6,17,18],
    cols: 8,
    rows: 1
  });
var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');
client.subscribe('sensorMeasurement');
 
client.on('message',function(topic,payload){
	
	sensorMeasurement=JSON.parse(payload);
	console.log(sensorMeasurement.tempValue);
	lcd.on('ready', function() {
//  setInterval(function() {
    lcd.setCursor(0, 0);
    lcd.print(new Date().toISOString().substring(11, 19));
	//console.log("Time"+new Date().toISOString().substring(11, 19));
 // }, 5000);
});

		
	});



 
// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function() {
  lcd.clear();
  lcd.close();
  process.exit();
});