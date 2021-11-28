<template>
  <div class='CS'>
    <div id='StockEc' style='width: 450px; height: 250px'></div>
  </div>
</template>

<script>
import { Stockreport } from '@/api/report.js'
// 引入echarts
import * as echarts from 'echarts'

export default {
  data () {
    return {
    }
  },
  methods: {
    EchartStock () {
      // ECharts图表
      var StockEc = echarts.init(document.getElementById('StockEc'))
      Stockreport()
        .then((res) => {
          if (res.data.code === 0) {
            this.report = res.data.data
            StockEc.setOption({
              color: ['#E066FF'],
              title: {
                text: '近6个月进货报表'
              },
              tooltip: {
                trigger: 'axis'
              },
              xAxis: {
                type: 'category',
                data: res.data.data.data1
              },
              yAxis: {
                type: 'value'
              },
              legend: {
                data: ['进货']
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
                  name: '进货量',
                  data: res.data.data.data2,
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
    this.EchartStock()
  }
}
</script>

<style>
</style>
