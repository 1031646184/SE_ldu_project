// pages/senMessage/senMessage.js
var app = getApp();
import { $wuxCalendar } from '../../wdist/index'
import Dialog from '../../dist/dialog/dialog';
var ws = require('../../trans/websocketUtil')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pushNotice:({}),
    title:'',
    content:'',
    starttime:'',
    endtime:'',
    show:false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2020, 12, 30).getTime(),
    currentDate: new Date().getTime()
  },
  titleInput(e){
    this.setData({
      title:e.detail
    })
    console.log(e.detail)
  },
  contentInput(e){
    this.setData({
      content:e.detail
    })
  },
  push(){
    Dialog.confirm({
      title: '发布通知确认',
      message: '确认无误后请点击确定'
    }).then(() => { //点击确认，向服务器发送pushNotice请求
      //on sucess
      var content = new Array(this.data.title,this.data.content);//content数组0：title 1：内容
      var cmd = 'pushNotice';
      ws.websocketSendRequest(cmd, content);
      //this.websocketSendRequest(cmd,content); //调用发送信息函数
      console.log('内容:'+content)
    }).catch(() => {
      // on cancel
    });
    console.log("点击发送通知")
  },
  onInput(event) {
    //console.log(event.detail)
    this.setData({
      currentDate: event.detail
    });
  },

  getValues(e){
    //var time = getValues()
    console.log(e.detail)
  },
  showPopup() {
    this.setData({ show: true });
  },
  onStartSuccess(event){
    var time = event.getValues()
    console.log(time)
  },
  onEndSuccess(event){
    //var time = event.getValues()
    console.log(this.getValues())
  },
 
  onClose() {
    console.log("kkl")
    this.setData({ show: false });
  },
  openCalendar1() {
    $wuxCalendar().open({
      value: this.data.value1,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          value1: displayValues,
        })
      },
    })
  },
  openCalendar2() {
    $wuxCalendar().open({
      value: this.data.value2,
      multiple: true,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          value2: displayValues,
        })
      },
    })
  },
  openCalendar3() {
    $wuxCalendar().open({
      value: this.data.value3,
      direction: 'vertical',
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          value3: displayValues,
        })
      },
    })
  },
  openCalendar4() {
    const now = new Date()
    const minDate = now.getTime()
    const maxDate = now.setDate(now.getDate() + 7)

    $wuxCalendar().open({
      value: this.data.value4,
      minDate,
      maxDate,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          value4: displayValues,
        })
      },
    })
  },

/*
  websocketSendRequest: function (cmd,content) {
    console.log('调用websocketSendMessage成功')
    var clientid = '104';
    var cmd = cmd;
    var content =content;
    console.log("contetn:"+content);
    wx.connectSocket({
      url: 'ws://127.0.0.1:8080'
    })
    var that = this; //保留this指向对象
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
  //处理发送请求
  cmdHandle:function(clientid,cmd,content){
    console.log('调用cmdHandle');
    var scmd = new Array('getTaskInf', 'logOn', 'logIn', 'pushNotice') //存放命令
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
      
  },*/

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
    this.getTabBar().init(1);
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

  }
})