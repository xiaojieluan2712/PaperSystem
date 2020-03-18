<template>
  <div class="block">
    <div v-for="(item, index) in selectedType.dynamicItem" :key="index">
      <el-cascader
        style="width:50%;margin-top:6px;margin-right:10px;margin-bottom:10px;"
        placeholder="请选择题型和每道题的分值"
        :options="typesList"
        v-model="item.type"
        @change="handleChange">
      </el-cascader>
      <el-button class="el-icon-circle-plus" @click="createItem" :disabled="plusDisabled"></el-button>
      <el-button class="el-icon-remove" @click="deleteItem(item, index)" :disabled="removeDisabled"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['selectedType', 'selectedArray'],
  data() {
    return {
      // selectedType: {
      //   type: [], // 选择一种题型，题数和分值
      //   dynamicItem: [[]] // 整个题型，题数和分值数组
      // },
      // selectedArray: [], // 已经选择了的题型,
      typesList: [
        { value: 10001, label: '选择题', children: this.createQuesNum(), disabled: false },
        { value: 10002, label: '填空题', children: this.createQuesNum(), disabled: false },
        { value: 10003, label: '判断题', children: this.createQuesNum(), disabled: false },
        { value: 10004, label: '简答题', children: this.createQuesNum(), disabled: false },
        { value: 10005, label: '编程题', children: this.createQuesNum(), disabled: false }
      ]
    }
  },
  computed: {
    removeDisabled() {
      const length = this.selectedType.dynamicItem.length
      if (length === 1) {
        return true
      } else {
        return false
      }
    },
    plusDisabled() {
      const length = this.selectedType.dynamicItem.length
      if (length === 5) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    createQuesNum() {
      const array = []
      for (let i = 1; i <= 120; i++) {
        array.push({ value: i, label: i + '题', children: this.createPerScoreList() })
      }
      return array
    },
    createPerScoreList() {
      const array = []
      for (let i = 1; i <= 100; i++) {
        array.push({ value: i, label: '每题' + i + '分' })
      }
      return array
    },
    createItem() {
      const length = this.selectedType.dynamicItem.length
      if (this.selectedType.dynamicItem[length - 1].type === undefined) {
        alert('请选择一种题型！')
      } else if (length === 5) {
        alert('您已经选择了所有题型！')
      } else {
        this.selectedType.dynamicItem.push([])
      }
    },
    deleteItem(item, index) {
      const length = this.selectedType.dynamicItem.length
      if (length === 1) {
        alert('已经不能再删除此项了哦')
      } else {
        // console.log(item)
        const typeId = item.type[0]// 10001
        // console.log(typeId)
        for (let i = 0; i < this.typesList.length; i++) {
          if (this.typesList[i].value === typeId) {
            this.typesList[i].disabled = false
            // console.log(this.typesList)
            break
          }
        }
        this.selectedType.dynamicItem.splice(index, 1)
        this.$emit('handleDelete', item)
      }
    },
    handleChange(item) {
      // console.log(item)
      this.$emit('handleData', item)
      const typeId = item[0] // 10001
      for (let i = 0; i < this.typesList.length; i++) {
        if (this.typesList[i].value === typeId) {
          this.typesList[i].disabled = true
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
