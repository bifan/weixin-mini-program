import { request } from "../../request/index.js";
// pages/goods_detail/index.js
Page({
  //页面的初始数据
  data: {
    goodsDetail: {}
  },
  goodsInfo: {},
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    this.goodsDetail(options.goods_id);
  },
  async goodsDetail(goods_id) {
    const result = await request({
      url: "/goods/detail",
      data: { goods_id }
    });
    this.goodsInfo = result;
    const { pics, goods_price, goods_name, goods_introduce } = result;
    this.setData({
      goodsDetail: {
        pics,
        goods_price,
        goods_name,
        goods_introduce: goods_introduce.replace(/\.webp/g, ".jpg")
      }
    });
  },
  viewBigPic(event) {
    wx.previewImage({
      current: event.currentTarget.dataset.cururl, // 当前显示图片的http链接
      urls: this.data.goodsDetail.pics.map(item => item.pics_big) // 需要预览的图片http链接列表
    });
  },
  addToCart() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(
      item => item.goods_id === this.goodsInfo.goods_id
    );
    if (index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: "添加完成",
      icon: "success",
      mask: true // 1.5 秒后才使用按钮
    });
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function() {},

  //生命周期函数--监听页面显示
  onShow: function() {},

  //生命周期函数--监听页面隐藏
  onHide: function() {},

  //生命周期函数--监听页面卸载
  onUnload: function() {},

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {},

  //页面上拉触底事件的处理函数
  onReachBottom: function() {},

  //用户点击右上角分享
  onShareAppMessage: function() {}
});
