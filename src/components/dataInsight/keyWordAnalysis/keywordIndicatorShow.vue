<template>
    <div>
      <div class="memuBottom col-xs-12" v-show="indicatorShow">
        <div class="indiactorTop">
          <h2 class="textTitle">{{indicatorItem.title}}</h2>
          <div class="showFloder">
            <div class="floder" v-show="indicatorItem.indicatorshowFloder"
                 @click="isShowGraph"
                 :class="{flod:indicatorItem.indicatorshowFloder}">
              <span class="floder-text">收起</span>
              <Icon type="chevron-up" class="flder-icon"></Icon>
            </div>
            <div class="floder"  v-if="!indicatorItem.indicatorshowFloder"
                 @click="isShowGraph"
                 :class="{flod:indicatorItem.indicatorshowFloder}">
              <span class="floder-text">展开</span>
              <Icon type="chevron-down"class="flder-icon"></Icon>
            </div>
          </div>
        </div>
        <ul v-show="indicatorItem.indicatorshowFloder">
          <li class="memuItem" v-for="(item,key) in indicatorItem.databoardTarget">
            <div>
              <div class="itemLeft">
                <i class="icon-memu"></i>
              </div>
              <div class="itemRight" :class="{keyword:item.valType==='KEYWORD'}">
                <p class="avgPrice">{{item.title}}</p>
                <p class="numbers">{{item.avg}}
                  <span v-show="parseInt(item.avg)>=10000000" class="numbersCover" :class="{'showHover':parseInt(item.avg)>=10000000}">{{item.avg}}</span>
                </p>
                <p class="boarddata" v-if="item.valType!='KEYWORD'">
                  <span class="upload"><i class="icon-upload"></i>{{item.valType=="RANK"?item.minVal:item.maxVal}}</span>
                  <span class="download"><i class="icon-download"></i>{{item.valType=="RANK"?item.maxVal:item.minVal}}</span>
                </p>
              </div>
              <Tooltip :placement="item.position" class="myTips">
                <i class="fa fa-question-circle-o myhelp"></i>
                <div slot="content" class="mytipsContent">
                  <p>{{item.tips}}</p>
                </div>
              </Tooltip>
            </div>
          </li>
        </ul>
        <Spin fix v-if="!indicatorShow"></Spin>
      </div>
    </div>
</template>
<script>
  //通用方法
  import commonUtil from "../../../config/insight/commons/insightCommon";
    export default {
        data() {
          return{
            //指标遮罩层
            indicatorShow:false
          }
        },
        props:['indicatorItem','showMessage','chooseType','currentKeyword','conditionDateTime','taskId'],
        created(){
          //新品指标初始化
          this.getIndicator();
        },
        methods:{
          /*-----------指标模块----------*/
          getIndicator() {
            let _this = this;
            this.indicatorShow = false;
            for (var key in this.indicatorItem.databoardTarget) {
              let tempobj = this.indicatorItem.databoardTarget[key];
              let condition = [];
              //选择类目
              condition = tempobj.condition;
              this.$set(condition[0], "val",commonUtil.handelFormat(this.chooseType));
              this.$set(condition[1], "val",this.currentKeyword);
              this.$set(condition[2], "val",this.conditionDateTime[0]);
              this.$set(condition[3], "val",this.conditionDateTime[1]);
              this.$set(condition[4], "val",this.taskId);
              //获取新品指标
              ((tempobj) => {
                ///query/maxminavg
                commonUtil.queryData({
                  url: "/query/kylin",
                  async:true,
                  queryParams: {
                  //固定
                  cid: tempobj.cid,
                    //查询条件
                    sqlParam: JSON.stringify({
                    "columnMessure": tempobj.measures ? tempobj.measures : [],
                    "groupbys": tempobj.demesion ? tempobj.demesion : [],
                    "tableName": "kylin_sales",
                    "conditions": condition,
                    "conditionMap": {}
                  }),
                    //固定
                    project: "scgs_amazon",
                    pageBean: JSON.stringify({
                    "oldCurrentPage": 1,
                    "currentPage": 1,
                    "pageSize": tempobj.pageSize||5
                  }),
                    //固定
                    modelID: tempobj.modelID
                },
                  callback: (res) => {
                    _this.indicatorShow = true;
                    let result = res.data.result[0];
                    if (result && result.length > 0) {
                     if (tempobj.valType=="Date") {
                        result[0] = Math.round(result[0]);//平均
                      }
                      else {
                       if(tempobj.valType!="KEYWORD"){
                         result[0] = commonUtil.getFixedNumber(result[0])
                       }
                      }
                      if(tempobj.valType === "Date"){
                        result[1]=Math.round(result[1]);
                        result[2]=Math.round(result[2]);
                      }else{
                        result[1] = commonUtil.getFixedNumber(result[1]);
                        result[2] = commonUtil.getFixedNumber(result[2]);
                      }
                      _this.$set(tempobj, "avg", result[0])
                      _this.$set(tempobj, "maxVal", result[1])
                      _this.$set(tempobj, "minVal", result[2])
                      if(!result[0]&&!result[1]&&!result[2]){
                        //都为0
                        _this.showMessage.push(1);
                      }
                    } else {
                      _this.showMessage.push(1);
                      _this.$set(tempobj, "avg", 0)
                      _this.$set(tempobj, "maxVal", 0)
                      _this.$set(tempobj, "minVal", 0)
                    }
                  },
                  error:()=>{
                    _this.indicatorShow = true;
                  }
                })
              })(tempobj);
            }
          },
          isShowGraph(){
            this.indicatorItem.indicatorshowFloder=!this.indicatorItem.indicatorshowFloder;
            this.$emit("changeShow","indicator");
          }
        }
    }
</script>
<style scoped lang="less">
  @import "../../../style/insight/datainsight.less";
  .memuBottom > ul > li:nth-of-type(1){
    .itemLeft{display:none;}
    .itemRight{width: 100%; float: none; text-align: center !important;}
    .myTips{top:-16px;}
  }
  .indiactorTop{
    .showFloder{
      position: absolute;
      right: -23px;
      top:0px;
      color: #50b0ec;
      font-size: 14px;
      height: 21px;
      &:hover{
        cursor: pointer;
      }
    }
  }
</style>
