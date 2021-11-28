import request from '@/utils/request'

// 获取轮播图列表
export function sildeshowList (data) {
  return request({
    url: '/sildeshow/list',
    method: 'post',
    data
  })
}

// 获取轮播图列表
export function sildeshowLists () {
  return request({
    url: '/sildeshow/lists',
    method: 'post'
  })
}

// 添加轮播图
export function sildeshowAdd (data) {
  return request({
    url: '/sildeshow/add',
    method: 'post',
    data
  })
}

// 修改轮播图
export function sildeshowUpdate (data) {
  return request({
    url: '/sildeshow/update',
    method: 'post',
    data
  })
}

// 删除轮播图
export function sildeshowDelete (id) {
  return request({
    url: '/sildeshow/delete',
    method: 'post',
    params: {
      id
    }
  })
}

// 批量删除轮播图
export function sildeshowBatchDelete (data) {
  return request({
    url: '/sildeshow/delete/batch',
    method: 'post',
    data
  })
}
