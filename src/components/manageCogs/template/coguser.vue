<template>
  <Row>
    <Col span="20">
        <div class="content-title" style="margin-top:30px;">
          <Button type="primary" @click="adduser">添加用户</Button>  
          <Input v-model="value4" icon="search" placeholder="输入用户名或部门角色进行搜索" style="width: 260px;float:right" @on-enter="listdata" @on-click="listdata"></Input>
        </div>
        <div style="margin-left:6.5%">
          <Col span="22">
            <Table border ref="selection" :columns="tHeaders" :data="data1"></Table>
            <p class="table-page"> 
              <Page :total='pageTotal' show-elevator size="small" :current="currpage" @on-change="listdata"></Page>  
            </p> 
          </Col>
        </div>
    </Col>
  </Row>
</template>

<script>
import imenu from "./../leftnav/leftmenu"
import newmanager from './newmanager'
import { userManage } from "./../../../data/cogdata"
import { userListData, saveuser, updateuser } from './../../../actions/req'
export default {
  data() {
    return {
      pageTotal:100,
      currpage:1,
      pageSize:10,
      infoMsg:{},
      value4:'',
      //列表查询传参
      searchObj:{
        keyword:"",
        currentPage: 1,
        pageSize: 10      
      },
      data1:[],
      recv:{}
    };
  },
  components:{
    imenu
  },
  created() {
    this.tHeaders = userManage;
    this.listdata(1);

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
                  style:{
                    cursor: 'pointer'
                  },
                  on: {
                      click: () => {
                        _this.$Modal.confirm({
                          render: (h) => {
                              return h(newmanager,{
                                props:{
                                  obj:{
                                    datas:params.row
                                  }
                                },
                                on:{
                                  currobj:(val)=>{
                                    this.recv = val;
                                  }
                                }
                              })
                          },
                          width:580,
                          onOk:()=>{
                            updateuser((this.recv),(res)=>{
                                 _this.$Message.success(res.data.desc);
                                 _this.listdata(_this.searchObj.currentPage)
                            })
                          }
                      })
                    }
                  }
              }, '编辑')
          ]);
        }
      }
    })
  },
  methods: {
    adduser(){
      this.$Modal.confirm({
          render: (h) => {
              return h(newmanager,{
                on:{
                  currobj:(val)=>{
                    this.recv = val;
                  }
                }
              })
          },
          width:580,
          onOk:()=>{
            let _this = this;
            saveuser((_this.recv),(res)=>{
              _this.$Message.success(res.data.desc);
              _this.listdata(_this.searchObj.currentPage)
            })
          }
      })
    },
    listdata(curpage){
      if(typeof(curpage) == 'number'){
        this.searchObj.currentPage = curpage;
      }
      this.searchObj.keyword = this.value4;
      userListData(this.searchObj,(res) => {
        // userName email role
        res.data.data.listData.map(v=>{
          if(v.adminSourceEntities){
            v.adminSourceEntities.map(t=>{
              v.role = '';
              v.role += t.roleName+'、';
              v.role = v.role.toString().substring(0,v.role.length - 1);
            })
          }
        })
        this.data1 = res.data.data.listData;  
        this.pageTotal = res.data.data.totalCount;   
      })
    }
  }
};
</script>

<style scoped>

</style>
