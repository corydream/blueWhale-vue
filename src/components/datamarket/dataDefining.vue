<template>
  <div>
    <div class="agents-box">
      <competProduct :dataList="dataDefineList" title="自定义数据"></competProduct>
    </div>
  </div>
</template>
<script>
  import competProduct from '../commons/competProduct.vue';
  export default {
    data() {
      return{
        dataDefineList:[
          {
            productType:"1",
            products:[
              {
                name:"Excel Preview",
                img:require("../../assets/images/icon-15.png"),
                type:'x1'
              },
              {
                name:"csv",
                img:require("../../assets/images/icon-16.png"),
                type:'x2'
              }
            ]
          }
        ]
      }
    },
    components:{
      competProduct
    }

  }
</script>
<style scoped lang="less">

</style>
