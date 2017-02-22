var gpio= require('rpi-gpio');
//gpio.setup(7,gpio.DIR_IN,gpio.EDGE_BOTH);
gpio.setup(7,gpio.DIR_IN,readInput);

function readInput(){
gpio.read(7,function(err,value){

console.log("The Value is"+value);
});
}  
 

/*gpio.on('change',function(err,value){ 

console.log("The Value is"+value)
});  */