<template>
<div class="container">
  <div class="enter-area">
    <div class="condition">
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="subject"
        :fetch-suggestions="querySearch"
        style="width:40%"
        placeholder="请输入科目"
        @click="handleSelect">
        <template slot-scope="props">
          <div class="value">{{ props.item.value }}</div>
        </template>
      </el-autocomplete>
      <el-select v-model="type" placeholder="请选择题型">
        <el-option v-for="item in types" :key="item.value" :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10 }"
    placeholder="在此输入题目" v-model="topic" style="width:100%;margin:10px 0;" :disabled="isDisabled">
  </el-input>
  <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 20 }"
            placeholder="在此输入参考答案" v-model="result" style="width:100%;margin:10px 0;" :disabled="isDisabled">
  </el-input>
  <el-input v-model="keyWords" placeholder="请输入关键字便于搜索" style="width:100%;margin:10px 0;" :disabled="isDisabled"></el-input>
  <div class="button">
    <el-button type="info" @click="handleCancel">取消</el-button>
    <el-button type="primary" @click="handleCreate">确定</el-button>
  </div>
  </div>
  <div class="list-area">
    <div>
      <span class="title">已录入题目</span>
      <el-button type="primary" plain size="mini">管理个人题库</el-button>
    </div>
    <div class="ques-list">
      <div v-for="item in quesArray" :key="item.id">
        <div class="ques">
          <el-tag size="mini" style="float:left;margin-right:3px;">{{ item.typeName }}</el-tag>
          <el-tag type="info" size="mini" style="float:left;margin-right:3px;">{{ item.subAbbr }}</el-tag>
          <a class="details" :title="tips" @click="handleDetails">{{ item.question }}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="detail-area">
    <ques-details v-show="showDetail"></ques-details>
  </div>
</div>
</template>

<script>
import QuesDetails from '@/components/QuesDetails'
const types = [
  { value: '1', label: '选择题' },
  { value: '2', label: '填空题' },
  { value: '3', label: '判断题' },
  { value: '4', label: '简答题' },
  { value: '5', label: '编程题' }
]
export default {
  name: 'testEntry',
  components: {
    QuesDetails
  },
  data() {
    return {
      subject: '',
      subjectsList: [],
      types: types,
      type: '',
      topic: '', // 题目
      result: '', // 答案
      keyWords: '', // 关键字
      quesObj: {}, // 一个题目的信息
      quesArray: [
        { // 初始化数据
          id: +new Date(),
          subject: '大学英语',
          subAbbr: '大英（1）',
          type: '1',
          typeName: '选择题',
          question: '____ nice a day',
          result: 'How',
          Date: new Date(),
          keyWords: '感叹句'
        }
      ],
      tips: '详情',
      showDetail: false
    }
  },
  computed: {
    isDisabled() {
      if (this.subject !== '' && this.type !== '') {
        return false
      } else return true
    }
  },
  mounted() {
    this.subjectsList = this.loadAll()
    console.log(this.subjectsList)
  },
  methods: {
    loadAll() {
      return [
        { value: '高等数学' },
        { value: '程序设计' },
        { value: '中国近代史' },
        { value: '线性代数' },
        { value: '大学英语' },
        { value: '计算机网络' }
      ]
    },
    querySearch(queryString, cb) {
      var subjectsList = this.subjectsList
      var results = queryString ? subjectsList.filter(this.createFilter(queryString)) : subjectsList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (subjectsList) => {
        return (subjectsList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect() {
      console.log('handleSelect')
    },
    handleCancel() {
      // 置空
      this.subject = ''
      this.type = ''
      this.topic = ''
      this.result = ''
      this.keyWords = ''
    },
    getTypeName() {
      if (this.type === '1') return '选择题'
      else if (this.type === '2') return '填空题'
      else if (this.type === '3') return '判断题'
      else if (this.type === '4') return '简答题'
      else if (this.type === '5') return '编程题'
    },
    handleCreate() { // 创建一道试题记录
      var typeName = this.getTypeName()
      console.log(typeName)
      this.quesObj = {
        id: +new Date(),
        subject: this.subject,
        subAbbr: this.subject,
        type: this.type,
        typeName: typeName,
        question: this.topic,
        result: this.result,
        Date: new Date(),
        keyWords: this.keyWords
      }
      // console.log(this.quesObj)
      this.$set(this.quesArray, 0, this.quesObj)
      this.subject = ''
      this.type = ''
      this.topic = ''
      this.result = ''
      this.keyWords = ''
    },
    handleDetails() {
      this.showDetail = true
    }
  }
}
</script>

<style scoped>
.container{
  padding:10px;
}
.condition{
  margin:10px 0;
}
.enter-area{
  width:50%;
  float:left;
}
.list-area{
  width:45%;
  float:left;
  margin-left:20px;
}
.button{
  width:100%;
  text-align:center;
  margin:20px auto;
}
.title{
  margin-right:20px;
  font-weight: bold;
}
.ques-list{
  width:100%;
  margin-top:10px;
}
.ques-list::after{   /*取消浮动效果*/
  content:'';
  clear:both;
  display:block;
}
.ques{
  width:100%;
  padding:5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
