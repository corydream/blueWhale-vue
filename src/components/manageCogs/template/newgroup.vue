<template>
<div class="add-frame">
    <p class="default-layer-title">添加用户</p>
    <div class="group-container">
      <p class="group-container-title">选择用户</p>
      <p style="margin-left:20px;">
        <Input v-model="searchName" icon="search" placeholder="搜索姓名" style="width: 200px;margin:10px 0" @on-enter="listData" @on-click="listData"></Input>
        <ul class="data-list">
          <li class="data-item"><Checkbox v-model="allChecked" @on-change="checkAll">全选</Checkbox></li>
          <li class="data-item" v-for="(item, index) in data1">
            <Checkbox v-model="item.active" @on-change="checkSelect(item, index)">{{item.userName}}</Checkbox>
          </li>
        </ul>
      </p>
    </div>
    <div class="group-container">
      <p class="group-container-title">已选用户</p>
      <ul class="selected-list">
          <li class="data-items" v-for="item in data2">{{item.userName}}</li>
      </ul>
    </div>
</div>
</template>

<script>
import { newuserlist } from "./../../../actions/req";
export default {
  data() {
    return {
      searchName:'',
      data1:[], //当前用户数组
      data2:[], //已选择的用户数组
      allChecked:false,
    };
  },
  created(){
    this.listData()
  },
  props:['obj'],
  watch:{
    'data2':function(val){
      this.$emit('data2',val)
    }
  },
  methods: {
    checkAll(){
      this.data1.map(v=>{
        v.active = false;
      })
      this.data2 = [];
      if(this.allChecked){
         this.data1.map(v=>{
          v.active = true;
        })       
        this.data2.push(...this.data1);
      }
    },
    listData(){
      newuserlist({params:{groupID:this.obj.groupID,userName:this.searchName}},res=>{
        this.data1 = res.data.data.leftUsers;
        this.data1.map(v=>{
          v.active = false;
        })
      })
    },
    checkSelect(item, index){
      if(item.active&&!this.data2.includes(item)){
          this.data2.push(item)
      }
      else if(!item.active){
        this.data2.map((v,i)=>{
            if(v.userID == item.userID){
              this.data2.splice(v,1);
            }
        })
      }
    }
  }
};
</script>

<style scoped>
.add-frame{
  height: 530px;
}
.data-item{
  margin-bottom: 5px;
}
.selected-list{
  overflow: auto;
  height: 370px;
  margin-top: 40px;
}
.data-items{
  padding: 0 30px;
  margin-bottom: 5px;
  font-weight: bold;
}
.data-list{
    height: 380px;
    overflow: auto;
}
</style>
