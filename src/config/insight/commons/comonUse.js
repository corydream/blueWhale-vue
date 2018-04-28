import keyapi from '../../../data/tempApi';
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
        if (res.status == 1) {
          obj.callback(res)&&obj.callback(res);
        }else if(res.status==0){
          obj.error&&obj.error(res);
        }else if(res.status==101){
          //重新登录
          location.href = "https://data.banggood.cn";
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
    let type=""
    if(obj.pageType=="news"){
      if(obj.tabName=="name1"){
        type=67
      }else if(obj.tabName=="name4") {
        type=68
      }
    }else if(obj.pageType=="explode"){
      if(obj.tabName=="name1"){
        type=69
      }else if(obj.tabName=="name4") {
        type=70
      }
    }
    this.queryData({
      url:"/di/common/save/colunmOrder",
      queryParams:{
        paramName:obj.paramName,
        type:type,
        paramData:JSON.stringify(obj.paramData),
      },
      callback:(res)=>{}
    })
  },
  //获取配置
  getRemoteCategory(obj,success){
    let type=""
    if(obj.pageType=="news"){
      if(obj.tabName=="name1"){
        type=67
      }else if(obj.tabName=="name4") {
        type=68
      }
    }else if(obj.pageType=="explode"){
      if(obj.tabName=="name1"){
        type=69
      }else if(obj.tabName=="name4") {
        type=70
      }
    }
    this.queryData({
      url:"/di/common/get/colunmOrder",
      queryParams:{
        type:type,
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
  //字符串格式处理
  handelFormat(arr) {
    if(arr instanceof Array){
      return arr&&arr.join(">").toLowerCase();
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
  }
}
