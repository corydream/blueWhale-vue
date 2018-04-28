<template>
  <div>
    <div>
      <div class="wrap row">
        <CategoryItem  @chooseType="getCategory"
                       :categoryItem="categoryItem"
                       :showMessage="showMessage"
                       :chooseType="chooseType"
                       v-if="modelShow.categoryDisplay"
                       ref="category">
        </CategoryItem>
      </div>
      <TableList :TableItem="TableItem"
                 :showMessage="showMessage"
                 :chooseType="chooseType"
                 v-if="modelShow.tableDisplay"
                 ref="table"
                 @changeCategory="getCategory">
      </TableList>
    </div>
  </div>
</template>
<script>
  import images from '../../../assets/logo2.png';
  //页面初始数据
  import explodeData from "../../../config/insight/explodeDatas/amazon/explodeData";
  //通用方法
  import commonUtil from "../../../config/insight/commons/comonUse";
  import dataSourceItem from "../commons/dataSourceFrom";
  import TableList from "../commons/tablelists/amazon/searchTableList";
  import CategoryItem from "../commons/categorySearch";
  export default {
    data() {
      return {
        echartItem:{
          //图表
          echartContainer:explodeData.chartsData,
          permeateTips:"下级类目分布情况:查看当前类目的下级类目在该类目BSR -top100中出现次数分布情况。如选择最后一级类目，则无法显示该图表。",
          chartClass:'myExplode',
          chartWrapClass:'myExplodechart',
          //请求配置
          parmasConfig:explodeData.parmasConfig,
          initCondition:explodeData.initCondition,
          type:"explode",
          keywordType:"explodekeyword",
          showKeyword:""
        },
        TableItem:{
          //表格
          tableContainer:explodeData.tableDatas,
          //分页模块
          pageBean:explodeData.pageBean,
          tableID:"#explodeTables",
          //请求配置
          parmasConfig:explodeData.parmasConfig,
          initCondition:explodeData.initCondition,
          type:"explode",
          title:"爆品推荐列表",
          showNewColumn:"name3",
          tipTitle:"爆品推荐"
        },
        categoryItem:{
          //站点选择数据
          cityList: explodeData.cityList,
          //请求配置
          parmasConfig:explodeData.parmasConfig,
          initCondition:explodeData.initCondition,
          categoryTitle:"Best Sellers Top100",
          params:{exporationType:1},
          type:"explode",
          showDataSource:false
        },
        indicatorItem:{
          //爆品指标看板
          databoardTarget:explodeData.databoardTarget,
          //请求配置
          parmasConfig:explodeData.parmasConfig,
          initCondition:explodeData.initCondition,
          title:"Best Sellers指标分析",
          type:"explode"
        },
        //是否有类目数据
        showMessage:[],
        //模块展示
        modelShow:{
          //类目选择
          categoryDisplay:false,
          //指标
          indicatorDisplay:false,
          //显示图表
          echartDisplay:false,
          //显示表格
          tableDisplay:false,
          bsrDisplay:false
        },
        //选择的类目
        chooseType:[],
        type:"explode",
        boxshowFloder:false,
        //数据源日期
        dateTime:commonUtil.formatYesterDay(),
        spinShow:false
      }
    },
    props:['category',"btnState",'showNewColumn'],
    created(){
      this.$store.commit("isShowAsin",false);
      if(this.category){
        this.chooseType=this.category;
      }else if(window.sessionStorage.getItem("params")){
        let obj=JSON.parse(window.sessionStorage.getItem("params"));
        this.chooseType=obj.category;
      }else{
        if(this.$store.state.category.length>0){
          this.$store.state.category.forEach((item)=>{
            this.chooseType.push(item)
          })
        }else{
          this.chooseType=[""];
        }
      }
      console.log(this.$store.state.category);
      this.$store.commit("changeCategory",this.chooseType);
      this.$set(explodeData.initCondition,"measures",[]);
      this.$set(explodeData.initCondition,"demesion",[]);
      this.$set(explodeData.initCondition,"condition",[]);
      this.$set(this.echartItem.echartContainer,"echartBox",[]);
      commonUtil.clearArray(this.showMessage);
      //配置图表
      this.setechartCondition();
      if(this.btnState){
        this.echartItem.showKeyword=this.btnState;
      }else if(window.sessionStorage.getItem("params")){
        let obj=JSON.parse(window.sessionStorage.getItem("params"));
        this.echartItem.showKeyword=obj.btnState;
      }
      window.sessionStorage.removeItem("params");
      this.modelShow.categoryDisplay=true;
      this.modelShow.indicatorDisplay=true;
      this.modelShow.bsrDisplay=true;
      this.modelShow.echartDisplay=true;
      this.modelShow.tableDisplay=true;
    },
    components:{
     TableList,dataSourceItem,CategoryItem
    },
    mounted() {
    /*  this.$nextTick(() => {
        commonUtil.setTableWidth({
          wrapper:".data-show",
          tables:this.TableItem.tableID,
          padding:55
        },this);
        //给window注册事件使chart自适应高度和宽度
        window.onresize = () => {
          //重置容器高宽
          if (this.$route.path == "/dataObserve/0/explode/explodeProduct/explodeProductTendency") {
            //自适应表格
            commonUtil.setTableWidth({
              wrapper:".data-show",
              tables:this.TableItem.tableID,
              padding:55
            },this);
          }
        };
      })*/
    },
    methods: {
      /*-----------------图表模块------------------*/
      //设置图表的查询条件
      setechartCondition() {
        //渗透率
        this.echartItem.echartContainer.echartInfo.permeatedata.measures = commonUtil.setConditions("measures", [{
          col: "RPT_KYLIN_AMAZON_LIPS_RATE.RATE",
          chinese: "渗透率",
          uuid: "fde1a1e2-0205-4a25-9e01-060c6ea4ddd2"
        },{
          "chinese": "产品数量",
          "col": "RPT_KYLIN_AMAZON_LIPS_RATE.NUM",
          "uuid": "7a9167cc-0c62-41b3-ab84-94cb0c7efef4"
        }
        ])
        this.echartItem.echartContainer.echartInfo.permeatedata.demesion = commonUtil.setConditions("demesion", [
          {
            col: "STRING",
            chinese: "类目名称",
            uuid: "4e2f1d1e-a758-4575-a12f-7416fb410cf3",
          }
        ]);
        //评分数
        this.echartItem.echartContainer.echartInfo.ratedata.measures = commonUtil.setConditions("measures", [
          {
            col: "RPT_KYLIN_AMAZON_COUNT.P_NUM",
            chinese: "产品数量",
            uuid: "ad3f3fe1-6c29-4a6c-8be1-6382445555c5"
          },
          {
            col: "RPT_KYLIN_AMAZON_COUNT.P_RATE",
            chinese: "占比",
            uuid: "6cfece11-e792-4f9d-9bd5-1ccf58c3e01a"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.ratedata.demesion = commonUtil.setConditions("demesion", [
          {
            col: "STRING",
            chinese: "分区名称",
            uuid: "5ef15f2a-088e-416f-aa13-529f3dada5f9"
          },
          {
            "chinese": "类别",
            "col": "RPT_KYLIN_AMAZON_COUNT.TYPE",
            "columnType": "STRING",
            "uuid": "6826e74f-e513-418d-8ab3-2ccdd774b54d"
          },
          {
            "chinese": "排序字段",
            "col": "RPT_KYLIN_AMAZON_PRICE_DIST.ORDERBY",
            "uuid": "5ef15f2a-088e-416fzzzz-aa13-5sss29f3dada5f9",
            "sortType":"ASC"
          }
        ]);
        //亚马逊自营FBA
        this.echartItem.echartContainer.echartInfo.FBAdata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "亚马逊占比",
            "col": "AMAZON_RATE",
            "uuid": "ade4d721-0bd2-47bc-bc06-3c9cdb2fd11a"
          },
          {
            "col": "FBA_NUM",
            "chinese": "fba产品数",
            "uuid": "9ac32dd1-60cf-4016-a356-099e70757267"
          },
          {
            "col": "AMAZON_NUM",
            "chinese": "Amazon产品数",
            "uuid": "7085a3fb-1a00-42c8-b614-1ea6d8402e6b"
          }
        ])
        //品牌数Top10
        this.echartItem.echartContainer.echartInfo.branddata.measures = commonUtil.setConditions("measures", [
          {
            "col": "BRAND_NUM",
            "chinese": "品牌产品数",
            "uuid": "6c56dc41-f0a0-4328-8da8-81956a5fc973"
          }, {
            "col": "BRAND_RATE",
            "chinese": "品牌产品占比",
            "uuid": "3da96912-5891-44ff-bbb1-8bdd45df57fb"
          },
          {
            "chinese": "评论数",
            "col": "BRAND_REVIEW_COUNT",
            "uuid": "3da96912-5891-44ff-bbb1-8bdd4A2157fc"
          },
          {
            "chinese": "评论占比",
            "col": "BRAND_REVIEW_RATE",
            "uuid": "3da96912-5891-44ff-bbb1-8bdd4A2157fb"
          },
          {
            "chinese": "ORDERBY",
            "col": "ORDERBY",
            "sortType": "ASC",
            "uuid": "3da96912-5891-44ff-bbb1-8bdd4A21SDFb"
          },{
            "chinese": "ORDERBY_COUNT",
            "col": "ORDERBY_COUNT",
            "sortType": "ASC",
            "uuid": "3da96912-5891-44ff-bbb1-8bdd4AWFD7fb"
          }
        ])
        this.echartItem.echartContainer.echartInfo.branddata.demesion = commonUtil.setConditions("demesion", [
          {
            "col": "STRING",
            "chinese": "品牌",
            "isMaxMin": false,
            "uuid": "2ebc047e-2e97-4b99-9173-d95e1b448188"
          }
        ])
        //标题词云
        this.echartItem.echartContainer.echartInfo.titlekeyworddata.demesion = commonUtil.setConditions("demesion", [
          {
            "chinese": "名称单词",
            "col": "RPT.RPT_CATEGORY_WORD_COUNT.WORD_NAME",
            "columnType": "STRING",
            "uuid": "e9c12e5e-827d-4cc0-aa7b-e77618373cde"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.titlekeyworddata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "数量",
            "col": "RPT_BSR_WORD_COUNT.WORD_COUNT",
            "uuid": "870a4d1d-f22c-4090-8649-a7833f8f4be5"
          }
        ]);
        //描述词云
        this.echartItem.echartContainer.echartInfo.deskeyworddata.demesion = commonUtil.setConditions("demesion", [
          {
            "chinese": "名称单词",
            "col": "RPT.RPT_CATEGORY_DESC_COUNT.DESC_WORD",
            "columnType": "STRING",
            "uuid": "13ba83b4-9fa9-46e7-96a9-105f2dbc06e9"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.deskeyworddata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "数量",
            "col": "DESC_COUNT",
            "uuid": "5630a874-9812-40d6-abb0-4c2dc8287c1e"
          }
        ]);
        //价格区间
        this.echartItem.echartContainer.echartInfo.pricedistdata.demesion = commonUtil.setConditions("demesion", [
          {
            "chinese": "区间名",
            "col": "RPT.RPT_KYLIN_AMAZON_PRICE_DIST.GRADE_NAME",
            "columnType": "STRING",
            "uuid": "db4e6fec-9d89-4708-bdd4-92ce68fce5ae"
          },
        ]);
        this.echartItem.echartContainer.echartInfo.pricedistdata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "区间数量",
            "col": "RPT_KYLIN_AMAZON_PRICE_DIST.P_NUM",
            "uuid": "3c27272b-a5ee-449b-b848-18e09d9700a4"
          },
          {
            "chinese": "区间产品占比",
            "col": "RPT_KYLIN_AMAZON_PRICE_DIST.P_RATE",
            "uuid": "4f01c3dd-2045-4abe-82e5-312d5aabc746"
          },
          {
            "chinese": "排序字段",
            "col": "RPT_KYLIN_AMAZON_PRICE_DIST.ORDERBY",
            "uuid": "eb0c8a66-476d-4883-9dc4-46686a047913",
            "sortType":"DESC"
          }
        ]);
        //获取区间的最大最小平均值
        this.echartItem.echartContainer.echartInfo.priceSession.measures=commonUtil.setConditions("measures",[
          {
            "chinese": "最大价格",
            "col": "RPT_KYLIN_AMAZON_PRICE_MMV.MAX_PRICE",
            "uuid": "f2233156-af86-4624-993b-6f313be51198"
          },
          {
            "chinese": "最小价格",
            "col": "RPT_KYLIN_AMAZON_PRICE_MMV.MIN_PRICE",
            "uuid": "28c5b255-7c38-4818-9ba5-47fb63136f87"
          },
          {
            "chinese": "平均价格",
            "col": "RPT_KYLIN_AMAZON_PRICE_MMV.AVG_PRICE",
            "uuid": "a532c98f-fd5b-4f8e-afc0-f9b3f018b1e7"
          }
        ])
      },
      getCategory(value){
        this.chooseType=value;
      },
    },
    watch: {
      // 如果 `showMessage` 发生改变，这个函数就会运行
      showMessage: function (newMessage) {
        if(newMessage.length===14){
//          this.$Message.info('该类目下暂无数据');
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .showBox{
    position: relative;
    background: #f2f7fa;
    .indiactorTop{
      padding-left: 45px;
      padding-top: 10px;
      background: #fff;
      height: 48px;
      margin-bottom: 10px;
      .textTitle{
        margin-bottom: 0px;
      }
      .showFloder{
        position: absolute;
        right: 45px;
        top:13px;
        color: #50b0ec;
        font-size: 14px;
        height: 21px;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
</style>
