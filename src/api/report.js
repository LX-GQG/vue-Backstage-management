import request from '@/utils/request'

// 销售报表数据
export function Salereport () {
  return request({
    url: '/report/salereport',
    method: 'post'
  })
}

// 盈利报表数据
export function Profitreport () {
  return request({
    url: '/report/profit',
    method: 'post'
  })
}

// 进货报表数据
export function Stockreport () {
  return request({
    url: '/report/stock',
    method: 'post'
  })
}

// 退货报表数据
export function Refundreport () {
  return request({
    url: '/report/refund',
    method: 'post'
  })
}
