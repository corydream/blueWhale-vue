<template>
    <div class="help-contain">
        <!--<router-view></router-view>-->
        <data-kanban v-if="pages.dataKanban"></data-kanban>
        <data-model v-if="pages.dataModel"></data-model>
        <data-agents v-if="pages.dataAgents"></data-agents>
        <custom-data v-if="pages.customData"></custom-data>
        <detonation-product v-if="pages.detonationProduct"></detonation-product>
        <new-product v-if="pages.newProduct"></new-product>
		    <keywordAnalysis v-if="pages.keywordAnalysis"></keywordAnalysis>
		    <ebayAnalysis v-if="pages.ebayAnalysis"></ebayAnalysis>
        <crawler v-if="pages.crawler"></crawler>
    </div>
</template>

<script>
import dataKanban from './pages/dataKanban.vue';//数据看板
import dataModel from './pages/dataModel.vue';//数据模型
import dataAgents from './pages/dataAgents.vue';//数据特工
import customData from './pages/customData.vue';//自定义数据
import newProduct from './pages/newProduct.vue';//新品推荐列表
import detonationProduct from './pages/detonationProduct.vue';//爆品挖掘引擎
import keywordAnalysis from './pages/keywordAnalysis.vue';
import ebayAnalysis from './pages/ebayAnalysis.vue';
import crawler from './pages/crawler.vue';//自助爬虫采集器
export default {
  data () {
    return {
    	pages:{
    		dataKanban:false,
    		dataModel:false,
    		dataAgents:false,
    		customData:false,
    		detonationProduct:false,
		   	newProduct:false,
		   	keywordAnalysis:false,
        ebayAnalysis:false,
    		crawler:true
    	}
    }
  },
  mounted() {

  },
  components: {
  	dataKanban,
  	dataModel,
  	dataAgents,
  	customData,
  	detonationProduct,
  	newProduct,
	  crawler,
	  keywordAnalysis,
    ebayAnalysis
  },
  methods: {
      togglePanel(arg){
      	let _this=this;
      	switch (arg){
      		case "1-1"://数据看板 dataKanban
      		_this.tabComponent("dataKanban");
  			break;
  			case "2-1"://数据模型 dataModel
  			_this.tabComponent("dataModel");
  			break;
  			case "2-2"://数据特工 dataAgents
  			_this.tabComponent("dataAgents");
  			break;
  			case "2-3"://自定义数据 customData
  			_this.tabComponent("customData");
  			break;
  			case "3-1"://新品推荐列表  newProduct
  			_this.tabComponent("newProduct");
  			break;
  			case "3-2"://爆品挖掘引擎 detonationProduct
  			_this.tabComponent("detonationProduct");
			  break;
			case "3-3"://关键词分析
  			_this.tabComponent("keywordAnalysis");
  			break;
       case "3-4"://ebay市场分析
            _this.tabComponent("ebayAnalysis");
  			break;
  			case "4-1"://自助爬虫采集器 crawler
  			_this.tabComponent("crawler");
  			break;
      	}
      },
      tabComponent(component){
      	for (var i in this.pages){
      		this.pages[i]=false;
      	};
      	i=null;
      	this.pages[component]=true;
      },
  },
}
</script>
<style lang="less" scoped>
	.add-charts{

	}
	.help-contain{padding:20px;}
</style>
