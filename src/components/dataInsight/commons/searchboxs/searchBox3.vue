<template>
  <div>
    <div class="searchBox row" :class="{flod:showFloder}">
      <div class="searchWrap">
        <div class="search-top">
          <div class="seaTop-left">
            <span class="seller textDesc">产品名称:</span>
            <Input v-model="TableItem.tableContainer.queryData.product.inputVal"
                   placeholder="请输入产品名称" class="myProductBox"></Input>
          </div>
          <div class="seaTop-midlle">
            <span class="textDesc">售价:</span>
            <Select v-model="TableItem.tableContainer.queryData.sellingPricesCode.inputVal" style="width:81px" placeholder="货币选择">
              <Option v-for="item in currency" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="TableItem.tableContainer.queryData.sellingPrices.selectValue" style="width:81px"
                    @on-change="chooseSection(TableItem.tableContainer.queryData.sellingPrices)">
              <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="TableItem.tableContainer.queryData.sellingPrices.inputVal" placeholder="请输入"
                   @on-blur="testNumberBlur(TableItem.tableContainer.queryData.sellingPrices)"
                   @on-keyup="testNumber(TableItem.tableContainer.queryData.sellingPrices)"
                   v-if="!TableItem.tableContainer.queryData.sellingPrices.showSession"
                   class="priceInput"
            ></Input>
            <div class="inputSpecPrice" v-if="TableItem.tableContainer.queryData.sellingPrices.showSession">
              <Input v-model="TableItem.tableContainer.queryData.sellingPrices.session.sessionLeft"
                     @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.sellingPrices.session,'sessionLeft')"
                     @on-keyup="testNumber1(TableItem.tableContainer.queryData.sellingPrices.session,'sessionLeft')"
              ></Input>
              <span>-</span>
              <Input v-model="TableItem.tableContainer.queryData.sellingPrices.session.sessionRight"
                     @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.sellingPrices.session,'sessionRight')"
                     @on-keyup="testNumber1(TableItem.tableContainer.queryData.sellingPrices.session,'sessionRight')"
              ></Input>
            </div>
          </div>
          <div class="seaTop-right brandSpec">
            <span class="textDesc">品牌名称:</span>
            <Select v-model="TableItem.tableContainer.queryData.brand.inputVal"
                    clearable  filterable style="width:285px" placeholder="请选择或输入搜索">
              <Option v-for="item in TableItem.tableContainer.brandData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
           <!-- <Select v-model="TableItem.tableContainer.queryData.brand.inputVal"
                    clearable
                    filterable
                    remote
                    :remote-method="queryBrand"
                    :loading="TableItem.tableContainer.loadingState.brandloading"
                    style="width:285px"
                    placeholder="请输入搜索">
              <Option v-for="item in TableItem.tableContainer.brandData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>-->
          </div>
          <div v-show="showFloder" class="seaTop-left">
            <span class="textDesc">库存:</span>
            <Select v-model="TableItem.tableContainer.queryData.stock.selectValue" style="width:81px"
                    @on-change="chooseSection(TableItem.tableContainer.queryData.stock)">
              <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="TableItem.tableContainer.queryData.stock.inputVal" placeholder="请输入"
                   @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.stock)"
                   @on-keyup="testIntNumber(TableItem.tableContainer.queryData.stock)"
                   v-if="!TableItem.tableContainer.queryData.stock.showSession"></Input>
            <div class="inputSpec" v-if="TableItem.tableContainer.queryData.stock.showSession">
              <Input v-model="TableItem.tableContainer.queryData.stock.session.sessionLeft"
                     @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.stock.session,'sessionLeft')"
                     @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.stock.session,'sessionLeft')"
              ></Input>
              <span>-</span>
              <Input v-model="TableItem.tableContainer.queryData.stock.session.sessionRight"
                     @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.stock.session,'sessionRight')"
                     @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.stock.session,'sessionRight')"
              ></Input>
            </div>
          </div>
          <div  v-show="showFloder" class="seaTop-midlle">
            <span class="textDesc">原价:</span>
            <Select v-model="TableItem.tableContainer.queryData.sellingPricesCode.inputVal" style="width:81px" placeholder="货币选择">
              <Option v-for="item in currency" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="TableItem.tableContainer.queryData.originalPrices.selectValue" style="width:81px"
                    @on-change="chooseSection(TableItem.tableContainer.queryData.originalPrices)">
              <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="TableItem.tableContainer.queryData.originalPrices.inputVal" placeholder="请输入"
                   @on-blur="testNumberBlur(TableItem.tableContainer.queryData.originalPrices)"
                   @on-keyup="testNumber(TableItem.tableContainer.queryData.originalPrices)"
                   v-if="!TableItem.tableContainer.queryData.originalPrices.showSession"
                   class="priceInput"
            ></Input>
            <div class="inputSpecPrice" v-if="TableItem.tableContainer.queryData.originalPrices.showSession">
              <Input v-model="TableItem.tableContainer.queryData.originalPrices.session.sessionLeft"
                     @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.originalPrices.session,'sessionLeft')"
                     @on-keyup="testNumber1(TableItem.tableContainer.queryData.originalPrices.session,'sessionLeft')"
              ></Input>
              <span>-</span>
              <Input v-model="TableItem.tableContainer.queryData.originalPrices.session.sessionRight"
                     @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.originalPrices.session,'sessionRight')"
                     @on-keyup="testNumber1(TableItem.tableContainer.queryData.originalPrices.session,'sessionRight')"
              ></Input>
            </div>
          </div>
          <div v-show="showFloder" class="seaTop-right">
            <span class="textDesc">产品评分:</span>
            <Select v-model="TableItem.tableContainer.queryData.productRates.selectValue" style="width:81px"
                    @on-change="chooseSection(TableItem.tableContainer.queryData.productRates)">
              <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="TableItem.tableContainer.queryData.productRates.inputVal" placeholder="请输入"
                   @on-blur="testNumberBlur(TableItem.tableContainer.queryData.productRates)"
                   @on-keyup="testNumber(TableItem.tableContainer.queryData.productRates)"
                   v-if="!TableItem.tableContainer.queryData.productRates.showSession"></Input>
            <div class="inputSpec" v-if="TableItem.tableContainer.queryData.productRates.showSession">
              <Input v-model="TableItem.tableContainer.queryData.productRates.session.sessionLeft"
                     @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productRates.session,'sessionLeft')"
                     @on-keyup="testNumber1(TableItem.tableContainer.queryData.productRates.session,'sessionLeft')"
              ></Input>
              <span>-</span>
              <Input v-model="TableItem.tableContainer.queryData.productRates.session.sessionRight"
                     @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productRates.session,'sessionRight')"
                     @on-keyup="testNumber1(TableItem.tableContainer.queryData.productRates.session,'sessionRight')"
              ></Input>
            </div>
          </div>
          <div v-show="showFloder" class="seaTop-left">
            <span class="textDesc">销量:</span>
            <Select v-model="TableItem.tableContainer.queryData.sales.selectValue" style="width:81px"
                    @on-change="chooseSection(TableItem.tableContainer.queryData.sales)">
              <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="TableItem.tableContainer.queryData.sales.inputVal" placeholder="请输入"
                   @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.sales)"
                   @on-keyup="testIntNumber(TableItem.tableContainer.queryData.sales)"
                   v-if="!TableItem.tableContainer.queryData.sales.showSession"></Input>
            <div class="inputSpec" v-if="TableItem.tableContainer.queryData.sales.showSession">
              <Input v-model="TableItem.tableContainer.queryData.sales.session.sessionLeft"
                     @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.sales.session,'sessionLeft')"
                     @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.sales.session,'sessionLeft')"
              ></Input>
              <span>-</span>
              <Input v-model="TableItem.tableContainer.queryData.sales.session.sessionRight"
                     @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.sales.session,'sessionRight')"
                     @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.sales.session,'sessionRight')"
              ></Input>
            </div>
          </div>
          <div v-show="showFloder" class="seaTop-midlle">
            <span class="textDesc">上架时间:</span>
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期"
                        style="max-width: 226px" format="yyyy-MM-dd" @on-change="chooseDate"
                        v-model="TableItem.tableContainer.queryData.time.inputVal"></DatePicker>
          </div>
          <div v-show="showFloder" class="seaTop-right">
            <span class="textDesc">评论数:</span>
            <Select v-model="TableItem.tableContainer.queryData.comments.selectValue" style="width:81px"
                    @on-change="chooseSection(TableItem.tableContainer.queryData.comments)">
              <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="TableItem.tableContainer.queryData.comments.inputVal" placeholder="请输入"
                   @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.comments)"
                   @on-keyup="testIntNumber(TableItem.tableContainer.queryData.comments)"
                   v-if="!TableItem.tableContainer.queryData.comments.showSession"></Input>
            <div class="inputSpec" v-if="TableItem.tableContainer.queryData.comments.showSession">
              <Input v-model="TableItem.tableContainer.queryData.comments.session.sessionLeft"
                     @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.comments.session,'sessionLeft')"
                     @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.comments.session,'sessionLeft')"
              ></Input>
              <span>-</span>
              <Input v-model="TableItem.tableContainer.queryData.comments.session.sessionRight"
                     @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.comments.session,'sessionRight')"
                     @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.comments.session,'sessionRight')"
              ></Input>
            </div>
          </div>
        </div>
        <div class="btnsBox" :class="{flod:showFloder}">
          <Button  @click="clearAll" v-show="showFloder">重置</Button>
          <Button type="primary"  @click="searchData(false)" style="margin-right: 25px">搜索</Button>
          <Button type="primary"  @click="saveConfigs" v-show="showFloder">保存配置</Button>
        </div>
        <div class="floder" v-show="showFloder" @click="showFloder=!showFloder" :class="{flod:showFloder}">
          <span class="floder-text">收起</span>
          <Icon type="chevron-up" class="flder-icon"></Icon>
        </div>
        <div class="floder"  v-show="!showFloder" @click="showFloder=!showFloder" :class="{flod:showFloder}">
          <span class="floder-text">展开</span>
          <Icon type="chevron-down"class="flder-icon"></Icon>
        </div>
        <div class="configSave">
          <span @click="getConfigList">保存记录&nbsp;&nbsp;<Icon :type="arrowState" class="flder-icon"></Icon></span>
          <transition name="el-zoom-in-top">
            <div class="configlist" v-show="showConfig" @mouseleave="showConfig=false">
              <ul class="wrapperConfig">
                <li class="listItem" v-for="item in saveConfigsList" :key="item.id" @click="tabConfig(item)">
                  <div>
                    <span>{{item.configName}}</span>
                    <i @click="closeConfig(item)">
                      <Icon type="ios-close-empty"></Icon>
                    </i>
                  </div>
                </li>
                <li v-if="saveConfigsList.length==0">暂无配置信息</li>
              </ul>
            </div>
          </transition>
        </div>
        <Modal
          v-model="deleteConfig"
          width="360"
          class-name="saveModal"
        >
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
          </p>
          <div style="text-align:center">
            <p>你将删除{{deleteConfigData.configName}}</p>
            <p>你确定删除吗?</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long
                    @click="confirmDeleteConfig">删除</Button>
          </div>
        </Modal>
        <Modal
          v-model="saveConfig"
          title="保存配置"
          class-name="saveModal"
          @on-visible-change="changeState"
        >
          <div class="saveBox">
            <p>是否保存现在的配置值?</p>
            <p>新保存配置命名:</p>
            <p>
              <Input v-model="saveConfigName" placeholder="未命名" style="width: 300px"></Input>
              <span v-if="errorTipShow" style="color: red"><Icon type="information-circled"></Icon>&nbsp;&nbsp;{{tipsText}}</span>
            </p>
          </div>
          <div slot="footer">
            <div slot="footer" class="myFooter">
              <Button @click="cancel">取消</Button>
              <Button type="primary"  @click="ok">确认</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
  //通用方法
  import commonUtil from "../../../../config/insight/commons/comonUse";
  import searchBoxUtil from "../../../../config/insight/commons/searchBoxClass"
  export default {
    data() {
      return {
        //类目选择控件
        categoryChoose: [
          {
            value: 'LARGE',
            label: '大于'
          },
          {
            value: 'LESS',
            label: '小于'
          },
          {
            value: 'EQUAL',
            label: '等于'
          },
          {
            value: 'NOTEQUAL',
            label: '不等于'
          },
          {
            value: 'LARGEEQUAL',
            label: '大于等于'
          },
          {
            value: 'LESSEQUAL',
            label: '小于等于'
          },

          {
            value: 'LESSANDLARGE',
            label: '区间'
          }],
        currency:[
          {
            value: 'US',
            label: 'US'
          },
          {
            value: 'GBP',
            label: 'GBP'
          },
          {
            value: 'AU',
            label: 'AU'
          },
          {
            value: 'C',
          label: 'C'
          },
        ],
        //区间展示
        showFloder:true,
        saveConfigsList:[],
        showConfig:false,
        deleteConfig:false,
        deleteConfigData:{},
        deleteingLoad:false,
        saveConfig:false,
        saveConfigName:"",
        isEmptyName:false,
        isSaveLoading:true,
        configsData:{},
        tipsText:"",
        errorTipShow:false,
        arrowState:"chevron-down"
      }
    },
    props:['TableItem','chooseType'],
    computed:{
      collectActive(){
        return this.$store.state.selectTab;
      }
    },
    methods:{
      /*----------表格区间控件--------------*/
      changeBsrCategory(val){
        this.$store.commit("changeBsr",val);
      },
      chooseBsr(val){
        this.$set(this.TableItem.tableContainer.queryData.BSRsort,"inputVal",val);
      },
      chooseSection(current) {
        if (current.selectValue == "LESSANDLARGE") {
          current.showSession = true;
        } else {
          current.showSession = false;
        }
      },
      selectOne(currentSelect){
        if(currentSelect.length>=2){
          let current=currentSelect[1];
          commonUtil.clearArray(currentSelect);
          currentSelect.push(current);
        }
      },
      //上架时间
      chooseDate(value) {
        this.TableItem.tableContainer.queryData.time.inputVal = value;//Array
      },
      testNumberBlur(item){
        item.inputVal=searchBoxUtil.checkFloatBlur(item.inputVal);
      },
      testNumber(item){
        item.inputVal=searchBoxUtil.checkFloat(item.inputVal);
      },
      testNumber1(item,typeValue){
        item[typeValue]=searchBoxUtil.checkFloat(item[typeValue]);
      },
      testNumberBlur1(item,typeValue){
        item[typeValue]=searchBoxUtil.checkFloatBlur(item[typeValue]);
      },
      testIntNumber(item){
        item.inputVal=searchBoxUtil.checkInt(item.inputVal);
      },
      testIntNumberBlur(item){
        item.inputVal=searchBoxUtil.checkIntBlur(item.inputVal);
      },
      testIntNumberBlur1(item,typeValue){
        item[typeValue]=searchBoxUtil.checkIntBlur(item[typeValue]);
      },
      testIntNumber1(item,typeValue){
        item[typeValue]=searchBoxUtil.checkInt(item[typeValue]);
      },
      /*----------表格搜索--------------*/
      //表格搜索
      searchData(currentType){
        let conditions = {
          demesion: [],
          measures: [],
          conditions: []
        };
        //配置表格控件查询条件
        for (let key in this.TableItem.tableContainer.queryData) {
          let obj = this.TableItem.tableContainer.queryData[key];
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
                      "val": searchBoxUtil.formatWithDate(obj.inputVal[0], "yyyy-MM-dd"),
                    },
                    right: {
                      "col": obj.col,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LESSEQUAL", //>=
                      "val": searchBoxUtil.formatWithDate(obj.inputVal[1], "yyyy-MM-dd")
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
        //发送请求
        this.$set(this.TableItem.initCondition,"condition",conditions.conditions);
        this.$set(this.TableItem.initCondition, "type", "part");
        this.$set(this.TableItem.initCondition, "isCategory",currentType?currentType:false);
        this.$parent.$refs.tableList.mockTableData();
      },
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
              this.$set(obj, "inputVal",15);
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
      /*----------保存配置-------------*/
      changeState(){
        this.tipsText="";
        this.errorTipShow=false;
        this.saveConfigName="";
      },
      cancel(){
        this.saveConfig=false;
        this.tipsText="";
        this.errorTipShow=false;
      },
      closeConfig(item){
        event.cancelBubble=true;
        this.deleteConfigData=item;
        this.deleteConfig=true;
      },
      //获取保存列表
      getConfigList(e){
        e.stopPropagation();
        this.showConfig=!this.showConfig;
        this.arrowState=this.showConfig?"chevron-down":"chevron-up";
        let currentType =searchBoxUtil.getCurrentState(this.TableItem.type,this.TableItem.showNewColumn,this.collectActive,"EBAY");
        commonUtil.queryData({
          url:"/di/common/list/param",
          queryParams:{
            type:currentType
          },
          callback:(res)=>{
            commonUtil.clearArray(this.saveConfigsList);
            if(res.data.length>0){
              res.data.forEach((item)=>{
                this.saveConfigsList.push({
                  configName:item.paramName,
                  id:item.id
                })
              })
            }
          }
        })
      },
      //获取保存配置
      tabConfig(item){
        event.cancelBubble=true;
        let currentType =searchBoxUtil.getCurrentState(this.TableItem.type,this.TableItem.showNewColumn,this.collectActive,"EBAY");
        commonUtil.queryData({
          url:"/di/common/get/param",
          queryParams:{
            type:currentType,
            paramID:item.id
          },
          callback:(res)=>{
            if(res.data){
              this.configsData=JSON.parse(res.data);
              let tableData=this.configsData.data;
              let chooseType=this.configsData.chooseType;
              if(tableData.time.inputVal.length>0){
                if(typeof tableData.time.inputVal[0]=="string"){
                  tableData.time.inputVal[0]=new Date(tableData.time.inputVal[0]);
                  tableData.time.inputVal[1]=new Date(tableData.time.inputVal[1]);
                }
              }
              this.TableItem.tableContainer.queryData=tableData;
              commonUtil.clearArray(this.chooseType);
              chooseType.forEach((item)=>{
                this.chooseType.push(item);
              })
              this.reviewData();
            }
          }
        })
      },
      //重新请求类目表格
      reviewData(){
        //重新获取品牌Bsr分类
        commonUtil.clearArray(this.showMessage);
        this.getBrandName();
        this.searchData(true);
        //重新获取品牌数
        if(this.$parent.$parent.type==="explode"&&
          this.$parent.TableItem.showNewColumn=="name1"){
          this.$parent.$refs.tableList.getBrandCount();
        }
      },
      //获取汇总品牌名
      getBrandName(query){
        let _this=this;
        let sendDemesion=[];
        let sendCondition=[];
        //获取bsr分类
        this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
          if(item.chinese==="类目"){
            if(this.collectBtnsActive){
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
        let cid=this.TableItem.parmasConfig.query.cid;
        let modelId=this.TableItem.parmasConfig.query.modelID;
        let configUrl="/di/box/data";
        if(this.collectBtnsActive){
          //收藏
          modelId="504";
          cid="504";
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
            pageBean: JSON.stringify({
              "oldCurrentPage": 0,
              "currentPage": 1,
              "pageSize": 300
            }),
            //固定
            modelID: modelId
          },
          callback: (res) => {
            commonUtil.clearArray(_this.TableItem.tableContainer.brandData);
            if(res.status===1){
              let brands=[];
              if(res.data.result&&res.data.result.length>0){
                res.data.result.forEach((item,i)=>{
                  brands.push(item[0]);
                })
                //品牌
                brands=searchBoxUtil.filterRepeat(brands);
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
          error:()=>{}
        })
      },
      //保存配置
      saveConfigs(){
        this.saveConfig=true;
        this.saveConfigName="";
      },
      //保存配置数据
      ok(){
        this.tipsText="";
        this.errorTipShow=false;
        let flag=false;
        if(this.saveConfigName!=""){
          //判断名字是否重复
          this.saveConfigsList.forEach((item)=>{
            if(item.configName==this.saveConfigName){
              //命名为空
              this.errorTipShow=true;
              this.tipsText="保存配置名字不能相同";
              flag=true;
            }
          })
          if(!flag){
            let sendData={
              data:null,
              chooseType:null
            };
            let data=this.TableItem.tableContainer.queryData;
            //日期转换
            if(data.time.inputVal.length>0){
              data.time.inputVal[0]=searchBoxUtil.formatDate(data.time.inputVal[0]);
              data.time.inputVal[1]=searchBoxUtil.formatDate(data.time.inputVal[1]);
            }
            sendData.data=data;
            sendData.chooseType=this.chooseType;
            let currentType =searchBoxUtil.getCurrentState(this.TableItem.type,this.TableItem.showNewColumn,this.collectActive,"EBAY");
            commonUtil.queryData({
              url:"/di/common/add/param",
              queryParams:{
                paramName:this.saveConfigName,
                type:currentType,
                paramData:JSON.stringify(sendData),
              },
              callback:(res)=>{
                this.saveConfig=false;
                if(res.status==1){
                  this.$Notice.success({
                    title: '保存成功',
                    desc: "保存配置成功"
                  });

                }else{
                  this.$Notice.error({
                    title: '保存失败',
                    desc: '保存配置失败'
                  });
                }
              }
            })
          }
        }else{
          //命名为空
          this.errorTipShow=true;
          this.tipsText="保存配置名字不能为空";
//            this.$Message.warning('保存配置名字不能为空');
        }
      },
      //确定删除配置
      confirmDeleteConfig(){
        this.deleteConfig=false;
        let _this=this;
        commonUtil.queryData({
          url:"/di/common/delete/param",
          queryParams:{
            paramID:this.deleteConfigData.id
          },
          callback:(res)=>{
            if(res.status==1){
              this.clearAll();
              this.$Notice.success({
                title: '删除成功',
                desc: "删除配置成功"
              });
              this.saveConfigsList.forEach((item,i)=>{
                if(item.id==this.deleteConfigData.id){
                  this.saveConfigsList.splice(i,1);
                }
              })
            }else{
              this.$Notice.error({
                title: '删除失败',
                desc: '删除配置失败'
              });
            }
          },
          error:()=>{
          },
          complete:()=>{
          }
        })
      },
      queryBrand(query){
        this.$parent.$refs.tableList.getBrandName(query);
      }
    }
  }
</script>
<style lang="less">
  @import "../../../../style/insight/searchBox";
  .textDesc{
    display: inline-block;
    width: 60px;
    text-align: right;
    margin-right: 5px;
  }
  .myProductBox{
    width: 285px !important;
    margin-left: 5px !important;
  }
</style>
