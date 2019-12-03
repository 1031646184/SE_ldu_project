# -*- coding: utf-8 -*-
"""
Created on Sat Nov 23 13:51:53 2019

@author: dell
"""
from database_operation import DatabaseQuery
import re
import json
class analysis:
    def __init__(self,msg):
        #key = re.findall('<([^/]*?)>',msg)
        #value = re.findall('<[\s\S]*?>([\s\S]*?)</>',msg)
        #self.msgDir = dict(zip(key,value))
        try:
            self.msgDir = json.loads(msg)
        except Exception as e:
            print("database-logon:",e)
            return 'err'
    def run(self):
        for i,j in self.msgDir.items():
            if(i == "cmd"):
                if(j == 'getTaskInf'):
                    return self.getTaskInf()
                elif(j == 'logon'):
                    self.logon()
    def getTaskInf(self):
        return "阿萨"
    def logon(self):
        dq = DatabaseQuery()
        result = dq.logon(self.msgDir)
        return result;
'''        
a = analysis(' <cmd>logon</><username>201722033</><password>123456</><nickname>狗狗</><name>孙只狗</><school_id>鲁东</><birthday>1998-8-2</><gender>公</><phone>188888999</><email>1222@qq.com</>')
print(a.msgDir)
a.run()
'''













