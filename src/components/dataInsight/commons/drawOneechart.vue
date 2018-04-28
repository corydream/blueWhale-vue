<template>
    <div>
      <div class="echart-box"  v-show="status.echartShow">
        <div class="chart-top clearfix">
          <span class="title fl">{{echartItem.chartTitle}}</span>
        </div>
          <div class="chart">
            <div class="myChart" :class="[echartItem.chartClass+'chart',echartItem.chartClass]">
              <div :id="echartItem.chartWrapClass" class="innerChart" :class="{'name3':echartItem.typeShow==20}"></div>
            </div>
          </div>
        <Spin fix v-if="!status.echartShow"></Spin>
      </div>
    </div>
</template>
<script>
   import commonUtil from '../../../config/insight/commons/comonUse';
   import echartConfig from '../../../config/insight/commons/grphaConfig';
   export default {
        data() {
            return {
              status:{
                echartShow:true,
                rateShow:true
              }
            }
        },
        props:['echartItem'],
        methods:{
          /***绘制图表****/
          initChart(success,key){
            this.getechartData(success,key);
          },
          //配置图表绘图信息
          setchartData(currentKey){
          commonUtil.clearArray(this.echartItem.echartContainer.echartsData);
          if(currentKey){
            let obj = this.echartItem.echartContainer.echartInfo[currentKey];
            let currentChart = echartConfig.setOption(obj);
            this.echartItem.echartContainer.echartsData.push(currentChart);
          }
          },
          //获取图表数据
          getechartData(success,key){
            let _this = this;
            //配置图表数据
            this.setchartData(key);
            //配置类目站点条件
            var configUrl="";
            if(this.$parent.TableItem.type=="explode"){
              configUrl="/recommendation/chart";
            }else if(this.$parent.TableItem.type=="news"){
              if(this.$parent.TableItem.currentType=="tendency"){
                configUrl="/recommendation/new/analysis/chart";
              }else{
                configUrl="/recommendation/new/chart";
              }
            }
            commonUtil.queryData({
                    url: configUrl,
                    queryParams: {
                      asin:_this.echartItem.asin
                    },
                    callback: (res) => {
                      if(res.status==1){
                        let chart=this.echartItem.echartContainer.echartInfo[key].datas;
                        //清空
                        commonUtil.clearArray(chart.time);
                        commonUtil.clearArray(chart.demesion1);
                        commonUtil.clearArray(chart.demesion2);
                        if(key==="lineChart"){
                          res.data.timeAxis.forEach((item1,i)=>{
                            chart.time.push(item1);
                          })
                          res.data.sevenDayDatas.forEach((item2,i)=>{
                            item2=(item2*100).toFixed(2)
                            if(item2==0){
                              item2=null;
                            }
                            chart.demesion1.push(item2);
                          })
                          res.data.fourteenDayDatas.forEach((item3,i)=>{
                            item3=(item3*100).toFixed(2)
                            if(item3==0){
                              item3=null;
                            }
                            chart.demesion2.push(item3);
                          })
                        }else if(key==="lineBarChart"){
                          if(_this.echartItem.typeShow==14){
                            res.data.timeAxis.forEach((item1,i)=>{
                              if(i<14){
                                chart.time.push(item1);
                              }
                            })
                            res.data.fourteenDayDatas.forEach((item2,i)=>{
                              item2=(item2*100).toFixed(2)
                              chart.demesion2.push(item2);
                            })
                            res.data.salesVolume.forEach((item3,i)=>{
                               if(i<14){
                                 chart.demesion1.push(item3);
                               }
                            })
                          }else if(_this.echartItem.typeShow==7){
                            res.data.timeAxis.forEach((item1,i)=>{
                              if(i<7){
                                chart.time.push(item1);
                              }
                            })
                            res.data.sevenDayDatas.forEach((item2,i)=>{
                              item2=(item2*100).toFixed(2);
                              if(item2==0){
                                item2=null;
                              }
                              chart.demesion2.push(item2);
                            })
                            res.data.salesVolume.forEach((item3,i)=>{
                              if(i<7){
                                if(item3==0){
                                  item3=null;
                                }
                                chart.demesion1.push(item3);
                              }
                            })
                          }
                        }else if(key==="lineBarChart2"){
                          res.data.timeAxis.forEach((item1,i)=>{
                            chart.time.push(item1);
                          })
                          res.data.saleDatas.forEach((item3,i)=>{
                              chart.demesion1.push(item3);
                          })
                          res.data.lineDatas.forEach((item4,i)=>{
                            chart.demesion2.push(item4);
                          })
                        }
                        if(this.echartItem.echartContainer.echartBox.length>0){
                          let myChart = this.echartItem.echartContainer.echartBox[0].chart
                          myChart.clear();
                        }
                        setTimeout(()=>{
                          this.drawOneGraph(this.echartItem.echartContainer.echartsData[0]);
                        },200)
                      }
                      success&&success();
                    },
                    error:()=>{
                      let chart=this.echartItem.echartContainer.echartInfo[key].datas;
                      //清空
                      commonUtil.clearArray(chart.time);
                      commonUtil.clearArray(chart.demesion1);
                      commonUtil.clearArray(chart.demesion2);
                      _this.$parent.graphDisplay=true;
                    }
                  })
          },
          //绘制一张图片
          drawOneGraph(obj) {
            // 基于准备好的dom，初始化echarts实例
            if(obj){
              commonUtil.clearArray(this.echartItem.echartContainer.echartBox);
              let echartBox = this.echartItem.echartContainer.echartBox;
              //当前图表外层盒子
              let chart = document.getElementById(this.echartItem.chartWrapClass);
              //获取外层的盒子
              let chartsWrap = document.getElementsByClassName(this.echartItem.chartClass+"chart")[0];
              if(chart && chartsWrap){
                //初始化表格
                let myChart = this.$echarts.init(chart);
                //改变宽度
                commonUtil.resizeCharts(chart, chartsWrap.clientWidth, chartsWrap.clientHeight);
                //改动盒子的宽高
                echartBox.push({
                  id: this.echartItem.chartWrapClass,
                  chart: myChart
                });
                myChart.resize();
                myChart.setOption(obj);
              }
            }
          },
        }

    }
</script>
<style scoped lang="less">
  .echart-box{
    position: relative;
    .chart-top{
      .title,.category{
        font-size: 14px;
        line-height: 14px;
        color:#424242;
      }
    }
    .chart{
      &:hover{
        cursor: pointer !important;
      }
      .myChart .innerChart{
        height: 400px;
        &.name3{
          height: 600px;
        }
      }
    }
    .btns{
      width: 170px;
      height: 40px;
      display: block;
      position: absolute;
      right: 24px;
      top:0px;
      &:hover{
        cursor: pointer;
      }
      > span {
        &.active {
          background: #111;
          color: #fff;
          border-color:#111;
        }
        display: block;
        float: left;
        height: 40px;
        line-height: 40px;
        width: 50%;
        text-align: center;
        color: #9d9d9d;
        font-size: 14px;
        border: 1px solid #dcdcdc;
        border-top-right-radius: 5px;
        border-bottom-right-radius:5px;
        &:first-of-type {
          border-right: none;
          border-top-right-radius: 0px;
          border-bottom-right-radius:0px;
          border-top-left-radius: 5px;
          border-bottom-left-radius:5px;
        }
      }
    }
  }
</style>
