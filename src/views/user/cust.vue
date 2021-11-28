<template>
  <div id="cust">
    <!--Layout布局-->
        <el-row>
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <!--搜索区域-->
                <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getCustList">
                  <el-button slot="append" icon="el-icon-search" @click="getCustList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="2.5">
                <el-button type="Info" class="bluebg" @click="addDialogVisible = true">添加客户</el-button>
              </el-col>
              <el-col :span="2.5">
                <el-button type="danger" @click="batchDeleteCust">批量删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="custhome_main">
            <!--表格-->
            <el-table :data="custList" border stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40"> </el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="custlogin" label="账号"></el-table-column>
              <el-table-column prop="custname" label="客户姓名" ></el-table-column>
              <el-table-column prop="phone" label="电话"></el-table-column>
              <el-table-column prop="custsex" label="性别"></el-table-column>
              <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <!--修改按钮-->
                  <el-button type="Info" class="bluebg" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)">
                  </el-button>
                  <!--删除按钮-->
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeCustById(scope.row.custid)">
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
        <!--添加客户的对话框-->
        <el-dialog title="添加客户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
        <!--内容主体区域-->
        <el-form :model="custForm" label-width="70px" :rules="rules">
          <el-form-item label="账号" prop="custlogin">
            <el-input v-model="custForm.custlogin"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="custpass">
            <el-input v-model="custForm.custpass" show-password></el-input>
          </el-form-item>
          <el-form-item label="客户姓名">
              <el-input v-model="custForm.custname"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="custForm.phone" @blur="sendPhone"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="custsex">
            <el-radio v-model="custForm.custsex" label="男">男</el-radio>
            <el-radio v-model="custForm.custsex" label="女">女</el-radio>
          </el-form-item>
        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCust" class="bluebg">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改客户的对话框-->
      <el-dialog title="修改客户" :visible.sync="editDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="editForm" label-width="70px" :rules="rules">
        <el-form-item label="账号" prop="custlogin">
          <el-input v-model="editForm.custlogin" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="custpass">
          <el-input v-model="editForm.custpass" show-password></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="editForm.custname"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" @blur="sendPhone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="custsex">
          <el-radio v-model="editForm.custsex" label="男">男</el-radio>
          <el-radio v-model="editForm.custsex" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCust" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { custList, custAdd, custUpdate, custDelete, custBatchDelete } from '@/api/cust.js'
export default {
  data () {
    return {
      rules: {
        phoneAddress: [{ required: true, message: '请填写正确的电话号', trigger: 'change' }]
      },
      custList: [], // 客户列表
      total: 0, // 客户总数
      // 获取客户列表的参数对象
      queryInfo: {
        keyword: '', // 查询参数
        pageNo: 1, // 当前页码
        pageSize: 5 // 每页显示条数
      },
      addDialogVisible: false, // 控制添加客户对话框是否显示
      custForm: {
        // 客户
        custlogin: '',
        custpass: '',
        custname: '',
        phone: '',
        custsex: ''
      },
      editDialogVisible: false, // 控制修改客户信息对话框是否显示
      editForm: {
        custid: '',
        custlogin: '',
        custpass: '',
        custname: '',
        phone: '',
        custsex: ''
      },
      multipleSelection: [],
      ids: []
    }
  },
  created () { // 生命周期函数
    this.getCustList()
  },
  methods: {
    sendPhone: function () {
      var regPhone = /^1[3|4|5|7|8][0-9]{9}$/
      if (this.custForm.phone !== '' && !regPhone.test(this.custForm.phone)) {
        this.$message({
          message: '电话号格式不正确',
          type: 'error'
        })
        this.custForm.phone = ''
      }
      if (this.editForm.phone !== '' && !regPhone.test(this.editForm.phone)) {
        this.$message({
          message: '电话号格式不正确',
          type: 'error'
        })
        this.editForm.phone = ''
      }
    },
    getCustList () {
      custList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            // 用户列表
            this.custList = res.data.data.records
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
      // 重新发起请求客户列表
      this.getCustList()
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage
      // 重新发起请求客户列表
      this.getCustList()
    },
    // 添加客户
    addCust () {
      custAdd(this.custForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.addDialogVisible = false
            this.getCustList()
            this.$message({
              message: '添加客户成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加客户失败')
          }
        })
        .catch((err) => {
          this.$message.error('添加客户异常')
          console.log(err)
        })
    },
    // 监听 添加客户对话框的关闭事件
    addDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改客户状态
    showEditDialog (custinfo) {
      this.editDialogVisible = true
      console.log(custinfo)
      this.editForm = custinfo
    },
    // 修改客户
    editCust () {
      custUpdate(this.editForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.editDialogVisible = false
            this.getCustList()
            this.$message({
              message: '修改客户成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改客户失败')
          }
        })
        .catch((err) => {
          this.$message.error('修改客户异常')
          console.loge(err)
        })
    },
    // 根据ID删除对应的客户信息
    async removeCustById (custid) {
      console.log(custid)
      // 弹框询问客户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该客户, 是否继续?',
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
        // 删除客户
        custDelete(custid)
          .then((res) => {
            if (res.data.code === 200) {
              this.getCustList()
              this.$message({
                message: '删除客户成功',
                type: 'success'
              })
            } else {
              this.$message.error('删除客户失败')
            }
          })
          .catch((err) => {
            this.$message.error('删除客户异常')
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
        this.custids.push(item.custid)
        console.log(this.custids)
      })
    },
    // 批量删除客户
    async batchDeleteCust () {
      // 弹框询问客户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该客户, 是否继续?',
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
        // 批量删除客户
        custBatchDelete(this.custids)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '批量删除客户成功',
                type: 'success'
              })
              this.getCustList()
            } else {
              this.$message.error('批量删除客户失败')
            }
          })
          .catch((err) => {
            this.$message.error('批量删除客户异常')
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
.custhome_main{
  margin-top: 10px;
}
</style>
