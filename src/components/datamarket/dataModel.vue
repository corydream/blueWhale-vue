<template>
    <div id="dataModel">
      <div class="model-box container-fluid">
            <ul class="table-title row">
              <li class="col-xs-3">模型名称</li>
              <li class="col-xs-3">描述</li>
              <li class="col-xs-3">添加时间</li>
              <li class="col-xs-3">操作</li>
            </ul>
           <div class="modelData">
             <ul class="model-data row" v-for="data in dataModelList" :key="data.id">
               <li class="col-xs-3">{{data.modelName}}</li>
               <li class="col-xs-3">{{data.modelDesc}}</li>
               <li class="col-xs-3">{{data.addTime}}</li>
               <li class="col-xs-3">
                 <span>查看</span>
                 <span>删除</span>
                 <span>编辑</span>
               </li>
             </ul>
           </div>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
          return{
             dataModelList:[
               {
                 no:"1",
                 modelName:"滞销数据",
                 modelDesc:'BG、YS、NC、平台需统计品项数据',
                 addTime:"2016-09-21 08:50:08"
               },
               {
                 no:"2",
                 modelName:"店铺表现数据",
                 modelDesc:'通过爬虫抓取wish后台的数据，以表格的形式进行展示',
                 addTime:"2016-09-21 08:50:08"
               },
               {
                 no:"3",
                 modelName:"test21",
                 modelDesc:'BG、YS、NC、平台需统计品项数据',
                 addTime:"2016-09-21 08:50:08"
               },
               {
                 no:"4",
                 modelName:"test22",
                 modelDesc:'BG、YS、NC、平台需统计品项数据',
                 addTime:"2016-09-21 08:50:08"
               },
               {
                 no:"5",
                 modelName:"test23",
                 modelDesc:'BG、YS、NC、平台需统计品项数据',
                 addTime:"2016-09-21 08:50:08"
               }
             ]
          }
        }

    }
</script>
<style scoped lang="less">
.model-box{
  padding-top: 35px;
  margin: 0 auto;
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
   >.table-title{
     border: 1px solid #d9d9d9;
     height: 71px;
     overflow: hidden;
     box-sizing: border-box;
     >li{
       float: left;
       height: 71px;
       line-height: 71px;
       color: #181818;
       background: #f3f3f3;
       font-size: 16px;
     }
   }
  >.modelData{
    >ul{
      background: #fff;
      border: 1px solid #e7e9eb;
      border-top:none;
      >li{
        min-height: 58px;
        box-sizing: border-box;
        color: #181818;
        font-size: 15px;
        padding-top: 20px;
        padding-bottom: 20px;
        &:last-of-type{
          >span{
            color: #a5a5a6;
            font-size: 15px;
            margin-right: 28px;
          }
        }
      }
      &:nth-of-type(odd){
        background: #f9fbfd;
      }

    }
  }
}
</style>
