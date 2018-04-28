<template>
    <div class="crawler-help">
        <h1 class="help-doc-head">爆品挖掘引擎帮助文档</h1>
        <h4 class="quick-start" id="section-0">快速入门</h4>
        <Row>
        	<Col span="14">
        		<div class="crawler-contain" id="gallery">
		        	<div class="instructions-wrap">
		        		<div class="operation-step operation step-one">
		        			<h4 class="step-head"><i>1、</i>产品架构说明</h4>
                  <p class="help-descText">当前位置：爆品挖掘引擎</p>
                  <p class="help-descText">爆品推荐引擎包含三个子模块，分别是：爆品总榜单、爆品BSR榜单、爆品推荐</p>
		        			<div class="img-wrap">
								    <a :href="pageImages[0].big"><img alt="" :src="pageImages[0].mini"></a>
							     </div>
		        		</div>
                <div class="instructions-item">
                  <h3 class="item-sec-title" id="section-2">爆品总榜单</h3>
                  <p class="item-text-first">爆品总榜单的数据汇总类目上下级的所有产品，可对当前类目的上下级产品一并查询进行分析。</p>
                </div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-2-2">1、搜索</h4>
                  <div class="img-wrap">
                    <a :href="pageImages[26].big"><img alt="" :src="pageImages[26].mini"></a>
                  </div>
		        			<p class="item-text-first">界面示图：</p>
		        			<div class="img-wrap">
						   		<a :href="pageImages[23].big"><img alt="" :src="pageImages[23].mini"></a>
							    </div>
		        		</div>
                <div class="instructions-item">
                  <h4 class="item-first-title" id="section-2-3">2、数据区域</h4>
                  <p class="item-text-first">数据区域展示了查询的所有产品基础信息，产品图片、产品名称、品牌名、大类目、bsr排名店铺名等，可以选择显示的字段、感兴趣的产品可加入收藏列表，点击【查看详情】可查看产品近期变化趋势以及产品明细的基础数据。点击单个asin可跳转产品在售页面。</p>
                  <div class="img-wrap">
                    <a :href="pageImages[24].big"><img alt="" :src="pageImages[24].mini"></a>
                  </div>
                </div>
                <div class="instructions-item">
                  <h3 class="item-sec-title" id="section-3">爆品bsr榜单</h3>
                  <p class="item-text-first">爆品bsr榜单：亚马逊在售页面每日bsr数据榜单，涵盖榜单数据以及多个子模块的分析数据，可快速了解产品市场分布，自定义查找竞品，分析竞品数据。
                    分析模块主要分为8个小模块，如下结构说明：</p>
                  <div class="img-wrap">
                    <a :href="pageImages[1].big"><img alt="" :src="pageImages[1].mini"></a>
                  </div>
                </div>
                <div class="instructions-item">
                  <h4 class="item-first-title" id="section-3-3">1、搜索操作</h4>
                  <div class="img-wrap">
                    <a :href="pageImages[26].big"><img alt="" :src="pageImages[26].mini"></a>
                  </div>
                  <p class="item-text-first">界面示图：</p>
                  <p class="item-text-first">点击【下拉】，选择需要查看的【类目】，完成搜索</p>
                  <div class="img-wrap">
                    <a :href="pageImages[25].big"><img alt="" :src="pageImages[25].mini"></a>
                  </div>
                </div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-4">2.best sellers指标分析</h4>
		        			<p class="item-text-first">包含搜索类目下热卖榜数据的四大核心指标：平均价格，平均review数，平均评分数，平均上架天数。</p>
		        			<p class="text">指标查看区域还包含对应指标的最高和最低数值，可对比该指标的区间概况。整体平均概况。</p>
                  <p>点击对应指标的【？】标示，可查看对应的【指标说明】</p>
		        			<h5 class="indicators-show">【指标说明】</h5>
		        			<div class="item-level-two margin-top-0">
		        				<ul class="item-list margin-top-0">
		    						<li>（1）爆品平均价格：对应best sellers（热卖榜）细分类目下，所有爆品的平均价格，根据最新爬取的数据进行数值更新。</li>
		    						<li>（2）爆品平均review数：对应best sellers（热卖榜）细分类目下，所有爆品的平均review数，根据最新爬取的数据进行数值更新。</li>
		    						<li>（3）爆品平均评分数：对应best sellers（热卖榜）细分类目下，所有爆品的平均评分数，根据最新爬取的数据进行数值更新。</li>
		    						<li>（4）爆品平均上架天数：对应best sellers（热卖榜）细分类目下，所有爆品平均上架天数，根据最新爬取的数据进行数值更新。</li>
		    					</ul>
		        			</div>
		        			<div class="img-wrap">
		        				<a :href="pageImages[3].big"><img alt="" :src="pageImages[3].mini"></a>
		        			</div>
		        		</div>
				     		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-5">3.类目热度分析</h4>
		        			<p class="item-text-first">类目热度分析是基于当前小类目的销售排名第#1、#25、#50、#75、#100位产品在最高级类目的BSR排名，来分析该小类目的产品热度；可以评估当前次级类目在整个亚马逊的销量表现，挖掘同一小类目下的产品热度分布和热度变化，以及通过类比不同类目下的5个BSR排名数据来进行跨类目热度分析。</p>
							<ul class="item-list margin-top-0">
								<li>（1）第一步：任意选择一个类目（推荐2-3级，需要有下级，选最小级别没有数据）。</li>
								<li>（2）查看下级小类目BSR#1  #25、#50、#75、#100 （末位）产品在最高级（一级）类目BSR排名（根据产品特殊性，对比大类目根据亚马逊官方该产品链接）。
									<a :href="pageImages[14].big"><img alt="" :src="pageImages[14].mini"></a>
									如这款产品的最高级类目为beauty&Personal Care。
								</li>
							</ul>
							<ul class="item-list margin-top-0">
								<li>
									<p  class="item-text-first">【例1】：选择二级类目Makeup，查看所属三级类目热度分布:</p>
									<a :href="pageImages[15].big"><img alt="" :src="pageImages[15].mini"></a>
									<a :href="pageImages[16].big"><img alt="" :src="pageImages[16].mini"></a>
								</li>
								<li>
									<p class="item-text-first">【例2】：选择二级类目Hair Care，查看所属三级类目热度分布:</p>
									<a :href="pageImages[17].big"><img alt="" :src="pageImages[17].mini"></a>
									<div class="img-wrap">
										<a :href="pageImages[18].big"><img alt="" :src="pageImages[18].mini"></a>
									</div>
								</li>
							</ul>
							<p class="item-text-first">【举例分析】：</p>
							<ul class="item-list margin-top-0">
								<li> 1.对比【例2】 Hair Care，整个【例1】Makeup的销量情况在一级类目Beauty&Personal Care 的表现一般，各小类目排名均比【例2】低。</li>
								<li> 2.眼部彩妆 eyes 比其他三级类目排名靠前，占整个彩妆市场BSR的绝大多数，热度最高。</li>
								<li> 3.脸部彩妆 face 和卸妆产品makeup remover 热度其次。</li>
								<li> 4.由于卸妆产品makeup remover品牌化太强，三方卖家占比小，销量好的都为品牌产品，排名落后的产品在整个美妆市场表现差，排名低，该类目可开发空间小。</li>
								<li> 5.身体彩妆body的季节性（夏季）和节日性（万圣节）导向高，是目前其他部位彩妆类目中表现最差的一类，等等。</li>
							</ul>
              <p class="item-text-first">类目热度分析可以提供的角度有多种，每位开发经理需加入自己的理解对其进行合理利用；分析维度主要围绕在：1. 类目的整体热度表现（对比不同类目） 2. 下级类目的热度分布、市场趋势、以及排名走向等（对比相同类目）。</p>
                </div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-6">4.下级类目分布情况</h4>
		        			<p class="item-text-first">类目渗透率分析，次级（下级）所属类目渗透率分析以及产品数分布，关键指标：【渗透率】、【商品数】，查看类目的市场容量占比，以及了解同级类目的竞争指数。</p>
		        			<div class="img-wrap">
		        				<a :href="pageImages[4].big"><img alt="" :src="pageImages[4].mini"></a>
		        			</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-7">5.BSR榜FBA分布</h4>
		        			<p class="item-text-first">分析配送方式的【fba数】以及【渗透率】指标。【fba数】：以fba为配送方式的产品数，【渗透率】：该种配送方式的占比。</p>
		        			<div class="img-wrap">
			        				<a :href="pageImages[5].big"><img alt="" :src="pageImages[5].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-8">6.价格带区间分析</h4>
		        			<p class="item-text-first">价格分析，显示最高、最低，平均价作为分析参考，等额划分价格带区间，价格带区间产品数分布统计，整体占比数据。了解市场价格分布情况。</p>
		        			<div class="img-wrap">
			        				<a :href="pageImages[6].big"><img alt="" :src="pageImages[6].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-9">7.品牌top10占比排行分析</h4>
		        			<p class="item-text-first">爆品top10品牌分析，分析品牌对应的【评论数】，对应品牌的市场产品数【bsr品牌出现数】。综合分析品牌的市场概况。受市场欢迎的品牌是哪些等。</p>
		        			<div class="img-wrap">
			        				<a :href="pageImages[7].big"><img alt="" :src="pageImages[7].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-10">8.关键词词频分析</h4>
		        			<p class="item-text-first">显示产品描述中每个单词，名词单词的出现次数【词频】，点击【关键词】，显示【关键词】对应的【词频】，词频是该关键词在产品中出现的次数，考量关键词的热搜指数以及使用情况。可进行【产品描述】、【产品标题】模块的切换。</p>
		        			<div class="img-wrap">
			        				<a :href="pageImages[8].big"><img alt="" :src="pageImages[8].mini"></a>
			        		</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h4 class="item-first-title" id="section-3-11">9.评分与评论数分布占比</h4>
		        			<p class="item-text-first">点击【评分分布】【评论分布】可进行页面切换，以柱状图的表现形式展现各个评分阶段产品数以及产品数的占比。</p>
		        			<div class="img-wrap">
			        				<a :href="pageImages[9].big"><img alt="" :src="pageImages[9].mini"></a>
			        		</div>
		        		</div>
                <div class="instructions-item">
                  <h4 class="item-first-title" id="section-3-12">10、爆品推荐列表</h4>
                  <p class="item-text-first"> （1）多种图表多种维度呈现数据，可视化多维分析。</p>
                  <p class="item-text-first">（2）自定义查询，输入对应字段需要查询的数值或者产品名称等，展现产品明细数据。</p>
                  <div class="instructions-item">
                    <h4 class="item-first-title">11、稳定推荐列表</h4>　
                    <p class="item-text-first">稳定推荐列表可快速选择7天、14天、30天连续出现在榜单的产品，持续出现的产品综合实力较强，作为新品开发表现出良好的市场稳定性。</p>
                    <div class="img-wrap">
                      <a :href="pageImages[10].big"><img alt="" :src="pageImages[10].mini"></a>
                    </div>
                  </div>
                </div>
		        	  <div class="instructions-item">
		        	  	<h4 class="item-first-title" id="section-3-13">12、查询说明</h4>
		        	  	<ul class="item-list">
		    						<li>【产品名称】【品牌名称】输入准确的名称词以及品牌名，产品名称支持模糊匹配。</li>
		    						<li>【跟卖卖家数】【bsr排名】【产品评分】【产品价格】可选择全部、等于、不等于、大于等 于、小于等于、区间等进行数值筛选。</li>
		    						<li>【亚马逊自营】【fba】选择“是”或者“不选中”。</li>
		    						<li>【bsr品类】点击下拉，选择搜索的品类。</li>
		    						<li>【上架时间】筛选上架时间范围，对应输出该时间范围内的产品明细数据。</li>
		    						<li>完成筛选条件设置，点击搜索，输出查询明细，多种筛选条件可自由组合。</li>
		    					</ul>
		    					<div class="img-wrap">
				        				<a :href="pageImages[10].big"><img alt="" :src="pageImages[10].mini"></a>
				        		</div>
                  <p class="item-text-first">输出数据如下：</p>
                  <div class="img-wrap">
                    <a :href="pageImages[30].big"><img alt="" :src="pageImages[30].mini"></a>
                  </div>
                  <p class="item-text-first">（1）数值指标可选择排序输出。</p>
                  <p class="item-text-first">（2）【上一页】【下一页】翻页查看数据，下拉选择【x条/页】,输入跳转【X页】。</p>
		        			</div>
		        	  <div class="instructions-item">
		        				<h4 class="item-first-title" id="section-3-14">13、查询明细</h4>
		    					<div class="img-wrap">
				        				<a :href="pageImages[11].big"><img alt="" :src="pageImages[11].mini"></a>
				        		</div>
		        				<ul class="item-list">
		    						<li>（1）数值指标可选择排序输出。</li>
		    						<li>（2）【上一页】【下一页】翻页查看数据，下拉选择【x条/页】,输入跳转【X页】。</li>
		    					</ul>
                  <div class="instructions-item">
                    <h4 class="item-first-title">14、查询示例</h4>
                    <h6 class="img-instructions">bsr品类</h6>
                    <div class="img-wrap">
                      <a :href="pageImages[12].big"><img alt="" :src="pageImages[12].mini"></a>
                    </div>
                    <h6 class="img-instructions">产品名称搜索</h6>
                    <div class="img-wrap">
                      <a :href="pageImages[13].big"><img alt="" :src="pageImages[13].mini"></a>
                    </div>
                    <p class="text-bottom">输入查询关键词，例如：phone等</p>
                  </div>
		        			</div>
						    <div class="instructions-item">
                    <h3 class="item-sec-title" style="margin-bottom: 30px" d="section-4">爆品推荐</h3>
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
				        				<a :href="pageImages[27].big"><img alt="" :src="pageImages[27].mini"></a>
				        		</div>
								<div class="img-wrap">
				        				<a :href="pageImages[28].big"><img alt="" :src="pageImages[28].mini"></a>
				        		</div>
								<div class="img-wrap">
				        				<a :href="pageImages[29].big"><img alt="" :src="pageImages[29].mini"></a>
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
        	<Col span="4" offset="6" style="position:absolute;top: -100px;right: 20px">
			       	<div class="console" id="myScrollspy">
			       		<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
			       			<li class="active"><a href="#section-0">快速入门</a></li>
                       <li>
                         <a href="#section-2">爆品总榜单</a>
                         <span class="click-ico down-ico" :class="{'up-ico':down2}" @click="toggleDown(2)"></span>
                       <ul class="nav">
                      <li><a href="#section-2-2">1.搜索</a></li>
                      <li><a href="#section-2-3">2.数据区域</a></li>
                    </ul>
                    </li>
                  <li>
                    <a href="#section-3">爆品bsr榜</a>
                    <span class="click-ico down-ico" :class="{'up-ico':down3}" @click="toggleDown(3)"></span>
                    <ul class="nav">
                      <li><a href="#section-3-3">1.搜索操作</a></li>
                      <li><a href="#section-3-4">2.best sellers指标分析</a></li>
                      <li><a href="#section-3-5">3.类目热度分析</a></li>
                      <li><a href="#section-3-6">4.下级类目分布情况</a></li>
                      <li><a href="#section-3-7">5.BSR榜FBA分布</a></li>
                      <li><a href="#section-3-8">6.价格带区间分析</a></li>
                      <li><a href="#section-3-9">7.品牌top10占比排行分析</a></li>
                      <li><a href="#section-3-10">8.关键词词频分析</a></li>
                      <li><a href="#section-3-11">9.评分与评论数分布占比</a></li>
                      <li><a href="#section-3-12">10.爆品推荐、稳定列表</a></li>
                      <li><a href="#section-3-13">11.查询说明</a></li>
                      <li><a href="#section-3-14">12.查询明细、示例</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#section-4">爆品推荐</a>
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
    	"down3":true,
    	"down4":true,
    	pageImages:[
    	  {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/1-0-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/1-0-mini.png"
      	},
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/0-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/0-2-mini.png"
      	},
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/1-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/1-1-mini.png"
    	  },
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/2-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/2-1-mini.png"
    	  },
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/3-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/3-1-mini.png"
    	  },
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/4-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/4-1-mini.png"
    	  },
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/5-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/5-1-mini.png"
      	},
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/6-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/6-1-mini.png"
    	 },
        {
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/7-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/7-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/8-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/8-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/9-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/9-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/9-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/9-2-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/9-3-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/9-3-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/9-4-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/9-4-mini.png"
		},
		// new
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-1-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-2-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-3-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-3-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-4-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-4-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-5-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-5-mini.png"
		},
		//new 2
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-6-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-6-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-7-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-7-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-8-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-8-mini.png"
		},
		{
    		big:"./../../../../../bgbdp/images/help-center/detonationProduct/10-9-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/detonationProduct/10-9-mini.png"
		},
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/help-2.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/help-2-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/data-view.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/data-view-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/0-26-big.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/0-26-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/search-big.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/search-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/shuoming1.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/shuoming1-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/shuoming2.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/shuoming2-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/shuoming3.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/shuoming3-mini.png"
        },
        {
          big:"./../../../../../bgbdp/images/help-center/detonationProduct/query.png",
          mini:"./../../../../../bgbdp/images/help-center/detonationProduct/query-mini.png"
        },
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
  .step-head{
    font-weight:600;
    margin-bottom: 15px;
    i{
      font-style: normal;
    }
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
    .click-ico{display: inline-block; width:24px; height: 24px; position:absolute; right:24px; top:12px; cursor: pointer;}
    .down-ico{background: url("./../../../../assets/help-center/down-ico.png") no-repeat;}
    .up-ico{background: url("./../../../../assets/help-center/up-ico.png") no-repeat;}
    .down-ico~ul{display: none;}
    .up-ico~ul{display: block;}
    .quick-start{font-size:24px;margin-top:12px;padding-left:40px; padding-top: 60px; font-weight: bold; border-top:1px solid #efefef;}
    .img-instructions{
    	line-height: 24px;
	    font-size: 16px;
	    margin-top: 24px;
    }
    .item-sec-title{
      font-size: 20px;
      font-weight: 700;
    }
    .text-bottom{margin-top:12px;}

    .margin-top-0{margin-top:0;}
</style>
