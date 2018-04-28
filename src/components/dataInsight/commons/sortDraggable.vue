<template>
    <div>
       <div class="collect-btns">
         <span @click="cancelCollect">取消</span>
         <span @click="saveCollect">保存</span>
       </div>
      <draggable
        :list="columns"
        :options="{ animation: 200,handle:'.dargDiv'}"
        :move="checkMove"
        @change="update"
      >
        <transition-group name="list-complete">
          <div v-for="element in columns"
               :key="element.key"
               class="list-complete-item"
               v-if="element.key!='sorts'"
          >
            <div class="styleclass dargDiv">
              <p>
                <span class="fl"><Checkbox v-model="element.isSelect" @on-change="changeShow(element)"></Checkbox></span>
                <span class="fr">{{element.title}} <i class="iconfont"
               :class="{'icon-move':(element.title!='序号'&&element.title!='收藏'&&element.title!='产品图片'),'icon-shanchujinzhi':(element.title=='序号'||element.title=='收藏'||element.title=='产品图片')}"></i></span>
              </p>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
</template>
<script>
  import draggable from 'vuedraggable';
    export default {
        data() {
            return {
              currentMoveItem:null,
              sortState:false//是否移动过
            }
        },
        props:['columns','TableItem'],
        created(){},
       mounted(){},
        components:{draggable},
        methods:{
          changeShow(item){
            this.TableItem.tableContainer.tableColumns.splice(0,this.TableItem.tableContainer.tableColumns.length);
            this.columns.forEach((column)=>{
              if(column.isSelect){
                //选中
                this.TableItem.tableContainer.tableColumns.push(column);
              }
            })
          },
          update(e){
            this.changeShow();
          },
          checkMove: function(evt){
            let res = this.privateCheckMove(evt);
            return res;
          },
          privateCheckMove: function(evt){
            this.currentMoveItem = evt.draggedContext.element;
            let newIndex= evt.draggedContext.futureIndex;
            if(this.currentMoveItem.title=="序号"||
              this.currentMoveItem.title=="收藏"||
              this.currentMoveItem.title=="产品图片"){
              return false;
            }else if(newIndex==0||newIndex==1||newIndex==2){
              return false;
            }else{
              this.sortState=true;
              this.$emit("changeSortstate", this.sortState);
              return true;
            }
          },
          cancelCollect(){
            this.$parent.cancelClick();
          },
          saveCollect(){
              //保存当前的列
             this.$parent.saveClickSort();
          }
        }
    }
</script>
<style lang="less" scoped>
  .collect-btns{
    display: flex;
    flex-direction:row;
    height: 40px;
    line-height: 40px;
    color: #828282;
    text-align: center;
    border-bottom: 1px solid #e9eaec;
    box-sizing: border-box;
    >span{
      flex: 1;
      box-sizing: border-box;
      cursor: pointer;
      &:first-of-type{
        border-right: 1px solid #e9eaec;
        background: #f5f5f5;
      }
      &:last-of-type{
        background: #4fb1eb;
        color: #fff;
      }
    }
  }
  .dargDiv{
    cursor: move;
    cursor: -webkit-grabbing;
  p{
    height: 40px;
    line-height: 40px;
    color:#828282;
    padding-left: 14px;
    padding-right: 13px;
    text-align: left;
    border-bottom: 1px solid #e9eaec;
    position: relative;
  .fl{
    text-align: left;
  }
  .fr{
    position: absolute;
    right: 13px;
    top:0px;
    height: 40px;
    line-height: 40px;
  }
  }
  }
</style>
