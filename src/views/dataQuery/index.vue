<template>
  <div class="container">
    <condition></condition>
    <record-list></record-list>
  </div>
</template>

<script>
import condition from '@/components/condition'
import RecordList from '@/components/recordList'
export default {
  name: 'dataQuery',
  components: {
    RecordList,
    condition
  },
  data() {
    return {
    }
  },
  methods: {
  },
  watch: {}
}
</script>

<style scoped>
</style>
