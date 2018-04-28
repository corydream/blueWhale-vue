<template>
    <div class="data-app-lication">
    	<el-row style="display: flex;">
		  <el-col :xs="3" :sm="3" :md="3" :lg="3" style="width: 200px;">
		  	<div class="grid-content bg-purple">
			  	<left @leftToggle="leftToggle"></left>
			  </div>
		  </el-col>
		  <el-col :xs="21" :sm="21" :md="21" :lg="21" style="background-color: #f2f7fa; width: 91%;">
		  	<div class="grid-content bg-purple-light">
			  	<contain @togglePanel="togglePanel" ref="tabPanel"></contain>
			  </div>
		  </el-col>
		</el-row>
    </div>
</template>

<script>
import left from './left/left';
import contain from './contain/contain';

export default {
  data () {
    return {
    	
    }
  },
  mounted() {
  	
  },
  components: {
      left,
      contain
  },
  methods: {
      leftToggle(arg){
      	this.togglePanel(arg);
      },
      togglePanel(arg){
      	this.$refs.tabPanel.togglePanel(arg);
      }
  },
}
</script>
<style lang="less" scoped>
.data-app-lication{background-color:#363e4f; text-align:left;}
.lct-left-wrap{position: relative; height: 100%;}
</style>