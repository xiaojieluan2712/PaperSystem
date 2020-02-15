<template>
  <div class="container">
    <el-collapse accordion v-model="activeName" style="width:100%;">
      <el-collapse-item name="1">
        <template slot="title">个人信息</template>
        <div>
          <el-button v-show="showEdit" class="edit" size="small" @click="handleEdit">编辑</el-button>
          <el-button type="primary" v-show="showSave" class="save" size="small" @click="handleSave"
          style="color:#FFFFFF">保存</el-button>
          <label class="label">工号：</label><el-input class="input-area" v-model="userName" :disabled="isDisabled" placeholder="请输入内容"></el-input>
          <label class="label">姓名：</label><el-input class="input-area" v-model="relName" :disabled="isDisabled" placeholder="请输入内容"></el-input>
          <label class="label">性别：</label><el-input class="input-area" v-model="sex" :disabled="isDisabled" placeholder="请输入内容"></el-input><br>
          <label class="label">联系方式：</label><el-input class="input-area" v-model="phone" :disabled="isDisabled" placeholder="请输入内容"></el-input>
          <label class="label">邮箱：</label><el-input class="input-area" v-model="mail" :disabled="isDisabled" placeholder="请输入内容"></el-input>
          <label class="label">专业：</label><el-input class="input-area" v-model="profession" :disabled="isDisabled" placeholder="请输入内容"></el-input><br>
          <label class="label">担任职务：</label><el-input class="input-area" v-model="duty" :disabled="isDisabled" placeholder="请输入内容"></el-input>
          <label class="label">所在校区：</label><el-input class="input-area" v-model="area" :disabled="isDisabled" placeholder="请输入内容"></el-input>
          <!--<label class="label">角色：</label><el-input class="input-area" v-model="role" :disabled="isDisabled" placeholder="请输入内容"></el-input>-->
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">备注</template>
        <div>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="remark" :disabled="remarkDisabled" style="margin-bottom:20px;">
          </el-input>
          <el-button v-show="showEdit" class="edit" size="small" @click="handleEditRemark">编辑</el-button>
          <el-button type="primary" v-show="showSave" class="save" size="small" @click="handleSaveRemark"
                     style="color:#FFFFFF">保存</el-button>
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
      userInfo: {},
      isDisabled: true,
      showEdit: true,
      showSave: false,
      remarkDisabled: true
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
  },
  methods: {
    handleEdit() {
      this.isDisabled = false
      this.showEdit = false
      this.showSave = true
    },
    handleEditRemark() {
      this.remarkDisabled = false
      this.showSave = true
      this.showEdit = false
    },
    handleSave() {
      this.showEdit = true
      this.isDisabled = true
      this.showSave = false
      const user = {
        userName: this.userName,
        relName: this.relName,
        sex: this.sex,
        phone: this.phone,
        mail: this.mail,
        profession: this.profession,
        duty: this.duty,
        area: this.area,
        remark: this.remark
      }
      this.$store.dispatch('changeUserInfo', user).then(() => {
        alert('修改成功')
      }).catch(error => {
        console.log(error)
        alert('修改失败')
      })
    },
    handleSaveRemark() {
      // 修改remark
      this.remarkDisabled = true
      this.showSave = false
      this.showEdit = true
      console.log(this.remark)
      const remarkMsg = this.remark
      this.$store.dispatch('changeRemark', remarkMsg).then(() => {
        console.log(this.remark)
        alert('修改成功')
      }).catch(error => {
        alert('修改失败')
        console.log(error)
      })
    }
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
  .edit,.save{
    float:right;
    margin-right:30px;
    color:#666666;
    margin-bottom: 10px;
  }
</style>
