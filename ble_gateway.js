// Sensor data
//
var http= require('http');
var url = require('url');
var webSocketServer = require('websocket').server;

var server;     // HTTP SERVER
var wsServer;   // Websocket web server                                                        

function originIsAllowed(origin) {
  console.log("Origin " + origin);
  return true;
}

exports.start = function(post_data_cb)
{
    server = http.createServer(function(request, response) {
    	console.log("Created server");
    });
    server.listen(8127, function()
    {
        	console.log((new Date()) + ' Server is listening on port 8127');
    }
    );
    // create the server
    wsServer = new webSocketServer({
    	httpServer: server,
    	autoAcceptConnections: false
    });

    // WebSocket server
    wsServer.on('request', function(request) {
    	if (!originIsAllowed(request.origin)) {
    	    request.reject();
    	    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    	    return;
    	}

    	var connection = request.accept('', request.origin);
    	console.log((new Date()) + ' Connection accepted.');
    	connection.on('message', function(message) {
        	if (message.type === 'utf8') {
		    	console.log(message.utf8Data);
			post_data_cb(message.utf8Data);
        	}
        	else if (message.type === 'binary') {
            	console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        	}
    	});
    	connection.on('connect', function(connection) {
   	     console.log("connect: " + connection);
    	});
    	connection.on('disconnect', function(connection) {
       	 console.log("disconnect");
    	});
    	connection.on('close', function(connection) {
    	});
    });

};
