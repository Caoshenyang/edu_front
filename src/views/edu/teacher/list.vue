<template>
  <div class="app-container">
    讲师列表
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="讲师姓名" width="180">
      </el-table-column>
      <el-table-column prop="intro" label="讲师简介" width="200">
      </el-table-column>
      <el-table-column prop="career" label="讲师资历" width="180">
      </el-table-column>
      <el-table-column label="头衔" width="180">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="avatar" label="讲师头像"> </el-table-column> -->
      <el-table-column prop="sort" label="排序" width="70"> </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="gmtModified" label="更新时间" width="150">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
        </el-row>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      background
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入调用teacher.js文件
import teacher from "@/api/edu/teacher";

export default {
  // data:{},
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      teacherQuery: {
        name: "",
        level: "",
        begin: "",
        end: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取讲师列表
    getList(page = 1) {
      this.page = page;
      teacher
        .getPageListTeachers(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          //请求成功返回数据
          this.tableData = response.data.rows;
          this.tatal = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        }); //请求失败
    },
    resetData() {
      this.teacherQuery = {};
      this.getList();
    },
  },
};
</script>