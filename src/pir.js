var Gpio = require('onoff').Gpio,
  sensor = new Gpio(17, 'in', 'both');    //#A

sensor.watch(function (err, value) { //#B
  if (err) exit(err);
   if (value) {
     console.log('Motion is detected' + value);
  } 

  //console.log(value ? 'Motion detected' : );
});

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);

// #A Initialize pin 17 in input mode
// #B Listen for state changes on pin 17, if a change is detected the anonymous callback function will be called with the new value
