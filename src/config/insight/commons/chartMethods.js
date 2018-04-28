//图表基础配置类
import echartUtil from './echartsCommon';
export default {
  //配置图表数据
  setCharts(type,obj,maskImage){
    switch(type){
      case 1:
        return this.setChart1(obj);
      case 2:
        return this.setChart2(obj);
      case 3:
        return this.setChart3(obj);
      case 4:
        return this.setChart4(obj);
      case 5:
        return this.setChart5(obj);
      case 6:
        return this.setChart6(obj,maskImage);
      case 7:
        return this.setChart7(obj);
      case 8:
        return this.setChart8(obj);
      case 9:
        return this.setChart9(obj);
      case 10:
        return this.setChart10(obj);
      case 11:
        return this.setChart11(obj);
    }
  },
  //绘制多色柱条图-渗透率
  setChart1(obj){
    return{
      legend: {
        show: false,
        "data": obj.legend,
        "left": "center",
        "padding": 10,
        "itemGap": 150
      },
      tooltip:{
        trigger:"item",
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        }
      },
      grid: {
        "top":echartUtil.gridTop[0],
        "left": echartUtil.gridLeft
      },
      xAxis: {
        "data": obj.datas.demesion,
        "type": "category",
        //坐标轴线
        "axisTick": {
          "show": false
        },
        "axisLine": {
          lineStyle: {
            color: echartUtil.coordColor[0]
          }
        },
        //坐标与文字距离
        axisLabel: {
          textStyle: {
            color: echartUtil.fontColor[0]
          },
          interval:0
        },
      },
      yAxis: {
        "type": "value",
        //坐标轴
        "axisLine": {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        //分割网线
        splitLine: {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        //坐标与文字距离
        axisLabel: {
          margin: echartUtil.textDistance[1],
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        },
        //坐标刻度
        "axisTick": {
          "show": false
        },
        "min": 0,
      },
      series: [
        {
          "name": "",
          "type": "bar",
          "data": obj.datas.measures,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function (params) {
                return obj.datas.tips[params.dataIndex]!=0?obj.datas.tips[params.dataIndex]+"%":""
              }
            }
          },
          tooltip: {
            show:true,
            formatter: function (params, ticket, callback) {
              return "<p style='color:#424242;margin-bottom:15px'>"+params.name+"</p>"+"<p>渗透率:"+obj.datas.tips[params.dataIndex]+"%</p>"+"商品数:"+params.value
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return echartUtil.columMColors.three1[params.dataIndex]
              },
            }
          }
        }
      ],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      }
    }
  },
  //绘制单色柱条图-评分占比数
  setChart2(obj){
    return{
      tooltip: {
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        }
      },
      legend: {},
      grid: {
        "top": echartUtil.gridTop[0],
        "left": echartUtil.gridLeft
      },
      xAxis: {
        "data": obj.datas.demesion,
        "type": "category",
        "axisTick": {
          "show": false
        },
        "axisLine": {
          lineStyle: {
            color: echartUtil.coordColor[0]
          }
        },
        axisLabel: {
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        }
      },
      yAxis: {
        "type": "value",
        "axisLine": {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        //分割网线
        splitLine: {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        axisLabel: {
          margin: echartUtil.textDistance[0],
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        },
        "axisTick": {
          "show": false
        },
//              "max": 50,
        "nameTextStyle": {
          "color": "red",
          "fontSize": 14
        }
      },
      series: [{
        name: '',
        type: 'bar',
        data:obj.datas.measures,
        itemStyle: {
          normal: {
            color: echartUtil.columSColors.lOrange
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function (params) {
              return obj.datas.tips[params.dataIndex]+"%"
            }
          }
        },
        tooltip: {
          show:true,
          formatter: function (params, ticket, callback) {
            return "<p style='color:#424242;margin-bottom:15px'>"+params.name+"</p>"+"<p>占比:"+obj.datas.tips[params.dataIndex]+"%</p>"+"产品数:"+params.value
          }
        }
      }],
      classStyle:{
        btns:{
          news:{
            show:true,
            ltext:"评分分布",
            rtext:"评论分布",
            btnShow:false
          },
          explode:{
            show:true,
            ltext:"评分分布",
            rtext:"评论分布",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index

      }
    }
  },
  //绘制饼图-FBA自营
  setChart3(obj){
    return {
      tooltip: {
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        },
        formatter: function (params, ticket, callback) {
          return "<p style='color:#424242;margin-bottom:15px'>"+params.data.name+"</p>"+"<p>占比:"+obj.datas.tips[params.dataIndex]+"%</p>"+params.data.name+":"+params.data.value
        }
      },
      legend: {
        orient: 'vertical',
        right: 54,
        bottom: 65,
        data: obj.datas.demesion
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          label:{
            normal: {
              show: true,
              position:"inside",
              formatter:function(params){
                return params.percent!=0?params.name+":"+params.percent+"%":""
              },
              textStyle: {
                color: '#fff',
                fontSize: 14,
              },
              width:30,
              align:"left"

            }
          },
          data:obj.datas.measures,
          itemStyle: {
            normal: {
              color: function (params) {
                return echartUtil.columDColors.purple[params.dataIndex]
              },
            }
          }
        }
      ],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      }
    }
  },
  //绘制垂直单色柱图-价格区间
  setChart4(obj){
    return{
      tooltip: {
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        }
      },
      legend: {},
      grid: {
        "top": echartUtil.gridTop[0],
        "left": echartUtil.gridLeft
      },
      xAxis: {
        "type": "value",
        "axisLine": {
          show: false,
          lineStyle: {
            color: echartUtil.coordColor[0]
          }
        },
        splitLine: {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        "axisTick": {
          "show": false
        },
        axisLabel: {
          margin: echartUtil.textDistance[0],
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        },
        "min": 0,
//              "max": 50
      },
      yAxis: {
        data: obj.datas.demesion,
        type: "category",
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          margin: 18,
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        }
      },
      series: [{
        name: '',
        type: 'bar',
        data: obj.datas.measures,
        // data: [30,10,20,30,40],
        itemStyle: {
          normal: {
            color: echartUtil.columSColors.lOrange
          }
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: function (params) {
              return obj.datas.tips[params.dataIndex]!=0?obj.datas.tips[params.dataIndex]+"%":""
            }
          }
        },
        tooltip: {
          show:true,
          formatter: function (params, ticket, callback) {
            return "<p style='color:#424242;margin-bottom:15px'>"+params.name+"</p>"+"<p>占比率:"+obj.datas.tips[params.dataIndex]+"%</p>"+"产品数:"+params.value
          }
        }
      }],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      },
    }
  },
  //绘制双色柱条图-品牌top10
  setChart5(obj){
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        },
        formatter: function (params, ticket, callback) {
          let str="";
          if(params.length>1){
            str="<p style='color:#424242;margin-bottom:15px'>"+params[0].name + "</p>" + "<p>品牌出现数:" + params[0].value + "&nbsp;&nbsp;" + obj.datas.tips[params[0].dataIndex]+"%</p>"+
              "<p>评论数:" + params[1].value + "&nbsp;&nbsp;" +
              obj.datas.comments[params[1].dataIndex]+"%</p>";
          }else{
            if(params[0].seriesName==='品牌数'){
              str="<p style='color:#424242;margin-bottom:15px'>"+params[0].name + "</p>" + "<p>品牌出现数:"+ params[0].value + "&nbsp;&nbsp;" + obj.datas.tips[params[0].dataIndex]+"%</p>";
            }else{
              str="<p style='color:#424242;margin-bottom:15px'>"+params[0].name + "</p>" + "<p>评论数:"+ params[0].value + "&nbsp;&nbsp;" + obj.datas.comments[params[0].dataIndex]+"%</p>";
            }

          }
          return str;
        }
      },
      legend: {
        top: 20,
        data: obj.legend,
        itemGap:78
      },
      toolbox:{
        show:true,
        itemSize:15,
        right:"48",
        top:"15",
        feature: {
          dataView: {
            readOnly: false,
            iconStyle:{
              color:"#68bcf1",
              textPosition:"left"
            },
            lang:['数据视图', '返回', '刷新'],
            textareaBorderColor:"#dedede",
            textColor:"#595959",
            buttonColor:"#68bcf1",
            buttonTextColor:"#fff",
            textAlign:"center",
            // optionToContent: function (opt) {
            //   let axisData = opt.xAxis[0].data; //坐标数据
            //   let series = opt.series; //折线图数据
            //   let tdHeads = '<td  style="padding: 0 10px">品牌名称</td>'; //表头
            //   let tdBodys = ''; //数据
            //   series.forEach(function (item) {
            //     //组装表头
            //     tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
            //   });
            //   let table = `<table border="1" style="margin-left:20px;
            //    border-collapse:collapse;font-size:14px;border-color:#dedede;height:100%;width:80%;margin:0 auto;
            //    text-align:center"><tbody><tr>${tdHeads} </tr>`;
            //   for (let i = 0, l = axisData.length; i < l; i++) {
            //     for (let j = 0; j < series.length; j++) {
            //       //组装表数据
            //       tdBodys += `<td>${ series[j].data[i]}</td>`;
            //     }
            //     table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
            //     tdBodys = '';
            //   }
            //   table += '</tbody></table>';
            //   return table;
            // }
          }
        }
      },
      grid: {
        left: "center",
        top: echartUtil.gridTop[0],
        width:"85%"
      },
      xAxis: [
        {
          type: 'category',
          data: obj.datas.demesion,
          "axisTick": {
            "show": false
          },
          "axisLine": {
            lineStyle: {
              color: echartUtil.coordColor[0]
            }
          },
          axisLabel: {
            textStyle: {
              color: echartUtil.fontColor[0]
            },
            interval:0,
            formatter:function (value, index) {
              if(value.length>18){
                return value.substr(0,18)+"..."
              }else{
                return value
              }
            }
          },
          triggerEvent:true
        }
      ],
      yAxis: [
        {
          type: 'value',
          "axisLine": {
            lineStyle: {
              color: echartUtil.splitColor[0]
            }
          },
          //分割网线
          splitLine: {
            lineStyle: {
              color: echartUtil.splitColor[0]
            }
          },
          axisLabel: {
            margin: 30,
            textStyle: {
              color: echartUtil.fontColor[0]
            }
          },
          "axisTick": {
            "show": false
          },
          min: 0,
//                max: 400
        },
      ],
      series: [
        {
          name:obj.legend[0],
          type: 'bar',
          stack: '商品',
          data:obj.datas.brand,
          itemStyle: {
            normal: {
              color: echartUtil.columDColors.blue[1],
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: function (params) {
                // return obj.datas.tips[params.dataIndex]!=0?obj.datas.tips[params.dataIndex]+"%":""
                return obj.datas.tips[params.dataIndex]+"%";
              }
            }
          },
          barMinHeight:10,
          barMaxWidth:75
        },
        {
          name:obj.legend[1],
          type: 'bar',
          stack: '商品',
          data: obj.datas.rate,
          itemStyle: {
            normal: {
              color: echartUtil.columDColors.blue[0],
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function (params) {
                // return obj.datas.comments[params.dataIndex]!=0?obj.datas.comments[params.dataIndex]+"%":""
                return obj.datas.comments[params.dataIndex]+"%"
              }
            }
          },
          barMinHeight:10,
          barMaxWidth:75
        }
      ],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      }
    }
  },
  //绘制词云图-描述关键词、标题关键词
  setChart6(obj,maskImage){
    return {
      tooltip: {
        show: true,
        padding: [27],
        backgroundColor:"rgba(1,1,1,1)",
        textStyle:{
          fontSize:"14px"
        },
      },
      series: [{
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation: [0, 45,90,-45],
        maskImage: maskImage?maskImage:null,
        textPadding: 0,
        autoSize: {
          enable: true,
          minSize:10
        },
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            color: function () {
              return 'rgb('
                + [Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)]
                  .join(',') + ')';
            }
          }
        },
        top: obj.top||50,
        height:obj.height||350,
        data: obj.datas.measures
      }
      ],
      classStyle:{
        //新品
        btns:{
          news:{
            show:false,
            ltext:"产品描述",
            rtext:"产品标题",
            btnShow:true
          },
          explode:{
            show:true,
            ltext:"产品描述",
            rtext:"产品标题",
            btnShow:true
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      }
    }
  },
  //蓝色柱子渗透率
  setChart7(obj){
    return{
      legend: {
        show: false,
        data: obj.legend,
        left: "center",
        padding: 10,
        itemGap: 150
      },
      tooltip:{
        trigger:"item",
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        }
      },
      grid: {
        top: echartUtil.gridTop[0],
        left: echartUtil.gridLeft
      },
      xAxis: {
        data: obj.datas.demesion,
        type: "category",
        //坐标轴线
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: echartUtil.coordColor[0]
          }
        },
        //坐标与文字距离
        axisLabel: {
          textStyle: {
            color: echartUtil.fontColor[0]
          },
          interval:0
        },
      },
      yAxis: {
        type: "value",
        //坐标轴
        axisLine: {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        //分割网线
        splitLine: {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        //坐标与文字距离
        axisLabel: {
          margin: echartUtil.textDistance[1],
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        },
        //坐标刻度
        "axisTick": {
          "show": false
        },
        "min": 0,
      },
      series: [
        {
          name: "",
          type: "bar",
          data: obj.datas.measures,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function (params) {
                return obj.datas.tips[params.dataIndex]!=0?obj.datas.tips[params.dataIndex]+"%":""
              }
            }
          },
          tooltip: {
            show:true,
            formatter: function (params, ticket, callback) {
              return "<p style='color:#424242;margin-bottom:15px'>"+params.name+"</p>"+"<p>渗透率:"+obj.datas.tips[params.dataIndex]+"%</p>"+"商品数:"+params.value
            }
          },
          itemStyle: {
            normal: {
              color: echartUtil.columSColors.blueSky
            }
          }
        }
      ],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      }
    }
  },
  //散点图1
  setChart8(obj) {
    var markLineOpt = {
      animation: false,
      label: {
        normal: {
          formatter: '{b}: {c}',
          position:"end"
        }
      },
      lineStyle: {
        normal: {
          type: 'dash',
          color:'#cc5b58'
        }
      },
      tooltip: {
        formatter: '{b}: {c}',

      },
      data: [
        {
          name: '评分数',
          yAxis: 4
        },
        {
          name: '评论数',
          xAxis: 1000
        }
      ]
    };
    return {
      grid: {
        top: echartUtil.gridTop[0],
        left: echartUtil.gridLeft,
      },
      xAxis: {
        type : 'value',
        show:true,
        name:obj.legend[0],
        minInterval: 1,
        nameTextStyle:{
          color:echartUtil.fontColor[1]
        },
        axisLabel:{
          color:echartUtil.fontColor[1]
        },
        splitLine: {
          lineStyle: {
            color:echartUtil.splitColor[0]
          }
        },
        axisTick:{
          show:false,
          inside:true,
          interval:0
        },
        axisLine:{
          lineStyle:{
            color:echartUtil.splitColor[0]
          }
        }
      },
      yAxis: {
        type : 'value',
        name:obj.legend[1],
        nameGap:30,
        nameTextStyle:{
          color:echartUtil.fontColor[1]
        },
        axisLabel:{
          color:echartUtil.fontColor[1]
        },
        axisTick:{
          show:false,
          inside:true,
          interval:0
        },
        splitLine: {
          lineStyle: {
            color:echartUtil.splitColor[0]
          }
        },
        axisLine:{
          lineStyle:{
            color:echartUtil.splitColor[0]
          }
        },
        scale: true
      },
      tooltip : {
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        },
        showDelay : 0,
        formatter : function (params) {
          if (params.value.length > 1) {
            if(obj.type=="priceComments"){
              return  "<p>评论数:"+params.value[0]+"</p>"+"产品价格:"+params.value[1]
            }else{
              console.log("11")
              return "<p>评论数:"+params.value[0]+"</p>"+"评分数:"+params.value[1]
            }
          }
        },
        axisPointer:{
          show: true,
          snap:true,
          type : 'cross',
          lineStyle: {
            type : 'dashed',
            width : 1,
          },
          label:{
            backgroundColor:"Silver"
          }
        }
      },
      series: [
        {
          data: obj.datas.measures,
          type: 'scatter',
          symbolSize:3,
          markLine: markLineOpt,
          label: {
            emphasis: {
              show: false,
              formatter: function (param) {},
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color:'#4248ff'
            }
          },
        }],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      }
    }
  },
  //散点图2
  setChart11(obj) {
    var markLineOpt = {
      animation: false,
      label: {
        normal: {
          formatter: '{b}: {c}',
          position:"end"
        }
      },
      lineStyle: {
        normal: {
          type: 'dash',
          color:'#cc5b58'
        }
      },
      tooltip: {
        formatter: '{b}: {c}'

      },
      data: [
        {
          name: '价格',
          yAxis: 1500
        },
        {
          name: '评论数',
          xAxis: 30
        }
      ]
    };
    return {
      grid: {
        top: echartUtil.gridTop[0],
        left: echartUtil.gridLeft,
      },
      xAxis: {
        type : 'value',
        show:true,
        name:obj.legend[0],
        minInterval: 1,
        nameTextStyle:{
          color:echartUtil.fontColor[1]
        },
        axisLabel:{
          color:echartUtil.fontColor[1]
        },
        splitLine: {
          lineStyle: {
            color:echartUtil.splitColor[0]
          }
        },
        axisTick:{
          show:false,
          inside:true,
          interval:0
        },
        axisLine:{
          lineStyle:{
            color:echartUtil.splitColor[0]
          }
        }
      },
      yAxis: {
        type : 'value',
        name:obj.legend[1],
        nameTextStyle:{
          color:echartUtil.fontColor[1]
        },
        axisLabel:{
          color:echartUtil.fontColor[1]
        },
        axisTick:{
          show:false,
          inside:true,
          interval:0
        },
        splitLine: {
          lineStyle: {
            color:echartUtil.splitColor[0]
          }
        },
        axisLine:{
          lineStyle:{
            color:echartUtil.splitColor[0]
          }
        },
        scale: true,
        nameGap:30
      },
      tooltip : {
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        },
        showDelay : 0,
        formatter : function (params) {
          if (params.value.length > 1) {
            if(obj.type=="priceComments"){
              return  "<p>评论数:"+params.value[0]+"</p>"+"产品价格:"+params.value[1]
            }else{
              return "<p>评论数:"+params.value[0]+"</p>"+"评分数:"+params.value[1]
            }
          }
        },
        axisPointer:{
          show: true,
          snap:true,
          type : 'cross',
          lineStyle: {
            type : 'dashed',
            width : 1
          },
          label:{
            backgroundColor:"Silver"
          }
        }
      },
      series: [
        {
          data: obj.datas.measures,
          type: 'scatter',
          symbolSize:3,
          markLine: markLineOpt,
          label: {
            emphasis: {
              show: false,
              formatter: function (param) {},
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color:'#4248ff'
            }
          },
        }],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      }
    }
  },
  //蓝色评分
  setChart9(obj){return{
    tooltip: {
      padding: [
        10,
        12
      ],
      backgroundColor:"#fff",
      borderColor:"#cecece",
      borderWidth:1,
      textStyle:{
        color:"#faa55b"
      }
    },
    legend: {},
    grid: {
      "top": echartUtil.gridTop[0],
      "left": echartUtil.gridLeft
    },
    xAxis: {
      data: obj.datas.demesion,
      type: "category",
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: echartUtil.coordColor[0]
        }
      },
      axisLabel: {
        textStyle: {
          color: echartUtil.fontColor[0]
        }
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: echartUtil.splitColor[0]
        }
      },
      //分割网线
      splitLine: {
        lineStyle: {
          color: echartUtil.splitColor[0]
        }
      },
      axisLabel: {
        margin: echartUtil.textDistance[0],
        textStyle: {
          color: echartUtil.fontColor[0]
        }
      },
      "axisTick": {
        "show": false
      },
      "min": 0,
//              "max": 50,
      "nameTextStyle": {
        "color": "red",
        "fontSize": 14
      }
    },
    series: [{
      name: '',
      type: 'bar',
      data:obj.datas.measures,
      itemStyle: {
        normal: {
          color: echartUtil.columSColors.deepBlue
        }
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: function (params) {
            return obj.datas.tips[params.dataIndex]!=0?obj.datas.tips[params.dataIndex]+"%":""
          }
        }
      },
      tooltip: {
        show:true,
        formatter: function (params, ticket, callback) {
          return "<p style='color:#424242;margin-bottom:15px'>"+params.name+"</p>"+"<p>占比:"+obj.datas.tips[params.dataIndex]+"%</p>"+"产品数:"+params.value
        }
      }
    }],
    classStyle:{
      btns:{
        news:{
          show:true,
          ltext:"评分分布",
          rtext:"评论分布",
          btnShow:false
        },
        explode:{
          show:true,
          ltext:"评分分布",
          rtext:"评论分布",
          btnShow:false
        }
      },
      types:obj.type,
      title:obj.title,
      index:obj.index
    }
  }},
  //浅蓝价格区间
  setChart10(obj){
    return{
      tooltip: {
        padding: [
          10,
          12
        ],
        backgroundColor:"#fff",
        borderColor:"#cecece",
        borderWidth:1,
        textStyle:{
          color:"#faa55b"
        }
      },
      legend: {},
      grid: {
        top: echartUtil.gridTop[0],
        left: echartUtil.gridLeft
      },
      xAxis: {
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: echartUtil.coordColor[0]
          }
        },
        splitLine: {
          lineStyle: {
            color: echartUtil.splitColor[0]
          }
        },
        "axisTick": {
          "show": false
        },
        axisLabel: {
          margin: echartUtil.textDistance[0],
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        },
        "min": 0,
//              "max": 50
      },
      yAxis: {
        data: obj.datas.demesion,
        type: "category",
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          margin: 18,
          textStyle: {
            color: echartUtil.fontColor[0]
          }
        }
      },
      series: [{
        name: '',
        type: 'bar',
        data: obj.datas.measures,
        // data: [30,10,20,30,40],
        itemStyle: {
          normal: {
            color: echartUtil.columSColors.lBlue
          }
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: function (params) {
              return obj.datas.tips[params.dataIndex]!=0?obj.datas.tips[params.dataIndex]+"%":""
            }
          }
        },
        tooltip: {
          show:true,
          formatter: function (params, ticket, callback) {
            return "<p style='color:#424242;margin-bottom:15px'>"+params.name+"</p>"+"<p>占比率:"+obj.datas.tips[params.dataIndex]+"%</p>"+"产品数:"+params.value
          }
        }
      }],
      classStyle:{
        btns:{
          news:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          },
          explode:{
            show:false,
            ltext:"",
            rtext:"",
            btnShow:false
          }
        },
        types:obj.type,
        title:obj.title,
        index:obj.index
      },
    }
  },
}
