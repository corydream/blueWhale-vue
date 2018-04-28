<template>
    <div>
      <div class="flexBox">
        <div class="memuTop">
          <Select v-model="site" size="large" disabled>
            <Option v-for="item in categoryItem.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>类目选择 :</span>
                <Cascader  :value="chooseType"
                           size="large"
                           :data="categoryFilter"
                           class="typeSearch"
                           v-if="showCategory"
                           :render-format="formatValue"
                           :clearable=false filterable placeholder="请选择或输入类目"
                            change-on-select
                           @on-change="testCategory"
                           :load-data="loadData"
                ></Cascader>
          <div class="btns">
            <Button type="primary" @click="searchCategory">搜索</Button>
          </div>
        </div>
        <div class="controlMemu">
          <div class="brand">
            <ul>
              <li class="active" @click="tabShowing('amazon')"><img src="../../../assets/images/amazon.png" alt=""></li>
              <li  v-if="categoryItem.type!='explode'||categoryItem.showNewColumn!='name1'" class="cover"><img src="../../../assets/images/ebay.png" alt=""></li>
              <li  v-if="categoryItem.type=='explode'&&categoryItem.showNewColumn=='name1'" class="active" @click="tabShowing('ebay')"><img src="../../../assets/images/ebay.png" alt=""></li>
              <li class="cover"><img src="../../../assets/images/sumaitong.png" alt=""></li>
              <li class="cover"><img src="../../../assets/images/wish.png" alt=""></li>
              <li class="cover"><img src="../../../assets/images/ali.png" alt=""></li>
            </ul>
          </div>
          <div class="dataSource" v-if="categoryItem.showDataSource">
            <h2>*数据源为{{dateTime}}{{categoryItem.categoryTitle}}</h2>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import category from "../../../config/insight/categoryDatas/category";
  //通用方法
  import commonUtil from "../../../config/insight/commons/comonUse";
    export default {
        data() {
          return{
            //站点
            site: '美站',
            //站点类目选择数据
            categoryFilter:[],
            //显示类目选择
            showCategory:false,
            //数据源日期
            dateTime:commonUtil.formatYesterDay(),
            platform:"AMZ",
          }
        },
         props:['categoryItem','showMessage','chooseType'],
        created(){
          //判断是amazon还是ebay
          if(this.categoryItem.type=="explode"&&this.categoryItem.showNewColumn=="name1"){
            let routerName=this.$route.name;
            switch (routerName){
              case "explodeProductAmazonSum":this.platform="AMZ";break;
              case "explodeProductEbaySum":this.platform="EBAY";break;
            }
          }
          //获取类目选择
          this.getChooseType();
        },
        methods:{
          /*--------类目选择模块-------*/
          loadData(item, callback){
            item.loading = true;
            let sendCategory=item.__label.split(" / ").join(">");
            commonUtil.queryData({
              url: "/query/category",
              method:"post",
              async:true,
              queryParams: {
                categoryType:this.categoryItem.params.categoryType,
                exporationType:this.categoryItem.params.exporationType,
                platform:this.categoryItem.params.platform,
                siteType:this.categoryItem.params.siteType,
                category:sendCategory,
                echo:"no"
              },
              callback:(res)=>{
                let childrenData=res.data.result;
                this.$set(item,"children",childrenData);
                item.loading = false;
                callback();
              },
              error:()=>{

              }
          })
         },
          getChooseType(){
            let _this=this;
            if(this.categoryItem.params){
              this.$set(this.categoryItem.params,"platform",this.platform);
              this.$set(this.categoryItem.params,"siteType",this.site);
              if(this.categoryItem.showNewColumn=="name1"||this.categoryItem.showNewColumn=="name4"){
                this.$set(this.categoryItem.params,"categoryType",'SUMMARY');
              }else{
                this.$set(this.categoryItem.params,"categoryType",'RECOMMEND');
              }
            }
            if(this.chooseType.length>0&&this.chooseType[0]!=""){
              this.$set(this.categoryItem.params,"echo",'yes');
              this.$set(this.categoryItem.params,"category",this.chooseType.join(">"));
            }else{
              this.$set(this.categoryItem.params,"echo",'no');
              this.$set(this.categoryItem.params,"category","");
            }
         /*   let savekey=this.categoryItem.type+this.platform;
            if(window.sessionStorage.getItem(savekey)){
              let resultCategory=JSON.parse(window.sessionStorage.getItem(savekey))
              _this.$set(_this,"categoryFilter",resultCategory);
              _this.$store.commit("changeCategoryArray",resultCategory);//保存类目数据
              _this.setCategoryDefault(resultCategory,0);
              this.showCategory=true;
              this.$emit("isReadyShow",{flag:'showBox1'});
            }else{}*/
            commonUtil.queryData({
              url: "/query/category",
              method:"post",
              async:true,
              queryParams: _this.categoryItem.params?_this.categoryItem.params:{},
              callback: (res) => {
                if(res.status==1&&res.data.result.length!=0){
                  _this.$set(_this,"categoryFilter",res.data.result);
                  _this.$store.commit("changeCategoryArray",res.data.result);//保存类目数据
                  _this.setCategoryDefault(res.data.result,1);
                  _this.showCategory=true;
                }else{
                  if(_this.$parent.type==="explode"){
                    _this.$set(_this,"categoryFilter",category.data.explodeResult);
                  }else{
                    _this.$set(_this,"categoryFilter",category.data.newsResult);
                  }
                  _this.showCategory=true;
                }
                _this.$emit("isReadyShow",{flag:'showBox1'});
              },
              error:()=>{
                if(_this.$parent.type==="explode"){
                  _this.$set(_this,"categoryFilter",category.data.explodeResult);
                }else{
                  _this.$set(_this,"categoryFilter",category.data.newsResult);
                }
                _this.showCategory=true;
                _this.$emit("isReadyShow",{flag:'showBox1'});
              }
            })
          },
          //类目默认值设置
          setCategoryDefault(res,type=0){
            //设置类目为空
//            if (this.$parent.TableItem.showNewColumn=="name2"||
//                this.$parent.TableItem.showNewColumn=="name3"){
//              //推荐
////              if(type==1){
//                this.categoryFilter.unshift({
//                  children: [],
//                  label: "全部",
//                  value: ""
//                })
//              }
              if(this.platform=="AMZ"){
                if(this.chooseType.length==1&&this.chooseType[0]==""){
                  commonUtil.clearArray(this.chooseType);
                  this.chooseType.push(res[0].value);
                }
              }else{
                //ebay
                if(res[0].children.length>0){
                  commonUtil.clearArray(this.chooseType);
                  this.chooseType.push(res[0].value);
                  this.chooseType.push(res[0].children[0].value);
                }
              }
          },
          //类目选择文字格式处理
          testCategory(value, selectedData) {
            this.$emit("chooseType",value);
            this.$store.commit("changeCategory",value);
          },
          //格式化类目选择显示的文字 a>b>c
          formatValue(labels, selectedData) {
            return commonUtil.handelFormat(labels);
          },
          //类目搜索
          searchCategory() {
            commonUtil.clearArray(this.categoryItem.initCondition.condition);
            commonUtil.clearArray(this.showMessage);
            if(this.platform=="AMZ"){
               if(this.$parent.TableItem.showNewColumn=="name1"||this.$parent.TableItem.showNewColumn=="name4"){
                   this.$parent.saveCategory();
               }
            }
            //重新调用新品指标
            if(this.$parent.TableItem.showNewColumn=="name1"&&this.platform=="AMZ"){
               if(this.$parent.boxshowFloder){
                 //全部展开
                 this.$parent.$refs.indicator.getIndicator();
                 this.$parent.$refs.charts.getechartData();
                 if(this.$parent.type==="explode"){
                   this.$set(this.$parent.echartItem,"showKeyword","");
                   //重新获取类目热度
                   this.$parent.$refs.bsrBox.getTableList();
                 }
               }
            }
            //品牌名清空
            this.$set(this.$parent.$refs.table.TableItem.tableContainer.queryData.brand,"inputVal","");
            this.$set(this.$parent.$refs.table.TableItem.tableContainer.queryData.product,"inputVal","");
            this.$set(this.$parent.$refs.table.TableItem.tableContainer.queryData.BSRsort,"inputVal","全部");
            //重新获取品牌Bsr产品 品牌名 产品名
         /*   if(this.platform=="AMZ"){
              this.$parent.$refs.table.$refs.tableList.$refs.tableWrapper.getInputValInit();
            }else{
              this.$parent.$refs.table.$refs.tableList.getInputValInit();
            }*/
            //重新获取大类目
             if(this.$parent.TableItem.showNewColumn=="name1"){
               this.$parent.$refs.table.$refs.tableList.$refs.tableWrapper.getInputValInit();
             }
            //重新获取品牌数
            if(this.$parent.type==="explode"&&this.$parent.TableItem.showNewColumn=="name1"){
              if(this.platform=="AMZ"){
                this.$parent.$refs.table.$refs.tableList.$refs.tableWrapper.getBrandCount();
              }
            }
            this.$parent.$refs.table.$refs.searchBox.searchData(true);
          },
          //展示的盒子
          tabShowing(text){
            switch (text){
              case "amazon":this.$emit("isReadyShow",{flag:"showBox2",text});break;
              case "ebay":this.$emit("isReadyShow",{flag:"showBox2",text});break;
            }
          }
        }
    }
</script>
<style lang="less">
  .flexBox{
    .ivu-select-dropdown{
      max-height: 650px;
    }
    .ivu-cascader-menu{
      height: auto;
      max-height: 550px;
      min-width:130px;
      border-right: none;
    }
  }
</style>
