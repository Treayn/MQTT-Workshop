client = new Paho.MQTT.Client('192.168.43.38', 3000, 'client'+ Math.round(Math.random() * 10000));

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess: onConnect});


function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("Connecting");
	client.subscribe('blink_response');
	client.subscribe('color_response');
	client.subscribe('motor_response');
	client.subscribe('potentiometer_response');
	client.subscribe('presence');
	
	client.subscribe('chatroom');
	message = new Paho.MQTT.Message("MQTT Ready");
	message.destinationName = "presence";
	client.send(message);
}
 
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("Connection Lost: "+ responseObject.errorMessage);
		client.connect({onSuccess: onConnect});
	}
}

function onMessageArrived(message) {
	console.log("onMessageArrived:"+ message.payloadString);
}

// Helper method for sending messages.
function send(msg, topic) {
	return function() {
		message = new Paho.MQTT.Message(msg);
		message.destinationName = topic;
		client.send(message);
	};
}

var LightOn = send('On', 'blink');

var LightOff = send('Off', 'blink');

var Red = send('Red', 'color');
var Green = send('Green', 'color');
var Blue = send('Blue', 'color');

var Faster = send('Faster', 'motor');
var Slower = send('Slower', 'motor');

var ReadPot = send('', 'potentiometer');