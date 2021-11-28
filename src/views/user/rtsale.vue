<template>
  <div id="home">
    <!--Layout布局-->
        <el-row>
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <!--搜索区域-->
                <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getRtsaleList">
                  <el-button slot="append" icon="el-icon-search" @click="getRtsaleList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="2.5">
                <el-tag effect="warning" style="height:40px; line-height: 40px;font-size:14px">销售退货表</el-tag>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="userhome_main">
            <!--表格-->
            <el-table :data="rtsaleList" border stripe>
              <el-table-column type="selection" width="40"> </el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="commid" label="商品名称">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.commid" @change="getitem" disabled class="byname">
                    <el-option
                      v-for='item in chioce'
                      :key="item.commid"
                      :label="item.commname"
                      :value="item.commid">
                    </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="rtsnumber" label="退货数量"></el-table-column>
              <el-table-column prop="rtsmoney" label="退货总额"></el-table-column>
              <el-table-column prop="rtsmark" label="退货备注"></el-table-column>
              <el-table-column prop="rtstime" label="退货时间" width="300">
                  <span slot-scope="scope">{{ dateFormat('YYYY-mm-dd HH:MM',scope.row.rtstime) }}</span>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="pageindex">
          <!--分页区域-->
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNo"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
          </el-pagination>
        </el-row>
  </div>
</template>

<script>
import { rtsaleList, AllGood } from '@/api/rtsale.js'
export default {
  data () {
    return {
      rtsaleList: [], // 退货列表
      total: 0, // 退货总数
      // 获取退货列表的参数对象
      goodname: '',
      chioce: [],
      queryInfo: {
        keyword: '', // 查询参数
        pageNo: 1, // 当前页码
        pageSize: 5 // 每页显示条数
      },
      multipleSelection: []
    }
  },
  created () { // 生命周期函数
    this.getRtsaleList()
  },
  mounted () {
    this.getitem()
  },
  methods: {
    dateFormat (fmt, date) {
      let ret = ''
      date = new Date(date)
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    },
    getitem () {
      AllGood()
        .then(res => {
          if (res.data.code === 0) {
            this.chioce = res.data.data
            console.log(this.chioce)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRtsaleList () {
      rtsaleList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            // 退货列表
            this.rtsaleList = res.data.data.records
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      // 重新发起请求退货列表
      this.getUserList()
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage
      // 重新发起请求退货列表
      this.getUserList()
    }
  }
}
</script>

<style>
.bluebg{
  background: #282E43;
  color: #fff;
}
.pageindex{
  margin: 0 auto;
  padding-top: 5px;
  padding-left: 32%;
}
.userhome_main{
  margin-top: 10px;
}
.byname .el-input.is-disabled .el-input__inner{
  width: 80px;
  color: black;
}
.byname .el-input__suffix{
  height: 25%;
}
.byname .el-input--suffix .el-input__inner {
    padding-right: 18px;
}
</style>
