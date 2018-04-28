<template>
    <div class="banner" v-if="showBanner===true">
      <a href="http://data.banggood.cn/private-data/index#/amz/productContainer/soaringRank" target="_blank">
        <p class="enter">
        </p>
      </a>
      <p class="icon" @click="close()">
        <i class="iconfont icon-guanbi"></i>
      </p>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data(){
          return{
            showBanner:true
          }
        },
      mounted(){
          console.log(sessionStorage.getItem('showBanner'));
          if(sessionStorage.getItem('showBanner')==='notshow'){
            this.showBanner=false;
          }else{
            this.showBanner=true;
          }
      },
      methods:{
        close(){
          this.showBanner=false;
          sessionStorage.setItem('showBanner','notshow');
        }
      }
    }
</script>

<style scoped lang="stylus">
  .banner
    position relative
    height: 98px;
    background #ddd;
    overflow: hidden;
    cursor: pointer;
    background: url(img/banner.png) center center no-repeat;
    transition all .6s ease
    a
      display block
      height 100%
      .enter
        width 128px
        height 36px
        position absolute
        right 130px
        top 30px
        z-index 1
        background url(img/anniu.png) no-repeat
      .enter:hover
        background url(img/anniu_active.png) no-repeat
    .icon
      position absolute
      z-index 1
      width 24px
      height 24px
      line-height 20px
      text-align center
      top 35px
      right 20px
      border 1px solid #fff
      i
        font-size 10px
        color #fff
</style>
