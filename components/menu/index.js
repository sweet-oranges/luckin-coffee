// components/menu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      list:{
        type:Array
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeid:-1
  },
  lifetimes: {
    attached: function () {
     this.setData({
       activeid: this.data.list[0].id
     })
    },
  
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changetype(e){
      // console.log(e.currentTarget.dataset.id)
      this.setData({
        activeid : e.currentTarget.dataset.id
      })
      this.triggerEvent("choose", e.currentTarget.dataset.id)
    }
  }
})
