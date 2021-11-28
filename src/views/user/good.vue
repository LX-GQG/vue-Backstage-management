<template>
  <div id="good">
    <!--Layout布局-->
        <el-row>
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="6">
                <!--搜索区域-->
                <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getGoodsList">
                  <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="2.5">
                <el-button type="Info" class="bluebg" @click="addDialogVisible = true">添加商品</el-button>
              </el-col>
              <el-col :span="2.5">
                <el-button type="danger" @click="batchDeleteGoods">批量删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="goodhome_main">
            <!--表格-->
            <el-table :data="goodsList" border stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40"> </el-table-column>
              <el-table-column type="index" label="序号" width="50" style="text-align: center;"></el-table-column>
              <el-table-column prop="commname" label="商品名称" width="100"></el-table-column>
              <el-table-column prop="commoney" label="前台销售价格" width="120"></el-table-column>
              <el-table-column prop="pvename" label="供应商名称" >
                <template slot-scope="scope">
                  <el-select v-model="scope.row.providerid" @change="getprovideritem" disabled class="bynames" >
                    {{ pvename }}
                    <el-option
                      v-for='item in chioce'
                      :key="item.providerid"
                      :label="item.pvename"
                      :value="item.providerid">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="commdesc" label="商品描述"></el-table-column>
              <el-table-column prop="size" label="规格"></el-table-column>
              <el-table-column prop="inventory" label="库存"></el-table-column>
              <el-table-column prop="commbering" label="商品编号"></el-table-column>
              <el-table-column label="图片" width="180" prop="picture">
                <template slot-scope="scope" height="75">
                  <!-- <img :src="scope.row.picture" class="picture"/> -->
                  <img v-if="scope.row.picture" :src=" '/static' + scope.row.picture" class="pictrue">
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <!--修改按钮-->
                  <el-button type="Info" class="bluebg" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)">
                  </el-button>
                  <!--删除按钮-->
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeGoodById(scope.row.commid)">
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
        <!--添加商品的对话框-->
        <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="32%" @close="addDialogClosed">
        <!--内容主体区域-->
        <el-form :model="goodsForm" label-width="80px">
          <el-form-item label="商品名称" prop="commname">
            <el-input v-model="goodsForm.commname"></el-input>
          </el-form-item>
          <el-form-item label="前台销售价" prop="commoney">
            <el-input v-model="goodsForm.commoney" type="number" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="commdesc">
            <el-input v-model="goodsForm.commdesc"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="pvename">
            <el-select v-model="goodsForm.providerid" @change="getprovideritem">
                    <el-option
                      v-for='item in chioce'
                      :key="item.providerid"
                      :label="item.pvename"
                      :value="item.providerid">
                    </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格" prop="size">
            <el-input v-model="goodsForm.size" placeholder="例如：500g" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="picture">
            <el-upload
               v-model="goodsForm.picture"
               ref="upload"
               action="http://localhost:8088/api/good/upload"
               name="picture"
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
          <el-button type="primary" @click="addGoods" class="bluebg">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改商品的对话框-->
      <el-dialog title="修改商品" :visible.sync="editDialogVisible" width="30%">
      <!--内容主体区域-->
      <el-form :model="editForm" label-width="70px">
        <el-form-item label="商品名称" prop="commname">
            <el-input v-model="editForm.commname"></el-input>
          </el-form-item>
          <el-form-item label="前台销售价" prop="commoney">
            <el-input v-model="editForm.commoney" type="number" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="commdesc">
            <el-input v-model="editForm.commdesc" placeholder="例如：香甜可口"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="pvename">
            <el-select v-model="editForm.providerid" @change="getprovideritem">
                    <el-option
                      v-for='item in chioce'
                      :key="item.providerid"
                      :label="item.pvename"
                      :value="item.providerid">
                    </el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="规格" prop="size">
            <el-input v-model="editForm.size" placeholder="例如：500g" @keyup.native="proving2($event)"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="picture">
            <el-upload
               v-model="editForm.picture"
               ref="upload"
               action="http://localhost:8088/api/good/upload"
               name="picture"
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
        <el-button type="primary" @click="editGoods" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsList, goodsAdd, goodsUpdate, goodsDelete, goodsBatchDelete, AllProvider, BynameProvider } from '@/api/goods.js'
export default {
  data () {
    return {
      // 文件上传的参数
      dialogImageUrl: '',
      // 图片列表（用于在上传组件中回显图片）
      fileList: [{name: '', url: ''}],
      goodsList: [], // 商品列表
      total: 0, // 商品总数
      chioce: [],
      goodname: '',
      id: '',
      pvename: '',
      // 获取商品列表的参数对象
      queryInfo: {
        keyword: '', // 查询参数
        pageNo: 1, // 当前页码
        pageSize: 5 // 每页显示条数
      },
      addDialogVisible: false, // 控制添加商品对话框是否显示
      goodsForm: {
        // 商品
        commname: '',
        commoney: '',
        commdesc: '',
        providerid: 0,
        pvename: '',
        size: '',
        picture: ''
      },
      editDialogVisible: false, // 控制修改商品信息对话框是否显示
      editForm: {
        commid: '',
        commname: '',
        commoney: '',
        commdesc: '',
        providerid: 0,
        pvename: '',
        size: '',
        picture: ''
      },
      multipleSelection: [],
      commids: []
    }
  },
  created () { // 生命周期函数
    this.getGoodsList()
  },
  mounted () {
    this.getprovideritem()
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
    getprovideritem () {
      AllProvider()
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
    // 文件上传成功的钩子函数
    handleSuccess (res, file) {
      this.$message({
        type: 'info',
        message: '图片上传成功',
        duration: 6000
      })
      if (file.response.success) {
        this.editForm.picture = file.response.message // 将返回的文件储存路径赋值picture字段
        this.goodsForm.picture = file.response.message // 将返回的文件储存路径赋值picture字段
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
    getGoodsList () {
      goodsList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            // 商品列表
            this.goodsList = res.data.data.records
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
      // 重新发起请求商品列表
      this.getGoodsList()
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage
      // 重新发起请求商品列表
      this.getGoodsList()
    },
    // 添加商品
    addGoods () {
      console.log(this.goodsForm)
      goodsAdd(this.goodsForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.addDialogVisible = false
            this.getGoodsList()
            this.$message({
              message: '添加商品成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加商品失败')
          }
        })
        .catch((err) => {
          this.$message.error('添加商品异常')
          console.log(err)
        })
    },
    // 监听 添加商品对话框的关闭事件
    addDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改商品状态
    showEditDialog (goodsinfo) {
      this.editDialogVisible = true
      console.log(goodsinfo)
      this.editForm = goodsinfo
    },
    // 修改商品
    editGoods () {
      goodsUpdate(this.editForm)
        .then((res) => {
          if (res.data.code === 200) {
            this.editDialogVisible = false
            this.getGoodsList()
            this.$message({
              message: '修改商品成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改商品失败')
          }
        })
        .catch((err) => {
          this.$message.error('修改商品异常')
          console.loge(err)
        })
    },
    // 根据ID删除对应的用户信息
    async removeGoodById (commid) {
    // 弹框询问商品是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
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
        // 删除商品
        goodsDelete(commid)
          .then((res) => {
            if (res.data.code === 200) {
              this.getGoodsList()
              this.$message({
                message: '删除商品成功',
                type: 'success'
              })
            } else {
              this.$message.error('删除商品失败')
            }
          })
          .catch((err) => {
            this.$message.error('删除商品异常')
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
        this.commids.push(item.commid)
        console.log(this.commids)
      })
    },
    // 批量删除商品
    async batchDeleteGoods () {
      // 弹框询问用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除商品, 是否继续?',
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
        // 批量删除商品
        goodsBatchDelete(this.commids)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '批量删除商品成功',
                type: 'success'
              })
              this.getGoodsList()
            } else {
              this.$message.error('批量删除商品失败')
            }
          })
          .catch((err) => {
            this.$message.error('批量删除商品异常')
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
.goodhome_main{
  margin-top: 10px;
}
.pictrue{
  width: 130px;
  height: 120px;
  margin-left: 17px;
}
.bynames .el-input.is-disabled .el-input__inner{
  width: 92px;
  color: black;
}
.bynames .el-input__suffix{
  height: 25%;
}
.bynames .el-input--suffix .el-input__inner {
  padding-right: 18px;
}
</style>
