<template>
  <div>
    <Row>
      <Col span="6">
        <imenu class="menu-wrapper" :child-msg="$route.name"></imenu>
      </Col>
      <Col span="17" v-if="infoMsg.boardID">
        <div class="content-title">
          <p class="menu-title">{{infoMsg.boardName}}</p>
          <p class="content-btn">
            <Button type="primary" @click="adduser">添加用户</Button>
            <Button type="error">移除</Button>  
          </p>
        </div>
        <Table border ref="selection" :columns="tHeaders" :data="data1" @on-selection-change="checkAll"></Table>    
      </Col>
    </Row>
  </div>
</template>

<script>
import { userList, saveBoard, updateBoard, delBoardUser } from "./../../../actions/key";
import imenu from "./../leftnav/leftmenu";
import newboard from './newboard';
import setallow from './setPermission';
import showgroup from './showgroup';
import bus from "./../../../config/bus";
import { boardManage } from "./../../../data/cogdata";
export default {
  data() {
    return {
      infoMsg: {},
      tHeaders:[],
      data1: [],
      recv:{},
      selected:[], //接收选择权限的数组
      updateSelected:[], //修改权限回显数组
      deluserObj:{},
      tempArr:[]
    };
  },
  created() {
    bus.$on("recvBoard", data => {
      this.infoMsg = data;
      this.refreshData();
    });
    this.tHeaders = boardManage;
    this.tHeaders.map(v=>{
      if(v.key == 'action'){
        let _this = this;
      v.render = function(h, params){
          return h('div', [
              h('Button', {
                  props: {
                      type: 'primary',
                      size: 'small'
                  },
                  style: {
                      marginRight: '10px',
                      cursor: 'pointer'
                  },
                  on: {
                      click: () => {
                        _this.show(params)
                      }
                  }
              }, '设置'),
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
              }, '移除')
          ]);
        }
      }
      else if(v.key == 'detailName'){
        let _this = this;
        v.render = function(h,params){
          if(params.row.detailName &&params.row.type == '用户组'){
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
            },params.row.detailName)
          }
          else{
            return h('span',params.row.detailName)
          }
        }
      }
    }) 
    // console.log(this.tHeaders)
    // entry('superBanggood@banggood.com', (respose) => {
    //   console.log(respose)
    // })
  },
  components: {
    imenu,
    newboard
  },
  methods: {
    refreshData(){
      userList({boardID:this.infoMsg.boardID},res=>{
        res.data.data.map(v=>{
          v.type == 1?v.type ='用户组':v.type = '用户';
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
          render: (h) => {
              return h(newboard,{
                props:{
                  board:this.infoMsg
                },
                on:{
                  tempboard:res=>{
                    this.recv = res;
                  },
                  tempselected:res=>{
                    this.selected = res;
                  }
                }
              })
          },
          width: 560,
          onOk:()=>{
            this.recv.map(v=>{
              v.datas = this.selected;
              v.boardID = this.infoMsg.boardID
            });
            saveBoard(this.recv,res=>{
              this.refreshData();
            })
          },
      })
    },
    show(item){
      this.$Modal.confirm({
        width: 580,
        render: (h) => {
          return h(setallow, {
              props: {
                obj: item.row
              },
              on: {
                selected:res=>{
                  this.updateSelected = res;
                }
              }
          })
        },
        onOk:()=>{
          let param = {
            boardID:this.infoMsg.boardID,
            boardName:this.infoMsg.boardName,
            datas:this.updateSelected
          }
          if(item.row.type == '用户'){
            param.userID = item.row.relationID,
            param.userName = item.row.detailName
          }
          else if(item.row.type == '用户组'){
            param.groupID = item.row.relationID,
            param.groupName = item.row.detailName       
          }
          updateBoard(param,res=>{
            this.$Message.success(res.data.desc)
            this.refreshData();
          })
        }
      })
    },
    remove(item){
      this.deluserObj = {

      }
      delBoardUser(this.deluserObj,res=>{
        this.$Message.success(res.data.desc);
        this.refreshData()
      })      
    },
    checkAll(selection){
      this.tempArr = selection;
    },
  }
};
</script>

