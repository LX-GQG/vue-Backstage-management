<template>
  <div class="Echarts">
    <div id="myChart" style="width: 450px; height: 250px"></div>
  </div>
</template>

<script>
import { Salereport } from '@/api/report.js'
// 引入echarts
import * as echarts from 'echarts'

export default {
  data () {
    return {
      report: []
    }
  },
  methods: {
    myEcharts () {
      // ECharts图表
      var myChart = echarts.init(document.getElementById('myChart'))
      Salereport()
        .then((res) => {
          if (res.data.code === 0) {
            this.report = res.data.data
            myChart.setOption({
              color: ['#FFA07A'],
              title: {
                text: '商品总销量前八统计'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
              },
              yAxis: {
                type: 'category',
                data: res.data.data.data1
              },
              legend: {
                data: ['总销量']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              series: [
                {
                  name: '总销量',
                  data: res.data.data.data2,
                  type: 'bar'
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
    this.myEcharts()
  }
}
</script>

<style>
</style>
