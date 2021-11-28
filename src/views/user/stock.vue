<template>
  <div id="home">
    <!--Layout布局-->
        <el-row>
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <!--搜索区域-->
                <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getStockList">
                  <el-button slot="append" icon="el-icon-search" @click="getStockList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="2.5">
                <el-button type="Info" class="bluebg" @click="addDialogVisible = true">添加进货</el-button>
              </el-col>
              <el-col :span="2.5">
                <el-button type="danger" @click="batchDeleteStock">批量删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="userhome_main">
            <!--表格-->
            <el-table :data="stockList" border stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40"> </el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="commid" label="商品名称" >
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
              <el-table-column prop="skmoney" label="价格"></el-table-column>
              <el-table-column prop="sknumber" label="进货数量"></el-table-column>
              <el-table-column prop="totalprice" label="总价"></el-table-column>
              <el-table-column prop="skdate" label="进货时间" width="200">
                <p slot-scope="scope">{{ dateFormat('YYYY-mm-dd HH:MM',scope.row.skdate) }}</p>
              </el-table-column>
              <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <!--修改按钮-->
                  <el-button type="Info" class="bluebg" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)">
                  </el-button>
                  <!--删除按钮-->
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeStockById(scope.row.skid)">
                  </el-button>
                  <!-- 退货按钮 -->
                  <el-button type="warning" size="mini" icon="el-icon-warning" @click="removeRefundById(scope.row)">
                  </el-button>
                </template>
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
        <!--添加进货的对话框-->
        <el-dialog title="添加进货" :visible.sync="addDialogVisible" width="25%" @close="addDialogClosed">
        <!--内容主体区域-->
        <el-form :model="stockForm" label-width="70px">
          <el-form-item label="商品名称" prop="commname" label-width="85px">
                <el-select v-model="stockForm.commid" @change="getitem">
                    <el-option
                      v-for='item in chioce'
                      :key="item.commid"
                      :label="item.commname"
                      :value="item.commid">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="skmoney" label-width="85px">
            <el-input v-model="stockForm.skmoney" type="number" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
          <el-form-item label="进货数量" prop="sknumber" label-width="85px">
             <el-input v-model="stockForm.sknumber" type="number" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStock" class="bluebg">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改进货的对话框-->
      <el-dialog title="修改进货" :visible.sync="editDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="editForm" label-width="70px">
        <el-form-item label="商品名称" prop="commname" label-width="85px">
            <el-select v-model="editForm.commid" @change="getitem">
                    <el-option
                      v-for='item in chioce'
                      :key="item.commid"
                      :label="item.commname"
                      :value="item.commid">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="skmoney" label-width="85px">
            <el-input v-model="editForm.skmoney" type="number" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
          <el-form-item label="进货数量" prop="sknumber" label-width="85px">
             <el-input v-model="editForm.sknumber" type="number" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStock" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
    <!--退货的对话框-->
      <el-dialog title="退货" :visible.sync="remDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="remForm" label-width="70px">
          <el-input v-model="remForm.skid" type="hidden"></el-input>
          <el-form-item label="可退货数量" prop="sknumber" label-width="85px">
             <el-input v-model="remForm.sknumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="退货数量" prop="rfnumber" label-width="85px">
            <el-input v-model="remForm.rfnumber" type="number" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
          <el-form-item label="退货备注" prop="remark" label-width="85px">
             <el-input v-model="remForm.remark"></el-input>
          </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="remDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRefund" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { stockList, stockAdd, stockUpdate, stockDelete, stockBatchDelete, AllGood, BynameGood } from '@/api/stock.js'
import { refundAdd } from '@/api/refund.js'
export default {
  data () {
    return {
      stockList: [], // 进货列表
      total: 0, // 进货总数
      // 获取进货列表的参数对象
      // 选中的商品名称
      value: '',
      goodid: '',
      goodname: '',
      commid: '',
      chioce: [], // 后端传来的数据全部放在这个数组中，在前端调用数据中的数据即可回显数据
      queryInfo: {
        keyword: '', // 查询参数
        pageNo: 1, // 当前页码
        pageSize: 5 // 每页显示条数
      },
      addDialogVisible: false, // 控制添加进货对话框是否显示
      stockForm: {
        // 进货
        commid: 0,
        commname: '',
        skmoney: '',
        sknumber: ''
      },
      editDialogVisible: false, // 控制修改进货信息对话框是否显示
      editForm: {
        skid: '',
        commname: '',
        skmoney: '',
        sknumber: ''
      },
      remDialogVisible: false, // 控制退货信息对话框是否显示
      remForm: {
        sknumber: '',
        rfnumber: '',
        remark: ''
      },
      multipleSelection: [],
      skids: []
    }
  },
  created () { // 生命周期函数
    this.getStockList()
  },
  mounted () {
    this.getitem()
  },
  methods: {
    getBit (value, bit) {
      let str = Number(value)
      str = str.toFixed(bit)
      console.log(str)
      return str
    },
    proving2 (e) {
      console.log(e.target.value)
      console.log(this.getBit(e.target.value, 1))
      var keynum = window.event ? e.keyCode : e.which // 获取键盘码
      var keychar = String.fromCharCode(keynum) // 获取键盘码对应的字符
      if (keynum === 189 || keynum === 109) { // 禁止输入负数
        this.$message.warning('禁止输入负数')
        e.target.value = 0
      }
      if (e.target.value.indexOf('.') === 1) { // 如果值里面有’.‘的话，进去检测位小数点大于1位的话只保留一位
        var x = String(e.target.value).indexOf('.') + 1 // 得到小数点的位置
        var y = String(e.target.value).length - x // 小数点的位数
        if (y > 1) {
          e.target.value = this.getBit(e.target.value, 1)
        }
      }
      if (e.target.value > 1000) { // 大于1000时候设置1000
        this.$message.warning('最大价为1000')
        e.target.value = 1000
      }
      if (e.target.value === 1000) { // 当1000时候去掉小数点
        if (keynum === 189 || keynum === 190 || keynum === 109) {
          e.target.value = 1000
        }
      }
    },
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
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getStockList () {
      stockList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            // 进货列表
            this.stockList = res.data.data.records
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
      // 重新发起请求进货列表
      this.getStockList()
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage
      // 重新发起请求进货列表
      this.getStockList()
    },
    // 添加进货
    addStock () {
      stockAdd(this.stockForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.addDialogVisible = false
            this.getStockList()
            this.$message({
              message: '添加进货成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加进货失败')
          } if (res.data.code === 201) {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          this.$message.error('添加进货异常')
          console.log(err)
        })
    },
    // 监听 添加进货对话框的关闭事件
    addDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
      console.log()
    },
    // 监听修改进货状态
    showEditDialog (stockinfo) {
      this.editDialogVisible = true
      console.log(stockinfo)
      this.editForm = stockinfo
    },
    // 监听退货状态
    removeRefundById (refundinfo) {
      this.remDialogVisible = true
      console.log(refundinfo)
      this.remForm = refundinfo
    },
    // 退货
    editRefund () {
      this.remForm.id = this.remForm.skid
      refundAdd(this.remForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.remDialogVisible = false
            this.getStockList()
            this.$message({
              message: '退货成功',
              type: 'success'
            })
          } else {
            this.$message.error('退货失败')
          }
        })
        .catch((err) => {
          this.$message.error('退货异常')
          console.log(err)
        })
    },
    // 修改进货
    editStock () {
      stockUpdate(this.editForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.editDialogVisible = false
            this.getStockList()
            this.$message({
              message: '修改进货成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改进货失败')
          }
        })
        .catch((err) => {
          this.$message.error('修改进货异常')
          console.loge(err)
        })
    },
    // 根据ID删除对应的进货信息
    async removeStockById (skid) {
      console.log(skid)
      // 弹框询问进货是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该进货, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult === 'confirm') {
        // 删除进货
        stockDelete(skid)
          .then((res) => {
            if (res.data.code === 200) {
              this.getStockList()
              this.$message({
                message: '删除进货成功',
                type: 'success'
              })
            } else {
              this.$message.error('删除进货失败')
            }
          })
          .catch((err) => {
            this.$message.error('删除进货异常')
            console.log(err)
          })
      }
    },
    // 批量选中事件处理
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
      // 向被删除的ids赋值
      this.multipleSelection.forEach((item) => {
        this.skids.push(item.skid)
        console.log(this.skids)
      })
    },
    // 批量删除进货
    async batchDeleteStock () {
      // 弹框询问进货是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除供应商, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      if (confirmResult === 'confirm') {
        // 批量删除进货
        stockBatchDelete(this.skids)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '批量删除进货成功',
                type: 'success'
              })
              this.getStockList()
            } else {
              this.$message.error('批量删除进货失败')
            }
          })
          .catch((err) => {
            this.$message.error('批量删除进货异常')
            console.log(err)
          })
      }
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
