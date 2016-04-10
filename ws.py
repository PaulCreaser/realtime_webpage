#!/usr/bin/python

import sys
import syslog
import os
import websocket
try:
    import thread
except ImportError:
    import _thread as thread
import math
import random
import time
import json
import io
import time

    
websocket.enableTrace(True)

def on_message(ws, message):
    print("Message ***********************************")
    print(message)


def on_error(ws, error):
    print("Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    print(error)


def on_close(ws):
    print("### closed ###")

started = False

def on_open(ws):

    global started 

    print("Opened")

    def run(*args):
	i=0
	print("Run")
	while i==0: 
        	try:
			packet = 1;
			print(packet)
			jdata = json.dumps(packet)
			print(jdata)
			time.sleep(1);
                	ws.send(jdata)
			print("Send data")
        	except:
        		return
	
	print("Close")
        ws.close()

    if started == False:
        thread.start_new_thread(run, ())
        started = True

host="ws://localhost:8127/"
ws = websocket.WebSocketApp(host, on_message = on_message,
          on_error = on_error, on_close = on_close)
ws.on_open = on_open

ws.run_forever()
