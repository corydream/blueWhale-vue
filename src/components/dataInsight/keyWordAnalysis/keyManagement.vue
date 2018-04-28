<template>
  <div class="text-left key-mng-box sign">
  	<div class="key-mng-wrap">
	    <div class="top-nav">
        <Breadcrumb>
          <BreadcrumbItem to="./keywordContain">关键词产品分析</BreadcrumbItem>
          <BreadcrumbItem to="./keywordManage">关键词管理</BreadcrumbItem>
        </Breadcrumb>
	    </div>
	    <div class="key-table">
	    	<Table :columns="tableItem.columsData" :data="tableItem.tableData" :loading="status.loading"></Table>
	    </div>
      <div style="margin-bottom: 30px;margin-top:20px;overflow: hidden">
        <div style="float: right;">
          <el-button-group>
            <el-button type="primary" @click="changePrevPage()"><i class="el-icon-arrow-left"></i>&nbsp;上一页</el-button>
            <el-button type="primary" @click="changeNextPage()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
          <!--选择多少每一页大小-->
          <Select v-model="tableItem.pageBean.pageSize" style="width:100px;" @on-change="changeSize">
            <Option v-for="item in tableItem.pageBean.pageSizes" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <!--跳动多少页-->
          跳至 <Input v-model="tableItem.pageBean.toPage" style="width:80px" number @on-keyup.enter="toWhatPage"></Input>&nbsp;页
        </div>
      </div>
    </div>
    <Modal v-model="status.showDelModel" width="360"  class-name="vertical-center-modal">
      <p slot="header" class="headerText">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div class="textContent">
        <p>是否继续删除（{{ deleteKeyWord }}）关键词</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="status.isDelete" @click="sureModel">删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import commonUtil from "../../../config/insight/commons/insightCommon"
  export default {
    data () {
            return {
              //页面状态记录
              status:{
                loading:false,
                showDelModel:false,
                isDelete:false,//是否删除
                isPage:false,//是否是翻页
              },
              //删除的关键词
            	deleteKeyWord:'',
              //删词的项目
            	deleteIndex:null,
              deleteId:null,
              tableItem:{
            	  columsData:[
                  {
                    title: '关键词',
                    key: 'keyWord',
                    className:"keywordStyle",
                    render: (h, params) => {
                      return h('a', {
                        attrs: {
                          class:"mylinks",
                          href:"javascript:;"
                        },
                        domProps: {
                          innerText: params.row[params.column.key]
                        },
                        on: {
                          click:()=>{
                            this.goKeywordAnalysis(params);
                          }
                        }
                      });
                    }
                  },
                  {
                    title: '添加时间',
                    key: 'addTime'
                  },
                  {
                    title: '类目',
                    key: 'category'
                  },
                  {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                      return h('div', [
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          on: {
                            click: () => {
                              this.remove(params.index,params.row.id)
                            }
                          }
                        }, '删除')
                      ]);
                    }
                  }
                ],
                tableData:[],
                //分页模块
                pageBean:{
                  currentPage: 1,
                  oldPage: 1,
                  pageSize: 10,
                  totalCount: 100,
                  toPage: 1,
                  pageSizes: [
                    {
                      value: 10,
                      label: "10条/页"
                    },
                    {
                      value: 20,
                      label: "20条/页"
                    },
                    {
                      value: 30,
                      label: "30条/页"
                    },
                    {
                      value: 40,
                      label: "40条/页"
                    }
                  ],
                }
              }
            }
        },
    created(){
      this.mockTableData();
    },
    methods:{
      //确认删除
    	sureModel(){
    		this.status.showDelModel=false;
    		this.tableItem.tableData.splice(this.deleteIndex, 1);
    		commonUtil.queryData({
          url:"/crawler/delete",
          queryParams:{
            wtcId:this.deleteId
          },
          callback:(res)=>{
            if(res.status===1){
              this.$notify.success({
                title: 'success',
                message: '删除成功!',
                duration:1500,
                offset: 200
              });
            }else{
              this.$notify.error({
                title: 'fail',
                message: '删除失败!',
                duration:1500,
                offset: 200
              });
            }
          }
        })

    	},
      //点击表格删除
	    remove (index,id) {
	    	this.status.showDelModel=true;
	    	this.deleteIndex=index;
	    	this.deleteId=id;
        this.deleteKeyWord= this.tableItem.tableData[index].keyWord;
	    },
	    //点击关键词跳转
      goKeywordAnalysis(res){
    	  this.$router.push({
          name:'keywordContain',
          params:{
            "keywordObj":{
              keyword:res.row.keyWord,
//              category:res.row.category=="all"?"":res.row.category,
              category:res.row.category,
              createTime:res.row.createTime,
              time:res.row.addTime,
              taskID:res.row.wtcId
            }
          }
        })
      },
      //设置表格数据
      mockTableData(){
        commonUtil.queryData({
          url:"/crawler/list/keyword",
          queryParams:{
            pageBean: JSON.stringify({
              "currentPage": this.tableItem.pageBean.currentPage, "pageSize": this.tableItem.pageBean.pageSize,
            }),
            "wtcTaskSite":"com"
          },
          callback:(res)=>{
            commonUtil.clearArray(this.tableItem.tableData);
            if(res.status===1){
              if(res.data.length!=0){
                res.data.forEach((row,i)=>{
                  this.tableItem.tableData.push({
                    category:row.wtcTaskCategory?row.wtcTaskCategory.toLowerCase():"all",
                    keyWord:row.wtcTaskInfo,
                    addTime:commonUtil.formatDateTime(new Date(row.wtcCreateTime)),
                    wtcId:row.wtcId,
                    createTime:row.wtcCreateTime
                  })
                })
              }
            }

          }
        })
      },
      /*----------分页模块-------------------*/
      //分页请求处理
      changePrevPage() {
        //获取上一页
        this.tableItem.pageBean.oldPage = this.tableItem.pageBean.currentPage;
        if (this.tableItem.pageBean.currentPage <= 1) {
          return;
        }
        this.tableItem.pageBean.currentPage--;
        this.tableItem.pageBean.toPage = this.tableItem.pageBean.currentPage;
        //获取上一页数据
        this.$set(this.status,"isPage",true);
        this.mockTableData();
      },
      changeNextPage() {
        if(this.tableItem.tableData.length==0){
          return;
        }
        this.tableItem.pageBean.oldPage = this.tableItem.pageBean.currentPage;
        //获取下一页
        this.tableItem.pageBean.currentPage++;
        this.tableItem.pageBean.toPage = this.tableItem.pageBean.currentPage;
        //获取下一页数据
        this.$set(this.status,"isPage",true);
        this.mockTableData();
      },
      toWhatPage() {
        if (!commonUtil.positiveInteger(+(this.tableItem.pageBean.toPage))) {
          this.tableItem.pageBean.toPage = "";
          return;
        } else if (this.tableItem.pageBean.toPage == 0) {
          //判断输入的是否为整数
          this.tableItem.pageBean.toPage = "";
          return;
        }
        this.tableItem.pageBean.oldPage = this.tableItem.pageBean.currentPage;
        this.tableItem.pageBean.currentPage = this.tableItem.pageBean.toPage;
        this.$set(this.status,"isPage",true);
        this.mockTableData();
      },
      changeSize(){
        this.$set(this.status,"isPage",true);
        this.mockTableData();
      }
    }
  }
</script>
<style lang="less">
	.key-mng-box{
    height:100%;
    background-color:#F2F7FA;
    padding:40px;
    .key-mng-wrap{ background-color:#fff; padding: 40px 30px 26px 22px;
      .ivu-btn-text{color:#ed3f14;}
      .ivu-table-wrapper{
        border-left:none;
      }
    }
    .keywordStyle{
      color:#61b6ed;
      font-weight: bold;
    }
     thead{
      .keywordStyle{
        color: #000;
        font-weight:400;
      }
    }
    .key-table{
      .ivu-table td{
        height: 64px;
      }
      .ivu-table:after{
        width: 0;
      }
    }
    .top-nav{
      span{cursor:pointer;}
      padding-bottom: 36px;
      font-size: 14px;
      color:#767676;
    }
    .page-bar{margin-top:12px;}
    .mylinks{
      text-decoration: none;
      &:active,&:visited{
        text-decoration: none;
      }
    }
  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
      top: 0;
    }
    .headerText{
      text-align: center;
      color:#ff6600;
      font-weight: bold;
      font-size: 14px;
    }
    .textContent{
      height: 90px;
      text-align: center;
      line-height: 90px;
    }
  }
</style>
