<template>
    <div class="crawler-help">
        <h1 class="help-doc-head">ebay市场分析</h1>
        <Row>
			<!-- sad -->
        	<Col span="16">
        		<div class="crawler-contain" id="gallery">
		        	<div class="instructions-wrap">
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-1">1、快速入门</h3>
						    	<div class="img-wrap">
							 	  <a :href="pageImages[0].big"><img alt="" :src="pageImages[0].mini"></a>
						    	</div>
		        	</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-2">2、ebay热卖排行榜说明</h3>
                  <p class="item-text-first">ebay热卖排行榜抓取类目搜索下默认排序前1000的产品数，采集产品基础数据，销量数据等，对比产品的默认排序增长幅度综合辅助选品开发。</p>
		        		</div>
                <div class="instructions-item">
                  <h3 class="item-first-title" id="section-3">3、列表搜索区域</h3>
                  <div class="img-wrap">
                    <a :href="pageImages[1].big"><img alt="" :src="pageImages[1].mini"></a>
                  </div>
                  <p class="item-text-first">字段说明：</p>
                  <p class="item-text-first">可以自定义筛选数值，自定义筛选条件，产品名称、售价、品牌名称、库存、原价、产品评分、销量、上架时间、评论数等字段进行筛选</p>
                </div>
                <div class="instructions-item">
                  <h3 class="item-first-title" id="section-4">4、榜单列表</h3>
                  <div class="img-wrap">
                    <a :href="pageImages[2].big"><img alt="" :src="pageImages[2].mini"></a>
                  </div>
                  <p  class="item-text-first">按照筛选条件，输出查询产品明细数据，数值类可自定义进行排序，单个产品可点击【☆】，产品收藏至收藏列表。</p>
                  <p  class="item-text-first" style="text-indent: -0.5em">【排名】：ebay站点默认类目搜索下默认产品排序</p>
                  <p  class="item-text-first" style="text-indent: -0.5em">【销量增长率（1天）】：产品同比前一天的销量增长率</p>
                  <p  class="item-text-first" style="text-indent: -0.5em">【排名增长率（1天）】：产品同比前一天排名增长率</p>
                </div>
		        	</div>
		        </div>
        	</Col>
        	<Col span="4" offset="4" style="position: relative;">
        		<!--<Affix :offset-top="100" @on-change="change">-->
			       	<div class="console" id="myScrollspy">
			       		<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
			         <li class="active">
								<a href="#section-1">1、快速入门</a>
							</li>
			          <li>
								<a href="#section-2">2、ebay热卖排行榜说明</a>
                </li>
                  <li>
                    <a href="#section-3">3、列表搜索区域</a>
                  </li>
                  <li>
                    <a href="#section-4">4、榜单列表</a>
                  </li>
			            </ul>
			       	</div>
			    <!--</Affix>-->
        	</Col>
        </Row>
    </div>
</template>

<script>
import Swiper from "./../../../../../static/js/fs_forse";
export default {
  data () {
    return {
    	"down2":true,
		"down1":true,
		"down4":true,
    	pageImages:[
    	  {
    		big:"./../../../../../bgbdp/images/help-center/ebayAnalysis/1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/ebayAnalysis/1-mini.png"
       	},
        {
          big:"./../../../../../bgbdp/images/help-center/ebayAnalysis/2-big.png",
          mini:"./../../../../../bgbdp/images/help-center/ebayAnalysis/2-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/ebayAnalysis/3-big.png",
          mini:"./../../../../../bgbdp/images/help-center/ebayAnalysis/3-mini.png"
        }
   ]
 }
  },
  mounted() {
  	let _this=this;
  	setTimeout(function(){
  		$('#myScrollspy').affix({
		  offset: {
		    top: 100,
		  }
		});
		_this.initImg();
  	},1000);
  },
  components: {
      /*applicationBanner,
      applicationBottom*/
  },
  methods: {
      change (status) {
      		console.log(1);
        },
        toggleDown(index){
        	this["down"+index]=!this["down"+index];
        	console.log("index");
        },
        initImg(){
    		$('#gallery img').fsgallery();
        }
  },

}
</script>
<style lang="less" scoped>
@import "./../../../../assets/css/bootstrap-responsive.css";
@import "./../../../../assets/css/fsgallery.css";
	.nav-inner{
		font-size: 12px;
		li{
			text-indent: 8px;
		}
	}
	.crawler-help{padding: 40px;
		background-color: #FFFFFF;
	}
	.help-doc-head{padding-left:40px;}
	.pub-title{border-bottom:1px solid #dadada; color:#949494; margin-top: 24px; padding-left: 40px;}
	.crawler-contain{padding:40px;}
	.blue-text{border-left:5px solid #4aa5e9; padding:10px; padding-left:24px; box-shadow: 0 1px 6px rgba(0,0,0,0.3);
			p{color:#4aa5e9;}
		}
	.instructions-item,.item-level-two{margin-top:40px;}
	.item-text-first,.item-text-two{margin-top:20px;font-size: 16px;}
	/*.item-text-first{font-size: 16px;}
	.item-text-two{font-size: 12px;}*/
	.item-list{margin: 20px 0; color: #666; padding-left: 24px;
		li{line-height:26px;}
	}
	.item-three-title{
		font-size: 16px;
		margin-top: 20px;
	}
	.item-three-title:first{
		font-size: 16px;
		margin-top: 0;
	}
	.item-text-center{
		text-align: center;
	}
	.img-wrap{margin-top:24px;}
	ul.nav-tabs{
        width:240px;
        margin-top: 20px;
        border-radius:0px;
        border-left:2px solid #d5d2d2;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        li{
	        margin: 0;
	        a{
	        	color: #333;
		        margin: 0;
		        padding: 8px 16px;
		        border-radius: 0;
		    }
	    }
	    >li{
	    	>ul{
	    		padding-left:16px;
	    	}
	    }
    }
    ul.nav-tabs>li.active>a, ul.nav-tabs>li.active>a:hover{
    	position: relative;
    	left:-2px;
        color: #4aa5e9;
        border: none;
        border-left:2px solid #4AA5E9;
        background: #dbedfb;
    }
    ul.nav-tabs>li.active>ul>li.active>a, ul.nav-tabs>li.active>ul>li.active>a:hover,.nav-inner>li.active>a{
    	color: #4aa5e9;
    }
    ul.nav-tabs.affix{
        top: 30px;
    }
    .click-ico{display: inline-block; width:24px; height: 24px; position:absolute; right:24px; top:12px; cursor: pointer;}
    .down-ico{background: url("./../../../../assets/help-center/down-ico.png") no-repeat;}
    .up-ico{background: url("./../../../../assets/help-center/up-ico.png") no-repeat;}
    .down-ico~ul{display: none;}
    .up-ico~ul{display: block;}

</style>
