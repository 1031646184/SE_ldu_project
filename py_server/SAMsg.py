# -*- coding: utf-8 -*-
"""
Created on Sun Nov 24 17:09:35 2019

@author: azurlin
"""
from  database_operation import DatabaseQuery
"""
username:20172203011
"""
import json
class MsgFormat:
    def sendMsgFormat(self,userid):
        dbo = DatabaseQuery()
        json_str= dbo.selectUser_task_inf(userid) #需要传用户id
        dic = json.loads(json_str)
        #print(dic)
        #sendDict = {}
        taskFormtemp = ''
        taskCount = 0
        for key in  dic:
           # print(dbo.getTaskInf(key)) #返回Json
            gts = dbo.selectTask(key)
            taskCount+=1
            taskFormtemp += '{0}:{1},'.format(str(taskCount),gts) 
        taskForm = '{'+taskFormtemp[:-1]+'}'
        
        print(taskForm)
        return taskForm

    def acceptMsgFormat(self,msg):
        json_str = msg
        acdic = json.loads(json_str)
        
        userid = acdic['userid']
        cmd = acdic['cmd']
        content = acdic['content']
        
        if cmd == 'getTaskInf':
            content = acdic['content'].replace("\\\"", "'");
            return self.getTaskInf(userid)            
        elif cmd == 'pushNotice':
            content = acdic['content'].replace("\\\"", "'");
            return self.pushNotice(content)   
        elif cmd == 'login':
            dq = DatabaseQuery() 
            return dq.login(content)
        

    def getTaskInf(self,userid):
            
        dbo = DatabaseQuery()
        json_str= dbo.selectUser_task_inf(userid)

        dic = json.loads(json_str)
        print(dic)
        #sendDict = {}
        taskFormtemp = ''
        taskCount = 0
        for key in  dic:
           # print(dbo.getTaskInf(key)) #返回Json
           try:
               gts = dbo.selectTask(key)
           except:
               print('查询失败')
               continue
           taskCount+=1
           taskFormtemp += '"{0}":{1},'.format('task'+str(taskCount),gts)
        taskForm = '{'+taskFormtemp[:-1]+'}'
        taskFormstatus = '{'+'"status":1'+','+'"content":'+taskForm+'}'
        
        
        print(type(taskForm))
        return taskFormstatus
        
    def pushNotice(self,content):
        
        dbo = DatabaseQuery()
        
        dic = json.loads(content) #转化为字典对象
        userid = dic['publisher_id']
        title = dic['title']
        content = dic['description']
        print(userid,title,content)
        uuid = dbo.insertTask(dic['publisher_id'],dic['title'],dic['description'])
        dbo.get_leafnode("ldu",dbo.getNodeId("鲁东大学"),uuid)
        #dbo.gettext('number','treeNode_id','stu_id',dic['publisher_id'])
       #test: uuid = dbo.insertTask('108','t3','popopopopo') #更新数据库的任务表信息
        #print(uuid[0][0])
        #uuid[0][0]
        #调用孙志磊发消息的函数
        return 'ok'
'''        
sa = MsgFormat()
sa.getTaskInf('104')
'''
'''                
dbo = DatabaseQuery()
taskinf = dbo.selectUser_task_inf('105')
print(taskinf)
uuid = '8af15a3f15c' #uuid作为key
state ='00' #默认状态 作为值
if taskinf is None:
    dic = {}
    dic[uuid] = state
    task = json.dumps(dic)
    print(task)
'''    
        
'''       
    def logIn():
    def logOn():
    def getOrgInf():
'''
    
'''   
sa = samsg() 
msg="""{"userid":"104","cmd":"pushNotice","content":{"task1":{"publisher_id":"001","title":"title1","description":"description","start_date":"2019-11 - 25 11: 45: 11","end_date":"2019-11 - 25 11: 45: 11","attachments_id":"attachments_id","submit_attachments":11},"task2":{"publisher_id":"001","title":"title2","description":"description","start_date":"2019-11 - 25 11: 45: 57","end_date":"2019-11 - 25 11: 45: 57","attachments_id":"attachments_id","submit_attachments":11},"task3":{"publisher_id":"001","title":"title3","description":"description","start_date":"2019-11 - 25 11: 47: 08","end_date":"2019-11 - 25 11: 47: 08","attachments_id":"attachments_id","submit_attachments":11}}}"""
#print(sa.sendMsgFormat('104'))
print(sa.acceptMsgFormat())
'''
'''
######acceptMsgFormat
    1.将收到的字符串处理成json格式
    2.将json格式转化为字典
    3.取content的值 转化为字典
    4.相应操作

######请求消息格式
服务端收到的请求信息格式
    json格式字符串:
        
        {
            userid:用户id
            cmd: 执行命令
            content: 1.json格式的字符串 2.无内容
        }
服务端发送的信息格式:
    json格式字符串:
        
        {
             state: 1. 处理成功返回suc 2. 失败返回err
             content: 1.json格式字符串 2.错误信息
        }
'''
    