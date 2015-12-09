/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
/*global */

var mqtt = require('mqtt');             // Require MQTT library
var control = require('./control');     // Custom libraries that we'll write to initialize pins.

var client = mqtt.connect('mqtt://192.168.43.38'); // Connect to MQTT server.

client.on('connect', function() {
    console.log('Connected to server');
    control.confirmConnect();
    
    // Set up the topics we'll be subscribing to.
    client.subscribe('blink');
    client.subscribe('color');
    client.subscribe('motor');
    client.subscribe('potentiometer');
    client.subscribe('presence');
    client.subscribe('chatroom');
});

// When a message comes in, handle it.
client.on('message', function(topic, message) {
    console.log(message.toString());    // Display message for debugging purposes.
    if(topic == 'blink') {
        control.blinkLED(message, function(response) {
            client.publish('blink_response', 'Light is '+ response);
        });
    }
    else if(topic == 'color') {
        control.changeColor(message, function(response) {
            client.publish('color_response', response +' levels increased');
        });
    }
    else if(topic == 'motor') {
        control.motorSpeed(message, function(response) {
            client.publish('motor_response', 'Motor speed set to '+ response*100 +'%.');
        });
    }
	else if(topic == 'potentiometer') {
        control.readPot(function(response) {
            client.publish('potentiometer_response', 'Potentiometer value: '+ response);
        });
    }
});