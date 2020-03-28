let count = 0;
export const request = params => {
  count++;
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  params.url = "https://api-hmugo-web.itheima.net/api/public/v1" + params.url;
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: result => {
        resolve(result.data.message);
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        if (--count === 0) wx.hideLoading();
      }
    });
  });
};
