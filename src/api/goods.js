import request from '@/utils/request'

// 获取商品列表
export function goodsList (data) {
  return request({
    url: '/good/list',
    method: 'post',
    data
  })
}

// 商品列表
export function goodProList (data) {
  return request({
    url: '/good/listpro',
    method: 'post',
    data
  })
}

// 获取商品列表
export function goodsLists () {
  return request({
    url: '/good/lists',
    method: 'post'
  })
}

// 添加商品
export function goodsAdd (data) {
  return request({
    url: '/good/add',
    method: 'post',
    data
  })
}

// 修改商品
export function goodsUpdate (data) {
  return request({
    url: '/good/update',
    method: 'post',
    data
  })
}

// 删除商品
export function goodsDelete (commid) {
  return request({
    url: '/good/delete',
    method: 'post',
    params: {
      commid
    }
  })
}

// 批量删除商品
export function goodsBatchDelete (data) {
  return request({
    url: '/good/delete/batch',
    method: 'post',
    data
  })
}

// 上传
export function goodsUpload (data) {
  return request({
    url: '/goods/upload',
    method: 'post',
    data
  })
}

// 下拉框显示供应商数据
export function AllProvider () {
  return request({
    url: '/provider/AllProvider',
    method: 'post'
  })
}

// 根据供应商id加载供应商信息
export function BynameProvider (id) {
  return request({
    url: '/provider/loadProviderById',
    method: 'post',
    params: {
      id
    }
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

export function SelectGood (keyword) {
  return request({
    url: '/good/selectlists',
    method: 'post',
    params: {
      keyword
    }
  })
}
