<template>
  <div>
    <div>
      <el-button type="primary" size="mini" plain @click="show != show"
        >弹框新增</el-button
      ><br /><br />
    </div>
    <el-table :height="400"
      border
      stripe
      ref="multipleTable"
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column
      ><el-table-column prop="id" label="编号" width="120"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="bir" label="生日" width="120"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
           title="确定要删除该用户吗？"
           @confirm="handleDelete(scope.$index, scope.row)" >
             <el-button
             size="mini"
             type="danger"
             slot="reference">删除</el-button>
                </el-popconfirm>
         
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
  <el-col :span="22" :offset="0">
    <el-pagination
    background
    style="margin:15px 0px"
    layout="total,sizes,prev, pager, next,jumper"
    prev-text="上一页"
    next-text="下一页"
    :total="total"
    :page-size="pageSize"
    :current-page="pageNumber"
    :page-sizes="[2,4,6,8,10]"
    @current-change="findPage"
    @size-change="findSize"
    >
    
  </el-pagination>
  </el-col>
</el-row>
    
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button type="primary" style="margin: 10px 0px" @click="saveUserInfo"
        >当前页面新增</el-button
      >
      <transition name="el-zoom-in-top">
        <div v-show="show" class="transition-box">

          <el-form ref="userForm" :model="form" label-width="80px" label-suffix=":" :rules="rules" :hide-required-asterisk="false">
            <el-form-item label="姓名" prop="name">
              <el-input clearable v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="生日" prop="bir">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.bir"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="textarea" v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit('userForm')">保存</el-button>
              <el-button @click="show = !show">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      search: "",
      show: false,
      form: {
        name: "",
        bir: "",
        sex: "男",
        address: "",
      },
      total:0,
      pageSize:4,
      pageNumber:1,
      rules: {
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur ' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur ' }
          ],
          bir:[{required: true, message: '选择日期', trigger: 'blur ' }]
        }
    };
  },
  methods: {
    saveUserInfo(){
      this.show = true
      this.form= {
        sex:"男"
      }
             
    },

    onSubmit(userForm) {
      // 验证表单信息
       this.$refs[userForm].validate((valid) => {
          if (valid) {
            // 发送一个ajax请求
       this.axios.post("http://localhost:9999/user/save",this.form).then(response=>{
        if(response.data.status){
          this.$message({
          message: '恭喜'+response.data.msg,
          type: 'success'
        });
        // 清空表单  但是不清空原有的默认值
        this.form = {
          sex:"男"
        };
        // 关闭弹框
        this.show = false;
        // 刷新表单
        this.findAll()

        }else{
            this.$message({
          message: response.data.msg,
          type: 'warning'
        });
        }
      })
          } else {
            this.$message.error("数据不合法")
            return false;
          }
        });
        
    },
    // 查询表单数据 封装成方法  后端将data处理成了users 所以修改返回数据
    findAll(pageNumber,pageSize){
      pageNumber = pageNumber?pageNumber:this.pageNumber
      pageSize = pageSize?pageSize:this.pageSize
      this.axios.get("http://localhost:9999/user/findByPage?pageNumber="+pageNumber+"&pageSize="+pageSize).then((response) => {
      this.tableData = response.data.users;
      this.total = response.data.total
    });
    },
    handleEdit(index, row) {
       this.show = true;
       this.form = row;
      
    },
    handleDelete(index, row) {
      this.axios.delete("http://localhost:9999/user/delete?id="+row.id).then(response=>{
        if(response.data.status){
          this.$message({
          message: response.data.msg,
          type: 'success'
        });
        // 刷新表单
        this.findAll()

        }else{
            this.$message.console.error(response.data.msg);
        }
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    findPage(pageNumber){
      this.pageNumber=pageNumber
      this.findAll(pageNumber,this.pageSize)

    },
    findSize(pageSize){
      this.pageSize=pageSize
      this.findAll(this.pageNumber,pageSize)

    }
  },
  created() {
    this.findAll();
  },
};
</script>

<style scoped>
.transition-box {
  margin-bottom: 10px;
  width: 400px;
  height: 400px;
  border-radius: 4px;
  background-color: #a6b3c0;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
