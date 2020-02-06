<template>
    <div class="container">
      <div class="top-side">
        <catalog :isCustom="isCustom"></catalog>
      </div>
      <div class="bottom">
        <record-list></record-list>
      </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog'
import Paper from '@/components/paper'
import RecordList from '@/components/recordList'
export default {
  name: 'automaticTest',
  components: {
    RecordList,
    Catalog,
    Paper
  },
  data() {
    return {
      isCustom: false
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
