import request from '@/utils/request'
// 客户登录
export function custLogin (data) {
  return request({
    url: '/cust/login',
    method: 'post',
    data
  })
}

// 客户注册
export function custRegister (data) {
  return request({
    url: '/cust/register',
    method: 'post',
    data
  })
}

// 获取客户列表
export function custList (data) {
  return request({
    url: '/cust/list',
    method: 'post',
    data
  })
}

// 添加客户
export function custAdd (data) {
  return request({
    url: '/cust/add',
    method: 'post',
    data
  })
}

// 修改客户
export function custUpdate (data) {
  return request({
    url: '/cust/update',
    method: 'post',
    data
  })
}

// 删除客户
export function custDelete (custid) {
  return request({
    url: '/cust/delete',
    method: 'post',
    params: {
      custid
    }
  })
}

// 批量删除客户
export function custBatchDelete (data) {
  return request({
    url: '/cust/delete/batch',
    method: 'post',
    data
  })
}
