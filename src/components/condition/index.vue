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
                        style="margin:0 10px;" placeholder="请输入科目" @click="handleSelect">
         <template slot-scope="props">
           <div class="value">{{ props.item.value }}</div>
         </template>
       </el-autocomplete>
     </div>
     <div v-if="showPaper" class="paper-con">
       <el-input v-model="makerName" placeholder="请输入出卷人姓名" style="width:30%;margin-right:10px;"></el-input>
       <el-input v-model="paperName" placeholder="请输入试卷名称" style="width:30%;margin-right:10px;"></el-input>
       <el-button type="primary" icon="el-icon-search">搜索</el-button>
     </div>
     <div v-if="showTopic" class="topic-con">
       <el-select v-model="type" placeholder="请选择题型" style="width:20%;margin-right:10px;">
         <el-option v-for="item in types" :key="item.value" :label="item.label"
                    :value="item.value">
         </el-option>
       </el-select>
       <el-input v-model="keyWords" placeholder="请输入关键字" style="width:30%;margin-right:10px;"></el-input>
       <el-button type="primary" icon="el-icon-search">搜索</el-button>
     </div>
   </div>
</template>

<script>
const types = [
  { value: '1', label: '选择题' },
  { value: '2', label: '填空题' },
  { value: '3', label: '判断题' },
  { value: '4', label: '简答题' },
  { value: '5', label: '编程题' }
]
export default {
  name: 'condition',
  data() {
    return {
      kinds: [
        { value: '0', label: '试题' },
        { value: '1', label: '试卷' }
      ],
      kind: '',
      showPaper: false,
      showTopic: false,
      isDisable: true,
      subject: '',
      makerName: '',
      paperName: '',
      types: types,
      keyWords: ''
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
    handleSelect() {
      console.log('handleSelect')
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
