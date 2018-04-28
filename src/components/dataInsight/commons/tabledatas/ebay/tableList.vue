<template>
    <div>
      <div class="data-show">
        <div class="collectBtns">
              <span :class="{'active':collectBtnsActive==='tab1'}" @click="tabCollection('tab1')">{{btnText}}</span>
              <span :class="{'active':collectBtnsActive==='tab2'}" @click="tabCollection('tab2')">我的收藏</span>
        </div>
              <Table height="800"
                     :data="TableItem.tableContainer.tableData"
                     :row-class-name="rowClassName"
                     :columns="TableItem.tableContainer.tableColumns"
                     :loading="loading"
                     id="tables"
                     @on-sort-change="sortAll"
              ></Table>
          <Switch v-model="loading"></Switch>
        <div class="imgCover"
             v-if="showImg"
             @click="closeImg"
             :class="{'showImg':showImg}">
          <img :src="bigImg" alt="">
        </div>
        <div style="margin-top:20px;overflow: hidden">
          <div style="float: right;">
            <Page show-elevator
                  :total="TableItem.pageBean.totalCount" show-sizer
                  :page-size="TableItem.pageBean.pageSize"
                  :current="TableItem.pageBean.currentPage" class="fl"
                  placement="top"
                  @on-change="changeNextPage"
                  @on-page-size-change="changeSize"
                  :page-size-opts="pageSizes"
            ></Page>
            <p class="myTotalText">*共{{TableItem.pageBean.totalCount| formatTotal}}条数据</p>
          </div>
        </div>
        <Modal
          title="提示"
          v-model="isNoData"
          class-name="vertical-center-modal">
          <p>该类目暂无{{TableItem.tipTitle}}(30天销量增长率分析)数据,默认类目为【ALL】</p>
          <div slot="footer" class="myFooter">
            <Checkbox v-model="noMoreTips" class="checkboxTips">不再提示</Checkbox>
            <Button type="primary"  @click="confirmAll">确认</Button>
          </div>
        </Modal>
        <transition name="el-zoom-in-top">
          <div class="sortDiv" v-show="showSortable" id="sortableBox">
            <draggableBox :columns="columns" :TableItem="TableItem" @changeSortstate="changeSortstate"></draggableBox>
          </div>
        </transition>
      </div>
    </div>
</template>
<script>
  //数据处理类
  import Model from "../../../../../config/insight/commons/dataHelper";
  //通用方法
  import commonUtil from "../../../../../config/insight/commons/insightCommon";
  //表格相关类
  import  tableUtil from "../../../../../config/insight/commons/tablesListClass"
  import chartBox from "../../drawOneechart.vue";
  import draggableBox from "../../sortDraggable.vue";
  export default {
        data() {
          return{
            bigImg:"", //点击放大图片
            loading: true, //表格遮罩层
            showImg:false,
            links:[],
            firstTime:true,    //初始化
            totalNumber:0,
            isNoData:false,
            isFirstBsr:true,
            noMoreTips:false,
            columns:[],
            showSortable:false,
            collectBtnsActive:"tab1",//是否是收藏
            btnText:"",
            initSortState:[],
            lock:false,
            currentMoveItem:null,
            sortState:false,
            platform:"AMZ",
            pageSizes:[10,20,30,40,100],
            scrolObj:{}
          }
        },
        components:{chartBox,draggableBox},
        props:['TableItem','showMessage','chooseType','pageBean'],
        computed:{
        siteType(){return this.$store.state.site;}
       },
        mounted(){
          this.$nextTick(()=>{
            document.addEventListener("click",(e)=>{
              e.stopPropagation();
              let box=$("#sortableBox");
              if(!(box.has(e.target).length!=0||e.target.id=='iconBox')){
                this.showSortable=false;
              }
            })
          })
        },
        created() {
          //判断当前的平台类型
          if(this.TableItem.type=="explode"&&this.TableItem.showNewColumn=="name1"){
            let routerName=this.$route.name;
            switch (routerName){
              case "explodeProductAmazonSum":this.platform="AMZ";break;
              case "explodeProductEbaySum":this.platform="EBAY";break;
            }
          }
          this.collectBtnsActive="tab1";
          tableUtil.getDatas({
            TableItem: this.TableItem,
            platform:this.platform,
            _vue:this,
            _this:tableUtil,
            initSortState:this.initSortState,
            pageBean:this.pageBean
          });
          this.pageLoaded();
        },
        watch:{},
        filters:{
          formatTotal(num){return num && num.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',')}
       },
        methods:{
          //加载页面
          pageLoaded(){
            this.setAllStateClear();//重置
            this.getColumn(this.createdData); //获取列名
          },
          setAllStateClear(){
            this.TableItem.initCondition.type = "all";
            this.TableItem.initCondition.isPage = false;
            this.TableItem.initCondition.isCategory = false;
            this.firstTime=true;
            this.isFirstBsr=true;
            this.TableItem.pageBean.currentPage = 1;
            this.TableItem.pageBean.oldPage = 1;
            this.totalNumber=0;
            this.lock=false;
            this.btnText=this.TableItem.title;
          },
          //初始化表格
          createdData(){
              //重置
              this.clearAll();
              //初始化表格
              this.getSortAble(this.setTableData);
              //绑定控件
              this.setControllers();
              //配置表格
              this.initData();
              //获取品牌名
//             if(this.TableItem.showNewColumn=="name1") {
//                this.getBrandName();
//              }
          },
          /*----------表格数据处理-------------*/
          //获取列名
          getColumn(success) {
            //获取表格的标题
            let _this = this;
            let modelId=this.TableItem.parmasConfig.column.modelID;
            if(this.collectBtnsActive=="tab2"){
              modelId="624";
            }
            this.TableItem.tableContainer.columns={};
            commonUtil.queryData({
              url: "/auth/get/column",
              async:true,
              queryParams: {cid:modelId },
              callback: (res) => {
                _this.TableItem.tableContainer.columns = Model.getListTitle(res.data);
                success && success();
              }
            })
          },
          //表格数据初始化
          initData() {
            //measure
            commonUtil.clearArray(this.TableItem.initCondition.measures);
            commonUtil.clearArray(this.TableItem.initCondition.demesion);
            commonUtil.clearArray(this.TableItem.initCondition.condition);
            this.TableItem.tableContainer.columns.messures.forEach((item, index) => {
              let sortType="DEFAULT";
              this.TableItem.initCondition.measures.push({
                "col": item.col,
                "agg": item.agg[0],//聚合方式
                "sortType": sortType,
                "chinese": item.chinese,//列表
                "uuid": item.uuid
              })
            })
            //demession
            this.TableItem.tableContainer.columns.demesion.forEach((item, index) => {
              let sortType="DEFAULT";
              if(this.TableItem.showNewColumn=="name1"){
                if(item.chinese=="BSR排名"){
                  sortType="ASC"
                }
              }
              if(item.chinese=="增长度"){
                sortType="DESC";
              }
              this.TableItem.initCondition.demesion.push({
                "col": item.col,
                "sortType": sortType,
                "chinese": item.chinese,
                "isMaxMin": false,
                "uuid": item.uuid
              })
            });
            this.TableItem.initCondition.extra = this.TableItem.tableContainer.columns.extra;
            if(this.TableItem.showNewColumn=="name3"){
              //重新加载all类目
              this.defaultBsrVal(this.$parent.$refs.searchBox.searchData);
            }else{
              this.mockTableData();
              //获取品牌数
              if(this.TableItem.type==="explode"){
                this.getBrandCount();
              }
            }
          },
          //表格搜索
          searchData(){
            let conditions = {
              demesion: [],
              measures: [],
              conditions: []
            };
            //配置表格控件查询条件
            for (let key in this.TableItem.tableContainer.queryData) {
              var obj = this.TableItem.tableContainer.queryData[key];
              //判断字段是否要发送
              //判断是否是有区间
              if (obj.hasOwnProperty("showSession")) {
                //选择了区间发送
                if (obj.showSession) {
                  let objSend = {
                    left: {
                      "col": obj.col,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LARGEEQUAL", //>=
                      "val": obj.session.sessionLeft
                    },
                    right: {
                      "col": obj.col,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LESSEQUAL", //>=
                      "val": obj.session.sessionRight
                    }
                  }
                  conditions.conditions.push(objSend.left);
                  conditions.conditions.push(objSend.right);
                }
                else {
                  //没有区间正常发送
                  //正常类型
                  let objSend = {
                    "col": obj.col,
                    "chinese": obj.chinese,
                    "uuid": obj.uuid,
                    "columnType": obj.columnType ? obj.columnType : "",
                    "relation": obj.selectValue,
                    "val": obj.inputVal
                  }
                  conditions.conditions.push(objSend);

                }
              }
              else {
                if (obj.inputVal !== "" && obj.inputVal.length != 0) {
                  if (obj.type === "DATE") {
                    //日期
                    if(obj.inputVal[0]&&obj.inputVal[1]){
                      let objSend = {
                        left: {
                          "col": obj.col,
                          "chinese": obj.chinese,
                          "uuid": obj.uuid,
                          "columnType": obj.columnType ? obj.columnType : "",
                          "relation": "LARGEEQUAL", //>=
                          "val": commonUtil.formatWithDate(obj.inputVal[0], "yyyy-MM-dd"),
                        },
                        right: {
                          "col": obj.col,
                          "chinese": obj.chinese,
                          "uuid": obj.uuid,
                          "columnType": obj.columnType ? obj.columnType : "",
                          "relation": "LESSEQUAL", //>=
                          "val": commonUtil.formatWithDate(obj.inputVal[1], "yyyy-MM-dd")
                        }
                      }
                      conditions.conditions.push(objSend.left);
                      conditions.conditions.push(objSend.right);
                    }
                  } else if (obj.type === "ARRAY") {
                    //卖家类型
                    if (obj.inputVal.length == 1) {//只需传一个
                      let objSend = {
                        "col": obj.col,
                        "chinese": obj.chinese,
                        "uuid": obj.uuid,
                        "columnType": obj.columnType ? obj.columnType : "",
                        "relation": "EQUAL",
                        "val": obj.inputVal[0]==='是'?'yes':'no'
                      }
                      conditions.conditions.push(objSend);
                    }
                  } else {
                    if(obj.type !== "BSR"){
                      //BSR分类不用发
                      if(obj.type!="RATE"){
                        if(obj.type=="INTNumber"||obj.type=="INTNumber2"){
                          let val1="";
                          let val2="";
                          let col1=obj.col;
                          let col2=obj.col;
                          switch(obj.type){
                            case "INTNumber":
                              val1=obj.inputVal[0]/100;
                              val2=obj.inputVal[1]/100;
                              col1="$repl$largeR";
                              col2="$repl$lessrR";
                              break;
                            case "INTNumber2":
                              val1=obj.inputVal[0];
                              val2=obj.inputVal[1];
                              col1="$repl$largeAngle";
                              col2="$repl$lessAngle";
                              break;
                          }
                          let objSend = {
                            left: {
                              "col": col1,
                              "chinese": obj.chinese,
                              "uuid": obj.uuid,
                              "columnType": obj.columnType ? obj.columnType : "",
                              "relation": "LARGEEQUAL", //>=
                              "val": val1
                            },
                            right: {
                              "col": col2,
                              "chinese": obj.chinese,
                              "uuid": obj.uuid,
                              "columnType": obj.columnType ? obj.columnType : "",
                              "relation": "LESSEQUAL", //>=
                              "val":val2
                            }
                          }
                          conditions.conditions.push(objSend.left);
                          conditions.conditions.push(objSend.right);
                        }else{
                          let objSend = {
                            "col": obj.col,
                            "chinese": obj.chinese,
                            "uuid": obj.uuid,
                            "columnType": obj.columnType ? obj.columnType : "",
                            "relation": "EQUAL",
                            "val": obj.inputVal
                          }
                          conditions.conditions.push(objSend);
                        }

                      }

                    }
                  }
                }else{
                  if(obj.type==="increment"&&obj.inputVal==""){
                    let objSend = {
                      "col": obj.col,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "EQUAL",
                      "val": 100000
                    }
                    conditions.conditions.push(objSend);
                  }
                }
              }
            }
            let bsr="";
            if(this.TableItem.tableContainer.queryData.BSRsort.inputVal!="全部"){
              if(this.TableItem.tableContainer.queryData.BSRsort.inputVal.indexOf("(")!=-1){
                bsr=this.TableItem.tableContainer.queryData.BSRsort.inputVal.slice(0,this.TableItem.tableContainer.queryData.BSRsort.inputVal.indexOf("("));
              }else{
                bsr=this.TableItem.tableContainer.queryData.BSRsort.inputVal;
              }
            }
            this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
              if(item.chinese==="BSR分类"){
                this.$set(item, "val", bsr);
              }else if(item.chinese==="类目"){
                this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
              }
              conditions.conditions.push(item);
            })
            this.$set(this.TableItem.initCondition,"condition",conditions.conditions);
          },
          //如何获取表格数据配置
          mockTableData(){
            this.loading = true;
            if (this.TableItem.initCondition.type === "part") {
              //点击搜索
              this.TableItem.pageBean.currentPage = 1;
              this.TableItem.pageBean.oldPage = 1;
              this.totalNumber=0;
              this.TableItem.pageBean.toPage = this.TableItem.pageBean.currentPage;
              this.$set(this.TableItem.initCondition, "type", "all");
              if(this.TableItem.showNewColumn=="name3"){
                if(this.firstTime){
                  this.getTableData(this.getInputValInit)
                  this.firstTime=false;
                }else{
                  this.getTableData();
                }
              } else {
                if(this.TableItem.initCondition.isCategory){
                  //汇总
                  this.getTableData();
                }else{
                  //直接获取数据
                  this.getTableData();
                }
              }
            }else if(this.TableItem.initCondition.type === "all"){
              //初始化 切换类目 翻页
              if(!this.TableItem.initCondition.isPage){
                //不是翻页
                if(this.TableItem.showNewColumn=="name3"){
                  if(this.firstTime){
                    this.firstTime=false;
                    this.getTableData(this.getInputValInit);
                  }else{
                    this.getTableData();
                  }
                }else{
                  this.getTableData();
                }
              }else{
                this.getTableData();
              }
            }
          },
          //获取表格数据
          getTableData(success){
            this.loading = true;
            let _this = this;
            if(!this.TableItem.initCondition.isPage){
              //不是翻页
              if (this.TableItem.tableContainer.columns.extra&&this.TableItem.tableContainer.columns.extra.length!=0){
                this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
                  if(item.chinese==="类目"){
                    this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                  }
                  this.TableItem.initCondition.condition.push(item);
                })
              }
              this.getTableCount();
            }
            this.TableItem.initCondition.isPage=false;
            this.TableItem.tableContainer.tableData.splice(0,this.TableItem.tableContainer.tableData.length);
            let configUrl="/query/single";
            let flag=false;
            let sendNumber1="";
            let sendNumber2="";
            let sendType="summary";
            let modelId=this.TableItem.parmasConfig.query.modelID;
            let cid=this.TableItem.parmasConfig.query.cid
            if(this.TableItem.type=="explode"){
               //爆品
              configUrl="/recommendation/best/list/details"; //爆品收藏
            }else{
               //新品
              configUrl="/recommendation/new/list/details"; //新品收藏
            }
            if(this.TableItem.showNewColumn=="name3"){
              sendType="recommend";
            }
            if(this.collectBtnsActive=="tab2"){
              //收藏
              modelId="624";
              cid="624";
              configUrl="/di/common/list/collections"
              //类目重置
              this.TableItem.initCondition.condition.forEach((itemCon)=>{
                if(itemCon.chinese==="类目"){
                  this.$set(itemCon, "val", "");
                }
              });
              this.TableItem.initCondition.condition.push({
                "col": "rpt_products_collections.is_collection",
                "chinese": "是否收藏",
                "alias": "is_collection",
                "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
                "val": 1,
                "columnType": "NUMBER",
                "relation" : "EQUAL"
              });
            }
            commonUtil.queryData({
              url: configUrl,
              async:true,
              queryParams:{
                cid: cid,
                type:sendType,// summary 汇总   recommend//推荐
                svQualifyingCount:flag?sendNumber1:"",
                ftQualifyingCount:flag?sendNumber2:"",
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure": _this.TableItem.initCondition.measures ? _this.TableItem.initCondition.measures : [],
                  //demesion
                  "groupbys": _this.TableItem.initCondition.demesion ? _this.TableItem.initCondition.demesion : [],
                  "tableName": "kylin_sales",
                  "conditions": _this.TableItem.initCondition.condition ? _this.TableItem.initCondition.condition : [],
                  "conditionMap": {}
                }),
                //固定
                thirtyDays:flag?this.TableItem.tableContainer.queryData.sevenDayRate.inputVal:"",
                fourteenDays:flag?this.TableItem.tableContainer.queryData.fourteenDayRate.inputVal:"",
                sevenDays:flag?this.TableItem.tableContainer.queryData.thirtyDayeRate.inputVal:"",
                platform:this.platform,
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": _this.TableItem.pageBean.oldPage,
                  "currentPage": _this.TableItem.pageBean.currentPage,
                  "pageSize": _this.TableItem.pageBean.pageSize
                }),
                //固定
                modelID:modelId
              } ,
              callback: (res) => {
                _this.loading = false;
                if(res.data.result&&res.data.result.length>0){
                  let data = Model.getListData(res.data, _this);
                  let lastData=data.datas;
                  _this.totalNumber=(_this.TableItem.pageBean.currentPage-1)*_this.TableItem.pageBean.pageSize
                  lastData.forEach((item,i)=>{
                    for(let key in item){
                      if(key=="orderNumber"){
                        //1-40(1,2,3) 2-40(41,42) 3-40(81,82)
                        if(_this.TableItem.pageBean.currentPage>1){
                          item[key]=++_this.totalNumber;
                        }else{
                          item[key]=++i;
                        }
                      }
                    }
                  })
                  commonUtil.clearArray(_this.TableItem.tableContainer.tableData);
                  _this.$set(_this.TableItem.tableContainer,'tableData', lastData);
                  commonUtil.clearArray(_this.links);
                  _this.links=data.links;
                }else{
                  _this.showMessage.push(1);
                }
                success&&success();
              },
              error:(res)=>{
                _this.loading = false;
              },
              complete:()=>{
                _this.loading = false;
              }
            });
          },
          //表格排序
          sortAll(item){
            if(item.order==="normal"){
              item.order="DEFAULT";
            }
            this.TableItem.initCondition.measures.forEach((mes,index)=>{
              if(mes.uuid===item.key){
                this.$set(mes,"sortType",item.order.toUpperCase())
              }else{
                this.$set(mes,"sortType","DEFAULT");
              }
            })
            this.TableItem.initCondition.demesion.forEach((dem,key)=>{
              if(dem.uuid===item.key){
                if(dem.chinese=="BSR排名"){
                  if(item.order=="desc"){
                    item.order="asc"
                  }else if(item.order=="asc"){
                    item.order="desc"
                  }
                }
                this.$set(dem,"sortType",item.order.toUpperCase())
              }else{
                this.$set(dem,"sortType","DEFAULT");
              }
            })
            this.$set(this.TableItem.initCondition,"isPage",true);
            this.getTableData();

          },
          //获取表格总数
          getTableCount(success){
            let _this=this;
            let flag=false;
            let sendNumber1="";
            let sendNumber2="";
            let conditions=[];
            let modelId=this.TableItem.parmasConfig.query.modelID;
            let cid=this.TableItem.parmasConfig.query.cid;
            let configUrl="/di/common/row/sum";
            this.TableItem.initCondition.condition.forEach((conObj)=>{
              conditions.push({
                chinese : conObj.chinese,
                col: conObj.col,
                uuid : conObj.uuid,
                columnType : conObj.columnType,
                relation : conObj.relation,
                val : conObj.val
              })
            })
            conditions.push({
              "chinese": "数量",
              "col": "count(1)",
              "columnType": "STRING",
              "uuid": "countss",
              "alias": "count_num"
            })
            if(this.collectBtnsActive=="tab2"){
              modelId="624";
              cid="624";
              configUrl="/di/common/row/collection/sum";
              //类目重置
              conditions.forEach((itemCon)=>{
                if(itemCon.chinese==="类目"){
                  this.$set(itemCon, "val", "");
                }
              });
              conditions.push({
                "col": "rpt_products_collections.is_collection",
                "chinese": "是否收藏",
                "alias": "is_collection",
                "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
                "val": 1,
                "columnType": "NUMBER",
                "relation" : "EQUAL"
              })
            }
            commonUtil.queryData({
              url:configUrl,
              method:"post",
              queryParams:{
                cid:cid ,
                svQualifyingCount:flag?sendNumber1:"",
                ftQualifyingCount:flag?sendNumber2:"",
                thirtyDays:flag?this.TableItem.tableContainer.queryData.sevenDayRate.inputVal:"",
                fourteenDays:flag?this.TableItem.tableContainer.queryData.fourteenDayRate.inputVal:"",
                sevenDays:flag?this.TableItem.tableContainer.queryData.thirtyDayeRate.inputVal:"",
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure": _this.TableItem.initCondition.measures ? _this.TableItem.initCondition.measures : [],
                  //demesion
                  "groupbys": _this.TableItem.initCondition.demesion ? _this.TableItem.initCondition.demesion : [],
                  "tableName": "kylin_sales",
                  "conditions": conditions ? conditions : [],
                  "conditionMap": {}
                }),
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": _this.TableItem.pageBean.oldPage,
                  "currentPage": _this.TableItem.pageBean.currentPage,
                  "pageSize": _this.TableItem.pageBean.pageSize
                }),
                //固定
                modelID:modelId
              },
              callback:(res)=>{
                if(res.data){
                  _this.TableItem.pageBean.totalCount=res.data.rowSum;
                }
                success&&success();
              }

            })
          },
          /*----------表格样式交互相关--------------*/
          //搜索重置
          clearAll() {
            for (var key in this.TableItem.tableContainer.queryData) {
              let obj = this.TableItem.tableContainer.queryData[key];
              if (obj.type && obj.type == "ARRAY") {
                //卖家类型
                obj.inputVal.splice(0, obj.inputVal.length);
              } else if(obj.type&&obj.type=="BSR"){
                if(this.TableItem.tableContainer.sortData.length>0){
                  this.$set(obj,"inputVal",this.TableItem.tableContainer.sortData[0].value)
                }else{
                  this.$set(obj,"inputVal","");
                }
              }else {
                if(obj.type=="INTNumber"){
                  this.$set(obj, "inputVal", [0,100]);
                }else if(obj.type=="INTNumber2"){
                  this.$set(obj, "inputVal", [0,90]);
                }else if(obj.type=="INTNumber3"){
                  this.$set(obj, "inputVal",0);
                }else if(obj.type=="price"){
                  this.$set(obj, "inputVal","");
                }else{
                  if(obj.type!="RATE"){
                    this.$set(obj, "inputVal", "");
                  }
                }
                if (obj.showSession) {
                  //区间
                  this.$set(obj.session, "sessionLeft", 0);
                  this.$set(obj.session, "sessionRight", 0);
                  this.$set(obj, "showSession", false);
                }
                if (obj.selectValue && obj.selectValue.length != 0) {
                  this.$set(obj, "selectValue", "LARGEEQUAL");
                }
              }
            }
          },
          //鼠标移上去
          clickImg(event){
            this.showImg=true;
            this.bigImg=event.target.src;
          },
          //点击图片关闭
          closeImg(){
            this.showImg=false;
          },
          //日期处理
          datetimeHandle(str){
           return commonUtil.formateDateYMD(str);
          },
          //绑定控件
          setControllers(){
            let columnTitle = this.TableItem.tableContainer.columns.demesion.concat(this.TableItem.tableContainer.columns.messures);
            columnTitle.forEach((item)=>{
              tableUtil.setControls(item.chinese,item,this.TableItem.tableContainer.queryData,"ebay");
            })
          },
          //行样式处理
          rowClassName(row, index) {
            return 'demo-table-row';
          },
          //列渲染样式
          setTableData(columns) {
            //设置每个图表的筛选条件
            commonUtil.clearArray(this.TableItem.tableContainer.tableColumns);
            commonUtil.clearArray(this.initSortState);
            commonUtil.clearArray(this.columns);
            let columnTitle = this.TableItem.tableContainer.columns.demesion.concat(this.TableItem.tableContainer.columns.messures);
            this.TableItem.tableContainer.tableColumns=columnTitle;
            if(columns.length>0){
              this.TableItem.tableContainer.tableColumns=tableUtil.setTableRender(columns,this,columnTitle);
              this.columns=tableUtil.initRenderTable(columnTitle,this.TableItem.showNewColumn,this);
              this.columns.forEach((item)=>{
                item.isSelect=false;
                this.TableItem.tableContainer.tableColumns.forEach((row)=>{
                  if(row.key==item.key){
                    item.isSelect=true;
                  }
                })
              })
            } else{
              this.TableItem.tableContainer.tableColumns=tableUtil.initRenderTable(columnTitle,this.TableItem.showNewColumn,this);
              this.TableItem.tableContainer.tableColumns.forEach((itemObj,index)=>{this.columns.push(itemObj);})
            }
            this.columns.forEach((columns)=>{
              if(columns){
                this.initSortState.push({
                  key:columns.key,
                  isSelect:columns.isSelect
                });
              }
            })
          },
          //跳转路由到详情
          goASINDetail(event){},
          /*----------表格收藏模块--------------*/
          //切换我的收藏
          tabCollection(textName){
            this.collectBtnsActive=textName;
            this.pageLoaded();
          },
          //点击收藏
          collectClick(event){
            event.cancelBubble=true;
            if(!this.lock){
              this.lock=true;
              let row=event.srcElement.attributes.collected?event.srcElement.attributes.collected.value:"";
              let rowId=event.srcElement.attributes.asin?event.srcElement.attributes.asin.value:"";
              if(rowId){
                this.TableItem.tableContainer.tableData.forEach((item)=>{
                  if(item.orderNumber==row){
                    let initStr=item.collection;
                    let collection=item.collection=="0"?"1":"0";
                    this.$set(item,"collection",collection);
                    let collectionRelate="";
                    if(item.collection=="1"){
                      collectionRelate="COLLECTION"
                      //点击收藏
                    }else{
                      //0
                      if(initStr=="1"){   //之前是点击了收藏
                        //取消当前收藏
                        collectionRelate="UNCOLLECTION"
                      }else{
                        this.lock=false;
                        return false;
                      }
                    }
                    let configUrl="/recommendation/new/collection";
                    if(this.TableItem.type=="explode"){
                      configUrl="/recommendation/best/collection";
                    }
                    commonUtil.queryData({
                      url:configUrl,
                      queryParams:{
                          collectionEntities:JSON.stringify([{
                          asin:rowId,
                          collectionAction:collectionRelate,
                          category:commonUtil.handelFormat(this.chooseType),
                          siteType:this.siteType
                        }]),
                        platform:this.platform
                      },
                      callback:(res)=>{
                        if(res.status==1){
                          this.lock=false;
                          if(collectionRelate=="COLLECTION"){
                            this.$Notice.success({
                              title: '收藏成功',
                              desc: "收藏成功"
                            });
                          }else{
                            this.$Notice.success({
                              title: '取消收藏成功',
                              desc: "取消收藏成功"
                            });
                          }

                        }else{
                          this.lock=false;
                          if(collectionRelate=="COLLECTION"){
                            this.$Notice.error({
                              title: '收藏失败',
                              desc: '收藏失败'
                            });
                          }else{
                            this.$Notice.error({
                              title: '取消收藏失败',
                              desc: '取消收藏失败'
                            });
                          }
                        }
                      },
                      error:()=>{
                        this.lock=false;
                      }
                    })
                  }
                })
              }else{
                this.lock=false;
              }
            }
          },
          /*----------表格排序拖拽模块--------------*/
          //点击排序
          sortAbleTable(){
            this.showSortable=!this.showSortable;
          },
          saveClickSort(){
            this.showSortable=false;
            this.saveSortAble(this.TableItem.tableContainer.tableColumns);
          },
          cancelClick(){
            this.showSortable=false;
          },
          changeSortstate(val){
            this.sortState=val;
          },
          getCurrentState() {
            let typeState = "";
            if (this.TableItem.type == "explode") {
              if (this.TableItem.showNewColumn == "name1") {
                if(this.platform=="AMZ"){
                  switch (this.collectBtnsActive) {
                    case "tab1":
                      typeState = 40;
                      break;
                    case "tab2":
                      typeState = 41;
                      break;
                    case "tab3":
                      typeState = 42;
                      break;
                  }
                }else{
                  switch (this.collectBtnsActive) {
                    case "tab1":
                      typeState = 30;
                      break;
                    case "tab2":
                      typeState = 31;
                      break;
                    case "tab3":
                      typeState = 32;
                      break;
                  }
                }
              } else if (this.TableItem.showNewColumn == "name4") {
                switch (this.collectBtnsActive) {
                  case "tab1":
                    typeState = 43;
                    break;
                  case "tab2":
                    typeState = 44;
                    break;
                  case "tab3":
                    typeState = 45;
                    break;
                }
              } else if (this.TableItem.showNewColumn == "name3") {
                switch (this.collectBtnsActive) {
                  case "tab1":
                    typeState = 46;
                    break;
                  case "tab2":
                    typeState = 47;
                    break;
                  case "tab3":
                    typeState = 48;
                    break;
                }
              }
            } else {
              //新品
              if (this.TableItem.showNewColumn == "name1") {
                switch (this.collectBtnsActive) {
                  case "tab1":
                    typeState = 49;
                    break;
                  case "tab2":
                    typeState = 50;
                    break;
                  case "tab3":
                    typeState = 51;
                    break;
                }
              } else if (this.TableItem.showNewColumn == "name4") {
                switch (this.collectBtnsActive) {
                  case "tab1":
                    typeState = 52;
                    break;
                  case "tab2":
                    typeState = 53;
                    break;
                  case "tab3":
                    typeState = 54;
                    break;
                }

              } else if (this.TableItem.showNewColumn == "name3") {
                switch (this.collectBtnsActive) {
                  case "tab1":
                    typeState = 55
                    break;
                  case "tab2":
                    typeState = 56
                    break;
                  case "tab3":
                    typeState = 57
                    break;
                }

              }
            }
            return typeState;
          },
          saveSortAble(data){
            //判断是否有修改状态
            let flag=0;
            this.initSortState.forEach((item)=>{
              this.columns.forEach((row)=>{
                if(item.key==row.key&&row.isSelect==item.isSelect){
                  flag++;
                }
              })
              })
            if(flag!=this.columns.length||this.sortState){
              let typeState=this.getCurrentState();
              commonUtil.queryData({
                url:"/di/common/save/colunmOrder",
                queryParams:{
                  paramName:"列显示状态"+this.platform,
                  type:typeState,
                  paramData:JSON.stringify(data?data:[]),
                },
                callback:(res)=>{
                  if(res.status==1){
                    this.$Notice.success({
                      title: '保存列表样式成功',
                      desc: "保存列表样式成功"
                    });
                    commonUtil.clearArray(this.initSortState);
                    //更新当前的list清单
                    this.columns.forEach((columns)=>{
                      this.initSortState.push({
                        key:columns.key,
                        isSelect:columns.isSelect
                      });
                    })
                  }else{
                    //失败
                    this.$Notice.error({
                      title: '保存列表样式失败',
                      desc: '保存列表样式失败'
                    });
                  }
                }
              })
            }
            this.sortState=false;
          },
          getSortAble(success){
            let typeState=this.getCurrentState();
            commonUtil.queryData({
              url:"/di/common/get/colunmOrder",
              queryParams:{
                paramName:"列显示状态"+this.platform,
                type:typeState,
              },
              callback:(res)=>{
                if(res.data){
                  success&&success(JSON.parse(res.data));
                }else{
                  //返回空
                  success&&success([])
                }
              }
            })
          },
          /*----------表格保存类目提示模块--------------*/
          //保存不再提示状态
          saveNoMoreData(data){
            commonUtil.queryData({
              url:"/di/common/save/colunmOrder",
              queryParams:{
                paramName:"不再提示",
                type:this.TableItem.type=="explode"?6:5,
                paramData:JSON.stringify(data?data:{}),
              },
              callback:(res)=>{
                if(res.status==1){

                }else{
                  //失败
                }
              }
            })
          },
          //获取不再提示状态
          getTipsState(success){
            commonUtil.queryData({
              url:"/di/common/get/colunmOrder",
              queryParams:{
                paramName:"不再提示",
                type:this.TableItem.type=="explode"?6:5,
              },
              callback:(res)=>{
                if(res.data){
                  success&&success(JSON.parse(res.data))
                }else{
                  //返回空
                  let obj=this.TableItem.type=="explode"?{noMoreTipsExplode:false}:{noMoreTipsNews:false};
                  success&&success(obj)
                }
              }
            })
          },
          //确定不再提示
          confirmAll(){
              //不再提示
            if(this.noMoreTips){
              if(this.TableItem.type=="explode"){
                this.saveNoMoreData({
                  noMoreTipsExplode:this.noMoreTips
                })
              }else{
                this.saveNoMoreData({
                  noMoreTipsNews:this.noMoreTips
                })
              }
            }
            this.isNoData=false;
          },
          /*-------表格类目、品牌、产品模块-----------------*/
          //初始化获取品牌名、bsr品类、产品名
          getInputValInit(){
            if(this.TableItem.showNewColumn=="name3"){
              commonUtil.clearArray(this.TableItem.tableContainer.sortData);
              this.pageBean.currentPage=1;
              this.pageBean.oldPage = 1;
              this.getNewsThirtyBsr();
              this.getBrandName();
              this.getSumProductName();
            }else{
              this.getBrandName();
            }
          },
          /*----------品牌-------------*/
          //获取汇总品牌名
          getBrandName(query){
            let _this=this;
            let sendDemesion=[];
            let sendCondition=[];
            //获取bsr分类
            this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
                if(item.chinese==="类目"){
                  if(this.collectBtnsActive=="tab2"){
                    this.$set(item, "val", "");
                  }else{
                    this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                  }
                }
                if(item.chinese!=="BSR分类"){
                  sendCondition.push(item);
                }
            });
            this.TableItem.tableContainer.columns.demesion.forEach((item,index)=>{
              if(item.chinese==="品牌名"){
//            //默认的bsr品类
                sendDemesion.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "EQUAL",//要
                  "sortType":"ASC"
                })
                sendCondition.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "LIKE",//要
                  "val":query?query:""
                });
              }

            })
            if(this.TableItem.showNewColumn=="name3"){
              //带条件
              let obj1= this.TableItem.tableContainer.queryData.incrementTop;
              let objSend1 = {
                "col": obj1.col,
                "chinese": obj1.chinese,
                "uuid": obj1.uuid,
                "columnType": obj1.columnType ? obj1.columnType : "",
                "relation": "EQUAL",
                "val": obj1.inputVal==""?100000:obj1.inputVal
              }
              let obj2= this.TableItem.tableContainer.queryData.sellDays;
              let objSend2 = {
                "col": obj2.col,
                "chinese": obj2.chinese,
                "uuid": obj2.uuid,
                "columnType": obj2.columnType ? obj2.columnType : "",
                "relation": "EQUAL",
                "val": obj2.inputVal
              }
              //增长度
              let obj3= this.TableItem.tableContainer.queryData.growth;
              let objSend3 = {
                left: {
                  "col": "$repl$largeAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj3.inputVal[0]
                },
                right: {
                  "col": "$repl$lessAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj3.inputVal[1]
                }
              }
              //偏差度
              let obj4=this.TableItem.tableContainer.queryData.deflection;
              let objSend4= {
                left: {
                  "col":"$repl$largeR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj4.inputVal[0]/100
                },
                right: {
                  "col": "$repl$lessrR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj4.inputVal[1]/100
                }
              }
              sendCondition.push(objSend1);
              sendCondition.push(objSend2);
              sendCondition.push(objSend3.left);
              sendCondition.push(objSend3.right);
              sendCondition.push(objSend4.left);
              sendCondition.push(objSend4.right);
              this.TableItem.tableContainer.loadingState.brandloading=true;
            }
            let cid=this.TableItem.parmasConfig.query.cid;
            let modelId=this.TableItem.parmasConfig.query.modelID;
            let configUrl="/di/box/data";
            if(this.collectBtnsActive=="tab2"){
              //收藏
              modelId="624";
              cid="624";
              configUrl="/di/box/collection/data";
              sendCondition.push({
                "col": "rpt_products_collections.is_collection",
                "chinese": "是否收藏",
                "alias": "is_collection",
                "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
                "val": 1,
                "columnType": "NUMBER",
                "relation" : "EQUAL"
              })
            }
            commonUtil.queryData({
              url: configUrl,
              async:true,
              queryParams: {
                cid: cid,
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure":[],
                  //demesion
                  "groupbys":sendDemesion?sendDemesion:[],
                  "tableName": "kylin_sales",
                  "conditions": sendCondition?sendCondition:[],
                  "conditionMap": {}
                }),
                //固定
                project: "scgs_amazon",
                platform:this.platform,
                pageBean: JSON.stringify({
                  "oldCurrentPage": 0,
                  "currentPage": 1,
                  "pageSize": 300
                }),
                //固定
                modelID: modelId
              },
              callback: (res) => {
                if(_this.TableItem.showNewColumn=="name3"){
                  _this.TableItem.tableContainer.loadingState.brandloading=false;
                 ( _this.TableItem.tableContainer.loadingState.brandloading);
                }
                if(res.status===1){
                  commonUtil.clearArray(_this.TableItem.tableContainer.brandData);
                  let brands=[];
                  if(res.data.result&&res.data.result.length>0){
                    res.data.result.forEach((item,i)=>{
                      brands.push(item[0]);
                    })
                    //品牌
                    brands=commonUtil.filterRepeat(brands);
                    brands.forEach((brand,j)=>{
                      if(brand&&brand!=""){
                        _this.TableItem.tableContainer.brandData.push({
                          value:brand,
                          label:brand
                        })
                      }
                    })
                  }
                }
              },
              error:()=>{
                if(_this.TableItem.showNewColumn=="name3"){
                   _this.TableItem.tableContainer.loadingState.brandloading=false;
                }
              }
            })
          },
          //获取品牌数
          getBrandCount(){
            let _this=this;
            this.TableItem.tableContainer.brandCount="";
            let condition=[];
            //品牌数量
            let messures=commonUtil.setConditions("measures", [{
              "chinese": "品牌数量",
              "col": "RPT_KYLIN_AMZ_BRAND_NUM.BRAND_NUM",
              "uuid": "7a9167cc-0c62-41b3-ab84-94cb0c7efef4"
            }])
            condition.push({
              "chinese": "类目", //要
              "col": "RPT_KYLIN_AMZ_BRAND_NUM.CATEGORY",//要
              "columnType": "STRING",//要
              "uuid": "9c311849-9b4c-423c-bb6d-101378cc68f8",//要
              "relation": "EQUAL",//要
              "val":commonUtil.handelFormat(this.chooseType)
            })
            condition.push({
              "chinese": "站点", //要
              "col": "RPT_KYLIN_AMZ_BRAND_NUM.SCGS_SITE_TYPE",//要
              "columnType": "STRING",//要
              "uuid": "fef59aa5-556c-44a4-b5b3-280299cc4390",//要
              "relation": "EQUAL",//要
            });
            commonUtil.queryData({
              url:"/query/single",
              async:true,
              queryParams: {
                cid: _this.TableItem.parmasConfig.brandCount.cid,
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure":messures?messures:[],
                  //demesion
                  "groupbys": [] ,
                  "tableName": "kylin_sales",
                  "conditions":condition?condition:[],
                  "conditionMap": {}
                }),
                //固定
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": _this.TableItem.pageBean.oldPage,
                  "currentPage": _this.TableItem.pageBean.currentPage,
                  "pageSize": _this.TableItem.pageBean.pageSize
                }),
                //固定
                modelID: _this.TableItem.parmasConfig.brandCount.modelID
              },
              callback:(res)=>{
                if(res.status==1){
                  if(res.data.result&&res.data.result.length>0){
                    _this.TableItem.tableContainer.brandCount=res.data.result[0].join("");
                  /*  _this.TableItem.tableContainer.tableColumns.forEach((item,index)=>{
                      if(item.key===commonUtil.getUUID("品牌名",_this.TableItem.tableContainer.columns.demesion.concat(_this.TableItem.tableContainer.columns.messures))){
                        _this.$set(item,"title","品牌名"+"("+_this.TableItem.tableContainer.brandCount+")");
                      }
                    })*/
                  }
                }
              },
              error:()=>{

              }
            })
          },
          /*----------bsr品类-------------*/
          //获取bsr分类
          getBSRcategory(success){
            let _this=this;
            let sendDemesion=[];
            let sendCondition=[];
            let columnMessure=[];
            commonUtil.clearArray(_this.TableItem.tableContainer.sortData);
            this.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal","");
            //获取bsr分类
            this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
              if(item.chinese==="BSR分类"){
//            //默认的bsr品类
                sendDemesion.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "EQUAL",//要
                  "sortType":"ASC"
                })
                columnMessure.push(
                  {
                    "chinese": "数量",
                    "col": "count(1)",
                    "columnType": "STRING",
                    "uuid": "countss",
                    "alias": "count_num"
                  }
                )
              }else{
                if(item.chinese==="类目"){
                  if(this.collectBtnsActive=="tab2"){
                   //收藏
                    this.$set(item, "val", "");
                  }else{
                    this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                  }
                }
                sendCondition.push(item);
              }
            });
            let cid=this.TableItem.parmasConfig.query.cid;
            let modelId=this.TableItem.parmasConfig.query.modelID;
            let configUrl="/di/box/data";
            if(this.collectBtnsActive=="tab2"){
              //收藏
              modelId="624";
              cid="624";
              configUrl="/di/box/collection/data";
              sendCondition.push({
                "col": "rpt_products_collections.is_collection",
                "chinese": "是否收藏",
                "alias": "is_collection",
                "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
                "val": 1,
                "columnType": "NUMBER",
                "relation" : "EQUAL"
              })
            }
            commonUtil.queryData({
              url: configUrl,
              queryParams: {
                cid: cid,
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure":columnMessure?columnMessure:[],
                  //demesion
                  "groupbys":sendDemesion?sendDemesion:[],
                  "tableName": "kylin_sales",
                  "conditions": sendCondition ? sendCondition : [] ,
                  "conditionMap": {}
                }),
                //固定
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": 0,
                  "currentPage": 1,
                  "pageSize":500
                }),
                //固定
                modelID:modelId
              },
              callback: (res) => {
                if(res.status===1){
                  let sorts=[];
                  let showBig=false;
                  if(res.data.result&&res.data.result.length>0){
                    res.data.result.forEach((item,i)=>{
                      sorts.push(item);
                    })
                    sorts.forEach((sort,j)=>{
                      if(sort[0]&&sort[0]!=""){
                        if(sort[0]==this.chooseType[0]){
                          //获取当前类目的最大类目
                          showBig=true;
                          _this.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal",sort[0]);
                        }
                        _this.TableItem.tableContainer.sortData.push({
                          value:sort[0],
                          label:sort[0]+"("+sort[1]+")"
                        })
                      }
                    })
                    if(_this.TableItem.tableContainer.sortData.length>0){
                      if(_this.TableItem.showNewColumn=="name1"){
                        if(!showBig) {
                          //判断当前类目是否存在
                          _this.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal", _this.TableItem.tableContainer.sortData[0].value);
                        }
                      }
                    }
                    success&&success();
                  }else{
                    _this.showMessage.push(1);
                    success&&success();
                  }
                }
              },
              error:()=>{},
              complete:(res)=>{}
            })
          },
          //获取新推荐的BSR分类
          getNewsThirtyBsr(){
            let _this=this;
            let sendDemesion=[];
            let sendCondition=[];
            let columnMessure=[];
            //获取bsr分类
            this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
              if(item.chinese==="BSR分类"){
//            //默认的bsr品类
                sendDemesion.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "EQUAL",//要
                  "sortType":"ASC"
                })
                columnMessure.push({
                  "chinese": "数量",
                  "col": "count(1)",
                  "columnType": "STRING",
                  "uuid": "countss",
                  "alias": "count_num"
                })
              }
              else{if(item.chinese==="类目"){
                if(this.collectBtnsActive=="tab2"){
                  //收藏
                  this.$set(item, "val", "");
                }else{
                  this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                }
              }sendCondition.push(item);}
            });
            //控件条件配置
            if(this.TableItem.showNewColumn=="name3"){
              //带条件
              let obj1= this.TableItem.tableContainer.queryData.incrementTop;
              let objSend1 = {
                "col": obj1.col,
                "chinese": obj1.chinese,
                "uuid": obj1.uuid,
                "columnType": obj1.columnType ? obj1.columnType : "",
                "relation": "EQUAL",
                "val": obj1.inputVal==""?100000:obj1.inputVal
              }
              let obj2= this.TableItem.tableContainer.queryData.sellDays;
              let objSend2 = {
                "col": obj2.col,
                "chinese": obj2.chinese,
                "uuid": obj2.uuid,
                "columnType": obj2.columnType ? obj2.columnType : "",
                "relation": "EQUAL",
                "val": obj2.inputVal
              }
              //增长度
              let obj3= this.TableItem.tableContainer.queryData.growth;
              let objSend3 = {
                left: {
                  "col": "$repl$largeAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj3.inputVal[0]
                },
                right: {
                  "col": "$repl$lessAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj3.inputVal[1]
                }
              }
              //偏差度
              let obj4=this.TableItem.tableContainer.queryData.deflection;
              let objSend4= {
                left: {
                  "col":"$repl$largeR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj4.inputVal[0]/100
                },
                right: {
                  "col": "$repl$lessrR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj4.inputVal[1]/100
                }
              }
              sendCondition.push(objSend1);
              sendCondition.push(objSend2);
              sendCondition.push(objSend3.left);
              sendCondition.push(objSend3.right);
              sendCondition.push(objSend4.left);
              sendCondition.push(objSend4.right);
            }
            let cid=this.TableItem.parmasConfig.query.cid;
            let modelId=this.TableItem.parmasConfig.query.modelID;
            let configUrl="/di/box/data";
            if(this.collectBtnsActive=="tab2"){
              //收藏
              modelId="624";
              cid="624";
              configUrl="/di/box/collection/data";
              sendCondition.push({
                "col": "rpt_products_collections.is_collection",
                "chinese": "是否收藏",
                "alias": "is_collection",
                "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
                "val": 1,
                "columnType": "NUMBER",
                "relation" : "EQUAL"
              })
            }
            commonUtil.queryData({
              url:configUrl,
              queryParams: {
                cid:cid,
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure":columnMessure?columnMessure:[],
                  //demesion
                  "groupbys":sendDemesion?sendDemesion:[],
                  "tableName": "kylin_sales",
                  "conditions": sendCondition ? sendCondition : [] ,
                  "conditionMap": {}
                }),
                //固定
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": this.pageBean.oldPage,
                  "currentPage": this.pageBean.currentPage,
                  "pageSize":this.pageBean.pageSize
                }),
                //固定
                modelID: modelId
              },
              callback: (res) => {
                if(res.status===1){
                  let sorts=[];
                  _this.$store.commit("changeNoMoreData",false);
                  if(res.data.result&&res.data.result.length>0){
                    res.data.result.forEach((item,i)=>{
                      sorts.push(item);
                    })
                    if(this.TableItem.showNewColumn=="name3"){
                      if(_this.pageBean.currentPage==1){
                        _this.TableItem.tableContainer.sortData.push({
                          label:"全部",
                          value:"全部"
                        })
                      }
                    }
                    sorts.forEach((sort,j)=>{
                      if(sort[0]&&sort[0]!=""){
                        _this.TableItem.tableContainer.sortData.push({
                          value:sort[0],
                          label:sort[0]+"("+sort[1]+")"
                        })
                      }
                    })
                  }else{
                    _this.$store.commit("changeNoMoreData",true);
                    _this.showMessage.push(1);
                  }
                }
              },
              error:()=>{},
              complete:(res)=>{}
            })
          },
          //搜索bsr品类
          queryBsrData(query){
            let _this=this;
            this.queryStr = query;
            let sendDemesion=[];
            let sendCondition=[];
            let columnMessure=[];
            //获取bsr分类
            this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
              if(item.chinese==="BSR分类"){
//            //默认的bsr品类
                sendDemesion.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "EQUAL",//要
                  "sortType":"ASC"
                })
                columnMessure.push({
                  "chinese": "数量",
                  "col": "count(1)",
                  "columnType": "STRING",
                  "uuid": "countss",
                  "alias": "count_num"
                })
                sendCondition.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "LIKE",//要
                  "val":this.queryStr?this.queryStr:""
                });
              }
              else{if(item.chinese==="类目"){
                if(this.collectBtnsActive=="tab2"){
                  //收藏
                  this.$set(item, "val", "");
                }else{
                  this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                }
              }
              sendCondition.push(item);
              }
            });
            //控件条件配置
            if(this.TableItem.showNewColumn=="name3"){
              //带条件
              let obj1= this.TableItem.tableContainer.queryData.incrementTop;
              let objSend1 = {
                "col": obj1.col,
                "chinese": obj1.chinese,
                "uuid": obj1.uuid,
                "columnType": obj1.columnType ? obj1.columnType : "",
                "relation": "EQUAL",
                "val": obj1.inputVal==""?100000:obj1.inputVal
              }
              let obj2= this.TableItem.tableContainer.queryData.sellDays;
              let objSend2 = {
                "col": obj2.col,
                "chinese": obj2.chinese,
                "uuid": obj2.uuid,
                "columnType": obj2.columnType ? obj2.columnType : "",
                "relation": "EQUAL",
                "val": obj2.inputVal
              }
              //增长度
              let obj3= this.TableItem.tableContainer.queryData.growth;
              let objSend3 = {
                left: {
                  "col": "$repl$largeAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj3.inputVal[0]
                },
                right: {
                  "col": "$repl$lessAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj3.inputVal[1]
                }
              }
              //偏差度
              let obj4=this.TableItem.tableContainer.queryData.deflection;
              let objSend4= {
                left: {
                  "col":"$repl$largeR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj4.inputVal[0]/100
                },
                right: {
                  "col": "$repl$lessrR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj4.inputVal[1]/100
                }
              }
              sendCondition.push(objSend1);
              sendCondition.push(objSend2);
              sendCondition.push(objSend3.left);
              sendCondition.push(objSend3.right);
              sendCondition.push(objSend4.left);
              sendCondition.push(objSend4.right);
            }
            let modelId=this.TableItem.parmasConfig.query.modelID;
            let cid=this.TableItem.parmasConfig.query.cid;
            let configUrl="/di/box/data";
            if(this.collectBtnsActive=="tab2"){
              //收藏
              modelId="624";
              cid="624";
              configUrl="/di/box/collection/data";
              sendCondition.push({
                "col": "rpt_products_collections.is_collection",
                "chinese": "是否收藏",
                "alias": "is_collection",
                "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
                "val": 1,
                "columnType": "NUMBER",
                "relation" : "EQUAL"
              })
            }
            commonUtil.queryData({
              url: configUrl,
              async: false,
              queryParams: {
                cid: cid,
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure":columnMessure?columnMessure:[],
                  //demesion
                  "groupbys":sendDemesion?sendDemesion:[],
                  "tableName": "kylin_sales",
                  "conditions": sendCondition ? sendCondition : [] ,
                  "conditionMap": {}
                }),
                //固定
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": this.pageBean.oldPage,
                  "currentPage": this.pageBean.currentPage,
                  "pageSize":this.pageBean.pageSize
                }),
                //固定
                modelID: modelId
              },
              callback: (res) => {
                if(res.status===1){
                  let sorts=[];
                  _this.$store.commit("changeNoMoreData",false);
                  if(res.data.result&&res.data.result.length>0){
                    res.data.result.forEach((item,i)=>{
                      sorts.push(item);
                    })
                    if(_this.TableItem.showNewColumn=="name3"){
                      if(this.queryStr==""){
                        _this.TableItem.tableContainer.sortData.push({
                          label:"全部",
                          value:"全部"
                        })
                      }
                    }
                    sorts.forEach((sort,j)=>{
                      if(sort[0]&&sort[0]!=""){
                        _this.TableItem.tableContainer.sortData.push({
                          value:sort[0],
                          label:sort[0]+"("+sort[1]+")"
                        })
                      }
                    })
                  }else{
                    _this.$store.commit("changeNoMoreData",true);
                    _this.showMessage.push(1);
                  }
                }
              },
              error:()=>{},
              complete:(res)=>{}
            })
          },
          //默认保存Bsr
          defaultBsrVal(success){
            if(this.$store.state.bsr){
              this.TableItem.tableContainer.queryData.BSRsort.inputVal=this.$store.state.bsr;
              //判断是否带过来
              this.searchData();
              this.getTableCount(()=>{
                if(this.TableItem.pageBean.totalCount==0){
                  this.getTipsState((data)=>{
                    if(this.TableItem.type=="explode"){
                      if(!data.noMoreTipsExplode){
                        this.isNoData=true;
                      }
                    }
                    else{
                      if(!data.noMoreTipsNews){
                        this.isNoData=true;
                      }
                    }
                  })
                  this.$set(this.TableItem.tableContainer.queryData.BSRsort, "inputVal","全部");
                  commonUtil.clearArray(this.chooseType);
                  this.chooseType.push("");
                }
                commonUtil.clearArray(this.TableItem.initCondition.condition);
                success&&success();
              });
            }else{
              //空
              this.getTipsState((data)=>{
                if(this.TableItem.type=="explode"){
                  if(!data.noMoreTipsExplode){
                    this.isNoData=true;
                  }
                }
                else{
                  if(!data.noMoreTipsNews){
                    this.isNoData=true;
                  }
                }
              })
              this.$set(this.TableItem.tableContainer.queryData.BSRsort, "inputVal","全部");
              commonUtil.clearArray(this.chooseType);
              this.chooseType.push("");
              commonUtil.clearArray(this.TableItem.initCondition.condition);
              success&&success();
            }
          },
          /*----------产品名-------------*/
          //获取汇总产品名
          getSumProductName(query){
            let _this=this;
            let sendDemesion=[];
            let sendCondition=[];
            //获取bsr分类
            this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
              if(item.chinese==="类目"){
                if(this.collectBtnsActive=="tab2"){
                  //收藏
                  this.$set(item, "val", "");
                }else{
                  this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
              }
              }
              if(item.chinese!=="BSR分类"){
                sendCondition.push(item);
              }
            });
            this.TableItem.tableContainer.columns.demesion.forEach((item,index)=>{
              if(item.chinese==="产品名称"){
//            //默认的bsr品类
                sendDemesion.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "EQUAL",//要
                  "sortType":"ASC"
                })
                sendCondition.push({
                  "chinese": item.chinese, //要
                  "col": item.col,//要
                  "columnType": item.columnType,//要
                  "uuid": item.uuid,//要
                  "relation": "LIKE",//要
                  "val":query?query:""
                });
              }
            })
            if(this.TableItem.showNewColumn=="name3"){
              //带条件
              let obj1= this.TableItem.tableContainer.queryData.incrementTop;
              let objSend1 = {
                "col": obj1.col,
                "chinese": obj1.chinese,
                "uuid": obj1.uuid,
                "columnType": obj1.columnType ? obj1.columnType : "",
                "relation": "EQUAL",
                "val": obj1.inputVal==""?100000:obj1.inputVal
              }
              let obj2= this.TableItem.tableContainer.queryData.sellDays;
              let objSend2 = {
                "col": obj2.col,
                "chinese": obj2.chinese,
                "uuid": obj2.uuid,
                "columnType": obj2.columnType ? obj2.columnType : "",
                "relation": "EQUAL",
                "val": obj2.inputVal
              }
              //增长度
              let obj3= this.TableItem.tableContainer.queryData.growth;
              let objSend3 = {
                left: {
                  "col": "$repl$largeAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj3.inputVal[0]
                },
                right: {
                  "col": "$repl$lessAngle",
                  "chinese": obj3.chinese,
                  "uuid": obj3.uuid,
                  "columnType": obj3.columnType ? obj3.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj3.inputVal[1]
                }
              }
              //偏差度
              let obj4=this.TableItem.tableContainer.queryData.deflection;
              let objSend4= {
                left: {
                  "col":"$repl$largeR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": obj4.inputVal[0]/100
                },
                right: {
                  "col": "$repl$lessrR",
                  "chinese": obj4.chinese,
                  "uuid": obj4.uuid,
                  "columnType": obj4.columnType ? obj4.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val":obj4.inputVal[1]/100
                }
              }
              sendCondition.push(objSend1);
              sendCondition.push(objSend2);
              sendCondition.push(objSend3.left);
              sendCondition.push(objSend3.right);
              sendCondition.push(objSend4.left);
              sendCondition.push(objSend4.right);
              this.TableItem.tableContainer.loadingState.productloading = true;
            }
            let cid=this.TableItem.parmasConfig.query.cid;
            let modelId=this.TableItem.parmasConfig.query.modelID;
            let configUrl="/di/box/data";
            if(this.collectBtnsActive=="tab2"){
              //收藏
              modelId="624";
              cid="624";
              configUrl="/di/box/collection/data";
              sendCondition.push({
                "col": "rpt_products_collections.is_collection",
                "chinese": "是否收藏",
                "alias": "is_collection",
                "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
                "val": 1,
                "columnType": "NUMBER",
                "relation" : "EQUAL"
              })
            }
            commonUtil.queryData({
              url: configUrl,
              async:true,
              queryParams: {
                cid: cid,
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure":[],
                  //demesion
                  "groupbys":sendDemesion?sendDemesion:[],
                  "tableName": "kylin_sales",
                  "conditions": sendCondition?sendCondition:[],
                  "conditionMap": {}
                }),
                platform:this.platform,
                //固定
                project: "scgs_amazon",
                pageBean: JSON.stringify({
                  "oldCurrentPage": 0,
                  "currentPage": 1,
                  "pageSize": 500
                }),
                //固定
                modelID:modelId
              },
              callback: (res) => {
                if(_this.TableItem.showNewColumn=="name3") {
                  _this.TableItem.tableContainer.loadingState.productloading = false;
                }
                if(res.status===1){
                  commonUtil.clearArray(_this.TableItem.tableContainer.productData);
                  let procucts=[];
                  if(res.data.result&&res.data.result.length>0){
                    res.data.result.forEach((item,i)=>{
                      item.forEach((strVal)=>{
                          procucts.push(strVal);
                      })
                    })
                    procucts=commonUtil.filterRepeat(procucts);
                    procucts.forEach((product,j)=>{
                      if(product!=""){
                        _this.TableItem.tableContainer.productData.push({
                          value:product,
                          label:product
                        })
                      }
                    })
                  }
                }
              }
            })
          },
          /*----------分页模块-------------------*/
          //分页请求处理
          changeNextPage(page) {
            if(this.TableItem.tableContainer.tableData.length==0){
              return;
            }
            //获取页数
            this.$set(this.TableItem.pageBean,"currentPage",page);
            this.$set(this.TableItem.pageBean,"toPage",page);
            this.$set(this.TableItem.initCondition,"isPage",true);
            //获取下/上一页数据
            this.mockTableData();
          },
          //切换页数
          changeSize(size){
            this.$set(this.TableItem.pageBean,"currentPage",1);
            this.$set(this.TableItem.pageBean,"toPage",1);
            this.$set(this.TableItem.pageBean,"pageSize",size);
            this.$set(this.TableItem.initCondition,"isPage",true);
            this.mockTableData();
          }
        }
    }
</script>
<style lang="less">
  @import "../../../../../style/insight/dataTableList.less";
  @import "../../../../../style/insight/tablelist.less";
</style>
