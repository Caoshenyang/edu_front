<template>
    <div class="app-container">
        讲师列表
    </div>
</template>
<script>
//引入调用teacher.js文件
import teacher from '@/api/edu/teacher'


export default {
    // data:{},
    data(){
        return{
            list:null,
            toatal:0,
            page: 1,
            limit: 10,
            teacherQuery:{}
        }
    },
    created(){
        this.getList()
    },
    methods:{
        //获取讲师列表
        getList(){
            teacher.getPageListTeachers(this.page,this.limit,this.teacherQuery)
            .then(Response =>{
                //请求成功返回数据
                console.log(Response)
            })
            .catch(error => {console.log(error)})//请求失败
        }
    }
}
</script>