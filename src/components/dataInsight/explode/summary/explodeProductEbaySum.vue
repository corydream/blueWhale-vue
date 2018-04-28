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
        <TableList :TableItem="TableItem"
                   :showMessage="showMessage"
                   :chooseType="chooseType"
                   v-if="modelShow.tableDisplay"
                   ref="table"
                   @changeCategory="getCategory">
        </TableList>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </div>
  </div>
</template>
<script>
  import images from '../../../../assets/logo2.png';
  //页面初始数据
  import explodeData from "../../../../config/insight/explodeDatas/ebay/explodeDataEbaySum";
  //通用方法
  import commonUtil from "../../../../config/insight/commons/comonUse";
  import TableList from "../../commons/tablelists/ebay/searchTableListEbay";
  import CategoryItem from "../../commons/categorySearch";
  export default {
    data() {
      return {
        TableItem:{
          //表格
          tableContainer:explodeData.tableDatas,
          //分页模块
          pageBean:explodeData.pageBean,
          tableID:"#explodeTables",
          //请求配置
          parmasConfig:explodeData.parmasConfig,
          initCondition:explodeData.initCondition,
          type:"explode",
          title:"爆品BSR榜单",
          showNewColumn:"name1"
        },
        categoryItem:{
          //站点选择数据
          cityList: explodeData.cityList,
          //请求配置
          parmasConfig:explodeData.parmasConfig,
          initCondition:explodeData.initCondition,
          categoryTitle:"Top1000数据",
          params:{exporationType:1},
          type:"explode",
          showNewColumn:"name1",
          showDataSource:true
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
          tableDisplay:false,
          bsrDisplay:false
        },
        //选择的类目
        chooseType:[""],//["beauty & personal care","fragrance","men's","body sprays"]
        type:"explode",
        boxshowFloder:false,
        firstTime:true,
        spinShow:false
      }
    },
    props:['category',"btnState"],
    created(){
      if(this.category){
        this.chooseType=this.category;
//        this.showCategoryComponent();
      }else if(window.sessionStorage.getItem("params")){
        let obj=JSON.parse(window.sessionStorage.getItem("params"));
        this.chooseType=obj.category;
        window.sessionStorage.removeItem("params");
//        this.showCategoryComponent();
      }else{
//        this.getRemoteCategory(this.showCategoryComponent);
      }
      this.$store.commit("changeCategory",this.chooseType);
      this.$set(explodeData.initCondition,"measures",[]);
      this.$set(explodeData.initCondition,"demesion",[]);
      this.$set(explodeData.initCondition,"condition",[]);
      commonUtil.clearArray(this.showMessage);
      if(this.btnState){
        this.echartItem.showKeyword=this.btnState;
      }else if(window.sessionStorage.getItem("params")){
        let obj=JSON.parse(window.sessionStorage.getItem("params"));
        this.echartItem.showKeyword=obj.btnState;
      }
      this.modelShow.categoryDisplay=true;
      this.spinShow=true;
    },
    components:{
      TableList,CategoryItem
    },
    mounted() {
//      this.$nextTick(() => {
//        commonUtil.setTableWidth({
//          wrapper:".data-show",
//          tables:this.TableItem.tableID,
//          padding:55
//        },this);
//        //给window注册事件使chart自适应高度和宽度
//        window.onresize = () => {
//          //重置容器高宽
//          if (this.$route.path == "/dataObserve/0/explode/explodeProduct/explodeProductSum/explodeProductEbaySum") {
//            //自适应表格
//            commonUtil.setTableWidth({
//              wrapper:".data-show",
//              tables:this.TableItem.tableID,
//              padding:55
//            },this);
//          }
//        };
//      })
    },
    methods: {
      //展示当前类目
      showCategoryComponent(res){
        if(res){this.chooseType=res;}
        this.$store.commit("changeCategory",this.chooseType);
        this.modelShow.categoryDisplay=true;
        this.spinShow=true;
      },
      getCategory(value){
        this.chooseType=value;
      },
      isReadyShow(obj){
        this.spinShow=false;
        if(obj.flag=="showBox1"){
          this.modelShow.indicatorDisplay=true;
          this.modelShow.bsrDisplay=true;
          this.modelShow.echartDisplay=true;
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
      padding-top: 15px;
      background: #fff;
      height: 48px;
      margin-bottom: 10px;
      .textTitle{
        margin-bottom: 0px;
      }
      .showFloder{
        position: absolute;
        right: 45px;
        top:15px;
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
