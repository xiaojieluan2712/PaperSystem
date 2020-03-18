<template>
    <div class="container">
      <div class="ques-list">
        <div v-for="item in quesArray" :key="item.quesId" @click="handleDetails(item.quesId)">
          <div class="ques">
            <el-tag size="mini" :color="item.labelColor" style="float:left;margin-right:3px;color:#666">{{ item.typeName }}</el-tag>
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
  props: ['quesArray'],
  data() {
    return {
      tips: '详情'
    }
  },
  methods: {
    handleDetails(quesId) {
      const data = {
        quesId: quesId
      }
      this.$emit('handleDetails', data)
    }
  }
}
</script>

<style scoped>
.container{
  padding:10px 20px;
}
  .ques{
    margin:10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:80%;
  }
</style>
