<template>
    <div>
      <div class="searchBox row" :class="{flod:showFloder}">
        <div class="searchWrap">
          <div class="search-top">
            <div  class="seaTop-left">
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
            <!--<div  class="seaTop-midlle bsrCategory newsCategory">-->
              <!--<span class="seller" >BSR品类:</span>-->
              <!--<div style="display: inline-block;margin-left:14px">-->
              <!--<inputBox :TableItem="TableItem"></inputBox>-->
              <!--</div>-->
            <!--</div>-->
            <div  class="seaTop-right spec-input">
              <span>增长度TopN:</span>
              <Input v-model="TableItem.tableContainer.queryData.incrementTop.inputVal" placeholder="请输入" style="width: 260px"
                     @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.incrementTop)"
                     @on-keyup="testIntNumber(TableItem.tableContainer.queryData.incrementTop)"
              ></Input>
            </div>
            <div v-show="showFloder" class="seaTop-left">
              <span>产品评分:</span>
              <Select v-model="TableItem.tableContainer.queryData.productRates.selectValue" style="width:81px"
                      @on-change="chooseSection(TableItem.tableContainer.queryData.productRates)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="TableItem.tableContainer.queryData.productRates.inputVal" placeholder="请输入"
                     @on-blur="testNumberBlur(TableItem.tableContainer.queryData.productRates)"
                     @on-keyup="testNumber(TableItem.tableContainer.queryData.productRates)"
                     v-if="!TableItem.tableContainer.queryData.productRates.showSession"></Input>
              <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productRates.inputVal" v-if="!TableItem.tableContainer.queryData.productRates.showSession"></InputNumber>-->
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.productRates.showSession">
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productRates.session.sessionLeft" size="small"></InputNumber>-->
                <Input v-model="TableItem.tableContainer.queryData.productRates.session.sessionLeft"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productRates.session,'sessionLeft')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productRates.session,'sessionLeft')"
                ></Input>
                <span>-</span>
                <Input v-model="TableItem.tableContainer.queryData.productRates.session.sessionRight"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productRates.session,'sessionRight')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productRates.session,'sessionRight')"
                ></Input>
                <!--<InputNumber :min="0" v-model="TableItem.tableContainer.queryData.productRates.session.sessionRight" size="small"></InputNumber>-->
              </div>
            </div>
            <div v-show="showFloder" class="seaTop-midlle">
              <span>BSR排名:&nbsp;&nbsp;&nbsp;</span>
              <Select v-model="TableItem.tableContainer.queryData.BSR.selectValue" style="width:81px" @on-change="chooseSection(TableItem.tableContainer.queryData.BSR)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <!--<InputNumber  :min="0" v-model="TableItem.tableContainer.queryData.BSR.inputVal" v-if="!TableItem.tableContainer.queryData.BSR.showSession"></InputNumber>-->
              <Input v-model="TableItem.tableContainer.queryData.BSR.inputVal" placeholder="请输入"
                     @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.BSR)"
                     @on-keyup="testIntNumber(TableItem.tableContainer.queryData.BSR)"
                     v-if="!TableItem.tableContainer.queryData.BSR.showSession"></Input>
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
            <div v-if="showFloder" class="seaTop-right spec-degree">
              <span>偏差度:</span>
              <Tooltip placement="top" class="my-table-tips">
                <i class="fa fa-question-circle-o myhelp"></i>
                <div slot="content" class="my-table-tips-Content">
                  <p>{{tips.degree}}</p>
                </div>
              </Tooltip>
              <Slider class="myDegree"
                      :tip-format="formatNumber"
                      :step="1"
                      show-stops
                      @on-change="changeSlide1"
                      :min="TableItem.tableContainer.queryData.deflection.minValue"
                      :max="TableItem.tableContainer.queryData.deflection.maxValue"
                      v-model="TableItem.tableContainer.queryData.deflection.inputVal" range></Slider>
              <span>{{TableItem.tableContainer.queryData.deflection.inputVal[0]/100}}</span>
              <span>-</span>
              <span>{{TableItem.tableContainer.queryData.deflection.inputVal[1]/100}}</span>
            </div>
            <div v-show="showFloder" class="seaTop-left">
              <span>跟卖卖家数:</span>
              <Select v-model="TableItem.tableContainer.queryData.category.selectValue" style="width:81px"
                      @on-change="chooseSection(TableItem.tableContainer.queryData.category)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="TableItem.tableContainer.queryData.category.inputVal" placeholder="请输入"
                     @on-blur="testIntNumberBlur(TableItem.tableContainer.queryData.category)"
                     @on-keyup="testIntNumber(TableItem.tableContainer.queryData.category)"
                     v-if="!TableItem.tableContainer.queryData.category.showSession"></Input>
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.category.showSession">
                <Input v-model="TableItem.tableContainer.queryData.category.session.sessionLeft"
                       @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.category.session,'sessionLeft')"
                       @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.category.session,'sessionLeft')"
                ></Input>
                <span>-</span>
                <Input v-model="TableItem.tableContainer.queryData.category.session.sessionRight"
                       @on-blur="testIntNumberBlur1(TableItem.tableContainer.queryData.category.session,'sessionRight')"
                       @on-keyup="testIntNumber1(TableItem.tableContainer.queryData.category.session,'sessionRight')"
                ></Input>
              </div>
            </div>
            <div v-show="showFloder" class="seaTop-middle">
              <span>上架时间:&nbsp;&nbsp;&nbsp;</span>
              <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期"
                          style="max-width: 226px" format="yyyy-MM-dd" @on-change="chooseDate"
                          v-model="TableItem.tableContainer.queryData.time.inputVal"></DatePicker>
            </div>
            <div v-if="showFloder" class="seaTop-right spec-degree">
              <span>增长度:</span>
              <Tooltip placement="top" class="my-table-tips">
                <i class="fa fa-question-circle-o myhelp"></i>
                <div slot="content" class="my-table-tips-Content">
                  <p>{{tips.topN}}</p>
                </div>
              </Tooltip>
              <Slider v-model="TableItem.tableContainer.queryData.growth.inputVal" class="myDegree"
                      show-stops
                      range
                      :min="TableItem.tableContainer.queryData.growth.minValue"
                      :max="TableItem.tableContainer.queryData.growth.maxValue"
                      @on-change="changeSlide2"
                      show-input></Slider>
              <span>{{TableItem.tableContainer.queryData.growth.inputVal[0]}}</span>
              <span>-</span>
              <span>{{TableItem.tableContainer.queryData.growth.inputVal[1]}}</span>
            </div>
            <div v-show="showFloder"class="seaTop-left">
              <span>产品价格:</span>
              <Select v-model="TableItem.tableContainer.queryData.productPrices.selectValue" style="width:81px"
                      @on-change="chooseSection(TableItem.tableContainer.queryData.productPrices)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="TableItem.tableContainer.queryData.productPrices.inputVal" placeholder="请输入"
                     @on-blur="testNumberBlur(TableItem.tableContainer.queryData.productPrices)"
                     @on-keyup="testNumber(TableItem.tableContainer.queryData.productPrices)"
                     v-if="!TableItem.tableContainer.queryData.productPrices.showSession"></Input>
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.productPrices.showSession">
                <Input v-model="TableItem.tableContainer.queryData.productPrices.session.sessionLeft"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productPrices.session,'sessionLeft')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productPrices.session,'sessionLeft')"
                ></Input>
                <span>-</span>
                <Input v-model="TableItem.tableContainer.queryData.productPrices.session.sessionRight"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.productPrices.session,'sessionRight')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.productPrices.session,'sessionRight')"
                ></Input>
              </div>
            </div>
            <div v-if="showFloder" class="seaTop-midlle spec-input">
              <span>30天平均销量:</span>
              <Select v-model="TableItem.tableContainer.queryData.averageSales.selectValue" style="width:81px"
                      @on-change="chooseSection(TableItem.tableContainer.queryData.averageSales)">
                <Option v-for="item in categoryChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="TableItem.tableContainer.queryData.averageSales.inputVal" placeholder="请输入"
                     @on-blur="testNumberBlur(TableItem.tableContainer.queryData.averageSales)"
                     @on-keyup="testNumber(TableItem.tableContainer.queryData.averageSales)"
                     v-if="!TableItem.tableContainer.queryData.averageSales.showSession"></Input>
              <div class="inputSpec" v-if="TableItem.tableContainer.queryData.averageSales.showSession">
                <Input v-model="TableItem.tableContainer.queryData.averageSales.session.sessionLeft"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.averageSales.session,'sessionLeft')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.averageSales.session,'sessionLeft')"
                ></Input>
                <span>-</span>
                <Input v-model="TableItem.tableContainer.queryData.averageSales.session.sessionRight"
                       @on-blur="testNumberBlur1(TableItem.tableContainer.queryData.averageSales.session,'sessionRight')"
                       @on-keyup="testNumber1(TableItem.tableContainer.queryData.averageSales.session,'sessionRight')"
                ></Input>
              </div>
            </div>
            <div v-if="showFloder" class="seaTop-right spec-degree">
              <span>非0销量天数:</span>
              <Tooltip placement="top" class="my-table-tips">
                <i class="fa fa-question-circle-o myhelp"></i>
                <div slot="content" class="my-table-tips-Content">
                  <p>{{tips.sells}}</p>
                </div>
              </Tooltip>
              <Slider v-model="TableItem.tableContainer.queryData.sellDays.inputVal" class="myDegree specDegree"
                      show-stops
                      :min="TableItem.tableContainer.queryData.sellDays.minValue"
                      :max="TableItem.tableContainer.queryData.sellDays.maxValue"
                      @on-change="changeSlide3"
              ></Slider>
              <span>{{TableItem.tableContainer.queryData.sellDays.inputVal}}</span>
            </div>
            <div v-show="showFloder"  class="seaTop-right brandSpec">
              <span>品牌名称:</span>
              <Select v-model="TableItem.tableContainer.queryData.brand.inputVal"
                      clearable
                      filterable
                      remote
                      :remote-method="queryBrand"
                      :loading="TableItem.tableContainer.loadingState.brandloading"
                      style="width:285px"
                      placeholder="请输入搜索">
                <Option v-for="item in TableItem.tableContainer.brandData" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div v-show="showFloder" class="seaTop-left productName">
              <span class="seller" style="margin-right: 10px">产品名称:</span>
              <Select v-model="TableItem.tableContainer.queryData.product.inputVal"
                      clearable
                      filterable
                      remote
                      :remote-method="queryProduct"
                      :loading="TableItem.tableContainer.loadingState.productloading"
                      style="width:285px"
                      placeholder="请输入搜索">
                <Option v-for="(item,i) in TableItem.tableContainer.productData"
                        :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <!--<div style="display: inline-block;margin-left:14px">-->
              <!--<productBox :TableItem="TableItem"></productBox>-->
              <!--</div>-->
            </div>
            <div  v-show="showFloder"class="seaTop-right">
              <span>ASIN:&nbsp;&nbsp;</span>
              <Input v-model="TableItem.tableContainer.queryData.asin.inputVal" placeholder="请输入" clearable style="width:285px"></Input>
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
  import inputBox from "../selectDropBsr.vue";
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
              //增长率
              rateChoose: [
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
                  value: 'LARGEEQUAL',
                  label: '大于等于'
                },
                {
                  value: 'LESSEQUAL',
                  label: '小于等于'
                }],
              //增长率
              rateData:[
                {
                  label:"无",
                  value:""
                },
                {
                  label:"5%",
                  value:"0.05"
                },
                {
                  label:"10%",
                  value:"0.01"
                },
                {
                  label:"20%",
                  value:"0.02"
                },
                {
                  label:"30%",
                  value:"0.03"
                },
                {
                  label:"40%",
                  value:"0.04"
                }
              ],
              //区间展示
              showFloder:true,
              tips:{
                topN:"天销量增长率直线的斜率,描述增长度",
                sells:"基于销量估算的数据质量考虑,会存在没有销量的天,以此控制可容忍的有销量天数",
                degree:"R方偏差值,表示销量预估拟合准确度,越接近1越准确以此控制可容忍的偏差度。"
              },
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
              errorTipShow:false,
              tipsText:"",
              arrowState:"chevron-down",
            }
        },
      props:['TableItem','pageBean','chooseType'],
      components:{inputBox},
      computed:{
        collectActive(){
          return this.$store.state.selectTab;
        }
      },
      methods:{
        /*----------表格区间控件--------------*/
        //滚动加载监听
        handelScroll(e){
          let  box =e.target;
          let scrollTop  = box.scrollTop;//滚动条高度
          let wrapHeight = box.offsetHeight;//内部盒子高度
          let  scrollHeight = box.scrollHeight;//外部盒子高度
          if(scrollTop + wrapHeight >= scrollHeight){
//            console.log("到达底部");
            this.pageBean.oldPage=this.pageBean.currentPage;
            this.pageBean.currentPage++;
            this.getNewsThirtyBsr();
          }
          if(scrollTop<=0){
            this.pageBean.oldPage=this.pageBean.currentPage;
            this.pageBean.currentPage--;
//            console.log("到达顶部");
            this.getNewsThirtyBsr();
          }
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
        testNumberBlur(item){
          item.inputVal= searchBoxUtil.checkFloatBlur(item.inputVal);
        },
        testNumber(item){
          item.inputVal= searchBoxUtil.checkFloat(item.inputVal);
        },
        testNumberBlur1(item,typeValue){
          item[typeValue]=searchBoxUtil.checkFloatBlur(item[typeValue]);
        },
        testNumber1(item,typeValue){
          item[typeValue]= searchBoxUtil.checkFloat(item[typeValue]);
        },
        testIntNumberBlur(item){
          item.inputVal=searchBoxUtil.checkIntBlur(item.inputVal);
          //输入框变化
          if(this.TableItem.showNewColumn=="name3"){
            if(item.type=="increment"){
              this.$parent.$refs.tableList.$refs.tableWrapper.getInputValInit();
            }
          }
        },
        testIntNumber(item){
          item.inputVal=searchBoxUtil.checkInt(item.inputVal);
        },
        testIntNumberBlur1(item,typeValue){
          item[typeValue]=searchBoxUtil.checkIntBlur(item[typeValue]);
        },
        testIntNumber1(item,typeValue){
          item[typeValue]=searchBoxUtil.checkInt(item[typeValue]);
        },
        //滑块
        changeSlide1(value){
          this.$set(this.TableItem.tableContainer.queryData.deflection,"inputVal",value);
          this.$parent.$refs.tableList.$refs.tableWrapper.getInputValInit();
        },
        changeSlide2(value){
          this.$set(this.TableItem.tableContainer.queryData.growth,"inputVal",value);
          this.$parent.$refs.tableList.$refs.tableWrapper.getInputValInit();
        },
        changeSlide3(value){
          this.$set(this.TableItem.tableContainer.queryData.sellDays,"inputVal",value);
          this.$parent.$refs.tableList.$refs.tableWrapper.getInputValInit();
        },
        formatNumber(val){return  val/100;},
        //上架时间
        chooseDate(value) {
          this.TableItem.tableContainer.queryData.time.inputVal = value;//Array
        },
        /*----------表格搜索--------------*/
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
        getBottomData() {
          if(this.TableItem.tableContainer.islock){
            return;
          }
          this.pageBean.oldPage = this.pageBean.currentPage;
          this.pageBean.currentPage++;
          this.$parent.$refs.tableList.$refs.tableWrapper.getNewsThirtyBsr();
        },
        getBottomProductData() {
          if(this.TableItem.tableContainer.islock){
            return;
          }
          this.pageBean.oldPage = this.pageBean.currentPage;
          this.pageBean.currentPage++;
          this.$parent.$refs.tableList.$refs.tableWrapper.getSumProductName();
        },
        queryBsrData(query){
          commonUtil.clearArray(this.TableItem.tableContainer.sortData);
          this.pageBean.currentPage=1;
          this.pageBean.oldPage = 1;
          this.$parent.$refs.tableList.$refs.tableWrapper.queryBsrData(query);
        },
        //保存配置状态更新
        changeState(){
          this.tipsText="";
          this.errorTipShow=false;
          this.saveConfigName="";
        },
        cancel(){
          this.saveConfig=false;
        },
        closeConfig(item){
          this.deleteConfigData=item;
          this.deleteConfig=true;
        },
        /*----------保存配置--------------*/
        //获取保存列表
        getConfigList(e){
          e.stopPropagation();
          this.showConfig=!this.showConfig;
          this.arrowState=this.showConfig?"chevron-down":"chevron-up";
          let currentType =searchBoxUtil.getCurrentState(this.TableItem.type,this.TableItem.showNewColumn,this.collectActive);
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
        //保存配置
        saveConfigs(){
          this.saveConfig=true;
          this.saveConfigName="";
        },
        //保存的配置数据
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
           if(!flag) {
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
             let currentType =searchBoxUtil.getCurrentState(this.TableItem.type,this.TableItem.showNewColumn,this.collectActive);
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
          }

        },
        //确定删除配置
        confirmDeleteConfig(){
          event.cancelBubble=true;
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
        //加载配置信息
        tabConfig(item){
          event.cancelBubble=true;
          let currentType =searchBoxUtil.getCurrentState(this.TableItem.type,this.TableItem.showNewColumn,this.collectActive);
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
                console.log(tableData);
              /*  if(tableData.time.inputVal.length>0){
                  if(typeof tableData.time.inputVal[0]=="string"){
                    tableData.time.inputVal[0]=new Date(tableData.time.inputVal[0]);
                    tableData.time.inputVal[1]=new Date(tableData.time.inputVal[1]);
                  }
                }*/
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
        //重新加载数据
        reviewData(){
          this.$parent.$refs.tableList.$refs.tableWrapper.getInputValInit();
          this.searchData(true);
        },
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
              } else {
                //没有区间正常发送
                //正常类型
                let objSendSession = {
                  "col": obj.col,
                  "chinese": obj.chinese,
                  "uuid": obj.uuid,
                  "columnType": obj.columnType ? obj.columnType : "",
                  "relation": obj.selectValue,
                  "val": obj.inputVal
                }
                conditions.conditions.push(objSendSession);
              }
            } else {
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
          this.$parent.$refs.tableList.$refs.tableWrapper.mockTableData();
        },
        queryProduct(query){
          this.$parent.$refs.tableList.$refs.tableWrapper.getSumProductName(query);
        },
        queryBrand(query){
          this.$parent.$refs.tableList.$refs.tableWrapper.getBrandName(query);
        },
        queryBsr(query){
          console.log(query);
//          this.$parent.$refs.tableList.$refs.tableWrapper.getNewsThirtyBsr(query);
        }
      }
    }
</script>
<style lang="less">
  @import "../../../../style/insight/searchBox";
</style>
