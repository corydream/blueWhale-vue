<template>
  <Row>
    <Col span="6">
      <imenu class="menu-wrapper" :child-msg="$route.name"></imenu>
    </Col>
    <Col span="16">
        <div class="content-title">
          <p class="menu-title">{{infoMsg.name}}</p>
          <p class="content-btn">
            <Button type="primary" @click="adduser">添加用户</Button>
            <Button type="error" @click="remove">移除</Button>  
          </p>
        </div>
      <Table border ref="selection" :columns="tHeaders" :data="data1" @on-selection-change="checkAll"></Table>    
    </Col>
  </Row>
</template>

<script>
import { dataTable, dataAdd, dataDel } from "./../../../actions/key";
import imenu from "./../leftnav/leftmenu";
import newdata from './newdata';
import showgroup from './showgroup';
import bus from "./../../../config/bus";
import { dataManage } from "./../../../data/cogdata";
export default {
  data() {
    return {
      infoMsg:{},
      data1: [],
      recv:{},
      deluserObj:{},
      tempArr:[]
      // tempUsers:[], //存储临时用户列表
      // tempGroup:[]  //存储临时用户组列表
    };
  },
  components:{
    imenu
  },
  created() {
    bus.$on("listmsg2", data => {
      this.infoMsg = data;
      this.refreshList();
    });
    this.tHeaders = dataManage;
    this.tHeaders.map(v=>{
      if(v.key == 'action'){
        let _this = this;
      v.render = function(h, params){
          return h('div', [
              h('Button', {
                  props: {
                      type: 'error',
                      size: 'small'
                  },
                  style:{
                    cursor: 'pointer'
                  },
                  on: {
                      click: () => {
                        _this.remove(params)
                      }
                  }
              }, 'Delete')
          ]);
        }
      }
      else if(v.key == 'name'){
        let _this = this;
        v.render = function(h,params){
          if(params.row.name &&params.row.type == '用户组'){
            return h('span',{
              style:{
                cursor: 'pointer',
                color:'#2d8cf0'
              },
              on:{
                  click:()=>{
                    _this.groupShow(params)
                  }
              }
            },params.row.name)
          }
          else{
            return h('span',params.row.name)
          }
        }
      }
    })
  },
  methods: {
    checkAll(selection){
      this.tempArr = selection;
    },
    refreshList(){
      dataTable({params:{assignModel:this.infoMsg.assignModel}},res=>{
         res.data.data.map(v=>{
           v.type == 0? v.type = '用户组':v.type = '用户' 
         })
         this.data1 = res.data.data;
      })
    },
    groupShow(item){
      this.$Modal.confirm({
        render: (h) => {
            return h(showgroup,{
              props:{
                obj:item.row
              }
            })
        },
        width: 760,
      })
    },
    adduser(){
      this.$Modal.confirm({
          width: 560,
          render: (h) => {
              return h(newdata,{
                props:{
                  obj:this.infoMsg
                },
                on:{
                  tempdata:(val)=>{
                      this.recv = val;
                  }
                }
              })
          },
          onOk:()=>{
            dataAdd(this.recv,res=>{
              this.$Message.success(res.data.desc)
              this.refreshList()
            })
          },
      })
    },
    remove(item){
      this.deluserObj = {
        assignModel:this.infoMsg.assignModel,
        smallGroups:[],
        smallUsers:[]
      }
      if(typeof item.index == 'number'){
        this.data1.map((v,i)=>{
          if(item.index == i){
            if(item.row.type == '用户'){
              this.deluserObj.smallUsers.push({
                userID:v.userID,
                userName:v.name
              });
            }
            else if(item.row.type == '用户组'){
              this.deluserObj.smallGroups.push({
                groupID:v.groupID,
                groupName:v.name
              })
            }
          }
        })
      }
      else{
        this.tempArr.map((v,i)=>{
            if(v.type == '用户'){
               this.deluserObj.smallUsers.push({
                  userID:v.userID,
                  userName:v.name
               })
            }
            else if(v.type == '用户组'){
              this.deluserObj.smallGroups.push({
                  groupID:v.groupID,
                  groupName:v.name
               })
            }
        })
      }
      dataDel(this.deluserObj,res=>{
        this.$Message.success(res.data.desc);
        this.refreshList()
      })
    }
  }
};
</script>

<style scoped>

</style>
