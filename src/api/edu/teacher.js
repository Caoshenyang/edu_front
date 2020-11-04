import request from '@/utils/request'

export default {

    // 获取讲师列表(条件查询分页)
    getPageListTeachers(current,limit,teacherQuery) {
        return request({
          url: `/education/teacher/pageTeacherCondition/${current}/${limit}`,
          method: 'post',
          data: teacherQuery
        })
    }
}

