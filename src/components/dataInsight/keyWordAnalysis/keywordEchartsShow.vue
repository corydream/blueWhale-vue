<template>
    <div>
      <div class="echartBox">
        <div v-for="(chart,index) in echartItem.echartContainer.echartsData"  :class="echartItem.chartClass" >
          <div class="header-chart">
            <div class="title">{{chart.classStyle.title}}</div>
            <div class="decorate">
              <!--<span class="text">明细</span>-->
              <span class="text" :class="{'decorateActive':chart.classStyle.types=='deskeyworddata'||chart.classStyle.types==='titlekeyworddata'}" @click="goDetail(chart)">明细</span>
            </div>
            <Tooltip placement="top" class="permeateTips newsPermeate" v-if="chart.classStyle.types==='ratedatadot'">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{echartItem.ratedatadotTips}}</p>
              </div>
            </Tooltip>
            <Tooltip placement="top" class="permeateTips newsPermeate" v-if="chart.classStyle.types==='priceComments'">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{echartItem.priceCommentsTips}}</p>
              </div>
            </Tooltip>
            <div class="showFloder">
              <div class="floder" v-show="echartItem.showFloderData[chart.classStyle.index].showFloder"
                   @click="isShowGraph(chart)"
                   :class="{flod:echartItem.showFloderData[chart.classStyle.index].showFloder}">
                <span class="floder-text">收起</span>
                <Icon type="chevron-up" class="flder-icon"></Icon>
              </div>
              <div class="floder"  v-show="!echartItem.showFloderData[chart.classStyle.index].showFloder"
                   @click="isShowGraph(chart)"
                   :class="{flod:echartItem.showFloderData[chart.classStyle.index].showFloder}">
                <span class="floder-text">展开</span>
                <Icon type="chevron-down"class="flder-icon"></Icon>
              </div>
            </div>
          </div>
          <div class="wrapChart" :class="[echartItem.chartClass+'chart'+index]" v-if="echartItem.showFloderData[chart.classStyle.index].showFloder">
            <div :id="echartItem.chartWrapClass+index" class="innerChart"></div>
            <div class="btns" v-if="chart.classStyle.btns.news.show">
              <span v-bind:class="{active:rateShow}" @click="changeChart(chart.classStyle.btns.news.ltext,chart)">{{chart.classStyle.btns.news.ltext}}</span><span v-bind:class="{active:!rateShow}" @click="changeChart(chart.classStyle.btns.news.rtext,chart)">{{chart.classStyle.btns.news.rtext}}</span>
            </div>
            <div v-if="echartItem.type==='explode'">
              <div class="btns" v-if="chart.classStyle.btns.explode.show&&chart.classStyle.types=='deskeyworddata'">
                <span v-bind:class="{active:titleShow}" @click="changeChart(chart.classStyle.btns.explode.ltext,chart)">{{chart.classStyle.btns.explode.ltext}}</span><span v-bind:class="{active:!titleShow}" @click="changeChart(chart.classStyle.btns.explode.rtext,chart)">{{chart.classStyle.btns.explode.rtext}}</span>
              </div>
            </div>
            <div class="count" v-if="chart.classStyle.types==='pricedistdata'">
              <span class="desc">最高<span class="spec-number">${{priceSession[0]| handelNumber}}</span></span>
              <span class="desc">最低<span class="spec-number">${{priceSession[1]| handelNumber}}</span></span>
              <span class="desc">平均<span class="spec-number">${{priceSession[2]| handelNumber}}</span></span>
            </div>
            <div class="empty" v-if="chart.series[0].data.length==0">
              <h2 class="empty-title">暂无数据信息</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  //图表基础配置类
  import echartUtil from '../../../config/echartsCommon';
  import bus from './../../../config/bus.js';
  //通用方法
  import commonUtil from "../../../config/insight/commons/insightCommon";
    export default {
        data() {
          return{
            //图表遮罩层
            echartShow:false,
            //价格区间最大最小值
            priceSession:[],
            rateShow:true,
            titleShow:true,
          }
        },
        props:['echartItem','showMessage','chooseType','currentKeyword','conditionDateTime','taskId'],
        created(){
          let echartInfos=this.echartItem.echartContainer.echartInfo;
          for(let key in echartInfos){
            this.echartItem.showFloderData.push({
              index:echartInfos[key].index,
              type:echartInfos[key].type,
              showFloder:false
            })
          }
        },
        mounted(){
          this.$nextTick(()=>{
            commonUtil.clearArray(this.echartItem.echartContainer.echartsData);
            this.getechartData();
          })
        },
        methods:{
          //配置图表数据
          setchartData() {
            let treeUrl = require("../../../assets/images/circle.png");
            var maskImage = new Image();
            maskImage.src = treeUrl;
            commonUtil.clearArray(this.echartItem.echartContainer.echartsData);
            for (let key in this.echartItem.echartContainer.echartInfo){
              let obj = this.echartItem.echartContainer.echartInfo[key];
              if(this.echartItem.type==='explode'){
                if(obj.type!=="priceSession"&&obj.type!=="titlekeyworddata"){
                  let currentChart = commonUtil.setCharts(obj.graphType,obj,maskImage);
                  this.echartItem.echartContainer.echartsData.push(currentChart);
                }
              }else{
                if(obj.type!=="priceSession"&&obj.type!=="rateCommentdata"){
                  let currentChart = commonUtil.setCharts(obj.graphType,obj,maskImage);
                  this.echartItem.echartContainer.echartsData.push(currentChart);
                }
              }
            }
          },
          //获取图表数据
          getechartData(){
            this.setchartData();
            commonUtil.clearArray(this.echartItem.echartContainer.echartBox);
            this.echartShow = false;
            let _this = this;
            this.rateShow=true;//评分
            this.titleShow=true;//评分
            commonUtil.clearArray(this.echartItem.echartContainer.showDatas.rateDatas.measures);
            commonUtil.clearArray(this.echartItem.echartContainer.showDatas.rateDatas.demesion);
            commonUtil.clearArray(this.echartItem.echartContainer.showDatas.commentDatas.measures);
            commonUtil.clearArray(this.echartItem.echartContainer.showDatas.commentDatas.demesion);
            commonUtil.clearArray(this.echartItem.echartContainer.keywordDatas.titleDatas.measures);
            commonUtil.clearArray(this.echartItem.echartContainer.keywordDatas.descDatas.measures);
            commonUtil.clearArray(this.echartItem.priceSession);
            this.echartItem.echartContainer.showDatas.rateDatas.tips=[]
            this.echartItem.echartContainer.showDatas.commentDatas.tips=[];
            for (var key in this.echartItem.echartContainer.echartInfo) {
              let paramsObj = this.echartItem.echartContainer.echartInfo[key];
              let condition=[];
              //选择类目
              if (true) {
                condition = paramsObj.condition;
                condition.forEach((item,index)=>{
                  if(item.chinese==="类目"){
                    if(paramsObj.type=="deskeyworddata"||paramsObj.type=="titlekeyworddata"){
                      this.$set(item, "val",commonUtil.handelFormat(_this.chooseType)+"#$"+this.currentKeyword)
                    }else{
                      this.$set(item, "val",commonUtil.handelFormat(this.chooseType))
                    }
                  }else if(item.chinese==="关键词"){
                    this.$set(item, "val",this.currentKeyword);
                  }else if(item.chinese==="start"){
                    this.$set(item, "val",this.conditionDateTime[0]);
                  }else if(item.chinese==="end"){
                    this.$set(item, "val",this.conditionDateTime[1]);
                  }else if(item.chinese==="任务id"){
                    this.$set(item, "val",this.taskId);
                  }
                })
              }
              //关键词除外
              if(paramsObj.type!="deskeyworddata"&&paramsObj.type!="titlekeyworddata"){
                ((paramsObj) => {
                  commonUtil.queryData({
                    url: "/query/kylin",
                    queryParams: {
                      //固定
                      cid: paramsObj.cid,
                      //查询条件
                      sqlParam: JSON.stringify({
                        "columnMessure": paramsObj.measures ? paramsObj.measures : [],
                        "groupbys": paramsObj.demesion ? paramsObj.demesion : [],
                        "tableName": "kylin_sales",
                        "conditions": condition,
                        "conditionMap": {}
                      }),
                      //固定
                      project: "scgs_amazon",
                      pageBean: JSON.stringify({
                        "oldCurrentPage": 1,
                        "currentPage": 1,
                        "pageSize": paramsObj.pageSize||5
                      }),
                      //固定
                      modelID: paramsObj.modelID
                    },
                    callback: (res) => {
                      _this.echartShow = true;
                      let result = res.data.result;
                      var countTotalRate=0;
                      var countTotalComment=0;
                      var countTotalPrice=0;
                      //重置
                      commonUtil.clearArray(paramsObj.datas.demesion);
                      commonUtil.clearArray(paramsObj.datas.measures);
                      commonUtil.clearArray(paramsObj.datas.brand);
                      commonUtil.clearArray(paramsObj.datas.rate);
                      paramsObj.datas.tips=[];
                      paramsObj.datas.comments=[];
                      if (result.length != 0) {
                        if(paramsObj.type==="rateCommentdata"){
                          let comments=["0-50","50-100","100-300","300-500","500+"];
                          let newResult=[];
                          //评论排序
                          comments.forEach((item,i)=>{
                            result.forEach((li,k)=>{
                              if(item==li[0]){
                                newResult.push(li);
                              }
                            })
                         })
                          result=newResult;
                        }
                        result.forEach((row, index) => {
                          switch (paramsObj.type) {
                            //散点图评分评论
                            case "ratedatadot":
                              paramsObj.datas.measures.push(row.reverse());
                              break;
                            case "priceComments":
                              paramsObj.datas.measures.push(row);
                              break;
                            case "ratedata":
                              //评分数
                                paramsObj.datas.demesion.push(row[0]);
                                paramsObj.datas.measures.push(row[1]);
                              countTotalRate+=(row[1]*1);
                                _this.echartItem.echartContainer.showDatas.rateDatas.demesion.push(row[0]);
                                _this.echartItem.echartContainer.showDatas.rateDatas.measures.push(row[1]);
                              break;
                            case "rateCommentdata":
                              row[1]=commonUtil.getInt(row[1]);
                              paramsObj.datas.demesion.push(row[0]);
                              paramsObj.datas.measures.push(row[1]);
                              //评论数
                              countTotalComment+=(row[1]*1);
                              _this.echartItem.echartContainer.showDatas.commentDatas.demesion.push(row[0]);
                              _this.echartItem.echartContainer.showDatas.commentDatas.measures.push(row[1]);
                              break;
                            case "priceSession":
                              _this.priceSession=row;
                              break;
                            case "pricedistdata":
                              paramsObj.datas.demesion.push(row[0]);
                              row[1]=commonUtil.getInt(row[1]);
                              paramsObj.datas.measures.push(row[1]);
                              countTotalPrice+=(row[1]*1);
                              break;
                            default:
                              paramsObj.datas.demesion.push(row[0]);
                              row[1]=commonUtil.getFixedNumber(row[1])
                              paramsObj.datas.measures.push(row[1]);
                          }
                        })
                      }else{
                         commonUtil.clearArray(_this.priceSession);
                        _this.showMessage.push(1);
                      }
                      //评论评分占比处理
                      if(paramsObj.type=="rateCommentdata"){
                        paramsObj.datas.measures.forEach((col,i)=>{
                          let percent=commonUtil.getFixedNumber((col/countTotalComment)*100);
                          _this.echartItem.echartContainer.showDatas.commentDatas.tips.push(percent);
                        })
                      }else if(paramsObj.type=="ratedata"){
                        paramsObj.datas.measures.forEach((item,i)=>{
                          let percent=commonUtil.getFixedNumber((item/countTotalRate)*100);
                          _this.echartItem.echartContainer.showDatas.rateDatas.tips.push(percent);
                          paramsObj.datas.tips.push(percent);
                        })
                      }else if(paramsObj.type=="pricedistdata"){
                        //价格区间
                        paramsObj.datas.measures.forEach((num,i)=>{
                          let percent=commonUtil.getFixedNumber((num/countTotalPrice)*100);
                          paramsObj.datas.tips.push(percent);
                        })
                      }
                      if(paramsObj.type!=="priceSession"&&paramsObj.type!=="rateCommentdata"){
                        setTimeout(()=>{
                          _this.drawOneGraph(_this.echartItem.echartContainer.echartsData[paramsObj.index],paramsObj.index);
                        },200)
                      }
                    },
                    error:()=>{
                      _this.echartShow = true;
                    }
                  })
                })(paramsObj)
              }else{
                ((paramsObj,condition)=>{
                  this.getSaveKeyword(paramsObj,condition);
                })(paramsObj,condition)
              }
            }
          },
          //获取用户保存的关键词
          getSaveKeyword(paramsObj,condition){
            let _this=this;
            let currentType=paramsObj.type;
            let keywordType={
              requestType:this.echartItem.type,
              descType:currentType
            }
            commonUtil.queryData({
              url:'/keywords/query',
              queryParams: {
                //固定
                cid: paramsObj.cid,
                //查询条件
                sqlParam: JSON.stringify({
                  "columnMessure": paramsObj.measures ? paramsObj.measures : [],
                  "groupbys": paramsObj.demesion ? paramsObj.demesion : [],
                  "tableName": "kylin_sales",
                  "conditions": condition,
                  "conditionMap": {}
                }),
                //固定
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": 1,
                  "currentPage": 1,
                  "pageSize": paramsObj.pageSize||5
                }),
                //固定
                modelID: paramsObj.modelID,
                keywordType:JSON.stringify(keywordType)
              },
              callback:(res)=>{
                if(res.status===1){
                  //返回数据
                  let result = res.data.result;
                  //重置
                  commonUtil.clearArray(paramsObj.datas.demesion);
                  commonUtil.clearArray(paramsObj.datas.measures);
                 if(result.length!=0){
                   result.forEach((row, index) => {
                     switch(paramsObj.type){
                       case "deskeyworddata":
                         paramsObj.datas.measures.push({name: row[0], value: row[1]});
                         _this.echartItem.echartContainer.keywordDatas.descDatas.measures.push({name: row[0], value: row[1]});
                         break;
                       case "titlekeyworddata":
                         paramsObj.datas.measures.push({name: row[0], value: row[1]});
                         _this.echartItem.echartContainer.keywordDatas.titleDatas.measures.push({name: row[0], value: row[1]});
                         break;
                     }
                   })
                 }else{
                   _this.showMessage.push(1);
                 }
                  setTimeout(()=>{
                    _this.drawOneGraph(_this.echartItem.echartContainer.echartsData[paramsObj.index],paramsObj.index);
                  },200)
                }
              }
            })
          },
          //画图
          drawGraph() {
            // 基于准备好的dom，初始化echarts实例
            let echartsdata = this.echartItem.echartContainer.echartsData;
            commonUtil.clearArray(this.echartItem.echartContainer.echartBox);
            let echartBox = this.echartItem.echartContainer.echartBox;
            for (let i = 0; i < echartsdata.length; i++) {
              //当前图表外层盒子
              let chart = document.getElementById(this.echartItem.chartWrapClass + i);
              //获取外层的盒子
              let chartsWrap = document.getElementsByClassName(this.echartItem.chartClass+"chart" + i)[0];
              if(chart && chartsWrap){
                //初始化表格
                let myChart = this.$echarts.init(chart);
                //改变宽度
                commonUtil.resizeCharts(chart, chartsWrap.clientWidth, chartsWrap.clientHeight);
                //改动盒子的宽高
                myChart.resize();
                myChart.setOption(echartsdata[i]);
                echartBox.push({
                  id: this.echartItem.chartWrapClass + i,
                  chart: myChart
                });
              }
            }
          },
          //切换评论评分
          changeChart(text, chart) {
            if (text === "评分分布") {
              this.rateShow = true;
              this.$set(chart.xAxis, "data", this.echartItem.echartContainer.showDatas.rateDatas.demesion);
              this.$set(chart.series[0], "data", this.echartItem.echartContainer.showDatas.rateDatas.measures);
              this.$set(this.echartItem.echartContainer.echartInfo.ratedata.datas,"tips",this.echartItem.echartContainer.showDatas.rateDatas.tips)
              if(this.echartItem.type==="keyword"){
                this.$set(chart.series[0].itemStyle.normal,"color","#296fcb");
              }else{
                this.$set(chart.series[0].itemStyle.normal,"color", echartUtil.columSColors.lOrange);
              }
            } else if (text === "评论分布") {
              this.rateShow = false;
              this.$set(chart.xAxis, "data", this.echartItem.echartContainer.showDatas.commentDatas.demesion);
              this.$set(chart.series[0], "data", this.echartItem.echartContainer.showDatas.commentDatas.measures);
              this.$set(this.echartItem.echartContainer.echartInfo.ratedata.datas,"tips",this.echartItem.echartContainer.showDatas.commentDatas.tips)
              this.$set(chart.series[0].itemStyle.normal, "color", echartUtil.columSColors.blue);
            }
            this.drawOneGraph(chart,2,"one");
          },
          drawOneGraph(obj,index,type){
            // 基于准备好的dom，初始化echarts实例
            let echartBox = this.echartItem.echartContainer.echartBox;
            //当前图表外层盒子
            let chart = document.getElementById(this.echartItem.chartWrapClass + index);
            //获取外层的盒子
            let chartsWrap = document.getElementsByClassName(this.echartItem.chartClass+"chart" + index)[0];
            if(chart && chartsWrap){
              //初始化表格
              let myChart = this.$echarts.init(chart);
              //改变宽度
              commonUtil.resizeCharts(chart, chartsWrap.clientWidth, chartsWrap.clientHeight);
              //改动盒子的宽高
              myChart.resize();
              myChart.setOption(obj);
              //删除在替换
              if(type!="one"){
                echartBox.push({
                  id: this.echartItem.chartWrapClass + index,
                  chart: myChart
                })
              }
            }

          },
          goDetail(chart){
            if(!(chart.classStyle.types=='deskeyworddata'||chart.classStyle.types=='titlekeyworddata')){
              return;
            }
            let datas={
                type:this.echartItem.type,
                keywordDatas:chart,
                chooseType:this.chooseType,
                condition:[]
            }
            this.$router.push(
              {
                name: this.echartItem.keywordType,
                params:{
                  datas:datas,
                  keywordObj:{
                    keyword:this.$parent.$refs.searchBox.currentKey,
//                    category:this.$parent.$refs.searchBox.currentCategory=="all"?"":this.$parent.$refs.searchBox.currentCategory,
                    category:this.$parent.$refs.searchBox.currentCategory,
                    time:this.$parent.$refs.searchBox.dateTime,
                    taskID:this.taskId
                  }
                }
             })
            },
          //是否显示图表
          isShowGraph(paramsObj){
            this.$set(this.echartItem.showFloderData[paramsObj.classStyle.index],"showFloder",!this.echartItem.showFloderData[paramsObj.classStyle.index].showFloder);
            //绘制图表
            if(paramsObj.type!=="priceSession"&&paramsObj.type!=="rateCommentdata"){
              setTimeout(()=>{
                this.drawOneGraph(this.echartItem.echartContainer.echartsData[paramsObj.classStyle.index],paramsObj.classStyle.index);
              },200)
            }
            this.$emit("changeShow","chart");
          }
        },
        filters:{
        handelNumber(number){
          return number?(number*1).toFixed(1):0;
        }
       }
    }
</script>
<style scoped lang="less">
</style>
