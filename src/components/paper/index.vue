<template>
    <div class="container">
       <div class="choose-area">
          <div class="head"><div>选择题</div><span>编辑</span></div>
          <div v-if="noContent" class="no-content">您还没有设置选择题</div>
         <div class="choose">

         </div>
       </div>
      <div class="fill-area">
        <div class="head"><div>填空题</div><span>编辑</span></div>
        <div v-if="noContent" class="no-content">您还没有设置选择题</div>
      </div>
      <div class="judge-area">
        <div class="head"><div>判断题</div><span>编辑</span></div>
        <div v-if="noContent" class="no-content">您还没有设置选择题</div>
      </div>
      <div class="answer-area">
        <div class="head"><div>简答题</div><span>编辑</span></div>
        <div v-if="noContent" class="no-content">您还没有设置选择题</div>
      </div>
      <div class="program-area">
        <div class="head"><div>编程题</div><span>编辑</span></div>
        <div v-if="noContent" class="no-content">您还没有设置选择题</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'paper',
  data() {
    return {
      noContent: true
    }
  }
}
</script>

<style scoped>
.container{
  width:100%;
  padding-top:10px;
}
.choose-area,.fill-area,.judge-area,.answer-area,.program-area{
  border-bottom:1px solid #CCCCFF;
}
.choose-area:hover,.fill-area:hover,.judge-area:hover,.answer-area:hover,.program-area:hover{
  border:2px solid #42b983;
}
.head div{
  display:inline-block;
  font-size:18px;
  font-weight:600;
  color:#42b983;
  margin:20px;
  width:90%;
}
  .head span{
    font-size:12px;
    text-align:right;
    color:#666666;
    vertical-align: middle;
    padding-bottom:10px;
  }
.no-content{
  color:#CCCCFF;
  text-align:center;
  padding-bottom:20px;
}
</style>
