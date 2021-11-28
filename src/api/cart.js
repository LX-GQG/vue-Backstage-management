import request from '@/utils/request'

// 获取进货列表
export function cartList (data) {
  return request({
    url: '/cart/list',
    method: 'post',
    data
  })
}

// 获取进货列表
export function getcartList (custid) {
    return request({
      url: '/cart/custlist',
      method: 'post',
      params: {
      custid
      }
    })
  }

// 添加进货
export function cartAdd (data) {
  return request({
    url: '/cart/addsale',
    method: 'post',
    data
  })
}

// 修改进货
export function cartUpdate (data) {
  return request({
    url: '/cart/updatesale',
    method: 'post',
    data
  })
}

// 删除进货
export function cartDelete (id) {
  return request({
    url: '/cart/deletesale',
    method: 'post',
    params: {
      id
    }
  })
}

// 批量删除进货
export function cartBatchDelete (data) {
  return request({
    url: '/cart/delete/batch',
    method: 'post',
    data
  })
}

