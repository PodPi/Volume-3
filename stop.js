var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var matrix = new five.Led.Matrix({
    addresses: [0x70],
    controller: "HT16K33",
    rotation: 2,
  });

  var button = new five.Button("A0");
  var f = [ [ 3,7, 4,7 ]
          , [ 3,7, 4,7, 3,6, 4,6 ] , [ 3,5, 4,5, 3,6, 4,6 ]
          , [ 3,4, 4,4, 3,5, 4,5 ] , [ 3,3, 3,4, 4,3, 4,4 ]
          , [ 2,2, 2,3, 2,4, 2,5, 3,2, 4,2,
              5,2, 5,3, 5,4, 5,5, 3,5, 4,5 ]
          , [ 3,3, 3,4, 4,3, 4,4 ] , [ 3,4, 4,4, 3,5, 4,5 ]
          , [ 3,5, 4,5, 3,6, 4,6 ]
          ];
  var index = 0;

  button.on('press', function() {
    console.log('display frame #' + index);
    show(f[index]);
    index++;
    if ( index >= f.length )
       index = 0;
  });

  function show(frame) {
    matrix.clear();
    for ( var i=0; i<frame.length; i=i+2 ) {
      matrix.led( 0, frame[i], frame[i+1], 1 );
    }
  };

});
