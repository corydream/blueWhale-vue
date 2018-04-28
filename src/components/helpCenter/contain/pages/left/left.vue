<template>
    <!--<div class="application-left">
        <div class="application-left-contain text-left">
        	<ul class="list-group">
        		<li class="active"><span><img src="../../../assets/images/applicationLeft/crawler.png"/></span> <a href="javascript:;">自助爬虫采集器</a></li>
        	</ul>
        </div>
    </div>-->
    <div class="layout" style="width: 200px;">
        <!--<Col span="24" class="layout-menu-left">-->
            <Menu active-name="4-1" theme="dark" width="auto" :open-names="['4']" @on-select="toggleMenu">
                <div class="layout-logo-left">帮助中心</div>
                <Submenu name="1">
                    <template slot="title">
                        <!--<Icon type="ios-navigate"></Icon>-->
                        数据看板
                    </template>
                    <MenuItem name="1-1">数据看板</MenuItem>
                </Submenu>
               <!-- <Submenu name="2">
                    <template slot="title">
                        &lt;!&ndash;<Icon type="ios-keypad"></Icon>&ndash;&gt;
                        数据集市
                    </template>
                    <MenuItem name="2-1"><i class="icon-nav model"></i> 数据模型</MenuItem>
                    <MenuItem name="2-2"><i class="icon-nav agents"></i> 数据特工</MenuItem>
                    <MenuItem name="2-3"><i class="icon-nav define"></i>自定义数据</MenuItem>
                </Submenu>-->
                <Submenu name="3">
                    <template slot="title">
                        <!--<Icon type="ios-analytics"></Icon>-->
                        数据洞察
                    </template>
                    <MenuItem name="3-1"><i class="icon-dc model"></i>新品挖掘引擎</MenuItem>
                    <MenuItem name="3-2"><i class="icon-dc agents"></i>爆品分析引擎</MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <!--<Icon type="ios-analytics"></Icon>-->
                        大数据应用
                    </template>
                    <MenuItem name="4-1"><span><img src="../../../assets/images/applicationLeft/crawler.png"/> </span> 自助爬虫采集器</MenuItem>
                </Submenu>
            </Menu>
        <!--</Col>-->
    </div>
</template>

<script>
/*import folderMenu from './folder/folderMenu';
import container from './info/container';*/
//import charts from './info/charts';
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
      	this.$emit("leftToggle",menuName);
      }
  },

}
</script>
<style lang="less" scoped>
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
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{padding: 14px 24px; color: #f1f2f3;}
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
	height: 12px;
	margin-right: 14px;
	&.model{
	  margin-right: 7px;
	  background: url("../../../assets/images/icon-dataModel.png") no-repeat;
	  background-position:4px 0px;
	}
	&.agents{
	  width: 21px;
	  background: url("../../../assets/images/icon-eye.png") no-repeat;
	}
	&.define{
	  background: url("../../../assets/images/icon-definity.png") no-repeat;
	      background-position: 1px 0px;
	      margin-right: 5px;
	    }
	  }
.icon-dc{
    display: inline-block;
    width:28px;
    height:12px;
    margin-right:0px;
    &.model{
      background: url("../../../assets/images/tuijian.png") no-repeat;
    }
    &.agents{
      background: url("../../../assets/images/jingpin.png") no-repeat;
    }
  }
</style>
