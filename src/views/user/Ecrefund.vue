<template>
  <div class='CC'>
    <div id='RefundEc' style='width: 450px; height: 250px'></div>
  </div>
</template>

<script>
import { Refundreport } from '@/api/report.js'
// 引入echarts
import * as echarts from 'echarts'

export default {
  data () {
    return {
    }
  },
  methods: {
    EchartRefund () {
      // ECharts图表
      var RefundEc = echarts.init(document.getElementById('RefundEc'))
      Refundreport()
        .then((res) => {
          if (res.data.code === 0) {
            this.report = res.data.data
            RefundEc.setOption({
              color: ['#836FFF'],
              title: {
                text: '近6个月退货报表'
              },
              tooltip: {
                trigger: 'axis'
              },
              xAxis: {
                type: 'category',
                data: res.data.data.data3
              },
              yAxis: {
                type: 'value'
              },
              legend: {
                data: ['退货']
              },
              toolbox: {
                show: true,
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  dataView: { readOnly: false },
                  magicType: { type: ['line', 'bar'] },
                  restore: {},
                  saveAsImage: {}
                }
              },
              series: [
                {
                  name: '退货量',
                  data: res.data.data.data4,
                  type: 'line',
                  markPoint: {
                    data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
                    ]
                  },
                  markLine: {
                    data: [{ type: 'average', name: '平均值' }]
                  }
                }
              ]
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.EchartRefund()
  }
}
</script>

<style>
</style>
