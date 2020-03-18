<template>
  <div class="container">
    <div v-show="!showDetail">
    <condition @handleSearchQuesList="handleSearchQuesList"></condition>
    <record-list :quesArray="quesArray" @handleDetails="handleDetails"></record-list>
    </div>
    <ques-details v-show="showDetail" :quesObj="quesObj" :validDate="validDate"
                  @handleCancel="handleCancelDetils" @handleSaveEdit="handleSaveEdit"
                  @handleDeleteQues="handleDeleteQues"></ques-details>
  </div>
</template>

<script>
import condition from '@/components/condition'
import RecordList from '@/components/recordList'
import QuesDetails from '@/components/details/details'
import { getTime } from '@/utils/getTime'
export default {
  name: 'dataQuery',
  components: {
    QuesDetails,
    RecordList,
    condition
  },
  data() {
    return {
      quesArray: [],
      showDetail: false,
      quesObj: {},
      validDate: ''
    }
  },
  methods: {
    handleSearchQuesList(data) {
      this.$store.dispatch('searchQuesList', data).then(() => {
        // console.log('handleSearchQuesList------------')
        // console.log('请求发送成功')
        this.quesArray = this.$store.getters.dataQuesArray
      }).catch(error => {
        console.log(error)
      })
    },
    handleDetails(data) {
      console.log(data)
      this.$store.dispatch('getQuesDetails', data).then(() => {
        this.showDetail = true
        this.quesObj = this.$store.getters.quesObj
        this.validDate = getTime(new Date(this.quesObj.date))
      }).catch(error => {
        console.log(error)
      })
    },
    handleCancelDetils() {
      this.showDetail = false
    },
    handleSaveEdit(data) {
      // console.log(data)
      this.$store.dispatch('editQues', data).then(() => {
        alert('修改成功')
        this.showDetail = false
        // this.reload()
        // this.$router.replace('/testEntry')
        location.reload()
      }).catch(error => {
        alert('修改失败')
        console.log(error)
      })
    },
    handleDeleteQues() {
      const quesObj = this.$store.getters.quesObj
      const quesId = quesObj.quesId
      console.log(quesId)
      const data = {
        quesId: quesId
      }
      this.$store.dispatch('deleteQues', data).then(() => {
        alert('删除成功')
        this.showDetail = false
        location.reload()
      }).catch(error => {
        alert('删除失败')
        console.log(error)
      })
    },
    reload() {
      this.showDetail = false
      this.$nextTick(function() {
        this.showDetail = true
      })
    }
  }
}
</script>

<style scoped>
</style>
