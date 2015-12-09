// Import the pin mapping here and initialize them.
var pins = require('./pins').initialize();

module.exports = {    
    confirmConnect: function() {
        pins.Status.write(1);
    },
    
    blinkLED: function(state, cb) {
        if(state == 'On') {
            pins.LED.write(1);
            cb('ON');
        }
        else {
            pins.LED.write(0);
            cb('OFF');
        }
    },

    changeColor: function(rgb, cb) {
        if(rgb == 'Red') {
            var redness = pins.Color.Red.read();
            pins.Color.Red.write(redness < 1.0 ? redness + 0.25 : 0.0);
        }
        else if(rgb == 'Green') {
            var greenness = pins.Color.Green.read();
            pins.Color.Green.write(greenness < 1.0 ? greenness + 0.25 : 0.0);
        }
        else if(rgb == 'Blue') {
            var blueness = pins.Color.Blue.read();
            pins.Color.Blue.write(blueness < 1.0 ? blueness + 0.25 : 0.0);
        }
        cb(rgb);
    },

    motorSpeed: function(command, cb) {
        var speed = pins.Motor.read();
        if(command == 'Slower')
            pins.Motor.write(speed >= 0.1 ? speed -= 0.1 : 0.0);
        else if(command == 'Faster')
            pins.Motor.write(speed <= 0.9 ? speed += 0.1 : 1.0);
        cb(pins.Motor.read())
    },

    readPot: function(cb) {
        var result = pins.Pot.read();
        cb(result);
    }
};
