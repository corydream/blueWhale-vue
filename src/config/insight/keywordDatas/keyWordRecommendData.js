let list3 ={
  //站点选择数据
  cityList: [
    {
      value: '美站',
      label: '美站'
    },
    {
      value: '日站',
      label: '日站'
    },
    {
      value: '中国站',
      label: '中国站'
    }
  ],
  //新品指标看板
  databoardTarget: {
    avgPrice: {
      title: "关键词搜索产品量",
      uuid: "a6ed99fb-755c-4152-b0fd-6772aed3905e",
      avg: "0",
      maxVal: 0,
      minVal: 0,
      valType: "KEYWORD",
      modelID:238,
      cid:238,
      condition:[
        {
          uuid:"782e036d-f368-4a4f-91a7-sdaa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_firstTitle",
          columnType: "STRING",
          val: ""
        },
        {
          uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
          chinese: "关键词",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
          columnType: "STRING",
          val: ""
        },
        {
          chinese: "start",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LARGEEQUAL",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val:""
        },
        {
          chinese: "end",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LESS",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val: ""
        },
        {
          col: "crawler_wcs_amazon_sku_mid.scgs_status",
          chinese: "任务id",
          uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
          relation: "EQUAL",
          columnType: "STRING",
          val: ""
        },
        {
          chinese: "站点",
          col: "crawler_sgsc_desc_count.scgs_site_type",
          relation:"EQUAL",
          columnType: "STRING",
          uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
          val:"美站"
        }

      ],
      getTypes:["AVG","MAX","MIN"],
      demesion:[
        {
          "chinese": "搜索产品量",
          "col": "crawler_wcs_amazon_sku_mid.scgs_sales_total",
          "uuid": "782e036dad-f36822-4a4f-91a7-sdaa93043c4e1",
          "sortType": "DESC"
        }
        ],
      tips:"关键词搜索产品量:基于某一类目下，以该关键词搜索，爬取前1000的产品信息，根据产品提炼关键词价值。关键词产品量=关键词搜索曝光产品数。",
      position:"top-start"
    },
    avgReview: {
      title: "平均review数",
      uuid: "79144db6-b437-402f-9022-8516853f019a",
      avg: 0,
      maxVal: 0,
      minVal: 0,
      valType: "NUMBER",
      modelID:238,
      cid:238,
      condition:[
        {
          uuid:"782e036d-f368-4a4f-91a7-sdaa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_firstTitle",
          columnType: "STRING",
          val: ""
        },
        {
          uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
          chinese: "关键词",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
          columnType: "STRING",
          val: ""
        },
        {
          chinese: "start",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LARGEEQUAL",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val:""
        },
        {
          chinese: "end",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LESS",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val: ""
    },
        {
          col: "crawler_wcs_amazon_sku_mid.scgs_status",
          chinese: "任务id",
          uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
          relation: "EQUAL",
          columnType: "STRING",
          val: ""
        },
        {
          chinese: "站点",
          col: "crawler_sgsc_desc_count.scgs_site_type",
          relation:"EQUAL",
          columnType: "STRING",
          uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
          val:"美站"
        }
      ],
      getTypes:["AVG","MAX","MIN"],
      measures:[
       {
          "chinese": "平均review数",
          "col": "crawler_wcs_amazon_sku_mid.scgs_review_count",
          "uuid": "45ce6256-e763-4632-aa19-3ea868baa993",
          "sortType": "DEFAULT",
          "agg": "AVG"
        },
       {
          "chinese": "最大review数",
          "col": "crawler_wcs_amazon_sku_mid.scgs_review_count",
          "uuid": "45ce6256-e763-4632-aa19-3ea868baa993",
          "sortType": "DESC",
          "agg": "MAX",
        },
        {
          "chinese": "最小review数",
          "col": "crawler_wcs_amazon_sku_mid.scgs_review_count",
          "uuid": "45ce6256-e763-4632-aa19-3ea868baa993",
          "sortType": "ASC",
          "agg": "MIN"
        }
      ],
      tips:"平均review数:基于某一类目下，以该关键词搜索，爬取前1000的产品信息，根据产品提炼关键词价值。平均review数=所有产品review数求和/产品总数。",
      position:"top-start"
    },
    avgRate: {
      title: "平均评分数",
      uuid: "101c6ce8-d3dc-48b7-b115-2196f4faeba0",
      avg: 0,
      maxVal: 0,
      minVal: 0,
      valType: "NUMBER",
      modelID:238,
      cid:238,
      condition:[
        {
          uuid:"782e036d-f368-4a4f-91a7-sdaa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_firstTitle",
          columnType: "STRING",
          val: ""
        },
        {
          uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
          chinese: "关键词",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
          columnType: "STRING",
          val: ""
        },
        {
          chinese: "start",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LARGEEQUAL",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val:""
        },
        {
          chinese: "end",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LESS",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val:""
        },
        {
          col: "crawler_wcs_amazon_sku_mid.scgs_status",
          chinese: "任务id",
          uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
          relation: "EQUAL",
          columnType: "STRING",
          val: ""
        },
        {
          chinese: "站点",
          col: "crawler_sgsc_desc_count.scgs_site_type",
          relation:"EQUAL",
          columnType: "STRING",
          uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
          val:"美站"
        }
      ],
      getTypes:["AVG","MAX","MIN"],
      measures:[
        {
          "chinese": "评分数",
          "col": "crawler_wcs_amazon_sku_mid.scgs_grade_count",
          "uuid": "101c6ce8-d3dc-48b7-b115-2196f4faeba0",
          "sortType": "DEFAULT",
          "agg": "AVG"
        },
        {
          "chinese": "最大评分",
          "col": "crawler_wcs_amazon_sku_mid.scgs_grade_count",
          "uuid": "101c6ce8-d3dc-48b7-b115-2196f4faeba0",
          "sortType": "DESC",
          "agg": "MAX"
        },
        {
          "chinese": "最小评分",
          "col": "crawler_wcs_amazon_sku_mid.scgs_grade_count",
          "uuid": "101c6ce8-d3dc-48b7-b115-2196f4faeba0",
          "sortType": "ASC",
          "agg": "MIN"
        }
      ],
      tips:"平均评分数:基于某一类目下，以该关键词搜索，爬取前1000的产品信息，根据产品提炼关键词价值。平均评分数=所有产品评分数求和/产品总数。",
      position:"top-start"
    },
    avgBSR: {
      title: "平均上架天数",
      uuid: "3f355f32-d73a-4f05-aaf4-2aab44fc5a9a",
      avg: 0,
      maxVal: 0,
      minVal: 0,
      valType: "Date",
      modelID:260,
      cid:260,
      condition:[
        {
          uuid:"782e036d-f368-4a4f-91a7-sdaa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_firstTitle",
          columnType: "STRING",
          val: ""
        },
        {
          uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
          chinese: "关键词",
          relation:"EQUAL",
          col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
          columnType: "STRING",
          val: ""
        },
        {
          chinese: "start",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LARGEEQUAL",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val:""
        },
        {
          chinese: "end",
          col: "crawler_sgsc_desc_count.create_date",
          relation: "LESS",
          columnType: "DATE",
          uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
          val: ""
        },
        {
          col: "crawler_wcs_amazon_sku_mid.scgs_status",
          chinese: "任务id",
          uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
          relation: "EQUAL",
          columnType: "STRING",
          val: ""
        },
        {
          "chinese": "上架时间",
          "col": "crawler_wcs_amazon_sku_mid.scgs_generation_time",
          "relation": "LARGE",
          "columnType": "DATE",
          "uuid": "782e036ssssd-f368-4a4f-191a7-sads1293043c4e1",
          val:"1970-01-01"
        },
        {
          chinese: "站点",
          col: "crawler_sgsc_desc_count.scgs_site_type",
          relation:"EQUAL",
          columnType: "STRING",
          uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
          val:"美站"
        }
      ],
      getTypes:["AVG","MAX","MIN"],
      measures:[
        {
          "chinese": "平均上架天数",
          "col": "crawler_wcs_amazon_sku_mid.days",
          "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
          "sortType": "DEFAULT",
          "agg": "AVG"
        },
        {
          "chinese": "最大上架天数",
          "col": "crawler_wcs_amazon_sku_mid.days",
          "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
          "sortType": "DESC",
          "agg": "MAX"
        },
        {
          "chinese": "最小上架天数",
          "col": "crawler_wcs_amazon_sku_mid.days",
          "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
          "sortType": "ASC",
          "agg": "MIN"
        }
      ],
      tips:"平均上架天数:基于某一类目下，以该关键词搜索，爬取前1000的产品信息，根据产品提炼关键词价值。平均上架天数=所有产品上架天数求和/产品总数。",
      position:"top-end"
    }
  },
  //图表数据
  echartContainer:{
    //存放图表对象
    echartBox: [],
    //图表配置数据
    echartsData: [],
    //图表查询条件、数据信息
    echartInfo: {
      //评分评论数散点图
      ratedatadot: {
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
            uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
            chinese: "关键词",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        legend:['评论数','评分数'],
        datas:{
          demesion:[],
          measures:[],
          tips:[]
        },
        type:"ratedatadot",
        title:"评分与评论数分布",
        modelID:238,
        cid:238,
        graphType:8,
        pageSize:1000,
        index:0
      },
      //价格评论数散点图
      priceComments:{
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
            uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
            chinese: "关键词",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        legend:['评论数','产品价格'],
        datas:{
          demesion:[],
          measures:[],
          tips:[]
        },
        type:"priceComments",
        title:"产品价格与评论数分布",
        modelID:238,
        cid:238,
        graphType:11,
        pageSize:150,
        index:1
      },
      //评分评论数占比柱状-评分数
      ratedata : {
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
            uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
            chinese: "关键词",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        legend:[],
        datas:{
          demesion:[],
          measures:[],
          tips:[]
        },
        type:"ratedata",
        title:"评分与评论数分布占比",
        modelID:238,
        cid:238,
        graphType:9,
        pageSize:10,
        index:2
      },
      //评分评论数占比柱状-评论数
      rateCommentdata : {
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
            uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
            chinese: "关键词",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        legend:[],
        datas:{
          demesion:[],
          measures:[],
          tips:[]
        },
        type:"rateCommentdata",
        title:"评分与评论数分布占比",
        modelID:238,
        cid:238,
        graphType:9,
        pageSize:10,
        index:2
      },
      //价格带区间
      pricedistdata : {
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
            uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
            chinese: "关键词",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        legend:[],
        datas:{
          demesion:[],
          measures:[],
          tips:[]
        },
        type:"pricedistdata",
        title:"价格带区间分析",
        modelID:238,
        cid:238,
        graphType:10,
        index:3,
        pageSize:5
      },
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
            // uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
            uuid:"782e036d-f368-4a4f-191a7-sads1293adfd043c4e1",
            chinese: "关键词",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        legend:[],
        datas:{
          demesion:[],
          measures:[]
        },
        type:"deskeyworddata",
        title:"产品描述-关键词词频分析",
        graphType:6,
        modelID:239,
        cid:239,
        pageSize:1000,
        index:4
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
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        legend:[],
        datas:{
          demesion:[],
          measures:[],
        },
        type:"titlekeyworddata",
        title:"产品标题-关键词词频分析",
        graphType:6,
        modelID:245,
        cid:245,
        pageSize:1000,
        index:5
      },
      //价格区间最大最小值
      priceSession:{
        demesion:[],
        measures:[],
        condition:[
          {
            uuid:"782e036d-f368-4a4f-91a7-sdaa93043c4e1",
            chinese:"类目",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_firstTitle",
            columnType: "STRING",
            val: ""
          },
          {
            uuid:"782e036d-f368-4a4f-191a7-sads1293043c4e1",
            chinese: "关键词",
            relation:"EQUAL",
            col: "crawler_wcs_amazon_sku_mid.scgs_secondTitle",
            columnType: "STRING",
            val: ""
          },
          {
            uuid:"a6ed99fb-755c-4152-b0fd-6772aed3905e",
            chinese: "价格",
            relation:"LARGE",
            col: "crawler_wcs_amazon_sku_mid.scgs_price",
            columnType: "NUMBER",
            val: 0
          },
          {
            chinese: "start",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LARGEEQUAL",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val:""
          },
          {
            chinese: "end",
            col: "crawler_sgsc_desc_count.create_date",
            relation: "LESS",
            columnType: "DATE",
            uuid: "782e036d-f368-4a4ssDf-191a7-sadsS1293adfd043c4e1",
            val: ""
          },
          {
            col: "crawler_wcs_amazon_sku_mid.scgs_status",
            chinese: "任务id",
            uuid: "8d19aa9c-19ad-44s8b859f6d904aefs88a",
            relation: "EQUAL",
            columnType: "STRING",
            val: ""
          },
          {
            chinese: "站点",
            col: "crawler_sgsc_desc_count.scgs_site_type",
            relation:"EQUAL",
            columnType: "STRING",
            uuid: "782e036dS68-4Sa4ssDf-191a7-sadsS1293adfd043c4e1",
            val:"美站"
          }
        ],
        datas:{
          demesion:[],
          measures:[],
        },
        modelID:238,
        type:"priceSession",
        cid:238,
        pageSize:1
      }
    },
    //评论数
    showDatas:{
      rateDatas:{
        demesion:[],
        measures:[],
        legend:[],
        tips:[]
      },
      commentDatas:{
        demesion:[],
        measures:[],
        legend:[],
        tips:[]
      }
    },
    //关键词数
    keywordDatas:{
      titleDatas:{
        demesion:[],
        measures:[],
        legend:[],
        tips:[]
      },
      descDatas:{
        demesion:[],
        measures:[],
        legend:[],
        tips:[]
      }
    }
  },
  //表格数据
  tableContainer:{
    //表格控件查询条件
    queryData: {
      //维度
      //FBA
      sellerFBA: {
        inputVal: [],
        type: "ARRAY",
      },
      //亚马逊自营
      sellerAmazon: {
        inputVal: [],
        type: "ARRAY",
      },
      //跟卖卖家数
      category: {
        selectValue: "LARGEEQUAL",//关系
        inputVal: "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"int"
      },
      //BSR排名
      BSR: {
        selectValue: "LARGEEQUAL",
        inputVal:  "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"int"
      },
      //数值
      //产品评分
      productRates: {
        selectValue: "LARGEEQUAL",
        inputVal: "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"float"
      },
      //产品价格
      productPrices: {
        selectValue: "LARGEEQUAL",
        inputVal: "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"float"
      },
      //产品
      product: {
        //产品名称
        inputVal: ''
      },
      //品牌
      brand: {
        //品牌名称
        inputVal: "",
        type:"Brand"
      },
      //上架时间
      time: {
        inputVal: "",
        type: "DATE"
      },
      //BSR品类
      BSRsort: {
        inputVal:"",
        type:"BSR"
      }
    },
    //表格的数据
    tableData: [],
    //表格列标题
    tableColumns: [],
    //bsr分类数据
    sortData:[],
    //品牌名称
    brandData:[],
    //列标题拆分
    columns: {},
  },
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
      },
      {
        value: 100,
        label: "100条/页"
      }
    ],
  },
  //条件查询数据
  parmasConfig:{
    //single 表格
    query:{
      modelID:237,
      cid:237
    },
    //指标
    indicator:{
      modelID:166,
      cid:166
    },
    //列名
    column:{
      cid:237,
      modelID: 237
    }
  },
  //查询渲染
  //处理维度、数字、条件查询数据
  initCondition: {
    measures: [],
    demesion: [],
    condition: [],
    type: "all", //part 搜索初始化类目选择
    extra:[],//站点和类目选择
    isPage:false,//是否点击下一页
    isCategory:false
  }
}

export default  list3;
