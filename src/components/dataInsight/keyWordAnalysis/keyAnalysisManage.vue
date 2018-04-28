<template>
    <div>
      <keywordManage :datas="datas" :keywordObj="keywordObj" :showDataObj="keyAnalysisKeyword" v-if="datas"></keywordManage>
    </div>
</template>
<script>
   import commonUtil from "../../../config/insight/commons/insightCommon";
   import keywordManage from "../commons/keywordManage.vue";
    export default {
        data() {
          return {
            keyAnalysisKeyword:{
              //分页处理
              pageBean:{
                currentPage: 1,
                oldPage: 1,
                pageSize: 10,
                totalCount: 100,
                toPage: 1,
                pageSizes: [
                  {
                    value: 10,
                    label: "10条/页"
                  },
                  {
                    value: 20,
                    label: "20条/页"
                  },
                  {
                    value: 30,
                    label: "30条/页"
                  },
                  {
                    value: 40,
                    label: "40条/页"
                  }
                ]
              },
              echartItem:{
                echartContainer:{
                  echartsData:[],
                  echartBox:[],
                  echartInfo:{
                    //描述关键词频
                    deskeyworddata : {
                      measures: [],
                      demesion: [],
                      condition: [
                        {
                          uuid:"782e036d-f368-4a4f-91a7-sdaa93043c4e1",
                          chinese:"类目",
                          relation:"EQUAL",
                          col: "crawler_wcs_amazon_sku_mid.scgs_firstTitle",
                          columnType: "STRING",
                          val: ""
                        },
                        {
//                          uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
                          uuid:"782e036d-f368-4a4f-191a7-sads1293adfd043c4e1",
                          chinese: "关键词",
                          relation:"EQUAL",
                          col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
                          columnType: "STRING",
                          val: ""
                        },
                        {
                          col: "crawler_wcs_amazon_sku_mid.scgs_status",
                          chinese: "任务id",
                          uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
                          relation: "EQUAL",
                          columnType: "STRING",
                          val: ""
                        }
                      ],
                      legend:[],
                      datas:{
                        demesion:[],
                        measures:[]
                      },
                      type:"deskeyworddata",
                      title:"",
                      graphType:6,
                      modelID:239,
                      cid:239,
                      pageSize:1000000,
                      index:5,
                      height:495,
                      top:1
                    },
                    //标题关键词频
                    titlekeyworddata : {
                      measures: [],
                      demesion: [],
                      condition: [
                        {
                          uuid:"782e036d-f368-4a4f-91a7-sdaa93043c4e1",
                          chinese:"类目",
                          relation:"EQUAL",
                          col: "crawler_wcs_amazon_sku_mid.scgs_firstTitle",
                          columnType: "STRING",
                          val: ""
                        },
                        {
                          uuid:"782e036d-f368-4a4f-191a7-sads1293adfd043c4e1",
                          chinese: "关键词",
                          relation:"EQUAL",
                          col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
                          columnType: "STRING",
                          val: ""
                        },
                        {
                          col: "crawler_wcs_amazon_sku_mid.scgs_status",
                          chinese: "任务id",
                          uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
                          relation: "EQUAL",
                          columnType: "STRING",
                          val: ""
                        }
                      ],
                      legend:[],
                      datas:{
                        demesion:[],
                        measures:[],
                      },
                      type:"titlekeyworddata",
                      title:"",
                      graphType:6,
                      modelID:245,
                      cid:245,
                      pageSize:1000000,
                      index:6,
                      height:495,
                      top:1
                    },
                  },
                  saveCheckedDatas:[],//保存当前选中的状态
                  saveCancelData:[], //保存当前取消的状态
                  saveCurrentData:[],//保存当前页请求的数据
                  saveTopSizeData:[],//保存top1000请求的数据
                  beforeStateData:[],//保存之前状态的数据
                },
                chartClass:"keyAnalysisKeyword",
                chartWrapClass:"mykeyAnalysisKeyword"
              },
              tableKeyword:{
                columns:[
                  {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    title:"显示"
                  },
                  {
                    title: '词',
                    key: 'name'
                  },
                  {
                    title: '词频',
                    key: 'value',
                    sortable:'custom'
                  },
                  {
                    title: '占比',
                    key: 'percent',
                    width: 150
                  }
                ],
                tableDatas:[]
              },
              routePath:{
                back:'keywordContain',
                current:'keyAnalysiskeyword'
              }//跳转路由
            }
          }
        },
        props:['datas','keywordObj'],
        components:{keywordManage},
        methods:{
          //配置图表条件
          setChartCondition(){
            //标题词云
            this.keyAnalysisKeyword.echartItem.echartContainer.echartInfo.titlekeyworddata.demesion = commonUtil.setConditions("demesion", [
              {
                "chinese": "名称",
                "col": "crawler_sgsc_name_count.crawler_sgsc_name_count",
                "columnType": "STRING",
                "uuid": "782e036d-f368-4a4f-191a7-sads1293043c4e1"
              }
            ]);
            this.keyAnalysisKeyword.echartItem.echartContainer.echartInfo.titlekeyworddata.measures = commonUtil.setConditions("measures", [
              {
                "chinese": "数量",
                "col": "crawler_sgsc_name_count.word_count",
                "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
                "sortType":"DESC",
                "agg":"SUM"
              }
              ,
              {
                "chinese": "占比",
                "col": "crawler_sgsc_name_count.word_count",
                "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
                "agg":"SUM",
                "isPercent": true,
                "scale":4
              }
            ]);
            //描述词云
            this.keyAnalysisKeyword.echartItem.echartContainer.echartInfo.deskeyworddata.demesion = commonUtil.setConditions("demesion", [
              {
                "chinese": "描述词名称",
                "col": "crawler_sgsc_desc_count.scgs_description_word",
                "columnType": "STRING",
                "uuid": "782e036d-f368-4a4f-191a7-sads1293043c4e1"
              }
            ]);
            this.keyAnalysisKeyword.echartItem.echartContainer.echartInfo.deskeyworddata.measures = commonUtil.setConditions("measures", [
              {
                "chinese": "数量",
                "col": "crawler_sgsc_desc_count.word_count",
                "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
                "sortType":"DESC",
                "agg":"SUM"
              },
              {
                "chinese": "占比",
                "col": "crawler_sgsc_desc_count.word_count",
                "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
                "agg":"SUM",
                "isPercent": true,
                "scale":4
              }
            ]);
          }
        }
    }
</script>
<style lang="less">
</style>
