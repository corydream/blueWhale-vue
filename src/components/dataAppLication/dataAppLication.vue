<template>
    <div class="data-app-lication">
    	<el-row type="flex">
		  <el-col :span="3" class="navBox">
		  	<div class="grid-content bg-purple">
			  	<left></left>
			  </div>
		  </el-col>
		  <el-col :span="24">
        <div class="grid-content bg-purple-light contentBox">
          <contain ref="passRoute"></contain>
        </div>
      </el-col>
		</el-row>
    </div>
</template>

<script>

import left from './left/left';
import contain from './contain/contain';
//import charts from './info/charts';
export default {
  data () {
    return {
    	"elese":["保证","全部","工具"]
    }
  },
  mounted() {
  	this.$refs.passRoute.passRouteCon(this.$route.params);
  },
  components: {
      left,
      contain
  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
.data-app-lication{background-color: #f2f7fa; min-height: 1200px;}
.lct-left-wrap{position: relative; height: 100%;}
  .contentBox{
    padding: 20px 40px;
  }
  .navBox{
    width: 200px;
    flex-shrink: 0;
    background: #30363d;
  }
</style>
