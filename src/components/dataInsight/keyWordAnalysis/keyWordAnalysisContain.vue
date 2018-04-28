<template>
  <div>
    <div class="sign">
      <div class="wrap row">
        <div class="search-box text-center">
        		<search-component ref="searchBox" v-if="modelShow.categoryDisplay"  @getDateTime="getDateTime" @getTaskID="getTaskID"   @getCurrentKeyword="getCurrentKeyword"  @chooseType="getKeywordCategory" :keywordItem="keywordItem" :currentKeyword="currentKeyword" :showMessage="showMessage" :chooseType="chooseType"></search-component>
        </div>
      </div>
      <div class="showBox">
        <div class="indiactorTop">
          <h2 class="textTitle">图表分析</h2>
          <div class="showFloder">
            <div class="floder" v-show="boxshowFloder"
                 @click="isShowGraph"
                 :class="{flod:boxshowFloder}">
              <span class="floder-text">全部收起</span>
              <Icon type="chevron-up" class="flder-icon"></Icon>
            </div>
            <div class="floder"  v-if="!boxshowFloder"
                 @click="isShowGraph"
                 :class="{flod:boxshowFloder}">
              <span class="floder-text">全部展开</span>
              <Icon type="chevron-down"class="flder-icon"></Icon>
            </div>
          </div>
        </div>
        <div class="isShowBox" v-show="boxshowFloder">
          <div class="wrap row">
            <IndicatorItem
              :indicatorItem="indicatorItem"
              :showMessage="showMessage"
              :conditionDateTime="conditionDateTime"
              :taskId="taskId" :chooseType="chooseType"
              :currentKeyword="currentKeyword"
              @changeShow="changeShow"
              v-if="modelShow.indicatorDisplay" ref="indicator"></IndicatorItem>
          </div>
          <EchartItem
            :echartItem="echartItem"
            :showMessage="showMessage"
            :conditionDateTime="conditionDateTime"
            :taskId="taskId" :chooseType="chooseType"
            @changeShow="changeShow"
            :currentKeyword="currentKeyword"  v-if="modelShow.echartDisplay" ref="charts"></EchartItem>
        </div>
      </div>
      <TableList :TableItem="TableItem" :showMessage="showMessage" :conditionDateTime="conditionDateTime" :taskId="taskId" :chooseType="chooseType"  :currentKeyword="currentKeyword"  v-if="modelShow.tableDisplay" ref="table"></TableList>
    </div>
  </div>
</template>
<script>
  import images from './../../../assets/logo2.png';
  //页面初始数据
  import keyWordInitDatas from "../../../config/insight/keywordDatas/keyWordRecommendData";
  //通用方法
  import commonUtil from "../../../config/insight/commons/insightCommon";
  //搜索组件
  import searchComponent from './searchComponent.vue';
  //指标
  import IndicatorItem from "./keywordIndicatorShow.vue";
  //图表
  import EchartItem from "./keywordEchartsShow.vue";
  //表格搜索
  import TableList from "./keywordSearchTableList.vue";
  export default {
    data() {
      return {
        echartItem:{
          //图表
          echartContainer:keyWordInitDatas.echartContainer,
          ratedatadotTips:"了解top1000产品的评论数和评分的集中部分趋势，对标分布状态，分析可用关键词。",
          priceCommentsTips:"产品价格和评论数的一个变化关系，对标关键词搜索下主要价格对应于评论变化的关系，分析可用关键词。",
          chartClass:'mykeyWord',
          chartWrapClass:'mykeyWordchart',
          //请求配置
          parmasConfig:keyWordInitDatas.parmasConfig,
          initCondition:keyWordInitDatas.initCondition,
          type:"keyword",
          keywordType:"keyAnalysiskeyword",
          showKeyword:"",
          showFloderData:[]
        },
        TableItem:{
          //表格
          tableContainer:keyWordInitDatas.tableContainer,
          //分页模块
          pageBean:keyWordInitDatas.pageBean,
          tableID:"#keywordtables",
          //请求配置
          parmasConfig:keyWordInitDatas.parmasConfig,
          initCondition:keyWordInitDatas.initCondition,
          type:"keyword",
          title:"关键词产品分析列表"
        },
        keywordItem:{
          //站点选择数据
          cityList: keyWordInitDatas.cityList,
          //请求配置
          parmasConfig:keyWordInitDatas.parmasConfig,
          initCondition:keyWordInitDatas.initCondition,
          categoryTitle:"",
          keywordObj:null,
          wordBackObj:null,
          type:"keyword"
        },
        indicatorItem:{
          //新品指标看板
          databoardTarget:keyWordInitDatas.databoardTarget,
          //请求配置
          parmasConfig:keyWordInitDatas.parmasConfig,
          initCondition:keyWordInitDatas.initCondition,
          title:"",
          type:"keyword",
          indicatorshowFloder:false,
          title:"关键词产品分析指标分析"
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
          tableDisplay:false
        },
        //选择的类目
        chooseType:[],
        type:"keyword",
        currentKeyword:'',
        conditionDateTime:[],
        taskId:"",
        boxshowFloder:false
      }
    },
   components:{
   	searchComponent,EchartItem,TableList,IndicatorItem
   },
    created(){
      commonUtil.clearArray(this.showMessage);
      this.$set(keyWordInitDatas.initCondition,"measures",[]);
      this.$set(keyWordInitDatas.initCondition,"demesion",[]);
      this.$set(keyWordInitDatas.initCondition,"condition",[]);
      if(this.keywordObj){
        this.keywordItem.keywordObj=this.keywordObj;
      }else if(window.sessionStorage.getItem("params")){
        let obj=JSON.parse(window.sessionStorage.getItem("params"));
        this.keywordItem.wordBackObj=obj.keywordObj;
      }
      window.sessionStorage.removeItem("params");
      this.modelShow.categoryDisplay=true;
      //配置图表
      this.setechartCondition();
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
          if (this.$route.path == "/dataObserve/0/keyword/keywordContain") {
            commonUtil.chartResize(this.echartItem.echartContainer.echartBox,{
              wrapper:this.echartItem.chartClass+"chart",
              chart:this.echartItem.chartWrapClass
            })
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
    props:['keywordObj'],
    filters:{
      handelNumber(number){
        return number?(number*1).toFixed(1):0;
      }
    },
    methods: {
      getKeywordCategory(value){
        this.chooseType=value;
      },
      getDateTime(value){
        this.conditionDateTime=value;
      },
      getTaskID(value){
        this.taskId=value;
      },
      getCurrentKeyword(value){
        this.currentKeyword=value;
        if(!this.modelShow.indicatorDisplay){
          this.modelShow.indicatorDisplay=true;
        }
        if(!this.modelShow.echartDisplay){
          this.modelShow.echartDisplay=true;
        }
        if(!this.modelShow.tableDisplay){
          this.modelShow.tableDisplay=true;
        }
      },
      //设置图表的查询条件
      setechartCondition() {
    	  //散点-评分评论
        this.echartItem.echartContainer.echartInfo.ratedatadot.demesion = commonUtil.setConditions("demesion", [
          {
            "col": "crawler_wcs_amazon_sku_mid.scgs_grade_count",
            "chinese": "评分数",
            "uuid": "101c6ce8-d3dc-48b7-b115-2196f4faeba0",
            "sortType":"DESC"
          },
          {
            "col": "crawler_wcs_amazon_sku_mid.scgs_review_count",
            "chinese": "review数",
            "uuid": "45ce6256-e763-4632-aa19-3ea868baa993",
            "sortType":"DESC"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.priceComments.demesion = commonUtil.setConditions("demesion", [
          {
            "col": "crawler_wcs_amazon_sku_mid.scgs_review_count",
            "chinese": "review数",
            "uuid": "45ce6256-e763-4632-aa19-3ea868baa993",
            "sortType":"DESC"
          },
          {
            "col": "crawler_wcs_amazon_sku_mid.scgs_price",
            "chinese": "价格",
            "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
            "sortType":"DESC"
          }
        ]);
        //评分数
        this.echartItem.echartContainer.echartInfo.ratedata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "区间数量",
            "col": "1",
            "uuid": "3c27272b-a5eAe-449b-b8SS48-18e09d9700a4",
            "agg":"COUNT"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.ratedata.demesion = commonUtil.setConditions("demesion", [
          {
            "col": "crawler_wcs_amazon_sku_mid.sgc_grade",
            "chinese": "评分区间名",
            "uuid": "782e036d-f368-4a4f-91a7-4aa9c4e1"
          }
        ]);
        //评论数
        this.echartItem.echartContainer.echartInfo.rateCommentdata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "区间数量",
            "col": "1",
            "uuid": "3c27272b-a5eAe-449b-b8SS48-18e09d9700a4",
            "agg":"COUNT"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.rateCommentdata.demesion = commonUtil.setConditions("demesion", [
          {
            "col": "crawler_wcs_amazon_sku_mid.src_grade",
            "chinese": "评论区间",
            "uuid": "3c27272b-a5ee-449b-b848-18e09d9700a4"
          }
        ]);
        //标题词云
        this.echartItem.echartContainer.echartInfo.titlekeyworddata.demesion = commonUtil.setConditions("demesion", [
          {
            "chinese": "名称",
            "col": "crawler_sgsc_name_count.crawler_sgsc_name_count",
            "columnType": "STRING",
            "uuid": "782e036d-f368-4a4f-191a7-sads1293043c4e1"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.titlekeyworddata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "次数",
            "col": "crawler_sgsc_name_count.word_count",
            "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
            "sortType":"DESC"
          }
        ]);
        //描述词云
        this.echartItem.echartContainer.echartInfo.deskeyworddata.demesion = commonUtil.setConditions("demesion", [
          {
            "chinese": "描述词名称",
            "col": "crawler_sgsc_desc_count.scgs_description_word",
            "columnType": "STRING",
            "uuid": "782e036d-f368-4a4f-191a7-sads1293043c4e1"
          }
        ]);
        this.echartItem.echartContainer.echartInfo.deskeyworddata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "次数",
            "col": "crawler_sgsc_desc_count.word_count",
            "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
            "sortType":"DESC"
          }
        ]);
        //价格区间
        this.echartItem.echartContainer.echartInfo.pricedistdata.demesion = commonUtil.setConditions("demesion", [
          {
            "chinese": "区间名",
            "col": "crawler_wcs_amazon_sku_mid.sgc_grade",
            "columnType": "STRING",
//            "uuid": "3c27272b-a5ee-449b-b848-18e09d9700a4",
            "uuid": "782e036d-f368-4sssa4f-91a7-4aa9c4e1",

          }
        ]);
        this.echartItem.echartContainer.echartInfo.pricedistdata.measures = commonUtil.setConditions("measures", [
          {
            "chinese": "区间数量",
            "col": "1",
            "uuid": "3c27272b-a5eAe-449b-b8SS48-18e09d9700a4",
            "agg":"COUNT"
          }
        ]);
        //获取区间的最大最小平均值
        this.echartItem.echartContainer.echartInfo.priceSession.measures=commonUtil.setConditions("measures",[
          {
            "chinese": "最大价格",
            "col": "crawler_wcs_amazon_sku_mid.scgs_price",
            "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
            "agg": "MAX"
          },
          {
            "chinese": "最小价格",
            "col": "crawler_wcs_amazon_sku_mid.scgs_price",
            "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
            "agg": "MIN"
          },
          {
            "chinese": "平均价格",
            "col": "crawler_wcs_amazon_sku_mid.scgs_price",
            "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
            "agg": "AVG"
          }
        ])
      },
      isShowGraph(){
        this.boxshowFloder=!this.boxshowFloder;
        if(this.boxshowFloder){
          //全部展开
          if(!sessionStorage.getItem("showKeywordChart")){
            //指标展开
            this.indicatorItem.indicatorshowFloder=true;
            //图表展开
            this.echartItem.showFloderData.forEach((item)=>{
              item.showFloder=true;
            })
            setTimeout(()=>{
              //绘制全部的图表
              this.$refs.charts.drawGraph();
            },200)
          }else{
            //根据sessionStorage来显示
            let currentShow=JSON.parse(sessionStorage.getItem("showKeywordChart"));
            //指标展开
            this.indicatorItem.indicatorshowFloder=currentShow.indicator;
            //图表展开
            this.echartItem.showFloderData=currentShow.charts;
            //图表展开
            this.echartItem.showFloderData.forEach((item,i)=>{
              item.showFloder=currentShow.charts[i].showFloder;
            })
            //展示
            setTimeout(()=>{
              //绘制全部的图表
              this.$refs.charts.drawGraph();
            },200)
          }
        }
        sessionStorage.setItem("showKeywordChart",JSON.stringify({
            charts: this.echartItem.showFloderData,
            indicator:this.indicatorItem.indicatorshowFloder
          })
        )
      },
      changeShow(value){
        sessionStorage.setItem("showKeywordChart",JSON.stringify({
            charts: this.echartItem.showFloderData,
            indicator:this.indicatorItem.indicatorshowFloder
          })
        )
      }
    },
    watch: {
      showMessage: function (newMessage) {
        if(newMessage.length===13){
          this.$Message.info('该类目下暂无数据');
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .showBox{
    position: relative;
    background: #f2f7fa;
    .indiactorTop{
      padding-left: 45px;
      padding-top: 15px;
      background: #fff;
      height: 48px;
      margin-bottom: 10px;
      .textTitle{
        margin-bottom: 0px;
      }
      .showFloder{
        position: absolute;
        right: 45px;
        top:15px;
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
