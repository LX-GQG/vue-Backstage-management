import request from '@/utils/request'

// 获取销售列表
export function saleList (data) {
  return request({
    url: '/sale/list',
    method: 'post',
    data
  })
}

export function saleMonth (data) {
  return request({
    url: '/sale/getmonth',
    method: 'post',
    data
  })
}

// 添加销售
export function saleAdd (data) {
  return request({
    url: '/sale/addsale',
    method: 'post',
    data
  })
}

// 修改销售
export function saleUpdate (data) {
  return request({
    url: '/sale/updatesale',
    method: 'post',
    data
  })
}

// 删除销售
export function saleDelete (id) {
  return request({
    url: '/sale/deletesale',
    method: 'post',
    params: {
      id
    }
  })
}

// 批量删除销售
export function saleBatchDelete (data) {
  return request({
    url: '/sale/delete/batch',
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

// 下拉框显示商品数据
export function AllGood () {
  return request({
    url: '/good/AllGood',
    method: 'post'
  })
}

// 下拉框显示客户数据
export function AllCust () {
  return request({
    url: '/cust/AllCust',
    method: 'post'
  })
}

// 根据客户id加载客户信息
export function BynameCust (custid) {
  return request({
    url: '/cust/loadCustById',
    method: 'post',
    params: {
      custid
    }
  })
}
