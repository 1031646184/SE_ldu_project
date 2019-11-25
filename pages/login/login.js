// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    username:'',
    password:'',
    nickname:'',
    name:'',
    school_id:'',
    birthday:'',
    gender:'',
    phone:'',
    email:''
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onChangeUsername(e) {
    this.setData({
      username:e.detail,
    })
  },
  onChangePassword(e) {
    this.setData({
      password: e.detail,
    })
  },
  onChangeNickname(e){
    this.setData({
      nickname: e.detail,
    })
  },
  onChangeName(e){
    this.setData({
      name: e.detail,
    })
  },
  onChangeSchool_id(e){
    this.setData({
      school_id: e.detail,
    })
  },
  onChangeBirthday(e){
    this.setData({
      birthday: e.detail,
    })
  },
  onChangeGender(e){
    this.setData({
      gender: e.detail,
    })
  },
  onChangePhone(e){
    this.setData({
      phone: e.detail,
    })
  },
  onChangeEmail(e) {
    this.setData({
      email: e.detail,
    })
  },


                           
  onClick:function(){
    console.log(this.data.username);
    console.log(this.data.password);
    console.log(this.data.nickname);
    console.log(this.data.name);
    console.log(this.data.school_id);
    console.log(this.data.birthday);
    console.log(this.data.gender);
    console.log(this.data.phone);
    this.encodeStr();
  },

  encodeStr:function(){
    //var txt=new Array("<username>","<password>","<nickname>","<name>","<school_id>","<birthday>","<gender>","<phone>");
    var label = new Array("username", "password", "nickname", "name", "school_id", "birthday", "gender", "phone","email");
    var content = new Array(this.data.username,
                            this.data.password,
                            this.data.nickname,
                            this.data.name,
                            this.data.school_id,
                            this.data.birthday,
                            this.data.gender,
                            this.data.phone,
                            this.data.email
        );
    /*var str = txt[0]+this.data.username+"</>"+
              txt[1]+this.data.password+"</>"+
              txt[2]+this.data.nickname+"</>"+
              txt[3]+this.data.name+"</>"+
              txt[4]+this.data.school_id+"</>"+
              txt[5]+this.data.birthday+"</>"+
              txt[6]+this.data.gender+"</>"+
              txt[7]+this.data.phone+"</>";

    console.log(str);*/
    this.encodeRequset(label,"logon",content); //
  },

  encodeRequset:function(str,cmd,content){

    var req  = "<cmd>"+cmd+"</>";
      for(var i=0;i<str.length;i++){
        req += '<'+str[i]+'>'+content[i]+'</>';
      }
      console.log(req); 
      this.test1(req);

  },

  test1: function (inr) {
    wx.connectSocket({
      url: 'ws://192.168.2.248:8080'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: inr
      })

    })


    wx.onSocketMessage(function (res) {
      console.log(res)
      wx.closeSocket({

      })

    })

    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })
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