<template>
    <div class="data-app-lication">
        <application-banner></application-banner>
        <application-bottom ref="passRoute"></application-bottom>
    </div>
</template>

<script>
import applicationBanner from './banner/banner';
import applicationBottom from './bottom/bottom.vue';
// import charts from './info/charts';
export default {
  data () {
    return {
    	
    }
  },
  mounted() {
  	
  },
  components: {
      applicationBanner,
      applicationBottom
  },
  methods: {
      passRouteCon(arg){
	  		this.$refs.passRoute.initActiveIndex(arg);
	  	}
  },

}
</script>
<style lang="less" scoped>
	.add-charts{
		
	}
</style>
