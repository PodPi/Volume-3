var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {

  var matrix = new five.Led.Matrix({
    addresses: [0x70],
    controller: "HT16K33",
    rotation: 3,
  });

  var pot = new five.Sensor('A0');
  var f = [ [6,2, 6,5, 4,6, 3,5, 2,4, 2,3, 2,2, 3,1]
          , [6,2, 6,5, 3,6, 3,5, 2,4, 2,3, 2,2, 3,1]
          , [6,2, 6,5, 2,6, 2,5, 2,4, 2,3, 2,2, 3,1]
          , [6,2, 6,5, 1,6, 2,5, 2,4, 2,3, 2,2, 3,1]
          , [6,2, 6,5, 0,6, 2,5, 2,4, 2,3, 2,2, 3,1]
          ];
  var frame = 0;

function show(frame) {
  matrix.clear();
  for ( var i=0; i<frame.length; i=i+2 ) {
    matrix.led( 0, frame[i], frame[i+1], 1 );
  }
};

  var prev = 0;
  var size = Math.round(1024/f.length);
  console.log ( 'f.length=' + f.length + ', size=' + size );

  pot.on('change', function() {
    var value = Math.floor(this.value/size);
    if ( prev != value ) {
        show(f[value]);
        prev = Math.floor(this.value/size);
    }
  });

});
