var stepperWiringPi = require("/home/pi/Desktop/IOT/Pi_programs/node_modules/stepper-wiringpi");

var pin1 = 5,
pin2 = 6,
pin3 = 13,
pin4 = 19
stepsInRevolution = 8;

var motor = stepperWiringPi.setup(stepsInRevolution, pin1, pin2, pin3, pin4);
motor.setSpeed(6000);

console.log("moving motor backword");
motor.step(-500);
console.log("moving motor fowrard");
//motor.forward();

process.on('SIGINT', function () { //#F
	console.log("Stopping..")
	motor.step(5000);
//	motor.forward();
//	motor.backward();
	motor.stop();
   	process.exit();
});

