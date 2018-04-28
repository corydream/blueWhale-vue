<template>
    <div>
    <div class="tabContent">
               <slot name="chartBox"></slot>
               <searchBox3 ref="searchBox" :TableItem="TableItem" :chooseType="chooseType"></searchBox3>
      </div>
      <tableBox ref="tableList"　:TableItem="TableItem"
                :pageBean="pageBean"
                :showMessage="showMessage"
                :chooseType="chooseType">
      </tableBox>
    </div>
</template>
<script>
  import tableBox from "../../tabledatas/ebay/tableList";
  import searchBox3 from "../../searchboxs/searchBox3.vue";
    export default {
        data() {
          return{
            //分页处理
            pageBean:{
              currentPage: 1,
              oldPage: 1,
              pageSize: 30,
              perSize:30,
              totalCount: 100,
              toPage: 1
            },　　　　　　
          }
        },
        components:{
          searchBox3,tableBox
        },
        props:['TableItem','showMessage','chooseType'],
        mounted(){
          this.$nextTick(() => {
          })
        },
        created() {

        },
        methods:{

        }
    }
</script>
<style lang="less"></style>
