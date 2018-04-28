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
  import commonUtil from "../../../config/insight/commons/comonUse";
    export default {
        data() {
          return{
            //指标遮罩层
            indicatorShow:false
          }
        },
        props:['indicatorItem','showMessage','chooseType'],
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
              let objTarget = [];
              let condition = [];
              //选择类目
              condition = tempobj.condition;
              this.$set(tempobj.condition[1], "val",commonUtil.handelFormat(this.chooseType))
              for (let i = 0; i < tempobj.getTypes.length; i++) {
                objTarget.push({
                  "columnMessure": [
                    {
                      "agg": tempobj.getTypes[i],
                      "sortType": tempobj.measures[tempobj.getTypes[i]].sortType,
                      "chinese": tempobj.measures[tempobj.getTypes[i]].chinese,
                      "uuid": tempobj.measures[tempobj.getTypes[i]].uuid
                    }
                  ],
                  "groupbys": [],
                  "conditions": condition,
                  "modelID": tempobj.modelID
                });
              }
              //获取新品指标
              ((tempobj) => {
                ///query/maxminavg
                commonUtil.queryData({
                  url: "/query/maxminavg",
                  async:true,
                  queryParams: {queryParams: JSON.stringify(objTarget)},
                  callback: (res) => {
                    _this.indicatorShow = true;
                    let flag=0;
                    res.data.forEach((obj, key) => {
                      obj.number = _this.getFixedNumber(obj.number);
                      if (obj.aggType === "AVG") {
                        if (tempobj.valType === "PRICE") {
                          _this.$set(tempobj, "avg", "$" + obj.number)
                        }else if(tempobj.valType === "RANK"||tempobj.valType === "Date"){
                          _this.$set(tempobj, "avg", Math.round(obj.number))
                        }else {
                          _this.$set(tempobj, "avg", obj.number)
                        }
                      } else if (obj.aggType === "MAX") {
                        if(tempobj.valType === "RANK"||tempobj.valType === "Date"){
                            obj.number=Math.round(obj.number);
                        }
                        _this.$set(tempobj, "maxVal", obj.number);
                      } else if (obj.aggType === "MIN") {
                        if(tempobj.valType === "RANK"||tempobj.valType === "Date"){
                          obj.number=Math.round(obj.number);
                        }
                        _this.$set(tempobj, "minVal", obj.number)
                      }
                      if(obj.number==0){
                        flag++;
                      }
                    })
                    if(flag>=3){
                      _this.showMessage.push(1);
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
          },
          //数字保留2位小数
          getFixedNumber(num,ops){
            if(typeof (num*1)=="number"){
              return  (num*1)==0?0:(num*1).toFixed(ops||2);
            }
          },
        }
    }
</script>
<style scoped lang="less">
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
