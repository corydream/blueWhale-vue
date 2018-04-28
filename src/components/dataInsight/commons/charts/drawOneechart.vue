<template>
    <div>
      <div class="echart-box"  v-show="status.echartShow">
        <div class="chart-top clearfix" v-if="echartItem.titleShow">
          <span class="title fl">{{echartItem.chartTitle}}</span>
        </div>
          <div class="chart">
            <div class="myChart" :class="[echartItem.chartClass+'chart',echartItem.chartClass]">
              <div :id="echartItem.chartWrapClass" class="innerChart"></div>
            </div>
          </div>
        <Spin fix v-if="!status.echartShow"></Spin>
      </div>
    </div>
</template>
<script>
   import commonUtil from '../../../../config/insight/commons/comonUse';
   import echartConfig from '../../../../config/insight/commons/grphaConfig';
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
          initChart(key){
            let obj = this.echartItem.echartContainer.echartInfo[key];
             if(obj.demession.length==0){
               if(this.echartItem.echartContainer.echartBox.length>0){
                 this.echartItem.echartContainer.echartBox[0].chart.clear();
               }
             }else{
               this.setchartData(key);//配置图表数据
               //绘制图表
               setTimeout(()=>{
                 this.drawOneGraph(this.echartItem.echartContainer.echartsData[0]);
               },200);
             }
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
    width: 80%;
    margin: 0 auto;
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
      }
    }
  }
</style>
