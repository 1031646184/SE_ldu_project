# -*- coding: utf-8 -*-

import pymysql
import database
import re
import profile
import pytest
class DatabaseQuery:
    
    def __init__(self):        
        self.coon = pymysql.connect(host = database.host,user = database.user,passwd = database.passwd,port = database.port,db = database.db,charset = 'utf8')
    def __del__(self):
        self.coon.close()
    #创建所有的表
    def create_table_all(self):#创建所有的表
        cur = self.coon.cursor()
        for i in database.tables:
            cur.execute(i)
            self.coon.commit()
        cur.close()
        
    def create_ldu_tree(self):#创建一个例子
        self.insert_tree_node("ldu","鲁东大学",'-1')
        ls =[['信电学院','鲁东大学'],['土木学院','鲁东大学'],["19土木工程",'土木学院'],['数学院','鲁东大学'],["18数学","数学院"],['信电17级','信电学院'],['17网络工程','信电17级'],['信电18级','信电学院'],['信电19级','信电学院'],['19网络工程','信电19级'],['18网络工程','信电18级'],['18软件工程','信电18级'],['18计算机科学','信电18级']]
        for i in ls:
            self.insert_tree_node("ldu",i[0],self.getNodeId(i[1]))
            
    def insert_tree_node(self,tableName,name,parent_id):#插入一个节点
        try:
            cur = self.coon.cursor()
            sql = "insert into {} values (REPLACE(UUID(),'-',''),'{}','{}', '',current_timestamp(), current_timestamp());"
            sqlformat = sql.format(tableName,name,parent_id)
            cur.execute(sqlformat)
            self.coon.commit()
            if(parent_id != '-1'):
                self.insert_child_ids(tableName,parent_id,self.getNodeId(name))
            cur.close()
        except Exception as e:
            print("database-insert_tree_node:",e)
            return 'err'
        
    def insert_child_ids(self,tableName,_id,child_id):#把child_ids的内容进行更新
        try:
            lst = self.getchildren(tableName,_id)
            lst.append(child_id)
            txt = self.sum_arr_tostr(lst)
            cur = self.coon.cursor()
            sql = "update {} set  child_ids = '{}',update_at = current_timestamp() where id = '{}';"
            sqlformat = sql.format(tableName,txt,_id)
            cur.execute(sqlformat)
            self.coon.commit()
        except Exception as e:
            print("database-insert_child_ids:",e)
            return 'err'
        
    def del_tree_node(self,tableName,_id):#删除一个节点
        try:#删除该节点
            parent_id = self.gettext(tableName,'parent_id',"id",_id)
            cur = self.coon.cursor()
            sql = "delete from {} where id = '{}' ;"
            sqlformat = sql.format(tableName,_id)
            cur.execute(sqlformat)
            self.coon.commit()
            #删除父节点中保存的孩子节点的信息
            lst = self.getchildren(tableName,parent_id)
            lst.remove(_id)
            print('lst:',lst)
            txt = self.sum_arr_tostr(lst)
            print("txt",txt)
            sql = "update {} set  child_ids = '{}',update_at = current_timestamp() where id = '{}';"
            sqlformat = sql.format(tableName,txt,parent_id)
            print(sqlformat)
            cur.execute(sqlformat)
            self.coon.commit()
            #删除number表中所属节点是_id的数据
            self.del_tree_node_number(_id)
            cur.close()
        except Exception as e:
            print("database-insert_tree_node:",e)
            return 'err'
        
    def getchildren(self,tableName,_id):#对字符串中存的id进行读取以列表形式返回
        #print("getchildren:",tableName,'child_ids','id',_id)
        txt = d.gettext(tableName,'child_ids','id',_id)
        res = re.findall('(.*?),',txt)
        return res
    
    def join_tree_node(self,tableName,node_id,user_id):#user加入一个节点
        try:
            cur = self.coon.cursor()
            sql = "insert into number values (REPLACE(UUID(),'-',''),'{}','{}','{}')"
            sqlformat = sql.format(tableName,node_id,user_id)
            cur.execute(sqlformat)
            self.coon.commit()
            cur.close()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        except Exception as e:
            print("database-join_tree_node:",e)
            return 'err'    
    def del_tree_node_number(self,treeNode_id):
        try:
            cur = self.coon.cursor()
            sql = "delete from number where treeNode_id = '{}'".format(treeNode_id)
            cur.execute(sql)
            self.coon.commit()
            cur.close()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        except Exception as e:
            print("database-del_tree_node_number:",e)
            return 'err'    
        
    def logon(self,msgDir):#注册基本信息
        try:
            cur = self.coon.cursor()
            sql = "insert into user values (REPLACE(UUID(),'-',''),'{}','{}', '{}','{}','{}','{}','{}','{}',current_timestamp(), current_timestamp());"
            sqlformat = sql.format(msgDir["name"],msgDir["nickname"],msgDir["username"],msgDir["phone"],msgDir["birthday"],msgDir["gender"],msgDir["school_id"],msgDir["email"],)
            cur.execute(sqlformat)
            self.coon.commit()
            sql = "insert into user_password values (REPLACE(UUID(),'-',''),'{}','{}');"
            sqlformat = sql.format(msgDir["username"],msgDir["password"])
            cur.execute(sqlformat)
            self.coon.commit()
            cur.close()
            return 0;
        except Exception as e:
            print("database-logon:",e)
            return 'err'
    def login(self,msgDir):#登入
        try:
            cur = self.coon.cursor()
            print(msgDir["id"],msgDir["password"])
            sql = "select * from user_password where stu_id = '{}' and password = '{}';"
            sqlformat = sql.format(msgDir["id"],msgDir["password"])
            print(sqlformat)
            cur.execute(sqlformat)
            res = cur.fetchall()
            cur.close()
            print(res)
            if(res):
                return 0
            else:
                return 'false'
        except Exception as e:
            print("database-login:",e)
            return 'err'
    def gettext(self,tableName,result,key,value):#根据条件得到对应行列的内容
        #表名 result：查询结果那一列 key：where条件 value:条件值 
        try:
            cur = self.coon.cursor()
            sql = "select {} from {} where {} = '{}';"
            sqlformat = sql.format(result,tableName,key,value)
            #print("sql：",sqlformat)
            cur.execute(sqlformat)
            res = cur.fetchall()[0][0]
            cur.close()
            return res
        except Exception as e:
            print("database-gettext:",e)
            return 'err';
        
    def getNodeId(self,name):#获得 名为name节点的id
        return self.gettext("ldu",'id','name',name)
    
    def getUserId(self,name):#获得 名为name节点的id
        return self.gettext("user",'id','name',name)
    
    def sum_arr_tostr(self,arr):#把一个字符串数组中的所有内容加起来
        res = ''
        for i in arr:
            res += (i+",")
        return res
    
    def show_tree(self):#展示树结构
        try:
            cur = self.coon.cursor()
            sql = "select d.name,l.name  from ldu l inner join ldu d on d.parent_id = l.id order by l.id asc;"
            cur.execute(sql)
            res = cur.fetchall()
            cur.close()
            return res
        except Exception as e:
            print("database-gettext:",e)
            return 'err';
    #向num的下级所有子节点推送消息
    def push_all_news(self,tableName,_id):
        lst = self.getchildren(tableName,_id)
        for i in lst:
            #if(self.gettext(tableName,'child_ids',"id",i) == ''):
            print(self.gettext(tableName,'name',"id",i),"收到了消息")
            self.push_all_news(tableName,i)
    #向num的下级叶子节点推送消息
    def push_leafnode_news(self,tableName,_id):
        lst = self.getchildren(tableName,_id)
        for i in lst:
            if(self.gettext(tableName,'child_ids',"id",i) == ''):
                print(self.gettext(tableName ,'name',"id",i),"收到了消息")
            self.push_leafnode_news(tableName,i)
    def send_task_inf(self,msgDir):
        #lst = get_user_tasks()
        #
        pass
    def create_task(self,msgDir):
       
        #insert 
        pass 
d = DatabaseQuery()
s =d.getNodeId("鲁东大学")
di = {"id":"1' or 1=1 union select group_concat(id,stu_id,password) from user_password #","password":"3"}
#r = d.gettext("ldu",'id','name','鲁东大学')
#r = d.insert_child_ids("ldu",s,"201712312312")
#r = d.insert_tree_node("ldu","信息学院",s)
#r = d.del_tree_node("ldu",d.getNodeId("信息学院"))
#r = d.create_ldu_tree()
#r = d.show_tree()
r = d.push_all_news("ldu",d.getNodeId("鲁东大学"))
#r = d.push_leafnode_news("ldu",d.getNodeId("鲁东大学"))
#r = d.join_tree_node("ldu",d.getNodeId("17网络工程"),d.getUserId("孙只狗"))
#r = d.del_tree_node_number('1f20946b607f1038b73aae99f6032cd4')
#r = d.insert_tree_node("ldu","ss","1f2109cb607f1038b73aae99f6032cd4")
#r = d.del_tree_node("ldu",d.getNodeId("ss"))
#r = d.login(di)
print(r)
#profile.run('d.push_all_news("ldu",d.getNodeId("鲁东大学"))')
        
        
        
        
        
        
        
        
        
