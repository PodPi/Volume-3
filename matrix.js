var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {

  var matrix = new five.Led.Matrix({
    addresses: [0x70],
    controller: "HT16K33",
    rotation: 3
  });

  // turn on each dot...
  matrix.led(0,4,6,1);
  matrix.led(0,3,5,1);
  matrix.led(0,2,4,1);

});
