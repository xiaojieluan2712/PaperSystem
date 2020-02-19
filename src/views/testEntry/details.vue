<template>
  <div class="contain">
    <div class="line">
    <label>录入时间：</label>
    <el-input v-model="validDate" placeholder="请输入时间"
              style="width:70%;"></el-input>
    </div>
    <div class="line">
    <label>所属科目：</label>
    <el-input v-model="quesObj.subjectName" placeholder="请输入所属科目"
    style="width:70%;"></el-input>
    </div>
    <div class="line">
    <label>题型：</label>
    <el-input v-model="quesObj.typeName" placeholder="请输入题型"
              style="width:70%;"></el-input>
    </div>
    <div class="line">
    <label>题目：</label>
    <el-input
      type="textarea" :rows="6" placeholder="请输入题目" v-model="quesObj.question"
      style="width:70%;">
    </el-input>
    </div>
    <div class="line">
    <label>参考答案：</label>
    <el-input
      type="textarea" :rows="8" placeholder="请输入答案" v-model="quesObj.result"
      style="width:70%;">
    </el-input>
    </div>
    <div class="line">
    <label>关键字：</label>
    <el-input type="textarea" :rows="1" placeholder="请输入关键字"
              style="width:70%;" v-model="quesObj.quesKeyWords">
    </el-input>
    </div>
    <div class="btn-area">
      <el-button @click="handleCancel">返回</el-button>
      <el-button type="danger" @click="handleDeleteQues">删除</el-button>
      <el-button type="primary" @click="handleSaveEdit">保存修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quesDetails',
  props: ['quesObj', 'validDate'],
  methods: {
    handleCancel: function() {
      this.$emit('handleCancel')
    },
    handleSaveEdit: function() {
      const data = {
        date: new Date(this.quesObj.date),
        quesKeyWords: this.quesObj.quesKeyWords,
        question: this.quesObj.question,
        result: this.quesObj.result,
        subjectName: this.quesObj.subjectName,
        typeName: this.quesObj.typeName,
        quesId: this.quesObj.quesId
      }
      // console.log(data)
      this.$emit('handleSaveEdit', data)
    },
    handleDeleteQues() {
      this.$emit('handleDeleteQues')
    }
  }
}
</script>

<style scoped>
.contain label{
  display:inline-block;
  width:10%;
  text-align:right;
  vertical-align: top;
  padding-top: 10px;
  font-weight:500;
}
.line{
  margin:10px 20px;
  vertical-align: middle;
}
  .btn-area{
    /*text-align:right;*/
    margin-top:20px;
    margin-left:30%;
  }
</style>
