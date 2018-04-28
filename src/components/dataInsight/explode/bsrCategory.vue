<template>
  <div>
    <div class="bsrCategory1">
      <div class="bsrTop">
        <span class="title">类目热度分布</span>
        <div class="showFloder">
          <div class="floder" v-show="bsrItem.categoryshowFloder"
               @click="isShowGraph"
               :class="{flod:bsrItem.categoryshowFloder}">
            <span class="floder-text">收起</span>
            <Icon type="chevron-up" class="flder-icon"></Icon>
          </div>
          <div class="floder"  v-if="!bsrItem.categoryshowFloder"
               @click="isShowGraph"
               :class="{flod:bsrItem.categoryshowFloder}">
            <span class="floder-text">展开</span>
            <Icon type="chevron-down"class="flder-icon"></Icon>
          </div>
        </div>
        <Tooltip placement="top" class="permeateTips newsPermeate">
          <i class="fa fa-question-circle-o myhelp"></i>
          <div slot="content" class="mytipsContent">
            <p>{{chartList.helptips}}</p>
          </div>
        </Tooltip>
      </div>
      <div class="bsrlist" v-show="bsrItem.categoryshowFloder">
        <Table :columns="bsrColumn"
               :data="bsrDataList"
               v-if="btnShow"
               height="330"
               @on-sort-change="sortAll"
               :loading="tableLoading"
        ></Table>
        <Switch v-model="tableLoading"></Switch>
        <div class="myChart" :class="chartList.chartClass+'chart'" v-if="!btnShow">
          <div :id="chartList.chartWrapClass" class="innerChart"></div>
        </div>
        <div class="btns">
          <span v-bind:class="{active:btnShow}" @click="changeChart('报表')">报表</span>
          <span v-bind:class="{active:!btnShow}" @click="changeChart('图表')">图表</span>
        </div>
        <div class="graphTendency" v-if="showTendency" ref="graphChart">
          <div class="myChart">
            <div id="graphTendencyChart" class="innerChart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echartConfig from '../../../config/insight/commons/grphaConfig';
  import commonUtil from '../../../config/insight/commons/comonUse';
  export default {
    data() {
      return {
        bsrColumn: [
          {
            title:'四级类目',
            key: 'categoryName',
//            renderHeader:(h, params)=>{
//              return h('p',
//                {
//                  attrs:{
//                    class:"options",
//                    style:"line-height:21px;height:21px;"
//                  },
//                  on: {
//                    click:this.showRandTendency
//                  }
//                },
//                [
//                  h('span', {
//                    attrs: {
//                      style:"margin-right:13px"
//                    },
//                    domProps: {
//                      innerText: "四级类目"
//                    }
//                  }),
//                  h('i', {
//                    attrs: {
//                      class: "fa fa-list-ul",
//                      style:"float:right;font-size:14px;cursor:pointer;line-height: 21px;color:#79c1ee"
//                    }
//                  }),
//                ]
//              )
//            }
          },
          {
            title: '1名排名',
            key: 'top1',
            sortable:true,
            render:(h, params) => {
              let rankNumber=params.row[params.column.key];
              return rankNumber?this.splitNumber(rankNumber):"-"
            }
          },
          {
            title: '25名排名',
            key: 'top25',
            sortable:true,
            render:(h, params) => {
              let rankNumber=params.row[params.column.key];
              return rankNumber?this.splitNumber(rankNumber):"-"
            }
          },
          {
            title: '50名排名',
            key: 'top50',
            sortable:true,
            render:(h, params) => {
              let rankNumber=params.row[params.column.key];
              return rankNumber?this.splitNumber(rankNumber):'-'
            }
          },
          {
            title: '75名排名',
            key: 'top75',
            sortable:true,
            render:(h, params) => {
              let rankNumber=params.row[params.column.key];
              return rankNumber?this.splitNumber(rankNumber):'-'
            }
          },
          {
            title: '100名排名或最后一名',
            key: 'top100',
            sortable:true,
            render:(h, params) => {
              let rankNumber=params.row[params.column.key];
              return  rankNumber?this.splitNumber(rankNumber):"-"
            },
            width:'204px'
          }
        ],
        bsrDataList: [],
        chartList:{
          echartContainer:{
            echartInfo:{
              barChart: {
                measures: [],
                demesion: [],
                condition: [],
                legend:[
                  {name:'1名排名',icon: 'rect'},
                  {name:'25名排名',icon: 'rect'},
                  {name:'50名排名',icon: 'rect'},
                  {name:'75名排名',icon: 'rect'},
                  {name:'100名排名或最后一名',icon: 'rect'}
                ],//图例
                datas:{
                  demesion0:[],
                  demesion1:[],
                  demesion2:[],
                  demesion3:[],
                  demesion4:[],
                  categoryName:[]
                },
                type:"barChart",
                title:"",
                modelID:194,
                cid:194,
                pageSize:100,
                index:1,
                height:328,
              }
            },
            echartsData:[],
            echartBox:[]
          },
          chartWrapClass:"bsrCategory",
          chartClass:"mybsrCategory",
          helptips:"类目热度分析:基于当前小类目的销售排名第#1、#25、#50、#75、#100位产品在最高级类目的BSR排名，来分析该小类目的产品热度；可以评估当前次级类目在整个亚马逊的销量表现，挖掘同一小类目下的产品热度分布和热度变化，以及通过类比不同类目下的5个BSR排名数据来进行跨类目热度分析"
        },
        btnShow:true,
        defaultArray:[],
        tableLoading:true,
        showTendency:false
      }
    },
    created(){
      this.getTableList();
    },
    mounted(){},
    props:['chooseType','bsrItem'],
    methods:{
      //自定义排序
      sortAll(column){
        let key=column.key;
        if(column.order=="desc"){
          //降序
          function sortRule(a,b) {
            return a[key] > b[key];//小到大
          }
          this.bsrDataList.sort(sortRule);
        }else if(column.order=="asc"){
          //升序
          function sortRule(a,b) {
            return a[key]<b[key] ;//大到小
          }
          this.bsrDataList.sort(sortRule);
        }else{
          //正常
          commonUtil.clearArray(this.bsrDataList);
          this.defaultArray.forEach((item)=>{
            this.bsrDataList.push(item);
          })
        }
      },
      categoryShow(){
        let categoryArray=this.$store.state.categoryArray;
        let stateStr=this.isNextCategoryNull(categoryArray,this.chooseType);
        switch (stateStr){
          case 1:
            return "二级类目";
          case 2:
            return "三级类目";
          case 3:
            return "四级类目";
          case 4:
            return "五级类目";
          case 5:
            return "六级类目";
          case 6:
            return "七级类目";
          case 7:
            return "八级类目";
          case 8:
            return "九级类目";
          case 9:
            return "十级类目";
          case 10:
            return "十一级类目";
          default:
            return "无类目";
        }
      },
      //判断下一级类目是否有数据
      isNextCategoryNull(categoryArray,chooseArray){
        for(let i=0;i<categoryArray.length;i++)
        {
            if(categoryArray[i].value==chooseArray[0])
            {

              return this.loopCategory(categoryArray[i].children,chooseArray,1);
            }
        }

      },
      loopCategory(children,chooseArray,level) {
          if(children.length==0)
          {
            return 0;
          }else {
            let find=false;
            for(let i=0;i<children.length;i++)
            {
                if(children[i].value==chooseArray[level])
                {
                  find=true;
                  return this.loopCategory(children[i].children,chooseArray,level+1);
                }

            }
            if(!find)
            {
              return level;
            }
          }
      },
      //获取表格数据
      getTableList(){
        let _this=this;
        this.tableLoading=true;
        let prevCategory="";
        let categoryCount=this.chooseType.length;
        this.$set(this.bsrColumn[0],'title',this.categoryShow(categoryCount));
        prevCategory=this.chooseType[categoryCount-1];
        commonUtil.clearArray(_this.bsrDataList);
        commonUtil.clearArray(_this.defaultArray);
        commonUtil.queryData({
          url:"/di/category/degree/hot",
          queryParams:{
            type :categoryCount+1,//类目级别数
            category: prevCategory,//上一个类目
            whoteCategory:commonUtil.handelFormat(this.chooseType)
          },
          callback:(res)=>{
            _this.tableLoading=false;
            let result=res.data;
            commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion0)//1
            commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion1)//25
            commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion2)//50
            commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion3)//75
            commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion4)//100
            commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.categoryName)
            if(res.status==1){
              if(result.length>0){
                result.forEach((row,i)=>{
                  _this.defaultArray.push({
                    categoryName:row.category,
                    top1:row.rankNumFirst?row.rankNumFirst:null,
                    top25: row.rankNumTwentyFive?row.rankNumTwentyFive:null,
                    top50: row.rankNumFifty?row.rankNumFifty:null,
                    top75: row.rankNumSeventyFive?row.rankNumSeventyFive:null,
                    top100: row.ranknumOneHundred?row.ranknumOneHundred:null
                  })
                  _this.bsrDataList.push({
                    categoryName:row.category,
                    top1:row.rankNumFirst?row.rankNumFirst:null,
                    top25: row.rankNumTwentyFive?row.rankNumTwentyFive:null,
                    top50: row.rankNumFifty?row.rankNumFifty:null,
                    top75: row.rankNumSeventyFive?row.rankNumSeventyFive:null,
                    top100: row.ranknumOneHundred?row.ranknumOneHundred:null
                  })
                  //图表的数据
                  _this.chartList.echartContainer.echartInfo.barChart.datas.categoryName.push(row.category)
                  _this.chartList.echartContainer.echartInfo.barChart.datas.demesion0.push(row.rankNumFirst?row.rankNumFirst:null)
                  _this.chartList.echartContainer.echartInfo.barChart.datas.demesion1.push(row.rankNumTwentyFive?row.rankNumTwentyFive:null)
                  _this.chartList.echartContainer.echartInfo.barChart.datas.demesion2.push(row.rankNumFifty?row.rankNumFifty:null)
                  _this.chartList.echartContainer.echartInfo.barChart.datas.demesion3.push(row.rankNumSeventyFive?row.rankNumSeventyFive:null)
                  _this.chartList.echartContainer.echartInfo.barChart.datas.demesion4.push(row.ranknumOneHundred?row.ranknumOneHundred:null)
                })
                if(!this.btnShow){
                  this.changeChart("图表");
                }
              }else{
                commonUtil.clearArray(_this.bsrDataList);
                commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion0)//0
                commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion1)//25
                commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion2)//50
                commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion3)//75
                commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.demesion4)//100
                commonUtil.clearArray(_this.chartList.echartContainer.echartInfo.barChart.datas.categoryName);
                if(this.chartList.echartContainer.echartBox.length>0){
                  let myChart = this.chartList.echartContainer.echartBox[0].chart
                  myChart.clear();
                }
              }

            }
          },
          error:()=>{
            _this.tableLoading=false;
          }
        })


      },
      //数字分割
      splitNumber(value){
        value = value.toString();
        if (value.length <= 3) {
          return value;
        } else {
          return this.splitNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
        }
      },
      //配置图表绘图信息
      setchartData(currentKey){
        commonUtil.clearArray(this.chartList.echartContainer.echartsData);
        if(currentKey){
          let obj = this.chartList.echartContainer.echartInfo[currentKey];
          let currentChart = echartConfig.setOption(obj);
          this.chartList.echartContainer.echartsData.push(currentChart);
        }else{
          for (let key in this.chartList.echartContainer.echartInfo){
            let obj = this.chartList.echartContainer.echartInfo[key];
            let currentChart = echartConfig.setOption(obj);
            this.chartList.echartContainer.echartsData.push(currentChart);
          }
        }
      },
      //绘制一张图片
      drawOneGraph(obj) {
        // 基于准备好的dom，初始化echarts实例
        if(obj){
          commonUtil.clearArray(this.chartList.echartContainer.echartBox);
          let echartBox = this.chartList.echartContainer.echartBox;
          //当前图表外层盒子
          let chart = document.getElementById(this.chartList.chartWrapClass);
          //获取外层的盒子
          let chartsWrap = document.getElementsByClassName(this.chartList.chartClass+"chart")[0];
          if(chart && chartsWrap){
            //初始化表格
            let myChart = this.$echarts.init(chart);
            //改变宽度
            commonUtil.resizeCharts(chart, chartsWrap.clientWidth, chartsWrap.clientHeight);
            //改动盒子的宽高
            echartBox.push({
              id: this.chartList.chartWrapClass,
              chart: myChart
            });
            myChart.resize();
            myChart.setOption(obj);
          }
        }
      },
      //切换图表
      changeChart(text) {
        let type="";
        if (text === "报表") {
          this.btnShow = true;
        } else if (text === "图表") {
          this.btnShow = false;
          type="barChart";
        }
        this.setchartData(type);
        setTimeout(()=>{
          this.drawOneGraph(this.chartList.echartContainer.echartsData[0]);
        },200)
      },
      isShowGraph(){
        this.$set(this.bsrItem,"categoryshowFloder",!this.bsrItem.categoryshowFloder)
        this.$emit("changeShow","bsr");
      },
      //展示趋势图
      showRandTendency(){
//         this.showTendency=!this.showTendency
      }
    }
  }
</script>
<style lang="less" scoped>
@import "../../../style/insight/bsrHotCategory";
</style>
