<template>
    <div class="crawler-help">
        <h1 class="help-doc-head">数据特工</h1>
        <!--<p class="pub-title">
        	<time>2017-11-06 12:12 </time> &nbsp; 
        	问题与意见反馈：<span>大数据部熊子怡 </span> &nbsp; 
        	QQ: <span>2146828242</span>
        </p>
        <Row>
        	<Col span="14">
        		<div class="crawler-contain" id="gallery">
		        	<div class="blue-text">
		        		<p>亚马逊网页采集器，可以 根据您指定的采集入口链接，将该链接下的所有产品的详情页信息采集下来，目前支持亚马逊美、英、日、法、意、西、德站点。</p>
		        	</div>
		        	<div class="instructions-wrap">
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-1">1.选择采集平台</h3>
		        			<p class="item-text-first">进入自助爬虫采集器主页，选择待采集的网站平台，默认为亚马逊站</p>
		        		</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-2">2.单次采集</h3>
		        			<p class="item-text-first">选择 ”单次采集“ 模式，单次采集每次仅可爬取一次数据，不可定时循环采集</p>
		        			<div class="img-wrap">
		        				<a :href="pageImages[0].big"><img alt="" :src="pageImages[0].mini"></a>
		        			</div>
		        			
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-1">2.1产品页采集</h4>
		        				<p class="item-text-two">
		        					根据产品ASIN和站点标识(COM、CO.UK DE等)、采集产品相关数据信息
		        				</p>
		        				<ul class="item-list">
		    						<li>1.选择 ”产品页“ 采集类型</li>
		    						<li>2.输入对应ASIN(如：B00GRIR87M)和站点</li>
		    					</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-2">2.2列表页采集</h4>
		        				<p class="item-text-two">
		        					根据类目对应的产品列表，采集TOP1000的数据信息
		        				</p>
		        				<ul class="item-list">
		    						<li>1.选择 ”列表页“ 采集类型</li>
		    						<li>2.输入包含有列表数据的类目链接，采集默认排序TOP1000</li>
		    					</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-3">2.3关键词搜索采集</h4>
		        				<p class="item-text-two">
		        					根据关键词搜索产品列表，采集TOP1000的数据信息。
		        				</p>
		        				<ul class="item-list">
		    						<li>1.选择 ”关键词搜索“ 采集类型</li>
		    						<li>2.输入关键词（如：SHOE）和站点，采集默认排序TOP1000</li>
		    					</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-4">2.4热销榜采集</h4>
		        				<p class="item-text-two">
		        					根据类目对应的热销排行榜，采集TOP1000的数据信息
		        				</p>
		        				<ul class="item-list">
		    						<li>1.选择 ”热销榜(BestSellers)“ 采集类型</li>
		    						<li>2.输入排行榜类目结构（如：Kitchen & Dining>Kitchen Utensils & Gadgets>Graters,Peeleers & Slicers）和排行榜采集链接</li>
		    					</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-5">2.5新品榜采集</h4>
		        				<p class="item-text-two">
		        					根据类目对应的新品排行榜，采集TOP1000的数据信息
		        				</p>
		        				<ul class="item-list">
		    						<li>1.选择 ”新品榜(NewReleases)“ 采集类型</li>
		    						<li>2.输入排行榜类目结构（如：Kitchen & Dining>Kitchen Utensils & Gadgets>Graters,Peeleers & Slicers）和排行榜采集链接</li>
		    					</ul>
		        			</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-3">3.循环采集</h3>
		        			<p class="item-text-first">选择 ”循环采集“ 模式，可以自定义采集周期、次数、时间维度</p>
		        			<div class="img-wrap">
		        				<a :href="pageImages[1].big"><img alt="" :src="pageImages[1].mini"></a>
		        			</div>
		        			
		        			<ul class="item-list">
		    						<li>1.选择  ”任务采集频次“ ，任务采集间隔的天数</li>
		    						<li>2.选择 ”任务跟踪时间范围“，任务采集持续的天数 </li>
		    						<li>3.选择 采集类型 ”热销榜(BestSellers)“, ”新品榜(NewReleases)“  </li>
		    						<li>4.输入排行榜类目结构（如：Kitchen & Dining>Kitchen Utensils & Gadgets>Graters,Peeleers & Slicers）和排行榜采集链接</li>
		    					</ul>
		        		</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-4">4.任务状态</h3>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-1">4.1状态筛选</h4>
		        				<p class="item-text-two">
		        					可按 "全部" 、 "等待采集" 、 "采集中"、 "采集失败"、 "采集完成" 几种状态和提交时间查看用户提交的任务。
		        				</p>
		        				<div class="img-wrap">
			        				<a :href="pageImages[2].big"><img alt="" :src="pageImages[2].mini"></a>
			        			</div>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-2">4.2状态注释</h4>
		        				<ul class="item-list">
		    						<li>1."等待采集" ：任务按提交时间进行排队爬取，可查看前方排队等候任务数</li>
		    						<li>2."采集完成" ：采集完成后，可自行下载CSV文件进行数据分析，后续将接入数据洞察，提供全方位一体化数据分析</li>
		    						<li>3."采集失败" ：中途任务出错，需重新创建任务</li>
		    						<li>4."采集中" ：任务进行中</li>
		    					</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-3">4.3文件操作</h4>
		        				<ul class="item-list"> 
		    						<li>1."导出CSV" ：任务完成后，可导出EXCEL文件</li>
		    						<li>2."删除" ：可删除失效任务请求</li>
		    					</ul>
		        			</div>
		        		</div>
		        	</div>
		        </div>
        	</Col>
        	<Col span="4" offset="6" style="position: relative;">
			       	<div class="console" id="myScrollspy">
			       		<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
			                <li class="active"><a href="#section-1">1.选择采集平台</a></li>
			                <li><a href="#section-2">2.单次采集</a><span class="click-ico down-ico" :class="{'up-ico':down2}" @click="toggleDown(2)">
			                	
			                </span>
			                	<ul class="nav">
			                		<li><a href="#section-2-1">2.1 产品页采集</a></li>
			                		<li><a href="#section-2-2">2.2 列表页采集</a></li>
			                		<li><a href="#section-2-3">2.3 关键词搜索采集</a></li>
			                		<li><a href="#section-2-4">2.4 热销 榜采集</a></li>
			                		<li><a href="#section-2-5">2.5 新品榜采集</a></li>
			                	</ul>
			                </li>
			                <li><a href="#section-3">3.循环采集</a></li>
			                <li><a href="#section-4">4.任务采集</a> <span class="click-ico down-ico" :class="{'up-ico':down4}" @click="toggleDown(4)">
			                	
			                </span>
			                	<ul class="nav">
			                		<li><a href="#section-4-1">4.1 状态筛选</a></li>
			                		<li><a href="#section-4-2">4.2 状态注释</a></li>
			                		<li><a href="#section-4-3">4.3 关键词搜索 采集</a></li>
			                	</ul>
			                </li>
			            </ul>
			       </div>
        	</Col>
        </Row>-->
    </div>
</template> 

<script>
import Swiper from "./../../../../../static/js/fs_forse";
export default {
  data () {
    return {
    	"down4":true,
    	"down2":true,
    }
  },
  mounted() {
  	let _this=this;
  	setTimeout(function(){
  		$('#myScrollspy').affix({
		  offset: {
		    top: 100,
		    /*bottom: function () {
		      return (this.bottom = $('.footer').outerHeight(true))
		    }*/
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
            //this.$Message.info(`Status: ${status}`);
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
	.item-list{margin-top: 20px; color: #666; padding-left: 24px;
		li{line-height:26px;}
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
    ul.nav-tabs>li.active>ul>li.active>a, ul.nav-tabs>li.active>ul>li.active>a:hover{
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
