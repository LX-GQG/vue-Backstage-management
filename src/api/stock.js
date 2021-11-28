import request from '@/utils/request'

// 获取进货列表
export function stockList (data) {
  return request({
    url: '/stock/list',
    method: 'post',
    data
  })
}

// 添加进货
export function stockAdd (data) {
  return request({
    url: '/stock/addstock',
    method: 'post',
    data
  })
}

// 修改进货
export function stockUpdate (data) {
  return request({
    url: '/stock/updatestock',
    method: 'post',
    data
  })
}

// 删除进货
export function stockDelete (skid) {
  return request({
    url: '/stock/deletestock',
    method: 'post',
    params: {
      skid
    }
  })
}

// 批量删除进货
export function stockBatchDelete (data) {
  return request({
    url: '/stock/delete/batch',
    method: 'post',
    data
  })
}

// 根据商品id加载商品信息
export function BynameGood (commid) {
  return request({
    url: '/good/loadGoodById',
    method: 'post',
    params: {
      commid
    }
  })
}

// 下拉框显示数据
export function AllGood () {
  return request({
    url: '/good/AllGood',
    method: 'post'
  })
}
