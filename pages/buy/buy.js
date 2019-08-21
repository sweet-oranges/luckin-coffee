// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopsList: [],
    myaddress:{
      name:"南京金融科技大厦",
      distance:0
    }
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
  onLoad: function(options) {

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
                  myaddress:this.data.myaddress
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

  }
})