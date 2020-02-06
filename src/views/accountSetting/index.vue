<template>
  <div class="container">
    <el-collapse accordion v-model="activeName" style="width:100%;">
      <el-collapse-item name="1">
        <template slot="title">个人信息</template>
        <div>
          <label class="label">工号：</label><el-input class="input-area" v-model="userName" placeholder="请输入内容"></el-input>
          <label class="label">姓名：</label><el-input class="input-area" v-model="relName" placeholder="请输入内容"></el-input>
          <label class="label">性别：</label><el-input class="input-area" v-model="sex" placeholder="请输入内容"></el-input><br>
          <label class="label">联系方式：</label><el-input class="input-area" v-model="phone" placeholder="请输入内容"></el-input>
          <label class="label">邮箱：</label><el-input class="input-area" v-model="mail" placeholder="请输入内容"></el-input>
          <label class="label">专业：</label><el-input class="input-area" v-model="profession" placeholder="请输入内容"></el-input><br>
          <label class="label">担任职务：</label><el-input class="input-area" v-model="duty" placeholder="请输入内容"></el-input>
          <label class="label">所在校区：</label><el-input class="input-area" v-model="area" placeholder="请输入内容"></el-input>
          <label class="label">角色：</label><el-input class="input-area" v-model="role" placeholder="请输入内容"></el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">备注</template>
        <div>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="remark">
          </el-input>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'accountSetting',
  data() {
    return {
      activeName: '1',
      userName: '',
      relName: '',
      sex: '',
      phone: '',
      mail: '',
      employYear: '',
      profession: '',
      departName: '',
      duty: '',
      area: '',
      role: '',
      remark: '',
      userInfo: {}
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.userInfo
    // console.log(this.userInfo)
    this.userName = this.userInfo.userName
    this.relName = this.userInfo.relName
    this.sex = this.userInfo.sex
    this.phone = this.userInfo.phone
    this.mail = this.userInfo.mail
    this.profession = this.userInfo.profession
    this.duty = this.userInfo.duty
    this.departName = this.userInfo.departName
    this.area = this.userInfo.area
    this.role = this.userInfo.role
    this.remark = this.userInfo.remark
  }
}
</script>

<style scoped>
.container{
  padding:20px;
}
.label{
  width:70px;
  display:inline-block;
  text-align:right
}
.input-area{
  width:20%;
  margin-right:20px;
  margin-top:20px;
}
</style>
