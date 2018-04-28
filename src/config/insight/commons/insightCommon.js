import keyapi from '../../../data/tempApi';
//图表基础配置类
import echartUtil from './echartsCommon';
export default {
    //参数查询
    queryData(obj){
     //url,queryParams,callback,method,
     $.ajax({
       type: obj.method||"post",
       url: (obj.keyApi||keyapi) + obj.url,
       data:obj.queryParams||[],
       timeout:"5*60*1000",
       xhrFields: {
         withCredentials: true
       },
       headers:obj.headers||{},
       dataType:obj.dataType||"json",
       success: function (res) {
         if (res.status==101) {
           //重新登录
           location.href = "https://data.banggood.cn";
         }else if(res.status==0){
           obj.error&&obj.error(res);
         }else{
           obj.callback(res)&&obj.callback(res);
         }
       },
       complete:function (res) {
         obj.complete&&obj.complete(res);
       }
     })
   },
    //保存类目配置
    saveCategory(obj){
      //paramName,paramType,paramData
      this.queryData({
        url:"/di/common/save/colunmOrder",
        queryParams:{
          paramName:obj.paramName,
          type:obj.type,
          paramData:JSON.stringify(obj.paramData),
        },
        callback:(res)=>{}
      })
    },
    //获取配置
    getRemoteCategory(obj,success){
      this.queryData({
        url:"/di/common/get/colunmOrder",
        queryParams:{
          type:obj.type,
          paramName:obj.paramName
        },
        callback:(res)=>{
          if(res.data){
            success&&success(JSON.parse(res.data));
          }else{
            success&&success([""]);
          }
        }
      })
    },
    //本地存储类目
    saveCategoryLocal(category,tabName,pageType){
    let type=""
    if(pageType=="news"){
      if(tabName=="name1"){
        type=67
      }else if(tabName=="name4") {
        type=68
      }
    }else if(pageType=="explode"){
      if(tabName=="name1"){
        type=69
      }else if(tabName=="name4") {
        type=70
      }
    }
    type="category"+type;
    console.log(type);
    console.log("保存");
    window.sessionStorage.setItem(type,JSON.stringify(category));
  },
    getCategoryLocal(success,tabName,type){
    let saveType=""
    if(type=="news"){
      if(tabName=="name1"){
        saveType=67
      }else if(tabName=="name4") {
        saveType=68
      }
    }else if(type=="explode"){
      if(tabName=="name1"){
        saveType=69
      }else if(tabName=="name4") {
        saveType=70
      }
    }
    saveType="category"+saveType;
    if(window.sessionStorage.getItem(saveType)){
      success&&success(JSON.parse(window.sessionStorage.getItem(saveType)));
    }else{
      success&&success([""]);
    }
  },   //清空数据
    //图表模块
    //设置图表的查询条件
    setConditions(type,arr){
       let rArr=[];
       if(type==="measures"||type==="fba"){
           arr.forEach((obj,index)=>{
               rArr.push({
                   col : obj.col,
                   agg : obj.agg||"SUM",
                   sortType : obj.sortType||"DEFAULT",
                   isDistinct : false,
                   isPercent : obj.isPercent?obj.isPercent:false,
                   chinese : obj.chinese,
                   uuid :obj.uuid,
                   scale:obj.scale?obj.scale:""
               })
           })
       }else if(type==="demesion"){
           arr.forEach((obj,index)=>{
               rArr.push({
                   col : obj.col,
                   sortType : obj.sortType||"DEFAULT",
                   chinese : obj.chinese,
                   isMaxMin : obj.isMaxMin||true,
                   uuid : obj.uuid,
                   columnType:obj.columnType||""
               })
           })
       }
       return rArr
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
   //图表颜色处理
    handelColor(){
       return {
         normal: {
           color: function () {
             var cor = 'rgb(' + [
               Math.round(Math.random() * 0),
               Math.round(Math.random() * 0),
               Math.round(Math.random() * 255)
             ].join(',') + ')';
             console.log("yanse" + col);
             return cor;
           }
         }
       };
   },
   //判断是否是正整数
    positiveInteger(num){
    return /^[1-9]*[1-9][0-9]*$/.test(num);
   },
    //非空处理
    handelResult(obj) {
      if(obj instanceof Array){
        obj=obj.length!=0?obj:[]
      }else if(obj instanceof Object){
        obj=obj?obj:{}
      }
      return obj;
    },
    //日期格式处理
   formatDate(date) {
     if(date instanceof Date){
       const y = date.getFullYear();
       let m = date.getMonth() + 1;
       m = m < 10 ? '0' + m : m;
       let d = date.getDate();
       d = d < 10 ? ('0' + d) : d;
       return y + '-' + m + '-' + d;
     }else{
       return "无"
     }
   },
   //日期时间格式处理
   formatDateTime(date) {
    if(date instanceof Date){
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h=date.getHours();
      h = h < 10 ? '0' + h : h;
      let min=date.getMinutes();
      min = min < 10 ? '0' + min : min;
      let s=date.getSeconds();
      s = s < 10 ? '0' + s : s;
      return y + '-' + m + '-' + d+" "+h+":"+min+":"+s;
    }else{
      return "无"
    }
  },
   //获取昨天的日期
    formatYesterDay(){
    //昨天的时间
    let date = new Date();
    date.setTime(date.getTime()-24*60*60*1000);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
     return y + '年' + m + '月' + d+"日";
  },
   //获取明天的日期
   formatTomorrow(str){
     //2017-12-20 10:41:02
     //今天的时间
     let date=new Date(str);
     date.setTime(date.getTime()+24*60*60*1000);
     const y = date.getFullYear();
     let m = date.getMonth() + 1;
     m = m < 10 ? '0' + m : m;
     let d = date.getDate();
     d = d < 10 ? ('0' + d) : d;
     return y + '-' + m + '-'+d;
   },
   //日期-年月日
   formateDateYMD(str){
    let date=new Date(str);
    if(date instanceof Date){
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '年' + m + '月' + d+"日";
    }else{
      return "无"
    }
  },
    //带格式
   formatWithDate(date, fmt){
        if(date instanceof  Date){
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },
   //字符串格式处理
   handelFormat(arr) {
      if(arr instanceof Array){
          return arr&&arr.join(">").toLowerCase();
      }
   },
   //清空数据
   clearArray(arr) {
        if(arr instanceof Array){
            arr.splice(0,arr.length);
        }
   },
  //表格自适应宽高
   setTableWidth(el,vue){
     let wrapper = this.getDom(el.wrapper,vue);
     let tables = this.getDom(el.tables,vue);
     if(wrapper!=null&&tables!=null){
       this.resizeCharts(tables, wrapper.clientWidth-el.padding);
     }
   },
  //图表自适应
  chartResize(echartBox,el){
    if (echartBox && echartBox.length != 0) {
      echartBox.forEach((item, index) => {
        //获取外层的盒子
        let chartsWrap = document.getElementsByClassName(el.wrapper + index)[0];
        let chart = document.getElementById(el.chart + index);
        if(chart&&chartsWrap){
          //改变宽度
          this.resizeCharts(chart, chartsWrap.offsetWidth, chartsWrap.offsetHeight);
          item.chart.resize();
        }
      })
    }
  },
  //共用方法
  //vue获取dom元素
  getDom(el,vue){
    return vue.$el.querySelector(el)?vue.$el.querySelector(el):null;
  },
  //自适应宽高
  resizeCharts(element, w, h) {
    if(element){
      if (w) {
        element.style.width = w + "px";
      }
      if (h) {
        element.style.height = h + "px";
      }
    }
  },
   //数组去重
   filterRepeat(arr){
    var res = [];
    var json = {};
    for(var i = 0; i < arr.length; i++){
      if(!json[arr[i]]){
        res.push(arr[i]);
        json[arr[i]] = 1;
      }
    }
    return res;
  },
   //获取uuid
   getUUID(chinese,metas){
    for(var key in metas){
      let obj=metas[key];
      if(obj.chinese===chinese){
        return obj.uuid;
      }
    }
  },
  //数值
  setMessure(obj, item) {
    obj.uuid = item.uuid;
    obj.col = item.col;
    obj.chinese = item.chinese;
    obj.columnType = "NUMBER";
    obj.demesion = item.dimension;
    obj.sortType = item.sortType;
    obj.agg = item.agg ? item.agg[0] : "";
  },
  //维度
  setDimension(obj, item) {
    obj.uuid = item.uuid;
    obj.col = item.col;
    obj.chinese = item.chinese;
    obj.columnType = item.columnType;
    obj.demesion = item.dimension;
    obj.sortType = item.sortType;
    obj.isMaxMin = false//默认false
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
  //处理类目层级
  handelCategory(arr){
    if(arr&&arr.length>0){
      switch(arr.length){
        case 1:
          return arr[0].toLowerCase();
        case 2:
          return arr[0].toLowerCase();
        case 3:
          let str1=arr[0]+">"+arr[1];
          return [arr[0],str1].join(",").toLowerCase();
        case 4:
          let a=arr[0]+">"+arr[1];
          let b=arr[0]+">"+arr[1]+">"+arr[2];
          return [arr[0],a,b].join(",").toLowerCase();
      }
    }
  },
  //数字转换成百分比
  getNumberPercentage(number){
    if(typeof (1*number)=="number"){
      return (number*100).toFixed(2)+"%";
    }
  },

}

