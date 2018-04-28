<template>
<div class="add-frame">
    <p class="default-layer-title">添加用户</p>
    <p class="add-frame-curr">当前模型:{{currUser}}</p>
    <div class="frame-container" style="border-right: 1px solid #ccc;">
      <p class="frame-container-title">选择用户</p>
      <p class="frame-btn-group">
        <Button type="info" @click="userlist">用户</Button>
        <Button type="info" @click="grouplist">用户组</Button>
        <Input v-if="type == 1" v-model="searchMsg" icon="search" placeholder="搜索用户名/用户组名" style="width: 180px;margin:10px 0" @on-enter="userlist" @on-click="userlist"></Input>
        <Input v-if="type == 0" v-model="searchMsg" icon="search" placeholder="搜索用户名/用户组名" style="width: 180px;margin:10px 0" @on-enter="grouplist" @on-click="grouplist"></Input>
        <div class="frame-board" v-if="type == 1">
            <ul>
                <li class="data-items" v-for="(item, index) in userArr">
                    <span class="fa" :class="{'fa-plus':item.active,'fa-minus':!item.active}" @click="changeItem(item)"></span>
                    <span class="fa fa-folder-open"></span>{{item.departmentName}}
                    <ul v-if="item.active">
                        <li v-for="(v,i) in item.leftUsers">
                            <Checkbox v-model="v.active" @on-change="checkSelect(v, i, 'user')">{{v.userName}}</Checkbox>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="frame-board" v-if="type == 0">
            <ul>
                <li class="data-items" v-for="(item, index) in groupArr">
                    <Checkbox v-model="item.active" @on-change="checkSelect(item, index, 'group')">{{item.groupName}}</Checkbox>
                    <span class="data-num">{{item.groupSize}}人</span>
                </li>
            </ul>
        </div>
      </p>
    </div>
    <div class="frame-container" v-if="type == 1">
      <p class="frame-container-title">已选用户</p>
      <ul class="selected-list">
          <li class="data-items" v-for="item in tempArr">{{item.userName}}</li>
      </ul>
    </div>
        <div class="frame-container" v-if="type == 0">
      <p class="frame-container-title">已选用户组</p>
      <ul class="selected-list">
          <li class="data-items" v-for="item in tempArr">{{item.groupName}}</li>
      </ul>
    </div>
</div>
</template>

<script>
import { dataUser, dataGroup } from './../../../actions/key'
export default {
  data() {
    return {
      currUser:'',
      searchMsg:'',
      userArr:[],
      groupArr:[],
      type:1,
      tempArr:[], //存储临时选中的数据
      recv:{
            assignModel: "",
            smallGroups: [],
            smallUsers: []
        }
    };
  },
  props:['obj'],
  created(){
     this.currUser = this.obj.modelName;
     this.recv.assignModel = this.obj.assignModel;
     this.userlist() 
  },
  watch:{
      tempArr:function(val){
          if(this.type == 1){
              this.recv.smallUsers = [];
              this.recv.smallUsers.push(...val);
          }
          else if(this.type == 0){
              this.recv.smallGroups = [];
              this.recv.smallGroups.push(...val);
          }
          this.$emit('tempdata',this.recv)
      }
  },
  methods: {
      changeItem(item){
          item.active =!item.active;
      },
      userlist(){
          this.type = 1;
          this.tempArr = [];
          dataUser({params:{
              keyword:this.searchMsg,
              assignModel:this.obj.assignModel  
          }},res=>{
              res.data.data.map((v,i)=>{
                  v.active = true;
                  v.leftUsers.map((m,n)=>{
                      m.active = false;
                  })
              })
              this.userArr = res.data.data;
          })
      },
      grouplist(){
          this.type = 0;
          this.tempArr = [];
          dataGroup({params:{
              keyword:this.searchMsg,
              assignModel:this.obj.assignModel
          }},res=>{
              res.data.data.map(v=>{
                  v.active = false;
              })
              this.groupArr = res.data.data;
          })
      },
      //选择左边数据
      checkSelect(item, index, type){
        if(item.active&&!this.tempArr.includes(item)){
            this.tempArr.push(item)
        }
        else if(!item.active){
            this.tempArr.map((v,i)=>{
                if(!v.active){
                    this.tempArr.splice(i,1)
                }
            })
        }
      }
    }
};
</script>

<style lang="less" scoped>
.add-frame{
  height: 530px;
}
.selected-list{
    border: 1px solid #ccc;
    margin: 0 20px;
    border-radius: 5px;
    height: 394px;
    padding: 20px;
}
.data-items{
    margin-bottom: 5px;
    font-size: 14px;
    span{
        margin-right: 10px;
    }
    li{
        margin-left: 26px;
    }
    .data-num{
        color: #2d8cf0;
        font-size: 12px;
    }
}
</style>
