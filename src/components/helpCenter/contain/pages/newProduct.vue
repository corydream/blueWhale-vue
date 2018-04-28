<template>
    <div class="crawler-help">
        <h1 class="help-doc-head">新品推荐引擎帮助文档<a style="color:red;margin-left:20px;font-size:16px" href="https://data.banggood.cn/resource/video/DI_help.rar" download>下载视频演示</a></h1>
        <h4 class="quick-start" id="section-0">快速入门</h4>
        <Row>
        	<Col span="14">
        		<div class="crawler-contain" id="gallery">
		        	<div class="instructions-wrap">
                <div class="operation-step operation step-one">
                  <h4 class="step-head"><i>1、</i>产品架构说明</h4>
                  <p class="help-descText">当前位置：新品推荐引擎</p>
                  <p class="help-descText">新品推荐引擎包含三个子模块，分别是：新品总榜单、新品NRR榜单、新品推荐</p>
                  <div class="img-wrap">
                    <a :href="pageImages[0].big"><img alt="" :src="pageImages[0].mini"></a>
                  </div>
                </div>
                <div class="instructions-item">
                  <h3 class="item-sec-title" id="section-2">新品总榜单</h3>
                  <p class="item-text-first">新品总榜单包含当前所选类目上下级的所有类目的产品，结合自定义搜索，总榜单默认按照类目进行排序，并且可自定义对字段进行选择操作。</p>
                </div>
                <div class="instructions-item">
                  <h4 class="item-first-title" id="section-2-1">1、搜索</h4>
                  <div class="img-wrap">
                    <a :href="pageImages[18].big"><img alt="" :src="pageImages[18].mini"></a>
                  </div>
                  <p class="item-text-first">界面示图：</p>
                  <div class="img-wrap">
                    <a :href="pageImages[17].big"><img alt="" :src="pageImages[17].mini"></a>
                  </div>
                </div>
                <div class="instructions-item">
                  <h4 class="item-first-title" id="section-2-2">2、数据区域</h4>
                  <p class="item-text-first">数据区域展示了查询的所有产品基础信息，产品图片、产品名称、品牌名、大类目、bsr排名店铺名等，可以选择显示的字段、感兴趣的产品可加入收藏列表，点击【查看详情】可查看产品近期变化趋势以及产品明细的基础数据。点击单个asin可跳转产品在售页面。</p>
                  <div class="img-wrap">
                    <a :href="pageImages[16].big"><img alt="" :src="pageImages[16].mini"></a>
                  </div>
                </div>
                <div class="instructions-item">
                  <h3 class="item-sec-title" id="section-3">新品NRR榜单</h3>
                  <p class="item-text-first">
                    推荐热卖新品产品，包含图表分析以及列表数据区域两部分，图表分析涵盖8个部分，分别是核心指标、上级类目渗透率分析、评论与评分数占比、新品榜亚马逊fba分布、价格带区间分析、品牌数top10占比排行分析、产品描述-关键词词频分析、产品标题-关键词词频分析，数据区域可自定义搜索数据，展示区域又分为新品NRR榜单以及稳定新品列表，新品NRR榜单是新品榜的所有产品，稳定新品榜单可快速筛选周期稳定性的产品，持续7、15、30天出现在榜单中，所有列表可对产品进行收藏，点击查看详情，点击跳转amazon在售。
                  </p>
                  <div class="img-wrap">
                    <a :href="pageImages[15].big"><img alt="" :src="pageImages[15].mini"></a>
                  </div>
                </div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-1">1.选择站点、类目</h4>
		        			<p class="item-text-first">点击【下拉】，选择需要查看的【类目】，完成搜索</p>
		        			<div class="img-wrap">
							  	<a :href="pageImages[1].big"><img alt="" :src="pageImages[1].mini"></a>
						     	</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-2">2.核心指标看板区域</h4>
		        			<p class="item-text-first">包含搜索类目下新品榜数据的四大核心指标：平均价格，平均review数，平均评分数，平均bsr排名。</p>
		        			<p class="text">点击对应指标的【？】标示，可查看对应的【指标说明】</p>
		        			<h6 class="indicators-show">【指标说明】</h6>
		        			<div class="item-level-two margin-top-0">
		        				<ul class="item-list margin-top-0">
		    						<li>（1）新品平均价格：对应新品榜该类目下，所有新品的平均价格，根据最新爬取的new_release数据进行数值更新。</li>
		    						<li>（2）新品平均review数：对应新品榜该类目下，所有新品的平均review数，根据最新爬取的new_release数据进行数值更新。</li>
		    						<li>（3）新品平均评分数：对应新品榜该类目下，所有新品的平均评分数，根据最新爬取的new_release数据进行数值更新。</li>
		    						<li>（4）新品平均bsr排名：对应新品榜该类目下，所有新品平均bsr排名，根据最新爬取的new_release数据进行数值更新。</li>
		    					</ul>
		        			</div>
		        			<div class="img-wrap">
		        				<a :href="pageImages[2].big"><img alt="" :src="pageImages[2].mini"></a>
		        			</div>
		        			<p class="text-bottom">指标查看区域还包含对应指标的最高和最低数值，可对比该指标的区间概况。整体平均概况。</p>

		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-3">3.上级类目渗透率分析区域</h4>
		        			<p class="item-text-first">类目渗透率分析，次级类目在上级类目的占比以及产品数分布，关键指标：【渗透率】、【商品数】，查看类目的市场容量占比，以及了解同级类目的竞争指数。</p>
		        			<div class="img-wrap">
		        				<a :href="pageImages[3].big"><img alt="" :src="pageImages[3].mini"></a>
		        			</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-4">4.评分与评论数分布占比区域</h4>
		        			<p class="item-text-first"> 点击【评分分布】【评论分布】可进行页面切换，以柱状图的表现形式展现各个评分阶段产品数以及产品数的占比。</p>
		        			<div class="img-wrap">
			        			<a :href="pageImages[4].big"><img alt="" :src="pageImages[4].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-5">5.新品榜fba分布</h4>
		        			<p class="item-text-first"> fba配送方式占比分布，非fba占比的比较，数值大小</p>
		        			<div class="img-wrap">
			        			<a :href="pageImages[5].big"><img alt="" :src="pageImages[5].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-6">6.价格带区间分布</h4>
		        			<p class="item-text-first"> 价格分析，显示最高、最低，平均价作为分析参考，等额划分价格带区间，价格带区间产品数分布统计，整体占比数据。</p>
		        			<div class="img-wrap">
			        			<a :href="pageImages[6].big"><img alt="" :src="pageImages[6].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-7">7.品牌top10占比排行分析</h4>
		        			<p class="item-text-first">新品top10品牌分析，品牌对应的评论数，品牌下产品数。综合分析品牌的市场概况。受市场欢迎的品牌是哪些等。</p>
		        			<div class="img-wrap">
			        			<a :href="pageImages[7].big"><img alt="" :src="pageImages[7].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-8">8.关键词描述词频分析</h4>
		        			<p class="item-text-first">  显示产品描述中每个单词，名词单词的出现次数【词频】，点击【关键词】，显示【关键词】对应的【词频】，词频是该关键词在产品中出现的次数，考量关键词的热搜指数以及使用情况。</p>
		        			<div class="img-wrap">
			        				<a :href="pageImages[8].big"><img alt="" :src="pageImages[8].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-9">9、自定义筛选数据查询区域</h4>
		        			<p class="item-text-first"> （1）多种图表多种维度呈现数据，可视化多维分析。</p>
		        			<p class="item-text-first"> （2）自定义查询，输入对应字段需要查询的数值或者产品名称等，展现产品明细数据。</p>

		        			<div class="item-level-two">
		        				<h4 class="item-first-title" id="section-3-10">10、查询说明</h4>
		        				<ul class="item-list">
		    						<li>【产品名称】【品牌名称】输入准确的名称词以及品牌名，产品名称支持模糊匹配。</li>
		    						<li>【跟卖卖家数】【bsr排名】【产品评分】【产品价格】可选择全部、等于、不等于、大于等    于、小于等于、区间等进行数值筛选。</li>
		    						<li>【亚马逊自营】【fba】选择“是”或者“否”，可都选或者只选择单一条件。</li>
		    						<li>【bsr品类】点击下拉，选择搜索的品类。</li>
		    						<li>【上架时间】筛选上架时间范围，对应输出该时间范围内的产品明细数据。</li>
		    						<li>完成筛选条件设置，点击搜索，输出查询明细，多种筛选条件可自由组合。</li>
		    					</ul>
		    					<div class="img-wrap">
				        				<a :href="pageImages[9].big"><img alt="" :src="pageImages[9].mini"></a>
				        		</div>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="help-descText">输出数据</h4>
		    					<div class="img-wrap">
				        				<a :href="pageImages[10].big"><img alt="" :src="pageImages[10].mini"></a>
				        		</div>
		        				<ul class="item-list">
		    						<li>（1）数值指标可选择排序输出。</li>
		    						<li>（2）【上一页】【下一页】翻页查看数据，下拉选择【x条/页】,输入跳转【X页】。</li>
		    					</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-first-title" id="section-3-11">11、查询示例</h4>
		        				<h6 class="img-instructions">bsr品类</h6>
		    					<div class="img-wrap">
				        				<a :href="pageImages[11].big"><img alt="" :src="pageImages[11].mini"></a>
				        		</div>
				        		<h6 class="img-instructions">产品名称搜索</h6>
		    					<div class="img-wrap">
				        				<a :href="pageImages[12].big"><img alt="" :src="pageImages[12].mini"></a>
				        		</div>
		        				<p class="text-bottom">输入查询关键词，例如：phone等</p>
		        			</div>
		        		</div>
                <div class="instructions-item">
                  <h3 class="item-sec-title" style="margin-bottom: 30px" d="section-4">新品推荐</h3>
                  <h4 class="item-first-title" id="section-4-1">1、推荐说明</h4>
                  <p class="item-text-first">
                    基于公司亚马逊平台最近3个月售出的asin数据，通过asin的bsr数据，对应大类目排名，大类目，每日销量估算出该类目排名和销量的函数关系，以此估算新品榜产品30天的每日销量以及增长趋势。
                  </p>
                  <p class="item-text-first">【偏差度】：算法的准确度r方偏差值，表示线性拟合准确度，越接近1，预估值越准确</p>
                  <p class="item-text-first">【增长度】：单日销量增长率直线的斜率，数值越大，直线越倾斜，增长幅度越大</p>
                  <p class="item-text-first">【30天日均销量】： 30天日均销量=30天每日销量求和/30</p>
                  <p class="item-text-first">【当天销量】：产品对应数据源获取当日的销量</p>
                  <p class="item-text-first">【非0销量天数】：可排除部分销量值为0造成的对趋势预估的影响，提高销量预估的有效性，控制可容忍的有销量天数</p>
                  <p class="item-text-first">根据以上数据筛选合适的新品进行开发，函数定期进行更新。</p>
                  <div class="img-wrap">
                    <a :href="pageImages[19].big"><img alt="" :src="pageImages[19].mini"></a>
                  </div>
                  <h4 class="item-first-title" id="section-4-2">2、分析示例</h4>
                  <p class="item-text-first">
                    搜索Beauty & Personal Care类目
                  </p>
                  <div class="img-wrap">
                    <a :href="pageImages[20].big"><img alt="" :src="pageImages[20].mini"></a>
                  </div>
                  <div class="img-wrap">
                    <a :href="pageImages[21].big"><img alt="" :src="pageImages[21].mini"></a>
                  </div>
                  <div class="img-wrap">
                    <a :href="pageImages[22].big"><img alt="" :src="pageImages[22].mini"></a>
                  </div>
                  <p class="item-text-first">
                    分析：
                  </p>
                  <p class="item-text-first">
                    从推荐的前四款产品进行比较，第一款上架时间相对更早，bsr排名135，日均销量偏低，但是增长度是最大的，比较第二以及第四款产品，于近期上架，虽然bsr排名比较靠后，但是时间段内的增长度很大，接近于直线增长，属于市场当前阶段受欢迎的产品，日后的发展潜力可能比老产品更具有市场，有潜力冲击热销产品，分析平均日销量，200单左右，处于需求旺盛期，可以考虑作为新品开发。
                  </p>
                  <p class="item-text-first">
                    同时还可以结合在售页面的产品表现数据等综合分析选品。
                  </p>
                </div>
		        	</div>
		        </div>
        	</Col>
        	<Col span="4" offset="6" style="position: relative;">
			       	<div class="console" id="myScrollspy">
			       		<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
			       			<li class="active"><a href="#section-0">快速入门</a></li>
                  <li><a href="#section-2">新品总榜单</a>
                    <span class="click-ico down-ico" :class="{'up-ico':down2}" @click="toggleDown(2)"></span>
                    <ul class="nav">
                      <li><a href="#section-2-1">1.搜索</a></li>
                      <li><a href="#section-2-2">2.数据区域</a></li>
                    </ul>
                  </li>
                  <li><a href="#section-3">新品NRR榜单</a>
                    <span class="click-ico down-ico" :class="{'up-ico':down9}" @click="toggleDown(9)"></span>
                    <ul class="nav">
                      <li><a href="#section-3-1">1.选择站点、类目</a></li>
                      <li><a href="#section-3-2">2.核心指标看板区域</a></li>
                      <li><a href="#section-3-3">3.上级类目渗透率分析区域</a></li>
                      <li><a href="#section-3-4">4.评分与评论数分布占比区域</a></li>
                      <li><a href="#section-3-5">5.新品榜fba分布</a></li>
                      <li><a href="#section-3-6">6.价格带区间分布</a></li>
                      <li><a href="#section-3-7">7.品牌top10占比排行分析</a></li>
                      <li><a href="#section-3-8">8.关键词描述词频分析</a></li>
                      <li><a href="#section-3-9">9、自定义筛选数据查询区域</a>
                      <li><a href="#section-3-10">10、查询说明</a></li>
                      <li><a href="#section-3-11">11、查询示例</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#section-4">新品推荐</a>
                    <span class="click-ico down-ico" :class="{'up-ico':down4}" @click="toggleDown(4)"></span>
                    <ul class="nav">
                      <li><a href="#section-4-1">1.推荐说明</a></li>
                      <li><a href="#section-4-2">2.分析示例</a></li>
                    </ul>
                  </li>
                </ul>
			       </div>
        	</Col>
        </Row>
    </div>
</template>

<script>
import Swiper from "./../../../../../static/js/fs_forse";
export default {
  data () {
    return {
    	"down9":true,
    	"down2":true,
    	"down4":true,
    	pageImages:[{// 0
    		big:"./../../../../../bgbdp/images/help-center/newProduct/1-0-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/1-0-mini.png"
    	},{// 1
    		big:"./../../../../../bgbdp/images/help-center/newProduct/1-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/1-1-mini.png"
    	},{// 2
    		big:"./../../../../../bgbdp/images/help-center/newProduct/2-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/2-1-mini.png"
    	},{// 3
    		big:"./../../../../../bgbdp/images/help-center/newProduct/3-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/3-1-mini.png"
    	},{// 4
    		big:"./../../../../../bgbdp/images/help-center/newProduct/4-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/4-1-mini.png"
    	},{// 5
    		big:"./../../../../../bgbdp/images/help-center/newProduct/5-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/5-1-mini.png"
    	},{// 6
    		big:"./../../../../../bgbdp/images/help-center/newProduct/6-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/6-1-mini.png"
    	},{// 7
    		big:"./../../../../../bgbdp/images/help-center/newProduct/7-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/7-1-mini.png"
    	},{// 8
    		big:"./../../../../../bgbdp/images/help-center/newProduct/8-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/8-1-mini.png"
    	},{// 9
    		big:"./../../../../../bgbdp/images/help-center/newProduct/9-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/9-1-mini.png"
    	},{// 10
    		big:"./../../../../../bgbdp/images/help-center/newProduct/9-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/9-2-mini.png"
    	},{// 11
    		big:"./../../../../../bgbdp/images/help-center/newProduct/9-3-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/9-3-mini.png"
    	},{// 12
    		big:"./../../../../../bgbdp/images/help-center/newProduct/9-4-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/newProduct/9-4-mini.png"
    	},
        //13
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/10-8-big.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/10-8-mini.png"
        },
        //14
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/10-9-big.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/10-9-mini.png"
        },
        //15
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/help-2.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/help-2-mini.png"
        },
        //16
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/data-view-big.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/data-view-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/viewShow-big.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/viewShow-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/search-big.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/search-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/shuoming.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/shuoming-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/shuoming2.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/shuoming2-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/shuoming3.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/shuoming3-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/shuoming4.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/shuoming4-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/newProduct/query.png",
          mini:"./../../../../../bgbdp/images/help-center/newProduct/query-mini.png"
        }
    	],
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
.step-head{
  font-weight:600;
  margin-bottom: 15px;
  i{
    font-style: normal;
  }
}
   .affix{
  background: #fff;
   }
   .item-first-title{
  font-weight: 600;
   }
   .help-descText{
     line-height: 30px;
     font-size: 15px;
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
    .quick-start{margin-top:12px;padding-left:40px; padding-top: 60px; font-weight: bold; border-top:1px solid #efefef;}
    .img-instructions{
    	line-height: 24px;
	    font-size: 16px;
	    margin-top: 24px;
    }
    .text-bottom{margin-top:12px;}

    .margin-top-0{margin-top:0;}
</style>
