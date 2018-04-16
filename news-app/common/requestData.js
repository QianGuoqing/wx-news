/**
 * 由于多个地方需要获取API数据，所以在一个公共模块中（此处的common文件夹）封装好获取API的操作
 * 基于Promise
 */

const REQ_OK = 200

function requestNewsList(type, callback) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if (res.data.code === REQ_OK) {
          resolve(res)
        }
      },
      fail: function(err) {
        // fail
        reject(err)
      },
      complete: function() {
        // complete
        callback && callback()
      }
    })
  })
}

function requestNewsDetail(news_id, callback) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: news_id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if (res.data.code === REQ_OK) {
          resolve(res)
        }
      },
      fail: function(err) {
        // fail
        reject(err)
      },
      complete: function() {
        // complete
        callback && callback()
      }
    })
  })
}

function navigateToDetail(id) {
  wx.navigateTo({
    url: `/pages/detail/detail?id=${id}`,
    success: function(res){
      // success
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}

function wxRequest() {
  
}

module.exports = {
  requestNewsList,
  requestNewsDetail,
  navigateToDetail
}