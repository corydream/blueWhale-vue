<template>
  <div class="wrapper">
    <leftNav class="navBox" @showModel=showModel ref="childMethod"></leftNav>
    <div class="content">
        <banner></banner>
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import leftNav from "./navs/insightleftNav.vue";
  import banner from './banner/banner'
  export default {
    data() {
      return {
        routeType: 'sec1',
      }
    },
    components: {
      leftNav,
      banner
    },
    created(){

    },
    mounted(){
      let locationPath=this.$route.params.id;
      if(/one/g.test(locationPath)){
        this.showModel(0);
        this.$refs.childMethod.leftListActiveIndex(0);
      }else if(/two/g.test(locationPath)){
        this.showModel(0);
        this.$refs.childMethod.leftListActiveIndex(1);
      }else if(/three/g.test(locationPath)){
        this.showModel(0);
        this.$refs.childMethod.leftListActiveIndex(2);
      };
    },
    methods: {
      leftToggle(arg){
        this.$refs.childMethod.leftListActiveIndex(arg[1]);
      },
      showModel(type) {
        if(type!=""){
          this.routeType = type;
        }
      }
    }

  }
</script>
<style lang="less">
  @import "../../style/insight/datainsight";
  @import "//at.alicdn.com/t/font_565696_1bm9cv7cvn6irudi.css";
  ul{
    list-style:none;
  }
  .wrapper {
    display: flex;
    flex-flow:row;
    width: 100%;
    height: 100%;
    background: #30363d;
    position: relative;
    .navBox {
      width: 200px;
      height: inherit;
      background: #30363d;
      flex-shrink: 0;
      flex-grow: 0;
      @media screen and (max-width: 1435px){
        &{
          width: 180px;
        }
      }
    }
    .content {
      background: #fff;
      flex: 1;
      min-width: 1300px;
    }
  }
   html{
    background: #30363d;
  }
  .content{
    background: #fff !important;
  }
</style>
