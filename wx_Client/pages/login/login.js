var app = getApp();
Page({
  data: {
    userid: '',
    password: '',
    host: '49.233.169.186',
    port: '8080'
  },

  // 获取输入账号
  useridInput: function (event) {
    this.setData({
      userid: event.detail.value
    })
    app.globalData.userid = this.data.userid
  },

  // 获取输入密码
  passwordInput: function (event) {
    this.setData({
      password: event.detail.value
    })

  },

  // 登录
  login: function () {
    console.log(this.data.password)
    if (this.data.userid.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面
      if (this.connect()){

        wx.navigateTo({
          url: '../userindex/userindex'
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000

        })
      }

      else{
        wx.showToast({
          title: '登录失败',
          icon: 'false',
          duration: 2000
        })
        wx.switchTab({
          url: '../userindex/userindex' 
        })
      }

    }
  },
  connect: function () {
    wx.connectSocket({
      url: 'ws://' + this.data.host + ':' + this.data.port
    })
    var inf = { 'userid': this.data.userid, 'cmd': 'login', 'content': { 'userid': this.data.userid, 'password': this.data.password } };
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')

      wx.sendSocketMessage({
        data: JSON.stringify(inf)

      })
    })

    wx.onSocketMessage(function (res) {

      wx.closeSocket()
      console.log(res.data)
      if (res.data == 'ok')
        return true
      else
        return false

    })

    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })
  }
})