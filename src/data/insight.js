let insign={};
//类目选择
var model1={
  "factTable": "RPT.RPT_KYLIN_AMAZON_PRICE_MMV",
  "modelID":1,
  "demision": [
  {
    "addition": {
      "data": [
        ""
      ],
      "lazy": false
    },
    "chinese": "站点",
    "clo": "SCGS_SITE_TYPE",
    "dimension": true,
    "relation": [
      "EQUAL",
      "IN"
    ],
    "type": "STRING",
    "uuid": "542af110-4d5c-449f-ac0a-5919b8aa720a"
  },
  {
    "addition": {
      "data": [
        ""
      ],
      "lazy": false
    },
    "chinese": "类目",
    "column": "SCGS_CATEGORY",
    "dimension": true,
    "relation": [
      "EQUAL",
      "IN"
    ],
    "type": "STRING",
    "uuid": "995bbcdf-aa38-466f-a88e-69699493b2dc"
  }
],
  "measures": [
  {
    "addition": {
      "data": [
        ""
      ],
      "lazy": false
    },
    "aggTypes": [
      "SUM"
    ],
    "chinese": "最大",
    "column": "MAX_PRICE",
    "dimension": false,
    "relation": [
      "EQUAL",
      "IN"
    ],
    "uuid": "8d3d484c-c67c-49f8-85a0-1c07e871a25a"
  },
  {
    "addition": {
      "data": [
        ""
      ],
      "lazy": false
    },
    "aggTypes": [
      "SUM"
    ],
    "chinese": "最小",
    "column": "MIN_PRICE",
    "dimension": false,
    "relation": [
      "EQUAL",
      "IN"
    ],
    "uuid": "cf534ac5-eeb4-4db0-a7f9-2d5105636b3f"
  },
  {
    "addition": {
      "data": [
        ""
      ],
      "lazy": false
    },
    "aggTypes": [
      "SUM"
    ],
    "chinese": "平均",
    "column": "AVG_PRICE",
    "dimension": false,
    "relation": [
      "EQUAL",
      "IN"
    ],
    "uuid": "22e55b12-4cd5-41b2-b967-1c7b959d8b14"
  }
],
  "associatioConditionMap":{

}
}

var model2={
  "factTable": "RPT.RPT_KYLIN_AMAZON_LIPS_RATE",
  "modelID":2,
  "demision": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "站点",
      "col": "RPT_KYLIN_AMAZON_LIPS_RATE.SCGS_SITE_TYPE",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "fef59aa5-556c-44a4-b5b3-280299cc4390"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "类目",
      "col": "RPT_KYLIN_AMAZON_LIPS_RATE.SCGS_CATEGORY",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "9c311849-9b4c-423c-bb6d-101378cc68f8"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "类目名称",
      "col": "RPT_KYLIN_AMAZON_LIPS_RATE.CATEGORY",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "4e2f1d1e-a758-4575-a12f-7416fb410cf3"
    }
  ],
  "measures": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "产品数量",
      "col": "RPT_KYLIN_AMAZON_LIPS_RATE.NUM",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "7a9167cc-0c62-41b3-ab84-94cb0c7efef4"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "渗透率",
      "col": "RPT_KYLIN_AMAZON_LIPS_RATE.RATE",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "fde1a1e2-0205-4a25-9e01-060c6ea4ddd2"
    }
  ],
  "associatioConditionMap": {
  }
}

var model3={
  "factTable": "RPT.RPT_KYLIN_AMAZON_BRAND",
  "modelID":3,
  "demision": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "站点",
      "col": "SCGS_SITE_TYPE",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "1dca3745-a0f9-4154-b657-6421d7e9c33a"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "类目",
      "col": "SCGS_CATEGORY",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "1b911ee7-3eec-432b-9220-2bafc4ac4423"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "品牌",
      "col": "SCGS_BRAND",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "2ebc047e-2e97-4b99-9173-d95e1b448188"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "top10 名称",
      "col": "BRAND_ORDER",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "747c49ae-cf40-4dfa-ac31-eae3c477b320"
    }
  ],
  "measures": [

    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "品牌产品数",
      "col": "BRAND_NUM",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "6c56dc41-f0a0-4328-8da8-81956a5fc973"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "品牌产品占比",
      "col": "BRAND_RATE",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "3da96912-5891-44ff-bbb1-8bdd45df57fb"
    }
  ],
  "associatioConditionMap": {

  }
}

var model4={
  "factTable": "RPT.RPT_KYLIN_AMAZON_LIPS_AVG",
  "modelID":4,
    "demision": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "站点",
      "col": "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_SITE_TYPE",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "c8aab938-1b81-4bac-9c84-197d88050bd7"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "类目",
      "col": "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_CATEGORY",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "782e036d-f368-4a4f-91a7-4aa93043c4e1"
    }
  ],
    "measures": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "新品平均价格",
      "col": "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_PRICE",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "a6ed99fb-755c-4152-b0fd-6772aed3905e"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "平均veview数",
      "col": "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_REVIEW_COUNT",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "79144db6-b437-402f-9022-8516853f019a"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "评分数",
      "col": "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_GRADE_COUNT",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "101c6ce8-d3dc-48b7-b115-2196f4faeba0"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "BSR排名",
      "col": "RPT_KYLIN_AMAZON_LIPS_AVG.SCGS_BSR_RANKING",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "3f355f32-d73a-4f05-aaf4-2aab44fc5a9a"
    }
  ],
    "associatioConditionMap": {

  }
}


var model5={
  "factTable": "RPT.RPT_KYLIN_AMAZON_DIST",
  "modelID":5,
  "demision": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "站点",
      "col": "SCGS_SITE_TYPE",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "fe9dae62-6ee7-46ed-b4e1-0509e0d1965c"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "类目",
      "col": "SCGS_CATEGORY",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "df6d98a6-565c-4eb6-99da-2ab96e9a942d"
    }
  ],
  "measures": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "fba产品数",
      "col": "FBA_NUM",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "9ac32dd1-60cf-4016-a356-099e70757267"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "Amazon产品数",
      "col": "AMAZON_NUM",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "7085a3fb-1a00-42c8-b614-1ea6d8402e6b"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "fba占比",
      "col": "FBA_RATE",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "3825f867-e4d8-4789-9167-7332c33b8650"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "AMAZON_RATE",
      "col": "AMAZON_RATE",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "ade4d721-0bd2-47bc-bc06-3c9cdb2fd11a"
    }
  ],
  "associatioConditionMap": {
  }
}


var model6={
  "factTable": "RPT.RPT_KYLIN_AMAZON_LIPS_LIST",
  "modelID":7,
  "demision": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "产品图片",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_IMAGE_URL",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "415709c2-89dc-4cf3-8ff8-82b0f60660e5"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "产品名称",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_NAME",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "497755de-f9c6-431e-85ed-15f942310ffb"
    },

    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "品牌名",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_BRAND",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "e6caf6e0-5b31-43d0-891a-fafd2b25356d"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "店铺名",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_SHOP_NAME",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "9cf7c9a3-289b-48f7-932e-a80e9e5c7669"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "店铺类型",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_SHOP_Type",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "cf5a5fea-d417-4572-9559-ca5db2c27f84"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "上架时间",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_GENERATION_TIME",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "DATE",
      "uuid": "45d0d547-5051-4d3e-bcbd-fba772107932"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "BSR分类",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_BSR_CATEGORY",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "71f0c858-c813-4656-a78e-cedff7960a55"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "BSR排名",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_BSR_RANKING",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "9e1f5bad-ad47-40b7-a4e0-2919073a6954"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "亚马逊自营",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_SELLER_Type",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "498d199c-19ad-4438-b859-f6d904aef88a"
    }
  ],
  "measures": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "售价",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_PRICE",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "fd8ccade-5fca-4638-90e4-1aba6fda40cb"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "评论数",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_REVIEW_COUNT",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "a391d1d5-6e7d-4099-ad82-6ed46ba6f37c"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "评分数",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_GRADE_COUNT",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "99e0f845-5ca6-437b-a7f5-8ebbae058017"
    },

    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "跟进卖家",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_RESERVE_FIELD_6",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "d2943166-f672-4c35-8335-b7a8ceb2ac2d"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "最低售价",
      "col": "RPT_KYLIN_AMAZON_LIPS_LIST.SCGS_RESERVE_FIELD_7",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "519f5185-e190-4dc3-af94-200447a1ddab"
    }
  ],
  "associatioConditionMap": {
  }
}

var model7={
  "factTable": "RPT.RPT_KYLIN_AMAZON_COUNT",
  "modelID":7,
  "demision": [
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "站点",
      "col": "RPT_KYLIN_AMAZON_COUNT.SCGS_SITE_TYPE",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "5282975e-17b6-4e80-b9b7-865849ba9e92"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "类目",
      "col": "RPT_KYLIN_AMAZON_COUNT.SCGS_CATEGORY",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "a59d531b-140f-485d-a514-fa90d6665a47"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "类别",
      "col": "RPT_KYLIN_AMAZON_COUNT.TYPE",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "6826e74f-e513-418d-8ab3-2ccdd774b54d"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "chinese": "分区名称",
      "col": "RPT_KYLIN_AMAZON_COUNT.GRADE_NAME",
      "dimension": true,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "columnType": "STRING",
      "uuid": "5ef15f2a-088e-416f-aa13-529f3dada5f9"
    }
  ],
  "measures": [

    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "产品数量",
      "col": "RPT_KYLIN_AMAZON_COUNT.P_NUM",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "ad3f3fe1-6c29-4a6c-8be1-6382445555c5"
    },
    {
      "addition": {
        "data": [
          ""
        ],
        "lazy": false
      },
      "aggTypes": [
        "SUM"
      ],
      "chinese": "占比",
      "col": "RPT_KYLIN_AMAZON_COUNT.P_RATE",
      "dimension": false,
      "relation": [
        "EQUAL",
        "IN"
      ],
      "uuid": "6cfece11-e792-4f9d-9bd5-1ccf58c3e01a"
    }
  ],
  "associatioConditionMap": {
  }
}

columnMetas=[];

columnMetas.push(model1);

columnMetas.push(model2);

columnMetas.push(model3);

columnMetas.push(model4);

columnMetas.push(model5);

columnMetas.push(model6);

columnMetas.push(model7);

//新品指标看板
let  databoardTarget={
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
        ]
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
        ]
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
        ]
    },
    avgBSR: {
      title: "新品平均BSR排名",
      uuid: "3f355f32-d73a-4f05-aaf4-2aab44fc5a9a",
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
        ]
    }
};

insign.databoardTarget=databoardTarget;


export default insign;
