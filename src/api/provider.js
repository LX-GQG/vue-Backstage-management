import request from '@/utils/request'

// 获取供应商列表
export function providerList (data) {
  return request({
    url: '/provider/list',
    method: 'post',
    data
  })
}

// 添加供应商
export function providerAdd (data) {
  return request({
    url: '/provider/add',
    method: 'post',
    data
  })
}

// 修改供应商
export function providerUpdate (data) {
  return request({
    url: '/provider/update',
    method: 'post',
    data
  })
}

// 删除供应商
export function providerDelete (id) {
  return request({
    url: '/provider/delete',
    method: 'post',
    params: {
      id
    }
  })
}

// 批量删除供应商
export function providerBatchDelete (data) {
  return request({
    url: '/provider/delete/batch',
    method: 'post',
    data
  })
}
