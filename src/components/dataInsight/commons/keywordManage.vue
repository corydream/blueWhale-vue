<template>
  <div>
    <div class="sign" id="explodeKeyword">
      <div class="explodewrap">
        <div class="topColumn">
          <div class="breadBox ivu-breadcrumb">
                <span>
                  <span class="ivu-breadcrumb-item-link"
                        @click="goBack(showDataObj.routePath.back)">{{type | showText}}</span>
                  <span class="ivu-breadcrumb-item-separator">/</span>
                </span>
            <span>
                  <span class="ivu-breadcrumb-item-link" @click="goBack(showDataObj.routePath.current)">产品描述词频明细</span>
                  <span class="ivu-breadcrumb-item-separator">/</span></span>
          </div>
        </div>
        <Tabs :value="status.type" @on-click="currentTab">
          <TabPane label="产品描述" name="deskeyworddata">
            <div class="container" v-if="status.type==='deskeyworddata'">
              <div class="search">
                <Row>
                  <Col span="4">
                  <Button type="primary" class="saveBtn" :class="{activeBtn:status.isActive}" @click="saveCurrentChart">
                    保存显示
                  </Button>
                  </Col>
                  <Col span="8">
                  <Input v-model="searchValue" placeholder="请输入关键词" style="width: 300px"
                         @on-enter="queryKeyword"></Input>
                  <Button type="primary" class="searchBtn" @click="queryKeyword">搜索</Button>
                  </Col>
                  <Col span="12">
                  <span class="titlePre">词云预览</span></Col>
                </Row>
              </div>
              <div class="keywordcontent">
                <div class="tableBox">
                  <Table height="520" :loading="status.loading" border @on-sort-change="sortAll"
                         :columns="showDataObj.tableKeyword.columns"
                         :data="showDataObj.tableKeyword.tableDatas"
                         @on-selection-change="tabChart"
                         @on-select-cancel="cancelStatus"
                  ></Table>
                  <div style="margin-bottom: 30px;margin-top:20px;overflow: hidden">
                    <div style="float: right;">
                      <el-button-group>
                        <el-button type="primary" @click="changePrevPage()"><i class="el-icon-arrow-left"></i>&nbsp;上一页
                        </el-button>
                        <el-button type="primary" @click="changeNextPage()">下一页<i
                          class="el-icon-arrow-right el-icon--right"></i></el-button>
                      </el-button-group>
                      <!--选择多少每一页大小-->
                      <Select v-model="showDataObj.pageBean.pageSize" style="width:100px;" @on-change="changeSize">
                        <Option v-for="item in showDataObj.pageBean.pageSizes" :value="item.value" :key="item.value">
                          {{ item.label }}
                        </Option>
                      </Select>
                      <!--跳动多少页-->
                      跳至 <Input v-model="showDataObj.pageBean.toPage" style="width:80px" number
                                @on-keyup.enter="toWhatPage"></Input>&nbsp;页
                    </div>
                  </div>
                </div>
                <div class="chartBox" v-show="status.echartShow">
                  <p class="sub-title">产品描述-关键词词频分析</p>
                  <div class="wrapChart"
                       :class="[showDataObj.echartItem.chartClass+'chart',showDataObj.echartItem.chartClass]">
                    <div :id="showDataObj.echartItem.chartWrapClass+'deskeyworddata'" class="innerChart"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="产品标题" name="titlekeyworddata">
            <div class="container" v-if="status.type==='titlekeyworddata'">
              <div class="search">
                <Row>
                  <Col span="4">
                  <Button type="primary" class="saveBtn" :class="{activeBtn:status.isActive}" @click="saveCurrentChart">
                    保存显示
                  </Button>
                  </Col>
                  <Col span="8">
                  <Input v-model="searchValue" placeholder="请输入关键词" style="width: 300px"
                         @on-enter="queryKeyword"></Input>
                  <Button type="primary" class="searchBtn" @click="queryKeyword">搜索</Button>
                  </Col>
                  <Col span="12">
                  <span class="titlePre">词云预览</span></Col>
                </Row>
              </div>
              <div class="keywordcontent">
                <div class="tableBox">
                  <Table height="520" :loading="status.loading" border @on-sort-change="sortAll"
                         :columns="showDataObj.tableKeyword.columns" :data="showDataObj.tableKeyword.tableDatas"
                         @on-selection-change="tabChart" @on-select-cancel="cancelStatus"></Table>
                  <div style="margin-bottom: 30px;margin-top:20px;overflow: hidden">
                    <div style="float: right;">
                      <el-button-group>
                        <el-button type="primary" @click="changePrevPage()"><i class="el-icon-arrow-left"></i>&nbsp;上一页
                        </el-button>
                        <el-button type="primary" @click="changeNextPage()">下一页<i
                          class="el-icon-arrow-right el-icon--right"></i></el-button>
                      </el-button-group>
                      <!--选择多少每一页大小-->
                      <Select v-model="showDataObj.pageBean.pageSize" style="width:100px;" @on-change="changeSize">
                        <Option v-for="item in showDataObj.pageBean.pageSizes" :value="item.value" :key="item.value">
                          {{ item.label }}
                        </Option>
                      </Select>
                      <!--跳动多少页-->
                      跳至 <Input v-model="showDataObj.pageBean.toPage" style="width:80px" number
                                @on-keyup.enter="toWhatPage"></Input>&nbsp;页
                    </div>
                  </div>
                </div>
                <div class="chartBox" v-show="status.echartShow">
                  <p class="sub-title">产品标题-关键词词频分析</p>
                  <div class="wrapChart"
                       :class="[showDataObj.echartItem.chartClass+'chart',showDataObj.echartItem.chartClass]">
                    <div :id="showDataObj.echartItem.chartWrapClass+'titlekeyworddata'" class="innerChart"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>

      </div>
    </div>
  </div>
</template>
<script>
  import commonUtil from "../../../config/insight/commons/comonUse";
  import chartBoxUtil from "../../../config/insight/commons/chartMethods";
  export default {
    data() {
      return {
        status: {
          isPage: false,//是否是翻页
          echartShow: true,//是否展示图表
          loading: true,
          type: "",//描述或名词关键词切换
          isSearch: false,//初始化 搜索
          isPage: false,//是否翻页
          isChoose: false,//是否勾选
          isActive: false//保存显示按钮是否激活
        },
        searchValue: "",//搜索的词
        sendObj: { //发送条件对象
          measures: [],
          demesion: [],
          condition: []
        },
        type: "",//当前请求页面的类型，
      }
    },
    props: ['datas', 'showDataObj', 'keywordObj'],
    created() {
      if (this.datas) {
        this.$parent.setChartCondition();
        this.$set(this.status, "type", this.datas.keywordDatas.classStyle.types);
        this.type = this.datas.type;
        this.initData();
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.sessionStorage.setItem("params", JSON.stringify({
          category: this.datas.chooseType,
          keywordObj: this.keywordObj ? this.keywordObj : null,
          btnState: this.status.type
        }))
      })
    },
    filters: {
      showText(type) {
        switch (type) {
          case "explode":
            return "爆品挖掘引擎";
          case "news":
            return "新品推荐引擎";
          case "keyword":
            return "关键词产品分析";
        }
      }
    },
    methods: {
      //初始化数据
      initData() {
        this.getCurrentSelect(() => {
          this.getTop1000Data(() => {
            this.drawTableChart();
          });
        });
      },
      //路由跳转
      goBack(name) {
        this.$router.push({
          name: name,
          params: {
            category: this.datas.chooseType,
            keywordObj: this.keywordObj ? this.keywordObj : null,
            btnState: this.status.type
          }
        })
      },
      //tab切换
      currentTab(type) {
        this.$set(this.status, "type", type);
        //显示保存按钮激活状态
        this.status.isActive = false;
        //点击搜索
        this.searchValue = "";
        this.showDataObj.echartItem.echartContainer.echartInfo[type].measures.forEach((dem, key) => {
          if (dem.chinese === "数量") {
            this.$set(dem, "sortType", "DESC")
          }
        })
        this.showDataObj.pageBean.currentPage = 1;
        this.showDataObj.pageBean.oldPage = 1;
        this.showDataObj.pageBean.toPage = this.showDataObj.pageBean.currentPage;
        commonUtil.clearArray(this.showDataObj.tableKeyword.tableDatas);
        //重新获取数据
        this.initData();
      },
      //获取原来保存的状态
      getCurrentSelect(callfn) {
        let _this = this;
        let category = commonUtil.handelFormat(this.datas.chooseType);//当前类目、站点
        if (this.type === "keyword") {
          category += "#$" + this.keywordObj.keyword
        }
        let keywordType = {
          requestType: this.type,
          descType: this.status.type
        };
        commonUtil.queryData({
          url: '/keywords/get',
          queryParams: {
            category: category,
            keywordType: JSON.stringify(keywordType)
          },
          callback: (res) => {
            if (res.status == 1) {
              //返回数据
              let result = res.data ? JSON.parse(res.data) : [];
              commonUtil.clearArray(_this.showDataObj.echartItem.echartContainer.beforeStateData);
              if (result.length != 0) {
                result.forEach((row, index) => {
                  //保存之前取消的数据
                  if (row.length != 0) {
                    _this.showDataObj.echartItem.echartContainer.beforeStateData.push({
                      name: row[0],
                      value: row[1],
                      _checked: false
                    })
                  }
                })
              }
              callfn && callfn();
            }
          }
        })
      },
      //获取全部高频的关键词
      getTop1000Data(callback) {
        let _this = this;
        //配置图表数据
        this.setchartData();
        for (var key in this.showDataObj.echartItem.echartContainer.echartInfo) {
          let paramsObj = this.showDataObj.echartItem.echartContainer.echartInfo[key];
          if (paramsObj.type === this.status.type) {
            //配置类目站点条件
            let sendCondition = [];
            paramsObj.condition.forEach((row, i) => {
              if (row.chinese == "类目") {
                this.$set(row, "val", commonUtil.handelFormat(this.datas.chooseType))
              } else if (row.chinese == "关键词") {
                if (this.keywordObj) {
                  this.$set(row, "val", this.keywordObj.keyword);
                }
              } else if (row.chinese == "任务id") {
                if (this.keywordObj) {
                  this.$set(row, "val", this.keywordObj.taskID);
                }
              }
            })
            paramsObj.condition.forEach((item, i) => {
              sendCondition.push(item)
            });
            ((paramsObj) => {
              commonUtil.queryData({
                url: "/query/kylin",
                queryParams: {
                  //固定
                  cid: paramsObj.cid,
                  //查询条件
                  sqlParam: JSON.stringify({
                    "columnMessure": paramsObj.measures ? paramsObj.measures : [],
                    "groupbys": paramsObj.demesion ? paramsObj.demesion : [],
                    "tableName": "kylin_sales",
                    "conditions": sendCondition,
                    "conditionMap": {}
                  }),
                  //固定
                  project: "scgs_amazon",
                  pageBean: JSON.stringify({
                    "oldCurrentPage": 1,
                    "currentPage": 1,
                    "pageSize": paramsObj.pageSize
                  }),
                  //固定
                  modelID: paramsObj.modelID
                },
                callback: (res) => {
                  if (res.status == 1) {
                    let result = res.data.result;
                    commonUtil.clearArray(_this.showDataObj.echartItem.echartContainer.saveTopSizeData);
                    commonUtil.clearArray(_this.showDataObj.echartItem.echartContainer.saveCheckedDatas);
                    if (result.length != 0) {
                      result.forEach((row, index) => {
                        _this.showDataObj.echartItem.echartContainer.saveTopSizeData.push(
                          {name: row[0], value: row[1], "_checked": true, percent: row[2]})
                      })
                    }
                    //根据上一次保存的改变状态
                    _this.showDataObj.echartItem.echartContainer.saveTopSizeData.forEach((items, flag) => {
                      if (_this.showDataObj.echartItem.echartContainer.beforeStateData.length > 0) {
                        _this.showDataObj.echartItem.echartContainer.beforeStateData.forEach((obj, i) => {
                          if (obj.name === items.name) {
                            items._checked = false;
                          }
                        })
                      }
                      if (items._checked) {
                        _this.showDataObj.echartItem.echartContainer.saveCheckedDatas.push(items);
                      }
                    })

                    callback && callback();
                    _this.$set(_this.showDataObj.echartItem.echartContainer.echartsData[0].series[0], "data", _this.showDataObj.echartItem.echartContainer.saveCheckedDatas);
                    _this.drawOneGraph(_this.showDataObj.echartItem.echartContainer.echartsData[0]);
                  } else {
                    _this.status.loading = false;
                    commonUtil.clearArray(_this.showDataObj.tableKeyword.tableDatas);
                  }

                },
                error: () => {
                  _this.status.loading = false;
                  commonUtil.clearArray(_this.showDataObj.tableKeyword.tableDatas);
                }
              })
            })(paramsObj)
          }
        }
      },
      //保存显示
      saveCurrentChart() {
        let _this = this;
        if (!this.status.isActive) {
          return;
        }
        //返回数据
        commonUtil.clearArray(this.showDataObj.echartItem.echartContainer.saveCancelData);
        this.showDataObj.echartItem.echartContainer.saveTopSizeData.forEach((item, i) => {
          if (!item._checked) {
            this.showDataObj.echartItem.echartContainer.saveCancelData.push(item);
          }
        })
        let category = commonUtil.handelFormat(this.datas.chooseType);//当前类目、站点
        if (this.type === "keyword") {
          category += "#$" + this.keywordObj.keyword
        }
        let keywordType = {
          requestType: this.type,
          descType: this.status.type
        };//关键词过滤类型
        let keywords = [];//当前取消选中的关键词
        if (this.showDataObj.echartItem.echartContainer.saveCancelData.length > 0) {
          keywords = [];//当前取消选中的关键词
          this.showDataObj.echartItem.echartContainer.saveCancelData.forEach((item, index) => {
            keywords.push([
              item.name,
              item.value
            ])
          })
        } else {
          keywords.push([]);
        }
        commonUtil.queryData({
          url: '/keywords/update',
          queryParams: {
            keywords: JSON.stringify(keywords),
            category: category,
            keywordType: JSON.stringify(keywordType)
          },
          callback: (result) => {
            if (result.status === 1) {
              //返回数据
              _this.$Modal.success({
                title: "提示",
                content: "保存成功",
                onOk: () => {
                  _this.$router.push({
                    name: _this.showDataObj.routePath.back,
                    params: {
                      category: _this.datas.chooseType,
                      btnState: _this.status.type,
                      keywordObj: _this.keywordObj ? _this.keywordObj : null
                    }
                  })
                }
              });
            } else {
              //保存失败
              _this.$Modal.error({
                title: "提示",
                content: "保存失败"
              });
            }
          }
        })

      },
      /*****************表格****************/
      //搜索关键词
      queryKeyword() {
        this.$set(this.status, "loading", true);
        //清空数据
        commonUtil.clearArray(this.sendObj.condition);
        //配置搜索查询条件
        if (this.searchValue != "") {
          if (this.status.type === "deskeyworddata") {
            //描述关键词
            this.sendObj.demesion = this.showDataObj.echartItem.echartContainer.echartInfo.deskeyworddata.demesion;
            this.sendObj.condition.push({
              "col": this.sendObj.demesion[0].col,
              "chinese": this.sendObj.demesion[0].chinese,
              "uuid": this.sendObj.demesion[0].uuid,
              "columnType": this.sendObj.demesion[0].columnType ? this.sendObj.demesion[0].columnType : "",
              "relation": "LIKE",
              "val": this.searchValue
            })
          } else {
            //标题关键词
            this.sendObj.demesion = this.showDataObj.echartItem.echartContainer.echartInfo.titlekeyworddata.demesion;
            this.sendObj.condition.push({
              "col": this.sendObj.demesion[0].col,
              "chinese": this.sendObj.demesion[0].chinese,
              "uuid": this.sendObj.demesion[0].uuid,
              "columnType": this.sendObj.demesion[0].columnType ? this.sendObj.demesion[0].columnType : "",
              "relation": "LIKE",
              "val": this.searchValue
            })
          }
        }
        this.$set(this.status, "isSearch", true);
        this.drawTableChart();
      },
      //多选框发生变化
      tabChart(selection) {
        //显示保存按钮激活状态
        this.status.isActive = true;
        //saveTopSizeData用于记录数据的状态
        commonUtil.clearArray(this.showDataObj.echartItem.echartContainer.saveCheckedDatas);
        this.showDataObj.echartItem.echartContainer.saveTopSizeData.forEach((item, i) => {
          if (selection && selection.length > 0) {
            selection.forEach((sel, j) => {
              if (item.name === sel.name) {
                item._checked = true;
              }
            });
          } else {
            this.showDataObj.echartItem.echartContainer.saveCurrentData.forEach((choose, j) => {
              if (item.name === choose.name) {
                item._checked = false;
              }
            });
          }
          //获取全部被选中的
          if (item._checked) {
            this.showDataObj.echartItem.echartContainer.saveCheckedDatas.push(item);
          }
        });
        //画出所有被选中的项
        this.$set(this.status, "isChoose", true);
        if (this.status.isChoose) {
          this.$set(this.showDataObj.echartItem.echartContainer.echartsData[0].series[0], "data", this.showDataObj.echartItem.echartContainer.saveCheckedDatas);
          this.drawOneGraph(this.showDataObj.echartItem.echartContainer.echartsData[0]);
        }
        this.$set(this.status, "isChoose", false)
      },
      //取消选择
      cancelStatus(selection, row) {
        //saveTopSizeData用于记录数据的状态
        this.showDataObj.echartItem.echartContainer.saveTopSizeData.forEach((item, i) => {
          if (item.name === row.name) {
            item._checked = false;
          }
        });
      },
      //排序
      sortAll(item) {
        if (item.order === "normal") {
          item.order = "DEFAULT";
        }
        let type = this.status.type;
        this.showDataObj.echartItem.echartContainer.echartInfo[type].measures.forEach((dem, key) => {
          if (dem.chinese === "数量") {
            this.$set(dem, "sortType", item.order.toUpperCase())
          } else {
            this.$set(dem, "sortType", "DEFAULT");
          }
        })
        this.queryKeyword();
      },
      /*********************图表********************/
      //配置图表绘图信息
      setchartData() {
        let treeUrl = require("../../../assets/images/circle.png");
        var maskImage = new Image();
        maskImage.src = treeUrl;
        commonUtil.clearArray(this.showDataObj.echartItem.echartContainer.echartsData);
        for (let key in this.showDataObj.echartItem.echartContainer.echartInfo) {
          let obj = this.showDataObj.echartItem.echartContainer.echartInfo[key];
          if (obj.type === this.status.type) {
            let currentChart = chartBoxUtil.setCharts(obj.graphType, obj, maskImage);
            this.showDataObj.echartItem.echartContainer.echartsData.push(currentChart);
          }
        }
      },
      //获取图表数据
      getechartData() {
        let _this = this;
        //配置图表数据
        this.setchartData();
        this.status.loading = true;
        for (var key in this.showDataObj.echartItem.echartContainer.echartInfo) {
          let paramsObj = this.showDataObj.echartItem.echartContainer.echartInfo[key];
          if (paramsObj.type === this.status.type) {
            //配置类目站点条件
            paramsObj.condition.forEach((row, i) => {
              if (row.chinese == "类目") {
                this.$set(row, "val", commonUtil.handelFormat(this.datas.chooseType))
              } else if (row.chinese == "关键词") {
                if (this.keywordObj) {
                  this.$set(row, "val", this.keywordObj.keyword);
                }
              } else if (row.chinese == "任务id") {
                if (this.keywordObj) {
                  this.$set(row, "val", this.keywordObj.taskID);
                }
              }
            })
            if (this.status.isSearch) {
              //点击搜索
              this.showDataObj.pageBean.currentPage = 1;
              this.showDataObj.pageBean.oldPage = 1;
              this.showDataObj.pageBean.toPage = this.showDataObj.pageBean.currentPage;
              paramsObj.condition.forEach((item, i) => {
                this.sendObj.condition.push(item);
              });
              this.$set(this.status, "isSearch", false);
            } else {
              //是否翻页
              if (!this.status.isPage) {
                commonUtil.clearArray(this.sendObj.condition);
                paramsObj.condition.forEach((item, i) => {
                  this.sendObj.condition.push(item);
                });
              }
              this.$set(this.status, "isPage", false)
            }
            ((paramsObj) => {
              commonUtil.queryData({
                url: "/query/kylin",
                queryParams: {
                  //固定
                  cid: paramsObj.cid,
                  //查询条件
                  sqlParam: JSON.stringify({
                    "columnMessure": paramsObj.measures ? paramsObj.measures : [],
                    "groupbys": paramsObj.demesion ? paramsObj.demesion : [],
                    "tableName": "kylin_sales",
                    "conditions": _this.sendObj.condition,
                    "conditionMap": {}
                  }),
                  //固定
                  project: "scgs_amazon",
                  pageBean: JSON.stringify({
                    "oldCurrentPage": this.showDataObj.pageBean.oldPage,
                    "currentPage": this.showDataObj.pageBean.currentPage,
                    "pageSize": this.showDataObj.pageBean.pageSize || 10
                  }),
                  //固定
                  modelID: paramsObj.modelID
                },
                callback: (res) => {
                  commonUtil.clearArray(_this.showDataObj.echartItem.echartContainer.saveCurrentData);
                  let savedatas = _this.showDataObj.echartItem.echartContainer.saveCurrentData;
                  if (res.status === 1) {
                    var result = res.data.result;
                    if (result.length != 0) {
                      result.forEach((row, index) => {
                        savedatas.push({name: row[0], value: row[1], _checked: true, percent: row[2]});
                      })
                    }
                    //根据top1000保存选中状态
                    savedatas.forEach((item, k) => {
                      _this.showDataObj.echartItem.echartContainer.saveTopSizeData.forEach((obj, index) => {
                        if (obj.name === item.name) {
                          item._checked = obj._checked;
                        }
                      })
                    })
                  }
                  //配置表格的数据
                  _this.status.loading = false;
                  commonUtil.clearArray(_this.showDataObj.tableKeyword.tableDatas);
                  if (savedatas.length > 0) {
                    savedatas.forEach((item, index) => {
                      _this.showDataObj.tableKeyword.tableDatas.push({
                        "name": item.name,
                        "value": item.value,
                        "_checked": item._checked,
                        "percent": item.percent
                      })
                    });
                  }
                },
                error: () => {
                }
              })
            })(paramsObj)
          }
        }
      },
      //绘制一张图片
      drawOneGraph(obj) {
        // 基于准备好的dom，初始化echarts实例
        commonUtil.clearArray(this.showDataObj.echartItem.echartContainer.echartBox);
        let echartBox = this.showDataObj.echartItem.echartContainer.echartBox;
        //当前图表外层盒子
        let chart = document.getElementById(this.showDataObj.echartItem.chartWrapClass + this.status.type);
        //获取外层的盒子
        let chartsWrap = document.getElementsByClassName(this.showDataObj.echartItem.chartClass + "chart")[0];
        if (chart && chartsWrap) {
          //初始化表格
          let myChart = this.$echarts.init(chart);
          //改变宽度
          commonUtil.resizeCharts(chart, chartsWrap.clientWidth, chartsWrap.clientHeight);
          //改动盒子的宽高
          myChart.resize();
          myChart.setOption(obj);
          echartBox.push({
            id: this.showDataObj.echartItem.chartWrapClass + this.status.type,
            chart: myChart
          });
        }
      },
      //绘制图表数据
      drawTableChart() {
        this.getechartData();
      },
      /*----------分页模块-------------------*/
      //分页请求处理
      changePrevPage() {
        //获取上一页
        this.showDataObj.pageBean.oldPage = this.showDataObj.pageBean.currentPage;
        if (this.showDataObj.pageBean.currentPage <= 1) {
          return;
        }
        this.showDataObj.pageBean.currentPage--;
        this.showDataObj.pageBean.toPage = this.showDataObj.pageBean.currentPage;
        //获取上一页数据
        this.$set(this.status, "isPage", true);
        this.drawTableChart();
      },
      changeNextPage() {
        if (this.showDataObj.tableKeyword.tableDatas.length == 0) {
          return;
        }
        this.showDataObj.pageBean.oldPage = this.showDataObj.pageBean.currentPage;
        //获取下一页
        this.showDataObj.pageBean.currentPage++;
        this.showDataObj.pageBean.toPage = this.showDataObj.pageBean.currentPage;
        //获取下一页数据
        this.$set(this.status, "isPage", true);
        this.drawTableChart();
      },
      toWhatPage() {
        if (!this.positiveInteger(+(this.showDataObj.pageBean.toPage))) {
          this.showDataObj.pageBean.toPage = "";
          return;
        } else if (this.showDataObj.pageBean.toPage == 0) {
          //判断输入的是否为整数
          this.showDataObj.pageBean.toPage = "";
          return;
        }
        this.showDataObj.pageBean.oldPage = this.showDataObj.pageBean.currentPage;
        this.showDataObj.pageBean.currentPage = this.showDataObj.pageBean.toPage;
        this.$set(this.status, "isPage", true);
        this.drawTableChart();
      },
      changeSize() {
        this.$set(this.status, "isPage", true);
        this.drawTableChart();
      },
      //判断是否是正整数
      positiveInteger(num) {
        return /^[1-9]*[1-9][0-9]*$/.test(num);
      },
    }
  }
</script>
<style lang="less">
  #explodeKeyword {
    .explodewrap {
      background: #fff;
      padding: 20px;
      .topColumn {
        text-align: left;
        padding-bottom: 50px;
        .ivu-breadcrumb-item-link {
          &:hover {
            cursor: pointer;
            color: #1f90e6;
          }
        }
      }
      .ivu-tabs-bar {
        margin-bottom: 45px;
      }
      .container {
        width: 100%;
        margin: 0;
        padding: 0;
        .title {
          text-align: left;
          font-size: 16px;
          padding: 20px 0px;
        }
        .search {
          .saveBtn {
            float: left;
            background: #e1e1e1;
            border-color: #e1e1e1;
            &.activeBtn {
              background: #4aa5e9;
              border-color: #4aa5e9;

            }
          }
          .searchBtn {
            margin-left: 22px;
            background: #4aa5e9;
            border-color: #4aa5e9;
          }
          .titlePre {
            float: left;
            margin-left: 35px;
            line-height: 32px;
          }
        }
        .keywordcontent {
          padding-top: 20px;
          background: #fff;
          display: flex;
          .tableBox {
            height: 600px;
            width: 50%;
          }
          .chartBox {
            height: 520px;
            .sub-title {
              text-align: left;
              padding-top: 10px;
              padding-left: 20px;
              color: #333;
              font-size: 15px;
              line-height: 15px;
            }
            border: 1px solid #e1e1e1;
            margin-left: 35px;
            width: 48%;
            box-sizing: border-box;
            .wrapChart {
              width: 100%;
              margin: 0 auto;
              height: 495px;
            }
            .innerChart {
              height: 495px;
            }
          }
        }
      }
    }
    .ivu-modal {
      top: 50%;
      transform: translateY(-50%);
    }
    .ivu-tabs {
      padding-bottom: 120px;
    }
    .ivu-checkbox-wrapper {
      min-width: auto !important;
    }
  }
</style>
