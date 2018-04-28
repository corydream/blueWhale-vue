<template>
  <div>
    <p class="menu-title" v-if="childMsg=='cogBoard'">数据看板</p>
    <p class="menu-title" v-if="childMsg=='cogData'">数据模型</p>
    <p class="menu-title" v-if="childMsg=='cogroup'">用户组</p>
    <Input v-model="searchStr" icon="ios-search" placeholder="搜索" style="width: 240px" @on-enter="refreshList" @on-click="refreshList"></Input>
    <ul v-if="childMsg=='cogBoard'" class="board-ul">
      <li class="board-list" v-for="(item, index) in listdata">
        <span @click="toggleArrow(item)">{{item.folderName}}</span>
        <i class="fa fa-sort-up" :class="{'sort-rotated':item.active,'sort-rotate':!item.active}"></i>
        <ul v-if="item.active&&item.innerFolder">
          <li class="inner-item inner-hover" v-for="v in item.innerFolder.smallBoards" @click="selectBoard(v)">
            <span class="iconfont icon-accountnum inner-icon"></span>
            <span class="inner-name" >{{v.boardName}}</span>
          </li>
          <li class="inner-item" v-for="t in item.innerFolder.folderEntitys">
            <span class="iconfont icon-folder inner-icon"></span>
            <span class="inner-name" @click="toggleInnerArrow(t)">{{t.folderName}}</span>  
            <!-- <i class="fa fa-sort-up" :class="{'sort-rotated':t.arrow,'sort-rotate':!t.arrow}"></i> -->
            <i class="fa fa-sort-up sort-rotated"></i>
            <!-- {{t.arrow}} -->
            <ul>
              <li class="inner-board inner-hover" v-for="t_inner in t.boards" @click="selectBoard(t_inner)">
                <span class="iconfont icon-accountnum inner-icon"></span>
                <span class="inner-name" >{{t_inner.boardName}}</span>  
              </li> 
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <ul v-if="childMsg=='cogData'">
      <li class="item-list" v-for="(item, index) in listdata" @click="switchMsg(item, index)" :class="{active: item.active}">{{item.modelName}}</li>
    </ul>
    <ul v-if="childMsg=='cogroup'">
      <li class="item-list" v-for="(item, index) in listdata" @click="switchMsg(item, index)" :class="{active: item.active}">{{item.groupName}}</li>
    </ul>
    <p v-if="childMsg=='cogroup'" class="margin-top:10px">
      <Button type="primary" @click="newuser">新建用户组</Button>
    </p>
  </div>
</template>
<script>
import bus from "./../../../config/bus";
import setgroup from "./../template/setgroup";
import { grouplist, addgroup } from "./../../../actions/req";
import { dataModel, boardList } from './../../../actions/key';
export default {
  data() {
    return {
      searchStr: "",
      listdata: [],
      groupInfo: {
        groupName: "",
        descript: "",
        groupID: -1
      },
    };
  },
  props: ["childMsg"],
  created() {
    this.refreshList();    
    bus.$on('delStatus',data=>{
      if(data){
        this.refreshList();
      }
    })
  },
  mounted() {},
  methods: {
    refreshList(){
      this.listdata = [];
      if(this.childMsg == 'cogroup'){
        grouplist({params:{keyword:this.searchStr}}, res => {
          this.cb(res)
        });
      }
      else if(this.childMsg == 'cogData'){
        dataModel({params:{keyword:this.searchStr}},res=>{
          this.cb(res)
        })
      }
      else if(this.childMsg == 'cogBoard'){
          boardList({params:{keyword:this.searchStr}},res=>{
            this.cb(res)
          })
      }
    },
    cb(res){
      if(res.data.data.length == 0){
        return false;
      }
        res.data.data.map(v=>{
          v.active = false;
          v.isData = false;
        })
        this.listdata = res.data.data;
        this.childMsg == 'cogBoard'?this.listdata[0].active = false:this.listdata[0].active = true;
        this.recv(res.data.data[0])
    },
    recv(item){
        if(this.childMsg == 'cogroup'){
          bus.$emit("listmsg1", item);
        }
        else if(this.childMsg == 'cogData'){
          bus.$emit("listmsg2", item);
        }
    },
    switchMsg(item, index) { 
      this.listdata.map((v,i)=>{
        if(index == i){
          v.active = true;
        }
        else{
          v.active = false;
        }
      })
      this.recv(item)
    },
    newuser() {
      this.$Modal.confirm({
        width: 560,
        render: (h) => {
          return h(setgroup, {
            props: {},
            on: {
              value1: val => {
                this.groupInfo.groupName = val;
              },
              value2: val => {
                this.groupInfo.descript = val;
              }
            }
          });
        },
        onOk: () => {
          addgroup((this.groupInfo), res => {
              this.listdata = [];
              this.$Message.success(res.data.desc);
              grouplist({}, res => {
                this.listdata = res.data.data;
              });
          });
        }
      });
    },
    toggleArrow(item){
      if(item.isData){
            item.active =!item.active;
      }
      if(!item.innerFolder){
        boardList({params:{keyword:this.searchStr,folderID:item.folderID}},res=>{
            item.innerFolder = res.data.data[0];
            if(!item.innerFolder.hasOwnProperty('folderEntitys')||!item.innerFolder.hasOwnProperty('smallBoards')){
              this.$Message.error('选择的目录为空');
              return false;
            }
            item.active =!item.active;
            item.isData = true;
        })
      }
    },
    // 内层列表
    toggleInnerArrow(t){
      t.arrow = !t.arrow;
    },
    selectBoard(v){
      bus.$emit('recvBoard',v);      
    }
  }
};
</script>
<style lang="less" scoped>
.board-ul{
  padding: 20px;
  font-size: 12px;
  text-align: left;
  .board-list{
    cursor: pointer;
    line-height: 40px;
    >span{
      float: left;
      height: 40px;
      font-weight: bold;
      padding-left: 20px;
      width: 220px;
      line-height: 40px;
      text-align: left;
    }
    .inner-item{
      padding-left: 20px;
      color: #373d41;
      width: 230px;
    }
    .inner-hover:hover{
      background: #f4f4f4;
      border-radius: 20px;
    }
    .inner-name{
      margin: 0 10px;
      width: 155px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .inner-icon{
      vertical-align: -2px;
      float: left;
    }
    .inner-board{
      padding-left: 20px;
      width: 200px;
      height: 40px;
      .inner-name{
        color: #707375;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        float: left;
      }
    }
  }
}

</style>
