// pages/userindex/userindex.js
var app = getApp();
Page({
  //ar: new Array({
   // }),

  data: {
    clientid:'',
    ar:[],
    i :0,
    container: null,
    obj: [],  
    /*notice:({
      publisher_id:"", //发布者id
      title: '', //通知标题
      description:'', //通知内容
      start_date:'', //开始时间
      end_date:'', //截止时间
      attachments_id:'', // 附件地址
      submit_attachments:'' //附件标记
    })*/
    pushnotice:({}),
    getnotice:({}),
    actions: [{
      type: 'default',
      bold:'true',
      text: '查看',
    }, {
      text: '完成',
      type: 'primary',
    }],
    acceptactions: [{
      type: 'default',
      bold: 'true',
      text: '查看详情',
    }, {
      text: '删除',
      type: 'primary',
    }],

  },
  onAction(e) {
    console.log('onAction', e.detail)
  },

  /***增加组件 */
  onTapAdd: function (e) {
    //console.log(this.ar[1]);
    //var i =0;
    //var stro = this.analysisRes(); //接受解析完返回的数组
    /*console.log("stro:"+stro);
    this.setData({
      notice:stro
    })*/
    //console.log(typeof(this.data.notice));
    //console.log("notice:"+this.data.notice);
    this.updateTap();
    //console.log("后notice:"+this.data.notice);
  },
  updateTap:function(){
    var temp = this.data.obj;
    temp.push(this.data.getnotice);
    this.setData({
      obj: temp
    })
    console.log('obj[]'+this.data.obj);
  },
  /***** 删除组件，也可以修改删除指定组件*/  // temp[0] = notic
  onTapDel: function (e) { 
    //var temp = this.data.notice;
    //console.log(temp[0]);
    //console.log(this.data.notice);
    //temp.pop(this.data.obj[0][0]);
    this.data.obj[0].splice(0,1);
    console.log("obj[0]:"+this.data.obj[0]);
    //temp.splice(0,1);
    //console.log("temp:"+temp);
    //this.data.notice.splice(1);
    //console.log(this.data.notice);
    //console.log(this.data.obj[0]);
    this.setData({
      getnotice:this.data.obj[0]
    })
    console.log("updateTap前的notice:"+this.data.getnotice);
    this.updateTap();
    //console.log(temp);
    console.log("updateTap之后的notice:"+this.data.getnotice);
    /*this.setData({
      obj: temp
    })*/
    
  },


  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container')
    });
  },
  //底部标签栏
  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail.name}`,
      icon: 'none'
    });
  },



  encodeRequset: function (str, cmd, content) {

    var req = "<cmd>" + cmd + "</>";
    for (var i = 0; i < str.length; i++) {
      req += '<' + str[i] + '>' + content[i] + '</>';
    }
    //console.log(req);
    this.test1(req);

  },
  encodeRequset: function (user,cmd) {

    var req = "<cmd>" + cmd + "</>";
    this.test1(req);

  },

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init(0);
    //var clientid = '104';
    //var cmd = 'getTaskInf'
    this.websocketSendRequest('getTaskInf','null')
    //console.log('=======ss========'+ss)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  websocketSendRequest:function(cmd,content) {
    console.log('调用websocketSendMessage成功')
    var clientid = app.globalData.userid;
    var cmd = cmd;
    var content =content;
    console.log("contetn:"+content);
    wx.connectSocket({
      url: 'ws://192.168.2.248:8080'
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
      that.analysisRes('getTaskInfRes',res)
      //console.log('taskInf'+taskInf)
      
      //console.log(res)
      wx.closeSocket({

      })

    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })

    
  },

  
  cmdHandle:function(clientid,cmd,content){ //构造发送的数据
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
      
  },

  analysisRes:function(cmd,mess) { //解析收到的数据
    var clientid = app.globalData.userid;
    //console.log(mess['data'])
    //var mess = '{"status":1,"content":{ "task1": {"publisher_id": "001", "title": "title1", "description": "description", "start_date": "2019-11 - 25 11: 45: 11", "end_date": "2019-11 - 25 11: 45: 11", "attachments_id": "attachments_id", "submit_attachments": 11}, "task2": {"publisher_id": "001", "title": "title2", "description": "description", "start_date": "2019-11 - 25 11: 45: 57", "end_date": "2019-11 - 25 11: 45: 57", "attachments_id": "attachments_id", "submit_attachments": 11}, "task3": {"publisher_id": "001", "title": "title3", "description": "description", "start_date": "2019-11 - 25 11: 47: 08", "end_date": "2019-11 - 25 11: 47: 08", "attachments_id": "attachments_id", "submit_attachments": 11} }}';
    var jsonStr,jsonObject;
    if(cmd =='getTaskInfRes'){
      var jsObject = JSON.parse(mess['data']);    //转换为json对象
      //console.log(jsObject);
      let gn = []; //接受的消息
      let pn = []; //发布的消息
      for (var key in jsObject) {
        //console.log(key);
        //console.log(jsObject[key]); //json对象的值
        jsonStr = JSON.stringify(jsObject[key]);
        //console.log(taskInf)
        jsonObject = JSON.parse(jsonStr);


        for (var k in jsonObject) {
          if(jsonObject[k].publisher_id == clientid){
            pn.push(jsonObject[k])
          }
          else{
            gn.push(jsonObject[k]);
          }
          
         // taskInf.push(jsonObject[k]);
          console.log('IDIDIDIDIDI:'+jsonObject[k].publisher_id);
        }
      }  
      this.setar(gn);
      this.setpushnotice(pn);
      console.log('myarray'+gn[0].title);
      //taskInf = myArray.concat();
      //return myArray;

    }
    else if(cmd=='pushNoticeRes'){


    }
  },
  setar:function(mes){
      this.setData({
        getnotice:mes
      })
      //console.log('############'+this.data.notice[0].title)
  },
  setpushnotice:function(mes){
      this.setData({
        pushnotice:mes
      })
  }

})