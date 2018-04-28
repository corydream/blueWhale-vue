<template>
  <div class="p-wrapper">
    <p class="default-layer-title">{{name}}</p>  
    <Col span="22">
      <Table border ref="selection" :columns="tHeaders" :data="data1"></Table>
      <p class="table-page"> 
        <Page :total='pageTotal' show-elevator size="small" :current="currpage" @on-change="listdata"></Page>  
      </p> 
    </Col>
  </div>
</template>

<script>
import { groupIntoUser } from "./../../../actions/key";
import { dataGroupIntoUser } from "./../../../data/cogdata";
export default {
  data() {
    return {
      name:"",
      tHeaders:[],
      data1:[],
      pageTotal:100,
      currpage:1,
      pageSize:5,
      searchObj:{
        currentPage: 1,
        pageSize: 5      
      },
    };
  },
  props:['obj'],
  created() {
    this.tHeaders = dataGroupIntoUser;
    this.name = this.obj.detailName;
    console.log(this.obj.relationID)
    this.listdata(1)
  },
  methods: {
    listdata(curpage){
      if(typeof(curpage) == 'number'){
        this.searchObj.currentPage = curpage;
        // this.searchObj.groupID = this.obj.groupID?this.obj.groupID:this.obj.relationID
      }
      groupIntoUser(this.searchObj,(res) => {
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
<style>
.p-wrapper{
    font-size: 14px;
    height: 410px;
}
</style>
