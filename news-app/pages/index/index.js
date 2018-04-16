/**
 * - 基本满足项目的功能要求
 * - 使用Promise封装数据请求和跳转接口
 * - 使用template对公共模块“组件化”
 */
const requestData = require('../../common/requestData')
const commonUtil = require('../../common/utils')
const newsMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}

Page({
  data: {
    tabList: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    type: 'gn',
    currentTab: 0,
    topNews: '',
    newsList: [],
    user_id: ''
  },
  onLoad() {
    this._getNewsData()
  },
  onPullDownRefresh() {
    this._getNewsData(() => {
      wx.stopPullDownRefresh()
    })
  },
  /**
   * Tab栏切换，获取view上的text和index
   * text用于获取tab上的值，和newsMap做映射
   * index用于tab切换时给swiper组件的current属性赋值，以切换到不同的swiper-item
   */
  onSwitchTap(event) {
    let tabItemText = event.currentTarget.dataset.tabItemText
    let tabIndex = event.currentTarget.dataset.currentIndex
    let type = newsMap[tabItemText]
    this.setData({ 
      type: type,
      currentTab: tabIndex
    })
    this._getNewsData()
  },
  /**
   * 跳转至新闻详情页
   */
  onNavigateToDetail(event) {
    let newsId = event.currentTarget.dataset.newsId
    requestData.navigateToDetail(newsId)
  },
  /**
   * 获取新闻信息
   */
  _getNewsData(callback) {
    requestData.requestNewsList(this.data.type, callback).then(res => {
      res = res.data
      let firstNews = res.result[0]
      firstNews.date = commonUtil.getDate(firstNews.date)
      let result = []
      for (let i = 1; i < res.result.length; i++) {
        let current = res.result[i]
        current.date = commonUtil.getDate(current.date)
        result.push(current)
      }
      
      this.setData({
        newsList: result
      })
      this.setData({
        topNews: firstNews
      })
    }).catch(err => {
      console.log(err);
    })
  }
})
