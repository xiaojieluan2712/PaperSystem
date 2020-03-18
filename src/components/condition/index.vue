<template>
   <div class="container">
     <div class="select-kind">
       <el-select v-model="kind" placeholder="请选择种类">
         <el-option v-for="item in kinds" :key="item.value" :label="item.label"
                    :value="item.value">
         </el-option>
       </el-select>
       <el-autocomplete popper-class="my-autocomplete" :disabled="isDisable"
                        v-model="subject" :fetch-suggestions="querySearch"
                        style="margin:0 10px;" placeholder="请输入科目" @select="handleSelect">
         <template slot-scope="props">
           <div class="value">{{ props.item.subjectName }}</div>
         </template>
       </el-autocomplete>
     </div>
     <div v-if="showPaper" class="paper-con">
       <el-autocomplete popper-class="my-autocomplete" style="margin-right:10px;"
                        v-model="makerName" :fetch-suggestions="querySearchName"
                        placeholder="请输入出卷人姓名" @select="handleSelectName">
         <template slot-scope="props">
           <div class="value">{{ props.item.relName }}</div>
         </template>
       </el-autocomplete>
       <el-input v-model="paperName" placeholder="请输入试卷名称" style="width:30%;margin-right:10px;"></el-input>
       <el-button type="primary" icon="el-icon-search">搜索</el-button>
     </div>
     <div v-if="showTopic" class="topic-con">
       <el-select v-model="typeName" placeholder="请选择题型" style="width:20%;margin-right:10px;" @change="handleTypeId">
         <el-option v-for="item in quesTypes" :key="item.typeId" :label="item.typeName"
                    :value="item.typeId">
         </el-option>
       </el-select>
       <el-autocomplete popper-class="my-autocomplete"
                        v-model="questioner" :fetch-suggestions="querySearchName"
                        placeholder="请输入出题人姓名" @select="handleSelectName">
         <template slot-scope="props">
           <div class="value">{{ props.item.relName }}</div>
         </template>
       </el-autocomplete>
       <el-input v-model="keyWords" placeholder="请输入关键字" style="width:30%;margin-right:10px;"></el-input>
       <el-button type="primary" icon="el-icon-search" @click="handleSearchQuesList">搜索</el-button>
     </div>
   </div>
</template>

<script>
export default {
  name: 'condition',
  data() {
    return {
      kinds: [
        { value: '0', label: '试题' },
        { value: '1', label: '试卷' }
      ],
      subjectsList: [],
      quesTypes: [],
      typeName: '',
      kind: '',
      showPaper: false,
      showTopic: false,
      isDisable: true,
      subject: '',
      subjectId: 0,
      typeId: 0,
      userId: 0,
      makerName: '',
      paperName: '',
      keyWords: '',
      questionerList: [],
      questioner: ''
    }
  },
  mounted() {
    this.$store.dispatch('dataQueryInit').then(() => {
      this.subjectsList = this.$store.getters.dataSubjectsList
      this.quesTypes = this.$store.getters.dataQuesTypes
      this.questionerList = this.$store.getters.questionerList
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    querySearch(queryString, cb) {
      const subjectsList = this.subjectsList
      const results = queryString ? subjectsList.filter(this.createFilter(queryString)) : subjectsList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (subjectsList) => {
        return (subjectsList.subjectName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.subject = item.subjectName
      this.subjectId = item.subjectId
    },
    querySearchName(queryString, cb) {
      const questionerList = this.questionerList
      const results = queryString ? questionerList.filter(this.createFilterName(queryString)) : questionerList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilterName(queryString) {
      return (questionerList) => {
        return (questionerList.relName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectName(item) {
      this.questioner = item.relName
      this.userId = item.userId
      console.log(this.userId)
      console.log(this.questioner)
    },
    handleTypeId(item) {
      this.typeId = item
    },
    handleSearchQuesList() {
      const data = {
        subjectId: this.subjectId,
        typeId: this.typeId,
        userId: this.userId,
        quesKeyWords: this.keyWords
      }
      console.log('condition组件')
      console.log(data)
      this.subject = ''
      this.typeName = ''
      this.questioner = ''
      this.keyWords = ''
      this.$emit('handleSearchQuesList', data)
    }
  },
  watch: {
    kind: function(newVal, oldVal) {
      if (newVal === '0') { // 试题
        this.isDisable = false
        this.showTopic = true
        this.showPaper = false
      } else if (newVal === '1') { // 试卷
        this.isDisable = false
        this.showPaper = true
        this.showTopic = false
      }
    }
  }
}
</script>

<style scoped>
  .container{
    padding:20px 10px;
  }
  .select-kind{
    display:inline-block;
  }
  .paper-con{
    display:inline-block;
    width:60%;
  }
  .topic-con{
    display:inline-block;
    width:60%;
  }
</style>
