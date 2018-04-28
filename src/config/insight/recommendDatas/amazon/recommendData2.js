let list6 ={
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
      title: "新品平均价格",
      uuid: "a6ed99fb-755c-4152-b0fd-6772aed3905e",
      avg: "$0",
      maxVal: 0,
      minVal: 0,
      valType: "PRICE",
      modelID:166,
      condition:[
        {
          uuid:"c8aab938-1b81-4bac-9c84-197d88050bd7",
          chinese:"站点",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_SITE_TYPE",
          columnType: "STRING",
          val: "美站"
        },
        {
          uuid:"782e036d-f368-4a4f-91a7-4aa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_CATEGORY",
          columnType: "STRING",
          val: ""
        }
      ],
      getTypes:["AVG","MAX","MIN"],
      measures:{
        "AVG":{
          "chinese": "新品平均价格",
          "col": "RPT_KYLIN_AMAZON_LIPS_ANALYSIS.SCGS_PRICE_AVG",
          "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e",
          "sortType": "DEFAULT",
        },
       "MAX":{
         "chinese": "最大价格",
         "col": "null.RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MAX_SCGS_PRICE",
         "uuid": "45ce6256-e763-4632-aa19-3ea868baa993",
         "sortType": "DESC",
        },
       "MIN":{
         "chinese": "最小价格",
         "col": "null.RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MIN_SCGS_PRICE",
         "uuid": "9eaca259-9465-4666-aee8-d9e0f9da1811",
         "sortType": "ASC",
        }
    },
      tips:"新品平均价格:对应新品榜该类目下,所有新品的平均价格,根据最新爬取的new_release数据进行数值更新。",
      position:"top-start"
    },
    avgReview: {
      title: "新品平均review数",
      uuid: "79144db6-b437-402f-9022-8516853f019a",
      avg: 0,
      maxVal: 0,
      minVal: 0,
      valType: "NUMBER",
      modelID:166,
      condition:[
        {
          uuid:"c8aab938-1b81-4bac-9c84-197d88050bd7",
          chinese:"站点",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_SITE_TYPE",
          columnType: "STRING",
          val: "美站"
        },
        {
          uuid:"782e036d-f368-4a4f-91a7-4aa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_CATEGORY",
          columnType: "STRING",
          val: ""
        }
      ],
      getTypes:["AVG","MAX","MIN"],
      measures:{
        "AVG":{
          "chinese": "平均review数",
          "col": "RPT_KYLIN_AMAZON_LIPS_ANALYSIS.SCGS_REVIEW_COUNT",
          "uuid": "79144db6-b437-402f-9022-8516853f019a",
          "sortType": "DEFAULT"
        },
        "MAX":{
          "chinese": "最大review数",
          "col": "null.RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MAX_SCGS_PRICE",
          "uuid": "e1c0c559-4bf2-4388-a626-ff6086896204",
          "sortType": "DESC",
        },
        "MIN":{
          "chinese": "最小review数",
          "col": "RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MAX_REVIEW_COUNT",
          "uuid": "f4cb760e-92b8-4126-ae84-3b6f03719e00",
          "sortType": "ASC",
        }
      },
      tips:"新品平均review数:对应新品榜该类目下,所有新品的平均review数,根据最新爬取的new_release数据进行数值更新。",
      position:"top-start"
    },
    avgRate: {
      title: "新品平均评分数",
      uuid: "101c6ce8-d3dc-48b7-b115-2196f4faeba0",
      avg: 0,
      maxVal: 0,
      minVal: 0,
      valType: "NUMBER",
      modelID:166,
      condition:[
        {
          uuid:"c8aab938-1b81-4bac-9c84-197d88050bd7",
          chinese:"站点",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_SITE_TYPE",
          columnType: "STRING",
          val: "美站"
        },
        {
          uuid:"782e036d-f368-4a4f-91a7-4aa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_CATEGORY",
          columnType: "STRING",
          val: ""
        }
      ],
      getTypes:["AVG","MAX","MIN"],
      measures:{
        "AVG":{
          "chinese": "评分数",
          "col": "RPT_KYLIN_AMAZON_LIPS_ANALYSIS.SCGS_GRADE_COUNT",
          "uuid": "101c6ce8-d3dc-48b7-b115-2196f4faeba0",
          "sortType": "DEFAULT",
        },
        "MAX":{
          "chinese": "最大评分",
          "col": "null.RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MAX_GRADE_COUNT",
          "uuid": "36419334-a635-4194-9ada-0cf9c2cf3a6a",
          "sortType": "DESC",
        },
        "MIN":{
          "chinese": "最小评分",
          "col": "null.RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MIN_GRADE_COUNT",
          "uuid": "4ce64385-c4ae-4bcc-a8fd-0bede3ca59e7",
          "sortType": "ASC",
        }
      },
      tips:"新品平均评分数:对应新品榜该类目下,所有新品的平均评分数,根据最新爬取的new_release数据进行数值更新。",
      position:"top-start"
    },
    avgBSR: {
      title: "新品平均BSR排名",
      uuid: "3f355f32-d73a-4f05-aaf4-2aab44fc5a9a",
      avg: 0,
      maxVal: 0,
      minVal: 0,
      valType: "RANK",
      modelID:166,
      condition:[
        {
          uuid:"c8aab938-1b81-4bac-9c84-197d88050bd7",
          chinese:"站点",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_SITE_TYPE",
          columnType: "STRING",
          val: "美站"
        },
        {
          uuid:"782e036d-f368-4a4f-91a7-4aa93043c4e1",
          chinese:"类目",
          relation:"EQUAL",
          col: "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_CATEGORY",
          columnType: "STRING",
          val: ""
        }
      ],
      getTypes:["AVG","MAX","MIN"],
      measures:{
        "AVG":{
          "chinese": "BSR排名",
          "col": "RPT_KYLIN_AMAZON_LIPS_ANALYSIS.SCGS_BSR_RANKING",
          "uuid": "3f355f32-d73a-4f05-aaf4-2aab44fc5a9a",
          "sortType": "DEFAULT",
        },
        "MAX":{
          "chinese": "最大排名",
          "col": "null.RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MAX_BSR_RANKING",
          "uuid": "dbe8903c-2593-409e-9b82-26b212c1b0f0",
          "sortType": "DESC",
        },
        "MIN":{
          "chinese": "最小排名",
          "col": "null.RPT_KYLIN_AMAZON_LIPS_ANALYSIS.MIN_BSR_RANKING",
          "uuid": "3c36f05d-4fd1-473c-807a-d0f78a7b1d86",
           "sortType": "ASC",
        }
      },
      tips:"新品平均bsr排名:对应新品榜该类目下,取最大类目BSR排名数据，根据最新爬取的new_release数据进行数值更新。",
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
      //渗透率
      permeatedata: {
        //度量
        measures: [],
        //维度
        demesion: [],
        legend:["渗透率"],
        condition: [
          {
            uuid:"fef59aa5-556c-44a4-b5b3-280299cc4390",
            chinese:"站点",
            relation:"EQUAL",
            col: "RPT_KYLIN_AMAZON_LIPS_RATE.SCGS_SITE_TYPE",
            columnType: "STRING",
            val: "美站"
          },
          {
            uuid:"9c311849-9b4c-423c-bb6d-101378cc68f8",
            chinese:"类目",
            relation:"EQUAL",
            col: "RPT_KYLIN_AMAZON_LIPS_RATE.SCGS_CATEGORY",
            columnType: "STRING",
            val: ""
          }
        ],
        datas:{
          demesion:[],
          measures:[],
          tips:[]
        },
        type:"permeatedata",
        title:"上级类目渗透率分析",
        modelID:164,
        cid:164,
        graphType:1,
        pageSize:150,
        index:0
      },
      //评分数
      ratedata : {
        measures: [],
        demesion: [],
        condition: [
          {
            uuid:"5282975e-17b6-4e80-b9b7-865849ba9e92",
            chinese:"站点",
            relation:"EQUAL",
            col: "RPT_KYLIN_AMAZON_COUNT.SCGS_SITE_TYPE",
            columnType: "STRING",
            val: "美站"
          },
          {
            uuid:"a59d531b-140f-485d-a514-fa90d6665a47",
            chinese:"类目",
            relation:"EQUAL",
            col: "RPT_KYLIN_AMAZON_COUNT.SCGS_CATEGORY",
            columnType: "STRING",
            val: ""
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
        modelID:168,
        cid:168,
        graphType:2,
        pageSize:150,
        index:1
      },
      //亚马逊自营FBA
      FBAdata : {
        measures: [],
        demesion: [],
        condition: [
          {
            uuid:"fe9dae62-6ee7-46ed-b4e1-0509e0d1965c",
            chinese:"站点",
            relation:"EQUAL",
            col: "SCGS_SITE_TYPE",
            columnType: "STRING",
            val: "美站"
          },
          {
            uuid:"df6d98a6-565c-4eb6-99da-2ab96e9a942d",
            chinese:"类目",
            relation:"EQUAL",
            col: "SCGS_CATEGORY",
            columnType: "STRING",
            val: ""
          }

        ],
        legend:[],
        datas:{
          demesion:[],
          measures:[],
          tips:[]
        },
        type:"FBAdata",
        title:'新品榜亚马逊FBA分布',
        modelID:167,
        cid:167,
        graphType:3,
        pageSize:150,
        index:2
      },
      //价格区间
      pricedistdata : {
        measures: [],
        demesion: [],
        condition: [
          {
            uuid:"af133557-28f7-48e2-afdd-2ce6b02bead8",
            chinese:"站点",
            relation:"EQUAL",
            col: "RPT.RPT_KYLIN_AMAZON_PRICE_DIST.SCGS_SITE_TYPE",
            columnType: "STRING",
            val: "美站"
          },
          {
            uuid:"eb4d851f-7d01-4717-ad6d-6ba376a8dfc0",
            chinese:"类目",
            relation:"EQUAL",
            col: "RPT.RPT_KYLIN_AMAZON_PRICE_DIST.CATEGORY",
            columnType: "STRING",
            val: ""
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
        modelID:196,
        cid:196,
        graphType:4,
        index:3,
        pageSize:150
      },
      //品牌数Top10
      branddata : {
        measures: [],
        demesion: [],
        condition: [
          {
            uuid:"1dca3745-a0f9-4154-b657-6421d7e9c33a",
            chinese:"站点",
            relation:"EQUAL",
            col: "SCGS_SITE_TYPE",
            columnType: "STRING",
            val: "美站"
          },
          {
            uuid:"1b911ee7-3eec-432b-9220-2bafc4ac4423",
            chinese:"类目",
            relation:"EQUAL",
            col: "SCGS_CATEGORY",
            columnType: "STRING",
            val: ""
          }
        ],
        legend:["品牌数","评论数"],
        datas:{
          demesion:[],
          measures:{},
          brand:[],
          rate:[],
          tips:[],
          comments:[]
        },
        type:"branddata",
        title:"品牌数TOP10占比排行分析(评论数、品牌数)",
        modelID:165,
        cid:165,
        graphType:5,
        pageSize:10,
        index:4
      },
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
        title:"产品描述-关键词词频分析",
        graphType:6,
        modelID:195,
        cid:195,
        pageSize:1000000,
        index:5
      },
      //标题关键词频
      titlekeyworddata : {
        measures: [],
        demesion: [],
        condition: [
          {
            uuid:"1dca3745-a0f9-4154-b657-6421d7e9c33a",
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
            col: "RPT.RPT_CATEGORY_WORD_COUNT.CATEGORY",
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
        title:"产品标题-关键词词频分析",
        graphType:6,
        modelID:194,
        cid:194,
        pageSize:1000000,
        index:6
      },
      //价格区间最大最小值
      priceSession:{
        demesion:[],
        measures:[],
        condition:[
          {
            uuid:"09d089f0-b97e-47ac-929d-bbdd6aed253f",
            chinese:"站点",
            relation:"EQUAL",
            col: "RPT.RPT_KYLIN_AMAZON_PRICE_MMV.SCGS_SITE_TYPE",
            columnType: "STRING",
            val: "美站"
          },
          {
            uuid:"c3a55b14-a51a-485d-bd05-ed2e145f4d4b",
            chinese:"类目",
            relation:"EQUAL",
            col: "RPT.RPT_KYLIN_AMAZON_PRICE_MMV.CATEGORY",
            columnType: "STRING",
            val: ""
          }
        ],
        datas:{
          demesion:[],
          measures:[],
        },
        modelID:163,
        type:"priceSession",
        cid:163,
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
      //增长率
      sevenDayRate:{
        selectValue: "LARGEEQUAL",//关系
        inputVal: "0.3",
        type: "RATE",
      },
      fourteenDayRate:{
        selectValue: "LARGEEQUAL",
        inputVal:"0.3",
        type: "RATE",
      },
      thirtyDayeRate:{
        selectValue: "LARGEEQUAL",
        inputVal:"0.3",
        type: "RATE",
      },
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
        valuetype:"int",
        sortData:[]
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
      },
      asin: {
        //品牌名称
        inputVal: "",
        type:"asin"
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
    //产品名称
    productData:[],
    //列标题拆分
    columns: {},
    loadingState:{
      productloading:false,
      brandloading:false,
      bsrloading:false
    }
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
        value: 30,
        label: "30条/页"
      },
      {
        value: 60,
        label: "60条/页"
      },
      {
        value: 100,
        label: "100条/页"
      },
      {
        value: 200,
        label: "200条/页"
      }
    ],
  },
  //条件查询数据
  parmasConfig:{
    //single 表格
    query:{
      modelID:162,
      cid:162
    },
    //指标
    indicator:{
      modelID:166,
      cid:166
    },
    //列名
    column:{
      cid:162,
      modelID: 162
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

export default  list6;
