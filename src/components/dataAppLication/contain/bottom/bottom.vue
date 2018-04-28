<template>
    <div class="app-lication-bottom">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1">
		  	<router-link to="ponelOne">单次采集</router-link>
		  </el-menu-item>
		  <el-menu-item index="2" :xs="4" :sm="4" :md="4" :lg="4">
		  	<router-link to="ponelTwo">循环采集</router-link>
		  </el-menu-item>
		  <el-menu-item index="3" :xs="4" :sm="4" :md="4" :lg="4">
		  	<router-link to="ponelThree">任务状态</router-link>
		  </el-menu-item>
		</el-menu>
		<div class="line"></div>
		<div class="lication-bottom-contain">
			<router-view></router-view>
		</div>
    </div>
</template>
<script>
/*import folderMenu from './folder/folderMenu';
import container from './info/container';*/
// import charts from './info/charts';
export default {
  data () {
    return {
    	activeIndex:'1'
    }
  },
  mounted() {

  },
  components: {
      /*folderMenu,
      container*/
  },
  methods: {
  	initActiveIndex(arg){//初始化默认状态
  		let _this=this;
  		switch (arg.name){
			case "ponelTwo":
			_this.activeIndex="2";
			break;
			case "ponelThree":
			_this.activeIndex="3";
			break;
  			default:
  				break;
  		}
  	},
	handleSelect(key, keyPath) {
	}
  }
}
</script>
<style lang="less" scoped>
.el-menu{padding:0 24px; background-color: #fff; border-bottom:1px solid #e8e8e8;}
.app-lication-bottom{background-color:#fff; margin-top:20px;}
.el-menu-item{
	padding:0;
	a{display:block;text-decoration: none;padding: 0 20px;}
	a:hover{
		border-bottom: none;
	}
}
.router-link-active{height:60px;border-bottom: 5px solid #20a0ff;color:#20a0ff!important}
.is-active{
	color: #48576a;
}
</style>
