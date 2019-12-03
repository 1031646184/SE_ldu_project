# -*- coding: utf-8 -*-
"""
Created on Sat Nov 23 13:51:53 2019

@author: dell
"""
from websocket_server import WebsocketServer
import re
from analysis import analysis

# 当新的客户端连接时会提示
def new_client(client, server):
    print("当新的客户端连接时会提示:%s" % client['id'])
    #server.send_message_to_all("Hey all, a new client has joined us")
 
 
# 当旧的客户端离开
def client_left(client, server):
    print("客户端%s断开" % client['id'])
 
 
# 接收客户端的信息。
def message_received(client, server, message):
    print("Client(%d) said: %s" % (client['id'], message))
    anlays = analysis(message)
    result = anlays.run()
    if(result == 'err'):
        print("sending err")
        server.send_message(client,'err')
    elif(result == 0):
        print("sending ok")
        server.send_message(client,'ok')
    
 
if __name__ == '__main__':
    
    
    server = WebsocketServer(8080, "0.0.0.0")
    server.set_fn_new_client(new_client)
    server.set_fn_client_left(client_left)
    server.set_fn_message_received(message_received)
    server.run_forever()
    '''
    
    s = '<id>312312412421</><name>dawdawd</><text>大师的就\n 大苏打\n会把素养</>'
    #s ='<cmd>100</>'
    key = re.findall('<([^/]*?)>',s)
    value = re.findall('<[\s\S]*?>([\s\S]*?)</>',s)
    print(dict(zip(key,value)))
    print(key)
    print(value)
    a = {'cmd': '100'}
    print(type(a))
    dirCmd = {"100":'getTaskInf'}
    for i,j in a.items():
        if(i == "cmd"): 
            print(dirCmd[j])
    '''
            
            
    
    
    
    
    