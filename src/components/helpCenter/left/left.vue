<template>
    <!--<div class="application-left">
        <div class="application-left-contain text-left">
        	<ul class="list-group">
        		<li class="active"><span><img src="../../../assets/images/applicationLeft/crawler.png"/></span> <a href="javascript:;">自助爬虫采集器</a></li>
        	</ul>
        </div>
    </div>-->
    <div class="layout" style="width: 200px;">
            <Menu active-name="4-1" theme="dark" width="auto" :open-names="['1','3','4']" @on-select="toggleMenu">
                <div class="layout-logo-left">帮助中心</div>
                <Submenu name="1">
                    <template slot="title">
                        <!--<Icon type="ios-navigate"></Icon>-->
                        敏捷BI
                    </template>
                    <MenuItem name="1-1">敏捷BI</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <!--<Icon type="ios-analytics"></Icon>-->
                        数据洞察
                    </template>
                    <MenuItem name="3-1"><i class="icon-dc model"></i>新品挖掘引擎</MenuItem>
                    <MenuItem name="3-2"><i class="icon-dc agents"></i>爆品分析引擎</MenuItem>
                    <MenuItem name="3-3"><i class="icon-dc define"></i>关键词产品分析</MenuItem>
                    <MenuItem name="3-4"><i class="icon-dc analysis"></i>ebay市场分析</MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <!--<Icon type="ios-analytics"></Icon>-->
                        大数据应用
                    </template>
                    <MenuItem name="4-1"><span><img src="../../../assets/images/applicationLeft/crawler.png"/> </span> 自助爬虫采集器</MenuItem>
                </Submenu>
            </Menu>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted() {

  },
  components: {
      /*folderMenu,
      container*/
  },
  methods: {
      toggleMenu(menuName){
        console.log(menuName);
      	this.$emit("leftToggle",menuName);
      }
  },

}
</script>
<style lang="less" scoped>
@import url("./../../../style/show-graph.css");
.application-left{
	background-color:#30363d;
    min-height: 1200px;
    ul{}
    li{
    	padding:0 12px;
    	line-height:32px;
    	a{color: #333;}
    	&.active{background-color:#4aa5e9;
    		a{color:#fff;}
    	}
    }
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{padding: 8px 24px; color: #f1f2f3;}
.layout{
        background: #f5f7f9;
        position: relative;
        .ivu-menu-dark{height: 100%; min-height: 1200px;}
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        padding:15px 0 15px 15px;
        background-color: #30363d;
        color:#fff;
    }
.icon-nav{
	display: inline-block;
	width:28px;
	height: 18px;
    margin-right: 14px;
    vertical-align: -4px;
	&.model{
	  margin-right: 7px;
	  background: url("../../../assets/images/icon-dataModel.png") no-repeat;
	  background-position:3px 0px;
	}
	&.agents{
	  width: 21px;
	  background: url("../../../assets/images/icon-eye.png") no-repeat;
	}
	&.define{
	  background: url("../../../assets/images/icon-definity.png") no-repeat;
      background-position: 2px 0px;
       margin-right: 9px;
	    }
	  }
.icon-dc{
    display: inline-block;
    width:28px;
    height:18px;
    margin-right:0px;
    vertical-align: -4px;
    &.model{
      background: url("../../../assets/images/tuijian.png") no-repeat;
    }
    &.agents{
      background: url("../../../assets/images/jingpin.png") no-repeat;
    }
    &.define{
      background: url("../../../assets/images/keyword.png") no-repeat;
          background-position: 1px 0px;
    }
    &.analysis{
    background: url("../../../assets/images/analysis.png") no-repeat;
    background-position: 1px 0px;
    }
  }
</style>
