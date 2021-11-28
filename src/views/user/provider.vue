<template>
  <div id="home">
    <!--Layout布局-->
        <el-row>
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <!--搜索区域-->
                <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getProviderList">
                  <el-button slot="append" icon="el-icon-search" @click="getProviderList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="2.5">
                <el-button type="Info" class="bluebg" @click="addDialogVisible = true">添加供应商</el-button>
              </el-col>
              <el-col :span="2.5">
                <el-button type="danger" @click="batchDeleteProvider">批量删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="userhome_main">
            <!--表格-->
            <el-table :data="providerList" border stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40"> </el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="pvename" label="供应商名称"></el-table-column>
              <el-table-column prop="pvephone" label="供应商电话"></el-table-column>
              <el-table-column prop="pveaddress" label="供应商地址"></el-table-column>
              <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <!--修改按钮-->
                  <el-button type="Info" class="bluebg" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)">
                  </el-button>
                  <!--删除按钮-->
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeProviderById(scope.row.providerid)">
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
        <!--添加供应商的对话框-->
        <el-dialog title="添加供应商" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
        <!--内容主体区域-->
        <el-form :model="providerForm" label-width="70px" :rules="rules">
          <el-form-item label="供应商名称" prop="pvename" label-width="85px">
            <el-input v-model="providerForm.pvename"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话" prop="pvephone" label-width="85px">
            <el-input v-model="providerForm.pvephone" @blur="sendPhone"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" prop="pveaddress" label-width="85px">
             <el-input v-model="providerForm.pveaddress"></el-input>
          </el-form-item>
        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProvider" class="bluebg">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改供应商的对话框-->
      <el-dialog title="修改供应商" :visible.sync="editDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="editForm" label-width="70px" :rules="rules">
        <el-form-item label="供应商名称" prop="pvename" label-width="85px">
            <el-input v-model="editForm.pvename"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话" prop="pvephone" label-width="85px">
            <el-input v-model="editForm.pvephone" @blur="sendPhone"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" prop="pveaddress" label-width="85px">
             <el-input v-model="editForm.pveaddress"></el-input>
          </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProvider" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { providerList, providerAdd, providerUpdate, providerDelete, providerBatchDelete } from '@/api/provider.js'
export default {
  data () {
    return {
      rules: {
        phoneAddress: [{ required: true, message: '请填写正确的电话号', trigger: 'change' }]
      },
      providerList: [], // 供应商列表
      total: 0, // 供应商总数
      // 获取供应商列表的参数对象
      queryInfo: {
        keyword: '', // 查询参数
        pageNo: 1, // 当前页码
        pageSize: 5 // 每页显示条数
      },
      addDialogVisible: false, // 控制添加供应商对话框是否显示
      providerForm: {
        // 供应商
        pvename: '',
        pvephone: '',
        pveaddress: ''
      },
      editDialogVisible: false, // 控制修改供应商信息对话框是否显示
      editForm: {
        providerid: '',
        pvename: '',
        pvephone: '',
        pveaddress: ''
      },
      multipleSelection: [],
      ids: []
    }
  },
  created () { // 生命周期函数
    this.getProviderList()
  },
  methods: {
    sendPhone: function () {
      var regPhone = /^1[3|4|5|7|8][0-9]{9}$/
      if (this.providerForm.pvephone !== '' && !regPhone.test(this.providerForm.pvephone)) {
        this.$message({
          message: '电话号格式不正确',
          type: 'error'
        })
        this.providerForm.pvephone = ''
      }
      if (this.editForm.pvephone !== '' && !regPhone.test(this.editForm.pvephone)) {
        this.$message({
          message: '电话号格式不正确',
          type: 'error'
        })
        this.editForm.pvephone = ''
      }
    },
    getProviderList () {
      providerList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            // 供应商列表
            this.providerList = res.data.data.records
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
      // 重新发起请求供应商列表
      this.getUserList()
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage
      // 重新发起请求供应商列表
      this.getUserList()
    },
    // 添加供应商
    addProvider () {
      providerAdd(this.providerForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.addDialogVisible = false
            this.getProviderList()
            this.$message({
              message: '添加供应商成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加供应商失败')
          }
        })
        .catch((err) => {
          this.$message.error('添加供应商异常')
          console.log(err)
        })
    },
    // 监听 添加供应商对话框的关闭事件
    addDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改供应商状态
    showEditDialog (providerinfo) {
      this.editDialogVisible = true
      console.log(providerinfo)
      this.editForm = providerinfo
    },
    // 修改供应商
    editProvider () {
      providerUpdate(this.editForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.editDialogVisible = false
            this.getProviderList()
            this.$message({
              message: '修改供应商成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改供应商失败')
          }
        })
        .catch((err) => {
          this.$message.error('修改供应商异常')
          console.loge(err)
        })
    },
    // 根据ID删除对应的供应商信息
    async removeProviderById (providerid) {
      console.log(providerid)
      // 弹框询问供应商是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该供应商, 是否继续?',
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
        // 删除供应商
        providerDelete(providerid)
          .then((res) => {
            if (res.data.code === 200) {
              this.getProviderList()
              this.$message({
                message: '删除供应商成功',
                type: 'success'
              })
            } else {
              this.$message.error('删除供应商失败')
            }
          })
          .catch((err) => {
            this.$message.error('删除供应商异常')
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
        this.ids.push(item.providerid)
        console.log(this.providerids)
      })
    },
    // 批量删除供应商
    async batchDeleteProvider () {
      // 弹框询问供应商是否删除
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
        // 批量删除供应商
        providerBatchDelete(this.providerids)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '批量删除供应商成功',
                type: 'success'
              })
              this.getProviderList()
            } else {
              this.$message.error('批量删除供应商失败')
            }
          })
          .catch((err) => {
            this.$message.error('批量删除供应商异常')
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
