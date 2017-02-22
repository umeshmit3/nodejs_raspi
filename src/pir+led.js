var Gpio = require('onoff').Gpio,
  sensor = new Gpio(17, 'in', 'both');    //#A
var gpio = require('pi-gpio'); //#A
var outPin = 7;
var status=1;

sensor.watch(function (err, value) { //#B
  if (err) exit(err);
   if (value) {
     console.log('Motion is detected');
     gpio.open(outPin, "output", function (err) { //#C
      blink(outPin,1); //#H
      });
  } 

  //console.log(value ? 'Motion detected' : );
});


function blink(outPin, status) { //#B
  gpio.write(outPin, status, function () { //#D
  console.log('Setting GPIO to: ' + status);
  status = (status + 1) % 2;
  gpio.close(outPin);
  });
}

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);

// #A Initialize pin 17 in input mode
// #B Listen for state changes on pin 17, if a change is detected the anonymous callback function will be called with the new value
