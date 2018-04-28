const config={
  //图表配置
  //柱子颜色
  //多种颜色
  columMColors: {
    bar:['#f88d49','#3fb27e','#5182e4','#f5c237'],
    line:['#01a2ff','#8eb11e','#f7c002'],
    barLine:['#5b9bd5','#ed8035'],
    lineStack:['#8fc31f','#fba933','#4aa5e9']
  },
  //单色
  columSColors: {
    pipe:[]
  },
  //两种颜色
  columDColors: {
    pipe:[]
  },
  //文字颜色
  fontColor: {
    bar:['#424242'],
    line:['#5d5d5d']
  },
  fontSize:[15],
  //网格线颜色
  splitColor: ["#ebebeb"],
  //坐标轴颜色
  coordColor:['#999999','d2d2d2'],
  //文字距离坐标轴
  textDistance:[13,20,36],
  //标题距离
  titleTop:[23],
  titleLeft:[48],
  //显示区域距离
  gridLeft:[80],
  gridTop:[130,50],
}
export default {
  //图表配置对象
  chartOption:{
    //折线图
    setLineChart(obj){
      return {
        tooltip: {
          trigger: 'axis',
          // formatter: '{b} <br/> {a0}: {c0}% <br/>'+'{a1}: {c1}%'
          formatter: function (params, ticket, callback) {
            let str="";
            if(params.length>1){
              let value1=params[0].value==null?0:params[0].value;
              let value2=params[1].value==null?0:params[1].value;
              str=params[0].name + "<br/>" + '<span style="display:inline-block;width:10px;height:10px;border-radius:100%;margin-right:5px;background-color:'+ params[0].color+'"></span>'+params[0].seriesName + ":"+value1+"%"+"<br/>"
                +'<span style="display:inline-block;width:10px;height:10px;border-radius:100%;margin-right:5px;background-color:'+ params[1].color+'"></span>'+params[1].seriesName+ ":"+value2+"%"
            }else{
              let value1=params[0].value==null?0:params[0].value;
              str=params[0].name+'<br/>'+'<span style="display:inline-block;width:10px;height:10px;border-radius:100%;margin-right:5px;background-color:'+ params[0].color+'"></span>'+params[0].seriesName + ":"+value1+"%"
            }
            return str;
          }
        },
        legend: {
          data:obj.legend,
          itemGap:58,
          top:20
        },
        grid: {
          left:'center',
          width:'80%',
          bottom: 20,
          top:60,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data:obj.datas.time,
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: config.fontColor.line[0]
            },
            margin:10,
            interval: 0
          },
          axisTick: {
            "show": false
          },
          axisLine: {
            lineStyle: {
              color: config.coordColor[0]
            }
          }
        },
        yAxis: {
          name:"增长率",
          type: 'value',
          axisTick: {
            "show": false
          },
          nameTextStyle:{
            color: config.fontColor.line[0]
          },
          axisLabel: {
            textStyle: {
              color: config.fontColor.line[0]
            },
            margin:20
          },
          axisLine: {
            lineStyle: {
              color: config.coordColor[0]
            }
          }
        },
        series: [
          {
            name:'7天销量增长率',
            type:'line',
            data:obj.datas.demesion1,
            label:{
              normal:{
                formatter: '{b}: {c}%'
              }
            }
          },
          {
            name:'14天销量增长率',
            type:'line',
            data:obj.datas.demesion2,
            label:{
              normal:{
                formatter: '{b}: {c}%'
              }
            }
          }
        ],
        color:config.columMColors.line
      }
    },
    //柱形图
    setBarChart(obj){
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
          },
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:obj.legend,
          itemGap:30
        },
        grid: {
          "top": config.gridTop[1],
          "left": config.gridLeft[0],
          "bottom":'100',
          "width":"90%"
        },
        xAxis: {
          "data": obj.datas.categoryName,
          "type": "category",
          "axisTick": {
            "show": false
          },
          "axisLine": {
            lineStyle: {
              color: config.coordColor[0]
            }
          },
          axisLabel: {
            textStyle: {
              color: config.fontColor.bar[0]
            },
            interval: 0,
            rotate:20
          }
        },
        yAxis: {
          "type": "value",
          scale:true,
          "axisLine": {
            lineStyle: {
              color: config.splitColor[0]
            }
          },
          //分割网线
          splitLine: {
            lineStyle: {
              color: config.splitColor[0]
            }
          },
          axisLabel: {
            margin: config.textDistance[0],
            textStyle: {
              color: config.fontColor.bar[0]
            }
          },
          "axisTick": {
            "show": false
          },
          "min": 0,
          "nameTextStyle": {
            "color": "red",
            "fontSize": 14
          }
        },
        series: [
          {
            name: obj.legend[0].name,
            type: 'bar',
            stack: '总排名',
            data:obj.datas.demesion0,
            barMinHeight:2,
            barMaxWidth:65,
            barWidth:"60%"
          },
          {
          name: obj.legend[1].name,
          type: 'bar',
          stack: '总排名',
          data:obj.datas.demesion1,
          barMinHeight:2,
          barMaxWidth:65,
         barWidth:"60%"
        },
          {
            name: obj.legend[2].name,
            type: 'bar',
            stack: '总排名',
            data:obj.datas.demesion2,
            barMinHeight:2,
            barMaxWidth:65,
            barWidth:"60%"
          },
          {
            name: obj.legend[3].name,
            type: 'bar',
            stack: '总排名',
            data:obj.datas.demesion3,
            barMinHeight:2,
            barMaxWidth:65,
            barWidth:"60%"
          },
          {
            name: obj.legend[4].name,
            type: 'bar',
            stack: '总排名',
            data:obj.datas.demesion4,
            barMinHeight:2,
            barMaxWidth:65,
            barWidth:"60%"
          },
        ],
        color:config.columMColors.bar,
        classStyle:{
          btns:{},
          types:obj.type,
          title:obj.title,
        }
      }
    },
    //折线柱状混合
    setLineColumnChart(obj){
      return {
        // Make gradient line here
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: function (params, ticket, callback) {
            let str="";
            if(params.length>1){
              let value1=params[0].value==null?0:params[0].value;
              let value2=params[1].value==null?0:params[1].value;
              str=params[0].name
              + "<br/>" +'<span style="display:inline-block;width:10px;height:10px;border-radius:100%;margin-right:5px;background-color:'+ params[0].color+'"></span>'+ params[0].seriesName + ":"+value1+"<br/>"
                +'<span style="display:inline-block;width:10px;height:10px;border-radius:100%;margin-right:5px;background-color:'+ params[1].color+'"></span>'+ params[1].seriesName +":"+value2+"%"
            }else{
              let value1=params[0].value==null?0:params[0].value;
                 if(params[0].seriesName=="增长率"){
                   str=params[0].name+'<br/>'+'<span style="display:inline-block;width:10px;height:10px;border-radius:100%;margin-right:5px;background-color:'+ params[0].color+'"></span>'+params[0].seriesName + ":"+value1+"%"
                 }else{
                   str=params[0].name+'<br/>'+'<span style="display:inline-block;width:10px;height:10px;border-radius:100%;margin-right:5px;background-color:'+ params[0].color+'"></span>'+params[0].seriesName + ":"+value1
                 }

            }
            return str;
          }
        },
        grid: {
          left:'center',
          width:'80%'
        },
        legend: {
          data:obj.legend,
          itemGap:58,
          top:20
        },
        xAxis: [
          {
            type: 'category',
            data: obj.datas.time,
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: config.fontColor.line[0]
              },
              margin:18,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: config.coordColor[0]
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name:"销量",
            nameTextStyle:{
              color: config.fontColor.line[0],
              padding:[0,20,0,0]
            },
            nameGap:10,
            axisTick: {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: config.fontColor.line[0]
              },
              margin:20
            },
            axisLine: {
              lineStyle: {
                color: config.coordColor[0]
              }
            }
          },
          {
            type: 'value',
            name:"增长率",
            nameTextStyle:{
              color: config.fontColor.line[0],
              padding:[0,0,0,20]
            },
            nameGap:10,
            axisTick: {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: config.fontColor.line[0]
              },
              margin:20
            },
            axisLine: {
              lineStyle: {
                color: config.coordColor[0]
              }
            }
          }
        ],
        series: [
          {
            name:obj.legend[0].name,
            type:'bar',
            data:obj.datas.demesion1,
            barMaxWidth:60,
            barMinHeight:2
          },
          {
            name:obj.legend[1].name,
            type:'line',
            yAxisIndex: 1,
            data:obj.datas.demesion2,
            label:{
              normal:{
                formatter: '{b}: {c}%'
              }
            }
          },
        ],
        color: config.columMColors.barLine
      }
    },
    //散点图折线混合
    setLineColumnChart2(obj){
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data:['销量','增长度']
        },
        xAxis: [
          {
            type: 'category',
            data: obj.datas.time,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '销量',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '增长度',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name:'销量',
            type:'scatter',
            data:obj.datas.demesion1
          },
          {
            name:'增长度',
            type:'line',
            data:obj.datas.demesion2
          }

        ]
      }
    },
    //折线堆叠图
    setLineStackChart(obj){
      let datas=[];
      let i=0;
      for(let currentKey in obj.measures){
        if(obj.measures[currentKey].length>0){
          let item={
            type:'line',
            data:obj.measures[currentKey],
            label: {
              normal: {
                show: true
              }
            },
          }
          if(obj.legend.datas.length>0){
            item.name=obj.legend.datas[i];
          }
          datas.push(item);
        }
        i++;
      }
      let setlegend={
        itemGap:obj.legend.itemGap,
        top:obj.legend.top||5
      };
      if(obj.legend.datas.length>0){
        setlegend.data=obj.legend.datas;
      }
      let backObj={
        title: {
          text: obj.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend:setlegend,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: obj.demession,
          axisLabel: {
            textStyle: {
              color: config.fontColor.line[0]
            },
            margin:20,
            interval: obj.isInterval||0,
            align:"center"
          },
          axisTick: {
            "show": false
          },
          axisLine: {
            lineStyle: {
              color: config.coordColor[1]
            }
          }
        },
        yAxis: [
          {
            name:obj.yAxisName?obj.yAxisName:"",
            type: 'value',
            inverse:obj.yAxisInverse?true:false,
            axisTick: {
              "show": false
            },
            nameTextStyle:{
              color: config.fontColor.line[0],
              align:"right"
            },
            nameLocation:"start",
            axisLabel: {
              textStyle: {
                color: config.fontColor.line[0]
              },
              margin:20
            },
            axisLine: {
              lineStyle: {
                color: config.coordColor[1]
              }
            },
            minInterval: obj.isInt||0
          },
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: config.coordColor[1]
              }
            },

          }
        ],
        series:datas,
        color:config.columMColors.lineStack
      }
      return backObj;
    }
  },
  setOption(obj){
    if(obj){
      switch (obj.type){
        case "lineChart":
          return this.chartOption.setLineChart(obj);
        case "barChart":
          return this.chartOption.setBarChart(obj);
        case "lineBarChart":
          return this.chartOption.setLineColumnChart(obj);
        case "lineBarChart2":
          return this.chartOption.setLineColumnChart2(obj);
        case "lineStackChart":
          return this.chartOption.setLineStackChart(obj);
      }

    }
  }
}
