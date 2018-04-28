<template>
    <div>
      <div class="asin-content">
        <div class="asin-detail-header">
          <p class="header-title">
            <i @click="changeRouterPath('other')" class="imgBack"></i>
            <span @click="changeRouterPath('other')">{{title}}&nbsp;/</span>
            <span class="active-title" @click="changeRouterPath('current')">产品详情</span>
          </p>
          <div class="product-detail">
               <div class="product-detail-head">
                 <div class="left-box">
                   <a :href="productsDetail.productUrl" target="_blank" v-if="productsDetail.imgUrl&&productsDetail.imgUrl!='/'">
                     <img v-lazy="productsDetail.imgUrl" alt=""/>
                   </a>
                   <div class="no-data-table" v-if="!productsDetail.imgUrl||productsDetail.imgUrl=='/'">
                     <p>暂无图片信息</p>
                   </div>
                 </div>
                 <div class="right-box">
                   <p class="detail-title">{{productsDetail.productName}}</p>
                   <p class="detail-asin">
                     <span><i class="nation"></i>ASIN : {{productsDetail.asin}}</span>
                     <span class="detail-link"><a :href="productsDetail.productUrl" target="_blank">在亚马逊中打开</a></span>
                   </p>
                   <p class="detail-star">
                     <Rate show-text allow-half  disabled v-model="productsDetail.grade">
                       <div class="show-star"><span>{{ productsDetail.grade }}</span></div>
                     </Rate>
                   </p>
                   <p class="detail-brand bold-title"><span class="bold-title">店铺名称：</span>{{productsDetail.shopName}}</p>
                   <p class="detail-limit">
                     <span class="first-limit">
                        <span class="bold-title">日销售额：</span>
                         <span class="limit-number">{{productsDetail.dailySales}}</span>
                     </span>
                     <span>
                     <span class="bold-title">周销售额：</span>
                     <span class="limit-number">{{productsDetail.weeklySales}}</span>
                     </span>
                     <span class="last-limit">
                     <span class="bold-title">客单价：</span>
                     <span class="limit-number">{{productsDetail.unitPrice}}</span>
                     </span>
                   </p>
                 </div>
               </div>
               <div class="product-detail-list">
                 <ul>
                   <li>
                     <div class="list-left"><span class="strong-text">跟售最低价：</span><span class="desc-text">{{productsDetail.minPrice}}</span></div>
                     <div class="list-right"><span class="strong-text">产品上架时间：</span><span class="desc-text">{{productsDetail.generationTime}}</span></div>
                   </li>
                   <li>
                     <div class="list-left"><span class="strong-text">品牌：</span><span class="desc-text">{{productsDetail.brandName}}</span></div>
                     <div class="list-right"><span class="strong-text">购物车价格：</span><span class="desc-text">{{productsDetail.price}}</span></div>
                   </li>
                   <li>
                     <div class="list-left"><span class="strong-text">卖家类型：</span><span class="desc-text">{{productsDetail.sellerType}}</span></div>
                     <div class="list-right"><span class="strong-text">搜索曝光数：</span><span class="desc-text">{{productsDetail.impressions}}</span></div>
                   </li>
                   <li>
                     <div class="list-left"><span class="strong-text">跟卖数：</span><span class="desc-text">{{productsDetail.sellers}}</span></div>
                     <div class="list-right"><span class="strong-text">A9数据时间：</span><span class="desc-text">{{productsDetail.asinDate}}</span></div>
                   </li>
                   <li>
                     <div class="list-left"><span class="strong-text">类目排名：</span><span class="desc-text">{{productsDetail.bsrRanking}}</span></div>
                     <div class="list-right"><span class="strong-text">评论数：</span><span class="desc-text">{{productsDetail.reviewCount}}</span></div>
                   </li>
                   <li>
                     <div class="list-left">
                       <div class="strong-text">BSR排名：</div>
                       <div class="desc-text">
                         <p v-if="productsDetail.otherBsrRanking.length==0">无数据</p>
                         <p v-for="bsrRank in productsDetail.otherBsrRanking">#{{bsrRank}}</p>
                       </div>
                     </div>
                   </li>
                 </ul>
               </div>
          </div>
        </div>
        <div class="asin-detail-chart">
           <p class="title">产品指标趋势</p>
           <div class="tabs">
             <Tabs :value="currentTab" @on-click="tabChange">
               <TabPane label="BSR榜单趋势" name="name2">
                 <LineBox :echartItem="echartItem.name2" ref="lineBox2"></LineBox>
                 <div class="no-data-table" v-if="echartItem.name2.echartContainer.echartInfo.lineStackChart.isNoData">
                   <p>暂无BSR榜单趋势数据</p>
                 </div>
               </TabPane>
               <TabPane label="购物车价格趋势" name="name3">
                 <LineBox :echartItem="echartItem.name3" ref="lineBox3"></LineBox>
                 <div class="no-data-table" v-if="echartItem.name3.echartContainer.echartInfo.lineStackChart.isNoData">
                   <p>暂无购物车价格趋势数据</p>
                 </div>
               </TabPane>
               <TabPane label="review数趋势" name="name4">
                 <LineBox :echartItem="echartItem.name4" ref="lineBox4"></LineBox>
                 <div class="no-data-table" v-if="echartItem.name4.echartContainer.echartInfo.lineStackChart.isNoData">
                   <p>暂无review数趋势数据</p>
                 </div>
               </TabPane>
               <TabPane label="销量排名趋势" name="name1">
                 <LineBox :echartItem="echartItem.name1" ref="lineBox1"></LineBox>
                 <div class="no-data-table" v-if="echartItem.name1.echartContainer.echartInfo.lineStackChart.isNoData">
                   <p>暂无销量排名趋势数据</p>
                 </div>
               </TabPane>
             </Tabs>
           </div>
           <div class="chart-box"></div>
           <div class="timer">
              <span @click="showTimer" currentTimer="timeBox">时间筛选&nbsp;<span class="timer-icon"><Icon type="chevron-down"></Icon></span></span>
             <transition name="el-zoom-in-top">
               <div class="timer-select" v-show="showTimeSelect">
                 <p v-for="time in timerSelection" :key="time.id" @click="chooseTime(time.id)" :class="{activeTime:selectTime==time.id}" currentTimer="timeBox">{{time.label}}</p>
               </div>
             </transition>
           </div>
        </div>
        <div class="asin-detail-data">
          <p class="title">A9数据详情（最近两个月的数据）</p>
          <div class="table-data">
            <Table :columns="tableColumns" :data="tableDatas"></Table>
            <div class="no-data-table" v-if="tableDatas.length===0">
              <p>暂无A9类目数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import LineBox from "./charts/drawOneechart.vue"
    import commonUtil from "../../../config/insight/commons/comonUse"
    export default {
      data() {
            return {
              title:"爆品挖掘引擎",
              asinId:null,
              showTimeSelect:false,
              timerSelection:[
                {
                   id:"time1",
                   label:"近一周"
                },
                {
                  id:"time2",
                  label:"近两周"
                },
                {
                  id:"time3",
                  label:"近一个月"
                },
                {
                  id:"time4",
                  label:"近两个月"
                }
              ],
              tableColumns:[
              {
              title: '时间段',
              key: 'dateTime',
             },
            {
              title: '周销售额',
              key: 'weeklySales',
              sortable: 'true'
            },
            {
              title: '周订单数',
              key: 'weeklyOrderCounts',
              sortable: 'true'
            },
            {
              title: 'FBA发货数',
              key: 'fbaCW',
              sortable: 'true'
           },
          {
            title: '客单价',
            key: 'unitPrice',
            sortable: 'true'
          },
          {
            title: 'ASIN总浏览量',
            key: 'asinTotalView',
            sortable: 'true'
          },
          {
            title: '转化率',
            key: 'conversionRate',
            sortable: 'true'
          },
          {
            title: '搜索曝光数',
            key: 'impressions',
            sortable: 'true'
          },
          {
          title: '点击数',
          key: 'clicks',
          sortable:'true'
          },
          {
            title: '加入购物车数',
            key: 'adds',
            sortable: 'true'
          },
        ],
              tableDatas:[],
              echartItem:{
                name1:{
                  titleShow:false,
                  chartTitle:"",
                  chartClass:"lineStackname1",
                  chartWrapClass:"lineStackWrapname1",
                  echartContainer:{
                    echartsData:[],
                    echartInfo:{
                      lineStackChart:{
                        type:"lineStackChart",
                        title:"",
                        legend:{
                          datas:[],
                          itemGap:125
                        },
                        demession:[],
                        measures:{
                          data1:[],
                          data2:[],
                          data3:[]
                        },
                        datas:null,
                        isInt:1,
                        isInterval:0,
                        isNoData:false
                      }
                    },
                    echartBox:[]
                  },
                  configUrl:""
                },
                name2:{
                  titleShow:false,
                  chartTitle:"",
                  chartClass:"lineStackname2",
                  chartWrapClass:"lineStackWrapname2",
                  echartContainer:{
                    echartsData:[],
                    echartInfo:{
                      lineStackChart:{
                        type:"lineStackChart",
                        title:"",
                        legend:{
                          datas:[],
                          itemGap:125
                        },
                        demession:[],
                        measures:{
                          data1:[],
                          data2:[],
                          data3:[]
                        },
                        yAxisName:"排名",
                        yAxisInverse:true,
                        datas:null,
                        isInt:1,
                        isInterval:0,
                        isNoData:false
                      }
                    },
                    echartBox:[]
                  },
                  configUrl:"/di/get/ranking/trend"
                },
                name3:{
                  titleShow:false,
                  chartTitle:"",
                  chartClass:"lineStackname3",
                  chartWrapClass:"lineStackWrapname3",
                  echartContainer:{
                    echartsData:[],
                    echartInfo:{
                      lineStackChart:{
                        type:"lineStackChart",
                        title:"",
                        legend:{
                          datas:[],
                          itemGap:125
                        },
                        demession:[],
                        measures:{
                          data1:[],
                          data2:[],
                          data3:[]
                        },
                        datas:null,
                        isInterval:0,
                        isNoData:false
                      }
                    },
                    echartBox:[]
                  },
                  configUrl:"/di/get/price/trend"
                },
                name4:{
                  titleShow:false,
                  chartTitle:"",
                  chartClass:"lineStackname4",
                  chartWrapClass:"lineStackWrapname4",
                  echartContainer:{
                    echartsData:[],
                    echartInfo:{
                      lineStackChart:{
                        type:"lineStackChart",
                        title:"",
                        legend:{
                          datas:[],
                          itemGap:125
                        },
                        demession:[],
                        measures:{
                          data1:[],
                          data2:[],
                          data3:[]
                        },
                        datas:null,
                        isInt:1,
                        isInterval:0,
                        isNoData:false
                      }
                    },
                    echartBox:[]
                  },
                  configUrl:"/di/get/grade/trend"
                },
              },
              currentTab:"name2",
              backName:null,
              platform:null,
              category:null,
              siteType:null,
              products:null,
              pageType:null,
              productsDetail:{
                "imgUrl": "",
                "productUrl": "",
                "productName": "/",
                "brandName": "/",
                "bsrRanking": "/",
                "generationTime": "/",
                "shopName": "/",
                "sellerType":"/",
                "grade": 0,
                "price": "/",
                "reviewCount": "/",
                "sellers": "/",
                "minPrice": "/",
                "dailySales":"/",
                "weeklySales": "/",
                "unitPrice": "/",
                "asin": "",
                "weeklyOrderCounts": 0,
                "otherBsrRanking": [],
                "impressions":0,
                "searchExposureRate": "0%",
                "asinDate":"/"
              },
              selectTime:"time3"
            }
        },
      props:[],
      mounted(){
          this.$nextTick(()=>{
           this.getChartData();
           document.addEventListener("click",(e)=>{
               if(!e.target.hasAttribute('currentTimer')){
                   this.showTimeSelect=false;
               }
           })
            window.addEventListener('popstate', (ev)=>{
              this.$store.commit("isShowAsin",false);
              ev.returnValue=false;
              history.pushState(null, null, location.href);
            });
          })
        },
      components:{LineBox},
      created(){
          this.products=this.$store.state.asinParmas;
        if(this.products){
          window.sessionStorage.setItem("productDetail",JSON.stringify(this.products));
        }else{
          if(window.sessionStorage.getItem("productDetail")){
            this.products=JSON.parse(window.sessionStorage.getItem("productDetail"));
          }
        }
        this.setInitData();
        this.getProductDetails();
        this.getAsinNightData();
      },
      methods:{
        setInitData(){
          if(this.products){
            this.backName=this.products.backName;
            this.title=this.products.backName;
            this.asinId=this.products.asinId;
            this.platform=this.products.platform;
            this.category=this.products.category;
            this.siteType=this.products.siteType;
            this.pageType=this.products.pageType;
          }
        },
        //获取产品详情
        getProductDetails(){
          commonUtil.clearArray(this.productsDetail.otherBsrRanking);
          commonUtil.queryData({
            url: "/di/get/product/details",
            queryParams: {
              category:this.category?this.category:"",
              siteType:this.siteType||'美站',
              platform:this.platform||"AMZ",
              productId:this.asinId||"",
              pageType:this.pageType||"news"
            },
            callback: (res) => {
              if(res.data){
                let sellerType=null;
                for(let key in res.data){
                  let itemVal=res.data[key];
                  if(key=="otherBsrRanking"){
                    if(itemVal){
                      itemVal=JSON.parse(itemVal);
                    }
                  }else if(key=="amazon"||key=="fba"){
                    if(itemVal=="yes"){
                      sellerType=key.toUpperCase();
                    }
                  }else if(key=="generationTime"||key=="asinDate"){
                     if(itemVal){
                       itemVal=itemVal.split(" ")[0];
                     }
                  }else if (key=="reviewCount"||key=="minPrice"||key=="dailySales"||
                            key=="sellers"||key=="weeklySales"||key=="unitPrice"){
                           itemVal=this.splitNumber(itemVal);
                  }else if(key=="grade"){
                    itemVal=itemVal?itemVal*1:0;
                  }
                  this.productsDetail[key]=(itemVal!==""&&itemVal!=null)?itemVal:"/";
                }
                this.productsDetail.sellerType=sellerType?sellerType:"/";
              }
            },
            error: () => {}
          })
        },
        //获取最近一个月的A9数据
        getAsinNightData(){
          commonUtil.clearArray(this.tableDatas)
          commonUtil.queryData({
            url: "/di/list/asin/details",
            queryParams: {
              category:this.category?this.category:"",
              siteType:this.siteType||'美站',
              platform:this.platform||"AMZ",
              productId:this.asinId||"",
              pageType:this.pageType||"news"
            },
            callback: (res) => {
              if(res.data&&res.data.length>0){
                  res.data.forEach((row)=>{
                    for(let key in row){
                      row[key]=(row[key]!==""&&row[key]!=null)?row[key]:'无'
                    }
                    this.tableDatas.push(row);
                  })
              }
            }
          })
        },
        //获取图表数据
        getTendencyData1(success){
          commonUtil.queryData({
            url: "/di/get/weeklySales/trend",
            queryParams: {
              category:this.category?this.category:"",
              siteType:this.siteType||'美站',
              platform:this.platform||"AMZ",
              productId:this.asinId||"",
              pageType:this.pageType||"news"
            },
            callback: (res) => {
              success&&success(res.data);
            }
          })
        },
        getTendencyData2(success){
          let configUrl=this.echartItem[this.currentTab].configUrl;
          commonUtil.queryData({
            url: configUrl,
            queryParams: {
              category:this.category?this.category:"",
              siteType:this.siteType||'美站',
              platform:this.platform||"AMZ",
              productId:this.asinId||"",
              pageType:this.pageType||"news"
            },
            callback: (res) => {
              success&&success(res.data);
            }
          })
        },
        showTimer(){
         this.showTimeSelect=!this.showTimeSelect;
        },
        chooseTime(timeId){
          this.selectTime=timeId;
          let currentData=this.echartItem[this.currentTab].echartContainer.echartInfo.lineStackChart;
          this.refreshChart(currentData,this.currentTab);
        },
        //数字分割,
        splitNumber(number){
          number=number.toString();
          let value =number;
          let point="";
          let backStr="";
          if(number.indexOf(".")){
            value=number.split(".")[0];
            point=number.split(".")[1];
          }
          if (value.length <= 3) {
            if(point){
              backStr=value+"."+point;
            }else{
              backStr=value;
            }
          } else {
            if(point){
              backStr= this.splitNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3)+"."+point;
            }else{
              backStr= this.splitNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
            }
          }
          return backStr;
        },
        //获取图表数据
        getChartData(){
          let showChartObj=this.echartItem[this.currentTab].echartContainer.echartInfo.lineStackChart;
          let refBoxs="";
          commonUtil.clearArray( showChartObj.measures.data1)
          commonUtil.clearArray( showChartObj.measures.data2)
          commonUtil.clearArray( showChartObj.measures.data3)
          commonUtil.clearArray( showChartObj.legend.datas);
          commonUtil.clearArray( showChartObj.demession);
          //数据处理
          if(this.currentTab=="name1"){
            this.getTendencyData1((res)=>{
              showChartObj.datas=res;
              this.$set(showChartObj.legend,"datas",['周销售额','周订单数']);
              this.setFirstChartData(showChartObj);
            });
          }else{
             if(this.currentTab=="name2"){
               refBoxs="lineBox2";
               this.$set(showChartObj.legend,"datas",['BSR榜单']);
             }else if(this.currentTab=="name3"){
               refBoxs="lineBox3";
               this.$set(showChartObj.legend,"datas",['购物车价格']);
             }else if(this.currentTab=="name4"){
               refBoxs="lineBox4";
               this.$set(showChartObj.legend,"datas",['review数']);
             }
            this.getTendencyData2((res)=>{
              showChartObj.datas=res;
               this.setOtherChartData(showChartObj,refBoxs);
            });
          }
        },
        tabChange(name){
          this.currentTab=name;
          let currentData=this.echartItem[this.currentTab].echartContainer.echartInfo.lineStackChart;
          if(!currentData.datas){
            //发送请求
            this.getChartData();
          }else{
           this.refreshChart(currentData,this.currentTab);
          }
        },
        setFirstChartData(showChartObj){
          let res=showChartObj.datas;
          let date=[];
          let arr1=[];
          let arr2=[];
          if(this.selectTime=="time1"){
            date=res.oneWeekTimeAxis;
            arr1=res.oneWeekSalesDatas;
            arr2=res.oneWeekOrderDatas;
            this.$set(showChartObj,"isInterval",0);
          } else if(this.selectTime=="time2"){
            date=res.twoWeeksTimeAxis;
            arr1=res.twoWeeksSalesDatas;
            arr2=res.twoWeeksOrderDatas;
            this.$set(showChartObj,"isInterval",0);
          }else if(this.selectTime=="time3"){
            date=res.fourWeeksTimeAxis;
            arr1=res.fourWeeksSalesDatas;
            arr2=res.fourWeeksOrderDatas;
            this.$set(showChartObj,"isInterval",2);
          }else if(this.selectTime=="time4"){
            date=res.twoMonthsTimeAxis;
            arr1=res.twoMonthsSalesDatas;
            arr2=res.twoMonthsOrderDatas;
            this.$set(showChartObj,"isInterval",2);
          }
          this.$set(showChartObj,"demession",date);
          this.$set(showChartObj.measures,"data1",arr1)
          this.$set(showChartObj.measures,"data2",arr2)
          if(date.length==0){
            this.$set(showChartObj,"isNoData",true);
          }else{
            this.$set(showChartObj,"isNoData",false);
          }
          if(this.$refs.lineBox1){
            this.$refs.lineBox1.initChart("lineStackChart");
          }
        },
        setOtherChartData(showChartObj,refBoxs){
          let dateTime=[];
          let arrData1=[];
          let backObj=null
          if(this.selectTime=="time1"){
            //1周
            backObj=this.removeZero(showChartObj.datas.sevenDayDatas,showChartObj.datas.sevenDayTimeAxis);
            this.$set(showChartObj,"isInterval",0);
          }else if(this.selectTime=="time2"){
            //15天
            backObj=this.removeZero(showChartObj.datas.fifteenDayDatas,showChartObj.datas.fifteenDayTimeAxis);
            this.$set(showChartObj,"isInterval",0);
          }else if(this.selectTime=="time3"){
            //一个月
            backObj=this.removeZero(showChartObj.datas.thirtyDayDatas,showChartObj.datas.thirtyDayTimeAxis);
            this.$set(showChartObj,"isInterval",2);
          }else{
            backObj=this.removeZero(showChartObj.datas.twoMonthsDatas,showChartObj.datas.twoMonthsTimeAxis);
            this.$set(showChartObj,"isInterval",2);
          }
          dateTime=backObj.time;
          if(dateTime.length==0){
            this.$set(showChartObj,"isNoData",true);
          }else{
            this.$set(showChartObj,"isNoData",false);
          }
          arrData1=backObj.data;
          this.$set(showChartObj,"demession",dateTime);
          this.$set(showChartObj.measures,"data1",arrData1);
          if(refBoxs&&this.$refs[refBoxs]){
            this.$refs[refBoxs].initChart("lineStackChart");
          }
        },
        changeRouterPath(name){
          let routerName="";
          switch (name){
            case  "current":
              routerName="explodeAsinDetail"
              break;
            case  "other":
              this.$store.commit("isShowAsin",false);
              routerName=this.backName;
              break;
          }
        },
        //去掉0
        removeZero(data,timeArray){
          let arr=[];
          let time=[];
          if(data&&data.length>0){
            data.forEach((item,i)=>{
              let key=item;
              let timeDate=timeArray[i];
              if(item!=0&&item!=""){
                arr.push(key);
                time.push(timeDate);
              }
            })
          }
          return {
            data:arr,
            time:time
          };
        },
        //重绘图表数据
        refreshChart(currentData,name){
          let refBoxs="";
          if(this.echartItem[name].echartContainer.echartBox.length>0){
            this.echartItem[name].echartContainer.echartBox[0].chart.clear();
          }
          //切换绘制的图表
          if(name=="name1"){
            refBoxs="lineBox1";
            this.setFirstChartData(currentData);
          }else{
            switch (name){
              case "name2":
                refBoxs="lineBox2";
                break;
              case "name3":
                refBoxs="lineBox3";
                break;
              case "name4":
                refBoxs="lineBox4";
                break;
            }
            this.setOtherChartData(currentData,refBoxs);
          }
        }
      },
    }
</script>
<style lang="less">
@import "../../../style/insight/asinDetail.less";
  .ivu-rate-text{  display: inline-block !important;  }
</style>
