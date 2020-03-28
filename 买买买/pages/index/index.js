import { request } from "../../request/index.js";
//index.js
//获取应用实例
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(result => {
      result.forEach(item => {
        item.navigator_url = item.navigator_url.replace(/main/, "index");
      });
      this.setData({
        swiperList: result
      });
    });
  },
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(result => {
      this.setData({
        catesList: result
      });
    });
  },
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(result => {
      console.log("result:", result);
      // 接口提供的URL 不匹配, 加工一下
      // /pages/goods_list?query=服饰
      // result.navigator_url = result.navigator_url.replace(/\?/, "/index?");
      result.forEach(item => {
        item.product_list.forEach(item => {
          item.navigator_url = item.navigator_url.replace(/\?/, "/index?");
        });
      });
      this.setData({
        floorList: result
      });
    });
  }
});
