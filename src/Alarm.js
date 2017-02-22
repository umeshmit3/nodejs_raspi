var Gpio = require('onoff').Gpio,
  buzzer = new Gpio(3, 'out'); // Here it's a GPIOPin:3 (not pin number 5)
  button = new Gpio(18, 'in', 'both');
 
buzzer.watch(function(err, value) {
  if (err) exit();
  buzzer.writeSync(value);
});


function exit() {
  buzzer.unexport();
  //button.unexport();
console.log("Good Bye!");
  process.exit();
}
 
process.on('SIGINT', exit);