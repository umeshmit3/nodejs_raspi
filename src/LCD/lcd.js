var Lcd = require('lcd'), 
  lcd = new Lcd({
    rs: 7,
    e: 8,
    data: [25,24,23,18],
    cols: 16,
    rows: 2
  });
var mqtt=require('mqtt'); 
 
var client=mqtt.connect('mqtt://test.mosquitto.org:1883'); 
client.subscribe('DisplayTemp'); 	
lcd.on('ready', function() {

client.on('message',function(topic,payload){	
var data=payload.toString('utf8',7);    // no count for NodeRED
var sensorMeasurement=JSON.parse(payload);
//console.log(sensorMeasurement.tempValue); // no count for NodeRED
    lcd.setCursor(0, 0);
   lcd.print(sensorMeasurement.tempValue);

//    lcd.print("Time"+new Date().toISOString().substring(11, 19));
//console.log("LCD is working");
console.log(sensorMeasurement.tempValue+ " in simulation lab");
//	console.log("Time"+new Date().toISOString().substring(11, 19));  // no count for NodeRED
});		
	}); 
// If ctrl+c is hit, free resources and exit. // no count for NodeRED
process.on('SIGINT', function() {
  lcd.clear();
  lcd.close();
  process.exit();
});