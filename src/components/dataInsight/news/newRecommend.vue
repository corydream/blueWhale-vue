<template>
  <div class="sign">
    <div class="tabsTable" id="myTab">
      <div class="topTabBox">
        <router-link :to="{ name: 'newRecommendCrossList'}"
                     active-class='activeLine'>{{title4}}
          <Tooltip placement="bottom" class="permeateTips mytabTips">
            <i class="fa fa-question-circle-o myhelp"></i>
            <div slot="content" class="mytipsContent">
              <p>{{recomandTips4}}</p>
            </div>
          </Tooltip>
        </router-link>
        <router-link :to="{ name: 'newRecommendSum'}"
                      active-class='activeLine'>{{title1}}
          <Tooltip placement="top" class="permeateTips mytabTips">
            <i class="fa fa-question-circle-o myhelp"></i>
            <div slot="content" class="mytipsContent">
              <p>{{recomandTips1}}</p>
            </div>
          </Tooltip>
        </router-link>
        <router-link :to="{ name: 'newRecommendTendency'}"
                     active-class='activeLine'>{{title3}}
          <Tooltip placement="bottom" class="permeateTips mytabTips">
          <i class="fa fa-question-circle-o myhelp"></i>
          <div slot="content" class="mytipsContent">
            <p>{{recomandTips3}}</p>
          </div>
        </Tooltip>
        </router-link>
      </div>
      <div class="tabContent">
        <!-- 这里是需要keepalive的 -->
        <!--<keep-alive>-->
          <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
        <!--</keep-alive>-->
        <!--&lt;!&ndash; 这里不会被keepalive &ndash;&gt;-->
        <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
        <router-view></router-view>
      </div>
    </div>
    <AsinBox v-if="showAsin"></AsinBox>
  </div>
</template>
<script>
  import AsinBox from "../commons/asinProductDetail.vue"
  export default {
    data() {
      return {
        title4:"新品总榜单",
        title1:"新品NRR榜单",
        title3:"新品推荐(30天销量增长率分析)",
        showNewColumn:"name1",
        flagLock:false,
        recomandTips3:"基于最近3个月上架的asin，按其30天销量的增长趋势进行推荐,结合多个自定义调控参数能灵活进一步控制推荐精度（具体参数意义见筛选条件一侧的问号提示说明）。",
        recomandTips1:"亚马逊在售页面每日数据榜单，包含产品数据分析、市场分析、产品基础数据等。",
        recomandTips4:"依据当前选择类目，输出类目上下级所有产品数据。",
      }
    },
    computed:{
      showAsin(){
        return this.$store.state.isShowAsin
      }
    },
    components:{AsinBox},
    created(){},
    methods: {
      tabColumnState(name) {
        if (!this.flagLock) {
          this.flagLock = false;
          this.showNewColumn=name;
        }
      }
    }
  }
</script>
<style lang="less">
  #myTab{
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
  }
</style>
