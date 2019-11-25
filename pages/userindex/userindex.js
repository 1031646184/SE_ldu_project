// pages/userindex/userindex.js
Page({
  ar: new Array({
    title: "新的通知1",
    content: '1',
    read: "未读",
  }, {
      title: "新的通知2",
      content: '2',
      read: "未读",
    }, {
      title: "新的通知3",
      content: '3',
      read: "未读",
    }),
  data: {
     i :0,
    container: null,
    active: 0,
    obj: [],  
    notice:({
      title:"新的通知",
      content: '通知内容1',
      read:"未读",
    },
      {
        title: "新的通知",
        content: '通知内容2',
        read: "未读",
      },
      {
        title: "新的通知",
        content: '通知内容3',
        read: "未读",
      })
  },

  
  /***增加组件 */
  onTapAdd: function (e) {
    console.log(this.ar[1]);
var i =0;

    var temp = this.data.obj;
    temp.push(this.data.notice);
    this.setData({
      obj: temp
    })
  },
  /***** 删除最后一个组件，也可以修改删除指定组件*/
  onTapDel: function (e) {
   
    var temp = this.data.obj;
    temp.pop(this.data.obj);
    this.setData({
      obj: temp
    })},

  onChange(event) {
    this.setData({ active: event.detail });
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
    console.log(req);
    this.test1(req);

  },
  encodeRequset: function (user,cmd) {

    var req = "<cmd>" + cmd + "</>";
    this.test1(req);

  },

  test1: function () {
    wx.connectSocket({
      url: 'ws://127.0.0.1:8080'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: "df"
      })

    })


    wx.onSocketMessage(function (res) {
      this.analysisRes1(res.data)
      console.log(res)
      wx.closeSocket({

      })

    })

    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })
  },

  analysisRes1: function () { //解析收到的数据
    var str = '{ "task1": "{"publisher_id": "001", "title": "title1", "description": "description", "start_date": "2019-11 - 25 11: 45: 11", "end_date": "2019-11 - 25 11: 45: 11", "attachments_id": "attachments_id", "submit_attachments": 11}", "task2": "{"publisher_id": "001", "title": "title1", "description": "description", "start_date": "2019-11 - 25 11: 45: 57", "end_date": "2019-11 - 25 11: 45: 57", "attachments_id": "attachments_id", "submit_attachments": 11}", "task3": "{"publisher_id": "001", "title": "title1", "description": "description", "start_date": "2019-11 - 25 11: 47: 08", "end_date": "2019-11 - 25 11: 47: 08", "attachments_id": "attachments_id", "submit_attachments": 11}" }';

    var st = '{ "bar": "property", "baz": 3 }';
    var jsObject = JSON.parse(str);    //转换为json对象
    for (var key in jsObject) {
      console.log(key); 
      console.log(jsObject[key]); //json对象的值  

    }  
   


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.analysisRes1();
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