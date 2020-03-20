<template>
    <div class="container">
      <div class="title-box">
        <!--这里是不可编辑的部分，isFinish=true-->
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
          <div style="text-align:center;margin-top:10px;" v-if="!isCustom">
            <el-button size="small" @click="toCancel">取消</el-button>
            <el-button type="primary" size="small" @click="toFinishPaper">自动组卷</el-button>
          </div>
        </div>
        <!--这里是可编辑的部分,isFinish=false-->
        <div v-else>
          <el-input v-model="paperName" placeholder="请输入试卷名称" :rows="2" type="textarea" style="margin:6px 0;"></el-input>
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="subject"
            :fetch-suggestions="querySearch"
            style="margin:6px 0;width:100%"
            placeholder="请输入科目"
            @select="handleSelect">
            <template slot-scope="props">
              <div class="value">{{ props.item.subjectName }}</div>
            </template>
          </el-autocomplete>
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
          <div v-if="!isCustom">
          <select-ques-type @handleData="handleData" @handleDelete="handleDelete"
          :selectedType="selectedType" :selectedArray="selectedArray"></select-ques-type>
          <div style="text-align:center;margin-top:10px;">
            <el-button size="small" @click="toEditCancel">取消</el-button>
            <el-button type="primary" size="small" @click="toEditFinish">确定</el-button>
          </div>
          </div>
        </div>
         <div class="preview">
           <!--这里是自定义组卷页面-->
           <div v-if="isCustom">
             <el-button v-if="isFinish" size="small" @click="toEdit">编辑</el-button>
             <el-button v-else type="primary" size="small" @click="toFinish">保存</el-button>
             <el-button type="success" size="small" style="background-color:#42b983;border-color:#42b983;">预览</el-button>
           </div>
           <!--这里是自动组卷页面-->
           <!--<div v-else>-->
           <!--<el-button size="small" @click="toEditCancel">取消</el-button>-->
           <!--<el-button type="primary" size="small" @click="toEditFinish">确定</el-button>-->
           <!--</div>-->
         </div>
      </div>
      <!--<div class="type-list" v-for="type in typesList" :key="type.typeId" v-if="isCustom">-->
        <!--<svg-icon class-name='international-icon' icon-class="form" />-->
        <!--<a href="#">{{ type.typeName }}</a>-->
      <!--</div>-->
    </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import selectQuesType from '@/components/selectQuesType'

export default {
  name: 'catalog',
  components: {
    SvgIcon,
    selectQuesType
  },
  props: ['isCustom'],
  computed: {
    paperYear: function() {
      return this.paperName.split('^')[0]
    },
    paperTitle: function() {
      return this.paperName.split('^')[1]
    }
  },
  mounted() {
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    this.updateTime = year + '-' + month + '-' + day
    this.$store.dispatch('autoInitial').then(() => {
      this.autoSubjectsList = this.$store.getters.autoSubjectsList
    }).catch(err => {
      console.log(err)
    })
  },
  data() {
    return {
      autoSubjectsList: [],
      paperName: '',
      isFinish: false,
      subject: '',
      subjectId: 0,
      updateTime: '',
      isAutomatic: false,
      score: 0,
      isAuto: true,
      // selectSubjectName: '',
      perScore: '',
      typeScoreList: [],
      selectedType: {
        type: [], // 选择一种题型，题数和分值
        dynamicItem: [[]] // 整个题型，题数和分值数组
      },
      selectedArray: [] // 已经选择了的题型,
    }
  },
  methods: {
    toFinish: function() {
      this.isFinish = true
    },
    toCancel: function() {
      this.isFinish = false
    },
    toEdit: function() {
      this.isFinish = false
    },
    toEditCancel() {
      // 所有的变量重置为空
      this.paperName = ''
      this.subject = ''
      this.score = 0
      this.selectedType.dynamicItem = [[]]
    },
    toEditFinish() {
      var total = 0 // 计算试卷的总分
      const length = this.typeScoreList.length
      for (let i = 0; i < length; i++) {
        total += this.typeScoreList[i][1] * this.typeScoreList[i][2]
      }
      console.log(total)
      if (total !== 100) { // 如果试卷总分不为100，则弹出警告信息
        alert('题型选择总分不为既定总分！请重新选择')
      } else { // 如果试卷总分为100，则跳转显示自动组卷按钮
        this.isFinish = true
      }
    },
    handleData(item) {
      // console.log(item)
      const typeId = item[0]
      const length = this.typeScoreList.length // 2
      if (length === 0) {
        this.typeScoreList.push(item)
        // console.log('第一次增加题型')
        // console.log(this.typeScoreList)
      } else {
        for (var i = 0; i < length; i++) {
          if (this.typeScoreList[i][0] === typeId) {
            this.typeScoreList[i] = item
            // console.log('修改值后')
            // console.log(this.typeScoreList)
            break
          }
        }
        if (i === length) {
          this.typeScoreList.push(item)
          // console.log('handleData222')
          // console.log(this.typeScoreList)
        }
      }
    },
    handleDelete(item) {
      const length = this.typeScoreList.length
      const typeId = item[0]
      for (let i = 0; i < length; i++) {
        if (this.typeScoreList[i][0] === typeId) {
          // console.log('handleDelete')
          this.typeScoreList.splice(i, 1, item)
          // console.log(this.typeScoreList)
          break
        }
      }
    },
    toFinishPaper() { // 自动组卷
      const data = {
        typeScoreList: this.typeScoreList, // 题型和分值
        score: this.score, // 总分
        subjectId: this.subjectId,
        subjectName: this.subject,
        paperName: this.paperName
      }
      this.$emit('toFinishPaper', data)
    },
    querySearch(queryString, cb) {
      const autoSubjectsList = this.autoSubjectsList
      const results = queryString ? autoSubjectsList.filter(this.createFilter(queryString)) : autoSubjectsList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (autoSubjectsList) => {
        return (autoSubjectsList.subjectName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
      this.subject = item.subjectName
      this.subjectId = item.subjectId
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
