<template>
  <div class="p-wrapper">
    <p class="default-layer-title">新建/编辑用户组</p>  
    <Col span="20">
        <p class="manage-item">姓名：
            <Input v-model="currUserName" placeholder="输入用户姓名" style="width: 280px"></Input>
        </p>
        <p class="manage-item">邮箱：
            <Input v-model="currEmail" placeholder="输入用户邮箱" style="width: 280px"></Input>
        </p>
        <p class="manage-item" v-if="isSuperManage">部门角色：
            <span style="color:rgb(229, 28, 35)">（超级管理员拥有所有部门权限）</span>
        </p>
        <p class="manage-item" v-if="isSuperManage">是否超级管理员：
            <RadioGroup v-model="disabledGroup">
                <Radio label="true">是</Radio>
                <Radio label="false">否</Radio>
            </RadioGroup>
        </p>
        <p class="manage-item dep-manage" v-if="disabledGroup == 'false'">
            <ul>
                <li class="dep-item" v-for="(item,index) in adminSourceEntities">
                    <Select v-model="item.departmentName" style="width:150px" placeholder="选择部门(可直接搜索)" filterable @on-change="departSelect(item)">
                        <Option v-for="item in departmentList" :value="item.value" :key="item.value" :disabled="item.flag">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="item.admin" style="width:150px" placeholder="选择角色">
                        <Option v-for="item in roleArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <span class="fa fa-minus" style="margin-left:15px;color:#35a1f2" @click="minusRole(item,index)"></span>
                </li>
            </ul>
            <span class="manage-btn" @click="addRole"><i class="fa fa-plus"></i>添加部门角色</span>
        </p>
    </Col>
  </div>
</template>

<script>
import store from "./../../../store/index";
import { departmentListData } from "./../../../actions/req";
export default {
  data() {
    return {
      currUserName: "",
      currEmail: "",
      isSuperManage: true,
      disabledGroup: "false",
      roleArr: [
        {
          value: 0,
          label: "普通成员"
        },
        {
          value: 1,
          label: "管理员"
        }
      ],
      adminSourceEntities: [],
      departmentList: [],
      currObj: {},
      isDepart: true
    };
  },
  created() {
    store.state.isManage == 3
      ? (this.isSuperManage = true)
      : (this.isSuperManage = false);
    departmentListData({}, response => {
      let _this = this;
      this.departmentList = [];
      response.data.data.map(v => {
        this.departmentList.push({
          value: v.departmentName,
          label: v.departmentName,
          id: v.departmentID,
          flag:false
        });
      });
    });
    if (this.obj) {
      this.currUserName = this.obj.datas.userName;
      this.obj.datas.superAdmin == true
        ? (this.disabledGroup = "true")
        : (this.disabledGroup = "false");
      this.currEmail = this.obj.datas.email;
      this.adminSourceEntities = this.obj.datas.adminSourceEntities?this.obj.datas.adminSourceEntities:[];
    }
    this.currObj = {
      userName: this.currUserName,
      superAdmin: this.disabledGroup === "false" ? false : true,
      email: this.currEmail,
      adminSourceEntities: this.adminSourceEntities
    };
  },
  props: ["obj"],
  watch: {
    currObj: function(val) {
      this.$emit("currobj", this.currObj);
    },
    currUserName: function(val) {
      this.currObj.userName = val;
    },
    currEmail: function(val) {
      this.currObj.email = val;
    },
    disabledGroup: function(val) {
      if (val === "true") {
        this.currObj.superAdmin = true;
      } else if (val === "false") {
        this.currObj.superAdmin = false;
      }
    }
  },
  methods: {
    addRole() {
      if(!this.isDepart){
        this.$Message.error('请先选择部门');
        return false
      }
      this.adminSourceEntities.push({
        admin: "",
        departmentName: "",
        departmentID:''
      });
      this.departmentList.map(v=>{
        this.adminSourceEntities.map(m=>{
          if(v.label == m.departmentName){
             v.flag = true;
          }
        })
      })
      this.isDepart = false;
    },
    minusRole(item,index) {
      this.adminSourceEntities.map((v, i) => {
        if (i == index) {
          this.adminSourceEntities.splice(i, 1);
        }
      });
        this.departmentList.map(v=>{
          if(item.departmentName == v.label){
              v.flag = false;  
          }
      })    
    },
    // 通过数组获取该组id
    departSelect(ev){
      this.isDepart = true;
      this.departmentList.map(v=>{
        this.adminSourceEntities.map(t=>{
          if(v.label == t.departmentName){
              t.departmentID = v.id;
          }
        })
      })
    },
  }
};
</script>

<style scoped>
.p-wrapper {
  height: 500px;
  min-width: 400px;
}
.manage-btn {
  color: #35a1f2;
  cursor: pointer;
  margin: 0 30px;
}
.dep-item {
  margin: 5px 0;
}
.dep-manage {
  height: 240px;
  overflow: auto;
}
</style>
