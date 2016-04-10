# realtime_webpage
Example use of nodejs for a realtime web page

A simple nodejs server program which receives data over a web socket and forwards that on to other web sockets.

The code incudes.

1 Python code for sending data to the nodejs server (ws.py)
2 Nodejs code for receiving and sending data
3 A simple web page for connecting to the nodejs server and receiving data over a websocket

This test app uses Nodejs

To install

sudo apt-get install nodejs
sudo apt-get install npm

Used Nodejs modules include

Express
Websocket
Busboy etc....

Use npm to install, for example:-

sudo npm -g install module_name

A python app is used to send test data. This uses a Websocket library which needs to be installed.

To test
-------

cp test.html to /var/Nodejs/www/public/.

sudo Nodejs router

sudo Python ws.py

From a browser enter the following url

http://localhost:8124/test.html

The web page currently does nothing, so you need to use the debugger to view the reception of any data from Websocket.

(Any errors in this readme are thanks to the iPad autocorrect functionality)

