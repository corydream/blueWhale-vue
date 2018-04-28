<template>
  <div class="outer-border" v-if="boardata.boardID">  
    <p class="create-table">
      <!-- <span @click="shareBoard(boardata.boardID)" style="margin-right: 15px;">
          <i class="fa fa-share-alt"></i>
          <i style="font-style:normal">分享看板</i>
      </span> -->
      <span class="drag" @click="editBoard(boardata.boardID)">
        <i class="firstboard" v-if="!datas.showdrag">编辑看板布局</i>
        <i v-if="datas.showdrag">保存看板布局</i>
      </span>
      <Tooltip placement="bottom">
          <i class="drag-info fa fa-question-circle-o"></i>
          <div slot="content">
            <p>点击编辑看板布局，可拖拉伸当</p>
            <p>前数据看板任意图表大小与布局</p>
          </div>
      </Tooltip>
      <span @click="createTable(boardata.boardID)"><i class="fa fa-plus"></i>创建新图表</span>
      </p>
    <section>
      <div class="count-table">
         <showReport :message="boardata" ></showReport>
      </div>
    </section>
       <Modal
        v-model="modal1"
        title="分享链接"
        @on-ok="ok" okText='复制'
        @on-cancel="cancel">
        <Input v-model="infoText" id="info-text"></Input>
    </Modal>
  </div>
</template>

<script>

import showReport from './showReport';
import createGraph from './createGraph';
import datas from './../../../config/datas';
import bus from './../../../config/bus';
import { pubMethod } from './../../../config/public';
export default {
  data() {
    return {
        datas: datas.datas,
        userInfo: '',
        boardata: [], 
        addPermission: false,
        modal1:false,
        infoText:''
    }
  },
  created() {
    bus.$on('boardList', list =>{
        // this.titleDatas = list;
        this.boardata = list;
    });  
    
  },
  mounted() {

  },
  watch:{
    'datas.showdrag':function(){
       this.datas.boardDrag = false;
    }
  },
  components:{
    createGraph,
    showReport
  },
  methods: {
    // 分享看板
    shareBoard(id){
        let _this = this;
        $.ajax({
          type : "post",
          url :_this.$keyapi+"/share/url/create",
          xhrFields: {
              withCredentials: true
          },
          data:{
            type:1,
            id: id
          },
          dataType:"json",
          success : function(res) {  
              if(res.status == 1){
                _this.modal1 = true;
                _this.infoText = res.data.url;
              }
              else if(data.status == 101){
                  location.href = "https://data.banggood.cn";
              }
              else{
                _this.$Message.error('无权限操作');
              }  
          }
       });
    },
    ok () {
      var txt = $(".ivu-input");
      txt.select();
      document.execCommand("Copy");
    },
    cancel () {
        
    },
     editBoard(id){
        let _this = this;
        $.ajax({
          type : "post",
          url :_this.$keyapi+"/auth/check/add/report",
          xhrFields: {
              withCredentials: true
          },
          data:{
            boardID: id
          },
          dataType:"json",
          success : function(res) {  
              if(res.status == 1){
                _this.datas.showdrag =! _this.datas.showdrag;
              }
              else if(data.status == 101){
                  location.href = "https://data.banggood.cn";
              }
              else{
                _this.$Message.error('无权限操作');
              }  
          }
       });      
     },
     createTable (id) {
       let _this = this;
       _this.datas.delTarget = false;
        $.ajax({
          type : "post",
          url :_this.$keyapi+"/auth/check/add/report",
          xhrFields: {
              withCredentials: true
          },
          data:{
            boardID: id
          },
          dataType:"json",
          success : function(res) {  
              if(res.status == 1){
                _this.boardata.backPage = false;
                _this.boardata.echoPage = false;
                _this.boardata.chartType = 0;
                _this.$layer.iframe({
                    content: {
                        content: createGraph, //传递的组件对象
                        parent: _this,//当前的vue对象
                        data:_this.boardata//props
                    },
                    area:['100%','100%'],
                    title: '自助图表编辑'
                });
                _this.datas.showOuterBorder = true;
              }
              else{
                _this.$Message.error('无权限操作');
              }  
          }
      });

      
     }
  }  
}
</script>
<style lang="less" scoped>
.outer{
  overflow: hidden;
}
.outer-border{
  position: relative;
  overflow: hidden;
  .create-table{
    color: #BCBCBC;
    text-align: right;
    padding: 0 20px;
    cursor: pointer;
    margin: 20px 0;
  }
  .drag{
     margin-right: 5px;
    i{
       font-style: normal;
       color: #4aa5e9;
    }
    .firstboard{
       color: #BCBCBC;
    }    
  }
  .drag-info{
    margin-right: 10px;
    color: #BCBCBC;
  }
}

</style>
