<template>
  <div>
    <div>
      <div class="wrap row">
        <CategoryItem  @chooseType="getCategory"
                       @isReadyShow="isReadyShow"
                       :categoryItem="categoryItem"
                       :showMessage="showMessage"
                       :chooseType="chooseType"
                       v-if="modelShow.categoryDisplay"
                       ref="category">
        </CategoryItem>
      </div>
      <div class="fixFather">
        <TableCrossList
          :TableItem="TableItem"
          :showMessage="showMessage"
          :chooseType="chooseType"
          v-if="modelShow.tableDisplay"
          ref="table"
          @changeCategory="getCategory"
        >
        </TableCrossList>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </div>
  </div>
</template>
<script>
  import images from '../../../assets/logo2.png';
  //页面初始数据
  import initDatas from "../../../config/insight/recommendDatas/amazon/recommendData4";
  //通用方法
  import commonUtil from "../../../config/insight/commons/comonUse";
  import TableCrossList from "../commons/tablelists/amazon/searchTableCrossList";
  import CategoryItem from "../commons/categorySearch";
  export default {
    data() {
      return {
        TableItem:{
          //表格
          tableContainer:initDatas.tableContainer,
          //分页模块
          pageBean:initDatas.pageBean,
          tableID:"#tables",
          //请求配置
          parmasConfig:initDatas.parmasConfig,
          initCondition:initDatas.initCondition,
          type:"news",
          title:"新品总榜单",
          showNewColumn:"name4",
        },
        categoryItem:{
          //站点选择数据
          cityList: initDatas.cityList,
          //请求配置
          parmasConfig:initDatas.parmasConfig,
          initCondition:initDatas.initCondition,
          categoryTitle:"TOP1000数据",
          type:"news",
          showNewColumn:"name4",
          params:{exporationType:0},
          showDataSource:false
        },
        indicatorItem:{
          //新品指标看板
          databoardTarget:initDatas.databoardTarget,
          //请求配置
          parmasConfig:initDatas.parmasConfig,
          initCondition:initDatas.initCondition,
          title:"Hot New Releases指标分析",
          type:"news",
          indicatorshowFloder:true
        },
        //是否有类目数据
        showMessage:[],
        //模块展示
        modelShow:{
          //类目选择
          categoryDisplay:false,
          //指标
          indicatorDisplay:false,
          //显示图表
          echartDisplay:false,
          //显示表格
          tableDisplay:false
        },
        //选择的类目
        chooseType:[""],//["beauty & personal care", "makeup", "lips", "lip glosses"]
        type:"news",
        boxshowFloder:false,
        firstTime:true,
        spinShow:true
      }
    },
    props:['category',"btnState",'showNewColumn'],
    created(){
      this.$store.commit("isShowAsin",false);
      if(this.category){
        this.chooseType=this.category;
        this.showCategoryComponent();
      }else if(window.sessionStorage.getItem("params")){
        let obj=JSON.parse(window.sessionStorage.getItem("params"));
        this.chooseType=obj.category;
        window.sessionStorage.removeItem("params");
        this.showCategoryComponent();
      }else{
        this.getRemoteCategory(this.showCategoryComponent);
      }
      this.$set(initDatas.initCondition,"measures",[]);
      this.$set(initDatas.initCondition,"demesion",[]);
      this.$set(initDatas.initCondition,"condition",[]);
      commonUtil.clearArray(this.showMessage);
      if(this.btnState){
        this.echartItem.showKeyword=this.btnState;
      }else if(window.sessionStorage.getItem("params")){
        let obj=JSON.parse(window.sessionStorage.getItem("params"));
        this.echartItem.showKeyword=obj.btnState;
      }
      this.spinShow=true;
    },
    components:{
      TableCrossList,CategoryItem
    },
    mounted() {
     /* this.$nextTick(() => {
        commonUtil.setTableWidth({
          wrapper:".data-show",
          tables:this.TableItem.tableID,
          padding:55
        },this);
        //给window注册事件使chart自适应高度和宽度
        window.onresize = () => {
          //重置容器高宽
          if (this.$route.path == "/dataObserve/0/news/newRecommend/newRecommendCrossList") {
            //自适应表格
            commonUtil.setTableWidth({
              wrapper:".data-show",
              tables:this.TableItem.tableID,
              padding:55
            },this);
          }
        };
      })*/
    },
 /*   beforeRouteLeave(to, from , next){
      //保存当前的类目
      this.saveCategory();
      next();
    },*/
    methods: {
      showCategoryComponent(res){
        if(res){this.chooseType=res;}
        this.$store.commit("changeCategory",this.chooseType);
        this.modelShow.categoryDisplay=true;
      },
      getCategory(value){this.chooseType=value;},
      //保存类目
      saveCategory(){
        commonUtil.saveCategory({
            pageType:this.type,
            tabName:this.TableItem.showNewColumn,
            paramName:"categorySave",
            paramData:this.chooseType,
        })
      },
      //获取类目
      getRemoteCategory(success){
        commonUtil.getRemoteCategory({
          pageType:this.type,
          tabName:this.TableItem.showNewColumn,
          paramName:"categorySave"
        },success)
      },
      isReadyShow(obj){
        this.spinShow=false;
        if(obj.flag=="showBox1"){
          this.modelShow.tableDisplay=true;
        }else if(obj.flag=="showBox2"){
          switch (obj.text){
            case "amazon":
              this.$router.push({name:"explodeProductAmazonSum"});
              break;
            case "ebay":
              this.$router.push({name:"explodeProductEbaySum"});
              break;
          }
        }
      }
    },
    watch: {
      // 如果 `showMessage` 发生改变，这个函数就会运行
      showMessage: function (newMessage) {
        if(newMessage.length===14){
//          this.$Message.info('该类目下暂无数据');
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .showBox{
    position: relative;
    background: #f2f7fa;
    .indiactorTop{
      padding-left: 45px;
      padding-top: 10px;
      background: #fff;
      height: 48px;
      margin-bottom: 10px;
      .textTitle{
        margin-bottom: 0px;
      }
      .showFloder{
        position: absolute;
        right: 45px;
        top:13px;
        color: #50b0ec;
        font-size: 14px;
        height: 21px;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
  .fixFather{
    position: relative;
    min-height: 800px;
  }
</style>
