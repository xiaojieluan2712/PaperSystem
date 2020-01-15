<template>
  <div class="contain">
    <div class="line">
    <label>录入时间：</label>
    <el-input v-model="date" placeholder="请输入时间"
              style="width:70%;"></el-input>
    </div>
    <div class="line">
    <label>所属科目：</label>
    <el-input v-model="subject" placeholder="请输入所属科目"
    style="width:70%;"></el-input>
    </div>
    <div class="line">
    <label>题型：</label>
    <el-input v-model="type" placeholder="请输入题型"
              style="width:70%;"></el-input>
    </div>
    <div class="line">
    <label>题目：</label>
    <el-input
      type="textarea" :rows="2" placeholder="请输入题目" v-model="topic"
      style="width:70%;">
    </el-input>
    </div>
    <div class="line">
    <label>参考答案：</label>
    <el-input
      type="textarea" :rows="2" placeholder="请输入答案" v-model="result"
      style="width:70%;">
    </el-input>
    </div>
    <div class="line">
    <label>关键字：</label>
    <el-input type="textarea" :rows="1" placeholder="请输入关键字"
              style="width:70%;" v-model="keyWords">
    </el-input>
    </div>
    <div class="line">
      <el-button size="mini">取消</el-button>
      <el-button type="danger" size="mini">删除</el-button>
      <el-button type="primary" size="mini">保存修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quesDetails',
  data() {
    return {
      date: '',
      subject: '',
      type: '',
      topic: '',
      result: '',
      keyWords: ''
    }
  }
}
</script>

<style scoped>
.contain{
  position:absolute;
  top:20%;
  left:50%;
  margin-left: -18%;
  background-color: #eeeeee;
  width:36%;
  border-radius:10px;
  padding:20px;
  border: 1px solid #9E9E9E;
}
.contain label{
  display:inline-block;
  width:20%;
  text-align:right;
  font-weight:500;
}
.line{
  margin:10px 0;
  text-align:center;
  vertical-align: middle;
}
</style>
