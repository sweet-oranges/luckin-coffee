// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:1,
    guigelist: [{ id: 1, name: "中杯" }, { id: 2, name: "大杯" }, { id: 3, name: "超大杯"}],
    wendulist: [{ id: 1, name: "常温" }, { id: 2, name: "加热" }, { id: 3, name: "加冰" }],
    tangdulist: [{ id: 1, name: "全糖" }, { id: 2, name: "少糖" }, { id: 3, name: "无糖" }],
    ishiddenmodal:true,
    selectionTopArr: [],
    containerTop: 0,
    shopsList: [],
    isziti: true,
    menulist: [],
    goodslist: [],
    activeType: -1,
    myaddress: {
      name: "南京金融科技大厦",
      distance: 0
    }
  },
  addcart(){
    this.setData({
      ishiddenmodal : true
    })
    wx.showToast({
      title: '已加入购物车',
      type:"success"
    })
  },
  jian(){
    if(--this.data.count < 1) this.data.count=1
    this.setData({
      count: this.data.count,
     
    })
  },
  jia(){
    this.setData({
      count: ++this.data.count
    })
  },
  chooseguige(e){
    console.log(e.detail)
  },
  choosewendu(e) {
    console.log(e.detail)
  },
  choosetangdu(e) {
    console.log(e.detail)
  },
  closemodal(){
    this.setData({
      ishiddenmodal: true,
    })
  },
  showmodal(){
    this.setData({
      ishiddenmodal:false,
    })
  },
  changeType(e) {
    console.log(e.currentTarget.dataset.type);
    this.setData({
      activeType: e.currentTarget.dataset.type
    })
  },

  changetype() {
    this.setData({
      isziti: !this.data.isziti
    })
  },
  changelocation() {
    wx.chooseLocation({
      success: res => {
        console.log(res);
        this.setData({
          myaddress: res.address
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  scroll(e) {

  },

  onLoad: function(options) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d5e326b2655df5d6e899f2e/example/menulist',
      success: res => {
        this.setData({
          menulist: res.data.menulist,
          activeType: res.data.menulist[0].id
        })
      }
    })

    wx.request({
      url: 'https://www.easy-mock.com/mock/5d5e326b2655df5d6e899f2e/example/goodslist',
      success: res => {
        console.log(res);
        this.setData({
          goodslist: res.data.goodslist,
        })

        let q = wx.createSelectorQuery()
        q.selectAll(".selection").boundingClientRect(res => {
          this.data.selectionTopArr = res.map(r => r.top)
        })
        q.select(".container").boundingClientRect(res => {
          this.data.containerTop = res.top
        })
        q.exec()
      }
    })


    var shop = ""
    wx.getLocation({
      type: "gcj02",
      success: res => {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            address: this.data.myaddress,
            key: "Z53BZ-RDUWJ-7VQFK-FNMIU-6YWMZ-BQFHO"
          },
          success: res1 => {
            console.log()
            wx.request({
              url: 'https://apis.map.qq.com/ws/distance/v1/',
              data: {
                from: `${res.latitude},${res.longitude}`,
                to: res1.data.result.location.lat + "," + res1.data.result.location.lng,
                key: "Z53BZ-RDUWJ-7VQFK-FNMIU-6YWMZ-BQFHO",
                mode: "walking",
              },
              success: res2 => {
                this.data.myaddress.distance = res2.data.result.elements[0].distance
                this.setData({
                  myaddress: this.data.myaddress
                })
              }
            })
          }
        })

      }
    })





    // var shops = [{
    //   text: "江苏省南京市秦淮区长乐路5号4层"
    // }, {
    //   text: "江苏省南京市鼓楼区龙园西路58号黄河大厦2层"
    // }, {
    //   text: "江苏省南京市鼓楼区中山北路105号中环国际广场4楼"
    // }]
    // console.log(1)
    // var pro = new Promise((resolve, reject) => {
    //   var count = 0;
    //   shops.forEach(r => {
    //     wx.request({
    //       url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    //       data: {
    //         address: r.text,
    //         key: "Z53BZ-RDUWJ-7VQFK-FNMIU-6YWMZ-BQFHO"
    //       },
    //       success: res => {
    //         console.log(2)
    //         count++;
    //         r.location = res.data.result.location
    //         if(count === 3) resolve()
    //       }
    //     })
    //   })
    // })
    // console.log(3)
    // pro.then(res => {
    //   var locations = shops.map(r=>{
    //       return r.location.lat+","+r.location.lng
    //   })

    //   console.log(locations.join(';'));

    //   wx.getLocation({
    //     success: res=> {
    //       wx.request({
    //         url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    //         data: {
    //           location: `${res.latitude},${res.longitude}`,
    //           key: "Z53BZ-RDUWJ-7VQFK-FNMIU-6YWMZ-BQFHO",
    //           getpoi: 1

    //         },
    //         success: res => {
    //           this.setData({
    //             myaddress: res.data.result.address
    //           })
    //         }
    //       })


    //       wx.request({
    //         url: 'https://apis.map.qq.com/ws/distance/v1/',
    //         data: {
    //           from: `${res.latitude},${res.longitude}`,
    //           to: locations.join(';'),
    //           key: "Z53BZ-RDUWJ-7VQFK-FNMIU-6YWMZ-BQFHO",
    //           mode:"walking",
    //         },
    //         success: res => {
    //           console.log(res.data.result.elements)
    //           this.setData({
    //             shopList:shops.map((r, i) => {
    //               return {
    //                 address: r.text,
    //                 distance: res.data.result.elements[i].distance
    //               }
    //             })
    //           })  
    //           console.log(shops);
    //         }
    //       })
    //     },
    //   })
    // })



    // wx.getLocation({
    //   type: "gcj02",
    //   success: function(res) {
    //     wx.request({
    //       url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    //       data: {
    //         address: '南京科技金融大厦',
    //         key: "Z53BZ-RDUWJ-7VQFK-FNMIU-6YWMZ-BQFHO",
    //         getpoi: 1
    //       },
    //       success: res1 => {
    //         // console.log(res.data.result.location.lng, res.data.result.location.lat)

    //         wx.request({
    //           url: 'https://apis.map.qq.com/ws/distance/v1/',
    //           data:{
    //             mode:"driving",
    //             from:`${res.latitude},${res.longitude}`,
    //             to: `${res1.data.result.location.lat},${res1.data.result.location.lng}`,
    //             key: "Z53BZ-RDUWJ-7VQFK-FNMIU-6YWMZ-BQFHO",
    //           },
    //           success:res2=>{
    //             console.log(res2.data.result.elements[0].distance)
    //           }
    //         })
    //       }
    //     })

    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  scroll(e) {
    var arr = this.data.selectionTopArr.map(r => r - this.data.containerTop)
    var t = this.data.menulist[0].id

    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] <= e.detail.scrollTop) {
        t = this.data.menulist[i].id
        break
      }
    }

    if (t !== this.data.activeType) {
      this.setData({
        activeType: t
      })
    }
  }

})