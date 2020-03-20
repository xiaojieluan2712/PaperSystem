<template>
    <div class="container">
      <div class="top-side">
        <catalog :isCustom="isCustom" @toFinishPaper="toFinishPaper"></catalog>
      </div>
      <div class="paper-list" v-if="hasPaper">
        <!--<div v-for="item in paperList" :key="paperList.index">-->
          <!--{{ item.paperName }}-->
        <!--</div>-->
        <el-tag type="info" style="display:inline-block;margin-right:10px">{{ autoPaperObj.subjectName }}</el-tag>
        <span>{{ autoPaperObj.paperName }}</span>
        <el-tag type="primary" plain style="display:inline-block;margin-left:10px;"
        @click="showDetails">详情</el-tag>
      </div>
      <div class="details">
        <paper-details :autoPaperObj="autoPaperObj"></paper-details>
      </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog'
import Paper from '@/components/paper'
import paperDetails from '@/components/paperDetails'
export default {
  name: 'automaticTest',
  components: {
    paperDetails,
    Catalog,
    Paper
  },
  data() {
    return {
      isCustom: false,
      autoPaperObj: {},
      // paperList: [], // 试卷列表,
      hasPaper: false // 是否有试卷
    }
  },
  methods: {
    toFinishPaper(data) { // 自动组
      this.$set(this.autoPaperObj, 'paperName', data.paperName)
      this.$set(this.autoPaperObj, 'subjectName', data.subjectName)
      // this.$set(this.paperList, this.paperList.length - 1, this.autoPaperObj)
      this.$store.dispatch('autoCreate', data).then(() => {
        // console.log('这里点击自动组卷按钮发送请求')
        const content = this.$store.getters.autoPaperObj
        this.$set(this.autoPaperObj, 'content', content)
        this.hasPaper = true
      }).catch(err => {
        // console.log('点击自动组卷按钮报错')
        console.log(err)
      })
    },
    showDetails() {

    }
  }
}
</script>

<style scoped>
.container{
  padding:10px;
}
.top-side{
  display:inline-block;
  width:100%;
}
  .paper-list{
    padding: 10px;
    margin: 20px 0;
    font-size: 16px;
    font-weight: 600;
  }
</style>
