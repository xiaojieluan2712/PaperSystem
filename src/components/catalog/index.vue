<template>
    <div class="container">
      <div class="title-box">
        <div v-if="isFinish">
         <div class="paper-name">
           <div v-if="isAuto">
             {{ paperName }}
           </div>
           <div v-else>
             <div class="paper-year">{{ paperYear }}</div>
             <div class="paper-title">{{ paperTitle }}</div>
           </div>
         </div>
         <div class="subject"><span>科目：</span><span>{{ subject }}</span></div>
         <div class="update-time"><span>更新时间：</span><span> {{ updateTime }}</span></div>
          <div class="score"><span>试卷总分：</span><span>{{ score }}</span></div>
        </div>
        <div v-else>
          <el-input v-model="paperName" placeholder="请输入试卷名称" :rows="2" type="textarea" style="margin:6px 0;"></el-input>
          <el-input placeholder="请输入科目" v-model="subject" style="margin:6px 0;">
            <template slot="prepend">科目：</template>
          </el-input>
          <div>
            <el-input placeholder="请输入时间" v-model="updateTime" style="margin:6px 0;">
              <template slot="prepend">时间：</template>
            </el-input>
          </div>
          <div>
            <el-input placeholder="请输入试卷总分" v-model="score" style="margin:6px 0;">
              <template slot="prepend">总分：</template>
            </el-input>
          </div>
        </div>
         <div class="preview">
           <div v-if="isCustom">
             <el-button v-if="isFinish" size="small" @click="toEdit">编辑</el-button>
             <el-button v-else type="primary" size="small" @click="toFinish">保存</el-button>
             <el-button type="success" size="small" style="background-color:#42b983;border-color:#42b983;">预览</el-button>
           </div>
           <div v-else>
           <el-button size="small">取消</el-button>
           <el-button type="primary" size="small" @click="toFinish">确定</el-button>
           </div>
         </div>
      </div>

      <div class="type-list" v-for="type in typesList" :key="type.typeId" v-if="isCustom">
        <svg-icon class-name='international-icon' icon-class="form" />
        <a href="#">{{ type.typeName }}</a>
      </div>
    </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'catalog',
  components: {
    SvgIcon
  },
  props: ['isCustom'],
  computed: {
    paperYear: function() {
      return this.paperName.split('^')[0]
    },
    paperTitle: function() {
      return this.paperName.split('^')[1]
    }
    // paperNameEdit: function() {
    //   return this.paperName.replace('^', '')
    // }
  },
  mounted() {
    var time = new Date()
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
    this.updateTime = year + '-' + month + '-' + day
  },
  data() {
    return {
      paperName: '',
      isFinish: false,
      subject: '',
      updateTime: '',
      isAutomatic: false,
      score: '',
      isAuto: true,
      typesList: [
        { typeId: 10001, typeName: '选择题', labelColor: '#6699FF' },
        { typeId: 10002, typeName: '填空题', labelColor: '#42b983' },
        { typeId: 10003, typeName: '判断题', labelColor: '#FFFF66' },
        { typeId: 10004, typeName: '简答题', labelColor: '#FFCC99' },
        { typeId: 10005, typeName: '编程题', labelColor: '#CC6666' }
      ]
    }
  },
  methods: {
    toFinish: function() {
      this.isFinish = !this.isFinish
    },
    toEdit: function() {
      this.isFinish = false
    }
  }
}
</script>

<style scoped>
.title-box {
  border: 1px solid #CCCCFF;
  border-top: 2px solid #42b983;
  width: 100%;
  padding: 10px;
}
 .title-box:hover{
  border:2px solid #42b983;
}
.paper-name{
  text-align:center;
  margin-bottom:20px;
  margin-top:20px;
  font-weight:600;
}
.paper-year{
  font-weight:600;
}
.paper-title{
  font-weight:600;
  font-size:18px;
}
.subject,.update-time,.score{
  font-size:14px;
  margin: 5px 0;
  text-align:center;
}
  .preview{
    margin:10px auto;
    text-align:center;
  }
.subject-edit span,.update-time-edit span {
}
.type-list{
  border:1px solid #CCCCFF;
  border-top:0;
  width: 100%;
  padding: 16px;
}
</style>
