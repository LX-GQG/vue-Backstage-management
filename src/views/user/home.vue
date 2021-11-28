<template>
  <div id="home">
    <!--Layout布局-->
        <el-row>
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <!--搜索区域-->
                <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getUserList">
                  <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="2.5">
                <el-button type="Info" class="bluebg" @click="addDialogVisible = true">添加用户</el-button>
              </el-col>
              <el-col :span="2.5">
                <el-button type="danger" @click="batchDeleteUser">批量删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="userhome_main">
            <!--表格-->
            <el-table :data="userList" border stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40"> </el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="username" label="姓名"></el-table-column>
              <el-table-column prop="loginName" label="登录名"></el-table-column>
              <el-table-column prop="sex" label="性别"></el-table-column>
              <el-table-column prop="email" label="邮箱"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <!--修改按钮-->
                  <el-button type="Info" class="bluebg" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)">
                  </el-button>
                  <!--删除按钮-->
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserById(scope.row.id)">
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
        <!--添加用户的对话框-->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
        <!--内容主体区域-->
        <el-form :model="userForm" label-width="70px" :rules="rules">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="userForm.loginName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="userForm.sex" label="男">男</el-radio>
            <el-radio v-model="userForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" @blur="sendEmail"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
             <el-input v-model="userForm.address"></el-input>
          </el-form-item>
        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser" class="bluebg">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改用户的对话框-->
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="editForm" label-width="70px" :rules="rules">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" @blur="sendEmail"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList, userAdd, userUpdate, userDelete, userBatchDelete } from '@/api/user.js'
export default {
  data () {
    return {
      rules: {
        mailAddress: [{ required: true, message: '请填写电子邮箱', trigger: 'change' }]
      },
      userList: [], // 用户列表
      total: 0, // 用户总数
      // 获取用户列表的参数对象
      queryInfo: {
        keyword: '', // 查询参数
        pageNo: 1, // 当前页码
        pageSize: 5 // 每页显示条数
      },
      addDialogVisible: false, // 控制添加用户对话框是否显示
      userForm: {
        // 用户
        loginName: '',
        username: '',
        password: '',
        sex: '',
        email: '',
        address: ''
      },
      editDialogVisible: false, // 控制修改用户信息对话框是否显示
      editForm: {
        id: '',
        loginName: '',
        username: '',
        password: '',
        sex: '',
        email: '',
        address: ''
      },
      multipleSelection: [],
      ids: []
    }
  },
  created () { // 生命周期函数
    this.getUserList()
  },
  methods: {
    sendEmail: function () {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.userForm.email !== '' && !regEmail.test(this.userForm.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        })
        this.userForm.email = ''
      }
      if (this.editForm.email !== '' && !regEmail.test(this.editForm.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        })
        this.editForm.email = ''
      }
    },
    getUserList () {
      userList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            // 用户列表
            this.userList = res.data.data.records
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
      // 重新发起请求用户列表
      this.getUserList()
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage
      // 重新发起请求用户列表
      this.getUserList()
    },
    // 添加用户
    addUser () {
      userAdd(this.userForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.addDialogVisible = false
            this.getUserList()
            this.$message({
              message: '添加用户成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加用户失败')
          }
        })
        .catch((err) => {
          this.$message.error('添加用户异常')
          console.log(err)
        })
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改用户状态
    showEditDialog (userinfo) {
      this.editDialogVisible = true
      console.log(userinfo)
      this.editForm = userinfo
    },
    // 修改用户
    editUser () {
      userUpdate(this.editForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.editDialogVisible = false
            this.getUserList()
            this.$message({
              message: '修改用户成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改用户失败')
          }
        })
        .catch((err) => {
          this.$message.error('修改用户异常')
          console.loge(err)
        })
    },
    // 根据ID删除对应的用户信息
    async removeUserById (id) {
      console.log(id)
      // 弹框询问用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
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
        // 删除用户
        userDelete(id)
          .then((res) => {
            if (res.data.code === 200) {
              this.getUserList()
              this.$message({
                message: '删除用户成功',
                type: 'success'
              })
            } else {
              this.$message.error('删除用户失败')
            }
          })
          .catch((err) => {
            this.$message.error('删除用户异常')
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
        this.ids.push(item.id)
        console.log(this.ids)
      })
    },
    // 批量删除用户
    async batchDeleteUser () {
      // 弹框询问用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除用户, 是否继续?',
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
        // 批量删除用户
        userBatchDelete(this.ids)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '批量删除用户成功',
                type: 'success'
              })
              this.getUserList()
            } else {
              this.$message.error('批量删除用户失败')
            }
          })
          .catch((err) => {
            this.$message.error('批量删除用户异常')
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
</style>
