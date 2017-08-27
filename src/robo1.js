var gpio = require('pi-gpio'); //#A
var stdin = process.openStdin();

var fpin1 = 11; 
var fpin2 = 18;
var bpin1 = 16; 
var bpin2 = 13;

init();
function start(){
	var count = 1;
	var stdin = process.openStdin(); 

/*
	stdin.on('keypress', function (chunk, key) {
	  process.stdout.write('Get Chunk: ' + chunk + '\n');
	  if (key){
		console.log("Key pressed"+key.name);
	}
	});
*/	setInterval(function () { //#B
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

function direction(pin1, pin2, status1, status2) { 
  gpio.write(pin1, status1, function () {
	console.log('Setting pin : '+pin1+' to '+status1);
  });
  gpio.write(pin2, status2, function () {
	console.log('Setting pin : '+fpin2+' to '+status2);
  });
}
function back(){
	console.log('back');
	direction(fpin1, fpin2, 0, 0);
	direction(bpin1, bpin2, 1, 1);
}
function fwd(){
	console.log('fwd');
	direction(bpin1, bpin2, 0, 0);
	direction(fpin1, fpin2, 1, 1);
}
function stop(){
	console.log('stop');
	direction(bpin1, bpin2, 0, 0);
	direction(fpin1, fpin2, 0, 0);
}

//process.stdin.setRawMode(true);

stdin.on('keypress', function (chunk, key) {
	  process.stdout.write('Get Chunk: ' + chunk + '\n');
	  if (key){
		console.log("Key pressed"+key.name);
	}
});

process.on('SIGINT', function () { //#F
	stop();
    closeGPIO;	
    process.exit();
});
var closeGPIO = function(){

	gpio.close(fpin1); //#G
	gpio.close(fpin2);
	gpio.close(bpin1);
	gpio.close(bpin2);
   	console.log('Bye, bye!');
} 

// This is a place where a function starts executing the program.
function init(){
	closeGPIO;
	gpio.open(fpin1, "output", function (err) {
		gpio.open(fpin2, "output", function (err) { 
			gpio.open(bpin1, "output", function (err) { 
				gpio.open(bpin2, "output", function (err) { 
					if(err) console.log("Error "+err)
					//start();
					});
				if(err) console.log("Error "+err)
				});
			if(err) console.log("Error "+err)
			});
		if(err) console.log("Error "+err)
	});
	
}

