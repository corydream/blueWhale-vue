<template>
  <div class="sign">
      <div class="tabsTable" id="myTabExplode">
        <div class="topTabBox">
          <router-link  :to="{ name: 'explodeProductCrossList'}"  active-class='activeLine'>{{title4}}
            <Tooltip placement="bottom" class="permeateTips mytabTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{recomandTips4}}</p>
              </div>
            </Tooltip>
          </router-link>
          <router-link  :to="{ name: 'explodeProductSum'}"  active-class='activeLine'>{{title1}}
            <Tooltip placement="top" class="permeateTips mytabTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{recomandTips1}}</p>
              </div>
            </Tooltip>
          </router-link>
          <router-link  :to="{ name: 'explodeProductTendency'}"  active-class='activeLine'>{{title3}}
            <Tooltip placement="bottom" class="permeateTips mytabTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{recomandTips3}}</p>
              </div>
            </Tooltip>
          </router-link>
        <!--  <span   :class='{activeLine:currentTab=="tab1"}' @click="changeTab('tab1')">{{title4}}
            <Tooltip placement="bottom" class="permeateTips mytabTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{recomandTips4}}</p>
              </div>
            </Tooltip>
          </span>
          <span :class='{activeLine:currentTab=="tab2"}' @click="changeTab('tab2')">{{title1}}
            <Tooltip placement="top" class="permeateTips mytabTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{recomandTips1}}</p>
              </div>
            </Tooltip>
          </span>
          <span  :class='{activeLine:currentTab=="tab3"}' @click="changeTab('tab3')">{{title3}}
            <Tooltip placement="bottom" class="permeateTips mytabTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="mytipsContent">
                <p>{{recomandTips3}}</p>
              </div>
            </Tooltip>
          </span>-->
        </div>
        <div class="tabContent">
          <!-- 这里是需要keepalive的 -->
          <!--<keep-alive>-->
            <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
          <!--</keep-alive>-->
          <!--&lt;!&ndash; 这里不会被keepalive &ndash;&gt;-->
          <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
        <!--  <explodeController :currentTab="currentTab"></explodeController>-->
          <router-view></router-view>
        </div>
      </div>
       <AsinDetail v-if="isShowAsin"></AsinDetail>
  </div>
</template>
<script>
  import AsinDetail from "../commons/asinProductDetail.vue";
  export default {
    data() {
      return {
        title4:"爆品总榜单",
        title1:"爆品BSR榜单",
        title3:"爆品推荐(30天销量增长率分析)",
        showNewColumn:false,
        flagLock:false,
        recomandTips1:"亚马逊在售页面每日BSR数据榜单，包含产品数据分析、市场分析、产品基础数据等。",
        recomandTips3:"基于公司亚马逊平台最近3个月售出的asin数据，此估算爆品榜产品30天的每日销量以及增长趋势并且根据增长度进行推荐。",
        recomandTips4:"依据当前选择类目，输出类目上下级所有产品数据。",
        currentTab:"tab1"
      }
    },
    created(){},
    computed:{
      isShowAsin(){
        return this.$store.state.isShowAsin;
      }
    },
    components:{AsinDetail},
    methods: {
      changeTab(tabName){
        this.currentTab=tabName;
      }
    }
  }
</script>
<style lang="less">
  #myTabExplode{
    box-sizing: border-box;
    background: #f2f7fa;
  .topTabBox{
    padding:10px;
    height: 41px;
    border-bottom: 1px solid #dddee1;
    background: #fff;
  >a{
    text-decoration: none;
    float: left;
    margin-right: 58px;
    position: relative;
  &:hover{
     cursor: pointer;
   }
  &.activeLine{
     color:#2d8cf0;
  &:after{
     content: "";
     position: absolute;
     height: 3px;
     width: 110%;
     left: 0;
     bottom: -10px;
     background-color: #2d8cf0;
   }
  }
  &:nth-of-type(1){
     margin-left: 40px;
   }
  }
  }
  .mytabTips{
      margin-left: 5px;
      position: absolute;
      right: -16px;
      top:-5px;
      cursor: pointer;
      .ivu-tooltip-inner{
        width: 290px;
        max-width: 290px;
        white-space: pre-wrap;
        background: #858585;
      }
    }
  }
</style>
