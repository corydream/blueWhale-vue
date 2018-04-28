<template>
  <nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- <p @click="goHome" style="cursor:pointer"> -->
        <p style="cursor:pointer">
        	<a @click="goHome">
	          <span class="navbar-brand-logo"></span>
	          <!--<span class="navbar-brand-logo-print">蓝鲸大数据</span>-->
          </a>
        </p>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-list">
          <li class="active-line" v-for="(item, index) in menuList" :key="item.name" :class="{'active-router': item.routeActive}">
          	<template v-if="item.path=='/dataApplication/ponelOne'">
          		<router-link @click.native="test(item.path)" :to="{path:item.path}" >{{ item.name }}</router-link>
          	</template>
          	<template v-else>
          		<router-link @click.native="test(item.path)" :to="{path:item.path+'/'+(item.id?item.id:'0')}">{{ item.name }}</router-link>
          	</template>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <!-- <li><a :class="{'active-line-manage': active}" href="#" @click="manageCogs()">管理设置</a></li>   -->
          <li :class="{'active-router': active}" v-if="isAdmin">
            <router-link to="/cog/board" @click.native="test('/cog')">管理设置</router-link>
            <!-- @click.native="test('/cog')" -->
          </li>
          <li><a class="username" href="javascript:;">{{ username }}</a></li>
          <li><router-link to="/helpCenter/crawler"><span class="help-ico"><img src="../../../static/images/help-center/help-ico.png"/></span></router-link></li>
          <li class="dropdown">
            <!-- <a class="dropdown-toggle" data-toggle="dropdown"> <span class="caret"></span></a>   -->
            <!-- <ul class="dropdown-menu" role="menu">
              <li><a>Action</a></li>
              <li><a>Another action</a></li>
            </ul> -->
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>
<script>
import menuTopList from './../../data/templates';
import menuHomeList from './../../data/templates_role';
import { pubMethod } from './../../config/public';
import roleInfo from './../../data/roles';
import bus from './../../config/bus';
import { entry } from './../../actions/req';
import store from './../../store/index';
export default {
  data () {
    return {
      active: false,
      username: 'Josean',
      menuList: [],
      isAdmin: false //判断是否是超级管理员
    }
  },
  created () {
    this.test();
    if(this.$keyapi == 'https://oa-backend.banggood.cn'){
       this.$http.jsonp('https://erpv2.banggood.cn/Home/GetCollectionMessage',{}).then(
            function(response){
                let _this = this;
                _this.userInfo = {
                    UserId:JSON.parse(response.bodyText).UserId
                };
                // 给data数组传入userInfo信息
                roleInfo.userInfo = _this.userInfo;
                // this.getAjaxSuccess();
                this.login();
                pubMethod.adalert("欢迎您，"+_this.userInfo.UserId);
            },
            function(response){
                pubMethod.adalert("未获取用户信息！");
            }
        );
    }
    else{
        this.login();
    }
  },
  watch:{
    '$route.path' : function(){
      if(this.$route.path.split('/')[1] == 'cog'){
        this.active = true;
      }
      else{
        this.active = false;
      }
      this.menuList.map((v)=>{
          if(this.$route.path.split('/')[1] == v.path.split('/')[1]){
             v.routeActive = true;
          }
          else{
            v.routeActive = false;
          }
      })
    }
  },
  mounted () {
    // this.getBannerList();

    if (this.$keyapi == 'https://oa-backend.banggood.cn') {
      this.menuList = menuTopList;
    }
    else {
      this.menuList = menuHomeList;
    }
  },
  methods: {
    test(path){
      let _this = this;
      let url = document.location.toString();
      let arrurl;
      if(path){
        arrurl = path.split('/')[1];
      }else{
        arrurl = url.split("#")[1].split("/")[1];
      }
      if(arrurl != 'helpCenter'){
        $.ajax({
            type:'post',
            url: _this.$keyapi+"/auth/check/panel",
            dataType:'json',
            xhrFields: {
              withCredentials: true
            },
            data:{
              panelName:arrurl
            },
            crossDomain: true,
            success: data =>{
                if(data.status == 1){

                }
                else if(data.status == 101){
                  location.href = "https://data.banggood.cn";
                }
                else{
                    _this.$Message.error({content: data.desc,duration: 2,closable: true});
                    _this.$router.push({path:'/helpCenter/crawler'})
                }
            }
        })
      }
    },
    goHome(){
       location.href = "https://data.banggood.cn";
    },
    // 判定时候登录
    getAjaxSuccess(){
    	$.ajax({
            url: this.$keyapi+"/bluewhale/check",
            type: "GET",
            xhrFields:{
                withCredentials:true
            },
            success: function(data){

            },
//             error: function (XMLHttpRequest, textStatus) {
//                 if (XMLHttpRequest.status == 0 && textStatus == 'error') {
//                     location.href = this.$keyapi+"/bluewhale/index";
//                 }
//             }
       });
    },
    login(){
      let _this = this;
        $.ajax({
            type:'post',
            url: _this.$keyapi+"/login",
            data: {userName:roleInfo.userInfo.UserId},
            dataType:'json',
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            success: data =>{
              if(data.status == 1){
                data.email = 'superBanggood@banggood.com';
                entry({'email':data.email}, (resp) => {
                    store.state.isManage = resp.data.data;
                    if(resp.data.data == 2 || resp.data.data == 3){
                        _this.isAdmin = true;
                    }
                    else if(resp.data.data === 1){
                       _this.isAdmin = false;
                    }
                })
                roleInfo.userList = data.data;
                _this.username = data.data.userName;
              }else{
                location.href = "https://data.banggood.cn";
              }
            },
            error(){
              location.href = "https://data.banggood.cn";
            }
        })
    },
    getBannerList(){
      let _this = this;
         $.ajax({
            type:'post',
            url: this.$keyapi+"/auth/get/panels",
            dataType:'json',
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            success: data =>{
                _this.menuList = data.data;
            }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active-line{
  margin-right: 20px;
}
/* .active-link,.router-link-active{
  border-bottom: 2px solid #4aa5e9;
  background:#2c3133!important;
} */
.active-router{
  border-bottom: 2px solid #4aa5e9;
  background:#2c3133!important;
}
.active-line a.active{
  border-bottom: 2px solid #4aa5e9;
}
.navbar{
  background:#373d41;
}
.navbar-list{
      /* margin-top: 2px; */
}
.username{
  width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.navbar-brand-logo{
  float: left;
  height: 33px;
  width: 166px;
  margin: 9px 8px 9px 5px;
  /*padding: 18px 0 12px;*/
  font-size: 18px;
  background: url("../../assets/logo.png") no-repeat top center;
  /* background-size: 100% 100%; */
}
.navbar-brand-logo-print{
  /* line-height: 26px; */
  padding: 18px 0 12px;
  display: inline-block;
  font-family: 'microsoft yahei';
  color:white;

}
.navbar-list{
    margin-left: 150px;
}
/* .navbar-nav>li>a{
    padding-top: 18px;
    padding-bottom: 12px;
    color: white;
}
.navbar-nav>li>a:hover{
    color: white;
} */
</style>
