'use strict';

var statistics = require('/home/pi/Desktop/IOT/Pi_programs/node_modules/mmm-usonic/node_modules/math-statistics');
var usonic     = require('/home/pi/Desktop/IOT/Pi_programs/node_modules/mmm-usonic/lib/usonic.js');

var echoPin = 16,
triggerPin = 21;

var print = function (distance) {
    
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (distance < 0) {
        process.stdout.write('Error: Measurement timeout.\n');
    } else {
        process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm');
    }
};

var initSensor = function (config) {
    var sensor = usonic.createSensor(config.echoPin, config.triggerPin, config.timeout);

    console.log('Config: ' + JSON.stringify(config));

    var distances;

    (function measure() {
        if (!distances || distances.length === config.rate) {
            if (distances) {
                var distance = statistics.median(distances);
                if(distance<5){
                    console.log("Roko");                
                }
                print(distance);
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




