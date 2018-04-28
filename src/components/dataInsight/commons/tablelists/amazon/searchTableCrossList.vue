<template>
    <div>
    <div class="tabContent">
               <slot name="chartBox"></slot>
               <searchBox4 ref="searchBox" :TableItem="TableItem" :chooseType="chooseType"></searchBox4>
      </div>
        <tableBox ref="tableList"　
                  :TableItem="TableItem"
                  :pageBean="pageBean"
                  :showMessage="showMessage"
                  :chooseType="chooseType"
        ></tableBox>
    </div>
</template>
<script>
  import chartBox from "../../drawOneechart";
  import tableBox from "../../tabledatas/amazon/tabBtns.vue";
  import searchBox4 from "../../searchboxs/searchBox4.vue";
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
          chartBox,tableBox,searchBox4
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
