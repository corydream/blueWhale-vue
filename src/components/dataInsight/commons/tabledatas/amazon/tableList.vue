<template>
    <div>
  <!--    <div id="scrollTable">
        <ul>
          <li>
          </li>
        </ul>
      </div>-->
            <Table
              height="800"
              :data="TableItem.tableContainer.tableData"
              :row-class-name="rowClassName"
              :columns="TableItem.tableContainer.tableColumns"
              :loading="loading"
              class="tables"
              @on-sort-change="sortAll"
            >
            </Table>
        <Switch v-model="loading"></Switch>
        <div class="imgCover"
             v-if="showImg"
             @click="closeImg"
             :class="{'showImg':showImg}">
          <img :src="bigImg" alt="">
        </div>
        <div style="margin-top:20px;overflow: hidden">
          <div style="float: right;">
            <Page
              show-elevator
              :total="TableItem.pageBean.totalCount"
              :page-size="TableItem.pageBean.pageSize"
              :page-size-opts="pageSizes"
              :current="TableItem.pageBean.currentPage"
              class="fl"
              show-sizer
              placement="top"
              @on-page-size-change="changeSize"
              @on-change="changeNextPage"
            >
            </Page>
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
</template>
<script>
  //数据处理类
  import Model from "../../../../../config/insight/commons/dataHelper";
  //通用方法
  import commonUtil from "../../../../../config/insight/commons/comonUse";
  //表格相关类
  import  tableUtil from "../../../../../config/insight/commons/tablesListClass"
  import chartBox from "../../drawOneechart.vue";
  import draggableBox from "../../sortDraggable.vue";
//  import IScroll from "iscroll";
  export default {
        data() {
          return{
            bigImg:"", //点击放大图片
            loading: true, //表格遮罩层
            showImg:false,
            isNoData:false,
            noMoreTips:false,
            showSortable:false,
            btnText:"",
            btnText2:"",
            sortState:false,
            platform:"AMZ",
            columns:[],
            initSortState:[],
            asin:{},
            pageSizes:[10,20,30,40,100],
            scrolObj:{}
        }
        },
        computed:{
          siteType(){
            return this.$store.state.site;
          }
        },
        components:{chartBox,draggableBox},
        props:['TableItem','showMessage','chooseType','pageBean','collectBtnsActive'],
        created() {
          //判断当前的平台类型
          if(this.TableItem.type=="explode"&&this.TableItem.showNewColumn=="name1"){
            let routerName=this.$route.name;
            switch (routerName){
              case "explodeProductAmazonSum":this.platform="AMZ";break;
              case "explodeProductEbaySum":this.platform="EBAY";break;
            }
          }
          tableUtil.getDatas({
            TableItem: this.TableItem,
            platform:this.platform,
            _vue:this,
            _this:tableUtil,
            initSortState:this.initSortState,
            pageBean:this.pageBean
          });
        },
        mounted(){
          this.$nextTick(()=>{
          /*  this.scrolObj = new IScroll('#scrollTable', {
              scrollX: true,
              scrollY: false,
              click:true,
              scrollbars:'custom',
              eventPassthrough:true,
              interactiveScrollbars:true,
              preventDefault: false
            });*/
            this.changeSelect(this.collectBtnsActive||"tab1");
            document.addEventListener("click",(e)=>{
              e.stopPropagation();
              let box=$("#sortableBox");
              if(!(box.has(e.target).length!=0||e.target.id=='iconBox')){
                this.showSortable=false;
              }
            })
          })
        },
        filters:{
          formatTotal(num){return num && num.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',')}
       },
        watch:{
          'collectBtnsActive':function (newValue) {
              this.changeSelect(newValue);
          }
        },
        methods:{
          changeCycle(){},
          pageLoaded(){tableUtil.pageLoaded();},
          mockTableData(){tableUtil.mockTableData();},
          /*----------表格数据处理-------------*/
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
            tableUtil.getTableData();
          },
          /*----------表格样式交互相关--------------*/
          changeSelect(newValue){
            tableUtil.isCollect(newValue);
            this.pageLoaded();
          },
          //切换我的收藏
          tabCollection(tabName){
            this.collectBtnsActive=tabName;
          },
          //跳转路由到详情
          goASINDetail(event){
            let asin=null;
            if(event.target.text){
              asin=event.target.text
            }else if(event.target.attributes.asintext){
              asin=event.target.attributes.asintext.value
            }
            let pathName=null;
            let backName="";
            if(this.TableItem.type==="news"){
              if(this.TableItem.showNewColumn=="name4"){
                backName="新品总榜单";
              }else if(this.TableItem.showNewColumn=="name1"){
                backName="新品NRR榜单";
              }else if(this.TableItem.showNewColumn=="name3") {
                backName="新品推荐列表";
              }
              pathName="newsAsinDetail";
            }else if(this.TableItem.type=="explode") {
              if (this.TableItem.showNewColumn == "name4") {
                backName = "爆品总榜单";
              } else if (this.TableItem.showNewColumn == "name1") {
                backName = "爆品BSR榜单";
              } else if (this.TableItem.showNewColumn == "name3") {
                backName = "爆品推荐列表";
              }
              pathName="explodeAsinDetail";
            }
            this.asin={
                asinId:asin,
                backName:backName,
                category:commonUtil.handelFormat(this.chooseType),
                siteType:this.siteType,
                platform:this.platform,
                pageType:this.TableItem.type
            };
            this.$store.commit("isShowAsin",true);
            this.$store.commit("changeAsinPramas",this.asin);
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
            return tableUtil.formateDateYMD(str);
          },
          //行样式处理
          rowClassName(row, index) {
            return 'demo-table-row';
          },
          /*----------表格收藏模块--------------*/
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
                        collectionEntities:JSON.stringify([
                          {
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
          getInputValInit(){
            tableUtil.getBSRcategory();
          },
          getBrandName(query){
            tableUtil.getBrandName(query);
          },
          getBrandCount(){
            tableUtil.getBrandCount();
          },
          getSumProductName(query){
            tableUtil.getSumProductName(query);
          },
          getNewsThirtyBsr(){
            tableUtil.getNewsThirtyBsr();
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
              let typeState=tableUtil.getCurrentState();
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
          changeSortstate(val){
            this.sortState=val;
          },
          changeState(){
            this.showAsin=false;
          },
          /*----------分页模块-------------------*/
          //分页请求处理
          changeNextPage(page) {
            tableUtil.changeNextPage(page);
            this.$Lazyload.lazyLoadHandler();
            console.log(this.$Lazyload)
            this.$Lazyload.performance();
            },
          //切换页数
          changeSize(size){
            tableUtil.changeSize(size);
            this.$Lazyload.lazyLoadHandler();
            console.log(this.$Lazyload)
            this.$Lazyload.performance();
          }
        }
    }
</script>
<style lang="less">
  #scrollTable{
    width: 100%;
    height:auto;
    overflow-x: hidden;
    position: relative;
    cursor: pointer;
    ul{
      margin: 0;
      padding: 0;
      width: 2457px;
      display: flex;
      flex-direction: row;
     li{
       flex: 1;
       width: 100%;
     }
    }
    .ivu-table-body{  overflow-x: hidden;  }
  }
  /* Styled scrollbars */
  .iScrollHorizontalScrollbar {
    position: absolute;
    z-index: 10;
    height: 16px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    overflow: hidden;
  }
  .iScrollHorizontalScrollbar.iScrollBothScrollbars {
    right: 18px;
  }
  .iScrollIndicator {
    position: absolute;
    border-radius: 8px;
  }
  .iScrollHorizontalScrollbar .iScrollIndicator {
    height: 100%;
    background: linear-gradient(left,  #eee 0%, #ddd 100%);
  }
</style>
