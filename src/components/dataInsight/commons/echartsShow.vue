<template>
    <div>
      <div class="echartBox">
        <div v-show="echartShow" v-for="(chart,index) in echartItem.echartContainer.echartsData" :class="[echartItem.chartClass]">
          <div class="header-chart">
            <div class="title">{{chart.classStyle.title}}</div>
            <div class="decorate">
              <span class="text"
                    :class="{'decorateActive':chart.classStyle.types=='deskeyworddata'||chart.classStyle.types==='titlekeyworddata'}"
                    v-if="chart.classStyle.types=='deskeyworddata'||chart.classStyle.types==='titlekeyworddata'"
                    @click="goDetail(chart)">明细</span>
            </div>
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
            <div class="empty" v-if="chart.series[0].data.length==0">
              <h2 class="empty-title">暂无数据信息</h2>
            </div>
            <div class="brandCount"  v-if="chart.classStyle.types==='branddata'&&echartItem.type==='explode'">
              <span>品牌总数:{{brandCount}}</span>
            </div>
            <div class="btns" v-if="chart.classStyle.btns.news.show">
              <span v-bind:class="{active:rateShow}" @click="changeChart(chart.classStyle.btns.news.ltext,chart)">
                {{chart.classStyle.btns.news.ltext}}</span>
              <span v-bind:class="{active:!rateShow}" @click="changeChart(chart.classStyle.btns.news.rtext,chart)">{{chart.classStyle.btns.news.rtext}}</span>
            </div>
            <div v-if="echartItem.type==='explode'">
              <div class="btns" v-if="chart.classStyle.btns.explode.show&&(chart.classStyle.types=='deskeyworddata'||chart.classStyle.types=='titlekeyworddata')">
                <span v-bind:class="{active:titleShow}" @click="changeChart(chart.classStyle.btns.explode.ltext,chart)">{{chart.classStyle.btns.explode.ltext}}</span>
                <span v-bind:class="{active:!titleShow}" @click="changeChart(chart.classStyle.btns.explode.rtext,chart)">{{chart.classStyle.btns.explode.rtext}}</span>
              </div>
            </div>
            <div class="count" v-if="chart.classStyle.types==='pricedistdata'">
              <span class="desc">最高<span class="spec-number">${{priceSession[0]| handelNumber}}</span></span>
              <span class="desc">最低<span class="spec-number">${{priceSession[1]| handelNumber}}</span></span>
              <span class="desc">平均<span class="spec-number">${{priceSession[2]| handelNumber}}</span></span>
            </div>
            <Tooltip placement="top" class="permeateTips newsPermeate" v-if="chart.classStyle.types==='permeatedata'">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{echartItem.permeateTips}}</p>
              </div>
            </Tooltip>
          </div>
        </div>
        <Spin fix v-if="!echartShow" class="coverChart"></Spin>
      </div>
    </div>
</template>
<script>
  //图表基础配置类
  import echartUtil from '../../../config/echartsCommon';
  //通用方法
  import commonUtil from "../../../config/insight/commons/comonUse";
  import chartBoxUtil from "../../../config/insight/commons/chartMethods"
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
        computed:{
          brandCount(){
              return this.$store.state.brandCount;
          }
        },
        props:['echartItem','showMessage','chooseType'],
        created(){
          commonUtil.clearArray(this.echartItem.echartContainer.echartsData);
            let echartInfos=this.echartItem.echartContainer.echartInfo;
          for(let key in echartInfos){
            if(this.echartItem.type=="news"){
              if(key!="priceSession"){
                this.echartItem.showFloderData.push({
                  index:echartInfos[key].index,
                  type:echartInfos[key].type,
                  showFloder:true
                })
              }
            }else if(this.echartItem.type=="explode"){
              if(key!="priceSession"&&key!="titlekeyworddata"){
                this.echartItem.showFloderData.push({
                  index:echartInfos[key].index,
                  type:echartInfos[key].type,
                  showFloder:true
                })
              }
            }
          }
          this.getechartData();
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
                var showChart="titlekeyworddata";
                if(this.echartItem.showKeyword!=""){
                   showChart=this.echartItem.showKeyword==="titlekeyworddata"?"deskeyworddata":"titlekeyworddata";
                }
                if(obj.type!=="priceSession"&&obj.type!==showChart){
                  let currentChart = chartBoxUtil.setCharts(obj.graphType,obj,maskImage);
                  this.echartItem.echartContainer.echartsData.push(currentChart);
                }
              }else{
                if(obj.type!=="priceSession"){
                  let currentChart = chartBoxUtil.setCharts(obj.graphType,obj,maskImage);
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
//            this.titleShow=true;
            if(this.echartItem.type==="explode"){
              if(this.echartItem.showKeyword==="titlekeyworddata"){
                //标题
                this.titleShow=false;
              }else{
                this.titleShow=true;
              }
            }else{
              //新品、关键词
              this.titleShow=true;
            }
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
                    this.$set(item, "val",commonUtil.handelFormat(this.chooseType))
                  }
                })
              }
              //关键词除外
              if(paramsObj.type!="deskeyworddata"&&paramsObj.type!="titlekeyworddata"){
                ((paramsObj) => {
                  commonUtil.queryData({
                    url: "/query/single",
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
                      //重置
                      commonUtil.clearArray(paramsObj.datas.demesion);
                      commonUtil.clearArray(paramsObj.datas.measures);
                      commonUtil.clearArray(paramsObj.datas.brand);
                      commonUtil.clearArray(paramsObj.datas.rate);
                      paramsObj.datas.tips = [];
                      paramsObj.datas.comments = [];
                      if (result.length != 0) {
                        result.forEach((row, index) => {
                          switch (paramsObj.type) {
                            case "FBAdata":
                              paramsObj.datas.demesion.push("FBA");
                              paramsObj.datas.demesion.push("非FBA");
                              row[0] = _this.getFixedNumber(row[0] * 100);
                              row[1] = _this.getInt(row[1]);
                              row[2] = _this.getInt(row[2]);
                              paramsObj.datas.measures.push({name: "FBA", value: row[1]});
                              paramsObj.datas.measures.push({name: "非FBA", value: row[2]});
                              paramsObj.datas.tips.push((100 - row[0]).toFixed(2));//FBA占比
                              paramsObj.datas.tips.push(row[0]);//亚马逊占比
                              break;
                            case "branddata":
                              paramsObj.datas.demesion.push(row[0]);
                              row[1] = _this.getInt(row[1]);
                              row[2] = _this.getFixedNumber(row[2] * 100);
                              row[3] = _this.getInt(row[3]);
                              row[4] = _this.getFixedNumber(row[4] * 100);
                              paramsObj.datas.brand.push(row[1]);
                              paramsObj.datas.rate.push(row[3]);
                              paramsObj.datas.tips.push(row[2]);
                              paramsObj.datas.comments.push(row[4]);
                              break;
                            case "ratedata":
                              if (row[1] === "评分分数") {
                                row[4] = _this.getFixedNumber(row[4] * 100);
                                row[3] = _this.getInt(row[3]);
                                paramsObj.datas.demesion.push(row[0]);
                                paramsObj.datas.measures.push(row[3]);
                                paramsObj.datas.tips.push(row[4]);
                                _this.echartItem.echartContainer.showDatas.rateDatas.demesion.push(row[0]);
                                _this.echartItem.echartContainer.showDatas.rateDatas.measures.push(row[3]);
                                _this.echartItem.echartContainer.showDatas.rateDatas.tips.push(row[4]);
                              } else if (row[1] === "评论分数") {
                                row[4] = _this.getFixedNumber(row[4] * 100);
                                row[3] = _this.getInt(row[3]);
                                _this.echartItem.echartContainer.showDatas.commentDatas.demesion.push(row[0]);
                                _this.echartItem.echartContainer.showDatas.commentDatas.measures.push(row[3]);
                                _this.echartItem.echartContainer.showDatas.commentDatas.tips.push(row[4]);
                              }
                              break;
                            case "priceSession":
                              _this.priceSession = row;
                              break;
                            case "permeatedata":
                              row[2] = _this.getInt(row[2]);
                              paramsObj.datas.demesion.push(row[0]);
                              paramsObj.datas.measures.push(row[2]);
                              //渗透率
                              row[1] = _this.getFixedNumber(row[1] * 100);
                              paramsObj.datas.tips.push(row[1]);
                              break;
                            case "pricedistdata":
                              paramsObj.datas.demesion.push(row[0]);
                              row[1] = _this.getInt(row[1]);
                              paramsObj.datas.measures.push(row[1]);
                              row[2] = _this.getFixedNumber(row[2] * 100);
                              paramsObj.datas.tips.push(row[2]);
                              break;
                            default:
                              paramsObj.datas.demesion.push(row[0]);
                              row[1] = _this.getFixedNumber(row[1])
                              paramsObj.datas.measures.push(row[1]);
                          }
                        })
                      } else {
                        commonUtil.clearArray(_this.priceSession);
                        _this.showMessage.push(1);
                      }
                      if (paramsObj.type !== "priceSession") {
                        setTimeout(() => {
                          this.drawOneGraph(this.echartItem.echartContainer.echartsData[paramsObj.index], paramsObj.index,paramsObj.type);
                        }, 200)
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
          //数字保留2位小数
          getFixedNumber(num,ops){
            if(typeof (num*1)=="number"){
              return  (num*1)==0?0:(num*1).toFixed(ops||2);
            }
          },
          //数字转换整数
          getInt(number){
            if(typeof (1*number)=="number"){
              return  Math.round(number);
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
          //绘制全部画图
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
          //注册品牌监听
          setListenBrand(){
            let echartBox = this.echartItem.echartContainer.echartBox;
            for(let i=0;i<echartBox.length;i++){
              let ids=echartBox[i].id.substr(echartBox[i].id.length-1);
              if(this.echartItem.type=="news"){
                if(ids==4){
                  echartBox[i].chart.on("click",function (params) {
                    if(params.componentType == "xAxis"){
                      window.open("https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias=aps&field-keywords="+params.value)
                    }
                  })
                }
              }else if(this.echartItem.type=="explode"){
                if(ids==3){
                  echartBox[i].chart.on("click",function (params) {
                    if(params.componentType == "xAxis"){
                      window.open("https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias=aps&field-keywords="+params.value)
                    }
                  })
                }
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
            }else if(text==="产品描述"){
              this.titleShow = true;
              this.$set(chart.series[0], "data", this.echartItem.echartContainer.keywordDatas.descDatas.measures);
              this.$set(chart.classStyle, "title","产品描述-关键词词频分析");
            }else if(text==="产品标题"){
              this.titleShow = false;
              this.$set(chart.series[0], "data", this.echartItem.echartContainer.keywordDatas.titleDatas.measures);
              this.$set(chart.classStyle, "title","产品标题-关键词词频分析");
            }
            let index="";
            if(this.echartItem.type=="news"){
              switch(chart.classStyle.types){
                case "ratedata":index=1;
                  break;
              }
            }else if(this.echartItem.type=="explode"){
              switch(chart.classStyle.types){
                case "ratedata":index=5;
                  break;
                case "deskeyworddata":index=4;
                  break;
                case "titlekeyworddata":index=4;
                  break;
              }
            }else if(this.echartItem.type=="keyword"){
              switch(chart.classStyle.types){
                case "ratedata":index=2;
                  break;
              }
            }
            this.drawOneGraph(chart,index);
          },
          //绘制一张图表
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
              if(type!="one"){
                //添加
                echartBox.push({
                  id: this.echartItem.chartWrapClass + index,
                  chart: myChart
                })
              }
              if(type=="branddata"){
                myChart.on("click",function (params) {
                  if(params.componentType == "xAxis"){
                    window.open("https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias=aps&field-keywords="+params.value)
                  }
                })
              }
            }
          },
          //明细跳转
          goDetail(chart){
            if(!(chart.classStyle.types=='deskeyworddata'||chart.classStyle.types==='titlekeyworddata')){
              return;
            }
            if(this.echartItem.type==='explode'){
              if(this.titleShow){
                this.$set(chart.classStyle, "types","deskeyworddata");
              }else{
                this.$set(chart.classStyle, "types","titlekeyworddata");
              }
            }
            this.$router.push(
              {
                name: this.echartItem.keywordType,
                params:{
                  datas:{
                    type:this.echartItem.type,
                    keywordDatas:chart,
                    chooseType:this.chooseType,
                    condition:[]
                  }
                }
             })
            },
          //是否显示图表
          isShowGraph(paramsObj){
            let index=paramsObj.classStyle.index;
              this.$set(this.echartItem.showFloderData[index],"showFloder",
                !this.echartItem.showFloderData[index].showFloder);
            //绘制图表
            if(paramsObj.classStyle.type!=="priceSession"){
              setTimeout(()=>{
                this.drawOneGraph(this.echartItem.echartContainer.echartsData[paramsObj.classStyle.index],
                  paramsObj.classStyle.index);
                 this.setListenBrand();
              },200)
            }
            this.$emit("changeShow","chart");
          },
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
