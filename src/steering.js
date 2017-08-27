'use strict';

var statistics = require('/home/pi/Desktop/IOT/Pi_programs/node_modules/mmm-usonic/node_modules/math-statistics');
var usonic     = require('/home/pi/Desktop/IOT/Pi_programs/node_modules/mmm-usonic/lib/usonic.js');
var stepperWiringPi = require("/home/pi/Desktop/IOT/Pi_programs/node_modules/stepper-wiringpi");

var echoPin = 16,
triggerPin = 21,
//Motor config
pin1 = 5,
pin2 = 6,
pin3 = 13,
pin4 = 19,
stepsInRevolution = 8;
var motor;
var sensor;
var dir = 0;
var isMoved = true;
var initSensor = function (config) {
    sensor = usonic.createSensor(config.echoPin, config.triggerPin, config.timeout);
	motor = stepperWiringPi.setup(stepsInRevolution, pin1, pin2, pin3, pin4);
	motor.setSpeed(1000);

    console.log('Config: ' + JSON.stringify(config));

    var distances;

    (function measure() {
        if (!distances || distances.length === config.rate) {
            if (distances && isMoved) {
                var distance = statistics.median(distances);
				print(distance);
                if(distance < 10){
					isMoved = false;
					console.log("Taking turn");
					if(dir == 0){
						console.log("center")
						motor.step(500, function(){
							console.log("left");
							dir = 1;
							isMoved = true;
						});	
						
					}else if(dir == 1){
						console.log("left");
						motor.step(-1000, function(){
							console.log("right");
							dir = 2;
							isMoved = true;
						});	
					}else{
						console.log("right");
						motor.step(500, function(){
							console.log("center");
							dir = 0;
							isMoved = true;
						});	
						
					}
                }
            }

            distances = [];
        }

        setTimeout(function () {
            distances.push(sensor());

            measure();
        }, config.delay);
    }());
};

usonic.init(function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            initSensor({
                                echoPin: echoPin,
                                triggerPin: triggerPin,
                                timeout: 2000,
                                delay: 100,
                                rate: 5
              });
        }
   });

var print = function (distance) {
    
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (distance < 0) {
        process.stdout.write('Error: Measurement timeout.\n');
    } else {
        process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm');
    }
};
