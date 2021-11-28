<template>
  <div id="home">
    <!--Layout布局-->
        <el-row>
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <!--搜索区域-->
                <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getSildeshowList">
                  <el-button slot="append" icon="el-icon-search" @click="getSildeshowList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="2.5">
                <el-button type="Info" class="bluebg" @click="addDialogVisible = true">添加轮播图</el-button>
              </el-col>
              <el-col :span="2.5">
                <el-button type="danger" @click="batchDeleteSildeshow">批量删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="sildeshowhome_main">
            <!--表格-->
            <el-table :data="sildeshowList" border stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40"> </el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="title" label="标题" width="150"></el-table-column>
              <el-table-column prop="image" label="轮播图(默认四张图)">
                  <template slot-scope="scope" height="75">
                  <img v-if="scope.row.image" :src=" '/static' + scope.row.image" class="image">
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <!--修改按钮-->
                  <el-button type="Info" class="bluebg" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)">
                  </el-button>
                  <!--删除按钮-->
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeSildeshowById(scope.row.id)">
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
        <!--添加轮播图的对话框-->
        <el-dialog title="添加轮播图" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
        <!--内容主体区域-->
        <el-form :model="sildeshowForm" label-width="70px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="sildeshowForm.title"></el-input>
          </el-form-item>
          <el-form-item label="轮播图" prop="image">
            <el-upload
               v-model="sildeshowForm.image"
               ref="upload"
               action="http://localhost:8088/api/sildeshow/upload"
               name="image"
               list-type="picture-card"
               :limit="1"
               :file-list="fileList"
               :on-exceed="onExceed"
               :before-upload="beforeUpload"
               :on-preview="handlePreview"
               :on-success="handleSuccess"
               :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSildeshow" class="bluebg">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改轮播图的对话框-->
      <el-dialog title="修改轮播图" :visible.sync="editDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="editForm" label-width="70px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图" prop="image">
          <el-upload
               v-model="editForm.image"
               ref="upload"
               action="http://localhost:8088/api/sildeshow/upload"
               name="image"
               list-type="picture-card"
               :limit="1"
               :file-list="fileList"
               :on-exceed="onExceed"
               :before-upload="beforeUpload"
               :on-preview="handlePreview"
               :on-success="handleSuccess"
               :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSildeshow" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sildeshowList, sildeshowAdd, sildeshowUpdate, sildeshowDelete, sildeshowBatchDelete } from '@/api/sildeshow.js'
export default {
  data () {
    return {
      sildeshowList: [], // 轮播图列表
      // 图片列表（用于在上传组件中回显图片）
      fileList: [{name: '', url: ''}],
      total: 0, // 轮播图总数
      // 获取轮播图列表的参数对象
      queryInfo: {
        keyword: '', // 查询参数
        pageNo: 1, // 当前页码
        pageSize: 5 // 每页显示条数
      },
      addDialogVisible: false, // 控制添加轮播图对话框是否显示
      sildeshowForm: {
        // 轮播图
        title: '',
        image: ''
      },
      editDialogVisible: false, // 控制修改轮播图信息对话框是否显示
      editForm: {
        id: '',
        title: '',
        image: ''
      },
      multipleSelection: [],
      ids: []
    }
  },
  created () { // 生命周期函数
    this.getSildeshowList()
  },
  methods: {
    // 文件上传成功的钩子函数
    handleSuccess (res, file) {
      this.$message({
        type: 'info',
        message: '图片上传成功',
        duration: 6000
      })
      if (file.response.success) {
        this.editForm.image = file.response.message // 将返回的文件储存路径赋值image字段
        this.sildeshowForm.image = file.response.message // 将返回的文件储存路径赋值image字段
      }
    },
    // 删除文件之前的钩子函数
    handleRemove (file, fileList) {
      this.$message({
        type: 'info',
        message: '已删除原有图片',
        duration: 6000
      })
    },
    // 点击列表中已上传的文件事的钩子函数
    handlePreview (file) {
    },
    // 上传的文件个数超出设定时触发的函数
    onExceed (files, fileList) {
      this.$message({
        type: 'info',
        message: '最多只能上传一个图片',
        duration: 6000
      })
    },
    // 文件上传前的前的钩子函数
    // 参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M
    },
    getSildeshowList () {
      sildeshowList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            // 轮播图列表
            this.sildeshowList = res.data.data.records
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
      // 重新发起请求轮播图列表
      this.getUserList()
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage
      // 重新发起请求轮播图列表
      this.getSildeshowList()
    },
    // 添加轮播图
    addSildeshow () {
      console.log(this.sildeshowForm)
      sildeshowAdd(this.sildeshowForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.addDialogVisible = false
            this.getSildeshowList()
            this.$message({
              message: '添加轮播图成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加轮播图失败')
          }
        })
        .catch((err) => {
          this.$message.error('添加轮播图异常')
          console.log(err)
        })
    },
    // 监听 添加轮播图对话框的关闭事件
    addDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改轮播图状态
    showEditDialog (sildeshowinfo) {
      this.editDialogVisible = true
      console.log(sildeshowinfo)
      this.editForm = sildeshowinfo
    },
    // 修改轮播图
    editSildeshow () {
      sildeshowUpdate(this.editForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.editDialogVisible = false
            this.getSildeshowList()
            this.$message({
              message: '修改轮播图成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改轮播图失败')
          }
        })
        .catch((err) => {
          this.$message.error('修改轮播图异常')
          console.loge(err)
        })
    },
    // 根据ID删除对应的轮播图信息
    async removeSildeshowById (id) {
      console.log(id)
      // 弹框询问轮播图是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该轮播图, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      // 如果轮播图确认删除，则返回值为字符串 confirm
      // 如果轮播图取消删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult === 'confirm') {
        // 删除轮播图
        sildeshowDelete(id)
          .then((res) => {
            if (res.data.code === 200) {
              this.getSildeshowList()
              this.$message({
                message: '删除轮播图成功',
                type: 'success'
              })
            } else {
              this.$message.error('删除轮播图失败')
            }
          })
          .catch((err) => {
            this.$message.error('删除轮播图异常')
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
    // 批量删除轮播图
    async batchDeleteSildeshow () {
      // 弹框询问轮播图是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除轮播图, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      // 如果轮播图确认删除，则返回值为字符串 confirm
      // 如果轮播图取消删除，则返回值为字符串 cancel
      if (confirmResult === 'confirm') {
        // 批量删除轮播图
        sildeshowBatchDelete(this.ids)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '批量删除轮播图成功',
                type: 'success'
              })
              this.getSildeshowList()
            } else {
              this.$message.error('批量删除轮播图失败')
            }
          })
          .catch((err) => {
            this.$message.error('批量删除轮播图异常')
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
.sildeshowhome_main{
  margin-top: 10px;
}
.image{
  margin-left: 15px;
  width: 800px;
  height: 250px;
}
</style>
