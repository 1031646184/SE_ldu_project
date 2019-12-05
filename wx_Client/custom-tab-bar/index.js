Component({
	data: {
		active: 0,
		list: [
			{
        icon: 'wap-home-o',
				text: '首页',
        url: "pages/userindex/userindex"
			},
			{
        icon: 'comment-o',
				text: '发送通知',
        url: "pages/senMessage/senMessage"
			},
      {
        icon: 'setting-o',
        text: '设置',
        url: "pages/setting/setting"
      }
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: '/'+this.data.list[event.detail].url,
        
			});
      
      console.log(this.url)
		},
    init(i) {
      const page = getCurrentPages().pop();
      this.setData({
        active:i
      });
	}

	}
});
