<template>
    <div class="application-left" style="width: 200px;">
        <div class="application-left-contain text-left">
        	<ul class="list-group">
        		<li class="active"><span><img src="../../../assets/images/applicationLeft/crawler.png"/></span> <a href="javascript:;">自助爬虫采集器</a></li>
        	</ul>
        </div>
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
      
  },

}
</script>
<style lang="less" scoped>
.application-left{
	background-color:#30363d;
    min-height: 1200px;
    ul{}
    li{
    	padding-left: 20px;
    	line-height:40px;
    	a{color: #333;}
    	&.active{background-color:#4aa5e9;
    		a{color: #fff;}
    	}
    }
}
</style>
