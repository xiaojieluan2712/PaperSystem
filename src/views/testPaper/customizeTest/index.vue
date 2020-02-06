<template>
    <div class="container">
      <div class="left-side">
        <catalog :isCustom="isCustom"></catalog>
      </div>
      <div class="right">
        <paper></paper>
      </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog'
import paper from '@/components/paper'
export default {
  name: 'customizeTest',
  components: {
    Catalog,
    paper
  },
  data() {
    return {
      isCustom: true // 标志自定义组卷
    }
  }
}
</script>

<style scoped>
.container{
  padding: 10px;
}
.left-side{
  width:25%;
  float:left;
}
  .right{
    width:70%;
    float:left;
  }
</style>
