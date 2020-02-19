<template>
<div class="container">
  <div v-show="!showDetail">
    <div class="enter-area">
      <div class="condition">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="subject"
          :fetch-suggestions="querySearch"
          style="width:40%"
          placeholder="请输入科目"
          @select="handleSelect">
          <template slot-scope="props">
            <div class="value">{{ props.item.subjectName }}</div>
          </template>
        </el-autocomplete>
        <el-select v-model="type" placeholder="请选择题型" @change="handleTypeId">
          <el-option v-for="item in quesTypes" :key="item.typeId" :label="item.typeName"
                     :value="item.typeId">
          </el-option>
        </el-select>
      </div>
    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10 }"
      placeholder="在此输入题目" v-model="question" style="width:100%;margin:10px 0;" :disabled="isDisabled">
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
      <div v-for="item in quesArray" :key="item.quesId" @click="handleDetails(item.quesId)">
        <div class="ques">
          <el-tag size="mini" :color="item.labelColor" style="float:left;margin-right:3px;color:#666666">{{ item.typeName }}</el-tag>
          <el-tag type="info" size="mini" style="float:left;margin-right:3px;">{{ item.subAbbr }}</el-tag>
          <a class="details" :title="tips">{{ item.question }}</a>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="detail-area">
    <ques-details v-show="showDetail" @handleCancel="handleCancelDetils" :quesObj="quesObj"
                  :validDate="validDate" @handleSaveEdit="handleSaveEdit"
    @handleDeleteQues="handleDeleteQues"></ques-details>
  </div>
</div>
</template>

<script>
import QuesDetails from '@/views/testEntry/details'
import { getTime } from '@/utils/getTime'

export default {
  name: 'testEntry',
  components: {
    QuesDetails
  },
  data() {
    return {
      subject: '',
      subjectsList: [],
      quesTypes: [],
      quesArray: [],
      type: '',
      question: '', // 题目
      result: '', // 答案
      keyWords: '', // 关键字
      tips: '详情',
      showDetail: false,
      quesObj: {},
      validDate: ''
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
    this.$store.dispatch('initial').then(() => {
      this.subjectsList = this.$store.getters.subjectsList
      this.quesTypes = this.$store.getters.quesTypes
      this.quesArray = this.$store.getters.quesArray
    }).catch(error => {
      console.log(error)
    })
  },
  methods: { // 过滤
    querySearch(queryString, cb) {
      const subjectsList = this.subjectsList
      const results = queryString ? subjectsList.filter(this.createFilter(queryString)) : subjectsList
      // const results = subjectsList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (subjectsList) => {
        return (subjectsList.subjectName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
      this.subject = item.subjectName
      this.subjectId = item.subjectId
    },
    handleTypeId(item) {
      // console.log('如何获取typeId')
      this.typeId = item
    },
    handleCancel() {
      // 置空
      this.subject = ''
      this.type = ''
      this.question = ''
      this.result = ''
      this.keyWords = ''
    },
    handleCreate() { // 创建一道试题记录
      const quesObj = {
        quesId: +new Date(),
        subjectId: this.subjectId,
        typeId: this.typeId,
        question: this.question,
        result: this.result,
        Date: getTime(new Date()),
        quesKeyWords: this.keyWords
      }
      console.log(this.quesObj)
      this.$store.dispatch('createQuesObj', quesObj).then(() => {
        // alert('创建成功')
        location.reload()
      }).catch(error => {
        alert('创建失败')
        console.log(error)
      })
      // 此处可改进
    },
    handleDetails(quesId) {
      const data = {
        quesId: quesId
      }
      this.$store.dispatch('getQuesDetails', data).then(() => {
        this.showDetail = true
        this.quesObj = this.$store.getters.quesObj
        this.validDate = getTime(new Date(this.quesObj.date))
      }).catch(error => {
        console.log(error)
      })
    },
    handleCancelDetils() {
      this.showDetail = false
    },
    handleSaveEdit(data) {
      // console.log(data)
      this.$store.dispatch('editQues', data).then(() => {
        alert('修改成功')
        this.showDetail = false
        // this.$router.replace('/testEntry')
        location.reload()
      }).catch(error => {
        alert('修改失败')
        console.log(error)
      })
    },
    handleDeleteQues() {
      const quesObj = this.$store.getters.quesObj
      const quesId = quesObj.quesId
      console.log(quesId)
      const data = {
        quesId: quesId
      }
      this.$store.dispatch('deleteQues', data).then(() => {
        alert('删除成功')
        this.showDetail = false
        location.reload()
      }).catch(error => {
        alert('删除失败')
        console.log(error)
      })
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
