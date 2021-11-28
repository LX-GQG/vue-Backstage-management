import request from '@/utils/request'

export function userLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 注册用户
export function userRegister (data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

// 获取用户列表
export function userList (data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

// 添加用户
export function userAdd (data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 修改用户
export function userUpdate (data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

// 删除用户
export function userDelete (id) {
  return request({
    url: '/user/delete',
    method: 'post',
    params: {
      id
    }
  })
}

// 批量删除用户
export function userBatchDelete (data) {
  return request({
    url: '/user/delete/batch',
    method: 'post',
    data
  })
}
