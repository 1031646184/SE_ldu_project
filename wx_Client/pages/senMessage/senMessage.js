// pages/senMessage/senMessage.js
import { $wuxCalendar } from '../../wdist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: [],
    value2: [],
    value3: [],
    value4: [],
    visible1: false,
    visible2: false,
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime()
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
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