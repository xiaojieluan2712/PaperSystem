<template>
    <div class="container">
      <div class="top-side">
        <catalog :isCustom="isCustom" @toFinishPaper="toFinishPaper"></catalog>
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
      autoPaperObj: {}
    }
  },
  methods: {
    toFinishPaper(data) { // 自动组卷
      this.$store.dispatch('autoCreate', data).then(() => {
        // console.log('这里点击自动组卷按钮发送请求')
        this.autoPaperObj = this.$store.getters.autoPaperObj
        // console.log(this.autoPaperObj)
      }).catch(err => {
        // console.log('点击自动组卷按钮报错')
        console.log(err)
      })
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
</style>
