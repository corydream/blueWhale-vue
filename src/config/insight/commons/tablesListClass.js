//通用方法
import commonUtil from "./insightCommon";
import Model from "./dataHelper";
import tablePortHelper from "./tabledataPort";
// 等同于
export default {
    TableItem : null,
    platform : null,
    initSortState : [],
    collectBtnsActive :"tab1",
    _vue : null,
    _this : null,
    firstTime : true,
    totalNumber : 0,
    isFirstBsr : true,
    lock : false,
    links : [],
    pageBean : null,
    isPage : false,
    isToOA:true,
  /*表格数据初始化*/
  getDatas(data) {
    this.TableItem = data.TableItem;
    this.platform = data.platform;
    this._vue = data._vue;
    this._this = data._this;
    this.initSortState = data.initSortState;
    this.pageBean = data.pageBean;
    this.collectBtnsActive = "tab1";
  },

  //加载页面
  pageLoaded() {
    this.setAllStateClear();//重置所有状态
    this.getColumn(() => {
      this.createdData();
    }); //获取列名
  },

  //重置所有状态
  setAllStateClear() {
    this.TableItem.initCondition.type = "all";
    this.TableItem.initCondition.isPage = false;
    this.TableItem.initCondition.isCategory = false;
    this.TableItem.pageBean.currentPage = 1;
    this.TableItem.pageBean.oldPage = 1;
    this.firstTime = true;
    this.isFirstBsr = true;
    this.totalNumber = 0;
    this.lock = false;
  },

  //搜索框重置
  clearAll() {
    for (var key in this.TableItem.tableContainer.queryData) {
      let obj = this.TableItem.tableContainer.queryData[key];
      if (obj.type && obj.type == "ARRAY") {
        //卖家类型
        obj.inputVal.splice(0, obj.inputVal.length);
      } else if (obj.type && obj.type == "BSR") {
        if (this.TableItem.tableContainer.sortData.length > 0) {
          this._vue.$set(obj, "inputVal", this.TableItem.tableContainer.sortData[0].value)
        } else {
          this._vue.$set(obj, "inputVal", "");
        }
      } else {
        if (obj.type == "INTNumber") {
          this._vue.$set(obj, "inputVal", [0, 100]);
        } else if (obj.type == "INTNumber2") {
          this._vue.$set(obj, "inputVal", [0, 90]);
        } else if (obj.type == "INTNumber3") {
          this._vue.$set(obj, "inputVal", 0);
        } else {
          if (obj.type != "RATE") {
            this._vue.$set(obj, "inputVal", "");
          }
        }
        if (obj.showSession) {
          //区间
          this._vue.$set(obj.session, "sessionLeft", 0);
          this._vue.$set(obj.session, "sessionRight", 0);
          this._vue.$set(obj, "showSession", false);
        }
        if (obj.selectValue && obj.selectValue.length != 0) {
          this._vue.$set(obj, "selectValue", "LARGEEQUAL");
        }
      }
    }
  },

  //初始化表格
  createdData() {
    //重置搜索条件
    this.clearAll();
    //初始化表格
    this.getSortAble((res) => {
      this.setTableData(res);
    });
    //绑定控件
    this.setControllers();
    //配置表格
    this.initData();
    if(this.TableItem.showNewColumn=="name1") {
      this.getBSRcategory();
    }
  },

  //获取列名
  getColumn(success) {
    //获取表格的标题
    let _this = this;
    let modelId = this.TableItem.parmasConfig.column.modelID;
    if (this.collectBtnsActive == "tab3") {
      modelId = "504";
    }

    this.TableItem.tableContainer.columns = {};
    //新品
    //爆品
    if(window.sessionStorage.getItem(modelId)){
      this.TableItem.tableContainer.columns=JSON.parse(window.sessionStorage.getItem(modelId));
      success && success();
    }else{
      commonUtil.queryData({
        url: "/auth/get/column",
        async: true,
        queryParams: {cid: modelId},
        callback: (res) => {
          _this.TableItem.tableContainer.columns = Model.getListTitle(res.data);
          //做缓存
          if(this.TableItem.tableContainer.columns){
            window.sessionStorage.setItem(modelId,JSON.stringify(this.TableItem.tableContainer.columns));
          }
          success && success();
        }
      })
    }
  },

  //表格数据初始化
  initData() {
    //measure
    commonUtil.clearArray(this.TableItem.initCondition.measures);
    commonUtil.clearArray(this.TableItem.initCondition.demesion);
    commonUtil.clearArray(this.TableItem.initCondition.condition);
    this.TableItem.tableContainer.columns.messures.forEach((item, index) => {
      let sortType = "DEFAULT";
      this.TableItem.initCondition.measures.push({
        "col": item.col,
        "agg": item.agg[0],//聚合方式
        "sortType": sortType,
        "chinese": item.chinese,//列表
        "uuid": item.uuid
      })
    })
    //demession
    this.TableItem.tableContainer.columns.demesion.forEach((item, index) => {
      let sortType = "DEFAULT";
      if (this.TableItem.showNewColumn == "name1") {
        if (item.chinese == "BSR排名") {
          sortType = "ASC"
        }
      }
      if (item.chinese == "增长度") {
        sortType = "DESC";
      }
      this.TableItem.initCondition.demesion.push({
        "col": item.col,
        "sortType": sortType,
        "chinese": item.chinese,
        "isMaxMin": false,
        "uuid": item.uuid
      })
    });
    this.TableItem.initCondition.extra = this.TableItem.tableContainer.columns.extra;
    if (this.TableItem.showNewColumn == "name3") {
      //重新加载all类目
      // this.defaultBsrVal(()=>{});
      this.searchsBoxData();
    } else {
      this.mockTableData();
      //获取品牌数
      if (this.TableItem.type === "explode") {
        this.getBrandCount();
      }
    }
    // this.mockTableData();
    // //获取品牌数
    // if(this.TableItem.type==="explode"){this.getBrandCount();}
  },
  //表格搜索
  searchsBoxData(currentType){
    let conditions = {
      demesion: [],
      measures: [],
      conditions: []
    };
    //配置表格控件查询条件
    for (let key in this.TableItem.tableContainer.queryData) {
      let obj = this.TableItem.tableContainer.queryData[key];
      //判断字段是否要发送
      //判断是否是有区间
      if (obj.hasOwnProperty("showSession")) {
        //选择了区间发送
        if (obj.showSession) {
          let objSend = {
            left: {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "LARGEEQUAL", //>=
              "val": obj.session.sessionLeft
            },
            right: {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "LESSEQUAL", //>=
              "val": obj.session.sessionRight
            }
          }
          conditions.conditions.push(objSend.left);
          conditions.conditions.push(objSend.right);
        } else {
          //没有区间正常发送
          //正常类型
          let objSendSession = {
            "col": obj.col,
            "chinese": obj.chinese,
            "uuid": obj.uuid,
            "columnType": obj.columnType ? obj.columnType : "",
            "relation": obj.selectValue,
            "val": obj.inputVal
          }
          conditions.conditions.push(objSendSession);
        }
      } else {
        if (obj.inputVal !== "" && obj.inputVal.length != 0) {
          if (obj.type === "DATE") {
            //日期
            if(obj.inputVal[0]&&obj.inputVal[1]){
              let objSend = {
                left: {
                  "col": obj.col,
                  "chinese": obj.chinese,
                  "uuid": obj.uuid,
                  "columnType": obj.columnType ? obj.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[0], "yyyy-MM-dd"),
                },
                right: {
                  "col": obj.col,
                  "chinese": obj.chinese,
                  "uuid": obj.uuid,
                  "columnType": obj.columnType ? obj.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[1], "yyyy-MM-dd")
                }
              }
              conditions.conditions.push(objSend.left);
              conditions.conditions.push(objSend.right);
            }
          } else if (obj.type === "ARRAY") {
            //卖家类型
            if (obj.inputVal.length == 1) {//只需传一个
              let objSend = {
                "col": obj.col,
                "chinese": obj.chinese,
                "uuid": obj.uuid,
                "columnType": obj.columnType ? obj.columnType : "",
                "relation": "EQUAL",
                "val": obj.inputVal[0]==='是'?'yes':'no'
              }
              conditions.conditions.push(objSend);
            }
          } else {
            if(obj.type !== "BSR"){
              //BSR分类不用发
              if(obj.type!="RATE"){
                if(obj.type=="INTNumber"||obj.type=="INTNumber2"){
                  let val1="";
                  let val2="";
                  let col1=obj.col;
                  let col2=obj.col;
                  switch(obj.type){
                    case "INTNumber":
                      val1=obj.inputVal[0]/100;
                      val2=obj.inputVal[1]/100;
                      col1="$repl$largeR";
                      col2="$repl$lessrR";
                      break;
                    case "INTNumber2":
                      val1=obj.inputVal[0];
                      val2=obj.inputVal[1];
                      col1="$repl$largeAngle";
                      col2="$repl$lessAngle";
                      break;
                  }
                  let objSend = {
                    left: {
                      "col": col1,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LARGEEQUAL", //>=
                      "val": val1
                    },
                    right: {
                      "col": col2,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LESSEQUAL", //>=
                      "val":val2
                    }
                  }
                  conditions.conditions.push(objSend.left);
                  conditions.conditions.push(objSend.right);
                }else{
                  let objSend = {
                    "col": obj.col,
                    "chinese": obj.chinese,
                    "uuid": obj.uuid,
                    "columnType": obj.columnType ? obj.columnType : "",
                    "relation": "EQUAL",
                    "val": obj.inputVal
                  }
                  conditions.conditions.push(objSend);
                }
              }
            }
          }
        }else{
          if(obj.type==="increment"&&obj.inputVal==""){
            let objSend = {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "EQUAL",
              "val": 99999999
            }
            conditions.conditions.push(objSend);
          }
        }
      }
    }
    //发送请求
    this._vue.$set(this.TableItem.initCondition,"condition",conditions.conditions);
    this._vue.$set(this.TableItem.initCondition, "type", "part");
    this._vue.$set(this.TableItem.initCondition, "isCategory",currentType?currentType:false);
    this.mockTableData();
  },
  //新爆品汇总推荐类型区分
  getCurrentState() {
    let typeState = "";
    if (this.TableItem.type == "explode") {
      if (this.TableItem.showNewColumn == "name1") {
        switch (this.collectBtnsActive) {
          case "tab1":
            typeState = 40;
            break;
          case "tab2":
            typeState = 41;
            break;
          case "tab3":
            typeState = 42;
            break;
        }

      } else if (this.TableItem.showNewColumn == "name4") {
        switch (this.collectBtnsActive) {
          case "tab1":
            typeState = 43;
            break;
          case "tab2":
            typeState = 44;
            break;
          case "tab3":
            typeState = 45;
            break;
        }
      } else if (this.TableItem.showNewColumn == "name3") {
        switch (this.collectBtnsActive) {
          case "tab1":
            typeState = 46;
            break;
          case "tab2":
            typeState = 47;
            break;
          case "tab3":
            typeState = 48;
            break;
        }
      }
    } else {
      //新品
      if (this.TableItem.showNewColumn == "name1") {
        switch (this.collectBtnsActive) {
          case "tab1":
            typeState = 49;
            break;
          case "tab2":
            typeState = 50;
            break;
          case "tab3":
            typeState = 51;
            break;
        }
      } else if (this.TableItem.showNewColumn == "name4") {
        switch (this.collectBtnsActive) {
          case "tab1":
            typeState = 52;
            break;
          case "tab2":
            typeState = 53;
            break;
          case "tab3":
            typeState = 54;
            break;
        }

      } else if (this.TableItem.showNewColumn == "name3") {
        switch (this.collectBtnsActive) {
          case "tab1":
            typeState = 55
            break;
          case "tab2":
            typeState = 56
            break;
          case "tab3":
            typeState = 57
            break;
        }

      }
    }
    return typeState;
  },

  /*--------表格列数据渲染-----------*/

  //获取表格列样式数据
  getSortAble(success) {
    let typeState = this.getCurrentState();
    commonUtil.queryData({
      url: "/di/common/get/colunmOrder",
      queryParams: {
        paramName: "列显示状态" + this.platform,
        type: typeState,
      },
      callback: (res) => {
        if (res.data) {
          success && success(JSON.parse(res.data));
        } else {
          //返回空
          success && success([])
        }
      }
    })
  },

  //列渲染样式
  setTableData(columns = []) {
    //设置每个图表的筛选条件
    commonUtil.clearArray(this.TableItem.tableContainer.tableColumns);
    commonUtil.clearArray(this.initSortState);
    commonUtil.clearArray(this._vue.columns);
    let columnTitle = this.TableItem.tableContainer.columns.demesion.concat(this.TableItem.tableContainer.columns.messures);
    if (columns.length > 0) {
      this.TableItem.tableContainer.tableColumns = this.setTableRender(columns, this._vue, columnTitle);
      this._vue.columns = this.initRenderTable(columnTitle, this.TableItem.showNewColumn, this._vue);
      this._vue.columns.forEach((item) => {
        item.isSelect = false;
        this.TableItem.tableContainer.tableColumns.forEach((row) => {
          if (row.key == item.key) {
            item.isSelect = true;
          }
        })
      })
    } else {
      this.TableItem.tableContainer.tableColumns = this.initRenderTable(columnTitle, this.TableItem.showNewColumn, this._vue);
      this.TableItem.tableContainer.tableColumns.forEach((itemObj, index) => {
        this._vue.columns.push(itemObj);
      })
    }
    this._vue.columns.forEach((columns) => {
      this.initSortState.push({
        key: columns.key,
        isSelect: columns.isSelect
      });
    })
  },

  //绑定控件
  setControllers() {
    let columnTitle = this.TableItem.tableContainer.columns.demesion.concat(this.TableItem.tableContainer.columns.messures);
    columnTitle.forEach((item) => {
      this.setControls(item.chinese, item, this.TableItem.tableContainer.queryData);
    })
  },

  //表格行render设置
  setTableRender(columns, vue, columnTitle) {
    //设置每个图表的筛选条件
    let currentShowColumns = [];
    let linkKey = commonUtil.getUUID("产品链接", columnTitle);
    let currency = commonUtil.getUUID("货币", columnTitle);
    let bsrCatrgoryUUid = commonUtil.getUUID("子类目及BSR排名", columnTitle);
    let asinNumber = commonUtil.getUUID("ASIN", columnTitle);
    columns.forEach((item, index) => {
      let tempObj = {
        title: item.title,
        key: item.key,
        sortable: item.sortable,
        isSelect: item.isSelect,
        fixed: item.fixed ? item.fixed : "",
        align: item.align ? item.align : "",
        className: item.className ? item.className : "",
        render: null
      };
      if (item.title === "产品图片") {
        tempObj.width=200
        tempObj.render = (h, params) => {
          return h('a', {
            attrs: {
              style: 'width: 200px;height:140px;display:table-cell;vertical-align:middle;border-radius: 6px;background:#fff;text-align: center',
              class: "tablePicImg",
              href: linkKey ? params.row[linkKey] : "javascript:;",
              target: "_blank"
            }
          }, [
            h('img', {
              attrs: {
                'src':params.row[params.column.key],
                style: 'display:block;max-width:100%;max-height:100%;margin:0 auto;',
                class: "myBigImage"
              },
              style: {},
              on: {
                mouseover: (event)=>{
                  vue.clickImg(event);
                },
                mouseout: vue.closeImg
              }
            })
          ]);
        };
      } else if (item.title === "品牌名") {
        tempObj.render = (h, params) => {
          let link=null;
          if(params.row[params.column.key]!="无"){
            if(this.platform=="AMZ"){
              link="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias=aps&field-keywords="+params.row[params.column.key];
            }else if(this.platform=="EBAY"){
              link="https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2047675.m570.l1313.TR0.TRC0.H0.Xsasss.TRS0&_nkw="+params.row[params.column.key]+"&_sacat=0";
            }
          }else{
            link="javascript:;"
          }
          return h('a', {
            attrs: {
              class: "mylinks",
              href: link,
              target: "_blank"
            },
            domProps: {
              innerText: params.row[params.column.key]
            }
          });
        };
      } else if (item.title == "ASIN") {
        tempObj.render = (h, params) => {
          return h('a', {
            attrs: {
              class: "mylinks",
              href: "javascript:void(0)",
              target: "_blank"
            },
            on: {
              click: this._vue.goASINDetail
            },
            domProps: {
              innerText: params.row[params.column.key]
            }
          });
        };
      } else if (item.title === "上架时间") {
        tempObj.render = (h, params) => {
          let date = params.row[params.column.key];
          if (date && date != "无") {
            var year = date.substr(0, date.indexOf("-"));
          }
          return year == "1900" ? '无' : vue.datetimeHandle(date);
        };
      } else if (item.title === "FBA" || item.title === "亚马逊自营") {
        tempObj.render = (h, params) => {
          return params.row[params.column.key] == "no" ? '否' : '是'
        };
      } else if (item.title === "是否进榜") {
        tempObj.render = (h, params) => {
          if (params.row[params.column.key] != "无") {
            return params.row[params.column.key] == "0" ? '否' : '是'
          } else {
            return "无"
          }
        }
      } else if (item.title === "原价" || item.title === "售价") {
        tempObj.render = (h, params) => {
          if (currency) {//有货币
            tempObj.width = 100;
            if (params.row[params.column.key] != "无") {
              if(params.row[currency]!="无"){
                return params.row[params.column.key] + params.row[currency]
              }else{
                return params.row[params.column.key]
              }
            } else {
              return "无"
            }
          }else{
            return params.row[params.column.key]
          }
        }
      } else if (item.title === "子类目及BSR排名") {
        tempObj.width = 190;
        tempObj.render = (h, params) => {
          if (params.row[bsrCatrgoryUUid] && params.row[bsrCatrgoryUUid] != "无") {
            let tempObj=params.row[bsrCatrgoryUUid]?JSON.parse(params.row[bsrCatrgoryUUid]):[];
            if(tempObj.length>1){
              tempObj=tempObj.slice(1,tempObj.length);
              return tempObj.toString();
            }else{
              return "无"
            }
          } else {
            return params.row[bsrCatrgoryUUid]
          }
        }
      } else if (item.title === "产品链接") {
        tempObj.render = (h, params) => {
          return h('a', {
            attrs: {
              class: "mylinks",
              href: linkKey ? params.row[linkKey] : "javascript:;",
              target: "_blank"
            },
            domProps: {
              innerText: params.row[linkKey]
            }
          })
        };
      } else if (item.title == "收藏") {
        let procuctUUID = commonUtil.getUUID("产品id", columnTitle);
        tempObj.render = (h, params) => {
          return h('div', {
            on: {
              click: vue.collectClick
            },
            attrs: {
              style: "cursor:pointer;width:30px;height:30px;margin:0 auto",
              class: params.row[params.column.key] == "1" ? "startActive" : "startUnactive",
            }
          }, [
            h('Icon', {
              props: {
                type: params.row[params.column.key] == "1" ? "ios-star" : "ios-star-outline"
              },
              attrs: {
                style: 'font-size:22px;',
                collected: params.row.orderNumber,
                asin: params.row[procuctUUID],
              }
            }),
            h('strong', params.row.name)
          ]);
        }
      } else if (item.title == "操作") {
        tempObj.fixed="right";
        tempObj.align="center";
        tempObj.className="";
        tempObj.width=90;
        tempObj.render = (h, params) => {
          return h('p',
            {
              attrs: {
                class: "options blueActive",
                style: "line-height:21px;height:21px;text-align:center;position:relative"
              }
            },
            [
              h('Tooltip', {
                  props: {
                    content: "查看详情",
                    placement: "top"
                  },
                  attrs: {
                    style: "font-size:21px;cursor:pointer"
                  }
                }, [h('i', {
                  attrs: {
                    class: "detailImg",
                    style: "font-size:21px;cursor:pointer;padding:5px;margin-right:10px",
                    asintext: params.row[asinNumber]
                  },
                  on: {
                    click: this._vue.goASINDetail
                  }
                })]
              ),
              h('i', {
                  class:{
                    develop:true,
                    'develop-active':params.row.commitState=="未开发"?true:false,
                    'develop-unactive':params.row.commitState=="未开发"?false:true,
                    "isShowBtn":this.platform=="AMZ"?false:true
                  },
                  attrs: {
                    style: "font-size:21px;padding:5px;",
                    asintext: params.row[asinNumber]
                  },
                  on: {
                    click:(e)=>{
                      this.gotoOA(e);
                    }
                  }
                },
                [
                  h('div', {
                      attrs: {
                        class: "developText",
                        style: "font-size:12px;"
                      }
                    },[
                      h('span', {
                        class:{
                          hasDevelop:true,
                          isShowHas:params.row.commitState=="未开发"?true:false,
                          isNotShow:params.row.commitState=="未开发"?false:true
                        }
                      })
                    ]
                  )
                ]
              )
            ]
          )
        };
      } else if (item.title == "排序") {
        tempObj.width=40;
        tempObj.renderHeader = (h, column) => {
          return h('p',
            {
              attrs: {
                class: "options",
                style: "line-height:21px;height:21px;"
              }
            },
            [
              h('i', {
                attrs: {
                  class: "fa fa-list-ul",
                  style: "float:right;font-size:21px;cursor:pointer",
                  id:"iconBox"
                },
                on: {
                  click: vue.sortAbleTable
                }
              })
            ]
          )
        };
      }else if(item.title == "榜单排名"){
         if(this.TableItem.showNewColumn!="name1"){
           tempObj=null;
         }
      }else if(item.title == "BSR品类"){
        tempObj=null;
      }else if(item.title=="产品名称"){
        tempObj.width=150;
      }else if(item.title=="大类目"){
        tempObj.width=120;
      }else if(item.title=="店铺名"){
        tempObj.width=64;
      }else if(item.title=="BSR排名"){
        tempObj.width=87;
      }
      if(tempObj){
        if(!tempObj.width){
          if(item.title.length==2){
            if(tempObj.sortable=="custom"){
              tempObj.width = 61;
            }else{
              tempObj.width = 44;
            }
          }else if(item.title.length==3){
            if(tempObj.sortable=="custom"){
              tempObj.width = 73;
            }else{
              tempObj.width = 56;
            }
          }else if(item.title.length==4){
            if(tempObj.sortable=="custom"){
              tempObj.width = 85;
            }else{
              tempObj.width = 68;
            }
          }else if(item.title.length==5){
            if(tempObj.sortable=="custom"){
              tempObj.width = 97;
            }else{
              tempObj.width = 85;
            }
          }else if(item.title.length==6){
            if(tempObj.sortable=="custom"){
              tempObj.width = 112;
            }else{
              tempObj.width = 90;
            }
          }else{
            if (item.title.indexOf("增长率") != -1) {
              tempObj.width = 130;
            } else if(tempObj.title.length>=7){
                tempObj.width = 110;
              }
            }
        }
        currentShowColumns.push(tempObj);
      }
    })

    return currentShowColumns;
  },

  //表格行初始化样式设置
  initRenderTable(columnTitle, type, vue) {
    let currentColumns = [];
    let bsrRank = null;
    let shopName = null;
    let bigCategory = null;
    let bsrCategory = null;
    let asin=null;
    let ranklist=null;
    let linkKey = commonUtil.getUUID("产品链接", columnTitle);
    let currency = commonUtil.getUUID("货币", columnTitle);
    let bsrCatrgoryUUid = commonUtil.getUUID("子类目及BSR排名", columnTitle);
    let asinNumber = commonUtil.getUUID("ASIN", columnTitle);
    columnTitle.forEach((item, index) => {
      let tempObj = {
        title: item.chinese,
        key: item.uuid,
        sortable: item.sortable,
        isSelect: true,
        fixed: "",
        align: "",
        className: "",
        render: null,
        renderHeader: null
      };
      if (item.chinese === "产品图片") {
        //产品图片
        tempObj.fixed = "left";
        tempObj.align = "center";
        tempObj.width = 200;
        tempObj.render = (h, params) => {
          return h('a', {
            attrs: {
              style: 'width: 200px;height:140px;display:table-cell;vertical-align:middle;border-radius: 6px;background:#fff;text-align: center',
              class: "tablePicImg",
              href: linkKey ? params.row[linkKey] : "javascript:;",
              target: "_blank"
            }
          }, [
            h('img', {
              attrs: {
                'src':params.row[params.column.key],
                style: 'display:block;max-width:100%;max-height:100%;margin:0 auto;',
                class: "myBigImage"
              },
              style: {},
              on: {
                mouseover: (event)=>{
                  vue.clickImg(event);
                },
                mouseout: vue.closeImg
              }
            })
          ]);
        };
      } else if (item.chinese === "品牌名") {
        tempObj.render = (h, params) => {
          let link=null;
          if(params.row[params.column.key]!="无"){
            if(this.platform=="AMZ"){
              link="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias=aps&field-keywords="+params.row[params.column.key];
            }else if(this.platform=="EBAY"){
              link="https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2047675.m570.l1313.TR0.TRC0.H0.Xsasss.TRS0&_nkw="+params.row[params.column.key]+"&_sacat=0";
            }
          }else{
            link="javascript:;"
          }
          return h('a', {
            attrs: {
              class: "mylinks",
              href:  link,
              target: "_blank"
            },
            domProps: {
              innerText: params.row[params.column.key]
            }
          });
        };
      } else if (item.chinese == "ASIN") {
        tempObj.width = 68;
        tempObj.render = (h, params) => {
          return h('a', {
            attrs: {
              class: "mylinks",
              href: "javascript:void(0)",
              target: "_blank"
            },
            on: {
              click: this._vue.goASINDetail
            },
            domProps: {
              innerText: params.row[params.column.key]
            }
          });
        };
        asin=tempObj;
        tempObj=null;
      } else if (item.chinese === "上架时间") {
        tempObj.render = (h, params) => {
          let date = params.row[params.column.key];
          if (date && date != "无") {
            var year = date.substr(0, date.indexOf("-"));
          }
          return year == "1900" ? '无' : vue.datetimeHandle(date);
        }
      }
      else if (item.chinese === "FBA" || item.chinese === "亚马逊自营") {
        tempObj.render = (h, params) => {
          return params.row[params.column.key] == "no" ? '否' : '是'
        }
      }
      else if (item.chinese === "是否进榜") {
        tempObj.render = (h, params) => {
          if (params.row[params.column.key] != "无") {
            return params.row[params.column.key] == "0" ? '否' : '是'
          } else {
            return "无"
          }
        }
      }
      else if (item.chinese === "原价" || item.chinese === "售价") {
        tempObj.render = (h, params) => {
          if (currency) {//有货币
            if (params.row[params.column.key] != "无") {
              if(params.row[currency]!="无"){
                return params.row[params.column.key] + params.row[currency]
              }else{
                return params.row[params.column.key]
              }
            } else {
              return "无"
            }
          }else{
            return params.row[params.column.key]
          }
        }
      }
      else if (item.chinese === "产品链接") {
        tempObj=null;
      }
      else if (item.chinese == "产品名称") {
        tempObj.width = 150;
      }
      else if (item.chinese == "BSR排名") {
        tempObj.width = 87;
        bsrRank = tempObj;
        tempObj = null;
      }
      else if (item.chinese == "店铺名") {
        tempObj.width = 64;
        shopName = tempObj;
        tempObj = null;
      }
      else if (item.chinese == "子类目及BSR排名") {
        tempObj.width = 190;
        tempObj.render = (h, params) => {
          if (params.row[bsrCatrgoryUUid] && params.row[bsrCatrgoryUUid] != "无") {
             let tempObj=params.row[bsrCatrgoryUUid]?JSON.parse(params.row[bsrCatrgoryUUid]):[];
             if(tempObj.length>1){
               tempObj=tempObj.slice(1,tempObj.length);
               return tempObj.toString();
             }else{
               return "无"
             }
          } else {
            return params.row[bsrCatrgoryUUid]
          }
        }
        bsrCategory = tempObj;
        tempObj = null;
      }
      else if (item.chinese == "是否收藏" || item.chinese == "用户id" || item.chinese == "产品id"
        || item.chinese == "参考" || item.chinese == "平方差" ||
        item.chinese == "截距" || item.chinese == "coef" || item.chinese == "货币"||item.chinese == "BSR品类") {
        tempObj = null;
      } else if (item.chinese == "增长度") {
        tempObj.sortable = "custom";
        tempObj.sortType = "desc";
      } else if (item.chinese === "BSR分类") {
        tempObj.width = 120;
        tempObj.title = "大类目";
        bigCategory = tempObj;
        tempObj = null;
      } else if (item.chinese === "类目") {
        tempObj = null;
      }else if(item.chinese === "榜单排名"){
        tempObj.width=85;
        if(type == "name1"){
          tempObj.sortable="custom";
          ranklist=tempObj;
        }
        tempObj=null;
      }
      if (tempObj) {
        if(!tempObj.width){
          if(tempObj.title.length==2){
            if(tempObj.sortable=="custom"){
              tempObj.width = 61;
            }else{
              tempObj.width = 44;
            }
          }else if(tempObj.title.length==3){
            if(tempObj.sortable=="custom"){
              tempObj.width = 73;
            }else{
              tempObj.width = 56;
            }
          }else if(tempObj.title.length==4){
            if(tempObj.sortable=="custom"){
              tempObj.width = 85;
            }else{
              tempObj.width = 68;
            }
          }else if(tempObj.title.length==5){
            if(tempObj.sortable=="custom"){
              tempObj.width = 97;
            }else{
              tempObj.width = 85;
            }
          }else if(tempObj.title.length==6){
            if(tempObj.sortable=="custom"){
              tempObj.width = 112;
            }else{
              tempObj.width = 90;
            }
          }else{
           if (tempObj.title.indexOf("增长率") != -1) {
              tempObj.width = 130;
            }else if(tempObj.title.length>=7){
             tempObj.width = 110;
           }
          }
        }
        currentColumns.push(tempObj);
      }
    })
    if(asin){
      currentColumns.splice(1, 0, asin);
    }
    if(ranklist){
      currentColumns.splice(3, 0, ranklist);
    }
    if (bigCategory) {
      currentColumns.splice(5, 0, bigCategory);
    }
    if (bsrRank) {
      currentColumns.splice(6, 0, bsrRank);
    }
    if (bsrCategory) {
      currentColumns.splice(7, 0, bsrCategory);
    }
    if (shopName) {
      currentColumns.splice(8, 0, shopName);
    }
    //新增操作一列
    let options = {
      title: "操作",
      key: "options",
      sortable: false,
      width: 90,
      isSelect: true,
      fixed:"right",
      align:"center"
    };
    options.render = (h, params) => {
      return h('p',
        {
          attrs: {
            class: "options blueActive",
            style: "line-height:21px;height:21px;text-align:center;position:relative"
          }
        },
        [
          h('Tooltip', {
              props: {
                content: "查看详情",
                placement: "top"
              },
              attrs: {
                style: "font-size:21px;cursor:pointer"
              }
            }, [h('i', {
              attrs: {
                class: "detailImg",
                style: "font-size:21px;cursor:pointer;padding:5px;margin-right:10px",
                asintext: params.row[asinNumber]
              },
              on: {
              click: this._vue.goASINDetail
              }
            })]
          ),
        h('i', {
              class:{
                develop:true,
                'develop-active':params.row.commitState=="未开发"?true:false,
                'develop-unactive':params.row.commitState=="未开发"?false:true,
                "isShowBtn":this.platform=="AMZ"?false:true
              },
              attrs: {
                style: "font-size:21px;padding:5px;",
                asintext: params.row[asinNumber]
              },
              on: {
                click:(e)=>{
                   this.gotoOA(e);
                }
              }
            },
            [
              h('div', {
                  attrs: {
                    class: "developText",
                    style: "font-size:12px;"
                  }
                },[
                h('span', {
                  class:{
                    hasDevelop:true,
                    isShowHas:params.row.commitState=="未开发"?true:false,
                    isNotShow:params.row.commitState=="未开发"?false:true
                  }
                })
                ]
              )
            ]
          )
        ]
      )
    };
    currentColumns.push(options);
    //新增排序一列
    let sortTable = {
      title: "排序",
      key: "sorts",
      sortable: false,
      className: "sortState",
      width: 40,
      isSelect: true,
      fixed: "right"
    };
    sortTable.renderHeader = (h, column) => {
      return h('p',
        {
          attrs: {
            class: "options",
            style: "line-height:21px;height:21px;"
          }
        },
        [
          h('i', {
            attrs: {
              class: "fa fa-list-ul",
              style: "float:right;font-size:21px;cursor:pointer",
              id:"iconBox"
            },
            on: {
              click: vue.sortAbleTable
            }
          })
        ]
      )
    };
    currentColumns.push(sortTable);
    let numbersColumn = {
      title: "序号",
      key: "orderNumber",
      sortable: false,
      width: 44,
      align: "center",
      fixed: "left",
      isSelect: true
    }
    currentColumns.unshift(numbersColumn);
    let collect = {
      title: "收藏",
      key: "collection",
      sortable: false,
      width: 44,
      align: "center",
      fixed: "left",
      isSelect: true
    }
    //获取产品id
    let procuctUUID = commonUtil.getUUID("产品id", columnTitle);
    collect.render = (h, params) => {
      return h('div', {
        on: {
          click: vue.collectClick
        },
        attrs: {
          style: "cursor:pointer;width:30px;height:30px;margin:0 auto",
          class: params.row[params.column.key] == "1" ? "startActive" : "startUnactive",
        }
      }, [
        h('Icon', {
          props: {
            type: params.row[params.column.key] == "1" ? "ios-star" : "ios-star-outline"
          },
          attrs: {
            style: 'font-size:22px;',
            asin: params.row[procuctUUID],
            collected: params.row.orderNumber,
          }
        }),
        h('strong', params.row.name)
      ]);
    }
    currentColumns.unshift(collect);
    return currentColumns;
  },

  //表格控件绑定
  setControls(colName, item, queryData, type = "amazon") {
    //处理控件名称及其绑定
    if (type == "amazon") {
      switch (colName) {
        //维度
        case "产品名称":
          commonUtil.setDimension(queryData.product, item);
          break;
        case "品牌名":
          commonUtil.setDimension(queryData.brand, item);
          break;
        case "FBA":
          commonUtil.setDimension(queryData.sellerFBA, item);
          break;
        case "亚马逊自营":
          commonUtil.setDimension(queryData.sellerAmazon, item);
          break;
        case "上架时间":
          commonUtil.setDimension(queryData.time, item);
          break;
        case "BSR分类":
          //BSR分类
          commonUtil.setDimension(queryData.BSRsort, item);
          break;
        //BSR排名
        case "BSR排名":
          commonUtil.setDimension(queryData.BSR, item);
          break;
        //asin
        case "ASIN":
          commonUtil.setDimension(queryData.asin, item);
          break;
        //数值
        case "7天销量增长率":
          commonUtil.setMessure(queryData.sevenDayRate, item);
          break;
        case "14天销量增长率":
          commonUtil.setMessure(queryData.fourteenDayRate, item);
          break;
        case "30天销量增长率":
          commonUtil.setMessure(queryData.thirtyDayeRate, item);
          break;
        case "售价":
          commonUtil.setMessure(queryData.productPrices, item);
          break;
        case "评分数":
          commonUtil.setMessure(queryData.productRates, item);
          break;
        //类目选择=>跟卖卖家数
        case "跟卖卖家":
          commonUtil.setMessure(queryData.category, item);
          break;
        //增长度
        case "增长度":
          commonUtil.setMessure(queryData.growth, item);
          break;
        //偏差度
        case "平方差":
          commonUtil.setMessure(queryData.deflection, item);
          break;
        //30天平均销量
        case "30天日均销量":
          commonUtil.setMessure(queryData.averageSales, item);
          break;
      }
    } else if (type == "ebay") {
      switch (colName) {
        //维度
        case "产品名称":
          commonUtil.setDimension(queryData.product, item);
          break;
        case "品牌名":
          commonUtil.setDimension(queryData.brand, item);
          break;
        case "上架时间":
          commonUtil.setDimension(queryData.time, item);
          break;
        case "评分数":
          commonUtil.setMessure(queryData.productRates, item);
          break;
        case "原价":
          commonUtil.setMessure(queryData.originalPrices, item);
          break;
        case "售价":
          commonUtil.setMessure(queryData.sellingPrices, item);
          break;
        case "库存":
          commonUtil.setMessure(queryData.stock, item);
          break;
        case "销量":
          commonUtil.setMessure(queryData.sales, item);
          break;
        case "评论数":
          commonUtil.setMessure(queryData.comments, item);
          break;
        case "货币":
          commonUtil.setMessure(queryData.sellingPricesCode, item);
          break;
      }
    }
  },

  /*--------表格数据处理模块----------*/

  //获取不再提示状态
  getTipsState(success) {
    commonUtil.queryData({
      url: "/di/common/get/colunmOrder",
      queryParams: {
        paramName: "不再提示",
        type: this.TableItem.type == "explode" ? 6 : 5,
      },
      callback: (res) => {
        if (res.data) {
          success && success(JSON.parse(res.data))
        } else {
          //返回空
          let obj = this.TableItem.type == "explode" ? {noMoreTipsExplode: false} : {noMoreTipsNews: false};
          success && success(obj)
        }
      }
    })
  },
  //oa立即开发跳转
  gotoOA(e){
    e.stopPropagation();
    let asin="";
    let url="";
    let platform="";
    if(e.target.attributes.asintext){
      asin=e.target.attributes.asintext.value
    }
    if(asin!=""&&this.platform=="AMZ"&&this.isToOA){
      if(e.target.classList.contains('develop-unactive')||e.target.classList.contains('success')){
        e.target.style.cursor="inherit";
        return;
      }
      this.isToOA=false;
      if(this.TableItem.type==="news"){
        url="/supperlyChain/get/new"
      }else if(this.TableItem.type==="explode"){
        url="/supperlyChain/get/bsr"
      }
      if(this.platform=="AMZ"){
        platform="美站"
      }
      commonUtil.queryData({
        url:url,
        method: "post",
        headers:{'Content-Type':'application/json'},
        queryParams:JSON.stringify({
          "siteType":platform,
          "productID":asin
        }),
        callback:(res)=>{
          this.oaGet(res,asin,e);
        },
        error:(res)=>{
          this.isToOA=true;
          this._vue.$Notice.error({
            title: '商品提交失败',
            desc: '提交失败，请稍后重试'
          });
        }
      })
    }
  },
  oaGet(res,asin,e){
    let url="";
    let platform="";
    if(this.TableItem.type==="news"){
      url="/supperlyChain/add/new"
    }else if(this.TableItem.type==="explode"){
      url="/supperlyChain/add/bsr"
    }
    if(this.platform=="AMZ"){
      platform="美站"
    }
    let keyApi=""
    if(window.location.hostname.indexOf("data.banggood.cn")!="-1"){
      keyApi="https://scmnewproduct.banggood.cn"
    }else{
      keyApi="http://192.168.1.82:8094"
    }
    commonUtil.queryData({
      keyApi:keyApi,
      url:"/scm-newproduct/blueWhale/add",
      method:"post",
      headers:{'Content-Type':'application/json'},
      queryParams:JSON.stringify(res.data),
      callback:(back)=>{
        this.isToOA=true;
        if(back.result.errors.length===0){
          this._vue.$Notice.success({
            title: '商品提交成功',
            desc:"请前往OA产品-新产品管理-蓝鲸选品查看产品进行后续操作。"
          });
          //添加标识成功
          e.target.classList.add("success");
          e.target.classList.add("develop-unactive")
          e.target.children[0].children[0].classList.remove("isShowHas");
          e.target.children[0].children[0].classList.add("isNotShow");
          commonUtil.queryData({
            url:url,
            method: "post",
            headers:{'Content-Type':'application/json'},
            queryParams:JSON.stringify({
              "siteType":platform,
              "productID":asin
            }),
            callback:(backData)=>{}
          })
        }else{
          if(back.result.errors[0].msg.indexOf("重复")!=-1){
            this._vue.$Notice.warning({
              title: '商品已被提交',
              desc:'该ASIN已被提交，不可重复'
            });
            e.target.classList.add("success");
            e.target.classList.add("develop-unactive")
            e.target.children[0].children[0].classList.remove("isShowHas");
            e.target.children[0].children[0].classList.add("isNotShow");
          }else{
            this._vue.$Notice.error({
              title: '商品提交失败',
              desc: '提交失败，请稍后重试'
            });
          }
        }
      },
      error:()=>{
        this.isToOA=true;
      }
    })
  },
  //表格搜索
  searchData() {
    let conditions = {
      demesion: [],
      measures: [],
      conditions: []
    };
    //配置表格控件查询条件
    for (let key in this.TableItem.tableContainer.queryData) {
      var obj = this.TableItem.tableContainer.queryData[key];
      //判断字段是否要发送
      //判断是否是有区间
      if (obj.hasOwnProperty("showSession")) {
        //选择了区间发送
        if (obj.showSession) {
          let objSend = {
            left: {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "LARGEEQUAL", //>=
              "val": obj.session.sessionLeft
            },
            right: {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "LESSEQUAL", //>=
              "val": obj.session.sessionRight
            }
          }
          conditions.conditions.push(objSend.left);
          conditions.conditions.push(objSend.right);
        }
        else {
          //没有区间正常发送
          //正常类型
          let objSend = {
            "col": obj.col,
            "chinese": obj.chinese,
            "uuid": obj.uuid,
            "columnType": obj.columnType ? obj.columnType : "",
            "relation": obj.selectValue,
            "val": obj.inputVal
          }
          conditions.conditions.push(objSend);

        }
      } else {
        if (obj.inputVal !== "" && obj.inputVal.length != 0) {
          if (obj.type === "DATE") {
            //日期
            if (obj.inputVal[0] && obj.inputVal[1]) {
              let objSend = {
                left: {
                  "col": obj.col,
                  "chinese": obj.chinese,
                  "uuid": obj.uuid,
                  "columnType": obj.columnType ? obj.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[0], "yyyy-MM-dd"),
                },
                right: {
                  "col": obj.col,
                  "chinese": obj.chinese,
                  "uuid": obj.uuid,
                  "columnType": obj.columnType ? obj.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[1], "yyyy-MM-dd")
                }
              }
              conditions.conditions.push(objSend.left);
              conditions.conditions.push(objSend.right);
            }
          } else if (obj.type === "ARRAY") {
            //卖家类型
            if (obj.inputVal.length == 1) {//只需传一个
              let objSend = {
                "col": obj.col,
                "chinese": obj.chinese,
                "uuid": obj.uuid,
                "columnType": obj.columnType ? obj.columnType : "",
                "relation": "EQUAL",
                "val": obj.inputVal[0] === '是' ? 'yes' : 'no'
              }
              conditions.conditions.push(objSend);
            }
          } else {
            if (obj.type !== "BSR") {
              //BSR分类不用发
              if (obj.type != "RATE") {
                if (obj.type == "INTNumber" || obj.type == "INTNumber2") {
                  let val1 = "";
                  let val2 = "";
                  let col1 = obj.col;
                  let col2 = obj.col;
                  switch (obj.type) {
                    case "INTNumber":
                      val1 = obj.inputVal[0] / 100;
                      val2 = obj.inputVal[1] / 100;
                      col1 = "$repl$largeR";
                      col2 = "$repl$lessrR";
                      break;
                    case "INTNumber2":
                      val1 = obj.inputVal[0];
                      val2 = obj.inputVal[1];
                      col1 = "$repl$largeAngle";
                      col2 = "$repl$lessAngle";
                      break;
                  }
                  let objSend = {
                    left: {
                      "col": col1,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LARGEEQUAL", //>=
                      "val": val1
                    },
                    right: {
                      "col": col2,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LESSEQUAL", //>=
                      "val": val2
                    }
                  }
                  conditions.conditions.push(objSend.left);
                  conditions.conditions.push(objSend.right);
                } else {
                  let objSend = {
                    "col": obj.col,
                    "chinese": obj.chinese,
                    "uuid": obj.uuid,
                    "columnType": obj.columnType ? obj.columnType : "",
                    "relation": "EQUAL",
                    "val": obj.inputVal
                  }
                  conditions.conditions.push(objSend);
                }

              }

            }
          }
        } else {
          if (obj.type === "increment" && obj.inputVal == "") {
            let objSend = {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "EQUAL",
              "val": 99999999
            }
            conditions.conditions.push(objSend);
          }
        }
      }
    }
    let bsr = "";
    if (this.TableItem.tableContainer.queryData.BSRsort.inputVal != "全部") {
      if (this.TableItem.tableContainer.queryData.BSRsort.inputVal.indexOf("(") != -1) {
        bsr = this.TableItem.tableContainer.queryData.BSRsort.inputVal.slice(0, this.TableItem.tableContainer.queryData.BSRsort.inputVal.indexOf("("));
      } else {
        bsr = this.TableItem.tableContainer.queryData.BSRsort.inputVal;
      }
    }
    this.TableItem.tableContainer.columns.extra.forEach((item, index) => {
      if (item.chinese === "BSR分类") {
        this._vue.$set(item, "val", bsr);
      } else if (item.chinese === "类目") {
        this._vue.$set(item, "val", commonUtil.handelFormat(this.chooseType));
      }
      conditions.conditions.push(item);
    })
    this._vue.$set(this.TableItem.initCondition, "condition", conditions.conditions);
  },

  //如何获取表格数据配置
  mockTableData() {
    this._vue.loading = true;
    //点击搜索
    if (this.TableItem.initCondition.type === "part") {
      this.TableItem.pageBean.currentPage = 1;
      this.TableItem.pageBean.oldPage = 1;
      this.totalNumber = 0;
      this.TableItem.pageBean.toPage = this.TableItem.pageBean.currentPage;
      this.TableItem.initCondition.type = "all";
    }
    this.getTableData();    //直接获取数据
  },

  //获取表格数据
  getTableData(success) {
    this._vue.loading = true;
    let _this = this;
    if (!this.TableItem.initCondition.isPage) {   //不是翻页
      if (this.TableItem.tableContainer.columns.extra && this.TableItem.tableContainer.columns.extra.length != 0) {
        //处理bsr格式
        let bsr = "";
        if (this.TableItem.tableContainer.queryData.BSRsort.inputVal != "全部") {
          if (this.TableItem.tableContainer.queryData.BSRsort.inputVal.indexOf("(") != -1) {
            bsr = this.TableItem.tableContainer.queryData.BSRsort.inputVal.slice(0, this.TableItem.tableContainer.queryData.BSRsort.inputVal.indexOf("("));
          } else {
            bsr = this.TableItem.tableContainer.queryData.BSRsort.inputVal;
          }
        }
        this.TableItem.tableContainer.columns.extra.forEach((item, index) => {
          if (item.chinese === "BSR分类") {
            this._vue.$set(item, "val", bsr);
          } else if (item.chinese === "类目") {
            this._vue.$set(item, "val", commonUtil.handelFormat(this._vue.chooseType));
          }
          if (this.TableItem.showNewColumn != "name4") {
            this.TableItem.initCondition.condition.push(item);
          }
        })
      }
      this.getTableCount();//获取表格总数
    }
    this.TableItem.initCondition.isPage = false;
    let configUrl = tablePortHelper.getTableDataUrl(this.TableItem.type,this.TableItem.showNewColumn).configUrl;
    let flag = false;
    let state = tablePortHelper.getTableDataUrl(this.TableItem.type,this.TableItem.showNewColumn).state;
    let sendType = tablePortHelper.getTableDataUrl(this.TableItem.type,this.TableItem.showNewColumn).sendType;
    let sendNumber1 = "";
    let sendNumber2 = "";
    let modelId = this.TableItem.parmasConfig.query.modelID;
    let cid = this.TableItem.parmasConfig.query.cid;
    let category = commonUtil.handelFormat(this._vue.chooseType);
    if (this.collectBtnsActive == "tab3") {
      //收藏
      configUrl = tablePortHelper.checkCollectionModel("list").configUrl;
      cid = tablePortHelper.checkCollectionModel("list").cid;
      modelId = tablePortHelper.checkCollectionModel("list").modelId;
      this.getCollectionBefore(this.TableItem.initCondition.condition);
    }
    commonUtil.clearArray(_this.TableItem.tableContainer.tableData);
    commonUtil.queryData({
      url: configUrl,
      method: "post",
      async: true,
      queryParams: {
        cid: cid,
        type: sendType,// summary 汇总   recommend//推荐
        svQualifyingCount: flag ? sendNumber1 : "",
        ftQualifyingCount: flag ? sendNumber2 : "",
        category: state == 1 ? category : "",
        //查询条件
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": _this.TableItem.initCondition.measures ? _this.TableItem.initCondition.measures : [],
          //demesion
          "groupbys": _this.TableItem.initCondition.demesion ? _this.TableItem.initCondition.demesion : [],
          "tableName": "kylin_sales",
          "conditions": _this.TableItem.initCondition.condition ? _this.TableItem.initCondition.condition : [],
          "conditionMap": {}
        }),
        //固定
        thirtyDays: flag ? this.TableItem.tableContainer.queryData.sevenDayRate.inputVal : "",
        fourteenDays: flag ? this.TableItem.tableContainer.queryData.fourteenDayRate.inputVal : "",
        sevenDays: flag ? this.TableItem.tableContainer.queryData.thirtyDayeRate.inputVal : "",
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": _this.TableItem.pageBean.oldPage,
          "currentPage": _this.TableItem.pageBean.currentPage,
          "pageSize": _this.TableItem.pageBean.pageSize
        }),
        //固定
        modelID: modelId
      },
      callback: (res) => {
        _this._vue.loading = false;
        if (res.data.result && res.data.result.length > 0) {
          let data = Model.getListData(res.data, _this._vue);
          let lastData = data.datas;
          let page = _this.TableItem.pageBean.currentPage;
          let size = _this.TableItem.pageBean.pageSize;
          _this.totalNumber = (page - 1) * size;
          commonUtil.clearArray(_this.links);
          data.links.forEach((link) => {
            _this.links.push(link);
          })
          lastData.forEach((item, i) => {
            for (let key in item) {
              if (key == "orderNumber") {
                //1-40(1,2,3) 2-40(41,42) 3-40(81,82)
                if (_this.TableItem.pageBean.currentPage > 1) {
                  item[key] = ++_this.totalNumber;
                } else {
                  item[key] = ++i;
                }
              }
            }
            _this.TableItem.tableContainer.tableData.push(item);
          })
        } else {
          this._vue.showMessage.push(1);
        }
        success && success();
      },
      error: (res) => {
        _this._vue.loading = false;
      },
      complete: () => {
        _this._vue.loading = false;
      }
    });
  },
  //获取表格总数
  getTableCount(success) {
    let _this = this;
    let flag = false;
    let sendNumber1 = "";
    let sendNumber2 = "";
    let conditions = [];
    this.TableItem.initCondition.condition.forEach((conObj) => {
      conditions.push({
        chinese: conObj.chinese,
        col: conObj.col,
        uuid: conObj.uuid,
        columnType: conObj.columnType,
        relation: conObj.relation,
        val: conObj.val
      })
    })
    conditions.push({
      "chinese": "数量",
      "col": "count(1)",
      "columnType": "STRING",
      "uuid": "countss",
      "alias": "count_num"
    })
    let modelId = this.TableItem.parmasConfig.query.modelID;
    let cid = this.TableItem.parmasConfig.query.cid;
    let configUrl = tablePortHelper.getTableCountModel(this.TableItem.type,this.TableItem.showNewColumn).configUrl;
    let state = tablePortHelper.getTableDataUrl(this.TableItem.type,this.TableItem.showNewColumn).state;
    let category = commonUtil.handelFormat(this._vue.chooseType);
    if (this.collectBtnsActive == "tab3") {
      //收藏
      configUrl = tablePortHelper.checkCollectionModel("total").configUrl;
      cid = tablePortHelper.checkCollectionModel("total").cid;
      modelId = tablePortHelper.checkCollectionModel("total").modelId;
      this.getCollectionBefore(conditions);
    }
    commonUtil.queryData({
      url: configUrl,
      method: "post",
      queryParams: {
        cid: cid,
        svQualifyingCount: flag ? sendNumber1 : "",
        ftQualifyingCount: flag ? sendNumber2 : "",
        thirtyDays: flag ? this.TableItem.tableContainer.queryData.sevenDayRate.inputVal : "",
        fourteenDays: flag ? this.TableItem.tableContainer.queryData.fourteenDayRate.inputVal : "",
        sevenDays: flag ? this.TableItem.tableContainer.queryData.thirtyDayeRate.inputVal : "",
        category: state == 1 ? category : "",
        //查询条件
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": _this.TableItem.initCondition.measures ? _this.TableItem.initCondition.measures : [],
          //demesion
          "groupbys": _this.TableItem.initCondition.demesion ? _this.TableItem.initCondition.demesion : [],
          "tableName": "kylin_sales",
          "conditions": conditions ? conditions : [],
          "conditionMap": {}
        }),
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": _this.TableItem.pageBean.oldPage,
          "currentPage": _this.TableItem.pageBean.currentPage,
          "pageSize": _this.TableItem.pageBean.pageSize
        }),
        //固定
        modelID: modelId
      },
      callback: (res) => {
        if (res.data) {_this.TableItem.pageBean.totalCount = res.data.rowSum;}
        success && success();
      }
    })
  },

  /*-------表格类目、品牌、产品模块-----------------*/
  //初始化获取品牌名、bsr品类、产品名
  getInputValInit() {
    // if (this.TableItem.showNewColumn == "name3") {
    //   this.pageBean.currentPage = 1;
    //   this.pageBean.oldPage = 1;
    //   commonUtil.clearArray(this.TableItem.tableContainer.sortData);
    //   this.getNewsThirtyBsr();
    //   this.getBrandName();
    //   this.getSumProductName();
    // } else {
    //   //获取品牌名
    //   this.getBrandName();
    //   this.getSumProductName();
    // }
    this.getBrandName();
    this.getSumProductName();
  },
  //推荐搜索添加
  setNewSearchBox(type,sendCondition){
    if(type=="name3"){
      //带条件
      let obj1 = this.TableItem.tableContainer.queryData.incrementTop;
      let objSend1 = {
        "col": obj1.col,
        "chinese": obj1.chinese,
        "uuid": obj1.uuid,
        "columnType": obj1.columnType ? obj1.columnType : "",
        "relation": "EQUAL",
        "val": obj1.inputVal == "" ? 99999999 : obj1.inputVal
      }
      let obj2 = this.TableItem.tableContainer.queryData.sellDays;
      let objSend2 = {
        "col": obj2.col,
        "chinese": obj2.chinese,
        "uuid": obj2.uuid,
        "columnType": obj2.columnType ? obj2.columnType : "",
        "relation": "EQUAL",
        "val": obj2.inputVal
      }
      //增长度
      let obj3 = this.TableItem.tableContainer.queryData.growth;
      let objSend3 = {
        left: {
          "col": "$repl$largeAngle",
          "chinese": obj3.chinese,
          "uuid": obj3.uuid,
          "columnType": obj3.columnType ? obj3.columnType : "",
          "relation": "LARGEEQUAL", //>=
          "val": obj3.inputVal[0]
        },
        right: {
          "col": "$repl$lessAngle",
          "chinese": obj3.chinese,
          "uuid": obj3.uuid,
          "columnType": obj3.columnType ? obj3.columnType : "",
          "relation": "LESSEQUAL", //>=
          "val": obj3.inputVal[1]
        }
      }
      //偏差度
      let obj4 = this.TableItem.tableContainer.queryData.deflection;
      let objSend4 = {
        left: {
          "col": "$repl$largeR",
          "chinese": obj4.chinese,
          "uuid": obj4.uuid,
          "columnType": obj4.columnType ? obj4.columnType : "",
          "relation": "LARGEEQUAL", //>=
          "val": obj4.inputVal[0] / 100
        },
        right: {
          "col": "$repl$lessrR",
          "chinese": obj4.chinese,
          "uuid": obj4.uuid,
          "columnType": obj4.columnType ? obj4.columnType : "",
          "relation": "LESSEQUAL", //>=
          "val": obj4.inputVal[1] / 100
        }
      }
      sendCondition.push(objSend1);
      sendCondition.push(objSend2);
      sendCondition.push(objSend3.left);
      sendCondition.push(objSend3.right);
      sendCondition.push(objSend4.left);
      sendCondition.push(objSend4.right);
    }
  },
  /*----------品牌-------------*/
  //获取汇总品牌名
  getBrandName(query) {
    let _this = this;
    let sendDemesion = [];
    let sendCondition = [];
    //获取bsr分类
    this.TableItem.tableContainer.columns.extra.forEach((item, index) => {
      if (item.chinese === "类目") {
        if (this.collectBtnsActive == "tab3") {
          this._vue.$set(item, "val", "");
        } else {
          this._vue.$set(item, "val", commonUtil.handelFormat(this._vue.chooseType));
        }
      }
      if (item.chinese !== "BSR分类" && this.TableItem.showNewColumn != "name4") {
        sendCondition.push(item);
      }
    });
    this.TableItem.tableContainer.columns.demesion.forEach((item, index) => {
      if (item.chinese === "品牌名") {
        sendDemesion.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "EQUAL",//要
          "sortType": "ASC"
        })
        sendCondition.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "LIKE",//要
          "val": query ? query : ""
        });
      }
    })
    this.setNewSearchBox(this.TableItem.showNewColumn,sendCondition);
    this.TableItem.tableContainer.loadingState.brandloading = true;
    let cid = this.TableItem.parmasConfig.query.cid;
    let modelId = this.TableItem.parmasConfig.query.modelID;
    let configUrl = tablePortHelper.getBrandDataModel(this.TableItem.type,this.TableItem.showNewColumn).configUrl;
    let state = tablePortHelper.getBrandDataModel(this.TableItem.type,this.TableItem.showNewColumn).state;
    //收藏
    if (this.collectBtnsActive == "tab3") {
      modelId = tablePortHelper.checkCollectionModel("brandName").modelId;
      cid = tablePortHelper.checkCollectionModel("brandName").cid;
      configUrl = tablePortHelper.checkCollectionModel("brandName").configUrl;
      sendCondition.push({
        "col": "rpt_products_collections.is_collection",
        "chinese": "是否收藏",
        "alias": "is_collection",
        "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
        "val": 1,
        "columnType": "NUMBER",
        "relation": "EQUAL"
      })
    }
    let category = commonUtil.handelFormat(this._vue.chooseType);
    commonUtil.clearArray(_this.TableItem.tableContainer.brandData);
    commonUtil.queryData({
      url: configUrl,
      async: true,
      queryParams: {
        cid: cid,
        category: state == 1 ? category : "",
        //查询条件
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": [],
          //demesion
          "groupbys": sendDemesion ? sendDemesion : [],
          "tableName": "kylin_sales",
          "conditions": sendCondition ? sendCondition : [],
          "conditionMap": {}
        }),
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": 0,
          "currentPage": 1,
          "pageSize": 500
        }),
        modelID: modelId
      },
      callback: (res) => {
        _this.TableItem.tableContainer.loadingState.brandloading = false;
        if (res.status === 1) {
          let brands = [];
          if (res.data.result && res.data.result.length > 0) {
            res.data.result.forEach((item, i) => {
              brands.push(item[0]);
            })
            //品牌
            brands = commonUtil.filterRepeat(brands);
            brands.forEach((brand, j) => {
              if (brand && brand != "") {
                _this.TableItem.tableContainer.brandData.push({
                  value: brand,
                  label: brand
                })
              }
            })
          }
        }
      },
      error: () => {
          _this.TableItem.tableContainer.loadingState.brandloading = false;
      }
    })
  },

  //获取品牌数
  getBrandCount() {
    let _this = this;
    this.TableItem.tableContainer.brandCount = "";
    let condition = [];
    //品牌数量
    let messures = commonUtil.setConditions("measures", [{
      "chinese": "品牌数量",
      "col": "RPT_KYLIN_AMZ_BRAND_NUM.BRAND_NUM",
      "uuid": "7a9167cc-0c62-41b3-ab84-94cb0c7efef4"
    }])
    condition.push({
      "chinese": "类目", //要
      "col": "RPT_KYLIN_AMZ_BRAND_NUM.CATEGORY",//要
      "columnType": "STRING",//要
      "uuid": "9c311849-9b4c-423c-bb6d-101378cc68f8",//要
      "relation": "EQUAL",//要
      "val": commonUtil.handelFormat(this._vue.chooseType)
    })
    condition.push({
      "chinese": "站点", //要
      "col": "RPT_KYLIN_AMZ_BRAND_NUM.SCGS_SITE_TYPE",//要
      "columnType": "STRING",//要
      "uuid": "fef59aa5-556c-44a4-b5b3-280299cc4390",//要
      "relation": "EQUAL",//要
    });
    commonUtil.queryData({
      url: "/query/single",
      async: true,
      queryParams: {
        cid: _this.TableItem.parmasConfig.brandCount.cid,
        //查询条件
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": messures ? messures : [],
          //demesion
          "groupbys": [],
          "tableName": "kylin_sales",
          "conditions": condition ? condition : [],
          "conditionMap": {}
        }),
        //固定
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": _this.TableItem.pageBean.oldPage,
          "currentPage": _this.TableItem.pageBean.currentPage,
          "pageSize": _this.TableItem.pageBean.pageSize
        }),
        //固定
        modelID: _this.TableItem.parmasConfig.brandCount.modelID
      },
      callback: (res) => {
        if (res.status == 1) {
          if (res.data.result && res.data.result.length > 0) {
            _this.TableItem.tableContainer.brandCount = res.data.result[0].join("");
            /*  _this.TableItem.tableContainer.tableColumns.forEach((item,index)=>{
                if(item.key===commonUtil.getUUID("品牌名",_this.TableItem.tableContainer.columns.demesion.concat(_this.TableItem.tableContainer.columns.messures))){
                  _this._vue.$set(item,"title","品牌名"+"("+_this.TableItem.tableContainer.brandCount+")");
                }
              })*/
          }
        }
      },
      error: () => {

      }
    })
  },

  /*----------产品名------------*/

  //获取汇总产品名
  getSumProductName(query) {
    let _this = this;
    let sendDemesion = [];
    let sendCondition = [];
    _this.TableItem.tableContainer.loadingState.productloading = true;
    this.TableItem.tableContainer.columns.extra.forEach((item, index) => {
      if (item.chinese === "类目") {
        if (this.collectBtnsActive == "tab3") {
          //收藏
          this._vue.$set(item, "val", "");
        } else {
          this._vue.$set(item, "val", commonUtil.handelFormat(this._vue.chooseType));
        }
      }
      if (item.chinese !== "BSR分类" && this.TableItem.showNewColumn != "name4") {
        sendCondition.push(item);
      }
    });
    this.TableItem.tableContainer.columns.demesion.forEach((item, index) => {
      if (item.chinese === "产品名称") {
        sendDemesion.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "EQUAL",//要
          "sortType": "ASC"
        })
        sendCondition.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "LIKE",//要
          "val": query ? query : ""
        });
      }
    })
    this.setNewSearchBox(this.TableItem.showNewColumn,sendCondition);
    let cid = this.TableItem.parmasConfig.query.cid;
    let modelId = this.TableItem.parmasConfig.query.modelID;
    let configUrl = tablePortHelper.getProductDataModel(this.TableItem.type,this.TableItem.showNewColumn).configUrl;
    let state = tablePortHelper.getProductDataModel(this.TableItem.type,this.TableItem.showNewColumn).state;
    if (this.collectBtnsActive == "tab3") {
      //收藏
      modelId = tablePortHelper.checkCollectionModel("productName").modelId;
      cid = tablePortHelper.checkCollectionModel("productName").cid;
      configUrl = tablePortHelper.checkCollectionModel("productName").configUrl;
      sendCondition.push({
        "col": "rpt_products_collections.is_collection",
        "chinese": "是否收藏",
        "alias": "is_collection",
        "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
        "val": 1,
        "columnType": "NUMBER",
        "relation": "EQUAL"
      })
    }
    let category = commonUtil.handelFormat(this._vue.chooseType);
    commonUtil.clearArray(_this.TableItem.tableContainer.productData);
    commonUtil.queryData({
      url: configUrl,
      async: true,
      queryParams: {
        cid: cid,
        //查询条件
        category: state == 1 ? category : "",
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": [],
          //demesion
          "groupbys": sendDemesion ? sendDemesion : [],
          "tableName": "kylin_sales",
          "conditions": sendCondition ? sendCondition : [],
          "conditionMap": {}
        }),
        //固定
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": 0,
          "currentPage": 1,
          "pageSize": 500
        }),
        //固定
        modelID: modelId
      },
      callback: (res) => {
        _this.TableItem.tableContainer.loadingState.productloading = false;
        if (res.status === 1) {
          let procucts = [];
          _this._vue.$store.commit("changeNoMoreData", false);
          if (res.data.result && res.data.result.length > 0) {
            res.data.result.forEach((item, i) => {
              item.forEach((strVal) => {
                procucts.push(strVal);
              })
            })
            procucts = commonUtil.filterRepeat(procucts);
            procucts.forEach((product, j) => {
              if (product != "") {
                _this.TableItem.tableContainer.productData.push({
                  value: product,
                  label: product
                })
              }
            })
          } else {
            _this.TableItem.tableContainer.productData = [];
            _this._vue.$store.commit("changeNoMoreData", true);
          }
        }
      }
    })
  },
  /*----------bsr品类-------------*/
  //获取bsr分类
  getBSRcategory(success) {
    let _this = this;
    let sendDemesion = [];
    let sendCondition = [];
    let columnMessure = [];
    //获取bsr分类
    this._vue.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal", "");
    commonUtil.clearArray(_this.TableItem.tableContainer.sortData);
    this.TableItem.tableContainer.columns.extra.forEach((item, index) => {
      if (item.chinese === "BSR分类") {
//            //默认的bsr品类
        sendDemesion.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "EQUAL",//要
          "sortType": "ASC"
        })
     /*   columnMessure.push({
            "chinese": "数量",
            "col": "count(1)",
            "columnType": "STRING",
            "uuid": "countss",
            "alias": "count_num"
          })*/
      }
      else {
        if (item.chinese === "类目") {
          if (this.collectBtnsActive == "tab3") {
            //收藏
            this._vue.$set(item, "val", "");
          } else {
            this._vue.$set(item, "val", commonUtil.handelFormat(this._vue.chooseType));
          }
        }
        sendCondition.push(item);
      }
    });
    let cid = this.TableItem.parmasConfig.query.cid;
    let modelId = this.TableItem.parmasConfig.query.modelID;
    let configUrl = "/di/box/data";
    if (this.collectBtnsActive == "tab3") {
      //收藏
      modelId = "504";
      cid = "504";
      configUrl = "/di/box/collection/data";
      sendCondition.push({
        "col": "rpt_products_collections.is_collection",
        "chinese": "是否收藏",
        "alias": "is_collection",
        "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
        "val": 1,
        "columnType": "NUMBER",
        "relation": "EQUAL"
      })
    }
    commonUtil.queryData({
      url: configUrl,
      queryParams: {
        cid: cid,
        //查询条件
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": columnMessure ? columnMessure : [],
          //demesion
          "groupbys": sendDemesion ? sendDemesion : [],
          "tableName": "kylin_sales",
          "conditions": sendCondition ? sendCondition : [],
          "conditionMap": {}
        }),
        //固定
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": 0,
          "currentPage": 1,
          "pageSize": 500
        }),
        //固定
        modelID: modelId
      },
      callback: (res) => {
        if (res.status === 1) {
          let sorts = [];
          let showBig = false;
          if (res.data.result && res.data.result.length > 0) {
            res.data.result.forEach((item, i) => {
              if(item[0]){
                let arr=item[0].split(">");
                if(arr[0]){
                  sorts.push(arr[0]);
                }
              }
            })
            _this.TableItem.tableContainer.sortData.push({
              value: "全部",
              label: "全部"
            })
            _this._vue.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal","全部");
            sorts=commonUtil.filterRepeat(sorts);
            sorts.forEach((sort, j) => {
              if (sort && sort!= "") {
                if (sort == this._vue.chooseType[0]) {
                  //获取当前类目的最大类目
                  showBig = true;
                  // _this._vue.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal", sort[0]);
                }
                _this.TableItem.tableContainer.sortData.push({
                  value: sort,
                  label: sort
                })
              }
            })
            if (_this.TableItem.tableContainer.sortData.length > 0) {
              if (_this.TableItem.showNewColumn == "name1") {
                if (!showBig) {
                  //判断当前类目是否存在
                  // _this._vue.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal", _this.TableItem.tableContainer.sortData[0].value);
                }
              }
            }
            success && success();
          } else {
            this._vue.showMessage.push(1);
            success && success();
          }
        }
      },
      error: () => {
      },
      complete: (res) => {
      }
    })
  },

  //获取新推荐的BSR分类
  getNewsThirtyBsr() {
    let _this = this;
    let sendDemesion = [];
    let sendCondition = [];
    let columnMessure = [];
    //获取bsr分类
    this._vue.$set(this.TableItem.tableContainer.queryData.BSRsort, "inputVal", "");
    this.TableItem.tableContainer.columns.extra.forEach((item, index) => {
      if (item.chinese === "BSR分类") {
//            //默认的bsr品类
        sendDemesion.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "EQUAL",//要
          "sortType": "ASC"
        })
        columnMessure.push({
          "chinese": "数量",
          "col": "count(1)",
          "columnType": "STRING",
          "uuid": "countss",
          "alias": "count_num"
        })
      }
      else {
        if (item.chinese === "类目") {
          if (this.collectBtnsActive == "tab3") {
            //收藏
            this._vue.$set(item, "val", "");
          } else {
            this._vue.$set(item, "val", commonUtil.handelFormat(this._vue.chooseType));
          }
        }
        sendCondition.push(item);
      }
    });
    //控件条件配置
    if (this.TableItem.showNewColumn == "name3") {
      //带条件
      let obj1 = this.TableItem.tableContainer.queryData.incrementTop;
      let objSend1 = {
        "col": obj1.col,
        "chinese": obj1.chinese,
        "uuid": obj1.uuid,
        "columnType": obj1.columnType ? obj1.columnType : "",
        "relation": "EQUAL",
        "val": obj1.inputVal == "" ? 99999999 : obj1.inputVal
      }
      let obj2 = this.TableItem.tableContainer.queryData.sellDays;
      let objSend2 = {
        "col": obj2.col,
        "chinese": obj2.chinese,
        "uuid": obj2.uuid,
        "columnType": obj2.columnType ? obj2.columnType : "",
        "relation": "EQUAL",
        "val": obj2.inputVal
      }
      //增长度
      let obj3 = this.TableItem.tableContainer.queryData.growth;
      let objSend3 = {
        left: {
          "col": "$repl$largeAngle",
          "chinese": obj3.chinese,
          "uuid": obj3.uuid,
          "columnType": obj3.columnType ? obj3.columnType : "",
          "relation": "LARGEEQUAL", //>=
          "val": obj3.inputVal[0]
        },
        right: {
          "col": "$repl$lessAngle",
          "chinese": obj3.chinese,
          "uuid": obj3.uuid,
          "columnType": obj3.columnType ? obj3.columnType : "",
          "relation": "LESSEQUAL", //>=
          "val": obj3.inputVal[1]
        }
      }
      //偏差度
      let obj4 = this.TableItem.tableContainer.queryData.deflection;
      let objSend4 = {
        left: {
          "col": "$repl$largeR",
          "chinese": obj4.chinese,
          "uuid": obj4.uuid,
          "columnType": obj4.columnType ? obj4.columnType : "",
          "relation": "LARGEEQUAL", //>=
          "val": obj4.inputVal[0] / 100
        },
        right: {
          "col": "$repl$lessrR",
          "chinese": obj4.chinese,
          "uuid": obj4.uuid,
          "columnType": obj4.columnType ? obj4.columnType : "",
          "relation": "LESSEQUAL", //>=
          "val": obj4.inputVal[1] / 100
        }
      }
      sendCondition.push(objSend1);
      sendCondition.push(objSend2);
      sendCondition.push(objSend3.left);
      sendCondition.push(objSend3.right);
      sendCondition.push(objSend4.left);
      sendCondition.push(objSend4.right);
    }
    let cid = this.TableItem.parmasConfig.query.cid;
    let modelId = this.TableItem.parmasConfig.query.modelID;
    let configUrl = "/di/box/data";
    if (this.collectBtnsActive == "tab3") {
      //收藏
      modelId = "504";
      cid = "504";
      configUrl = "/di/box/collection/data";
      sendCondition.push({
        "col": "rpt_products_collections.is_collection",
        "chinese": "是否收藏",
        "alias": "is_collection",
        "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
        "val": 1,
        "columnType": "NUMBER",
        "relation": "EQUAL"
      })
    }
    commonUtil.queryData({
      url: configUrl,
      queryParams: {
        cid: cid,
        //查询条件
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": columnMessure ? columnMessure : [],
          //demesion
          "groupbys": sendDemesion ? sendDemesion : [],
          "tableName": "kylin_sales",
          "conditions": sendCondition ? sendCondition : [],
          "conditionMap": {}
        }),
        //固定
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": this.pageBean.oldPage,
          "currentPage": this.pageBean.currentPage,
          "pageSize": this.pageBean.pageSize
        }),
        //固定
        modelID: modelId
      },
      callback: (res) => {
        if (res.status === 1) {
          let sorts = [];
          let showBig = false;
          _this._vue.$store.commit("changeNoMoreData", false);
          if (res.data.result && res.data.result.length > 0) {
            res.data.result.forEach((item, i) => {
              sorts.push(item);
            })
            if (_this.TableItem.showNewColumn == "name3") {
              if (_this.pageBean.currentPage == 1) {
                _this.TableItem.tableContainer.sortData.push({
                  label: "全部",
                  value: "全部"
                })
              }
            }
            sorts.forEach((sort, j) => {
              if (sort[0] && sort[0] != "") {
                sort[0] = sort[0].toLowerCase();
                _this.TableItem.tableContainer.sortData.push({
                  value: sort[0],
                  label: sort[0] + "(" + sort[1] + ")"
                })
                if (_this.isFirstBsr) {
                  if (sort[0] == _this._vue.chooseType[0]) {
                    //获取当前类目的最大类目
                    showBig = true;
                    _this._vue.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal", sort[0]);
                  }
                }
              }
            })
            //input赋值
            if (_this.isFirstBsr) {
              if (_this.TableItem.tableContainer.sortData.length > 0) {
                if (!showBig) {
                  //判断当前类目是否存在
                  _this._vue.$set(_this.TableItem.tableContainer.queryData.BSRsort, "inputVal", _this.TableItem.tableContainer.sortData[0].value);
                }
              }
            }

          } else {
            _this._vue.$store.commit("changeNoMoreData", true);
          }
        }
      },
      error: () => {
      },
      complete: (res) => {
      }
    })
  },

  //搜索bsr品类
  queryBsrData(query) {
    let _this = this;
    this.queryStr = query;
    let sendDemesion = [];
    let sendCondition = [];
    let columnMessure = [];
    //获取bsr分类
    this.TableItem.tableContainer.columns.extra.forEach((item, index) => {
      if (item.chinese === "BSR分类") {
//            //默认的bsr品类
        sendDemesion.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "EQUAL",//要
          "sortType": "ASC"
        })
        columnMessure.push({
          "chinese": "数量",
          "col": "count(1)",
          "columnType": "STRING",
          "uuid": "countss",
          "alias": "count_num"
        })
        sendCondition.push({
          "chinese": item.chinese, //要
          "col": item.col,//要
          "columnType": item.columnType,//要
          "uuid": item.uuid,//要
          "relation": "LIKE",//要
          "val": this.queryStr ? this.queryStr : ""
        });
      }
      else {
        if (item.chinese === "类目") {
          if (this.collectBtnsActive == "tab3") {
            //收藏
            this._vue.$set(item, "val", "");
          } else {
            this._vue.$set(item, "val", commonUtil.handelFormat(this._vue.chooseType));
          }
        }
        sendCondition.push(item);
      }
    });
    //控件条件配置
    if (this.TableItem.showNewColumn == "name3") {
      //带条件
      let obj1 = this.TableItem.tableContainer.queryData.incrementTop;
      let objSend1 = {
        "col": obj1.col,
        "chinese": obj1.chinese,
        "uuid": obj1.uuid,
        "columnType": obj1.columnType ? obj1.columnType : "",
        "relation": "EQUAL",
        "val": obj1.inputVal == "" ? 99999999 : obj1.inputVal
      }
      let obj2 = this.TableItem.tableContainer.queryData.sellDays;
      let objSend2 = {
        "col": obj2.col,
        "chinese": obj2.chinese,
        "uuid": obj2.uuid,
        "columnType": obj2.columnType ? obj2.columnType : "",
        "relation": "EQUAL",
        "val": obj2.inputVal
      }
      //增长度
      let obj3 = this.TableItem.tableContainer.queryData.growth;
      let objSend3 = {
        left: {
          "col": "$repl$largeAngle",
          "chinese": obj3.chinese,
          "uuid": obj3.uuid,
          "columnType": obj3.columnType ? obj3.columnType : "",
          "relation": "LARGEEQUAL", //>=
          "val": obj3.inputVal[0]
        },
        right: {
          "col": "$repl$lessAngle",
          "chinese": obj3.chinese,
          "uuid": obj3.uuid,
          "columnType": obj3.columnType ? obj3.columnType : "",
          "relation": "LESSEQUAL", //>=
          "val": obj3.inputVal[1]
        }
      }
      //偏差度
      let obj4 = this.TableItem.tableContainer.queryData.deflection;
      let objSend4 = {
        left: {
          "col": "$repl$largeR",
          "chinese": obj4.chinese,
          "uuid": obj4.uuid,
          "columnType": obj4.columnType ? obj4.columnType : "",
          "relation": "LARGEEQUAL", //>=
          "val": obj4.inputVal[0] / 100
        },
        right: {
          "col": "$repl$lessrR",
          "chinese": obj4.chinese,
          "uuid": obj4.uuid,
          "columnType": obj4.columnType ? obj4.columnType : "",
          "relation": "LESSEQUAL", //>=
          "val": obj4.inputVal[1] / 100
        }
      }
      sendCondition.push(objSend1);
      sendCondition.push(objSend2);
      sendCondition.push(objSend3.left);
      sendCondition.push(objSend3.right);
      sendCondition.push(objSend4.left);
      sendCondition.push(objSend4.right);
    }
    let modelId = this.TableItem.parmasConfig.query.modelID;
    let cid = this.TableItem.parmasConfig.query.cid;
    let configUrl = "/di/box/data";
    if (this.collectBtnsActive == "tab3") {
      //收藏
      modelId = "504";
      cid = "504";
      configUrl = "/di/box/collection/data";
      sendCondition.push({
        "col": "rpt_products_collections.is_collection",
        "chinese": "是否收藏",
        "alias": "is_collection",
        "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
        "val": 1,
        "columnType": "NUMBER",
        "relation": "EQUAL"
      })
    }
    commonUtil.queryData({
      url: configUrl,
      async: false,
      queryParams: {
        cid: cid,
        //查询条件
        sqlParam: JSON.stringify({
          //measures
          "columnMessure": columnMessure ? columnMessure : [],
          //demesion
          "groupbys": sendDemesion ? sendDemesion : [],
          "tableName": "kylin_sales",
          "conditions": sendCondition ? sendCondition : [],
          "conditionMap": {}
        }),
        //固定
        project: "scgs_amazon",
        pageBean: JSON.stringify({
          "oldCurrentPage": this.pageBean.oldPage,
          "currentPage": this.pageBean.currentPage,
          "pageSize": this.pageBean.pageSize
        }),
        //固定
        modelID: modelId
      },
      callback: (res) => {
        if (res.status === 1) {
          let sorts = [];
          _this._vue.$store.commit("changeNoMoreData", false);
          if (res.data.result && res.data.result.length > 0) {
            res.data.result.forEach((item, i) => {
              sorts.push(item);
            })
            if (_this.TableItem.showNewColumn == "name3") {
              if (this.queryStr == "") {
                _this.TableItem.tableContainer.sortData.push({
                  label: "全部",
                  value: "全部"
                })
              }
            }
            sorts.forEach((sort, j) => {
              if (sort[0] && sort[0] != "") {
                _this.TableItem.tableContainer.sortData.push({
                  value: sort[0],
                  label: sort[0] + "(" + sort[1] + ")"
                })
              }
            })
          } else {
            _this._vue.$store.commit("changeNoMoreData", true);
          }
        }
      },
      error: () => {
      },
      complete: (res) => {
      }
    })
  },

  //默认保存Bsr
  defaultBsrVal(success) {
    if (this._vue.$store.state.bsr) {
      this.TableItem.tableContainer.queryData.BSRsort.inputVal = this._vue.$store.state.bsr;
      //判断是否带过来
      this.searchData();
      this.getTableCount(() => {
        if (this.TableItem.pageBean.totalCount == 0) {
          this.getTipsState((data) => {
            if (this.TableItem.type == "explode") {
              if (!data.noMoreTipsExplode) {
                this.isNoData = true;
              }
            }
            else {
              if (!data.noMoreTipsNews) {
                this.isNoData = true;
              }
            }
          })
          this._vue.$set(this.TableItem.tableContainer.queryData.BSRsort, "inputVal", "全部");
          commonUtil.clearArray(this._vue.chooseType);
          this._vue.chooseType.push("");
        }
        commonUtil.clearArray(this.TableItem.initCondition.condition);
        success && success();
      });
    } else {
      //空
      this.getTipsState((data) => {
        if (this.TableItem.type == "explode") {
          if (!data.noMoreTipsExplode) {
            this.isNoData = true;
          }
        }
        else {
          if (!data.noMoreTipsNews) {
            this.isNoData = true;
          }
        }
      })
      this._vue.$set(this.TableItem.tableContainer.queryData.BSRsort, "inputVal", "全部");
      commonUtil.clearArray(this._vue.chooseType);
      this._vue.chooseType.push("");
      commonUtil.clearArray(this.TableItem.initCondition.condition);
      success && success();
    }
  },

  /*------------表格收藏-----------------*/
  //点击收藏
  isCollect(flag) {
    this.collectBtnsActive = flag;
  },

  //收藏发送请求
  getCollectionBefore(condition){
    //类目重置
    condition.forEach((itemCon) => {
      if (itemCon.chinese === "类目") {itemCon.val="";}
    });
    condition.push({
      "col": "rpt_products_collections.is_collection",
      "chinese": "是否收藏",
      "alias": "is_collection",
      "uuid": "8d19assa9c-1s9ad-4sss4ssss8-b859-fss6d904aef88a",
      "val": 1,
      "columnType": "NUMBER",
      "relation": "EQUAL"
    });
   },

  /*----------分页模块-------------------*/

  //分页请求处理
  changeNextPage(page) {
    if (this.TableItem.tableContainer.tableData.length == 0) {
      return;
    }
    //获取页数
    this.TableItem.pageBean.currentPage = page;
    this.TableItem.pageBean.toPage = page;
    this.TableItem.initCondition.isPage = true;
    //获取下/上一页数据
    this.getTableData();
  },

  //切换页数
  changeSize(size) {
    this.TableItem.pageBean.pageSize = size;
    if (this.TableItem.pageBean.currentPage == 1) {
      this.TableItem.pageBean.currentPage = 1;
      this.TableItem.pageBean.toPage = 1;
      this.TableItem.initCondition.isPage = true;
      //获取下/上一页数据
      this.getTableData();
    }
  },
  //日期-年月日
  formateDateYMD(str){
    let date=new Date(str);
    if(date instanceof Date){
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '年' + m + '月' + d+"日";
    }else{
      return "无"
    }
  }
}
