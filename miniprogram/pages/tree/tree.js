// pages/tree/tree.js
Page({

  data: {
      tree:[],
      _id : "4a741dc95dbceb4a003fec385a7c66af"
  },

  onLoad: function (options) {

  },

  show:function(){
      //
      const db = wx.cloud.database()
      //this.addNode("心电院",[],2,_id);
      //this.addNode("土木学院",[],0,_id)；
      //this.delNode(4,_id);
      var last;
      function numberone(){
          var b=20;
          function numbertwo(){
              var c=30;
              console.log(c);
          }
          last=numbertwo;
          console.log(b);
      }
      //先调用外部函数
      numberone();
      //再调用内部函数
      last();
  },
  shownew:function(){
    this.databaseAdd("鲁东d大学")
  },
  showadd:function(){
    console.log(this.data._id)
    this.addNode("土22木2院",[],10,this.data._id)
  },
  showdel:function(){
    this.delNode(5,this.data._id);
  },
  showpushAllNews:function(){
    this.pushAllNews(2)
  },
  //根据number查到对应的行
  findNode:function(arr,number){
    console.log(1);
    for(var i=0;i<arr.length;i++)
      if(arr[i][0] == number)
        return i;
  },
  //添加节点
  addNode:function(name,member,parent,_id){
      const db = wx.cloud.database()
      const doc = db.collection('tree').doc(_id)
      const i = this.a
      doc.get({
        success: function(res) {
          var tree = res.data.tree;
          for(var i=0;i<tree.length;i++)
            if(tree[i][0] == parent){
              tree[i][4].push(res.data.count)//给父节点添加孩子节点的信息
              break
            }
          tree.push([res.data.count,name,member,parent,[]]);//序号，名字，成员，父节点，孩子
          doc.update({
            data:{
              tree: tree ,
              count: res.data.count+1
            },
            success:res=>{
              console.log("ok")
            },
            fail:err=>{
              console.log("no")
            }
          })
        }
      })
  },
  //删除节点
  delNode:function(number,_id=0){
    const db = wx.cloud.database()
    const doc = db.collection('tree').doc(_id)
    doc.get({
      success: function(res) {
        var tree = res.data.tree;
        for(var i=0;i<tree.length;i++)
          if(tree[i][0] == number){
            tree.splice(i,1)//删除节点
            break
          }
        doc.update({
          data:{
            tree: tree
          },
          success:res=>{
            console.log("ok")
          },
          fail:err=>{
            console.log("no")
          }
        })
      }
    })

  },
  //新建树
  databaseAdd:function(name){
      const db = wx.cloud.database()
      db.collection('tree').add({
        data: {
            tree : [//number//name//member//parent // child
                [0, name,[], -1,[] ] 
            ],
            count:1
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            this.setData({
              counterId: res._id,
              count: 1
            })
            wx.showToast({
              title: '新建树成功',
            })
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
      })
  },
  //向num的下级所有子节点推送消息
  pushAllNews:function(number){
    const db = wx.cloud.database();
    const doc = db.collection('tree').doc(this.data._id);
    console.log("asd")
    
    console.log(doc.get().then(res=>{console}))

    console.log("wqe");
    
    var fun1=()=>{
      console.log("fun1",this);
    };
    var fun2=()=>{
      return  new Promise(
        ()=>{
          console.log('fun2',this);
        }
    ).then(
        ()=>{
            console.log('then');
        }
    )
    };
    fun2(fun1());
    new Promise((resolve, reject) => {
      doc.get({
        success:res=>{
          console.log(2)
          resolve(res.data.tree)
        }
      })
    }).then(resolve => {
      console.log(resolve)
      return resolve
    })
    
  },
  pushNews:function(){
    const db = wx.cloud.database();
    const doc = db.collection('tree').doc(this.data._id);
    new Promise((resolve, reject) => {
      doc.get({
        success:res=>{
          console.log(1)
          resolve(res.data.tree)
        }
      })
    }).then(resolve => {
      console.log(resolve)
      return resolve
    })
  },
})

  /* var tree =res.data.tree;
        for(var i=0;i<tree.length;i++)
          if(tree[i][0] == number)
            break;
        for(var j=0;j<tree[i][4].length;j++)
          console.log(tree[i][4][j],"收到了消息")*/
      

