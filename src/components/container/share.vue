<template>
<div id="show-box" v-loading="loading">
<!-- <grid-layout
    :layout="getAllTableDatas"
    :col-num="12"
    :row-height="600"
    :is-draggable="datas.showdrag"
    :is-resizable="datas.showdrag"
    :vertical-compact="true"
    :margin="[20, 10]"
    :use-css-transforms="true">
        <grid-item  v-for="(v_total,i_total) in getAllTableDatas"  :key="v_total.id"
                    :x="v_total.x"
                    :y="v_total.y"
                    :w="v_total.w"
                    :h="v_total.h"
                    :i="v_total.i"
                    > -->
      <div class="echarts" v-for="(v_total,i_total) in getAllTableDatas">
          <div class="header-page">
              <p class="page-title"><b>{{v_total.cname}}</b></p>
              <p class="page-operate">
                  <!-- <span><i class="fa fa-share" @click="exportTable(v_total)"></i>导出</span> -->
                  <form :action="api" method="post">
                      <input type="text" name="cid" :value="v_total.cid" style="display:none">
                      <input type="text" name="sqlParam" :value="v_total.sqlparamStr" style="display:none">
                      <input type="submit" value="Submit" style="float: right;position: absolute;right: 28px;top: 15px;opacity: 0;">
                  </form>
              </p>
          </div>
          <!-- 控件选择项 -->
          <div class="screen-item">
              <!-- {{v_total.conditionMap}} -->
              <!--<p @click="test(v_total)">1321313</p>-->
              <!--筛选-->
              <div class="filterControl row" v-if="v_total.chartType == 0">
                  <Row v-for="(confilter, key ,confiler_index) in v_total.conditionMap" :key="confilter.uuid" style="float:left">
                      <Col span="24" v-if="confilter.columnType == 'DATE'|| confilter.columnType == 'DATETIME'" class="col-confilter">
                      <span>{{confilter.chinese}}:</span>
                      <input type="hidden" :value="confilter.uuid = key">
                      <DatePicker confirm  :options="options3" format="yyyy/MM/dd" type="daterange" placeholder="请选择时间段" style="width: 200px" v-model="confilter.val"></DatePicker>
                      </Col>
                      <Col span="24" v-if="confilter.columnType == 'NUMBER'" class="col-confilter">
                          <span>{{confilter.chinese}}:</span>
                          <input type="hidden" :value="confilter.uuid = key">
                          <Select v-model="confilter.relation" style="width:100px">
                              <Option v-for="item in orderTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                          <div v-if="confilter.relation != 'LESSANDLARGE'">
                              <InputNumber  style="width: 160px" v-model="confilter.val" placeholder="请输入..."></InputNumber> 
                          </div>
                          <div v-if="confilter.relation == 'LESSANDLARGE'">
                              <InputNumber style="width: 65px" v-model="confilter.interval.start" placeholder="请输入..."></InputNumber>
                              -
                              <InputNumber style="width: 65px" v-model="confilter.interval.end" placeholder="请输入..."></InputNumber>
                          </div>
                      
                      </Col>
                      <Col span="24" v-if="confilter.columnType == 'STRING'" class="col-confilter">   
                          <span>{{confilter.chinese}}:</span>
                          <input type="hidden" :value="confilter.uuid = key" :data-id="confilter.uuid">
                          <!-- /fuzzy/search uuid key -->
                          <Poptip placement="bottom" @on-popper-show="popperLayer(confilter,v_total)">
                              <Input style="width: 160px" v-model="confilter.val" placeholder="请输入完整名称"></Input>
                              <div class="api-string" slot="content">
                                  <p class="api-button">
                                      <Input size="small" icon="search" v-model="confilter.search_val" style="width: 200px" @on-enter="popperSearch(confilter,v_total)" @on-click="popperSearch(confilter,v_total)"></Input>
                                      <Button size="small" @click="popperCheckAll(confilter)">全选</Button>
                                      <Button size="small" @click="popperClear(confilter)">清空</Button>
                                  </p>
                                  <p class="api-title">
                                        <span>{{confilter.chinese}}:</span>
                                        <span>----------------------------------------------------------------------</span>
                                        <span><i class="fa fa-angle-down" style="color:#4aa5e9"></i></span>
                                  </p>
                                  <CheckboxGroup v-model="confilter.mult_val" @on-change="popperChange(confilter)">
                                      <Checkbox v-for="(check_data,i_data) in confilter.data" :label="check_data" :key="check_data">{{check_data}}</Checkbox>
                                  </CheckboxGroup>
                              </div>
                          </Poptip>
                      </Col>
                  </Row>
                  <div class="btn-search">
                      <Button type="primary" @click="searchFilter(v_total, i_total)">搜索</Button>
                      <Button @click="resetFilter(v_total, i_total)">重置</Button>
                  </div>
              </div>
          </div>
          <div class="drill-nav" :class="{'drill-opacity':opacity}">
              <ul class="list-inline">
                  <li v-for="(item,index) in v_total.conditions" :data-id='item.uuid' @click="backDrillDown(v_total,i_total,item,index)"><a class="list-inline-icon" href="javascript:;" v-text="item.chinese"></a></li>
              </ul>
          </div>
          <div class="page-table" v-if="v_total.chartType == 0">
              <!-- <table class="table table-bordered table-middle" id="downloadTable" style="position: fixed;left: 3.75%;width: 92%;overflow:hidden" :style="{'bottom':v_total.t_bottom}">
                  <thead>
                      <tr>
                          <th class="col-table-width" v-for="(item,index) in getAllTableDatas[i_total].metas" :data-id="item.uuid">
                              {{ item.chinese }}
                              <i class="fa" :class="{'fa-sort-amount-desc':(item.sortType=='DESC'?true:false)}"  aria-hidden="true" @click="dataAsc(item, v_total, i_total)"></i>
                              <i class="fa" :class="{'fa-sort-amount-asc':(item.sortType=='ASC'?true:false)}" aria-hidden="true" @click="dataDesc(item, v_total, i_total)"></i>
                          </th>
                      </tr>
                  </thead> 
              </table> -->
              <table class="table table-bordered table-middle" id="downloadTable">
                  <thead>
                      <tr>
                          <th class="col-table-width" v-for="(item,index) in getAllTableDatas[i_total].metas" :data-id="item.uuid">
                              {{ item.chinese }}
                              <i class="fa" :class="{'fa-sort-amount-desc':(item.sortType=='DESC'?true:false)}"  aria-hidden="true" @click="dataAsc(item, v_total, i_total)"></i>
                              <i class="fa" :class="{'fa-sort-amount-asc':(item.sortType=='ASC'?true:false)}" aria-hidden="true" @click="dataDesc(item, v_total, i_total)"></i>
                          </th>
                      </tr>
                  </thead> 
                  <tbody>
                      <tr v-for="(lineData,lindex) in getAllTableDatas[i_total].result">
                          <td class="col-table-width" v-for='(v,vindex) in lineData' v-if="vindex==0 && getAllTableDatas[i_total].drillDowns.length>0" :data-id='getAllTableDatas[i_total].metas[vindex].uuid' @click="showNextLevel(v,getAllTableDatas[i_total].metas[vindex].uuid,v_total, i_total,$event)"><a href="javascript:;">{{ v }}</a></td>
                          <td class="col-table-width"  :data-id='getAllTableDatas[i_total].metas[vindex].uuid' v-else>{{ v }}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <!-- 图表 -->
          <div class="page-echart"  :class="`page-echart_`+i_total">
              <!-- v-if="v_total.chartType >0" -->
              <div class="chart-graph chart_1" id="lineChart" :style="{width: '100%', height: '450px'}"></div>
              <div class="chart-graph chart_2" id="barChart" :style="{width: '100%', height: '450px'}"></div>
              <div class="chart-graph chart_3" id="pieChart" :style="{width: '100%', height: '450px'}"></div>
              <div class="chart-graph chart_5" id="radarMapChart" :style="{width: '100%', height: '450px'}"></div>
          </div>
          <div v-if="v_total.chartType == 4">
              <div class="page-index-card">
                  <p class="index-card-title">{{getAllTableDatas[i_total].metas[0].chinese}}</p>
                  <p class="index-card-content">{{getAllTableDatas[i_total].result[0][0] | indexCard}}</p>
              </div>
          </div> 
          <!-- 分页相关 -->
          <div class="pages-bar" v-if="v_total.chartType == 0">
              <nav aria-label="Page navigation">
                  <ul class="pagination pagination-sm">
                      <li>
                          &nbsp;
                          <a href="javascript:;" aria-label="Previous" @click="editPrevPage(v_total,i_total)" :class="{'page-disable':v_total.pageBean.currentPage==1}">
                              <span aria-hidden="true">&laquo;</span>
                          </a>
                      </li>
                      <li class="jump-page">跳转到&nbsp;&nbsp;<input type="text" class="page-control page-control1" @keyup.13="toPage(v_total,i_total)" v-model="v_total.pageBean.currentPage">&nbsp;&nbsp;页 &nbsp;
                      </li>
                      <li>
                          &nbsp;
                          <a href="javascript:;" aria-label="Next" @click="editNextPage(v_total,i_total)" :class="{'page-disable':v_total.pageBean.lastPage}">
                              <span aria-hidden="true">&raquo;</span>
                          </a>
                      </li>
                      <li class="page-size-select">
                          <input type="number" step="20" max="100" min="20" class="page-control" @change="mPageSize(v_total,i_total)" v-model="v_total.pageBean.pageSize">
                      </li>
                  </ul>
              </nav>
          </div>
      </div>
      <!-- </grid-item>
    </grid-layout> -->
</div>
</template>
<script>
import datas from './../../config/datas';
import bus from './../../config/bus';
import { pubMethod } from './../../config/public';
import echarts from 'echarts';
export default {
  data () {
    return {
            api:'',
            boardata: [],
            getDatas:{},
            datas: datas.datas,
            modal1:false,
            loading:false,
            opacity:false, //钻取显示项目是否隐藏
            opacityGraph:false,
            // testDate:'2016-01-01',
            // editListPages:datas.editListPages,
            reportDatas:[],
            operateTable:false, //判断是否是读取数据时的操作
            tableInputArrow:true,
            getAllTableDatas:[],
            editPermission:false,
            getRequestDatas:[],
            dataFlagLength:'',  //表总数
            sellerName: '',
            choosedType: [],
            arr:[],
            axisArr:[],
            pageTarget :false, //标识是否翻页
            // divScrollTop: -40,
            orderTypes: [{
                value: '',
                label: '全部'
            },
            {
                value: 'EQUAL',
                label: '等于'
            },
            {
                value: 'NOTEQUAL',
                label: '不等于'
            },
            {
                value: 'LARGEEQUAL',
                label: '大于等于'
            },
            {
                value: 'LESSEQUAL',
                label: '小于等于'
            },
            {
                value: 'LESS',
                label: '小于'
            },
             {
                value: 'LARGE',
                label: '大于'
            },
            {
                value: 'LESSANDLARGE',
                label: '区间'
            }],
            count:true,
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            }
        }
    },
    created() {
        this.getShare(); //分享
    },
    mounted(){ 
        // window.addEventListener('scroll',this.menu);
    },
    filters:{
      indexCard(str){
        if(str.indexOf('.')==-1){
          return parseInt(str).toLocaleString();
        }
        var arr = str.split('.');    
        return `${parseInt(arr[0]).toLocaleString()}.${arr[1]}`;    
      }
    },
    props:[
        'message'
    ],
    watch:{
        getRequestDatas:function(){
            this.$nextTick(()=>{
                this.showGraphs();
            })
        },
    },
    methods:{
        getShare(){
            let _this = this;
            let url = document.location.toString();
            let keyurl = url.split('share/')[1];
            $.ajax({
                type : "post",
                url : _this.$keyapi+"/share/get",
                dataType: 'json',
                data:{
                    key:keyurl
                },
                xhrFields: {
                    withCredentials: true
                },
                success : function(res){
                    if(res.status == 1){
                        if(res.data.type == 1){
                            _this.setSessionDatas(res.data.boardID);
                        }
                        else if(res.data.type == 2){
                            res.data.reportInfo.styleType = '';
                            _this.datas.getDataAllInfos.push(res.data.reportInfo);
                            _this.datas.getDataOriginalInfos.push(res.data.reportInfo);
                            _this.requestTabelDatas(res.data.reportInfo);
                            _this.dataFlagLength = 1;
                        }                        
                    }
                    else if(res.status == 101){
                        location.href = "https://data.banggood.cn";
                    }
                    else{
 
                    }
                }
            });
        },
        // 首页筛选弹框
        popperLayer(item, total){
            // /fuzzy/search uuid key
            let _this = this;
            if(item.val){
                let mult_val = item.val.split(',');
                for(var i = 0;i<mult_val.length;i++){
                    if(mult_val[i]==''){
                        mult_val.splice(i,1);
                        i=i-1;
                    }
                }
                item.search_val = '';
                _this.$set(item,'mult_val',mult_val);
            }            
            // let 
            // addlazy
            $.ajax({
                type : "post",
                url : _this.$keyapi+"/fuzzy/search",
                dataType: 'json',
                data: {
                    uuid:item.uuid,
                    modelID: total.modelID,
                    key:'',
                },
                xhrFields: {
                    withCredentials: true
                },
                success : function(res){
                    if(res.status == 1){
                       item.data = res.data;
                    }
                    else if(res.status == 101){
                        location.href = "https://data.banggood.cn";
                    }
                    else{
 
                    }
                }
            });
        },
        // 数据改变操作
        popperChange(item){
            let changeVal = '';
            item.mult_val.map(v=>{
                changeVal+=v+',';
            })
            this.$set(item,'val',changeVal);
        },
        popperSearch(item, total){
            let _this = this;
            $.ajax({
                type : "post",
                url : _this.$keyapi+"/fuzzy/search",
                dataType: 'json',
                data: {
                    uuid:item.uuid,
                    modelID: total.modelID,
                    key:item.search_val,
                },
                xhrFields: {
                    withCredentials: true
                },
                success : function(res){
                    if(res.status == 1){
                       item.data = res.data;
                    }
                    else if(res.status == 101){
                        location.href = "https://data.banggood.cn";
                    }
                    else{
 
                    }
                }
            });            
        },
        // 筛选框全选
        popperCheckAll(item){
            this.$set(item,'mult_val',item.data);
            this.popperChange(item)
        },
        //清空选择项
        popperClear(item){
            this.$set(item,'mult_val',[]);
            this.popperChange(item)
        },
        // 升序
        dataAsc(item, total, index){
            let _this = this;
             _this.datas.getDataAllInfos.map((v,i)=>{
                 if(total.cid==v.reportID){ 
                      let reportInfo = JSON.parse(v.reportInfo);
                      let filtercon = reportInfo.reportInfo.requestObject.sqlParam;  
                      total.groupbys.map((v,i)=>{
                          if(v.uuid == item.uuid){
                                v.sortType = 'ASC';
                          }
                      }); 
                      total.columnMessure.map((v_c,i_c)=>{
                          if(v_c.uuid == item.uuid){
                              v_c.sortType = 'ASC';
                          }
                      });
                      let updateMessure = total.columnMessure.concat(total.groupbys);
                        updateMessure.map((v,i)=>{
                            if(v.uuid == item.uuid){
                                v.sortNum = 1;
                            }
                            else{
                                v.sortNum = (i++)+2;
                            }
                        });
                      filtercon.columnMessure = total.columnMessure;
                      filtercon.groupbys = total.groupbys;
                      v.reportInfo = JSON.stringify(reportInfo);
                      _this.requestTabelDatas(v,'',index);
                 }
             })  
        },
        dataDesc(item, total, index){
            let _this = this;
             _this.datas.getDataAllInfos.map((v,i)=>{
                 if(total.cid==v.reportID){ 
                      let reportInfo = JSON.parse(v.reportInfo);
                      let filtercon = reportInfo.reportInfo.requestObject.sqlParam;  
                      total.groupbys.map((v,i)=>{
                          if(v.uuid == item.uuid){
                                v.sortType = 'DESC';
                          }
                      }) 
                      total.columnMessure.map((v_c,i_c)=>{
                          if(v_c.uuid == item.uuid){
                              v_c.sortType = 'DESC';
                          }
                      })  
                        let updateMessure = total.columnMessure.concat(total.groupbys);
                        updateMessure.map((v,i)=>{
                            if(v.uuid == item.uuid){
                                v.sortNum = 1;
                            }
                            else{
                                v.sortNum = (i++)+2;
                            }
                        }); 
                      filtercon.columnMessure = total.columnMessure;
                      filtercon.groupbys = total.groupbys;
                      v.reportInfo = JSON.stringify(reportInfo);
                      _this.requestTabelDatas(v,'',index);
                 }
             })
        },
        // 处理首页筛选逻辑    
        searchFilter(total,index){
            let _this = this;
            _this.opacity = true;
            let pages = JSON.stringify({"currentPage":1,"pageSize":10});
            _this.datas.getDataAllInfos.map((v,i)=>{
                if(total.cid==v.reportID){ 
                    let reportInfo = JSON.parse(v.reportInfo);
                    let filtercon = reportInfo.reportInfo.requestObject.sqlParam;
                    total.conditions = [];
                    for(let obj in total.conditionMap){
                        var v_con = total.conditionMap[obj];
                        total.conditionMap[obj].data = [];
                        if(v_con.relation == 'LESSANDLARGE'){                           
                            total.conditions.push({
                                uuid:v_con.uuid,
                                val: v_con.interval.start,
                                type:"NUMBER",
                                relation:"LARGE"
                            },{
                                uuid:v_con.uuid,
                                val: v_con.interval.end,
                                type:"NUMBER",
                                relation:"LESS" 
                            })
                            total.conditionMap[obj].val = {
                                start:v_con.interval.start,
                                end:v_con.interval.end
                            }
                        }
                        else if(v_con.columnType =='DATE' || v_con.columnType == 'DATETIME'){
                            total.conditions.push({
                                uuid:v_con.uuid,
                                val: v_con.val[0]? pubMethod.formatDate(v_con.val[0]): null,
                                type:"DATE",
                                relation:"LARGEEQUAL"
                            },{
                                uuid:v_con.uuid,
                                val:  v_con.val[1]? pubMethod.formatDate(v_con.val[1]): null,
                                type:"DATE",
                                relation:"LESSEQUAL" 
                            });
                            v_con.val = [v_con.val[0]? pubMethod.formatDate(v_con.val[0]): null,v_con.val[1]? pubMethod.formatDate(v_con.val[1]): null];
                            total.conditionMap[obj].val = v_con.val;                           
                        }
                        else{
                            total.conditions.push({
                                uuid:v_con.uuid,
                                val: v_con.val,
                                type:"STRING",
                                relation:'IN'
                            });
                            total.conditionMap[obj].val = v_con.val;   
                        }                        
                    } 
                    // 优化查询条件       
                    for(let drillobj in total.drillDowns){
                        if(total.drillDowns[drillobj].listData){
                            total.drillDowns[drillobj].listData = [];
                        }
                    }
                    filtercon.drillDowns = total.drillDowns;
                    filtercon.conditionMap = total.conditionMap;           
                    filtercon.conditions = total.conditions;
                    v.reportInfo = JSON.stringify(reportInfo);
                    _this.requestTabelDatas(v,pages,index);
                }
            })           
        },
        // 重置筛选条件
        resetFilter(total, index){
            let _this = this;
            let pages = JSON.stringify({"currentPage":1,"pageSize":10});
            _this.datas.getDataAllInfos.map((v,i)=>{
                if(total.cid==v.reportID){
                    var reportInfo = JSON.parse(v.reportInfo);
                    let filtercon = reportInfo.reportInfo.requestObject.sqlParam;
                    total.conditions = [];
                    for(let obj in total.conditionMap){
                        total.conditionMap[obj].val = '';
                    }
                    filtercon.conditionMap = total.conditionMap;
                    filtercon.groupbys = total.groupInitbys;
                    filtercon.conditions = total.conditions;

                    v.reportInfo = JSON.stringify(reportInfo);
                    _this.requestTabelDatas(v,pages,index);
                }
            }) 
        },
        // 首页钻取
        showNextLevel(item,uuid,total,index){
            debugger;
            let _this = this;
            _this.opacity = false;
            _this.pageTarget = true;
            // total.conditions = [];
            _this.datas.getDataAllInfos.map((v,i)=>{
                if(total.cid==v.reportID){ 
                    if(total.drillDowns<=total.conditions){
                        return false;
                    }
                    let reportInfo = JSON.parse(v.reportInfo);  
                    let filtercon = reportInfo.reportInfo.requestObject.sqlParam;
                    filtercon.groupbys = [];
                    for(let obj in total.drillDowns){
                        let v_drill = total.drillDowns[obj];
                        if(uuid == v_drill.uuid){
                            total.conditions.push({
                                chinese: v_drill.chinese,
                                uuid: v_drill.uuid,
                                columnType: v_drill.type,
                                relation: 'EQUAL',
                                val: item
                            })
                        }                     
                    }
                    total.conditions.forEach(function(e,v) {
                        total.drillDowns.forEach((item,index)=>{
                        if(e.uuid == item.uuid){
                            total.drillDowns.splice(index,1);
                            return;
                        }
                    })
                    });
                
                    total.drillDowns.forEach(v=>{
                        filtercon.groupbys.push({
                            chinese:v.chinese,
                            uuid: v.uuid,
                            col:v.type,
                            sortType:'DEFAULT'
                        });
                    })
                    
                    filtercon.conditions = total.conditions;  
                    let drillDatas = {
                        columnMessure: filtercon.columnMessure,
                        groupbys: filtercon.groupbys,
                        tableName: filtercon.tableName,
                        conditions: filtercon.conditions
                    } 
                    v.reportInfo = JSON.stringify(reportInfo);
                    _this.requestTabelDatas(v,'',index,JSON.stringify(drillDatas));
                }                  
            })
        },
        //返回上一级钻取
        backDrillDown(total, index,item , item_i){
            let _this = this;
            const allIndex = total.conditions.length;
            _this.datas.getDataAllInfos.map((v,i)=>{
                if(total.cid==v.reportID){ 
                    let reportInfo = JSON.parse(v.reportInfo);  
                    let filtercon = reportInfo.reportInfo.requestObject.sqlParam;
                    filtercon.groupbys = [];
                    filtercon.groupbys = filtercon.groupbys.concat(total.conditions.slice(item_i));
                    let groupConditions = [];
                    if(item_i == 0){
                        groupConditions = total.groupInitbys;
                    }
                    else{
                        groupConditions = total.groupbys;
                    }
                    total.conditions.splice(item_i,allIndex-item_i); 
                    filtercon.conditions.splice(item_i,allIndex-item_i);
                    _this.getAllTableDatas[index].conditions = total.conditions;
                    let drillDatas = {
                        columnMessure: filtercon.columnMessure,
                        groupbys: groupConditions,
                        tableName: filtercon.tableName,
                        conditions: total.conditions
                    } 
                    v.reportInfo = JSON.stringify(reportInfo);
                    _this.requestTabelDatas(v,'',index,JSON.stringify(drillDatas));
                }
            })
        },
        // 图表插件  
        drawLine(alldatas, chartDom, isLock, index){
            var lock = false;
            var echartdata  = alldatas['result']
            if(!echartdata){
                return false;
            }

            if(!chartDom){
                return;
            }
            var selectdom = chartDom.querySelectorAll('.chart-graph');

            let myChart = {
                line: echarts.init(selectdom[0]),
                bar: echarts.init(selectdom[1]),
                pie: echarts.init(selectdom[2]),    
                radarMap:echarts.init(selectdom[3])
            };  
        
            // echartdata = data.datas.editTableSumData.result;
            let xAria = [],
                yAria,
                zAria = [];
            let _this = this;
            echartdata.map((v,_i)=>{
                xAria.push(v[0]);
                zAria.push({name:v[0],value:v[v.length-1]})
            })
            // 绘制图表 
            myChart.line.setOption({
                // title: { text: 'echarts' },
                tooltip: {
                    show:alldatas.echartConfig.line.showTooltip,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend:{
                    show:alldatas.echartConfig.line.showLegend,
                    data:_this.getLegend(alldatas)
                },
                xAxis: {
                    show:alldatas.echartConfig.line.showX,
                    data: xAria
                },
                yAxis: {
                    show:alldatas.echartConfig.line.showY,
                    name:alldatas.echartConfig.line.name,
                    nameRotate:90,
                    nameLocation:'middle',
                    nameGap:80
                },
                series: _this.getSeries(alldatas,echartdata,'line')
            },true);
            var setBarOption = {
                // title: { text: 'echarts' },
                tooltip: {
                    show:alldatas.echartConfig.bar.showTooltip,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend:{
                    show:alldatas.echartConfig.bar.showLegend,
                    data:_this.getLegend(alldatas)
                },
                xAxis: {
                    show:alldatas.echartConfig.bar.showX,
                    data: xAria
                },
                yAxis: {
                    show:alldatas.echartConfig.bar.showY,
                    name:alldatas.echartConfig.bar.name,
                    nameRotate:90,
                    nameLocation:'middle',
                    nameGap:80
                },
                series: _this.getSeries(alldatas,echartdata,'bar')
            };
            if(alldatas.echartConfig.bar.showReverseBar || alldatas.echartConfig.bar.showReverseStackedPlot){
                var options = setBarOption.xAxis.data;
                delete setBarOption.xAxis.data;
                setBarOption.yAxis['data'] = options;
            }
            myChart.bar.setOption(setBarOption,true);
            if(alldatas.echartConfig.pie.showEntries){
                zAria = zAria.slice(0,alldatas.echartConfig.pie.showEntries*1);
            }
            var setPieSeries = {
                name: alldatas.metas[0].chinese,
                type: 'pie',
                radius: '50%',
                data:zAria,
                itemStyle:{ normal: {label : {show: alldatas.echartConfig.pie.showTag}}},
                labelLine: {
                    normal: {
                        show: alldatas.echartConfig.pie.showTag
                    }
                }
            };
            if(alldatas.echartConfig.pie.showRadius){
                setPieSeries.radius = ['50%','70%'];
            }
            myChart.pie.setOption({
                // title:{ text: 'echarts-pie' },
                tooltip: {
                    show:alldatas.echartConfig.pie.showTooltip
                },
                legend:{
                    show:alldatas.echartConfig.pie.showLegend,
                    data:_this.getLegend(alldatas)
                },
                series : [
                    setPieSeries
                ]
            },true);
            // 雷达图
            var setradarMapSeriesIndicator = [];
            var loopMessureIndex = alldatas.columnMessure.length;;
            var setradarMapSeriesData = [],
                setradarMapLegendData = [];
            for(let i=0;i<loopMessureIndex;i++){
                setradarMapSeriesData.push({
                    name:'',
                    value:[]
                })
                setradarMapLegendData.push('');
            }
            echartdata.forEach((item,i) =>{
                setradarMapSeriesIndicator.push({
                    name:item[0],
                    max:Math.max.apply(Math,item.slice(item.length - loopMessureIndex))
                });
                item.slice(item.length - loopMessureIndex).forEach((_item,_i,arr) =>{
                    setradarMapSeriesData[_i].name = alldatas.columnMessure[_i].chinese;
                    setradarMapSeriesData[_i].value.push(arr[_i]);
                    setradarMapLegendData[_i] =  alldatas.columnMessure[_i].chinese;
                })
            });
            var setradarMapSeries={
                tooltip: {},
                legend: {
                    data: setradarMapLegendData
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                    }
                    },
                    indicator: setradarMapSeriesIndicator
                },
                series: [{
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : setradarMapSeriesData
                }]
            };
            myChart.radarMap.setOption(setradarMapSeries,true)
            var otherChartContainer = function(el) {
                if(el && !$(el)){
                    return false;
                }
                var i = $(el).find('.page-echart').attr('class').split('_')[1]*1;
                $(`.page-echart_${i}`).find('.chart_1').css({'width':el.style.width})
                $(`.page-echart_${i}`).find('.chart_2').css({'width':el.style.width})
                $(`.page-echart_${i}`).find('.chart_3').css({'width':el.style.width})
                $(`.page-echart_${i}`).find('.chart_5').css({'width':el.style.width})
            }
            bus.$on('echart',data =>{
                if(data){
                    otherChartContainer(data);
                    myChart.line.resize();
                    myChart.bar.resize();
                    myChart.pie.resize();
                }
            })
            _this.datas.getDataAllInfos.forEach(item=>{
                if(item.reportID == alldatas.cid){
                    if(item['isLock']){
                        myChart.bar.on('click', function (params) {
                            _this.clickMyChart(alldatas, params, index);
                        });
                        myChart.line.on('click', function (params) {
                            _this.clickMyChart(alldatas, params, index);
                        });
                        myChart.pie.on('click', function (params) {
                            _this.clickMyChart(alldatas, params ,index);
                        });
                        item['isLock'] = false;
                    } 
                }
            })
        },    
        clickMyChart(alldatas, params, index){
            var uuid = alldatas.metas[0].uuid;
            var item = params.name;
            this.showNextLevel(item,uuid,alldatas,index);      
        },
        getSeries(alldatas,echartdata,str){
            var loopMessureIndex;
            if(echartdata.length == 0){
                return false;
            }
            if(alldatas.groupbys.length > 0){
                loopMessureIndex = alldatas.columnMessure.length;
            }  
            var index = echartdata[0].length;
            
            let series = [];
            for(let i = (index-loopMessureIndex);i < index; i++){
                let yAria = [];
                echartdata.map((v,_i)=>{
                    yAria.push(v[i])
                })
                var obj = {
                    name: alldatas.metas[i].chinese,
                    type: str,
                    data: yAria,
                    itemStyle:{ normal: {label : {show: alldatas.echartConfig[str].showTag, position: 'top'}}}
                }
                // 折线图
                if(str == 'line'){
                    if(alldatas.echartConfig.line.showLine){
                        if(obj.hasOwnProperty('smooth')){
                            delete obj.smooth
                        }
                        if(obj.hasOwnProperty('areaStyle')){
                            delete obj.areaStyle
                        }
                    }
                    if(alldatas.echartConfig.line.showSmooth){
                        if(obj.hasOwnProperty('areaStyle')){
                            delete obj.areaStyle
                        }
                        obj.smooth = true;
                    }
                    if(alldatas.echartConfig.line.showArea){
                        obj.areaStyle = {normal: {}};
                        if(obj.hasOwnProperty('smooth')){
                            delete obj.smooth
                        }
                    }
                }
                // 柱状图
                if(str == 'bar'){
                    if(alldatas.echartConfig.bar.showStackedPlot || alldatas.echartConfig.bar.showReverseStackedPlot){
                        obj.stack='总量';
                        obj.itemStyle.normal.label.position = 'inside';
                    }
                    if(alldatas.echartConfig.bar.showReverseBar){
                        obj.itemStyle.normal.label.position = 'right';
                    }
                }
                series.push(obj);
            }
            return series 
        },
        getLegend(alldatas){
            var loopMessureIndex = alldatas.groupbys.length - 1;
            var legendArr = alldatas.metas.slice(loopMessureIndex);
            var resultArr = [];
            legendArr.forEach(item =>{
                resultArr.push(item.chinese);
            })
            return resultArr;
        },
        // 图表插件结束标识
        delTable(id){
            // 删除接口
            let _this = this;
            let ids = _this.$layer.confirm("确定要删除吗？", function () {
                $.ajax({
                    type : "post",
                    url : _this.$keyapi+"/auth/delete/report",
                    dataType: 'json',
                    data: {reportID: id},
                    xhrFields: {
                        withCredentials: true
                    },
                    success : function(res){
                        if(res.status == 1){
                            _this.getAllTableDatas.map((v,i)=>{
                                if(v.cid == id){
                                    _this.getAllTableDatas.splice(i,1)
                                }
                            });
                            _this.$layer.close(ids);                          
                        }
                        else if(res.status == 101){
                            location.href = "https://data.banggood.cn";
                        }
                        else{
                            // pubMethod.adalert(res.desc);
                            _this.$Message.error({content: res.desc,duration: 10,closable: true});
                            _this.$layer.close(ids);  
                        }
                    }
                });

            }, function () {
                _this.$layer.close(ids);
            });
        },
        setSessionDatas(opts){
            let _this=this;
            _this.datas.folderLock = false;
            _this.arr = [];
            $.ajax({
                type : "post",
                url : _this.$keyapi+"/auth/report/getnew",
                dataType: 'json',
                data: {boardID: opts},
                xhrFields: {
                    withCredentials: true
                },
                success : function(res){
                    if(res.status == 1){
                        _this.opacityGraph = false;
                        let dataObj = [];
                        _this.operateTable = true;
                        _this.getAllTableDatas = [];
                        _this.datas.getDataAllInfos = [];
                        _this.datas.getDataOriginalInfos = res.data;
                            res.data.map((v,i)=>{
                                v.isLock = true;
                                _this.datas.getDataAllInfos.push(v);
                                _this.requestTabelDatas(v)    
                            })
                        _this.dataFlagLength = res.data.length;
                        _this.datas.getDataOriginalInfos = pubMethod.objClone(_this.datas.getDataAllInfos)
                    }
                    else if(res.status == 101){
                      location.href = "https://data.banggood.cn";
                    }
                    else{
                        _this.datas.folderLock = true;
                        if(_this.datas.folderLock){
                            _this.loading = false;
                        }
                        if(res.desc){
                            _this.opacityGraph = true;
                            _this.getAllTableDatas = [];
                            pubMethod.adalert(res.desc);
                        }
                    };
                }
            });
        },
        requestTabelDatas(requestDatas, pages, index, searchSql,pageMark){
            let _this = this; 
            let modelId =  requestDatas.modelID;
            let dataObj = JSON.parse(requestDatas.reportInfo);
            _this.loading = false;
            // 优化数据查询
            for(let optimize1 in dataObj.reportInfo.requestObject.sqlParam.drillDowns){
                dataObj.reportInfo.requestObject.sqlParam.drillDowns[optimize1].listData = [];
            }
            for(let optimize2 in dataObj.reportInfo.requestObject.sqlParam.conditionMap){
                dataObj.reportInfo.requestObject.sqlParam.conditionMap[optimize2].data = [];
            }
            let reportObj = {
                project: dataObj.reportInfo.requestObject.project,
                drillDowns: dataObj.reportInfo.requestObject.sqlParam.drillDowns,
                echartConfig: dataObj.reportInfo.requestObject.sqlParam.echartConfig,
                cinfo:dataObj.reportInfo.reportInfo.reportNote.text,
                styleType: requestDatas.styleType
            };
            _this.datas.editListPages = dataObj.reportInfo.editListPages;
            // console.log(dataObj.reportInfo.editListPages)
            _this.datas.editListPages.pageSize = 10;
            if(!pages){
                pages = JSON.stringify(_this.datas.editListPages)    
            }
            if(!searchSql){
                searchSql = JSON.stringify(dataObj.reportInfo.requestObject.sqlParam)
            }
            if(pageMark){
                _this.pageTarget = false;
            }
            if(index){
                _this.datas.boardDrag = true;
            }
            $.ajax({
                type : "post",
                url :_this.$keyapi+"/query/kylin",                
                data : {
                    cid: requestDatas.reportID,
                    cname:requestDatas.reportName,
                    modelID:modelId,
                    sqlParam:searchSql,
                    project:dataObj.reportInfo.requestObject.project,
                    pageBean:pages,
                    reportObj:JSON.stringify(reportObj)
                },
                xhrFields: {
                    withCredentials: true
                },
                dataType:"json",
                success : function(res) {  
                        if(res.status == 1){                           
                            //用于看板渲染时的自定义新增数组
                            res.data.chartType = dataObj.reportInfo.requestObject.chartType;
                            res.data.conditionMap = dataObj.reportInfo.requestObject.sqlParam.conditionMap;                           
                            res.data.drillDowns = dataObj.reportInfo.requestObject.sqlParam.drillDowns;
                            res.data.groupInitbys = dataObj.reportInfo.requestObject.sqlParam.groupInitbys;
                            
                            res.data.sqlparamStr = JSON.stringify({
                                columnMessure: dataObj.reportInfo.requestObject.sqlParam.columnMessure,
                                groupbys: dataObj.reportInfo.requestObject.sqlParam.groupbys,
                                conditions: dataObj.reportInfo.requestObject.sqlParam.conditions,
                                project: dataObj.projectName
                            })
                            res.data.echartConfig = dataObj.reportInfo.requestObject.sqlParam.echartConfig;
                            res.data.groupbys = dataObj.reportInfo.requestObject.sqlParam.groupbys;
                            res.data.columnMessure = dataObj.reportInfo.requestObject.sqlParam.columnMessure;
                            if(typeof(index) == 'number'){
                                if(JSON.parse(res.data.reportObj).styleType){
                                    let styleArr = JSON.parse(JSON.parse(res.data.reportObj).styleType);
                                    res.data.x = styleArr.x;                           
                                    res.data.y = styleArr.y;
                                    res.data.w = styleArr.w;
                                    res.data.h = styleArr.h;
                                    res.data.i = styleArr.i;
                                    res.data.style = styleArr.style;
                                }
                                else{
                                    res.data.x = 0;                           
                                    res.data.y = index;
                                    res.data.w = 12;
                                    res.data.h = 1;
                                    res.data.i = 'chart'+ res.data.cid;
                                    res.data.style = 'mychart'+ res.data.cid;
                                }
                                // _this.getAllTableDatas[index] = res.data; 
                                if(_this.pageTarget){
                                    res.data.conditions = dataObj.reportInfo.requestObject.sqlParam.conditions;
                                   }         
                                _this.$set(_this.getAllTableDatas,index,res.data)
                            }
                            else{
                                var arrIndex = _this.datas.getDataOriginalInfos.length;
                                if(arrIndex == 0){
                                    return false;
                                }
                                _this.datas.getDataOriginalInfos.forEach((item,_v)=>{
                                    if(item.reportID == res.data.cid){
                                        res.data.conditions = [];
                                        if(!item.styleType){
                                            _this.axisArr[_v] = {
                                                reportID: res.data.cid,
                                                styleType:{
                                                    x: 0,
                                                    y: _v,
                                                    w: 12,
                                                    h: 1,
                                                    i: 'chart'+res.data.cid,
                                                    style: 'mychart'+ res.data.cid,
                                                }  
                                            }
                                            res.data.x =  _this.axisArr[_v].styleType.x;
                                            res.data.y =  _this.axisArr[_v].styleType.y;
                                            res.data.w =  _this.axisArr[_v].styleType.w;
                                            res.data.h =  _this.axisArr[_v].styleType.h;
                                            res.data.i =  _this.axisArr[_v].styleType.i;
                                            res.data.style =  _this.axisArr[_v].styleType.style;
                                        }
                                        else{
                                            if(typeof(item.styleType) == 'string'){
                                                item.styleType = JSON.parse(item.styleType)
                                            }
                                             _this.axisArr[_v] = {
                                                reportID: res.data.cid,
                                                styleType:{
                                                    x: item.styleType.x,
                                                    y: item.styleType.y,
                                                    w: item.styleType.w,
                                                    h: item.styleType.h,
                                                    i: item.styleType.i,
                                                    style: item.styleType.style,
                                                }  
                                            }
                                            res.data.x =  _this.axisArr[_v].styleType.x;
                                            res.data.y =  _this.axisArr[_v].styleType.y;
                                            res.data.w =  _this.axisArr[_v].styleType.w;
                                            res.data.h =  _this.axisArr[_v].styleType.h;
                                            res.data.i =  _this.axisArr[_v].styleType.i;
                                            res.data.style =  _this.axisArr[_v].styleType.style;
                                        }
                                        _this.arr[_v] = res.data;
                                    }
                                })
                                var resultArr = [];
                                for(let i = 0;i < arrIndex;i++){
                                   resultArr.push(_this.arr[i])
                                }
                                var result = resultArr.every(item=>{
                                    return typeof item == 'object'
                                })
                                if(result){
                                   
                                    _this.arr.forEach(element => {
                                        _this.getAllTableDatas.push(element);
                                    });
                                    _this.datas.folderLock = true;
                                    if(_this.datas.folderLock){
                                        _this.loading = false;
                                    }
                                }
                            }
                            if(_this.dataFlagLength == _this.datas.getDataOriginalInfos.length){
                                _this.getRequestDatas = _this.getAllTableDatas;                               
                                _this.$set(_this.getRequestDatas,'data',_this.getAllTableDatas);
                                if(_this.datas.folderLock){
                                    _this.loading = false;
                                }
                            }                          
                        }
                        else if(res.status == 101){
                            location.href = "https://data.banggood.cn";
                        }
                    }
                });
          
        }, 
        showGraphs(){
            if(this.getAllTableDatas.length == 0){
                this.count = true;
                return false;
            }
            for(var i=0;i<this.getAllTableDatas.length;i++){  
                $('.page-echart_'+i).children('.chart-graph').hide();                      
                if(this.getAllTableDatas[i].chartType>0){
                    $('.page-echart_'+i).children('.chart-graph').hide();  
                    if(this.getAllTableDatas[i].chartType>4){
                        $('.page-echart_'+i).children('.chart-graph').eq((this.getAllTableDatas[i].chartType)-2).show(); 
                    } 
                    else if(this.getAllTableDatas[i].chartType<4){                                                       
                     $('.page-echart_'+i).children('.chart-graph').eq((this.getAllTableDatas[i].chartType)-1).show(); 
                    }                      
                }   
                this.drawLine(this.getAllTableDatas[i], $('.page-echart_'+i)[0],true,i); 
            }
            this.count = false;
        },
        // nextpage
        mPageSize(total, index){
            let _this = this; 
            _this.datas.getDataAllInfos.map((v,i)=>{              
                  if(total.cid == v.reportID){
                    total.pageBean={
                        currentPage:total.pageBean.currentPage,
                        pageSize:total.pageBean.pageSize,
                    }; 
                    _this.requestTabelDatas(v,JSON.stringify(total.pageBean),index,null,true);                   
                  }
             })
        },
        editNextPage(total,index){
             let _this = this; 
             _this.datas.getDataAllInfos.map((v,i)=>{              
                  if(total.cid == v.reportID){
                    if(total.pageBean.lastPage)return;
                    total.pageBean={
                        currentPage:Number(total.pageBean.currentPage)+1,
                        pageSize:total.pageBean.pageSize,
                    }; 
                    _this.requestTabelDatas(v,JSON.stringify(total.pageBean),index,null,true);                   
                  }
             })
        },
        editPrevPage(total, index){
             let _this = this; 
             _this.datas.getDataAllInfos.map((v,i)=>{
                 if(total.cid == v.reportID){
                     if(total.pageBean.currentPage==1)return;
                     total.pageBean={
                        currentPage:Number(total.pageBean.currentPage)-1,
                        pageSize:total.pageBean.pageSize,
                    };
                    _this.requestTabelDatas(v,JSON.stringify(total.pageBean),index,null,true);    
                 }
             })
            // if(_this.datas.editListPages.currentPage==1)return;
            // _this.datas.editListPages={
            //     currentPage:Number(_this.datas.editListPages.currentPage)-1,
            //     pageSize:_this.datas.editListPages.pageSize,
            // };
        
        },
        toPage(total,index){
            let _this = this; 
            _this.datas.getDataAllInfos.map((v,i)=>{
                 if(total.cid == v.reportID){
                    let value = total.pageBean.currentPage;
                    let dReg=/^[0-9]*[1-9][0-9]*$/;
                    if(dReg.test(value)){
                        total.pageBean={
                            currentPage: total.pageBean.currentPage,
                            pageSize: total.pageBean.pageSize
                        };
                    }else{
                        pubMethod.adalert("输入的值不规范！",500);
                        total.pageBean.currentPage =  total.pageBean.oldCurrentPage;
                    };
                    _this.requestTabelDatas(v,JSON.stringify(total.pageBean),index,null,true);    
                 }
             })
        },
    }
}
</script>
<style lang="less" scoped>
@import '../../style/graph-chart.css';
    .col-confilter{
        display:flex;
        align-items: center;
        width: 400px;
        span{
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
        }
    }
    .filterControl{
        margin-left: 10px;
    }
    .echarts{
        border: 1px solid rgba(242, 242, 242, 1);
        background: rgba(242, 242, 242, 0.247058823529412);
        margin-bottom: 10px;
        max-height: auto;
        min-height: auto;
        padding: 20px 30px;
        margin-bottom: 10px;
    }
    .nodata{
        height: 700px;
        img{
            margin: 150px auto;
            width: 350px;
            height: 250px;
        }
    }
    .btn-search{
        margin: 15px 100px 0 0 ;
        float: right;
    }
    .header-page{
        height: 30px;
        line-height: 30px;
        text-align: left;
        overflow: hidden;
        margin-bottom: 5px;
        .page-title{
            float: left;
            font-size: 16px;
        }
        .page-search{
            float: left;
            span{
              display: inline-block;
              input{
                  height: 25px;
              }
            }
        }
        button{
            height: 28px;
            line-height: 15px;
            margin-left: 10px;
        }
        .page-operate{
            float: right;
            span{
                margin-right: 5px;
                color: #999;
                cursor: pointer;
                .fa{
                    margin: 0 3px;
                }
            }
        }    
    }
    .page-header{
        width: 96%;
        padding: 0 2%;  
        .table{
            margin: 0;
            height: 38px;
            overflow: hidden;
        }  
    }
    .list-inline{
        margin-left: 20px;
    }
    .list-inline>li{
        float: left;
    }
    .list-inline-icon:after{
        content:' > ';
    }
    .drill-opacity{
        opacity: 0;
    }
    .page-table{
        width: 100%;
        max-height: 420px;
        min-height: auto;
        padding: 0 2%;
        overflow: auto;
        position: relative;
        th {
            background-color: #f6f6f6;
        }

        tbody tr:hover {
            background-color: #f9ece0
        }
        .table-top{
            top:0;
            left:2%;
            position: absolute;
            width: 96%;
            // min-width: 96%;
        }
        .table-middle{
            margin-top: 38px;
            overflow: auto;
            width: 100%;
        }
        .col-table-width{
            min-width: 100px;
            width: 300px;
            max-width: 300px;
        }
    }
    .table>thead>tr>th{
        text-align: center;
    } 
    .pages-bar{
        width: 918px;
        height: 40px;
        padding: 0 12px;
        margin-top: 7px;
        overflow: hidden;
        .pagination {
            float: left;
            margin: 0;
            li{
                display: block;
                float: left;
                a{
                    position: relative;
                    float: left;
                    padding: 3px 8px;
                    margin-left: -1px;
                    line-height: 1.42857143;
                    color: #337ab7;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    border-radius: 50%;
                }
                .page-control{
                    width: 60px;
                    font-size: 14px;
                    line-height: 1.42857143;
                    padding-left: 5px;
                    color: #555;
                    background-color: #fff;
                    background-image: none;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    vertical-align: 1px;
                }
                .page-control1{
                    width: 30px;
                }
                .page-disable{
                    background: #f1f1f1 !important;
                    color: #d0d0d0 !important;
                    cursor: no-drop;
                }
            }
                       
        }
    }
</style>
