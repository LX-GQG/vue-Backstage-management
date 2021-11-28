<template>
  <div id="index">
    <div class="indexdc">
      <div class="indexwz">
        <h4>babe进销存管理系统</h4>
        <p>基于Spring Boot，MyBatis，vue，element-UI开发</p>
        <hr >
        <h4 class="indexone">项目特点</h4>
        <p>前后端分离</p>
        <h4 class="indexone">后台功能</h4>
        <p>对商品进行增删改查，销售商品，进货，退货，查看库存</p>
        <p>对销售，进货，退货进行报表展示</p>
      </div>
    </div>
    <div class="calender2">
      <div class="date-headers">
        <div class="date-header">
          <div>
            <el-button type="regular-text" @click="handlePrev" class="bule"><i class="el-icon-arrow-left"></i>上一月</el-button>
          </div>
          <div class="rqi">{{ year }}年{{ month }}月{{ day }}日</div>
          <div>
            <el-button type="regular-text" @click="handleNext" class="bule">下一月<i class="el-icon-arrow-right"></i></el-button>
          </div>
          <div>
            <el-button type="" icon="el-icon-refresh-left" @click="refresh" class="bule"></el-button>
          </div>
        </div>
      </div>
      <div class="date-content">
        <div class="week-header">
          <div v-for="item in ['日','一','二','三','四','五','六']" :key=item>{{ item }}
          </div>
        </div>
        <div class="week-day">
          <div class="every-day" v-for="item in 42" :key="item" @click="handleClickDay(item - beginDay)">
            <div v-if="item - beginDay > 0 && item - beginDay <= curDays"
              :class="`${year}-${month}-${item - beginDay}` === `${year}-${month}-${day}` ? 'nowDay':''">
              {{ item - beginDay }}</div>
            <div class="other-day" v-else-if="item - beginDay <= 0">{{ item - beginDay + prevDays }}</div>
            <div class="other-day" v-else>{{ item - beginDay -curDays }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      year: null,
      month: null,
      day: null,
      currentDay: null,
      currentYearMonthTimes: null, // 当前年的月的天数
      monthOneDay: null, // 一个月中的某一天
      curDate: null,
      prevDays: null // 上一月天数
    }
  },
  computed: {
    curDays () {
      return new Date(this.year, this.month, 0).getDate()
    },
    // 设置该月日期起始值（找到一号是在哪里）
    beginDay () {
      return new Date(this.year, this.month - 1, 1).getDay()
    }
  },
  created () {
    this.getInitDate()
    this.currentYearMonthTimes = this.mGetDate(this.year, this.month) // 本月天数
    this.prevDays = this.mGetDate(this.year, this.month - 1)
    this.curDate = `${this.year}-${this.month}-${this.day}`
    console.log(this.curDate)
  },
  methods: {
    refresh () { // 强制刷新页面
      location.reload()
    },
    handleClickDay (day) { // 点击这一天，绑定点击事件
      console.log('形参传进来的', day)
      console.log('data里面的this.day', this.day)
      console.log('data里面的currentYearMonthTimes', this.currentYearMonthTimes)
      this.day = day
      if (this.day > this.currentYearMonthTimes) {
        this.$message.warning('不能选择超出本月的日期')
      }
      console.log(day)
    },
    computedDay () {
      const allDay = new Date(this.year, this.month, 0).getDate()
      if (this.day > allDay) {
        this.day = allDay
      }
    },
    // 设置页头显示的年月日
    getInitDate () {
      const date = new Date()
      this.year = date.getFullYear()
      this.month = date.getUTCMonth() + 1
      this.day = date.getDate()
    },
    // 如果要获取当前月份天数:
    mGetDate () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    handlePrev () {
      if (this.month === 1) {
        this.month = 12
        this.year--
      } else {
        this.month--
      }
      this.computedDay()
    },
    handleNext () {
      if (this.month === 12) {
        this.month = 1
        this.year++
      } else {
        this.month++
      }
      this.computedDay()
    }
  }
}
</script>

<style>
* {
    margin: 0px;
    border: 0px;
    list-style: none;
  }
  #index{
    background-image: url(../../assets/img/bc.jpg);
    background-size: 1335px;
    margin-top: -20px;
    margin-left: -20px;
    padding-right: 40px;
  }
  .indexdc{
    position: relative;
    top: 5px;
    width: 500px;
    height: 230px;
    margin-left: 20px;
    text-align: center;
    border: rgb(69,93,120) 1px solid;
  }
  .indexdc h4{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .indexdc .indexone{
    border-top: rgb(69,93,120) 1px solid;
  }
  .imgbg{
    position: relative;
    width: 448px;
    height: 398px;
  }
  .imgbg img{
    position: absolute;
    left: 159%;
    top: -58%;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/0076LQCyly1gm7e2h0wr6j334022o1kz.jpg');
    background-size: cover;
    background-position:center;
    z-index: -1;
    opacity: 0.8;
  }
  #index{
    position: relative;
    width: 100%;
    height: 680px;
  }

  .indexdc {
    background: linear-gradient(to top, #feada6 0%, #f5efef 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  .calender2 {
    margin-top: 30px;
    border-radius: 4px;
    position: absolute;
    top: 25%;
    right: -8%;
    transform: translate(-50%, -50%);
    height: 396px;
    width: 448px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .bule{
    background: linear-gradient(to top, #feada6 0%, #f5efef 100%);
    color: rgb(142, 149, 252);
  }
  .date-header {
    height: 60px;
    width: 422px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .date-headers {
    height: 60px;
    width: 422px;
    display: flex;
  }

  .rqi{
    color: rgb(142, 149, 252);
  }
  .pre-month {
    position: absolute;
    display: inline-block;
    height: 0px;
    width: 0px;
    border: 15px solid;
    border-color: transparent rgb(69,93,120) transparent transparent;
  }

  .next-month {
    position: absolute;
    display: inline-block;
    height: 0px;
    width: 0px;
    border: 15px solid;
    border-color: transparent transparent transparent rgb(69,93,120);
  }

  .show-date {
    margin-left: 40px;
    margin-top: 0px;
    display: inline-block;
    line-height: 30px;
    text-align: center;
    width: 310px;
    color: rgb(69,93,120);
  }

  .week-header {
    color: #000000;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
  }

  .week-header div {
    margin: 0;
    padding: 0;
    display: inline-block;
    height: 20px;
    width: 60px;
  }

  .every-day {
    display: inline-block;
    height: 50px;
    width: 60px;
    margin-left: 2px;
    text-align: center;
    line-height: 50px;
  }

  .other-day {
    color: #ccc;
  }

  .nowDay {
    background: linear-gradient(to top, #feada6 0%, #f5efef 100%);
    border: 1px solid #feada6;
  }

  .active-day {
    /* padding: 2px */
    /* border-sizing:content-box; */
    border: 2px solid rgb(69,93,120);
  }
</style>
