<template>
    <div>
      <div class="data-show">
        <div class="collectBtns" v-if='this.TableItem.showNewColumn=="name3"||this.TableItem.showNewColumn=="name4"'>
          <span v-bind:class="{active:collectBtnsActive=='tab1'}" @click="tabCollection('tab1')">{{btnText}}
               <Tooltip placement="top" class="permeateTips btnTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="btnTipsContent">
                <p>{{btnTipText1}}</p>
              </div>
            </Tooltip>
          </span>
          <span v-bind:class="{active:collectBtnsActive=='tab3'}" @click="tabCollection('tab3')">我的收藏
               <Tooltip placement="top" class="permeateTips btnTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="btnTipsContent">
                <p>{{btnTipText3}}</p>
              </div>
            </Tooltip>
          </span>
        </div>
        <div class="collectBtns" v-if='this.TableItem.showNewColumn=="name1"'>
          <span v-bind:class="{active:collectBtnsActive=='tab1'}" @click="tabCollection('tab1')">{{btnText}}
             <Tooltip placement="top" class="permeateTips btnTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="btnTipsContent">
                <p>{{btnTipText1}}</p>
              </div>
            </Tooltip>
          </span>
          <span v-bind:class="{active:collectBtnsActive=='tab2'}" id="tab2"  @click="tabCollection('tab2')">{{btnText2}}
             <Tooltip placement="top" class="permeateTips btnTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="btnTipsContent">
                <p>{{btnTipText2}}</p>
              </div>
            </Tooltip>
          </span>
          <span v-bind:class="{active:collectBtnsActive=='tab3'}" @click="tabCollection('tab3')">我的收藏
             <Tooltip placement="top" class="permeateTips btnTips">
              <i class="fa fa-question-circle-o myhelp"></i>
              <div slot="content" class="btnTipsContent">
                <p>{{btnTipText3}}</p>
              </div>
            </Tooltip>
          </span>
        </div>
        <tableContainer1
          :collectBtnsActive="collectBtnsActive"
          :TableItem="TableItem"
          :showMessage="showMessage"
          :chooseType="chooseType"
          :pageBean="pageBean"
          v-if="collectBtnsActive=='tab1'||collectBtnsActive=='tab3'"
          ref="tableWrapper"
        ></tableContainer1>
        <tableContainer2
          :collectBtnsActive="collectBtnsActive"
          :TableItem="TableItem"
          :showMessage="showMessage"
          :chooseType="chooseType"
          :pageBean="pageBean"
          v-if="collectBtnsActive=='tab2'"
          ref="tableWrapper"
        ></tableContainer2>
      </div>
    </div>
</template>
<script>
   import tableContainer1 from "./tableList.vue";
   import tableContainer2 from "./tab2/tableList.vue";
    export default {
      data() {
            return {
              collectBtnsActive:'tab1',//是否是收藏 稳定 榜单
              btnText:null,
              btnText2:null,
              btnTipText1:"",//
              btnTipText2:"",//稳定榜单
              btnTipText3:"显示收藏（点击列表最左的黄星）产品列表，可对收藏产品做精细化分析",//我的收藏
            }
        },
      components:{tableContainer1,tableContainer2},
      props:['TableItem','showMessage','chooseType','pageBean'],
      created(){
        this.btnText=this.TableItem.title;
        switch (this.btnText){
          case "新品总榜单":
            this.btnTipText1="获取该类目上下级NRR榜单全部ASIN产品，按照所选类目BSR进行排序显示。"
            break;
          case "新品NRR榜单":
            this.btnTipText1="昨日新品榜单top100产品列表。";
            break;
          case "新品推荐列表":
            this.btnTipText1="基于最近3个月上架的asin，按其30天销量的增长趋势进行推荐,结合多个自定义调控参数能灵活进一步控制推荐精度（具体参数意义见筛选条件一侧的问号提示说明）。"
            break;
          case "爆品总榜单":
            this.btnTipText1="获取该类目上下级BSR榜单全部ASIN产品，按照所选类目BSR进行排序显示。"
            break;
          case "爆品BSR榜单":
            this.btnTipText1="昨日BSR榜单top100产品列表（按类目，可能出现不满100的情况）。"
            break;
          case "爆品推荐列表":
            this.btnTipText1="基于公司亚马逊平台最近3个月售出的asin数据，此估算爆品榜产品30天的每日销量以及增长趋势并且根据增长度进行推荐。"
            break;
        }
        if(this.TableItem.type==="explode"){
          this.btnText2="稳定爆品列表";
          this.btnTipText2="可筛选满足7天、15天、30天都在爆品榜单产品数据，判断爆品稳定性。"
        }else if(this.TableItem.type=="news"){
          this.btnText2="稳定新品列表";
          this.btnTipText2="可筛选满足7天、15天、30天都在新品榜单产品数据，判断新品稳定性。";
        }
      },
      watch:{
        'TableItem.tableContainer.brandCount':function(count) {
           this.$store.commit("changeBrandCount",count);
        }
      },
      methods:{
        //切换我的收藏
        tabCollection(tabName){
          this.TableItem.tableContainer.brandData.splice(0,this.TableItem.tableContainer.brandData.length);
          this.TableItem.tableContainer.productData.splice(0,this.TableItem.tableContainer.brandData.length);
          this.collectBtnsActive=tabName;
          this.$store.commit("chanegTabSelect",tabName);
        },
      }
    }
</script>
<style lang="less">
  @import "../../../../../style/insight/dataTableList.less";
  @import "../../../../../style/insight/tablelist";
  .btnTips{
    cursor: pointer;
    .ivu-tooltip-inner{
      min-width: 200px;
      max-width: 290px;
      white-space: pre-wrap;
      background: #858585;
    }
  }
</style>
