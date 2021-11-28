<template>
  <div>
    <div id="proFit" style="width: 550px; height: 250px"></div>
  </div>
</template>

<script>
import { Profitreport } from '@/api/report.js'
// 引入echarts
import * as echarts from 'echarts'

export default {
  data () {
    return {}
  },
  methods: {
    proFits () {
      // ECharts图表
      var proFit = echarts.init(document.getElementById('proFit'))
      Profitreport()
        .then((res) => {
          if (res.data.code === 0) {
            proFit.setOption({
              color: ['#00FF7F', '#FFD700', '#FF4500'],
              title: {
                text: '半年利润报表'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              xAxis: {
                type: 'value'
              },
              yAxis: {
                type: 'category',
                axisTick: {
                  show: false
                },
                data: res.data.data.data1
              },
              legend: {
                data: ['利润', '退货支出', '销售收入']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              series: [
                {
                  name: '利润',
                  type: 'bar',
                  label: {
                    show: true,
                    position: 'inside'
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: res.data.data.data3
                },
                {
                  name: '销售收入',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: res.data.data.data2
                },
                {
                  name: '退货支出',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'left'
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: res.data.data.data4
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
    this.proFits()
  }
}
</script>

<style>
</style>
