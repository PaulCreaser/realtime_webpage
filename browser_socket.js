// Browser socket
//
// ****************************************************************************

// Libraries
var http= require('http');
var io  = require('socket.io');

// ****************************************************************************

// Globals

var g_http_server;                                        //Server listens on the port 8124
var g_http_listener;                                      // Web socket

// ****************************************************************************

// Functions

// Start servers
exports.start = function(app, port)
{
    g_http_server = http.createServer(app).listen(port);  //Server listens on the port 8124
    g_http_listener = io.listen(g_http_server);             // Web socket
    g_http_listener.set('origins', '*:8124');             // Web socket settings for security or lack of
}

// Set up callbacks for browser socket
exports.setCallbacks = function(connect_cb, disconnect_cb, data_cb)
{
    g_http_listener.sockets.on("connection", function(socket)
    {
        console.log('Socket.io Connection with the client established');
        socket.on('disconnect', function () {
            console.log("Disconnect");
            disconnect_cb();
        });

        // Data
        socket.on('data', function(message) // Detector messages
        {
            var data = JSON.parse(message);
            console.log("Data ", data);
            data_cb(data);
        });

       // First connect data send
       connect_cb(socket);
    });
}

// Send data to browser functions
exports.send_all = function(data)
{
    var json_mesg =JSON.stringify(data);
    g_http_listener.sockets.emit('data', json_mesg);
}
