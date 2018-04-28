<template>
    <div class="crawler-help">
        <h1 class="help-doc-head">关键词产品分析</h1>
        <Row>
			<!-- sad -->
        	<Col span="14">
        		<div class="crawler-contain" id="gallery">
		        	<div class="instructions-wrap">
		        		<div class="instructions-item">
							<a name="section-1"></a>
		        			<h3 class="item-first-title" id="section-1">1、快速入门</h3>
							<div class="img-wrap">
								<a :href="pageImages[0].big"><img alt="" :src="pageImages[0].mini"></a>
							</div>
		        			<p class="item-text-first">进入自助爬虫采集器主页，选择待采集的网站平台，默认为亚马逊站</p>
		        		</div>
						<div class="item-level-two">
							<h4 class="item-two-title" id="section-1-1">1.1 关键词产品分析说明</h4>
							<p class="item-text-two">
								类目维度下以该关键词搜索的产品，爬取top1000的产品数据进行分析，分析关键词热度以及该关键词关联性的产品销售状态，关键词下产品评论数以及评分的分布概况。捕捉可用关键词信息以及明确同等关键词竞争对手的产品在售状态。并且直接可进行产品开发，提高选品开发效率以及选品的准确性。
							</p>
						</div>
						<div class="item-level-two">
							<h4 class="item-two-title" id="section-1-2">1.2 数据来源</h4>
							<p class="item-text-two">
								自定义新增加搜索关键词，自助采集进行该关键词top1000数据的采集工作。存在采集记录的词不可重复添加。
							</p>
						</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-2">2、功能模块介绍</h3>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-1">2.1 添加新关键词任务</h4>
		        				<p class="item-text-two">
		        					点击【添加关键词】进入添加界面，选择【站点】【类目】【关键词】，点击【添加关键词】，跳转wcs自助爬虫采集页面，自助爬虫采集器页面【任务状态】查看当前采集任务，采集任务存在两种状态，分别为【采集成功】、【等待采集】。采集成功可【前往分析】或者【导出数据】。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[1].big"><img alt="" :src="pageImages[1].mini"></a>
								</div>
								<p class="item-text-center">添加关键词</p>
								<div class="img-wrap">
									<a :href="pageImages[2].big"><img alt="" :src="pageImages[2].mini"></a>
								</div>
								<p class="item-text-center">关键词采集任务</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-2">2.2 关键词管理</h4>
		        				<p class="item-text-two">
		        					管理完成爬取的关键词记录列表，含有关键词搜索，删除操作以及关键词、添加时间，类目等明细数据，点击单个关键词可直接进入该关键词的分析界面。</br>
									已爬取的关键词信息可在此进行管理操作，搜索确认是否有需要的信息。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[3].big"><img alt="" :src="pageImages[3].mini"></a>
								</div>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-3">2.3 关键指标分析</h4>
		        				<p class="item-text-two">
		        					根据关键词搜索产品列表，采集TOP1000的数据信息。
		        				</p>
		        				<ul class="item-list">
		    						<li>关键词产品量=关键词搜索曝光产品数</li>
									<li>平均review数=所有产品review数求和/产品总数</li>
									<li>平均评分数=所有产品评分数求和/产品总数</li>
									<li>平均上架天数=所有产品上架天数求和/产品总数</li>
		    					</ul>
								<h4 class="item-three-title" id="section-2-3-1">2.3.1 关键词产品量</h4>
								<p class="item-text-two">
		        					该关键词搜索下曝光产品数，不同的搜索关键词呈现的产品数不一，优化标题选词切入口，提高搜索排名，精准曝光，定位准确。
		        				</p>
								<h4 class="item-three-title" id="section-2-3-2">2.3.2 平均review数</h4>
								<p class="item-text-two">
		        					该关键词下top1000产品的平均review数，同时显示最高和最低对应的数值。
									了解该搜索词曝光下产品的回复数概况，进而参考优化在售产品标题，使用高回复数的产品热词，精准用词，精准曝光。
		        				</p>
								<h4 class="item-three-title" id="section-2-3-3">2.3.3 平均评分数</h4>
								<p class="item-text-two">
		        					该关键词下top1000产品的平均评分数，显示最高和最低数值。
									了解该词对应的产品的评分分布，是否数值表现良好，是否利于曝光。根据高评分的优词优化在售产品的标题，提高页面搜索曝光，提升选词的效率和优化关键词的精准度。
		        				</p>
								<h4 class="item-three-title" id="section-2-3-4">2.3.4 平均上架天数</h4>
								<p class="item-text-two">
		        					该关键词下top1000产品的平均上架天数，显示上架天数最大和最小的数值。
									明晰使用该关键词的产品状态分布，是近期新上架的热卖产品，还是持久高销量的老产品，以该关键词搜索下产品的在售时间的整体分布。整体时间较大，说明该词属于热词，在售产品使用率高，搜索量大。和明细数据以及其他核心指标指导选词决策。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[4].big"><img alt="" :src="pageImages[4].mini"></a>
								</div>
		        			</div>
							<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-4">2.4 评分与评论数分布分析</h4>
		        				<p class="item-text-two">
		        					关键词搜索曝光下产品评分与评论数分布，了解产品的总体分布概况，集中区域的产品主要分布在哪些阶段。关键词产品的竞争度，衡量在售产品的主要定位。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[5].big"><img alt="" :src="pageImages[5].mini"></a>
								</div>
								<p class="item-text-two">
									如图：产品评分和评论数的分布整体集中于某一密集区域，30%左右落向两级阶段。评分从0-5的一个阶段，整体的产品数据都能达到4星评分以上，纵观评论数的一个分部，1000评论数展现产品的一个临界点，保持高评分并且高评论数的产品数逐渐过渡到零星数字，可查询极端数据的明细数据分析产品的能够高评分以及高评论的影响因素，作为优化参考，大量的0-1000评论数以及4-5评分的产品可分析市场产品的普遍共性，可通过极端数据和大量数据之间产品的对比寻找产品突破点，对产品优化方向进行定位，选词定位等。
								</p>
		        			</div>
							<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-5">2.5 价格带区间分析</h4>
		        				<p class="item-text-two">
		        					等梯度划分价格带，各个价格带的产品占比，使用该关键词曝光产品的价格概况，结合自身在售产品的价格定位，进行选词优化。挖掘高曝光精准定位的产品词，并且可以多次添加不同的关键词，比较价格带的分布占比，熟悉搜索词，了解搜索词相关的产品，高效利用搜索词。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[6].big"><img alt="" :src="pageImages[6].mini"></a>
								</div>
		        			</div>
							<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-6">2.6 评分与评论数分布占比</h4>
		        				<p class="item-text-two">
		        					各评分以及评论数的分布占比，对应的产品数分布，熟知目前竞争概况，高度竞争区域。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[7].big"><img alt="" :src="pageImages[7].mini"></a>
								</div>
		        			</div>
							<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-7">2.7  关键词词频分析</h4>
		        				<p class="item-text-two">
		        					全面爬取该关键词下产品的产品名称以及产品描述，分析搜索词曝光下的产品卖点，关注高可用的描述词，提高产品转化，挖掘产品描述词，精准曝光。优化在售产品标题以及产品描述词。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[8].big"><img alt="" :src="pageImages[8].mini"></a>
								</div>
								<p class="item-text-two">
		        					 点击关键词，对应出现该关键词的词频数，可视化页面关键词呈现的越大该关键词词频越高，并且对应的搜索指数越高，属于搜索高曝光的词。可作为推广用词以及优词的参考。
		        				</p>
		        			</div>
							<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-8">2.8  产品价格与评论数的分布</h4>
		        				<p class="item-text-two">
		        					分析产品价格和评论数的布局，了解主要集中分布区域，挖掘极端数据（良好展现产品），分析极端数据的共性，提炼可参考价格以及产品的在售信息，以关键词角度切入，优化在售产品，指导选品开发。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[9].big"><img alt="" :src="pageImages[9].mini"></a>
								</div>
		        			</div>
							<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-9">2.9 关键词产品分析列表</h4>
		        				<p class="item-text-two">
		        					分析产品价格和评论数的布局，了解主要集中分布区域，挖掘极端数据（良好展现产品），分析极端数据的共性，提炼可参考价格以及产品的在售信息，以关键词角度切入，优化在售产品，指导选品开发。
		        				</p>
								<div class="img-wrap">
									<a :href="pageImages[10].big"><img alt="" :src="pageImages[10].mini"></a>
								</div>
		        			</div>
		        		</div>
		        	</div>
		        </div>
        	</Col>
        	<Col span="4" offset="6" style="position: relative;">
        		<!--<Affix :offset-top="100" @on-change="change">-->
			       	<div class="console" id="myScrollspy">
			       		<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
			                <li class="active">
								<a href="#section-1">1、快速入门</a>
								<span class="click-ico down-ico" :class="{'up-ico':down1}" @click="toggleDown(1)"></span>
			                	<ul class="nav">
			                		<li><a href="#section-2-1">1.1 关键词产品分析说明</a></li>
			                		<li><a href="#section-2-2">1.2 数据来源</a></li>
			                	</ul>
							</li>
			                <li>
								<a href="#section-2">2、功能模块介绍</a>
								<span class="click-ico down-ico" :class="{'up-ico':down2}" @click="toggleDown(2)"></span>
			                	<ul class="nav">
			                		<li><a href="#section-2-1">2.1 添加新关键词任务</a></li>
			                		<li><a href="#section-2-2">2.2 关键词管理</a></li>
			                		<li>
										<a href="#section-2-3">2.3 关键指标分析</a>
											<ul class="nav nav-inner">
												<li><a href="#section-2-3-1">2.3.1 关键词产品量</a></li>
												<li><a href="#section-2-3-2">2.3.2 平均review数</a></li>
												<li><a href="#section-2-3-3">2.3.3 平均评分数</a></li>
												<li><a href="#section-2-3-4">2.3.4 平均上架天数</a></li>
											</ul>
										</li>
			                		<li><a href="#section-2-4">2.4 评分与评论数分布分析</a></li>
			                		<li><a href="#section-2-5">2.5 价格带区间分析</a></li>
									<li><a href="#section-2-6">2.6 评分与评论数分布占比</a></li>
									<li><a href="#section-2-7">2.7 关键词词频分析</a></li>
									<li><a href="#section-2-8">2.8 产品价格与评论数的分布</a></li>
									<li><a href="#section-2-9">2.9 关键词产品分析列表</a></li>
			                	</ul>
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
    		big:"./../../../../../bgbdp/images/help-center/analysis/00-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/00-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/analysis/2.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/2-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/analysis/3.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/3-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/4.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/4-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/5.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/5-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/6.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/6-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/7.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/7-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/8.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/8-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/9.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/9-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/10.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/10-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/analysis/11.png",
    		mini:"./../../../../../bgbdp/images/help-center/analysis/11-mini.png"
		}],
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
