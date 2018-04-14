const requestData = require('../../common/requestData')
const commonUtil = require('../../common/utils')

Page({
  data: {
    id: '',
    newsDetail: {},
    newsContent: ''
  },
  onPullDownRefreash() {
    this._getNewsDetail(this.data.id, () => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    if (this.data.id) {
      this._getNewsDetail(this.data.id)
    }
  },
  /**
   * 返回首页
   */
  goBackToIndex() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  /**
   * 获取新闻详情
   */
  _getNewsDetail(id) {
    requestData.requestNewsDetail(id).then(res => {
      let result = res.data.result
      result.date = commonUtil.getDate(result.date)
      this.setData({
        newsDetail: result
      })
      console.log(this.data.newsDetail)
    }).catch(err => {
      console.log(err)
    })
  }
})