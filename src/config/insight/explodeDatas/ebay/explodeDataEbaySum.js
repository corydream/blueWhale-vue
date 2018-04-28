let list5={
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
  //表格数据
  tableDatas:{
    //表格控件查询条件
    queryData: {
      //产品名称
      product: {
        //产品名称
        inputVal: ''
      },
      //货币
      sellingPricesCode:{
        inputVal: "",
        type:"price"
      },
      //售价
      sellingPrices: {
        selectValue: "LARGEEQUAL",
        inputVal: "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"float"
      },
      //品牌名称
      brand: {
        //品牌名称
        inputVal: "",
        type:"Brand"
      },
      //库存
      stock: {
        selectValue: "LARGEEQUAL",//关系
        inputVal: "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"int"
      },
      //原价
      originalPrices: {
        selectValue: "LARGEEQUAL",
        inputVal: "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"float"
      },
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
      //销量
      sales: {
        selectValue: "LARGEEQUAL",
        inputVal:  "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"int"
      },
      //上架时间
      time: {
        inputVal: "",
        type: "DATE"
      },
      //评论数
      comments: {
        selectValue: "LARGEEQUAL",
        inputVal:  "",
        showSession: false,
        session: {
          sessionLeft: "",
          sessionRight: ""
        },
        valuetype:"int"
      },
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
    //品牌数
    brandCount:"",
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
      modelID:521,
      cid:521
    },
    //指标
    indicator:{
      modelID:219,
      cid:219
    },
    //列名
    column:{
      cid:521,
      modelID: 521
    },
    //品牌数
    brandCount:{
      cid:229,
      modelID: 229
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
export default  list5;
