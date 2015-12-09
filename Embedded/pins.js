var mraa = require('mraa');

module.exports.initialize = function() {
    var pinMap = {
        Status: (function() {
            var connect = new mraa.Gpio(13);    // LED hooked up to digital pin 13, which indicates that we're connected.
            connect.dir(mraa.DIR_OUT);
            return connect;
        })(),

        LED: (function() {
            var light = new mraa.Gpio(2);  
            light.dir(mraa.DIR_OUT);        // Set the gpio direction to output.
            return light;
        })(),

        Color: (function() {
            function addColor(pin) {
                var C = new mraa.Pwm(pin);
                C.enable(true);
                C.period_us(5000);
                C.write(0.0);
                return C;
            }
            
            return {
                Red: addColor(3),
                Green: addColor(5),
                Blue: addColor(6)
            };
        })(),

        Motor: (function() {
            var squareWave = new mraa.Pwm(9);
            squareWave.enable(true);
            squareWave.period_us(2000); // Set the period in microseconds.
            squareWave.write(0.0);
            return squareWave;
        })(),

        Pot: (function() {
            var analogPin = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
            return analogPin;
        })()
    }
    
    return pinMap;
};