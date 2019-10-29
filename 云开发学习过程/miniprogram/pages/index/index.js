//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    const db = wx.cloud.database();

    //获取所有用户：使用了orderBy、skip、limit
    db.collection("users").get({
      success: res => {
        console.log("获取所有用户：", res.data);
      },
      fail: res=>{
        console.log("获取用户失败：", res);
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  test:function(){
    console.log("测试")
  },
  testAdd:function(){
    const db = wx.cloud.database();
    db.collection("users").add({
      data:{
        name : "sdd",
        id : 12223,
        sds : new Date("2019-10-29"),
        tags : [
          "sad",
          "sda"
        ],
      },
      success:res=>{
        console.log("success",res)
      },
      fail:err=>{
        console.log("fail",err)
      },
      complete:res=>{
        console.log("complete",res)
      },
    });
  },
  testGet:function(){
    const db = wx.cloud.database();
    var uesrDoc = db.collection("users").doc("1c756ce65db7e5b8021a6bd637a2bdc9")
    uesrDoc.get({
      success:res=>{
        console.log("success",res)
      },
      fail:err=>{
        console.log("fail",err)
      }
    })

  },
  testUpdate:function(){
    const db = wx.cloud.database();
    var uesrDoc = db.collection("users").doc("1c756ce65db7e5b8021a6bd637a2bdc9")
    uesrDoc.update({
      data:{
        name : 213,
        fufu : 23213,
      },
      success:res=>{
        console.log("success",res)
      },
      fail:err=>{
        console.log("fail",err)
      },
      complete:res=>{
        console.log("complete",res)
      },
    })
    
  },
  testSet:function(){
  const db = wx.cloud.database();
  var uesrDoc = db.collection("users").doc("1c756ce65db7e5b8021a6bd637a2bdc9")
  uesrDoc.update({
    data:{
      name : 213,
      fufu : 23213,
    },
    success:res=>{
      console.log("success",res)
    },
    fail:err=>{
      console.log("fail",err)
    },
    complete:res=>{
      console.log("complete",res)
    }
  })
  },
  testRemove:function(){
    const db = wx.cloud.database();
    var uesrDoc = db.collection("users").doc("1c756ce65db7e5b8021a6bd637a2bdc9")
    uesrDoc.remove({
      success:res=>{
        console.log("success",res)
      },
      fail:err=>{
        console.log("fail",err)
      },
      complete:res=>{
        console.log("complete",res)
      }
  })
  },
  //条件查询
  testWhere:function(){
    const db = wx.cloud.database();
    var user = db.collection("users")
    user.where({
        name : "ssd",
        ty : "d"
    }).get({
      success:res=>{
        console.log("success",res)
      },
    })
  },
  //排序
  testOrderBy:function(){
    const db = wx.cloud.database();
    var user = db.collection("users")
    user.where({
      age : "1"
    }).orderBy("age","asc").get({
      success:res=>{
        console.log("success",res)
      }
    })
  },
  //跳过 查 
  testSkipAndLimit:function(){
    const db = wx.cloud.database();
    var user = db.collection("users")
    user.skip(2).limit(2).get({
      success:res=>{
        console.log("success",res)
      }
    })
  },
  testField:function(){
    const db = wx.cloud.database();
    var user = db.collection("users")
    user.field({
      name : true
    }).get({
      success:res=>{
        console.log("success",res)
      }
    })
  },
  testJpg:function(){
    const db = wx.cloud.database();
    var user = db.collection("users")
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success :res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log("1  "+res.tempFilePaths[0])
        const filePath = res.tempFilePaths[0];
        const cloudPath = 'myimg'+res.tempFilePaths[0].match(/\.[^.]+?$/)[0];
        wx.cloud.uploadFile({
          cloudPath,
          filePath, // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID)
          },
          fail: err => {
            // handle error
            console.log(""+err)
          }
        })
      }
    })
    

  },
})
