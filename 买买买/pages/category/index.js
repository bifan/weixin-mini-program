import { request } from "../../request/index.js";
// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // cates: [],
    leftSiderList: [],
    rightSiderList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const cates = wx.getStorageSync("cates");
    if (!cates) {
      this.getCates();
    } else {
      // 存在本地存储的缓存数据
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCates();
      } else {
        console.log("正在使用缓存数据");
        // 如果没过期则可以继续使用
        this.cates = cates.data;
        this.setData({
          leftSiderList: this.cates.map(item => item.cat_name),
          rightSiderList: this.cates[0].children
        });
      }
    }
  },
  async getCates() {
    /*     request({
      url: "/categories"
    }).then(result => {
      this.cates = result.data.message;
      // WEB localStorage.setItem() 会把数据转成字符串后再保存
      // 小程序则不会自动转换数据类型, 存入的什么, 取出的还是什么
      wx.setStorageSync("cates", { time: Date.now(), data: this.cates });
      this.setData({
        leftSiderList: this.cates.map(item => item.cat_name),
        rightSiderList: this.cates[0].children
      });
    }); */
    const result = await request({ url: "/categories" });
    this.cates = result;
    wx.setStorageSync("cates", { time: Date.now(), data: this.cates });
    this.setData({
      leftSiderList: this.cates.map(item => item.cat_name),
      rightSiderList: this.cates[0].children
    });
  },
  leftItemTap(event) {
    const { index } = event.currentTarget.dataset;
    this.setData({
      currentIndex: index,
      rightSiderList: this.cates[index].children,
      // 每次右侧数据加载, 滚动条会到顶部
      scrollTop: 0
    });
  }
});
