<template>
    <div>
      <div class="searchBox row" :class="{flod:showFloder}">
        <h2 class="textTitle">{{TableItem.title}}</h2>
        <div class="searchWrap">
          <div class="search-top">
            <div class="seaTop-left">
              <span class="fl">亚马逊自营:</span>
              <CheckboxGroup v-model="TableItem.tableContainer.queryData.sellerAmazon.inputVal" @on-change="selectOne(TableItem.tableContainer.queryData.sellerAmazon.inputVal)">
                <Checkbox label="是"></Checkbox>
                <Checkbox label="否"></Checkbox>
              </CheckboxGroup>
              <span class="fl">FBA:</span>
              <CheckboxGroup v-model="TableItem.tableContainer.queryData.sellerFBA.inputVal" @on-change="selectOne(TableItem.tableContainer.queryData.sellerFBA.inputVal)">
                <Checkbox label="是"></Checkbox>
                <Checkbox label="否"></Checkbox>
              </CheckboxGroup>
            </div>
            <div class="seaTop-midlle keywordCategory">
              <span class="seller">BSR品类:</span>
              <!--<Input v-model="queryData.BSRsort.inputVal" placeholder="请输入" class="inputBox"></Input>-->
              <Select v-model="TableItem.tableContainer.queryData.BSRsort.inputVal" filterable
                      class="inputBox" style="width: 288px">
                <Option v-for="item in TableItem.tableContainer.sortData" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="seaTop-right brandSpec">
              <span>品牌名称:</span>
              <Select v-model="TableItem.tableContainer.queryData.brand.inputVal" clearable  filterable style="width:285px" placeholder="请选择或输入搜索">
                <Option v-for="item in TableItem.tableContainer.brandData" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div v-show="showFloder" class="seaTop-left">
              <span class="seller">产品名称:</span>
              <Input v-model="TableItem.tableContainer.queryData.product.inputVal" placeholder="请输入产品名称" class="inputBox"></Input>
            </div>
            <div v-show="showFloder" class="seaTop-midlle">
              <span>BSR排名:&nbsp;&nbsp;&nbsp;</span>
              <Select v-model="TableItem.tableContainer.queryData.BSR.selectValue" style="width:81px" @on-change="chooseSection(TableItem.tableContainer.queryData.BSR)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="TableItem.tableContainer.queryData.BSR.inputVal" placeholder="请输入"
                     @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.BSR)"
                     @on-keyup="testIntNumber(TableItem.tableContainer.queryData.BSR)"
                     v-if="!TableItem.tableContainer.queryData.BSR.showSession"></Input>
              <!--<InputNumber  :min="0" v-model="TableItem.tableContainer.queryData.BSR.inputVal" v-if="!TableItem.tableContainer.queryData.BSR.showSession"></InputNumber>-->
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.BSR.showSession">
                <Input v-model="TableItem.tableContainer.queryData.BSR.session.sessionLeft"
                       @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.BSR.session,'sessionLeft')"
                       @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.BSR.session,'sessionLeft')"
                ></Input>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.BSR.session.sessionLeft" size="small" number></InputNumber>-->
                <span>-</span>
                <Input v-model="TableItem.tableContainer.queryData.BSR.session.sessionRight"
                       @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.BSR.session,'sessionRight')"
                       @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.BSR.session,'sessionRight')"
                ></Input>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.BSR.session.sessionRight" size="small" number></InputNumber>-->
              </div>
            </div>
            <div v-show="showFloder" class="seaTop-right">
              <span>产品评分:</span>
              <Select v-model="TableItem.tableContainer.queryData.productRates.selectValue" style="width:81px"
                      @on-change="chooseSection(TableItem.tableContainer.queryData.productRates)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productRates.inputVal"-->
                           <!--v-if="!TableItem.tableContainer.queryData.productRates.showSession"></InputNumber>-->
              <Input v-model="TableItem.tableContainer.queryData.productRates.inputVal" placeholder="请输入"
                     @on-blur="testNumberBlur(TableItem.tableContainer.queryData.productRates)"
                     @on-keyup="testNumber(TableItem.tableContainer.queryData.productRates)"
                     v-if="!TableItem.tableContainer.queryData.productRates.showSession"></Input>
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.productRates.showSession">
                <Input v-model="TableItem.tableContainer.queryData.productRates.session.sessionLeft"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productRates.session,'sessionLeft')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productRates.session,'sessionLeft')"
                ></Input>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productRates.session.sessionLeft" size="small"></InputNumber>-->
                <span>-</span>
                <Input v-model="TableItem.tableContainer.queryData.productRates.session.sessionRight"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productRates.session,'sessionRight')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productRates.session,'sessionRight')"
                ></Input>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productRates.session.sessionRight" size="small"></InputNumber>-->
              </div>
            </div>
            <div v-show="showFloder" class="seaTop-left">
              <span>跟卖卖家数:</span>
              <Select v-model="TableItem.tableContainer.queryData.category.selectValue" style="width:81px"
                      @on-change="chooseSection(TableItem.tableContainer.queryData.category)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <!--<InputNumber v-model="TableItem.tableContainer.queryData.category.inputVal" :min="0"-->
              <!--v-if="!TableItem.tableContainer.queryData.category.showSession"></InputNumber>-->
              <Input v-model="TableItem.tableContainer.queryData.category.inputVal" placeholder="请输入"
                     @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.category)"
                     @on-keyup="testIntNumber(TableItem.tableContainer.queryData.category)"
                     v-if="!TableItem.tableContainer.queryData.category.showSession"></Input>
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.category.showSession">
                <Input v-model="TableItem.tableContainer.queryData.category.session.sessionLeft"
                       @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.category.session,'sessionLeft')"
                       @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.category.session,'sessionLeft')"
                ></Input>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.category.session.sessionLeft" size="small"></InputNumber>-->
                <span>-</span>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.category.session.sessionRight" size="small"></InputNumber>-->
                <Input v-model="TableItem.tableContainer.queryData.category.session.sessionRight"
                       @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.category.session,'sessionRight')"
                       @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.category.session,'sessionRight')"
                ></Input>
              </div>
            </div>
            <div v-show="showFloder" class="seaTop-midlle">
              <span>上架时间:&nbsp;&nbsp;&nbsp;</span>
              <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期"
                          style="max-width: 226px" format="yyyy-MM-dd" @on-change="chooseDate"
                          v-model="TableItem.tableContainer.queryData.time.inputVal"></DatePicker>
            </div>
            <div  v-show="showFloder"class="seaTop-right">
              <span>产品价格:</span>
              <Select v-model="TableItem.tableContainer.queryData.productPrices.selectValue" style="width:81px"
                      @on-change="chooseSection(TableItem.tableContainer.queryData.productPrices)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="TableItem.tableContainer.queryData.productPrices.inputVal" placeholder="请输入"
                     @on-blur="testNumberBlur(TableItem.tableContainer.queryData.productPrices)"
                     @on-keyup="testNumber(TableItem.tableContainer.queryData.productPrices)"
                     v-if="!TableItem.tableContainer.queryData.productPrices.showSession"></Input>
              <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productPrices.inputVal" -->
                           <!--v-if="!TableItem.tableContainer.queryData.productPrices.showSession"></InputNumber>-->
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.productPrices.showSession">
                <Input v-model="TableItem.tableContainer.queryData.productPrices.session.sessionLeft"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productPrices.session,'sessionLeft')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productPrices.session,'sessionLeft')"
                ></Input>
                <!--<InputNumber :min="0"  v-model="TableItem.tableContainer.queryData.productPrices.session.sessionLeft" size="small"></InputNumber>-->
                <span>-</span>
                <Input v-model="TableItem.tableContainer.queryData.productPrices.session.sessionRight"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productPrices.session,'sessionRight')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productPrices.session,'sessionRight')"
                ></Input>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productPrices.session.sessionRight" size="small"></InputNumber>-->
              </div>
            </div>
          </div>
          <div class="btnsBox" :class="{flod:showFloder}">
            <Button  @click="clearAll" v-show="showFloder">重置</Button>
            <Button type="info"  @click="searchData(false)">搜索</Button>
          </div>
          <div class="floder" v-show="showFloder" @click="showFloder=!showFloder" :class="{flod:showFloder}">
            <span class="floder-text">收起</span>
            <Icon type="chevron-up" class="flder-icon"></Icon>
          </div>
          <div class="floder"  v-show="!showFloder" @click="showFloder=!showFloder" :class="{flod:showFloder}">
            <span class="floder-text">展开</span>
            <Icon type="chevron-down"class="flder-icon"></Icon>
          </div>
        </div>
      </div>
      <div class="data-show row">
              <Table height="800"
                     :data="TableItem.tableContainer.tableData"
                     :row-class-name="rowClassName" :columns="TableItem.tableContainer.tableColumns"
                     :loading="loading"  class="tables" id="keywordTable" @on-sort-change="sortAll"></Table>
        <Switch v-model="loading"></Switch>
        <div class="imgCover" v-if="showImg" @click="closeImg" :class="{'showImg':showImg}">
          <img :src="bigImg" alt="">
        </div>
        <div style="margin-bottom: 30px;margin-top:20px;overflow: hidden">
          <div style="float: right;">
            <el-button-group>
              <el-button class="btnsPage" type="primary" @click="changePrevPage()"><i class="el-icon-arrow-left"></i>&nbsp;上一页</el-button>
              <el-button class="btnsPage" type="primary" @click="changeNextPage()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <!--选择多少每一页大小-->
            <Select v-model="TableItem.pageBean.pageSize" style="width:100px;"
                    @on-change="changeSize" placement="top">
              <Option v-for="item in TableItem.pageBean.pageSizes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!--跳动多少页-->
            跳至 <Input v-model="TableItem.pageBean.toPage" style="width:80px" number @on-keyup.enter="toWhatPage"></Input>&nbsp;页
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  //数据处理类
  import Model from "../../../config/insight/commons/dataHelper";
  //通用方法
  import IScroll from "iscroll";
  import commonUtil from "../../../config/insight/commons/insightCommon";
    export default {
        data() {
          return{
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
            //区间展示
            showFloder:true,
            //点击放大图片
            bigImg:"",
            //表格遮罩层
            loading: true,
            showImg:false,
            links:[]
          }
        },
        props:['TableItem','showMessage','chooseType','currentKeyword','conditionDateTime','taskId'],
        mounted(){
          this.$nextTick(() => {
            this.TableItem.initCondition.type="all";
            this.TableItem.initCondition.isPage=false;
            this.TableItem.initCondition.isCategory=false;
            //获取列名
            this.getColumn(()=>{
              //初始化表格
              this.setTableData();
              this.initData();
              //获取品牌数
              if(this.$parent.type==="explode"){
                this.getBrandCount();
              }
            });
          })
        },
        methods:{
          /*----------表格模块--------------*/
          //表格区间控件触发
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
          testNumberBlur(item){
            if(item.inputVal){
              let number=parseFloat(item.inputVal);
              if(isNaN(number)){
                item.inputVal="";
              }else{
                item.inputVal=number;
              }
            }
          },
          testNumber(item){
            if(item.inputVal){
              if(!/^\d+[.]?\d*$/.test(item.inputVal)){
                if(/^\d+[.]?\d*/.test(item.inputVal)){
                  item.inputVal=item.inputVal.match(/\d+[.]?\d*/g).join("");
                }else{
                  item.inputVal="";
                }
              }else{
                //判断前面是否有0
                if(!/^(0|[1-9][0-9]*)$/.test(item.inputVal)){
                  if(!/^0[.]/.test(item.inputVal)){
                    let currentNum=item.inputVal.match(/[.]?[1-9]+[.]?\d*/);
                    if(currentNum){
                      item.inputVal=currentNum.join("");
                    }else{
                      item.inputVal=0;
                    }
                  }
                }
              }
            }
          },
          testNumberBlur1(item,typeValue){
            if(item[typeValue]) {
              let number = parseFloat(item[typeValue]);
              if (isNaN(number)) {
                item[typeValue] = "";
              } else {
                item[typeValue] = number;
              }
            }
            },
          testNumber1(item,typeValue){
            if(item[typeValue]){
              if(!/^\d+[.]?\d*$/.test(item[typeValue])){
                if(/^\d+[.]?\d*/.test(item[typeValue])){
                  item[typeValue]=item[typeValue].match(/\d+[.]?\d*/g).join("");
                }else{
                  item[typeValue]="";
                }
              }
              else{
                //判断前面是否有0
              if(!/^(0|[1-9][0-9]*)$/.test(item[typeValue])){
                  if(!/^0[.]/.test(item[typeValue])){
                    let currentNum=item[typeValue].match(/[1-9]+[.]?\d*/);
                    if(currentNum){
                      item[typeValue]=currentNum.join("");
                    }else{
                      item[typeValue]=0;
                    }
                  }
                }

              }
            }
          },
          testIntNumberBlur(item){
            if(item.inputVal){
              let number=parseInt(item.inputVal);
              if(isNaN(number)){
                item.inputVal="";
              }else{
                item.inputVal=number;
              }
            }
          },
          testIntNumber(item){
            if(item.inputVal){
                if(!/^\d+$/.test(item.inputVal)){
                //不是非负整数
                if(/^[0-9]+/.test(item.inputVal)){
                  item.inputVal=item.inputVal.match(/\d+/g).join("");
                }else{
                  item.inputVal="";
                }
              }else{
                //判断前面是否有0
                 if(!/^(0|[1-9][0-9]*)$/.test(item.inputVal)){
                    let currentNum=item.inputVal.match(/[1-9]+\d*/);
                    if(currentNum){
                      item.inputVal=currentNum.join("");
                    }else{
                      item.inputVal=0;
                    }
                 }
              }
            }
          },
          testIntNumberBlur1(item,typeValue){
            if(item[typeValue]){
              let number=parseInt(item[typeValue]);
              if(isNaN(number)){
                item[typeValue]="";
              }else{
                item[typeValue]=number;
              }
            }
          },
          testIntNumber1(item,typeValue){
            if(item[typeValue]){
              if(!/^\d+$/.test(item[typeValue])){
                //不是非负整数
                if(/^[0-9]+/.test(item[typeValue])){
                  item[typeValue]=item[typeValue].match(/\d+/g).join("");
                }else{
                  item[typeValue]="";
                }
              }else{
                //判断前面是否有0
                if(!/^(0|[1-9][0-9]*)$/.test(item[typeValue])){
                  let currentNum=item[typeValue].match(/[1-9]+\d*/);
                  if(currentNum){
                    item[typeValue]=currentNum.join("");
                  }else{
                    item[typeValue]=0;
                  }
                }
              }
            }
          },
          //上架时间
          chooseDate(value) {
            this.TableItem.tableContainer.queryData.time.inputVal = value;//Array
          },
          //表格搜索
          searchData(currentType){
            let conditions = {
              demesion: [],
              measures: [],
              conditions: []
            };
            //配置表格控件查询条件
            for (var key in this.TableItem.tableContainer.queryData) {
              var obj = this.TableItem.tableContainer.queryData[key];
              //判断字段是否要发送
              //判断是否是有区间
              if (obj.hasOwnProperty("showSession")) {
                //选择了区间发送
                if (obj.showSession) {
                  if(obj.session.sessionLeft!=""||obj.session.sessionRight!=""||obj.session.sessionLeft===0||obj.session.sessionRight===0){
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
                }
                else {
                  //没有区间正常发送
                  //正常类型
                  if(obj.inputVal!=""||obj.inputVal===0){
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
                          "val": commonUtil.formatWithDate(obj.inputVal[0], "yyyy-MM-dd")
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
                      //正常类型
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
            }
            //发送请求
            this.$set(this.TableItem.initCondition,"condition",conditions.conditions);
            this.$set(this.TableItem.initCondition, "type", "part");
            this.$set(this.TableItem.initCondition, "isCategory",currentType?currentType:false);
            this.mockTableData();
          },
          //搜索重置
          clearAll() {
            for (var key in this.TableItem.tableContainer.queryData) {
              let obj = this.TableItem.tableContainer.queryData[key];
              if (obj.type && obj.type == "ARRAY") {
                //卖家类型
                obj.inputVal.splice(0, obj.inputVal.length);
              } else if(obj.type&&obj.type=="BSR"){
                this.$set(obj,"inputVal",this.TableItem.tableContainer.sortData[0].value)
              }else {
//                if(obj.valuetype==="int"||obj.valuetype==="float"){
//                  this.$set(obj, "inputVal", 0);
//                }else{
//                  this.$set(obj, "inputVal", "");
//                }
                this.$set(obj, "inputVal", "");
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
          //获取列名
          getColumn(success) {
            //获取表格的标题
            let _this = this;
            this.TableItem.tableContainer.columns={};
            commonUtil.queryData({
              url: "/auth/get/column",
              async:true,
              queryParams: {cid: _this.TableItem.parmasConfig.column.modelID},
              callback: (res) => {
                _this.TableItem.tableContainer.columns = Model.getListTitle(res.data);
                success && success();
              },
              error:(res)=>{

              }
            })
          },
          //表格行列数据处理
          setTableData() {
            let _this=this;
            //设置每个图表的筛选条件
            commonUtil.clearArray(this.TableItem.tableContainer.tableColumns);
            let columnTitle = this.TableItem.tableContainer.columns.demesion.concat(this.TableItem.tableContainer.columns.messures);
            let linkKey=commonUtil.getUUID("产品链接",columnTitle);
            columnTitle.forEach((item, index) => {
              let tempObj = {
                title: item.chinese,
                key: item.uuid,
                sortable: item.sortable,
                width: 130
              };
              if (item.chinese === "产品图片") {
                //产品图片
                this.$set(tempObj, "fixed", "left");
                this.$set(tempObj, "align", "center");
                this.$set(tempObj, "width", 200);
                this.$set(tempObj, "render", (h, params) => {
                  return h('a', {
                    attrs: {
                      style: 'width: 200px;height:140px;display:table-cell;vertical-align:middle;border-radius: 6px;background:#fff;text-align: center',
                      class:"tablePicImg",
                      target:"_blank",
                      href:linkKey?params.row[linkKey]:"javascript:;"
                    }
                  }, [
                    h('img', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      attrs: {
                        src: params.row[params.column.key],
                        style: 'display:block;max-width:100%;max-height:100%;margin:0 auto;',
                      },
                      style: {},
                      on: {
                        mouseover: _this.clickImg,
                        mouseout:_this.closeImg
                      }
                    }),
                  ]);
                });
              }
              else if (item.chinese === "上架时间") {
                this.$set(tempObj,"width",160);
                this.$set(tempObj, "render", (h, params) => {
                  let date=params.row[params.column.key];
                  if(date&&date!="无"){
                    var year=date.substr(0,date.indexOf("-"));
                  }
                  return year=="1900"?'无':date;
                })
              }
              else if (item.chinese === "BSR分类"||item.chinese === "关键词") {
                tempObj = {};
              }else if(item.chinese=="产品名称"){
                this.$set(tempObj,"width",200);
              }else if(item.chinese==="FBA"||item.chinese==="亚马逊自营"){
                this.$set(tempObj, "render", (h, params) => {
                  return params.row[params.column.key]=="no"?'否':'是'
                })
              }else if(item.chinese==="产品链接"){
//                tempObj = {};
                this.$set(tempObj, "render", (h, params) => {
                  return h('a', {
                    attrs: {
                      class:"mylinks",
                      href:linkKey?params.row[linkKey]:"javascript:;",
                      target:"_blank"
                    },
                    domProps: {
                      innerText: params.row[params.column.key]
                    }
                  });
                });
              }else if(item.chinese==="创建时间"||item.chinese==="任务id"){
                tempObj = {};
              }
              this.TableItem.tableContainer.tableColumns.push(tempObj);
              this.setControls(item.chinese, item);
            })
            //新增操作一列
//            this.TableItem.tableContainer.tableColumns.push({
//              title: "操作",
//              key: "options",
//              sortable: false,
//              width: 130,
//              className: "blueActive"
//            });
          },
          //鼠标移上去
          clickImg(event){
            this.showImg=true;
            this.bigImg=event.srcElement.src;
          },
          //点击图片关闭
          closeImg(){
            this.showImg=false;
          },
          //表格控件绑定
          setControls(colName, item) {
            //处理控件名称及其绑定
            switch (colName) {
              //维度
              case "产品名称":
                commonUtil.setDimension(this.TableItem.tableContainer.queryData.product, item);
                break;
              case "品牌名":
                commonUtil.setDimension(this.TableItem.tableContainer.queryData.brand, item);
                break;
              case "FBA":
                commonUtil.setDimension(this.TableItem.tableContainer.queryData.sellerFBA, item);
                break;
              case "亚马逊自营":
                commonUtil.setDimension(this.TableItem.tableContainer.queryData.sellerAmazon, item);
                break;
              case "上架时间":
                commonUtil.setDimension(this.TableItem.tableContainer.queryData.time, item);
                break;
              case "BSR分类":
                //BSR分类
                commonUtil.setDimension(this.TableItem.tableContainer.queryData.BSRsort, item);
                break;
              //BSR排名
              case "BSR排名":
                commonUtil.setDimension(this.TableItem.tableContainer.queryData.BSR, item);
                break;
              //数值
              case "售价":
                commonUtil.setMessure(this.TableItem.tableContainer.queryData.productPrices, item);
                break;
              case "评分数":
                commonUtil.setMessure(this.TableItem.tableContainer.queryData.productRates, item);
                break;
              //类目选择=>跟卖卖家数
              case "跟卖卖家":
                commonUtil.setMessure(this.TableItem.tableContainer.queryData.category, item);
                break;
            }
          },
          //表格数据初始化
          initData() {
            //measure
            commonUtil.clearArray(this.TableItem.initCondition.measures);
            commonUtil.clearArray(this.TableItem.initCondition.demesion);
            this.TableItem.tableContainer.columns.messures.forEach((item, index) => {
              this.TableItem.initCondition.measures.push({
                "col": item.col,
                "agg": item.agg[0],//聚合方式
                "sortType": "DEFAULT",
                "chinese": item.chinese,//列表
                "uuid": item.uuid
              })
            })
            //demession
            this.TableItem.tableContainer.columns.demesion.forEach((item, index) => {
              this.TableItem.initCondition.demesion.push({
                "col": item.col,
                "sortType": "DEFAULT",
                "chinese": item.chinese,
                "isMaxMin": false,
                "uuid": item.uuid
              })
            });

            this.TableItem.initCondition.extra = this.TableItem.tableContainer.columns.extra;
            //获取表格数据
            commonUtil.clearArray(this.TableItem.initCondition.condition);
            this.mockTableData();
          },
          //获取表格数据
          mockTableData(){
            this.loading = true;
            if (this.TableItem.initCondition.type === "part") {
              //点击搜索
              this.TableItem.pageBean.currentPage = 1;
              this.TableItem.pageBean.oldPage = 1;
              this.TableItem.pageBean.toPage = this.TableItem.pageBean.currentPage;
              this.$set(this.TableItem.initCondition, "type", "all");
              if(this.TableItem.initCondition.isCategory){
                //选择类目
                this.getBSRcategory(this.getTableData);
              }else{
                //直接获取数据
                this.getTableData();
              }
            }else if(this.TableItem.initCondition.type === "all"){
              //初始化 切换类目 翻页
              if(!this.TableItem.initCondition.isPage){
                //不是翻页
                this.getBSRcategory(this.getTableData);
              }else{
                this.getTableData();
              }
            }
          },
          rowClassName(row, index) {
            return 'demo-table-row';
          },
          //获取品牌名
          getBrandName(){
            let _this=this;
            let sendDemesion=[];
            let sendCondition=[];
            //添加关键词
            let keyword={
              uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
              chinese: "关键词",
              relation:"EQUAL",
              col: "crawler_wcs_amazon_sku_mid.scgs_second_title",
              columnType: "STRING",
              val:""
            }
            this.$set(keyword, "val",this.currentKeyword);
            sendCondition.push(keyword);
            //时间
//            let start= {
//              chinese: "start",
//              col: "crawler_sgsc_desc_count.create_date",
//              relation: "LARGEEQUAL",
//              columnType: "DATE",
//              uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
//              val:""
//            };
//            let end={
//              chinese: "end",
//              col: "crawler_sgsc_desc_count.create_date",
//              relation: "LESS",
//              columnType: "DATE",
//              uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
//              val: ""
//            }
//            this.$set(start, "val",this.conditionDateTime[0]);
//            this.$set(end, "val",this.conditionDateTime[1]);
//            sendCondition.push(start);
//            sendCondition.push(end);
//            let task=  {
//              col: "crawler_wcs_amazon_sku_mid.scgs_status",
//              chinese: "任务id",
//              uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
//              relation: "EQUAL",
//              columnType: "STRING",
//              val: ""
//            };
//            this.$set(task, "val",this.taskId);
//            sendCondition.push(task);
            this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
                if(item.chinese==="类目"){
                  this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                  this.$set(item, "relation", "EQUAL");
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
              }
            })
            commonUtil.queryData({
              url: "/di/box/data",
              async:true,
              queryParams: {
                cid: _this.TableItem.parmasConfig.query.cid,
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
                  "pageSize": 100000
                }),
                //固定
                modelID: 294
              },
              callback: (res) => {
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
                _this.loading = false;
              },
              complete:(res)=>{
//                _this.loading = false;
              }
            })
          },
          //获取bsr分类
          getBSRcategory(success){
            //获取品牌名
            this.getBrandName();
            let _this=this;
            let sendDemesion=[];
            let sendCondition=[];
            //添加关键词
            var keyword={
              uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
              chinese: "关键词",
              relation:"EQUAL",
              col: "crawler_wcs_amazon_sku_mid.scgs_second_title",
              columnType: "STRING",
              val:""
            }
            this.$set(keyword, "val",this.currentKeyword);
            sendCondition.push(keyword);
            //时间
//            let start= {
//                chinese: "start",
//                col: "crawler_sgsc_desc_count.create_date",
//                relation: "LARGEEQUAL",
//                columnType: "DATE",
//                uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
//                val:""
//              };
//            let end={
//                chinese: "end",
//                col: "crawler_sgsc_desc_count.create_date",
//                relation: "LESS",
//                columnType: "DATE",
//                uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
//                val: ""
//              }
//            this.$set(start, "val",this.conditionDateTime[0]);
//            this.$set(end, "val",this.conditionDateTime[1]);
//            sendCondition.push(start);
//            sendCondition.push(end);
//            let task=  {
//              col: "crawler_wcs_amazon_sku_mid.scgs_status",
//              chinese: "任务id",
//              uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
//              relation: "EQUAL",
//              columnType: "STRING",
//              val: ""
//            };
//            this.$set(task, "val",this.taskId);
//            sendCondition.push(task);
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
              }else{
                if(item.chinese==="类目"){
                  this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                  this.$set(item, "relation", "EQUAL");
                }
                sendCondition.push(item);
              }
            });
            this.TableItem.tableContainer.tableData.splice(0,this.TableItem.tableContainer.tableData.length);
            commonUtil.queryData({
              url: "/di/box/data",
              async:true,
              queryParams: {
                cid: _this.TableItem.parmasConfig.query.cid,
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
                  "pageSize": 100000
                }),
                //固定
                modelID: 294
              },
              callback: (res) => {
                if(res.status===1){
                  commonUtil.clearArray(_this.TableItem.tableContainer.sortData);
                  let sorts=[];
                  if(res.data.result&&res.data.result.length>0){
                    res.data.result.forEach((item,i)=>{
                      sorts.push(item[0]);
                    })
                    sorts=commonUtil.filterRepeat(sorts);
                    //bsr品类
                    sorts.forEach((sort,j)=>{
                      if(sort&&sort!=""){
                        _this.TableItem.tableContainer.sortData.push({
                          value:sort,
                          label:sort
                        })
                      }
                    })
                    if(_this.TableItem.tableContainer.sortData.length>0){
                      _this.$set(_this.TableItem.tableContainer.queryData.BSRsort,"inputVal",_this.TableItem.tableContainer.sortData[0].value);
                    }
                    success&&success();
                  }else{
                    _this.showMessage.push(1);
                    success&&success();
                  }
                }else{
                  _this.loading = false;
                }
              },
              error:()=>{
                  _this.loading = false;
              },
              complete:(res)=>{
//                _this.loading = false;
              }
            })
          },
          //获取品牌数(爆品)
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
                    _this.TableItem.tableContainer.tableColumns.forEach((item,index)=>{
                      if(item.key===commonUtil.getUUID("品牌名",_this.TableItem.tableContainer.columns.demesion.concat(_this.TableItem.tableContainer.columns.messures))){
                        _this.$set(item,"title","品牌名"+"("+_this.TableItem.tableContainer.brandCount+")");
                      }
                    })
                  }
                }
              },
              error:()=>{

              }
            })
          },
          //获取表格数据
          getTableData(){
            this.loading = true;
            let _this = this;
            if(!this.TableItem.initCondition.isPage){
              //不是翻页
              if (this.TableItem.tableContainer.columns.extra&&this.TableItem.tableContainer.columns.extra.length!=0){
                this.TableItem.tableContainer.columns.extra.forEach((item,index)=>{
                  if(item.chinese==="BSR分类"){
                    this.$set(item, "val", this.TableItem.tableContainer.queryData.BSRsort.inputVal);
                  }else if(item.chinese==="类目"){
                    this.$set(item, "val", commonUtil.handelFormat(this.chooseType));
                    this.$set(item, "relation", "EQUAL");
                  }
                  this.TableItem.initCondition.condition.push(item);
                })
                //添加关键词
                let keyword={
                  uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
                  chinese: "关键词",
                  relation:"EQUAL",
                  col: "crawler_wcs_amazon_sku_mid.scgs_second_title",
                  columnType: "STRING",
                  val: ""
                }
                this.$set(keyword, "val",this.currentKeyword);
                this.TableItem.initCondition.condition.push(keyword);
                //时间
//                let start= {
//                  chinese: "start",
//                  col: "crawler_sgsc_desc_count.create_date",
//                  relation: "LARGEEQUAL",
//                  columnType: "DATE",
//                  uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
//                  val:""
//                };
//                let end={
//                  chinese: "end",
//                  col: "crawler_sgsc_desc_count.create_date",
//                  relation: "LESS",
//                  columnType: "DATE",
//                  uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
//                  val: ""
//                }
//                this.$set(start, "val",this.conditionDateTime[0]);
//                this.$set(end, "val",this.conditionDateTime[1]);
//                this.TableItem.initCondition.condition.push(start);
//                this.TableItem.initCondition.condition.push(end);
                let task=  {
                    col: "crawler_wcs_amazon_sku_mid.scgs_status",
                    chinese: "任务id",
                    uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
                    relation: "EQUAL",
                    columnType: "STRING",
                    val: ""
                };
                this.$set(task, "val",this.taskId);
                this.TableItem.initCondition.condition.push(task);
              }
            }
            this.TableItem.initCondition.isPage=false;
            this.TableItem.tableContainer.tableData.splice(0,this.TableItem.tableContainer.tableData.length);
            commonUtil.queryData({
              url: "/query/single",
              async:true,
              queryParams: {
                cid: _this.TableItem.parmasConfig.query.cid,
                //查询条件
                sqlParam: JSON.stringify({
                  //measures
                  "columnMessure": _this.TableItem.initCondition.measures ? _this.TableItem.initCondition.measures : [],
                  //demesion
                  "groupbys": _this.TableItem.initCondition.demesion ? _this.TableItem.initCondition.demesion : [],
                  "tableName": "kylin_sales",
                  "conditions":_this.TableItem.initCondition.condition ? _this.TableItem.initCondition.condition : [] ,
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
                modelID: _this.TableItem.parmasConfig.query.modelID
              },
              callback: (res) => {
                _this.loading = false;
                if(res.data.result&&res.data.result.length>0){
                  let data = Model.getListData(res.data, _this);
                  commonUtil.clearArray(_this.TableItem.tableContainer.tableData);
                  _this.$set(_this.TableItem.tableContainer,'tableData', data.datas);
                  commonUtil.clearArray(_this.links);
                  _this.links=data.links;
                }else{
                  _this.showMessage.push(1);
                }
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
          /*----------分页模块-------------------*/
          //分页请求处理
          changePrevPage() {
            //获取上一页
            this.TableItem.pageBean.oldPage = this.TableItem.pageBean.currentPage;
            if (this.TableItem.pageBean.currentPage <= 1) {
              return;
            }
            this.TableItem.pageBean.currentPage--;
            this.TableItem.pageBean.toPage = this.TableItem.pageBean.currentPage;
            //获取上一页数据
            this.$set(this.TableItem.initCondition,"isPage",true);
            this.mockTableData();
          },
          changeNextPage() {
            if(this.TableItem.tableContainer.tableData.length==0){
              return;
            }
            this.TableItem.pageBean.oldPage = this.TableItem.pageBean.currentPage;
            //获取下一页
            this.TableItem.pageBean.currentPage++;
            this.TableItem.pageBean.toPage = this.TableItem.pageBean.currentPage;
            //获取下一页数据
            this.$set(this.TableItem.initCondition,"isPage",true);
            this.mockTableData();
          },
          toWhatPage() {
            if (!commonUtil.positiveInteger(+(this.TableItem.pageBean.toPage))) {
              this.TableItem.pageBean.toPage = "";
              return;
            } else if (this.TableItem.pageBean.toPage == 0) {
              //判断输入的是否为整数
              this.TableItem.pageBean.toPage = "";
              return;
            }
            this.TableItem.pageBean.oldPage = this.TableItem.pageBean.currentPage;
            this.TableItem.pageBean.currentPage = this.TableItem.pageBean.toPage;
            this.$set(this.TableItem.initCondition,"isPage",true);
            this.mockTableData();
          },
          changeSize(){
            this.$set(this.TableItem.initCondition,"isPage",true);
            this.mockTableData();
          }
        }
    }
</script>
<style lang="less">
  .keywordCategory{
    .ivu-select-dropdown{
      width: auto !important;
      min-width: 288px !important;
      max-width: 700px;
      left: 530px !important;
      height: auto;
      max-height:650px;
    }
  }
  #keywordTable .ivu-table-fixed-body{
    height: 759px !important;
  }
</style>
