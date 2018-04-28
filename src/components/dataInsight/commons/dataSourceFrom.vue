<template>
  <div>
    <div class="flexBox">
      <div class="memuTop">
        <Select v-model="site" size="large" disabled>
          <Option v-for="item in categoryItem.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="controlMemu">
        <div class="brand">
          <ul>
            <li class="active"><img src="../../../assets/images/amazon.png" alt=""></li>
            <li class="cover"><img src="../../../assets/images/sumaitong.png" alt=""></li>
            <li class="cover"><img src="../../../assets/images/ebay.png" alt=""></li>
            <li class="cover"><img src="../../../assets/images/wish.png" alt=""></li>
            <li class="cover"><img src="../../../assets/images/ali.png" alt=""></li>
          </ul>
        </div>
        <div class="dataSource">
          <h2>*数据源为{{dateTime}}{{categoryItem.categoryTitle}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import category from "../../../config/insight/categoryDatas/category";
  //通用方法
  import commonUtil from "../../../config/insight/commons/comonUse";
  export default {
    data() {
      return{
        //站点
        site: '美站',
        //数据源日期
        dateTime:commonUtil.formatYesterDay(),
      }
    },
    props:['categoryItem','showMessage','chooseType'],
    created(){
    },
    methods:{
    }
  }
</script>
<style scoped lang="less">
</style>
