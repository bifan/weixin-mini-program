// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalCount: 0
  },
  update(cart) {},
  onShow() {
    let cart = wx.getStorageSync("cart");
    let totalPrice = 0;
    let totalCount = 0;
    cart = cart.filter(item => item.checked);
    cart.forEach(item => {
      totalPrice += item.num * item.goods_price;
      totalCount += item.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalCount,
      address: wx.getStorageSync("address")
    });
  },
  prepay() {
    
  }
});
