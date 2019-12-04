

wsUti({
  websocketSendMessage: function (cmd,content) {
    console.log('调用websocketSendMessage成功')
    var clientid = '104';
    var cmd = cmd;
    var content =content;
    console.log("contetn:"+content);
    wx.connectSocket({
      url: 'ws://127.0.0.1:8080'
    })
    var that = this;
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      //var that = this;
      var sendStr = that.cmdHandle(clientid,cmd,content);
      wx.sendSocketMessage({
        data: sendStr
      })

    })
    wx.onSocketMessage(function (res) {
      //this.analysisRes1(res.data)
      //console.log(res)
      wx.closeSocket({

      })

    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })
  },
  sendRequest:function(){
    //var clientid = '104';
    var scmd = new Array('getTaskInf', 'logOn', 'logIn', 'pushNotice')

    var contobj = '{ "publisher_id": "001", "title": "title1", "description": "description", "start_date": "2019-11 - 25 11: 45: 11", "end_date": "2019-11 - 25 11: 45: 11", "attachments_id": "attachments_id", "submit_attachments": 11 }'
    //var contstr = JSON.stringify(contobj)
    var obj = { userid: clientid, cmd: scmd[3], content: contobj }; //构造发送的对象
    var str = JSON.stringify(obj)//转化为字符串
  },
  
  cmdHandle:function(clientid,cmd,content){
    console.log('-------------------------------');
    var scmd = new Array('getTaskInf', 'logOn', 'logIn', 'pushNotice')
    var contobj;
    if (cmd =='pushNotice'){ //构造发送通知的请求
      contobj = '{ "publisher_id": "'+clientid+'", "title": "'+content[0]+'", "description": "'+content[1]+'", "start_date": "2019-11 - 25 11: 45: 11", "end_date": "2019-11 - 25 11: 45: 11", "attachments_id": "attachments_id", "submit_attachments": 11 }';
    }else if(cmd =='getTaskInf'){//构造获取任务信息的请求
      contobj = 'null';
    };

    var obj = { userid: clientid, cmd: cmd, content: contobj }; //构造发送的对象
    var str = JSON.stringify(obj);//转化为字符串
    console.log(str);
    return str;
      
  },


})
module.exports = wsUti;

