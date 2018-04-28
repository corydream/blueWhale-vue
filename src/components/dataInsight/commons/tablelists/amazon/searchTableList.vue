<template>
    <div>
    <div class="tabContent">
               <slot name="chartBox"></slot>
              <div v-if="TableItem.showNewColumn=='name1'">
              <searchBoxOne ref="searchBox" :TableItem="TableItem" :chooseType="chooseType"></searchBoxOne>
              </div>
              <div v-if="TableItem.showNewColumn=='name3'">
               <searchBoxTwo ref="searchBox" :pageBean="pageBean" :TableItem="TableItem" :chooseType="chooseType"></searchBoxTwo>
               </div>
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
  import tableBox from "../../tabledatas/amazon/tabBtns";
  import searchBoxOne from "../../searchboxs/searchBox1";
  import searchBoxTwo from "../../searchboxs/searchBox2";
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
        components:{chartBox,searchBoxOne,searchBoxTwo,tableBox},
        props:['TableItem','showMessage','chooseType'],
        mounted(){
          this.$nextTick(() => {
          })
        },
        created() {},
        methods:{}
    }

</script>
<style lang="less"></style>
