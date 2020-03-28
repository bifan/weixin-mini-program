import { request } from "../../request/index.js";
// pages/goods_list/index.js
Page({
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false }
    ],
    palceholderImgUrl:
      "https://www.chinayunma.com/data/upload/portal/20190109/5c35bb2c02a4d.png",
    goodsList: []
  },
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  onLoad: function(options) {
    this.queryParams.cid = options.cid || "";
    this.queryParams.query = options.query || "";
    // /pages/goods_list/index?query=服饰
    // url="/pages/goods_list/index?cid=5"
    this.getGoodsList();
  },
  tabsItemChange(event) {
    const { index } = event.detail;
    const { tabs } = this.data;
    tabs.forEach(ele => {
      if (ele.id == index) ele.isActive = true;
      else ele.isActive = false;
    });
    this.setData({ tabs });
  },
  async getGoodsList() {
    const result = await request({
      url: "/goods/search",
      data: this.queryParams
    });
    this.totalPages = Math.ceil(result.total / this.queryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    });
    // 下拉刷新页面, 加载完成后立刻关闭加载动画
    wx.stopPullDownRefresh();
  },
  // 触底加载 Reach [riːtʃ] 到达
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      // console.log("真的一滴都没有了");
      wx.showToast({ title: "没有更多数据了" });
    } else {
      // 有下一页
      // console.log("啊, 来了");
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    });
    this.queryParams.pagenum = 1;
    this.getGoodsList();
  }
});
