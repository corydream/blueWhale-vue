<template>
    <div>
      <keywordManage :datas="datas" :showDataObj="explodeKeyword" v-if="datas"></keywordManage>
    </div>
</template>
<script>
   import commonUtil from "../../../config/insight/commons/comonUse";
   import keywordManage from "../commons/keywordManage.vue";
    export default {
        data() {
          return {
            explodeKeyword:{
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
                          uuid:"22899d6e-ca2c-489a-aef4-c7f6690fe6dc",
                          chinese:"站点",
                          relation:"EQUAL",
                          col: "RPT.RPT_CATEGORY_DESC_COUNT.SCGS_SITE_TYPE",
                          columnType: "STRING",
                          val: "美站"
                        },
                        {
                          uuid:"b2b2762e-f8ca-4030-abc4-efe65e8d52c1",
                          chinese:"类目",
                          relation:"EQUAL",
                          col: "RPT.RPT_CATEGORY_DESC_COUNT.CATEGORY",
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
                      modelID:226,
                      cid:226,
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
                          uuid:"3ca0c42f-0353-4248-be0f-beea9e0d10da",
                          chinese:"站点",
                          relation:"EQUAL",
                          col: "SCGS_SITE_TYPE",
                          columnType: "STRING",
                          val: "美站"
                        },
                        {
                          uuid:"9db18e16-4ef9-4385-833a-b63f8dd8ecc7",
                          chinese:"类目",
                          relation:"EQUAL",
                          col: "RPT.RPT_BSR_WORD_COUNT.CATEGORY",
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
                      modelID:225,
                      cid:225,
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
                chartClass:"explodeKeyword",
                chartWrapClass:"myexplodeKeyword"
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
              //跳转路由
              routePath:{
                back:'explodeProductAmazonSum',
                current:'explodekeyword'
              }
            }
          }
        },
        props:['datas'],
        components:{keywordManage},
        methods:{
          //配置图表条件
          setChartCondition(){
            //标题词云
            this.explodeKeyword.echartItem.echartContainer.echartInfo.titlekeyworddata.demesion = commonUtil.setConditions("demesion", [
              {
                "chinese": "名称单词",
                "col": "RPT.RPT_CATEGORY_WORD_COUNT.WORD_NAME",
                "columnType": "STRING",
                "uuid": "e9c12e5e-827d-4cc0-aa7b-e77618373cde"
              }
            ]);
            this.explodeKeyword.echartItem.echartContainer.echartInfo.titlekeyworddata.measures = commonUtil.setConditions("measures", [
              {
                "chinese": "数量",
                "col": "RPT_BSR_WORD_COUNT.WORD_COUNT",
                "uuid": "870a4d1d-f22c-4090-8649-a7833f8f4be5",
                "sortType":"DESC",
                "agg":"SUM"
              }
              ,
              {
                "chinese": "占比",
                "col": "RPT_BSR_WORD_COUNT.WORD_COUNT",
                "uuid": "870a4d1d-f22c-4090-8649-a7833f8f4be5",
                "agg":"SUM",
                "isPercent": true,
                "scale":4
              }
            ]);
            //描述词云
            this.explodeKeyword.echartItem.echartContainer.echartInfo.deskeyworddata.demesion = commonUtil.setConditions("demesion", [
              {
                "chinese": "名称单词",
                "col": "RPT.RPT_CATEGORY_DESC_COUNT.DESC_WORD",
                "columnType": "STRING",
                "uuid": "13ba83b4-9fa9-46e7-96a9-105f2dbc06e9"
              }
            ]);
            this.explodeKeyword.echartItem.echartContainer.echartInfo.deskeyworddata.measures = commonUtil.setConditions("measures", [
              {
                "chinese": "数量",
                "col": "DESC_COUNT",
                "uuid": "5630a874-9812-40d6-abb0-4c2dc8287c1e",
                "sortType":"DESC",
                "agg":"SUM"
              },
              {
                "chinese": "占比",
                "col": "DESC_COUNT",
                "uuid": "5630a874-9812-40d6-abb0-4c2dc8287c1e",
                "agg":"SUM",
                "isPercent": true,
                "scale":4
              }
            ]);
          },
        }
    }
</script>
<style lang="less">
</style>
