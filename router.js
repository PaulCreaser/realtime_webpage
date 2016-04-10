/**
* Libraries
*/
var express = require('express');
var qs 	= require('querystring');
var io 	= require('socket.io');
var sys = require ('sys');
var fs 	= require('fs'); 
var busboy = require('connect-busboy');
var path = require('path');

// *****************************************************************************************************

// User libraries

var browser_socket  = require('./browser_socket.js');
var ble_gateway     = require('./ble_gateway.js');

// *****************************************************************************************************

// Callback when data received from gateway
function gateway_cb(data)
{
	console.log("Gateway Data", data);
	browser_socket.send_all(data);
}

// Browser connect callback
function browser_connect(socket)
{
	console.log('Browser Connect');
}

// Browser disconnect callback
function browser_disconnect(socket)
{
	console.log('Browser Disconnect');
}

// Callback on reception of data from callback
function browser_data_cb(data)
{
	console.log('Browser data');
}

// Web Server and Webocket server startup
server_start = function()
{
	var app = express();
	app.use(busboy());
	app.use(express.static('/var/nodejs/www/public'));

	// Gateway data
	ble_gateway.start(gateway_cb);

	// Web server and Browser websocket server
	browser_socket.start(app, 8124);
	browser_socket.setCallbacks(browser_connect, browser_disconnect, browser_data_cb);
}

server_start();
