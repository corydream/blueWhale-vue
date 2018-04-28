<template>
    <div id="navWrap">
      <ul>
        <li class="nav-item" v-for="(item,index) in menuList">
          <a href="javascript:;" :class="{active: item.active}" @click=goModules(item.type)>
            <i class="icon-nav" :class="item.icon"></i>
            <span>{{item.name}}</span>
          </a>
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
              name:'数据模型',
              path:'/datamarket/model',
              active:true,
              icon:"model",
              type:0
            },{
              name:'数据特工',
              path:'/datamarket/agents',
              active:false,
              icon:"agents",
              type:1
            },{
                name:'自定义数据',
                path:'/datamarket/defining',
                active:false,
                icon:"define",
                type:2
              },
            ]
          }
        },
      methods:{
      	leftListActiveIndex(index){
      		this.menuList.forEach(function(item,i){
      			if(index==i){
      				item.active=true;
      			}else{
      				item.active=false;
      			};
      		});
      	},
          goModules(type){
             this.menuList.forEach(function (item,index) {
                  if(item.type===type){
                     item.active=true;
                  }else{
                    item.active=false;
                  }
             })
              this.$emit('showModuels',type);
          }

      }

    }
</script>
<style scoped lang="less">
  #navWrap{
    background: #30363d;
    padding: 0;
    height: 100%;
    min-height: 1356px;
    width: 200px;
    >ul{
      margin: 0;
      padding: 0;
      list-style: none;

      >.nav-item{
        width: 100%;
        >a{
          color:#fff;
          text-decoration: none;
          font-size: 14px;
          display: block;
          height: 39px;
          line-height: 39px;
          padding-left: 33px;
          text-align: left;
          &.active{
            background:#4aa5e9;
          }
          >i{
            display: inline-block;
            width:28px;
            height: 14px;
            margin-right: 14px;
            &.model{
              margin-right: 7px;
              background: url("../../assets/images/icon-dataModel.png") no-repeat;
              background-position:4px 0px;
            }
            &.agents{
              width: 21px;
              background: url("../../assets/images/icon-eye.png") no-repeat;
            }
            &.define{
              background: url("../../assets/images/icon-definity.png") no-repeat;
              background-position: 1px 0px;
              margin-right: 5px;
            }
          }
        }
      }
    }

  }


</style>
