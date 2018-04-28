<template>
    <div>
      <div class="my-selection">
         <div class="selectionTop">
           <Input v-model="currentData.inputVal"
                  :icon="arrowStyle" placeholder="请选择或输入搜索"
                  style="width: 288px"
                  @on-click="changeArrow"
                  @on-change="queryBsr"
                  @on-focus="changeArrow"
           ></Input>
         </div>
         <div class="selection-content-wrapper">
           <div class="selectionContent" :class="{fold:!arrowState}" ref="scrollDiv">
             <ul class="list-data">
               <li class="item-select"
                   @click="changeSelected(item)"
                   :class="{'item-selected':item.isSelected}"
                   v-for="item in currentData.sortData"
                   :key="item.value">{{item.label}}</li>
               <li class="noMoreData" v-show="noMoreData">没有更多数据</li>
             </ul>
           </div>
         </div>
      </div>
    </div>
</template>
<script>
import IScroll from "iscroll";
import datas from "./../../../config/datas";
import searchTable from './tablelists/amazon/searchTableList';
export default {
  data() {
    return {
      currentData: {
        inputVal: "",
        sortData: []
      },
      arrowState: false,
      arrowStyle: "arrow-down-b",
      isFirst: false,
      scroll: {}
    };
  },
  computed:{
    noMoreData(){
      return this.$store.state.noMoreData;
    }
  },
  props:['TableItem'],
  mounted(){
    this.$nextTick(() => {
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)){
          this.arrowState = false;
          this.arrowStyle = this.arrowState ? "arrow-down-b" : "arrow-up-b";
        }
      }
     )
    })
  },
  watch: {
    "TableItem.tableContainer.sortData": function(val) {
        this.currentData.sortData.splice(0,this.currentData.sortData.length);
        val.forEach((item,i)=>{
          this.currentData.sortData.push({
            label:item.label,
            value:item.value,
            isSelected:item.value==this.TableItem.tableContainer.queryData.BSRsort.inputVal?true:false
          });
        })
    },
    "TableItem.tableContainer.islock":function (val) {this.noMoreData=val;},
    "TableItem.tableContainer.queryData.BSRsort.inputVal":function (val) {
      if(this.TableItem.tableContainer.sortData.length>0){
        this.TableItem.tableContainer.sortData.forEach((item)=>{
          if(item.value==val){
            this.currentData.inputVal=item.label;
          }
        })
      }else{
        this.currentData.inputVal=val;
      }
    }
  },
  methods: {
    //改变箭头
    changeArrow() {
      this.arrowState = !this.arrowState;
      this.arrowStyle = this.arrowState ? "arrow-down-b" : "arrow-up-b";
      this.initScroll();
    },
    //选中切换
     changeSelected(item) {
      this.currentData.sortData.forEach(row => {
        row.isSelected = false;
      });
      item.isSelected = true;
      setTimeout(() => {
        this.arrowState = false;
      }, 200);
      this.currentData.inputVal = item.value;
      this.$set(this.TableItem.tableContainer.queryData.BSRsort,"inputVal",this.currentData.inputVal);
    },
    //初始化监听滚动事件
     initScroll(){
       if (!this.isFirst) {
         setTimeout(() => {
           let box1=this.$refs.scrollDiv;
           box1.addEventListener('scroll',this.handelScroll)
         }, 200);
         this.isFirst = true;
       }
     },
    //箭头滚动加载更多数据
     handelScroll(e){
      let  box =e.target;
      let scrollTop  = box.scrollTop;//滚动条高度
      let wrapHeight = box.offsetHeight;//内部盒子高度
      let  scrollHeight = box.scrollHeight;//外部盒子高度
      if(scrollTop + wrapHeight >= scrollHeight){
        if(this.noMoreData){
          return;
        }
        this.$parent.getBottomData();
      }
    },
     queryBsr(){
       this.arrowState = true;
       this.arrowStyle = this.arrowState ? "arrow-down-b" : "arrow-up-b";
       //调用搜索
       this.$parent.queryBsrData(this.currentData.inputVal);
     }
  }
};
</script>
<style scoped lang="less">
.my-selection {
  display: block;
  box-sizing: border-box;
  outline: 0;
  user-select: none;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  .selectionTop {
    height: 32px;
    width: auto;
  }
  .selectionContent {
    position: absolute;
    left: 0px;
    top: 32px;
    z-index: 900;
    width:auto;
    min-width: 288px;
    height: 300px;
    max-height: 650px;
    max-width: 1000px;
    overflow-y: scroll;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    &.fold {
      transform-origin: center top 0px;
      display: none;
    }
    .list-data {
      cursor: pointer;
      min-height: 300px;
      width: 100%;
      box-sizing: border-box;
    }
    .item-selected,
    .item-selected:hover {
      color: #fff;
      background: rgba(45, 140, 240, 0.9);
    }
    .item-select {
      height: 30px;
      line-height: 30px;
      margin: 0;
      line-height: normal;
      padding: 7px 16px;
      clear: both;
      color: #495060;
      font-size: 12px !important;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }
    .item-select:hover {
      background: #f3f3f3;
    }
    .noMoreData{
      text-align: center;
      color: #ccc;
    }
  }
}
</style>
