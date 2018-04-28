<template>
<div class="add-frame">
    <p class="default-layer-title">添加用户</p>
    <p class="add-frame-curr">当前用户:{{currUser}}</p>
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
    <div class="frame-container">
      <p class="frame-container-title">{{rightTitle}}</p>
      <p class="frame-result-board" v-if="type == 1">
        <span v-for="item in tempArr">{{item.userName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </p>
      <p class="frame-result-board" v-if="type == 0">
        <span v-for="item in tempArr">{{item.groupName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </p>
      <div>
        <p class="default-p" style="font-weight:bold">配置权限：</p>
          <p class="default-p">
            <Checkbox v-model="check[0]">查看</Checkbox>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Checkbox v-model="check[1]">导出</Checkbox>
          </p>
          <p class="default-p">
            <Checkbox v-model="check[2]">编辑</Checkbox>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Checkbox v-model="check[3]">删除</Checkbox>
        </p>
      </div>
    </div>
</div>
</template>

<script>
import { boardUserShow, boardGroupShow } from "./../../../actions/key";
export default {
  data() {
    return {
      currUser:'小新用户',
      value4:'',
      type:1,
      userArr:[],
      groupArr:[],
      searchMsg:'',
      rightTitle:'已选用户',
      recv:[],
      check:[false,false,false,false],
      tempArr:[],
    };
  },
  props:['board'],
  created(){
    this.currUser = this.board.boardName;
    this.recv.boardID = this.board.boardID;
    this.userlist();
      // boardUserShow
  },
    watch:{
      tempArr:function(val){
        this.$emit('tempboard',val)
      },
      check:function(val){
        let data = [1,2,3,4];
        val[0] == true?data[0] ='SELECT':'';
        val[1] == true?data[1] ='EXPORT':'';
        val[2] == true?data[2] ='UPDATE':'';
        val[3] == true?data[3] ='DELETE':'';
        data = data.filter(data=>data.length>5)
        this.$emit('tempselected',data)
      }
  },
  methods: {
    userlist(){
      this.type = 1;
      this.rightTitle = '已选用户';
      this.tempArr = [];
      boardUserShow({params:{
          keyword:this.searchMsg,
          boardID:this.board.boardID  
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
        this.rightTitle = '已选用户组';
        this.tempArr = [];
        boardGroupShow({params:{
            keyword:this.searchMsg,
            boardID:this.board.boardID
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
        this.onceObj = {};
        this.tempArr.push(item);
        this.onceObj = item;
      }
      else if(!item.active){
          this.tempArr.map((v,i)=>{
              if(!v.active){
                  this.tempArr.splice(i,1)
              }
          })
      }
    },
    changeItem(item){
        item.active =!item.active;
    },
  }
};
</script>

<style lang="less" scoped>
.add-frame{
  height: 530px;
  position: relative;
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
    >span{
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
.frame-result-board{
  padding: 5px;
  >span{
    float: left;
  }
}
.frame-layer{
  position: absolute;
  bottom: 70px;
  right: 80px;
}
</style>
