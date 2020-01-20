<template>
    <div class="container">
      <div class="ques-list">
        <div v-for="item in quesArray" :key="item.id">
          <div class="ques">
            <el-tag size="mini" style="float:left;margin-right:3px;">{{ item.typeName }}</el-tag>
            <el-tag type="info" size="mini" style="float:left;margin-right:3px;">{{ item.subAbbr }}</el-tag>
            <a class="details" :title="tips">{{ item.question }}</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'recordList',
  data() {
    return {
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
      ]
    }
  }
}
</script>

<style scoped>
.container{
  padding:10px 20px;
}
</style>
