<template>
  <div class="templates">
    <Row>
      <Col span="4" >
      <div class="leftnav">
        <div v-for="(item, index) in menuList">
          <p class="nav-item" @click="showFolder(item)" >
            <i class="iconfont " :class="{'icon-manage-author':item.icon,'icon-authorise':!item.icon}"></i>
            <span class="nav-item-name">{{item.name}}</span>
             <i class="fa fa-sort-up fa-location" :class="{'sort-rotated':item.arrow,'sort-rotate':!item.arrow}" ></i>
          </p>
          <ul v-if="item.arrow"> 
              <li class="active-line" v-for="(v, i) in item.list" :key="v.name">
                <router-link :to="v.path" >{{v.name}}</router-link>
              </li>
          </ul>
        </div>
      </div>
      </Col>
      <Col span="20"><router-view></router-view></Col>
    </Row>

      
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name:'权限管理',
          arrow: true,
          icon: true,
          list: [       
            {
              name: "看板权限",
              path: "/cog/board",
            },
            {
              name: "数据权限",
              path: "/cog/data",
            }
          ]
        },
        {
          name:'人员管理',
          arrow: true,
          icon: false,
          list: [       
            {
              name: "用户管理",
              path: "/cog/user",
            },
            {
              name: "用户组管理",
              path: "/cog/group",
            }
          ]        
        }
      ],
      loading: true,
      curPath: "cogBoard"
    };
  },
  created() {
    // 登录控制接口
  // entry({'email':'superBanggood@banggood.com'}, (respose) => {
  //     console.log(respose)
  // })
  // test({params:{folderName:123}},(response)=>{

  // })
  },
  methods: {
    showFolder(str){
        str.arrow = !str.arrow;
    }
  }
};
</script>

<style scoped>
@import '//at.alicdn.com/t/font_528139_pnmletabiq9f6r.css';
.leftnav{
  background: #30363d;
  max-width: 200px;
  height: calc(100vh - 52px);
}
.leftnav .nav-block{
  height: 50px;
}
.leftnav .nav-item {
  background: #485464;
  font-size: 12px;
  padding: 8px 18px 8px;
  overflow: hidden;
  text-align: left;
  color: white;
}
.leftnav .active-line>a{
  color:#9c9fa2;
  padding: 11px 15px 8px 10px;
  display: block;
  text-decoration: none;
}
.active-line>.router-link-active {
  color: #fff!important;
  background: #35a1f2;
}
.imenu-list {
  float: left;
  width: 200px;
  background: #ccc;
  height: 700px;
}
.nav-item-name{
   margin-left: 20px;
}
</style>
