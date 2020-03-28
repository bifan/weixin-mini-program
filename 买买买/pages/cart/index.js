// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalCount: 0
  },
  update(cart) {
    let totalPrice = 0;
    let totalCount = 0;
    let allChecked = true;
    if (cart.length) {
      cart.forEach(item => {
        if (item.checked) {
          totalPrice += item.num * item.goods_price;
          totalCount += item.num;
        } else {
          allChecked = false;
        }
      });
    } else {
      allChecked = false;
    }
    this.setData({ cart, allChecked, totalPrice, totalCount });
    wx.setStorageSync("cart", cart);
  },
  onShow() {
    const cart = wx.getStorageSync("cart") || [];
    this.update(cart);
    this.setData({
      address: wx.getStorageSync("address")
    });
  },
  chooseAddress() {
    wx.getSetting({
      success: result => {
        const addressScope = result.authSetting["scope.address"];
        if (addressScope === false) {
          // 用户不授权后, 继续点击按钮则打开设置页面(可设置允许小程序使用通讯地址)
          wx.openSetting({
            success: result => {
              wx.chooseAddress({
                success: result1 => {
                  wx.setStorageSync("address", result1);
                }
              });
            }
          });
        } else {
          // 用户授权过或者第一次授权时
          wx.chooseAddress({
            success: result1 => {
              wx.setStorageSync("address", result1);
            }
          });
        }
      }
    });
  },
  checkGoods(event) {
    const goods_id = event.currentTarget.dataset.id;
    let { cart } = this.data;
    let goods = cart.find(item => item.goods_id === goods_id);
    goods.checked = !goods.checked;
    this.update(cart);
    wx.setStorageSync("cart", cart);
  },
  checkAll() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(item => (item.checked = allChecked));
    this.update(cart);
  },
  changeNum(event) {
    const { operation, id } = event.currentTarget.dataset;
    const { cart } = this.data;
    const index = cart.findIndex(item => item.goods_id === id);
    if (cart[index].num === 1 && operation == -1) {
      wx.showModal({
        title: "提示",
        content: "要删除这个商品吗?",
        success: res => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.update(cart);
          } else if (res.cancel) {
            return;
          }
        }
      });
    } else {
      cart[index].num += operation;
      this.update(cart);
    }
  },
  toPay() {
    const { address, totalCount } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: "请先选择收货地址",
        icon: "none",
        mask: true
      });
    } else if (totalCount === 0) {
      wx.showToast({
        title: "您还没有选购任何商品",
        icon: "none",
        mask: true
      });
    } else {
      wx.navigateTo({
        url: "/pages/pay/index"
      });
    }
  }
});
