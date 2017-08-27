var gpio = require('pi-gpio'); //#A
var keypress = require('keypress');
var readline   = require('readline');
var statistics = require('/home/pi/Desktop/IOT/Pi_programs/node_modules/r-pi-usonic/node_modules/math-statistics');
var usonic     = require('/home/pi/Desktop/IOT/Pi_programs/node_modules/r-pi-usonic/lib/usonic.js');

// make `process.stdin` begin emitting "keypress" events 
keypress(process.stdin);
 
var fpin1 = 11; 
var fpin2 = 18;
var bpin1 = 16; 
var bpin2 = 13;
var robo = {};


robo.init = function(){
		//robo.stopEngine();
		console.log('Starting Engine...');
		gpio.open(fpin1, "output", function (err) {
			gpio.open(fpin2, "output", function (err) { 
				gpio.open(bpin1, "output", function (err) { 
					gpio.open(bpin2, "output", function (err) { 
						if(err) console.log("Error "+err);
						usonic.init(function (error) {
       		        if (error) {
                            console.log(error);
                        } else {
                            initSensor({
                                echoPin: 25,
                                triggerPin: 9,
                                timeout: 2000,
                                delay: 100,
                                rate: 5
                            });
                        }
                    });
	
						console.log('Engine Started ...');
						//robo.autoDrive();
						});
					if(err) console.log("Error "+err);
					});
				if(err) console.log("Error "+err);
				});
			if(err) console.log("Error "+err);
		});
	
}
robo.applyBreak = function (){
	console.log('Applying break...');
	direction(bpin1, bpin2, 0, 0);
	direction(fpin1, fpin2, 0, 0);
}

robo.stopEngine = function(){
	console.log('Stopping engine..');
	gpio.write(fpin1, 0, function () {
	    gpio.close(fpin1);

	  });
	gpio.write(fpin2, 0, function () {
		    gpio.close(fpin2);
	
		  });
	gpio.write(bpin1, 0, function () {
		    gpio.close(bpin1);
	
		  });
	gpio.write(bpin2, 0, function () {
		    gpio.close(bpin2);
	
	  });
	console.log('Engine stopped..');
}
robo.off = function(){
	robo.applyBreak();
   	robo.stopEngine();
	
} 
robo.init();

process.stdin.setRawMode(true);
process.stdin.resume();
 
// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key.name);
  if(key){
	if(key.name == 'up'){
	console.log('up..');
	  robo.moveFwd(); 
	}else if(key.name == 'down'){
	  robo.moveReverse();
	}else if(key.name == 'right'){
	  robo.turnRight();
	}else if(key.name == 'left'){
		robo.turnLeft();
	}else if(key.name == 's'){
		robo.applyBreak();
	}else if (key && key.ctrl && key.name == 'c') {
		console.log('Turinig off');
		robo.off();
		//process.stdin.pause();
		process.exit();
	}  
  }
  
});
 

robo.autoDrive = function(){
	var count = 1;
	setInterval(function () { //#B
		console.log('Count : '+count);
		if(count){
			fwd();
			count=0;
		}else{
			back();
			count=1;
		}
	}, 2000);
}

robo.moveReverse = function (){
	console.log('Moving reverse...');
	direction(bpin1, bpin2, 1, 0);
	direction(fpin1, fpin2, 1, 0);
}
robo.moveFwd = function(){
	console.log('Moving fwd...');
	direction(fpin1, fpin2, 0, 1);
	direction(bpin1, bpin2, 0, 1);
}
robo.turnRight = function (){
	console.log('Moving right ...');
	direction(fpin1, fpin2, 1, 1);
	direction(bpin1, bpin2, 0, 0);
}
robo.turnLeft = function (){
	console.log('Moving left ...');
	direction(fpin1, fpin2, 0, 0);
	direction(bpin1, bpin2, 1, 1);
}

function direction(pin1, pin2, status1, status2) { 
  gpio.write(pin1, status1, function () {
	console.log('Setting pin : '+pin1+' to '+status1);
  });
  gpio.write(pin2, status2, function () {
	console.log('Setting pin : '+fpin2+' to '+status2);
  });
}

    //    process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm');

var initSensor = function (config) {
    var sensor = usonic.createSensor(config.echoPin, config.triggerPin, config.timeout);

    console.log('Config: ' + JSON.stringify(config));

    var distances;

    (function measure() {
        if (!distances || distances.length === config.rate) {
            if (distances) {
                var distance = statistics.median(distances);
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm');	
		if(distance && distance<10){	 
			//robo.moveFwd(); 
			//console.log("Roko");
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


/*
process.on('SIGINT', function () { //#F
	robo.applyBreak;
    robo.off;	
    process.exit();
});*/



