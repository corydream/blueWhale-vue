<template>
  <div class="container-fluid">
    <left-nav class="navs" @showModuels="showModuels" ref="childMethod"></left-nav>
    <div class="row">
      <div class="col-xs-12 content">
        <dataModel v-if="type===0"></dataModel>
        <dataAgents v-if="type===1"></dataAgents>
        <dataDefining v-if="type===2"></dataDefining>
      </div>
    </div>
  </div>
</template>

<script>
import leftNav from "./dataleftNav.vue"
import dataModel from "./dataModel.vue";
import dataDefining from "./dataDefining.vue";
import dataAgents from "./dataAgents.vue";
export default {
  data () {
    return {
       type:0
    }
  },
  mounted() {
    	let locationPath=this.$route.params.id;
	  	if(/one/g.test(locationPath)){
	  		this.showModuels(0);
	  		this.$refs.childMethod.leftListActiveIndex(0);
	  	}else if(/two/g.test(locationPath)){
	  		this.showModuels(1);
	  		this.$refs.childMethod.leftListActiveIndex(1);
	  		
	  	}else if(/three/g.test(locationPath)){
	  		this.showModuels(2);
	  		this.$refs.childMethod.leftListActiveIndex(2);
	  	};
  },
  components: {
    leftNav,dataModel,dataDefining,dataAgents
  },
  methods: {
    showModuels(type){
      this.type=type;
    }
  }
}
</script>
<style lang="less" scoped>
  .navs{
    position: absolute;
    left: 0px;
    width: 200px;
    z-index: 100;
  }
.content{
  min-height: 1356px;
  background: #f0f5f8;
  padding: 30px 47px 60px 249px;
}
</style>
