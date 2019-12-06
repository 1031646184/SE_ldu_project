var app = getApp();
  function websocketSendRequest(cmd,content) {
    console.log('调用websocketSendMessage成功')
    var clientid = app.globalData.userid;
    var cmd = cmd;
    var content =content;
    console.log("contetn:"+content);
    wx.connectSocket({
      url: 'ws://49.233.169.186:8080'
    })
    var that = this;
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      //var that = this;
      var sendStr = that.cmdHandle(clientid,cmd,content);
      wx.sendSocketMessage({
        data: sendStr
      })
      console.log('发送完毕');

    })
    wx.onSocketMessage(function (res) {
      //this.analysisRes1(res.data)
      console.log('接收消息成功');
      console.log(res)
      //that.analysisRes('getTaskInfRes',res)
      //console.log('taskInf'+taskInf)
      
      //console.log(res)
      wx.closeSocket({

      })

    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })
    console.log("+++++++++"+taskInf)

    return taskInf;
    
  }

  
  function cmdHandle(clientid,cmd,content){ //构造发送的数据
    console.log('-------------cmdHanle()-----------------');
    var scmd = new Array('getTaskInf', 'logOn', 'logIn', 'pushNotice')
    var contobj;
    if (cmd =='pushNotice'){ //构造发送通知的请求
      contobj = '{ "publisher_id": "'+clientid+'", "title": "'+content[0]+'", "description": "'+content[1]+'", "start_date": "2019-11 - 25 11: 45: 11", "end_date": "2019-11 - 25 11: 45: 11", "attachments_id": "attachments_id", "submit_attachments": 11 }';
    }else if(cmd =='getTaskInf'){//构造获取任务信息的请求
      contobj = 'null';
    };

    var obj = { userid: clientid, cmd: cmd, content: contobj }; //构造发送的对象
    var str = JSON.stringify(obj);//转化为字符串
    //console.log(str);
    return str;
      
  }

  function analysisRes(cmd,mess) { //解析收到的数据
    //console.log(mess['data'])
    //var mess = '{"status":1,"content":{ "task1": {"publisher_id": "001", "title": "title1", "description": "description", "start_date": "2019-11 - 25 11: 45: 11", "end_date": "2019-11 - 25 11: 45: 11", "attachments_id": "attachments_id", "submit_attachments": 11}, "task2": {"publisher_id": "001", "title": "title2", "description": "description", "start_date": "2019-11 - 25 11: 45: 57", "end_date": "2019-11 - 25 11: 45: 57", "attachments_id": "attachments_id", "submit_attachments": 11}, "task3": {"publisher_id": "001", "title": "title3", "description": "description", "start_date": "2019-11 - 25 11: 47: 08", "end_date": "2019-11 - 25 11: 47: 08", "attachments_id": "attachments_id", "submit_attachments": 11} }}';
    var jsonStr,jsonObject;
    if(cmd =='getTaskInfRes'){
      var jsObject = JSON.parse(mess['data']);    //转换为json对象
      //console.log(jsObject);
      var myArray = new Array();
      for (var key in jsObject) {
        //console.log(key);
        //console.log(jsObject[key]); //json对象的值
        jsonStr = JSON.stringify(jsObject[key]);
        taskInf = jsonStr;
        console.log(taskInf)
        jsonObject = JSON.parse(jsonStr);


        for (var k in jsonObject) {
          myArray.push(jsonObject[k]);
         // taskInf.push(jsonObject[k]);
          console.log(jsonObject[k]);
        }
      }  
      console.log('myarray'+myArray[0].title);
      //taskInf = myArray.concat();
      //return myArray;

    }
    else if(cmd=='pushNoticeRes'){


    }
  }




module.exports = {
  //taskInf,
  websocketSendRequest:websocketSendRequest,
  cmdHandle:cmdHandle,
  analysisRes:analysisRes
}

