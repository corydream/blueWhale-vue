<template>
  <Row>
    <Col span="6">
      <imenu class="menu-wrapper" :child-msg="$route.name"></imenu>
    </Col>
    <Col span="16">
        <div class="content-title">
          <p class="menu-title">
            {{infoMsg.groupName}}
            <span class="menu-icon" @click="editGroup"><i class="fa fa-edit"></i></span>
            <span class="menu-icon" @click="delGroup"><i class="fa fa-trash"></i></span>
          </p>
          <p class="menu-desc">{{infoMsg.description}}</p>
          <p class="menu-desc">
            <span>创建时间：{{infoMsg.createDate}}</span>
            <span>创建人：{{infoMsg.createUser}}</span>
          </p>
          <p class="content-btn">
            <Button type="primary" @click="adduser">添加用户</Button>
            <Button type="error" @click="remove('all')">移出用户组</Button>  
          </p>
        </div>
      <Table border ref="selection" :columns="tHeaders" :data="data1" @on-selection-change="checkAll"></Table>    
    </Col>
  </Row>
</template>

<script>
import { groupUserdel, adduserToGroup, updateuserGroup, delgroup } from "./../../../actions/req";
import imenu from "./../leftnav/leftmenu";
import newgroup from './newgroup';
import bus from "./../../../config/bus";
import { userGroupManage } from "./../../../data/cogdata";
import setgroup from './setgroup';
export default {
  data() {
    return {
      infoMsg:{},
      data1: [],
      deluserObj:{},
      delsucc:false,
      recv:{
        users:[]
      },
      tempArr:[], //存放临时选中的数据
    };
  },
  components:{
    imenu
  },
  created() {
    bus.$on("listmsg1", data => {
      this.infoMsg = data;
      this.data1 = data.users;
    });
    this.tHeaders = userGroupManage;
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
                        _this.remove(params.index)
                      }
                  }
              }, 'Delete')
          ]);
        }
      }
    })
  },
  methods: {
    checkAll(selection){
      this.tempArr = selection;
    },
    // 新增用户
    adduser(){
      this.$Modal.confirm({
          width: 560,
          render: (h) => {
              return h(newgroup,{
                props:{
                  obj:this.infoMsg
                },
                on:{
                   data2:(val)=>{
                     this.recv.users = val;
                   }
                }
              })
          },
          onOk:()=>{
            adduserToGroup({
              group:{
                groupID:this.infoMsg.groupID,
                groupName:this.infoMsg.groupName
              },
              users:this.recv.users
            },res=>{
              this.$Message.success(res.data.desc)
              this.data1 = res.data.data;
            })
          },
      })
    },
    // 删除用户
    remove(index){
      this.deluserObj = {
        group:{
          groupID:this.infoMsg.groupID,
          groupName:this.infoMsg.groupName
        }
      }
      if(typeof index == 'number'){
        this.delsucc = false;
        this.data1.map((v,i)=>{
          if(index == i){
            this.deluserObj.users = [];
            this.deluserObj.users.push(v);
          }
        })
      }
      else{
        this.deluserObj.users = [];
        this.deluserObj.users.push(...this.tempArr);
      }
      groupUserdel((this.deluserObj),res=>{
          this.$Message.success(res.data.desc);
          this.data1 = res.data.data;
      })
    },
    // 编辑用户组
    editGroup(){
      this.$Modal.confirm({
        width: 560,
        render: (h) => {
          return h(setgroup, {
            props: {
              obj:this.infoMsg
            },
            on: {
              value1: val => {
                this.infoMsg.groupName = val;
              },
              value2: val => {
                this.infoMsg.description = val;
              }
            }
          });
        },
        onOk: () => {
          updateuserGroup({
            groupName:this.infoMsg.groupName,
            descript: this.infoMsg.description,
            groupID:this.infoMsg.groupID
          }, res => {
              this.$Message.success(res.data.desc);
          });
        }
      });
    },
    // 删除用户组
    delGroup(){
      delgroup({
        group:{
          groupID: this.infoMsg.groupID,
          groupName:this.infoMsg.groupName
        }
      },res=>{
        this.$Message.success(res.data.desc)
        bus.$emit('delStatus',true)
      })
    }
  }
};
</script>

<style scoped>
.menu-icon{
  margin-left:20px;
}
</style>
