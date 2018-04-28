<template>
    <div id="navWrap">
      <h2 class="titleName">市场探索</h2>
      <ul>
        <li class="nav-item" v-for="(item,index) in menuList">
            <router-link :to="{'path':item.path,}" active-class="active"> <i class="icon-nav" :class="item.icon"></i>{{item.name}}</router-link>
        </li>
      </ul>
    </div>
</template>
<script>
    export default {
        data() {
          return{
            menuList: [
              {
              name:'新品推荐引擎',
              path:'/dataObserve/0/news',
              'active':true,
              icon:"model",
              type:"sec1"
            },{
              name:'爆品挖掘引擎',
              path:'/dataObserve/0/explode',
              'active':false,
              icon:"agents",
              type:"sec2"
            }
            ,
              {
              name:'关键词产品分析',
              path:'/dataObserve/0/keyword',
              icon:"chanpinfenxi",
              type:"sec3"
            }
            ]
          }
        },
      props:[],
      created(){

      },
      methods:{
      	leftListActiveIndex(index){
	  		this.setRoute('sec'+(index+1));
	  	},
        setRoute(type){
             this.menuList.forEach(function (item,index) {
                  if(item.type===type){
                     item.active=true;
                  }else{
                    item.active=false;
                  }
             })
              this.$emit('showModel',type);
          }

      }

    }
</script>
<style scoped lang="less">
  #navWrap{
    background: #30363d;
    padding: 0;
    height: 100%;
    min-height: 1000px;
    width: 200px;
    @media screen and (max-width: 1435px){
      &{
        width: 180px;
      }
    }
    .titleName{
      color: #fff !important;
      font-size: 15px;
      text-align: left;
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      font-weight: 500;
      background: #485464;
    }
    >ul{
      margin: 0;
      padding: 0;
      list-style: none;
      width: 200px;
      @media screen and (max-width: 1435px){
        &{
          width: 180px;
        }
      }
      >.nav-item{
        width: 100%;
        >a{
          color:#fff;
          text-decoration: none;
          font-size: 14px;
          display: block;
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          text-align: left;
          &.active{
            background:#4aa5e9;
          }
          >i{
            display: inline-block;
            width:28px;
            height: 14px;
            margin-right: 0px;
            &.model{
              background: url("../../../assets/images/tuijian.png") no-repeat;
            }
            &.agents{
              background: url("../../../assets/images/jingpin.png") no-repeat;
            }
            &.chanpinfenxi{
	    		background: url("../../../assets/images/chanpinfenxi.png") no-repeat;
			}
          }
        }
      }
    }
  }


</style>
