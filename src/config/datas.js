//let extendJosn={
//    width:128,
//    itemAry:['19','98','98','98','98','19','98','98','98','98','19','98','98','98','98','19','98','98','98','98'],
//    summary:parseInt(8288*Math.random()),
//    chinese:'',
//};
let originalData={

};

let datas = {
    delTarget:false, //是否点击删除
    saveTarget: true,
    tempSelectPage:[], //存放分页选择数据
    dateCompare:{}, //存储同比日期
    perData:false,
    disData:false,
    addLazy:false, //50条判定是否发送接口
    boardDrag:true, //判断是否是编辑看板
    folderLock:false, //判定是否重复点击的锁
    showdrag:false,
    chartFirstStep:true, //判断是否是初始化进入
    moduleTypeId:'',//模块id
    chartType:0, //图标类型
    createGraphOpen:false,
    echartType:false,
    echartTableData:[],
    tableIndex:null,//当前点击的表格的list
    showOuterBorder:false,
    isLoadingShow:false,//判断是否显示loading
    columnCheck:true, //列总计是否选中
    saveKylinInfo:{},
    frames:'',//保存iframe弹出框信息
    autoSave:false,// 判定是否保存成功更新信息字段
    getDataAllInfos:[],
    getDataOriginalInfos:[], //未经首页处理的原始数据
    getDataInfos:{},
    pageRequestDatas:null,
    userInfo: {},//用户信息
    drillRecordLayerAry: [],
    drillLayer: [],
    drillIndex: 0,
    requestCid: null,
    tableUid : 0,
    queryInfo :{
        avgType: null
    },
    tableFootTotalAry:[],
    drillNavData:[],//表格钻取导航
    drillDownData:[],//编辑页钻取列表
    conditionMap: {},
    requestName:null,
    requestProject: null,
    aggregationCondition: {},
    aggregationConditionDim: {},
    aggregationConditionNum: {},
    currentDrillDownUuid: null,
    drillNavData:[],//表格钻取导航
    drillDwonIndex:null,
    aggCount: "SUM",
    sortordText: "DEFAULT",
    currentNumUuid: null,//记录当前下拉点击的是哪个数值的字段
    currentDimUuid: null,//记录当前下拉点击的是哪个维度的字段
    drawBackUuid: null,
    showDrillBack: false,
    showDrillDown: false,
    drillAction:false,//钻取是否显示
    isDrill:false,//记录表格第一列是否可点击
    similarOpts:{},// 存储点击同比弹框的下拉字段
    myChartOption:{
        line:{
            showX:true,
            showY:true,
            showTag:true,
            showTooltip:true,
            showLegend:true,
            showSmooth:false,
            showLine:true,
            showArea:false,
            name:''
        },
        bar:{
            showX:true,
            showY:true,
            showTag:true,
            showTooltip:true,
            showLegend:true,
            showBar:true,
            showReverseBar:false,
            showStackedPlot:false,
            showReverseStackedPlot:false,
            name:''
        },
        pie:{
            showX:false,
            showY:false,
            showTag:true,
            showTooltip:true,
            showLegend:true,
            showRadius:false,
            showPie:true,
            showEntries:null,
        },
        radarMap:{
            showX:false,
            showY:false,
            showTag:false,
            showTooltip:true,
            showLegend:true,
        }
    },
    loadingShow:false,//是否显示加载中
    editTableSumwidth:0,//表格总宽度
    searchFieldListShow:false,
    //recodeHeadDimensionData:null,//记录要设置的数据
    /*drillDataTimerOver:null,//下拉时鼠标经过防止超过堆栈
    drillDataTimerOut:null,//下拉时鼠标移出防止超过堆栈*/
    project:null,
    cid:140,
    winHeight:0,
    screenWidth:0,
    leftModalDataAry:null,//编辑页左侧数据模型下拉数据
    rightNumberDatas:{//数据筛number数据20170912094
        defaultSelect:0,
        isSelectNumber:false
    },
    rightDateDatas:{//数据筛date数据20170912094
        begin:'',
        end:''
    }

    ,
    rightStringSearchKey:null,//string类型 搜索关键字 Modal key
    rightStringRadio:2,
    rightStringDatas:[//数据筛选string数据201709120940

    ],
    tableRequestObject:null,//存储编辑页当前表格请求的数据
    tableCalculateData:{//表格计算数据
        totalColumnAll:false,
        totalChartAll:false,
        totalColumns:[//列总计
            /*{
             uuid:"uuid",
             name:'库存量',
             options:[
             {
             name:"列总数",
             value:"SUM"
             },{
             name:"列平均数",
             value:"AVG"
             },{
             name:"列最大值",
             value:"MAX"
             },{
             name:"列最小值",
             value:"MIN"
             }
             ]
             }*/
        ],

    },
    reportInfo:{
        reportName:{
            title:'报表名称',
            text:'Amazon销量统计报表'
        },
        reportNote:{
            title:'报表备注',
            text:'“产品订单数”是针对产品统计，”销售人员订单数“ 是针对产品经理和销售人员统计的，两种统计结果不一样'
        },
    },
    rihgtActiveIndex:"0-0",//记录右侧当前活动的li索引
    conditeSearchValue:'',//数据模型搜索关键字
    divScrollTop:2,//table滚动距离
    divScrollTopTotal:[{
    }],
    toPageTimer:null,
    timeIndex:0,
    grayImgIndex:0,
    containsFields:0,//记录STRING modal左侧checkbox选择了几个
    containsFieldsAry:[],//存储STRING modal左侧checkbox已选择的索引
    isSelectNumber:false,
    rightListConditions:{
        conditions:[]//右侧已选择条件的数据
    },
    saveReportHref:'wd=百度',//保存报表跳转地址的 参数
    dragIdsAry:{
        dimIdsAry:[],
        numIdsAry:[],
    },
    rightLiAry:{
        dimLiAry:[],
        numLiAry:[],
    },
    editListTotalPages:[],
    editListPages:{
        oldCurrentPage:1,
        currentPage:1,
        pageSize:20,
        sumPage:6,
        lastPage:false
    },
    displayScreen:[//首页显示筛选项
        /*{
            name:'',
            isChecked:true
        },{
            name:'',
            isChecked:true
        }*/
    ],
    showModalData:{//存放modal页面的数据
        LIST:[
            /*{
                uuid:1,
            }*/
        ],
        MULTILIST:[
            /*{
                uuid:1,
            }*/
        ],
        NUMBER:[
            /*{
                uuid:1,
                modalTitle:"销售数量",
                relation:[
                    "EQUAL",
                    "IN",
                    "NOTQUAL"
                ],
                isSelectNumber:false,
                minNumber:null,
                maxNumber:null,
                enterNumbers:null,
                selectRelation:null
            }*/
        ],
        DATE:[
            /*{
                uuid:1,
                modalTitle:"自定义时间范围",
            }*/
        ],
        DATETIME:[
            /*{
             uuid:1,
             modalTitle:"自定义时间范围",
             }*/
        ],
        STRING:[
            /*{
                uuid:1,
                modalTitle:"Amazon经理",
                rightRelationName:'包含',
                selectRelation:'EQUAL',
                stringList:[
                    {
                        ischecked:false,
                        isShow:true,
                        name:"王盈"
                    }
                ],
                totalData:38936,
            }*/
        ]
    },
    dimensionListAry:[//存放左侧 维度 列表数据
        {
            "addition": {
                "lazy": true,
                "url": "192.168.17.48",
                "data": [
                    "广州"
                ],
            },
            "chinese": "Amazon经理",
            "column": "Amazon",
            "dimension": true,
            "relation": [
                "EQUAL",
                "IN",
                "NOTQUAL"
            ],
            "type": "STRING",
            "uuid": "22530f4f-d52a-4236-8801-c29e5dd4bec8"
        },{
            "addition": {
                "data": [
                    "今天",
                    "昨天",
                    "最近7天",
                    "最近14天",
                    "最近30天",
                    "最近半年",
                    "自定义时间区间"
                ],
            },
            "chinese": "入库日期",
            "column": "date",
            "dimension": true,
            "relation": [
                "EQUAL",
                "LARGE",
                "LARGEEQUAL",
                "LESSEQUAL",
                "LESS"
            ],
            "type": "DATE",
            "uuid": "05f83a11-832a-4a45-a35a-838c51d68127"
        },{
            "addition": {
                "data": [
                    "广州",
                    "上海"
                ],
                "lazy": false
            },
            "chinese": "城市",
            "column": "city",
            "dimension": true,
            "relation": [
                "EQUAL",
                "NOTQUAL"
            ],
            "type": "LIST",
            "uuid": "13ab372d-a9ac-4b4f-b96a-bbeb94c78629"
        },{
            "addition": {
                "data": [
                    "apple 6"
                ],
                "lazy": false
            },
            "chinese": "产品名称",
            "column": "product",
            "dimension": true,
            "relation": [
                "IN"
            ],
            "type": "MULTILIST",
            "uuid": "e7191d74-cd34-4c23-855e-be8efc0a1cd8"
        },{
            "addition": {
                "data": [
                    "FAB",
                    "FBA"
                ],
                "lazy": false
            },
            "chinese": "销售员",
            "column": "salesperson",
            "dimension": true,
            "relation": [
                "IN",
                "EQUAL"
            ],
            "type": "MULTILIST",
            "uuid": "a481d7f1-b397-4f2a-b5c8-9262e7f18450"
        },{
            "addition": {
                "data": [
                    "A",
                    "B"
                ],
                "lazy": false
            },
            "chinese": "店铺",
            "column": "store",
            "dimension": true,
            "relation": [

            ],
            "type": "MULTILIST",
            "uuid": "e7a9122c-50e5-4ec5-a61d-c1137960a371"
        },{
            "addition":{
                "data": [
                    "成都"
                ],
            },
            "chinese": "SUK",
            "column": "SKU",
            "dimension": true,
            "relation": [
                "IN",
                "EQUAL"
            ],
            "type": "STRING",
            "uuid": "42361f82-8119-49a1-af82-543f69524fd7"
        },{
            "addition":{
                "data": [
                    "西安",
                    "成都"
                ],
            },
            "chinese": "POA",
            "column": "POA",
            "dimension": true,
            "relation": [
                "IN",
                "EQUAL"
            ],
            "type": "STRING",
            "uuid": "c80344d7-4bae-4cfd-b893-4b2624487bb3"
        },{
            "addition": {
                "data": [
                    "刘佳丽"
                ],
                "lazy": false
            },
            "chinese": "用户名",
            "column": "user",
            "dimension": true,
            "relation": [
                "IN",
                "EQUAL"
            ],
            "type": "STRING",
            "uuid": "2b3eb7e0-8541-4bfc-8fb3-e243f1f87b2e"
        }
    ],
    numericalListAry:[//存放左侧 数值 列表数据
        {
            "addition":{
                "data": [
                    "西安"
                ],
            },
            "aggTypes": [
                "SUM",
                "MAX"
            ],
            "chinese": "订单量",
            "column": "num",
            "dimension": false,
            "relation": [
                "EQUAL",
                "LARGE",
                "LARGEEQUAL",
                "LESSEQUAL",
                "LESS"
            ],
            "type": "NUMBER",
            "uuid": "a38a5790-cd70-45df-9ec2-4f7c6b5e4d57"
        },
        {
            "addition": {
                "data": [
                    "FAB",
                    "FBA"
                ],
                "lazy": true,
                "url": "192.168.15.48"
            },
            "chinese": "订单类型",
            "column": "orderType",
            "dimension": false,
            "relation": [
                "IN",
                "EQUAL"
            ],
            "type": "MULTILIST",
            "uuid": "ee1bdbe1-22e7-422c-bcca-fd189a6ca8ab"
        },
        {
            "addition":{
                "data": [
                    "北京"
                ],
            },
            "aggTypes": [
                "SUM",
                "MAX"
            ],
            "chinese": "销售数量",
            "column": "salesVolumes",
            "dimension": false,
            "relation": [
                "LARGE",
                "LESS",
                "LESSEQUAL",
                "LARGEEQUAL"
            ],
            "type": "NUMBER",
            "uuid": "b14a84d6-4609-45c7-8a3d-be16c1b084c9"
        },
        {
            "addition":{
                "data": [
                    "深圳"
                ],
            },
            "aggTypes": [
                "COUNT"
            ],
            "chinese": "标签",
            "column": "label",
            "dimension": false,
            "relation": [
                "EQUAL",
                "IN"
            ],
            "type": "STRING",
            "uuid": "93a8ec5b-812d-4f1a-af1b-2c57aab2c6d4"
        },
        {
            "addition":{
                "data": [
                    "上海"
                ],
            },
            "aggTypes": [
                "COUNT"
            ],
            "chinese": "库存",
            "column": "stock",
            "dimension": false,
            "relation": [
                "EQUAL",
                "IN"
            ],
            "type": "NUMBER",
            "uuid": "c9c4a7a2-4200-4d54-9ba3-1b7e4d0c1b00"
        },
        {
            "addition":{
                "data": [
                    "北京"
                ],
            },
            "aggTypes": [
                "COUNT",
                "SUM",
                "MAX"
            ],
            "chinese": "订单数",
            "column": "orderAmount",
            "dimension": false,
            "relation": [
                "LARGE",
                "LESS",
                "LESSEQUAL",
                "LARGEEQUAL"
            ],
            "type": "NUMBER",
            "uuid": "c689aff1-eaea-467e-9213-a77255f39a7c"
        }
    ],
    dimensionDragAry:[
        {
            name: 'dimAdvanced',
            pull: 'clone',
            put: true
        },{
            name: 'dimAdvanced',
            pull: false,
            put: true
        },{
            name: 'dimAdvanced',
            pull: false,
            put: true
        },
        {
            name: 'dimAdvanced',
            pull: false,
            put: true
        }
    ],
    numericalDragAry:[
        {
            name: 'numAdvanced',
            pull: 'clone',
            put: true
        },{
            name: 'numAdvanced',
            pull: false,
            put: true
        }
    ],
    editTableDimData:[

    ],
    editTableNumData:[

    ],
    editTableSumData:{},
    getAllTableDatas:[],
    // editTableSumDataTotal:[],
    showStyle:[{
            src: require('../assets/images/form-1.png'),
            srcActive:require('../assets/images/form-active-1.png'),
            active:true
        },
        {
            src: require('../assets/images/form-2.png'),
            srcActive:require('../assets/images/form-active-2.png'),
            active:false
        },
        {
            src: require('../assets/images/form-3.png'),
            srcActive:require('../assets/images/form-active-3.png'),
            active:false
        },
        {
            src: require('../assets/images/form-4.png'),
            srcActive:require('../assets/images/form-active-4.png'),
            active:false
        },
        {
            src: require('../assets/images/form-16.png'),
            srcActive:require('../assets/images/form-active-16.png'),
            active:false
        },
        {
            src: require('../assets/images/form-18.png'),
            srcActive:require('../assets/images/form-active-18.png'),
            active:false
        },
        // {
        //     src: require('../assets/images/form-17.png'),
        //     srcActive:require('../assets/images/form-active-17.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-7.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-8.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-9.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-10.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-11.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-12.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-13.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-14.png'),
        //     active:false
        // },
        // {
        //     src: require('../assets/images/form-15.png'),
        //     active:false
        // },

    ],
};
/*----------------------------------------------------------- 显示页报表页面数据 ------------------------------------------------------------------*/
let showReportDatas={
        winHeight:0,
        screenWidth:0,
        reportId:null,
        loadingShow:false,
        saveReportHref:'',//导出数据的地址参数
        pageSendConditionsData:null,//翻页时所要传送的条件
        searchTopData:null,//显示页搜索栏的数据
        reportInfo:{
            reportName:{
                title:'报表名称',
                text:'Amazon销量统计报表'
            },
            reportNote:{
                title:'报表备注',
                text:'“产品订单数”是针对产品统计，”销售人员订单数“ 是针对产品经理和销售人员统计的，两种统计结果不一样'
            },
        },
        searchBarData:{
            DATE:[
                {
                    uuid:null,
                    col:null,
                    isShow:false,
                    beginDate:null,
                    endDate:null
                }
            ],
            DATETIME:[
                {
                    uuid:null,
                    col:null,
                    isShow:false,
                    beginDate:null,
                    endDate:null
                }
            ],
            STRING:[
                {
                    uuid:null,
                    col:null,
                    checkedAll:false,
                    isActive:false,
                    isShow:false,
                    name:null,
                    searchKeyWord:null,
                    stringList:null
                }
            ],
            NUMBER:[
                {
                    uuid:null,
                    col:null,
                    isSelectNumber:true,
                    isShow:false,
                    name:null,
                    minNumber:null,
                    maxNumber:null,
                    enterNumbers:null,
                    selectRelation:null
                }
            ],
            showPageConditions:[]
        },
        divScrollTop:2,//滚动条滚动距离
        editListPages:{//翻页信息
            oldCurrentPage:1,
            currentPage:1,
            pageSize:20,
            sumPage:6
        },
        displayScreen:null,//首页显示筛选项数据
		    showReportTableDatas:[
		  {//显示页表格数据
            "summary": 3706,
            "chinese": "订单交易类型",
            "itemAry": ["Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction", "Auction"],
            "width": 128,
            "uuid": "ee9aaf66-052f-4cf7-b08e-8a693fb10478"
        }, {
            "summary": 4562,
            "chinese": "用户id",
            "itemAry": ["MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER", "MODELER"],
            "width": 128,
            "uuid": "2780ec43-5b73-4d62-9043-2344bd8727e2"
        }, {
            "summary": 484,
            "chinese": "日期",
            "itemAry": ["2012-01-04", "2012-01-03", "2012-01-06", "2012-01-08", "2012-01-07", "2012-01-11", "2012-01-14", "2012-01-13", "2012-01-15", "2012-01-18", "2012-01-22", "2012-01-24", "2012-01-25", "2012-01-28", "2012-01-31", "2012-02-03", "2012-02-05", "2012-02-07", "2012-02-06", "2012-02-09", "2012-02-08", "2012-02-11", "2012-02-13", "2012-02-14", "2012-02-17", "2012-02-16", "2012-02-19", "2012-02-18", "2012-02-21", "2012-02-20", "2012-02-23", "2012-02-22", "2012-02-25", "2012-02-27", "2012-02-28", "2012-03-02", "2012-03-01", "2012-03-04", "2012-03-03", "2012-03-05"],
            "width": 128,
            "uuid": "96fd1c93-7ad8-4e92-8bc1-292bf046aa10"
        }],
        searchCriteria:{//编辑页 “数据筛选” 已筛选的数据
                STRING:{
                    uuid:null,
                    relation:null,
                    conditions:[],
                },
                NUMBER:{
                    uuid:null,
                    relation:null,
                    val:null,
                    conditions:[],
                },
                DATE:{
                    uuid:null,
                    beginDate:null,
                    endDate:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
                    conditions:[]
                }
        },
};
let indexDatas = {
	winHeight:0,
	screenWidth:0,
	divScrollTop:2,//table滚动距离
	loadingShow:false,//是否显示加载中
	globalDataNull:true,
	saveReportHref:null,//每个报表的查询条件
	leftReportNameList:[],
	leftListActiveIndex:0,//左侧当前活动索引
	indexTabelDatas:[

	],
	editListPages:{
		oldCurrentPage:1,
		currentPage:1,
		pageSize:20,
		sumPage:6
	}
};

export default datas = {
    originalData,
    datas,
    showReportDatas,
    indexDatas
}


