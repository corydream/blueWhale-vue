<template>
    <div class="new-table-container" >
      <div class="layer-banner">
          <p class="banner-icon"><img src="./../../../assets/logo2.png" alt=""></p>
          <p class="banner-title">自助图表编辑</p>
          <p class="btn-close" @click="closeTable" ><i class="fa fa-close"></i></p>
      </div>
      <!-- 左侧选项 -->
      <div class="col-xs-2 contain-left">
          <div class="contain-left-head">
              <p class="left-model-title">数据模型</p>
              <div class="form-group modal-select-form select-option">
                  <el-select v-model="testSelect" :placeholder="lists.modelName"  @change="changeModel($event)" size="small">
                      <el-option v-for="item in selectModelList" :label="item.cdesc.name" :value="item.cid" :key="item.cid"></el-option>
                  </el-select>
              </div>
              <div class="form-group ">
                    <p class="input-wrapper">
                        <span><input type="text" placeholder="搜索关键词"></span>
                        <span class="input-search-btn"><i class="fa fa-search"></i></span>
                        <span class="input-add"><i class="fa fa-plus" @click="advFilter" v-if="filterShow"></i></span>
                        <!-- <span class="fa fa-angle-down"></span> -->
                    </p>
              </div>
          </div>
          <div class="condite-box">
              <div class="condite-item">
                  <p class="left-title">维度</p>
                  <!-- @click="dim_arrow=!dim_arrow" -->
                  <!-- <i class="fa sort-desc" :class="{'fa-sort-desc':dim_arrow,'fa-sort-up':!dim_arrow}" ></i> -->
                  <ul class="disable-remove dim-advanced-origin" id="dim-advanced-1">
                      <li v-for="(item,index) in datas.dimensionListAry" :data-dimension="item.dimension.toString()" :data-id="item.uuid"  v-if="item.isShow" :data-absolute="item.isMandatory" :data-val="item.val">
                          <div>
                            <span class="js-chart"><i class="fa fa-bar-chart"></i></span>
                            <span class="select-name-list" v-text="item.chinese" :title="item.chinese"></span>
                            <span class="js-select"><i class="js-arrow fa fa-sort-desc"></i></span>
                            <span><i class="js-remove fa fa-close"></i></span>
                            <span class="js-code"></span>
                          </div>
                      </li>
                  </ul>
              </div>
              <div class="condite-item">
                  <p class="left-title" >数值</p>
                  <!-- @click="num_arrow=!num_arrow" -->
                  <!-- <i class="fa sort-desc" :class="{'fa-sort-desc':num_arrow,'fa-sort-up':!num_arrow}" ></i> -->
                  <ul class="disable-remove numerical num-advanced-origin" id="num-advanced-1">
                      <li v-for="(item,index) in datas.numericalListAry" :data-dimension="item.dimension.toString()" :data-id="item.uuid" :data-mark="item.ishide" :data-aggTypes="item.ishide?'':item.aggTypes"  v-if="item.isShow" @click="updateCal(item)">
                          <div>
                            <span class="js-chart"><i class="fa fa-bar-chart"></i></span>
                            <span class="select-name-list" v-text="item.chinese" :title="item.chinese"></span>
                            <span class="js-select"><i class="js-arrow fa fa-sort-desc"></i></span>
                            <span><i class="js-remove fa fa-close"></i></span>
                            <span class="js-code"></span>
                            <!-- <span v-if="item.ishide" class="board-ellipsis"><i class="fa fa-ellipsis-v"></i></span> -->
                          </div>
                        </li>
                  </ul>
              </div>
          </div>
      </div>
      <!-- 中间内容区块 -->
      <div class="col-xs-8 contain-contain" v-loading="datas.isLoadingShow" style="width:calc(100% - 590px);padding:0">
        <div class="middle-top">
            <div class="middle-top-item dim-advanced">
                <dl class="dl-horizontal">
                    <dt class="data-item">维度</dt>
                    <dd>
                        <ul class="list-inline-sort list-inline enable-remove  dim-datas" id="dim-advanced-2">

                        </ul>
                    </dd>
                </dl>
            </div>
            <div class="middle-top-item drill-down" v-show="datas.drillAction">
                <dl class="dl-horizontal">
                    <dt class="data-item">钻取</dt>
                    <dd>
                        <ul class="list-inline-sort list-inline enable-remove" id="dim-advanced-4">
                        </ul>
                    </dd>
                </dl>
            </div>
            <div class="middle-top-item num-advanced">
                <dl class="dl-horizontal">
                    <dt class="data-item">数值</dt>
                    <dd>
                        <ul class="list-inline-sort list-inline enable-remove num-datas" id="num-advanced-2">

                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="middle-bottom">
          <div class="clearfix">
              <!-- 区分echart -->
              <div class="col-xs-10 page-echart-append">
                   <div class="drill-nav">
                        <ul class="list-inline">
                            <li v-for="(item,index) in datas.drillNavData"  :data-id='item.uuid' @click="backDrillDown(datas.drillNavData,item,index)"><a href="javascript:;" v-text="item.item"></a> ></li>
                        </ul>
                    </div>
                <div v-if="datas.grayImgIndex == 0" :data-id="datas.grayImgIndex">

                    <section>
                        <div class="table-wrap table-wrap-inner" v-if="datas.editTableSumData">
                        <table class="table table-bordered table-top" :data-scroll="datas.divScrollTop" :style="{top:scrolltop +'px'}">
                            <thead>
                                <tr>
                                    <th class="col-table-width" v-for="(item,index) in datas.editTableSumData.metas" :key="item.id" :data-id="item.uuid">{{ item.chinese }}</th>
                                </tr>
                            </thead>
                        </table>
                        <table style="margin-top:36px;" class=" table table-middle table-bordered table-hover text-center edit-list-table data-table-list" id="list-table">
                            <!-- <thead>
                                <tr>
                                    <th class="col-table-width" v-for="(item,index) in datas.editTableSumData.metas"  :data-id="item.uuid">{{ item.chinese }}</th>
                                </tr>
                            </thead> -->
                            <tbody>
                                <tr v-for="(lineData,lindex) in datas.editTableSumData.result" >
                                    <td class="col-table-width" v-for='(v,vindex) in lineData' v-if="vindex==0 && datas.isDrill"  :data-id='datas.editTableSumData.metas[vindex].uuid' @click="showNextLevel(v,datas.editTableSumData.metas[vindex].uuid)"><a href="javascript:;">{{ v }}</a></td>
                                    <td class="col-table-width" :datas-datas='v' :data-id='datas.editTableSumData.metas[vindex].uuid' v-else>{{ v }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered table-bottom" :data-scroll="datas.divScrollTop" v-if="datas.tableCalculateData.totalColumnAll" :style="{bottom:-(datas.divScrollTop) +'px'}">
                            <thead>
                                <!-- {{datas.tableFootTotalAry}} -->
                                <tr v-if="datas.tableFootTotalAry.length > 0">
                                    <!-- mark start-->
                                    <th class="col-table-width" v-for="(item,index) in datas.editTableSumData.metas"  v-text="datas.tableFootTotalAry[index].total || ''"></th>
                                </tr>
                            </thead>
                        </table>
                        </div>
                    </section>
                    <section>
                        <div class="pages-bar">
                            <nav aria-label="Page navigation">
                                <ul class="pagination pagination-sm">
                                    <li>
                                        <a href="javascript:;" aria-label="Previous" @click="editPrevPage"  :class="{'page-disable':datas.editListPages.currentPage==1}">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li class="jump-page">跳转到&nbsp;&nbsp;<input type="text" class="page-control page-control1" @keyup.13="toPage($event)" v-model="datas.editListPages.currentPage">&nbsp;&nbsp;页 &nbsp;
                                    </li>
                                    <li>
                                        <a href="javascript:;" aria-label="Next" @click="editNextPage" :class="{'page-disable':(datas.editTableSumData.pageBean?datas.editTableSumData.pageBean.lastPage:false)}">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                    <li class="page-size-select">
                                        <input type="number" step="20" max="100" min="20" class="page-control" @change="mPageSize" v-model="datas.editListPages.pageSize">
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>
                </div>
                <!-- 折线图 -->
                <div class="page-echart-item" v-if="datas.grayImgIndex < 4 || datas.grayImgIndex == 5">
                    <div class="chart-graph chart_1" id="lineChart" :style="{width: '100%', height: '450px'}"></div>
                    <div class="chart-graph chart_2" id="barChart"  :style="{width: '100%', height: '450px'}"></div>
                    <div class="chart-graph chart_3" id="pieChart"  :style="{width: '100%', height: '450px'}"></div>
                    <div class="chart-graph chart_5" id="radarMap"  :style="{width: '100%', height: '450px'}"></div>
                </div>
                <div v-if="datas.grayImgIndex == 4&&indexCardShow">
                    <div class="page-index-card">
                        <p class="index-card-title">{{datas.editTableSumData.metas?datas.editTableSumData.metas[0].chinese:''}}</p>
                        <p class="index-card-content">{{datas.editTableSumData.result?datas.editTableSumData.result[0][0]:'' | indexCard}}</p>
                    </div>
                </div>
              </div>

              <div class="col-xs-2 screening-box-wrap">
                  <div class="screening-box">
                      <h4 class="screeing-head">数据筛选</h4>
                      <div class="screening-wrap">
                          <div class="panel-group middle-top" role="tablist" aria-multiselectable="true">
                              <dl>
                                  <dd>
                                      <ul class="filter-ul" style="min-height:660px;overflow:hidden" id="dim-advanced-3">

                                      </ul>
                                  </dd>
                              </dl>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <!-- 右侧条件区块-->
      <div class="col-xs-2" style="height:900px;border-left:1px solid #e5e5e5;padding:0;float:right;width:320px;margin-top:3px;">
        <div class="right-wrap">
            <div class="right-item report-name">
                <h5 class="report-head">报表名称</h5>
                <p>
                    <input type="text" placeholder="请输入报表名称" v-model="datas.reportInfo.reportName.text" class="report-name-input">
                    <span class="right-item-icon" v-if="datas.reportInfo.reportName.text" @click="datas.reportInfo.reportName.text=''"><i class="fa fa-times-circle"></i></span>
                    <span class="right-item-limit">不可超过<i style="font-style:normal;" :class="{'limit-active':reportLimit.nameLimit<0}">{{reportLimit.nameLimit}}</i>个字符</span>
                </p>
            </div>
            <div class="right-item report-note">
                <h5 class="report-head">报表描述</h5>
                <p>
                    <textarea style="resize:none;" name="report-note" placeholder="请输入报表描述" v-model="datas.reportInfo.reportNote.text" class="report-name-input" cols="45" rows="3"></textarea>
                    <span class="right-item-icon" style="top:2px;" v-if="datas.reportInfo.reportNote.text" @click="datas.reportInfo.reportNote.text=''"><i class="fa fa-times-circle"></i></span>
                    <span class="right-item-limit" style="top:70px;">不可超过<i style="font-style:normal;" :class="{'limit-active':reportLimit.descriptionLimit<0}">{{reportLimit.descriptionLimit}}</i>个字符</span>
                </p>
            </div>
            <div class="right-item representate">
                <h5 class="report-head" style="margin-bottom:0;">选择图表</h5>
                <ul class="list-group list-inline"  style="margin-bottom:0;margin-left: 0;">
                    <!-- <li v-for="(item, index) in datas.showStyle" :key="item.id" class="gray-img" :class="{active:item.active}"><img :src="datas.showStyle[index].src" alt=""></li> -->
                    <li v-for="(item, index) in datas.showStyle"  class="gray-img" :class="{active:item.active}" @click="changeImage(index)"><img :src="item.active?datas.showStyle[index].srcActive:datas.showStyle[index].src" alt=""></li>
                </ul>
            </div>
            <div style="padding-bottom:12px;" class="right-item calculate-table limit-10" v-if="datas.grayImgIndex == 0">
                <h5 class="report-head">表格计算</h5>
                <!--
                    ******
                    简单计算
                    ******
                -->
                <p class="calculate-table-item" @click="simpleCal">简单计算</p>
                <Modal v-model="modal11" title="简单计算" :styles="{top: '270px'}" @on-ok="defaultLoading" cancelText="">
                    <div style="margin: 0 0 15px 60px;">
                        <input type="checkbox" id="totalAllCount" :checked="datas.tableCalculateData.totalColumnAll" @click="totalAllCount">&nbsp;&nbsp;列总计
                    </div>
                    <div class="unit-count" v-if="datas.tableCalculateData.totalColumnAll">
                        <div class="form-horizontal" v-for="(item,index) in datas.tableCalculateData.totalColumns">
                            <div class="form-group" style="margin-left: 60px;">
                                <label class="col-sm-3 control-label" v-text="item.name" style="text-align:left;"></label>
                                <div class="col-sm-7">
                                    <select class="form-control" @change="selectTotalCount($event,item)">
                                        <option v-for="(v,i) in item.options"  :selected="v.selected" v-text="v.name"></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <!--
                    ******
                    高级计算
                    ******
                -->
                <p class="calculate-table-item" @click="complexCal">高级计算</p>
                <Modal v-model="modal10" title="同比字段设置" @on-ok="similarSubmit" @on-cancel="similarCancel" :styles="{top: '270px'}">
                    <p class="similar-item">
                        <span class="similar-tip">选择计算字段：</span>
                        <Poptip placement="bottom">
                            <Input style="width: 160px" placeholder="请输入完整名称" v-model="compareInfo"></Input>
                            <div class="api-string" slot="content">
                                <CheckboxGroup v-model="optionArr" @on-change="optionCal()">
                                    <Checkbox v-for="(check_data,i_data) in copyArr" :label="check_data.chinese" :key="check_data.chinese">{{check_data.chinese}}</Checkbox>
                                </CheckboxGroup>
                            </div>
                        </Poptip>
                    </p>
                    <p class="similar-item">
                        <span class="similar-tip">选择时间字段：</span>
                        <Select @on-change="similarChange" v-model="model1" style="width:180px;margin-left:5px;" placeholder="下拉筛选时间字段"  >
                            <Option  v-for="item in similarDate" :value="item.chinese" :key="item.chinese">{{ item.chinese }}</Option>
                        </Select>
                    </p>
                    <p class="similar-item">
                        <span class="similar-tip">选择起始日期：</span>
                        <DatePicker v-model="fromBeginValue" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 150px"></DatePicker>  ~
                        <DatePicker v-model="fromEndValue" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 150px"></DatePicker>

                    </p>
                    <p class="similar-item">
                        <span class="similar-tip">选择同比日期：</span>
                        <DatePicker v-model="compareBeginValue" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 150px"></DatePicker>  ~
                        <DatePicker v-model="compareEndValue" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 150px"></DatePicker>
                    </p>
                </Modal>
                <div class="calculate-table-item merge-unit">
                    <h6><input type="checkbox" :checked="datas.tableCalculateData.totalChartAll" aria-label="..." @click="mergeUnit"> 合并同类单元格</h6>
                </div>
            </div>
            <!-- 折线图 -->
            <div class="right-item calculate-table limit-10" v-if="datas.grayImgIndex == 1">
                <h5 class="report-head">展现样式</h5>
                <div class="report-item">
                    <span style="display:inline-block;height:25px;line-height:25px;">线形图</span>
                    <span class="chart-item line" :class="{'active-line':datas.myChartOption.line.showLine}" @click="chartShow(datas.grayImgIndex,null,'Line')"></span>
                    <span class="chart-item smooth" :class="{'active-smooth':datas.myChartOption.line.showSmooth}" @click="chartShow(datas.grayImgIndex,null,'Smooth')"></span>
                </div>
                <div class="report-item">
                    <span style="display:inline-block;height:25px;line-height:25px;">面积图</span>
                    <span class="chart-item area" :class="{'active-area':datas.myChartOption.line.showArea}" @click="chartShow(datas.grayImgIndex,null,'Area')"></span>
                </div>
                <div class="report-item" style="margin-bottom:20px;">
                    <span style="display:inline-block;height:25px;line-height:25px;">轴标题</span>
                    <input style="width:calc(100% - 50px);border-color:#a0a0a0;height:25px;" v-model="datas.myChartOption.line.name" @change="chartShow(datas.grayImgIndex)" type="text">
                </div>
            </div>
            <!-- 柱状图 -->
            <div class="right-item calculate-table limit-10" v-if="datas.grayImgIndex == 2">
                <h5 class="report-head">展现样式</h5>
                <div class="report-item">
                    <span style="display:inline-block;height:25px;line-height:25px;">条形图</span>
                    <span class="chart-item bar" :class="{'active-bar':datas.myChartOption.bar.showBar}" @click="chartShow(datas.grayImgIndex,null,'Bar')"></span>
                    <span class="chart-item reverseBar" :class="{'active-reverseBar':datas.myChartOption.bar.showReverseBar}" @click="chartShow(datas.grayImgIndex,null,'ReverseBar')"></span>
                </div>
                <div class="report-item">
                    <span style="display:inline-block;height:25px;line-height:25px;">堆积图</span>
                    <span class="chart-item stackedPlot" :class="{'active-stackedPlot':datas.myChartOption.bar.showStackedPlot}" @click="chartShow(datas.grayImgIndex,null,'StackedPlot')"></span>
                    <span class="chart-item reverseStackedPlot" :class="{'active-reverseStackedPlot':datas.myChartOption.bar.showReverseStackedPlot}" @click="chartShow(datas.grayImgIndex,null,'ReverseStackedPlot')"></span>
                </div>
                <div class="report-item" style="margin-bottom:20px;">
                    <span style="display:inline-block;height:25px;line-height:25px;">轴标题</span>
                    <input style="width:calc(100% - 50px);border-color:#a0a0a0;height:25px;" v-model="datas.myChartOption.bar.name" @change="chartShow(datas.grayImgIndex)" type="text">
                </div>
            </div>
            <!-- 饼状图 -->
            <div class="right-item calculate-table limit-10" v-if="datas.grayImgIndex == 3">
                <h5 class="report-head">显示条目数</h5>
                <div class="report-item">
                    <span>前</span>
                    <input type="number" min="1"  v-model="datas.myChartOption.pie.showEntries" @change="chartShow(datas.grayImgIndex,null,null,true)">
                </div>
                <h5 class="report-head">展现样式</h5>
                <div class="report-item">
                    <span style="display:inline-block;height:25px;line-height:25px;">饼图样式</span>
                    <span class="chart-item pie" :class="{'active-pie':datas.myChartOption.pie.showPie}" @click="chartShow(datas.grayImgIndex,null,'Pie')"></span>
                    <span class="chart-item radius" :class="{'active-radius':datas.myChartOption.pie.showRadius}" @click="chartShow(datas.grayImgIndex,null,'Radius')"></span>
                </div>
            </div>
            <div style="padding-bottom: 12px;" class="right-item calculate-table limit-10" v-if="datas.grayImgIndex == 1 || datas.grayImgIndex == 2 || datas.grayImgIndex == 3 || datas.grayImgIndex == 5">
                <h5 class="report-head">设计布局</h5>
                <div v-if="datas.grayImgIndex == 1 || datas.grayImgIndex == 2">
                    <label for="showX" class="clear-blod" >
                        <input type="checkbox" id="showX" :checked="checkChart(datas.grayImgIndex,'X')" @click="chartShow(datas.grayImgIndex,'X')">&nbsp;&nbsp;显示X轴
                    </label>
                    <label for="showY" class="clear-blod" >
                        <input type="checkbox" id="showY" :checked="checkChart(datas.grayImgIndex,'Y')" @click="chartShow(datas.grayImgIndex,'Y')">&nbsp;&nbsp;显示Y轴
                    </label>
                </div>
                <label for="showTag" class="clear-blod" v-if="datas.grayImgIndex != 5">
                    <input type="checkbox" id="showTag" :checked="checkChart(datas.grayImgIndex,'Tag')" @click="chartShow(datas.grayImgIndex,'Tag')">&nbsp;&nbsp;显示数值标签
                </label><br>
                <label for="showLegend" class="clear-blod" >
                    <input type="checkbox" id="showLegend" :checked="checkChart(datas.grayImgIndex,'Legend')" @click="chartShow(datas.grayImgIndex,'Legend')">&nbsp;&nbsp;显示图例
                </label><br>
                <label for="showTooltip" class="clear-blod" >
                    <input type="checkbox" id="showTooltip" :checked="checkChart(datas.grayImgIndex,'Tooltip')" @click="chartShow(datas.grayImgIndex,'Tooltip')">&nbsp;&nbsp;显示tooltip
                </label>
            </div>
            <!-- <div class="right-item chart-search">
                <h5 class="report-head" :class="{'report-head-hide':datas.grayImgIndex != 0}">图表查询控件</h5>
                <div class="chart-search-content" @click="chartSearch">
                    <div>
                        <i class="fa fa-filter" style="color:#7f7f7f;"></i>
                        <span>添加自定义查询控件</span>
                    </div>
                    <i class="fa fa-cog hide"></i>
                </div>
            </div> -->
            <!-- <div class="right-item home-page">
                <h5 class="report-head">首页显示筛选项</h5>
                <div class="check-selcet">
                    <p v-for="(item,index) in displayScreen">
                        <label><input type="checkbox" :checked="item.isChecked" @click="item.isChecked = !item.isChecked"> {{ item.chinese }}</label>
                    </p>
                </div>
            </div> -->
            <!-- <div class="right-item update-frequency">
                <h5 class="report-head">数据更新频率</h5>
                <div class="data-update-select">
                    <select class="form-control">
                        <option value="daly">每天（日报）</option>
                        <option value="week">每周（自然周）</option>
                        <option value="month">每月（自然月）</option>
                    </select>
                </div>
            </div> -->
        </div>
        <div class="save-report-box text-center">
            <el-button type="primary" @click.prevent="saveReport">保存报表</el-button>
        </div>
      </div>
    </div>
</template>
<script>
import datas from './../../../config/datas';
import bus from './../../../config/bus';
import roleInfo from './../../../data/roles';
import { pubMethod } from './../../../config/public';
import './../../../config/tablesMergeCell.js';
import './../../../config/sortrefer.js';
import './../../../config/Sortable.js';
import './../../../config/jquery.contextmenu';
import dataCover from './dataCover';
import a_filter  from './advancedFilter';
import echarts from 'echarts';
import moment from 'moment';
import chartSearch from './chartSearch'
// import Checkbox from 'iview/src/components/checkbox';
export default {
  data () {
    return {
       compareInfo: '', //显示选择信息
       filterShow: false, //显示隐藏高级筛选字段
       datas: datas.datas,
       dim_arrow:true,
       num_arrow:true,
       lists: {},
       selectModelList: [],
       data: datas,
       coverQuery:{},
       newTableDatas:[],
       reportId:-1,
       showSelectWord: true,
       showGraph: true,
       modeldesc:'',
       changeDatas:{}, // 改变数据触发回调
       testSelect:'',
       count:0,
       indexCardShow : true,
       islock:true,
       reportLimit:{
           nameLimit:100,
           descriptionLimit:100
       },
       orderTypes: ['区间','大于','小于','等于','不等于','大于等于','小于等于'],
       agglastStr: ['SUM'],
       isPercent: false,//百分比
       isDistinct: false,//去重
       filterAuto:{}, //传值a_filter
       modal10:false, //同比对话框
       modal11:false, //简单计算对话框
       model1:'',
       similarObj:{}, //同比点击确定
       similarDate:[], //筛选同比时间数组
       fromBeginValue:'',
       fromEndValue:'',
       compareBeginValue:'',
       compareEndValue:'',
       loading: true,
       optionArr: [], // 选择计算字段显示的数组
       copyArr:[], //存储回显数值数组
       scrolltop: 0,
       trigger: false //同比字段执行一次
    }
  },
  components: {
      dataCover,
      a_filter,
      chartSearch
  },
  created() {
        this.lists = this.$parent.boardata;
        this.showChangeSelect(this.lists.boardID);
        this.datas.createGraphOpen = true;
        // bus.$once('addAdvanced',dataALL =>{
        //     // this.datas.numericalListAry.push(dataALL);
        //     // // this.$delete(this.datas,'numericalListAry')
        //     // this.$set(this.datas,'numericalListAry',this.datas.numericalListAry);
        //     if(dataALL){
        //         this.showLeftdata(this.datas.moduleTypeId,this.datas.requestProject,true);
        //     }
        // })
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
  mounted() {
        this.datas.grayImgIndex = this.lists.chartType;
        this.datas.editTableSumData = [];
        this.datas.tableUid = this.lists.boardID;
        this.datas.reportInfo.reportName.text = this.lists.reportName;
        this.$nextTick(() =>{
          let _this = this;
          _this.calculator();
          _this.datas.getDataInfos = [];
          if(_this.lists.echoPage){
              _this.datas.showStyle.forEach((item,v)=>{
                  if(_this.lists.chartType == v){
                      item.active = true;
                  }else{
                      item.active =false;
                  }
              })
              _this.datas.myChartOption = JSON.parse(_this.lists.tableObj.reportObj).echartConfig;
              _this.datas.getDataOriginalInfos.map((v,i)=>{
                   if(_this.lists.cid == v.reportID){
                       _this.datas.getDataInfos = v;
                       _this.reportId = v.reportID;
                   }
              })
              //同比信息回显
            //    optionArr model1 fromBeginValue fromEndValue compareBeginValue compareEndValue
            let compareMessure = JSON.parse(_this.lists.tableObj.reportObj);
            if(compareMessure.hasOwnProperty('CompareColumn')){
                _this.datas.similarOpts = compareMessure.CompareColumn;
                _this.model1 = compareMessure.CompareColumn.chinese;
                _this.fromBeginValue = compareMessure.fromBegin;
                _this.fromEndValue = compareMessure.fromEnd;
                _this.compareBeginValue = compareMessure.compareBegin;
                _this.compareEndValue = compareMessure.compareEnd;
            }

            //  document.querySelector(".table-wrap").addEventListener('scroll',this.handleScroll);
          }
          else{
              bus.$emit('islock',true);
                _this.datas.conditionMap = {};
                _this.datas.rightListConditions.conditions=[];
                _this.datas.numericalListAry = [];
                _this.datas.dimensionListAry = [];
                _this.datas.editListPages ={
                    currentPage:1,
                    pageSize:20
                }
                _this.filterShow = false;
                if(_this.datas.editTableSumData){
                    _this.newTableDatas.push(_this.datas.editTableSumData);
                    _this.datas.editTableSumData = [];
                    _this.datas.reportInfo.reportName.text = '';
                    _this.datas.reportInfo.reportNote.text = '';
                }
                _this.lists.cinfo = '';
                _this.datas.tableCalculateData.totalColumns = [];
                _this.datas.divScrollTop = 2;
                _this.datas.drillAction = false;
                _this.datas.isDrill=false;
                // echart 默认配置
                _this.datas.myChartOption = {
                    line:{showX:true,showY:true,showTag:true,showTooltip:true,showLegend:true,showSmooth:false,showLine:true,showArea:false,name:''},
                    bar:{showX:true,showY:true,showTag:true,showTooltip:true,showLegend:true,showBar:true,showReverseBar:false,showStackedPlot:false,showReverseStackedPlot:false,name:''},
                    pie:{showX:false,showY:false,showTag:true,showTooltip:true,showLegend:true,showRadius:false,showPie:true},
                    radarMap:{showX:false,showY:false,showTag:true,showTooltip:true,showLegend:true}
                }

          }
          _this.dragItem(_this.datas.dimensionDragAry,'dim-advanced-');
          _this.dragItem(_this.datas.numericalDragAry,'num-advanced-');
            $(".screening-wrap ul").on("click","li .shortcut-date",function(ev){
                $(this).addClass('shortcut-date-active').siblings().removeClass('shortcut-date-active');
                var uuid = $(this).parents('li').attr('data-id');
                var timeStr = $(this).attr('data-time');
                var conditionInfo=_this.datas.conditionMap[uuid];
                if(timeStr){
                    conditionInfo.val = timeStr.split(',');
                    _this.datas.rightDateDatas=conditionInfo.data;
                    pubMethod.removeOldCondition(uuid);
                    var bcondition=pubMethod.getConditionByType(timeStr.split(',')[0],uuid,'LARGEEQUAL');
                    var econdition=pubMethod.getConditionByType(timeStr.split(',')[1],uuid,'LESSEQUAL');
                    _this.datas.rightListConditions.conditions.push(bcondition);
                    _this.datas.rightListConditions.conditions.push(econdition);
                }else{
                    pubMethod.removeOldCondition(uuid);
                    conditionInfo.val = null;
                }
                pubMethod.regenerateTabel(false);
            });

            $(".screening-wrap ul").on("click","li .show-popup",function(ev){
               $(this).parents('li').find('.set-ico').click();
            });
            $(".screening-wrap ul").on("click","li .set-select",function(ev){
                if(!$(this).parents('li').hasClass('current')){
                    $(this).find('i').css({top:'3px',transform:'rotate(180deg)'}).parents('li').addClass("current").find('ul').slideUp("fast");
                }else{
                    $(this).find('i').css({top:'-3px',transform:'rotate(0deg)'}).parents('li').removeClass("current").find('ul').slideDown("fast");
                }

            });
          $(".screening-wrap ul").on("click","li .set-ico",function(ev){
            var _that = _this;
            let e=ev || event;
            let uuid=$(this).parents('li').attr("data-id");
            let objItem=pubMethod.globalfindObj(uuid);
            let columnType=objItem.columnType;
            let conditionInfo = _that.datas.conditionMap[uuid];
            if(!conditionInfo){
                _this.datas.numericalListAry.map(item=>{
                    if(item.uuid == uuid){
                        conditionInfo = item;
                        columnType = 'NUMBER';
                        conditionInfo.defaultSelect = 2;
                    }
                })
                // 新增字段逻辑判定以后调整
                return false;
            }
            _that.$set(_that.datas.rightNumberDatas,"defaultSelect",conditionInfo.defaultSelect);
            if(conditionInfo.defaultSelect){
                _that.$set(_that.datas.rightNumberDatas,"isSelectNumber",true);
            };
            var conditionType = conditionInfo.columnType;
            _that.$set(_that.coverQuery,'query',{iscolumnVal:conditionInfo.val,isMandatory:conditionInfo.isMandatory,name:conditionType,uuid:objItem.uuid,modelID:_that.lists.modelID});
            if(conditionType =="DATETIME" || conditionType == "DATE")
            {
                _that.datas.rightDateDatas=null;
                var obj=conditionInfo.data;
                _that.datas.rightDateDatas=obj;
            }else if(conditionType=="STRING"){
                _that.datas.rightStringDatas=[];
                conditionInfo.addLazy = objItem.addition.lazy;
                conditionInfo.searchBase = objItem.searchBase?objItem.searchBase:'';
                _that.datas.rightStringRadio=conditionInfo.rightStringRadio;
                var dataArray=conditionInfo.data;
                for(var key in dataArray){
                    _that.$set(_that.datas.rightStringDatas,key,dataArray[key]);
                }
            }else if(conditionType=="NUMBER") {
                var obj=conditionInfo.data;
                if(obj.initMM){
                    _that.datas.rightNumberDatas.minNumber=obj.minVal;
                    _that.datas.rightNumberDatas.maxNumber=obj.maxVal;
                };
                if(obj.initSingle){
                    _that.datas.rightNumberDatas.enterNumbers=obj.enterNumber;
                }
            }
            var frames = _that.$layer.iframe({
                    content: {
                        content: dataCover,//传递的组件对象
                        uuid:uuid,
                        parent: _that,//当前的vue对象
                        data: _that.coverQuery//props
                    },
                    area:['600px','auto'],
                    title: '编辑筛选选项'
                });
            });
          return false;
        });

  },
  watch: {
    //   watch监察对象
    changeDatas:function(){

    },
    // 'value1':function(val){
    //     this.$set(this,'value1',val);
    // },
    // 'datas.numericalListAry':function(){
    //     this.recoverData(this.lists.modelID);
    // },
    // 'datas.dimensionListArydatas':function(){
    //     this.recoverData(this.lists.modelID);
    // },
    'dim_arrow':function(){
        if(this.dim_arrow){
            $("#dim-advanced-1").show();
        }
        else{
            $("#dim-advanced-1").hide();
        }
    },
    'num_arrow':function(){
        if(this.num_arrow){
            $("#num-advanced-1").show();
        }
        else{
             $("#num-advanced-1").hide();
        }
    },
    'datas.reportInfo.reportName.text':function(val){
        if(val != undefined){
            this.reportLimit.nameLimit = 100 - this.getByteLen(val);
        }
    },
    'datas.reportInfo.reportNote.text':function(val){
        if(val != undefined){
           this.reportLimit.descriptionLimit = 100 - this.getByteLen(val);
        }
    },
    'datas.editTableSumData.result':function(val){
        let _this = this;
        let measures = _this.data.originalData.data.data.measures;
        _this.$nextTick(_=>{
            if(_this.lists.tableObj&&$("#num-advanced-2>li").length>0){
                if(_this.lists.tableObj.mergeTabs){
                    tablesMerge();
                }
                if(_this.datas.editTableSumData.metas.length>0){
                    _this.datas.editTableSumData.metas.map(v=>{
                        if(v.chinese.indexOf('同比')>0){
                            _this.trigger =true;
                        }
                    });
                }
                let compareMessure = JSON.parse(_this.lists.tableObj.reportObj);
                if(compareMessure.hasOwnProperty('CompareColumn')&&!_this.trigger){
                    if(!$.isEmptyObject(compareMessure.CompareColumn)){
                        _this.datas.dateCompare = {
                            fromBegin:compareMessure.fromBegin,
                            fromEnd:compareMessure.fromEnd,
                            compareBegin:compareMessure.compareBegin,
                            compareEnd:compareMessure.compareEnd
                        }
                        compareMessure.compareName.map(v=>{
                            _this.compareInfo += v;
                        })
                        _this.optionArr = compareMessure.compareName;
                         _this.optionArr.map(v=>{
                            measures.map(v_measure=>{
                                if(v == v_measure.chinese){
                                    v_measure.isCompare = true;
                                }
                            })
                        })
                        pubMethod.regenerateTabel(_this.datas.showDrillBack);
                        _this.trigger = true;
                    }
                }
            }
            if(val){
                if(val.length>0 && _this.datas.grayImgIndex==0){
                    document
                    .querySelector(`.table-wrap-inner`)
                    .addEventListener("scroll", function(event) {
                        _this.scrolltop = event.target.scrollTop;
                    });
                }
            }

        })
    }
  },
  methods: {
    //   筛选字段
    optionCal(){
        this.compareInfo = '';
        this.optionArr.map(v=>{
            this.compareInfo += v;
        })
    },
    // 点击简单计算
    simpleCal(){
        this.modal11 = true;
    },
    //同比选择字段处理
    complexCal(){
        let _this = this;
        let tempArr = [];
        _this.copyArr = [];
        _this.modal10 = true;
        _this.datas.dimensionListAry.map(v=>{
            if(v.columnType == 'DATE'){
                    _this.similarDate.push(v);
            }
        })
        $("#dim-advanced-2>li").each(function(index,item){
            _this.similarDate.map((v,i)=>{
                if($(item).attr("data-id") == v.uuid){
                    _this.similarDate.splice(i,1);
                }
            })
        })
        $("#num-advanced-2>li").each(function(index,item){
            _this.datas.numericalListAry.map((v,i)=>{
                if($(item).attr("data-id") == v.uuid){
                    _this.copyArr.push(v);
                }
            })
        })
    },
    //   时间格式转化
    getTranslateTime(date){
        if(!date)
        return '';
        var strYear = date.getFullYear();
        var strMonth = date.getMonth()+1;
        var strDay = date.getDate();
        return strYear+'-'+strMonth+'-'+strDay;
    },
//   提交同比信息
    similarSubmit(){
        let _this = this;
        let addObj = {};
        addObj = {
            fromBegin:_this.getTranslateTime(_this.fromBeginValue),
            fromEnd:_this.getTranslateTime(_this.fromEndValue),
            compareBegin:_this.getTranslateTime(_this.compareBeginValue),
            compareEnd:_this.getTranslateTime(_this.compareEndValue)
        }
        _this.datas.dateCompare = addObj;
        let measures = _this.data.originalData.data.data.measures;
        measures.map(v_old=>{
            delete v_old.isCompare;
        });
        _this.optionArr.map(v=>{
            measures.map(v_measure=>{
                if(v == v_measure.chinese){
                    v_measure.isCompare = true;
                }
            })
        })
        if(_this.model1 == ''||_this.fromBeginValue == ''||_this.fromEndValue == ''||_this.compareBeginValue == ''||_this.compareEndValue == ''||_this.optionArr == []){
            _this.$Message.error('所填字段不能为空');
            _this.similarDate = [];
            _this.datas.dateCompare = {};
            return false;
        }
        pubMethod.regenerateTabel(_this.datas.showDrillBack);
        _this.similarDate = [];
        _this.model1 = '';
    },
    similarChange(item){
        let _this = this;
        _this.datas.dimensionListAry.map(v=>{
            if(v.chinese == item){
                _this.$set(_this.datas,'similarOpts',v);
            }
        });
    },
    similarCancel(){
        this.similarDate = [];
    },
    updateCal(item){
        if(item.ishide){
          this.filterAuto = item;
          this.$layer.iframe({
            content: {
                content: a_filter, //传递的组件对象
                parent: this,//当前的vue对象
                data: this.filterAuto//props
            },
            area:['60%','750px'],
            title: '编辑字段'
        });
        }
    },
    getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var length = val.charCodeAt(i);
            if(length>=0&&length<=128)len += 1;
            else len += 2;
        }
        return len;
    },
     defaultLoading(obj){
        this.datas.tableFootTotalAry = [];
        let _this =this;
        let objCurrent ={
            reportInfo:{
                requestProject:_this.datas.requestProject,
                reportInfo:{
                    editListPages:{"oldCurrentPage":1,"currentPage":1,"pageSize":20,"sumPage":6}
                }
            }
        }
        obj = obj?obj:(( _this.datas.getDataInfos.hasOwnProperty('reportInfo'))?_this.datas.getDataInfos:objCurrent);
        var datas;
        if(typeof obj.reportInfo == 'string'){
            datas = JSON.parse(obj.reportInfo);
        }else {
            datas = obj.reportInfo;
        }
        let totalRequestData={
            "columnMessure": [],
            "groupbys": [],
            "tableName": "kylin_sales",
            "conditions": []
        };
        //列总计
        var loopMessureDimenssion = pubMethod.loopMessureDimenssion();
        loopMessureDimenssion.forEach(function(item,index){
                _this.datas.tableCalculateData.totalColumns.forEach(function(o,i){
                        if(item.uuid == o.uuid){
                            o.options.forEach(function(k,p){
                                if(k.selected){
                                    item.agg= k.value;
                                    //添加列总计请求条件
                                    var itemObj={
                                        "agg": k.value,
                                        "sortType": "DEFAULT",
                                        "chinese": $.trim(o.name),
                                        "uuid": o.uuid
                                    }
                                    totalRequestData.columnMessure.push(itemObj);
                                };

                            });
                        };
                });
            });
        var requestObject = {
            sqlParam:totalRequestData,
            pageBean:datas.reportInfo.editListPages,
            project: datas.requestProject
        };
        // //数据请求

        if(_this.datas.tableCalculateData.totalColumnAll){
            // setTimeout(_=>{
                pubMethod.requestTabelDatas(requestObject,null,_this.showModalFn);
                setTimeout(_=>{
                    _this.count = 0;
                },100)

            // },100)

        }
     },
     calculator(){
        //点击维度下拉时的点击聚合计算
         let _this =this;
        $("#dim-advanced-2").off("click").on("click",".drow-down-ul li",function(ev){
            var e=ev || event;
            e.stopPropagation();
            var thisVal=$(this).attr("data-val");
            var uuid=$(this).closest('li[data-id]').attr("data-id");
            _this.datas.currentDimUuid=uuid;
            var demision=_this.data.originalData.data.data.demision;
            for (var x in demision) {
                if (demision[x].uuid === uuid) {
                    demision[x].sortType = thisVal?thisVal:"default";
                }
            }
            var chinese=$("a",this).text();
            var requestObj={
                    uuid:uuid,
                    sortType:thisVal?thisVal:"default",
                    chinese:chinese
                };
            _this.datas.aggregationConditionDim[uuid] = requestObj;
            pubMethod.regenerateTabel(_this.datas.showDrillBack,null,null,requestObj);
        });

        //点击数值下拉时的点击聚合计算
        $("#num-advanced-2").off("click").on("click",".drow-down-ul li",function(ev){
            var e=ev || event;
            e.stopPropagation();
            var thisVal=$(this).attr("data-val");
            var uuid=$(this).closest('li[data-id]').attr("data-id");
            _this.datas.currentNumUuid=uuid;
            var chinese=$("a",this).parents('.current').find('.select-name').text();
            var measures=_this.data.originalData.data.data.measures;
            if(thisVal=="DEFAULT" || thisVal=="ASC" || thisVal=="DESC"){
                var sortordText=thisVal;//给排序赋值
                for (var x in measures) {
                    if (measures[x].uuid === uuid) {
                        _this.agglastStr = [];
                        _this.agglastStr.push(measures[x].aggTypes[0]);
                        measures[x].sortType = sortordText;
                    }
                }
            }else if(thisVal=="isPercent"){
                 _this.isPercent=true;
                for (var x in measures) {
                    if (measures[x].uuid === uuid) {
                        _this.agglastStr = [];
                        chinese = measures[x].chinese;
                        _this.agglastStr.push(measures[x].aggTypes[0]);
                    }
                }
            }else if(thisVal=="isDistinct"){
                 _this.isDistinct=true;
            }
            else if(thisVal == 'HighCal'){
                return false;
            }
            else{
                _this.isDistinct=false;
                _this.isPercent=false;
                _this.agglastStr = [];
                _this.agglastStr.push(thisVal);
            };
            var requestObj={
                    uuid:uuid,
                    sortType:sortordText,
                    agg:_this.agglastStr[0],
                    isDistinct:_this.isDistinct,
                    isPercent:_this.isPercent,
                    chinese:chinese
                };
            _this.datas.aggregationConditionNum[uuid]=requestObj;//数值
            // if(thisVal == 'similarity'){
            //     _this.modal10 = true;

                // _this.similarObj = {
                //     uuid:uuid,
                //     sortType:sortordText,
                //     isDistinct:_this.isDistinct,
                //     isPercent:_this.isPercent,
                //     chinese:chinese,
                //     isCompare:false
                // }
            // }
            // else{
                pubMethod.regenerateTabel(_this.datas.showDrillBack,null,null,requestObj);
            // }

        });
     },
     changeImage(index,item){
        //  var conditions_i = this.datas.rightListConditions.conditions.length;
         var loopNormalDimenssionIndex = pubMethod.loopNormalDimenssion().length;
         var loopMessureDimenssionIndex = pubMethod.loopMessureDimenssion().length;

         if((index > 0 && index < 4) || index  == 5){

            if(loopNormalDimenssionIndex == 0 ){
                this.$Message.error({content: '缺少维度',duration: 2,closable: true});
                return;
            }
            if(loopMessureDimenssionIndex == 0){
                this.$Message.error({content: '缺少数值',duration: 2,closable: true});
                return;
            }
            // if(conditions_i > 0){
            //     this.$Message.error({content: '钻取后的数据无法显示',duration: 10,closable: true});
            //     return;
            // }
            if(loopNormalDimenssionIndex>1){
                this.$Message.error({content: '维度只能唯一',duration: 2,closable: true});
                return;
            }
            if(loopMessureDimenssionIndex>1 && index == 3){
                this.$Message.error({content: '饼状图数值要唯一',duration: 2, closable: true});
                return;
            }
         }
         if(index == 4){
            if(loopMessureDimenssionIndex!=1 || loopNormalDimenssionIndex != 0){
                this.$Message.error({content: '指标卡只能有一条数值，不能有维度',duration: 2, closable: true});
                return;
            }
            this.indexCardShow = true;
            this.datas.grayImgIndex = index;
            this.datas.editTableSumData.chartType = index;

         }
         this.$set(this.lists,'chartType',index);
        //  pubMethod.drawLine(this.datas.editTableSumData.result, $(".page-echart-item")[0]);
         if(index<4 || index == 5){
               this.datas.grayImgIndex = index;
               this.datas.editTableSumData.chartType = index;
            if(index>0){
                $(".page-echart-item .chart-graph").hide();
                $(".page-echart-item").find(`.chart_${index}`).show();
            }
            else{
                $(".page-echart-item .chart-graph").hide();
            }
            this.showGraph = false;
         }
         this.datas.showStyle.forEach((item,i)=>{
            if(index == i){
                item.active = true;
            }else{
                item.active = false;
            }
         })
        //  bus.$emit('tabledatas',this.datas.editTableSumData);
     },
     handleScroll(ev) {
         this.datas.divScrollTop = ev.target.scrollTop;
     },
     mergeUnit(){
        this.datas.tableCalculateData.totalChartAll = !this.datas.tableCalculateData.totalChartAll;
        // let val=ev.target.checked;
        if(this.datas.tableCalculateData.totalChartAll){//当已选择时合并单元格
            tablesMerge();
        }else {//当未选择时取消合并单元格
            untablesMerge();
        };
    },
     advFilter() {
        this.filterAuto = {};
        this.$layer.iframe({
            content: {
                content: a_filter, //传递的组件对象
                parent: this,//当前的vue对象
                data: []//props
            },
            area:['60%','750px'],
            title: '添加新字段'
        });
     },
     closeTable () {
         this.datas.isLoadingShow = false;
       if(!this.lists.echoPage){
         this.datas.editTableSumData  = this.newTableDatas[0];
         this.newTableDatas = [];
       }
       this.datas.drillAction =false;
       this.datas.isDrill=false;
       this.datas.reportInfo.reportNote.text = '';
       this.datas.createGraphOpen = false;
       this.datas.chartFirstStep = true;
       this.datas.drillNavData = [];

       this.$layer.closeAll();
     },
     showChangeSelect(uid) {
       let _this = this;
        $.ajax({
            type : "post",
            url : _this.$keyapi+"/auth/get/models",
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success : function(res){
                if(res.status == 1){
                  if(res.data.length == 1){
                        _this.selectModelList.push(res.data[0]);
                        _this.showLeftdata(res.data[0].cid);
                        _this.datas.requestCid= res.data[0].cid;
                        _this.testSelect = res.data[0].cdesc.name;
                        _this.datas.requestProject= res.data[0].cdesc.project;
                        _this.datas.moduleTypeId = res.data[0].cid;
                    }
                  else if(res.status == 101){
                      location.href = "https://data.banggood.cn";
                    }
                  else{
                    res.data.map((v,i) =>{
                        // _this.datas.requestCid= res.data[0].cid;
                        // _this.datas.requestProject= res.data[0].cdesc.project;
                        // _this.datas.moduleTypeId = res.data[0].cid;
                        _this.testSelect = _this.lists.modelName;
                        _this.selectModelList.push(v);
                        if(_this.lists.modelID == v.cid){
                            _this.showLeftdata(_this.lists.modelID);
                            _this.datas.requestCid= _this.lists.cid;
                            _this.datas.moduleTypeId = _this.lists.modelID;
                            _this.datas.requestProject= v.cdesc.project;
                        }
                    })
                  }
                  _this.datas.leftModalDataAry = res.data;
                }else {
                    pubMethod.adalert("数据查询失败！");
                };
            }
        });
     },
     showLeftdata(cid, cname,ishide) {
        var _this = this;
        _this.datas.moduleTypeId = cid;
    //    _this.datas.requestProject = cname;
        _this.datas.requestProject = cname;
        _this.datas.conditionMap = {};
        _this.datas.rightListConditions.conditions=[];
        $.ajax({
            type : "post",
            url : _this.$keyapi+"/auth/get/column",
            dataType: 'json',
            data: {
                cid: cid,
                // reportID:_this.reportId
            },
            xhrFields: {
            withCredentials: true
            },
            success : function(res){
                _this.$set(_this.data.originalData,'data',res);
                _this.datas.dimensionListAry = res.data.demision;
                _this.datas.numericalListAry = res.data.measures;
                _this.filterShow = true;
                //给维度对象dimensionListAry添加isShow字段以便做搜索
                _this.datas.dimensionListAry.map((item,index)=>{
                    _this.$set(item,"isShow",true);
                    _this.$set(item,"isChecked",true);
                });

                //给维度对象numericalListAry添加isShow字段以便做搜索

                _this.datas.numericalListAry.map((item,index)=>{
                    _this.$set(item,"isShow",true);
                    _this.$set(item,"isChecked",true);
                });
                if(ishide){
                    return false;
                }
                let echoPage = _this.lists.echoPage;
                _this.datas.requestCid = cid;
                if(echoPage){
                    //调用回显请求数据方法
                    _this.fillEchoContain(_this.datas.getDataInfos);

                    setTimeout(function(){//回显表格数据
                        pubMethod.regenerateTabel(false,true,true);
                            _this.datas.requestCid = _this.lists.cid;
                            _this.datas.moduleTypeId = _this.lists.modelID;
                            _this.datas.requestProject= _this.lists.project;
                            // setTimeout(_=>{

                            // },200)
                            bus.$on('defaultLoading',data=>{
                                if(data){
                                    _this.count ++;
                                    if(_this.count<=1){
                                        _this.defaultLoading(_this.datas.getDataInfos);
                                    }
                                }
                            })

                    },300);
                }
            }
        });
      },
      recoverData(cid){
          let _this = this;
           $.ajax({
            type : "post",
            url : _this.$keyapi+"/auth/get/column",
            dataType: 'json',
            data: {
                cid: cid,
                reportID:_this.reportId
            },
            xhrFields: {
            withCredentials: true
            },
            success : function(res){
                _this.datas.dimensionListAry = res.data.demision;
                _this.datas.numericalListAry = res.data.measures;
            }
           });
      },
      fillEchoContain(dataObj){//回显填充数据
        // 处理剩下逻辑
        let _this=this;
        // _this.
        // if(dataObj.status==1){
            let obj = JSON.parse(dataObj.reportInfo).reportInfo;
            //obj.requestObject.pageBean=_this.editListPages;
            _this.datas.pageRequestDatas=obj.requestObject;
            _this.datas.reportInfo=obj.reportInfo;
            if(_this.datas.pageRequestDatas.sqlParam.drillDowns.length>0)
            {
                _this.datas.drillAction=true;
                _this.datas.isDrill=true;
            }
            var drillNavDataLength = _this.datas.drillNavData.length;
            var drawBackDrillIndex = _this.datas.pageRequestDatas.sqlParam.drillDowns.length;
            if((drillNavDataLength+1) >= drawBackDrillIndex){
                _this.datas.isDrill = false;
            }
            // var reqData;
            //     if(_this.datas.saveKylinInfo.sqlParam){
            //         var reqData=obj.requestObject.sqlParam;
            //     }
            //     else{
                    var reqData = obj.requestObject.sqlParam;
                // }
                _this.datas.rightListConditions.conditions = reqData.conditions;
            for(var i in reqData){
                var itemData = reqData[i];
                switch (i){
                    case "columnMessure"://数值
                        for(var key in itemData){
                            let uuid = itemData[key].uuid?itemData[key].uuid:itemData[key].newField;
                            _this.appendDimension(uuid ,"num-advanced-2",itemData[key].chinese,itemData[key]);
                            // if(itemData[key].newField){
                                // _this.copyArr.push(itemData[key]);


                            // }
                            _this.data.originalData.data.data.measures.map(v=>{
                                if(v.uuid == uuid){
                                    v.sortType = itemData[key].sortType;
                                }
                            })
                        };
                        break;
                    case "groupbys"://维度
                        for(var key in itemData){
                            let uuid = itemData[key].uuid;
                            _this.appendDimension(itemData[key].uuid,"dim-advanced-2",itemData[key].chinese);
                             _this.data.originalData.data.data.demision.map(v=>{
                                if(v.uuid == uuid){
                                    v.sortType = itemData[key].sortType;
                                }
                            })
                        };
                        break;
                    case "drillDowns"://钻取
                        for(var key in itemData){
                            // _this.appendDimension(itemData[key].uuid,"dim-advanced-4",itemData[key].chinese);
                             if(key == 0){
                                _this.appendDimension(itemData[key].uuid,"dim-advanced-4",itemData[key].chinese,null,0);
                            }else{
                                _this.appendDimension(itemData[key].uuid,"dim-advanced-4",itemData[key].chinese);
                            }
                        };
                        /*for(var key in itemData){
                            var iteObj=globalfindObj(itemData[key].uuid);
                            _this.drillDownData.push(iteObj);
                        };*/
                        break;
                    case "conditionMap"://数据筛选
                        _this.datas.conditionMap=itemData;
                        if(Object.keys(itemData).length == 0){
                            var liHtml = `<li class="hint-info">请拖拽左侧字段至此处进行筛选<li>`
                            $("#dim-advanced-3").append(liHtml);
                        }
                        for(var key in itemData){
                            _this.appendDimension(key,"dim-advanced-3",itemData[key].chinese,itemData[key])
                        };
                        break;
                    case "tableCalculateData":
                        _this.datas.tableCalculateData=itemData;
                        break;
                };
            }
        // }else {
        //     pubMethod.adalert("request error:"+dataObj.desc);
        // }
      },
      changeModel(ev) {
       let val = ev;
       this.showSelectWord = false;
       this.compareInfo = '';
       this.optionArr = [];
       this.selectModelList.map((v,i) =>{
          if(v.cid == val){
            // this.datas.tableCalculateData = [];
            $(".unit-count").empty();
            $("#dim-advanced-2,#num-advanced-2,#dim-advanced-3,#dim-advanced-4").empty();
            // $(".page-echart-item .chart-graph").hide();
            this.datas.drillDownData=[];
            this.datas.editTableSumData=[];
            let cname = v.cdesc.project;
            this.datas.tableCalculateData.totalColumns = [];
            this.datas.tableCalculateData.totalColumnAll = false;
            datas.datas.tableCalculateData.totalChartAll = false;
             untablesMerge();
            this.reportId = -1;
            this.showLeftdata(val, cname);
            this.lists.echoPage = false;
            this.datas.drillAction = false;
            this.datas.isDrill=false;
          }
       })
     },
      mPageSize(){
        pubMethod.requestTabelDatas(this.datas.tableRequestObject,this.datas.editListPages)
      },
      editNextPage(){
        if(this.datas.editTableSumData.pageBean.lastPage)return;
        this.datas.editListPages={
            currentPage:Number(this.datas.editListPages.currentPage)+1,
            pageSize:this.datas.editListPages.pageSize,
        };
        pubMethod.requestTabelDatas(this.datas.tableRequestObject,this.datas.editListPages)
      },
      editPrevPage(){
        if(this.datas.editListPages.currentPage==1)return;
        this.datas.editListPages={
            currentPage:Number(this.datas.editListPages.currentPage)-1,
            pageSize:this.datas.editListPages.pageSize,
        };
        pubMethod.requestTabelDatas(this.datas.tableRequestObject,this.datas.editListPages)
      },
      toPage(){
        let value=this.datas.editListPages.currentPage;
        let dReg=/^[0-9]*[1-9][0-9]*$/;
          if(dReg.test(value)){
              this.datas.editListPages={
                      currentPage: this.datas.editListPages.currentPage,
                      pageSize: this.datas.editListPages.pageSize
                  };
              pubMethod.requestTabelDatas(this.datas.tableRequestObject,this.datas.editListPages);
          }else{
              pubMethod.adalert("输入的值不规范！",500);
                this.datas.editListPages.currentPage =  this.datas.editListPages.oldCurrentPage;
          };
      },
//  元素拖拽
      dragItem(ary,preId){
          let _this = this;
        ary.forEach((groupOpts, i)=>{
             Sortable.create(document.getElementById(preId+ (i + 1)), {
                sort: groupOpts.put,
                group: groupOpts,
                filter: '.js-remove',
                animation: 200,
                onFilter: function (evt) {
                    if(_this.lists.echoPage){
                        if($("#dim-advanced-2>li").length <= 1 && JSON.parse(_this.lists.tableObj.reportObj).hasOwnProperty('CompareColumn')) {
                            _this.$Message.error('请先删除同比数值字段再删除维度！');
                            return false
                        };
                    }
                    _this.datas.tableCalculateData.totalColumnAll = false;
                    datas.datas.tableCalculateData.totalChartAll = false;
                    untablesMerge()
                    _this.datas.grayImgIndex = 0;
                    _this.datas.showStyle.forEach((item,index)=>{
                        if(index == 0){
                            item.active = true;
                        }else{
                            item.active = false;
                        }
                    })
                    //删除某一条件后重新生成数据

                    var id = evt.item.getAttribute('data-id');
                    var fatherID = evt.item.parentNode.id;
                    var dimension = evt.item.getAttribute('data-dimension');
                    if(_this.datas.editTableSumData.metas){
                        _this.datas.editTableSumData.metas.map((v,i) => {
                            if(v.uuid == id){
                                _this.datas.editTableSumData.result.map((item,index)=>{
                                    item.splice(i,1)
                                })
                            }
                        })
                    }
                    //清除下拉选择的条件
                    if(_this.datas.aggregationConditionNum[id]){
                        _this.datas.aggregationConditionNum[id].agg="SUM";
                        _this.datas.aggregationConditionNum[id].isDistinct=false;
                        _this.datas.aggregationConditionNum[id].isPercent=false;
                        _this.datas.aggregationConditionNum[id].sortord="DEFAULT";
                    };
                    if(_this.datas.aggregationConditionDim[id]){
                        _this.datas.aggregationConditionDim[id].sortord="DEFAULT";
                    };
                    if(dimension=='true'){
                        for(var key in _this.datas.rightListConditions.conditions){
                            var tmpItem = _this.datas.rightListConditions.conditions[key];
                            // if(id==tmpItem.uuid){
                            //     _this.datas.rightListConditions.conditions.splice(key,1);
                            // };
                        };
                        for(var k in _this.datas.tableCalculateData.totalColumns){
                            if(_this.datas.tableCalculateData.totalColumns[k].uuid==id){
                                _this.datas.tableCalculateData.totalColumns.splice(k,1);
                            };
                        };
                        k=null;
                    }else if(dimension == 'false'){
                        for(var key in _this.datas.rightListConditions.conditions){
                            var tmpItem=_this.datas.rightListConditions.conditions[key];
                        if(id==tmpItem.uuid){
                            _this.datas.rightListConditions.conditions.splice(key,1);
                        }
                    };
                        //删除对应的列总计
                        for(var k in _this.datas.tableCalculateData.totalColumns){
                            if(_this.datas.tableCalculateData.totalColumns[k].uuid==id){
                                _this.datas.tableCalculateData.totalColumns.splice(k,1);
                            };
                        };
                        k=null;
                    };
                    if(fatherID=="dim-advanced-3"){
                        delete _this.datas.conditionMap[id];
                        if(Object.keys(_this.datas.conditionMap).length == 0){
                            var liHtml = `<li class="hint-info">请拖拽左侧字段至此处进行筛选<li>`
                            $("#dim-advanced-3").append(liHtml);
                        }
                        for(var key in _this.datas.rightListConditions.conditions){
                            var tmpItem = _this.datas.rightListConditions.conditions[key];
                            if(id==tmpItem.uuid){
                                _this.datas.rightListConditions.conditions.splice(key,1);
                            };
                        };
                    };
                    let showDrillBack = _this.datas.showDrillBack;
                    if((evt.item.parentNode.childNodes.length==3 || !$(evt.item).prev().get(0)) && fatherID=="dim-advanced-4"){
                        evt.item.parentNode.innerHTML='';
                        _this.datas.drillAction=false;
                        _this.datas.isDrill=false;
                        _this.datas.editTableSumData=[];
                        _this.datas.drillNavData = [];
                        _this.datas.showDrillDown=false;
                        _this.datas.rightListConditions.conditions=[];
                        pubMethod.regenerateTabel(showDrillBack);
                    }else{
                        if(fatherID=="dim-advanced-4"){
                            // if($(evt.item).prev().get(0)){
                                evt.item.parentNode.removeChild($(evt.item).prev().get(0));
                            // }else{
                            //     evt.item.parentNode.removeChild($(evt.item).next().get(0));
                            // }
                        }
                        evt.item.parentNode.removeChild(evt.item);
                        pubMethod.regenerateTabel(showDrillBack);
                    };
                    //delDrillDownData(id);//删除钻取列数据
                    var drillNavDataLength = _this.datas.drillNavData.length;
                    var drawBackDrillIndex = pubMethod.drawBackDrill().length;
                    if((drillNavDataLength+1) >= drawBackDrillIndex){
                        _this.datas.isDrill = false;
                    }
                },
                onEnd: function (/**Event*/evt) {

                }
            });
        });
      },
    saveReport(ev){
        var _this=this;
        var groups =[];
        var columnMessures=[];
        var include=[];//在显示页需要显示的列字段名称
        var drillDowns=[];
        var zAria = [];
        if(!_this.datas.saveTarget) {
                _this.$Message.error('报表数据存在错误，不能保存！');
                return false;
            }
        this.datas.editTableSumData.result.map((v,_i)=>{
            zAria.push({name:v[0],value:v[v.length-1]})
        });
        if(!this.datas.reportInfo.reportName.text){
            this.$Message.error({content: '请输入报表名称',duration: 2,closable: true});
            return false;
        }
        if(this.getByteLen(this.datas.reportInfo.reportName.text)>100 || this.getByteLen(this.datas.reportInfo.reportNote.text)>100){
            this.$Message.error({content: '请合理输入报表名称或者报表描述',duration: 2,closable: true});
            return false;
        }
        if(this.datas.grayImgIndex == 3){
            if(this.datas.myChartOption.pie.showEntries){
                if(this.datas.myChartOption.pie.showEntries<=0){
                    this.$Message.error({content: '请正确输入数值,请输入大于0的数字',duration: 2,closable: true});
                    return false;
                }
                if(this.datas.myChartOption.pie.showEntries > zAria.length){
                    this.$Message.error({content: `输入数值过大,请输入小于${zAria.length}的数字`,duration: 2,closable: true});
                    return false;
                }
            }
        }else{
            this.datas.myChartOption.pie.showEntries = null;
        }

        $("#dim-advanced-2").find("li").each(function () {
            var data_id=$(this).attr("data-id");
            var demisions=_this.data.originalData.data.data.demision;
            for (var x in demisions) {
                if (demisions[x].uuid === data_id) {

                    var groupByCol ={
                        uuid:demisions[x].uuid,
                        col:demisions[x].column,
                        chinese:demisions[x].chinese,
                        type:demisions[x].columnType,
                        valueType:'dimsion_value',
                        sortType:demisions[x].sortType
                    };
                    if(groupByCol.type=="STRING")
                    groupByCol.listData=pubMethod.globalfindObj(data_id).addition.data;
                    groups.push(groupByCol);
                }
            }
        });

        // if(groups.length==0)
        // {
        //     alert("请选择维度");
        //     return;
        // }

        $("#dim-advanced-4").find("li").each(function () {
            var data_id=$(this).attr("data-id");
            var demisions=_this.data.originalData.data.data.demision;
            for (var x in demisions) {
                if (demisions[x].uuid === data_id) {
                    var groupByCol ={
                        uuid:demisions[x].uuid,
                        col:demisions[x].column,
                        chinese:demisions[x].chinese,
                        type:demisions[x].columnType
                    };
                    if(groupByCol.type=="STRING")
                    groupByCol.listData=pubMethod.globalfindObj(data_id).addition.data;
                    drillDowns.push(groupByCol);
                }
            }
        });

        $("#num-advanced-2>li").each(function () {
            var data_num_id = $(this).attr("data-id");
            var measures=_this.data.originalData.data.data.measures;
            var demisions=_this.data.originalData.data.data.demision;
            var data_type = pubMethod.globalfindObj(data_num_id).type;
            for (var x in measures) {
                    if (measures[x].uuid === data_num_id) {

                         var columnMessure;
                        var percent=false;//百分比默认为false；
                        if(_this.datas.aggregationConditionNum[data_num_id] && _this.datas.aggregationConditionNum[data_num_id].isPercent){//当前字段百分比设置为true
                            percent=true;
                        };

                        var isDistinct=false;//去重默认为false；
                        if(_this.datas.aggregationConditionNum[data_num_id] && _this.datas.aggregationConditionNum[data_num_id].isDistinct){//当前字段百分比设置为true
                            isDistinct=true;
                        };
                        if(!measures[x].hasOwnProperty('ishide')){
                            columnMessure = {
                                uuid:measures[x].uuid,
                                col:measures[x].column,
                                chinese:measures[x].chinese,
                                agg:measures[x].aggTypes[0],
                                aggTypes:measures[x].aggTypes,
                                valueType:'number_value',
                                sortType: measures[x].sortType,
                                isDistinct:isDistinct,
                                isPercent:percent,
                                isCompare:measures[x].isCompare
                            };
                        }else{
                            columnMessure = {
                                agg:measures[x].aggTypes[0],
                                chinese:measures[x].chinese,
                                newField:measures[x].uuid,
                                'columnType': 'NUMBER',
                                valueType:'number_value'
                            };
                        }
                        // if(data_type=="STRING")
                        // columnMessure.listData= pubMethod.globalfindObj(data_num_id).addition.data;
                        columnMessures.push(columnMessure);
                    }
            }
        });

        //根据首页显示筛选项的isChecked属性给include赋值
        // _this.datas.displayScreen.forEach(function(item,index){
        //     if(item.isChecked)include.push(item.column);
        // });
        var queryObj={
            columnMessure:columnMessures, //shuzhi
            groupbys:groups, //weidu
            groupInitbys:groups,
            drillDowns:drillDowns,
            tableName:'kylin_sales',
            conditions:_this.datas.rightListConditions.conditions,//数据筛选条件
            tableCalculateData:_this.datas.tableCalculateData,//列总计数据
            conditionMap:_this.datas.conditionMap,
            echartConfig:_this.datas.myChartOption,
            mergeTabs: _this.datas.tableCalculateData.totalChartAll
        };
        if(_this.datas.dateCompare.hasOwnProperty('compareBegin')){
            queryObj.CompareColumn = _this.datas.similarOpts;
            queryObj.compareBegin = _this.datas.dateCompare.compareBegin;
            queryObj.compareEnd = _this.datas.dateCompare.compareEnd;
            queryObj.fromBegin = _this.datas.dateCompare.fromBegin;
            queryObj.fromEnd = _this.datas.dateCompare.fromEnd;
        }
        var requestObj1={
            sqlParam:queryObj,
            project:_this.datas.requestProject,
            cid:_this.datas.requestCid,
            include:include,
            chartType: _this.datas.grayImgIndex
        };

        var reportAll = new Object();
            reportAll.projectName=requestObj1.project;
            reportAll.reportName=_this.datas.reportInfo.reportName.text;
            reportAll.title=_this.datas.reportInfo.reportName.title;
            reportAll.text=_this.datas.reportInfo.reportName.text;
            // reportAll.uid=140;
        var obj={
                reportInfo:_this.datas.reportInfo,
                requestObject:requestObj1,
                userInfo:_this.datas.userInfo,
                editListPages:_this.datas.editListPages,
                displayScreen:_this.datas.displayScreen
            };
        reportAll.reportInfo=obj;
        // 保存成功回调kylin使用
        var kylinBack = {
            sqlParam: queryObj,
            project: _this.datas.requestProject,
            cid:_this.datas.requestCid,
            uid:_this.datas.tableUid,
            pageBean:_this.datas.editListPages
        }
        _this.datas.saveKylinInfo = kylinBack;
        $.ajax({
            type: 'post',
            url: _this.$keyapi+"/auth/save/report",
            data:{
                reportInfo:JSON.stringify(reportAll),
                boardID:_this.datas.tableUid,
                reportName:this.datas.reportInfo.reportName.text,
                modelID:_this.datas.moduleTypeId,
                reportID:_this.reportId
                },
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            success: function(response) {
                _this.datas.chartFirstStep = true;
                var someData = eval(response);
                // _that.datas.loadingShow=false;
                if(someData.status=="1"){
                    // var reqData = someData.data;
                    _this.$Message.success("保存成功！");
                    _this.datas.reportInfo.reportNote.text = '';
                    _this.datas.conditionMap = {};
                    _this.datas.rightListConditions.conditions=[];
                    // tableCalculateData = [];
                    // _this.datas.tableCalculateData.totalColumns = [];
                    bus.$emit('refresh',true)
                    _this.$layer.closeAll();
                }else if(someData.status=="0"){
                    _this.$Message.error(someData.desc);
                }else if(someData.status=="2"){
                    _this.$Message.error("已有同名报表存在！",2000);
                }else if(someData.status=="3"){
                    _this.$Message.success("更新成功！");
                    _this.$layer.closeAll();
                }else if(data.status == '101'){
                    location.href = "https://data.banggood.cn";
                };
            }
        });
    },
    totalAllCount() {
        let _this = this;
        _this.datas.tableCalculateData.totalColumnAll=!_this.datas.tableCalculateData.totalColumnAll;
        // if(!_this.datas.tableCalculateData.totalColumnAll){
        //   _this.defaultLoading();
        // }
    },
    showNextLevel(item,uuid){//点击table第一个列钻取下一级数据
        let _this = this;
         _this.datas.tableCalculateData.totalColumnAll = false;
            var obj=new Object();
            obj.item=item;
            obj.uuid=uuid;
        var drillItem = pubMethod.globalfindObj(uuid);
        _this.datas.drillDwonIndex = 0;
        _this.datas.showDrillDown = true;
        if(!drillItem.dimension)
        {
            return;
        }
        for(var key in _this.datas.drillNavData)
        {
            if(_this.datas.drillNavData[key].uuid==uuid)
            {
                return;
            }
        }
        _this.datas.drillNavData.push(obj);
        let drillCondition = pubMethod.getDrillDownCondition(item,uuid);
        _this.datas.rightListConditions.conditions.push(drillCondition);
        _this.datas.currentDrillDownUuid = uuid;
        pubMethod.regenerateTabel(false);
        var drillNavDataLength = _this.datas.drillNavData.length;
        var drawBackDrillIndex = pubMethod.drawBackDrill().length;
        if((drillNavDataLength + 1) >= drawBackDrillIndex){
            this.datas.isDrill = false;
        }
    },
    backDrillDown(drillDownData,item,index){//返回上一级钻取
        let _this=this;
        let find=false;
         // 能够钻取下一级
          var drillNavDataLength = _this.datas.drillNavData.length;
            var drawBackDrillIndex = pubMethod.drawBackDrill().length;
            // if(drillNavDataLength <= drawBackDrillIndex){
                _this.datas.isDrill=true;
            // }
        _this.datas.tableCalculateData.totalColumnAll = false;
        _this.datas.drillDwonIndex=0;

        if(index>0)
        {
            _this.datas.showDrillDown=true;
            _this.datas.drawBackUuid = drillDownData[index-1].uuid;

            for(var key in drillDownData)
            {
                if(key==index)
                {
                    find=true;
                }

                if(find)
                {
                    for(var inkey in _this.datas.rightListConditions.conditions)
                    {
                        if(_this.datas.rightListConditions.conditions[inkey].uuid==drillDownData[key].uuid)
                        {
                            _this.datas.rightListConditions.conditions.splice(inkey,drillDownData.length-key);
                            break;
                        }
                    }
                    drillDownData.splice(key,drillDownData.length-key);
                }
            }
        }else{
            _this.datas.drillAction=true;
            _this.datas.isDrill=true;
            _this.datas.showDrillDown=false;
            _this.datas.drawBackUuid=null;
            _this.datas.rightListConditions.conditions=[];
            _this.datas.drillNavData=[];
            _this.datas.showDrillBack=false;
            pubMethod.regenerateTabel(_this.datas.showDrillBack);//更新table数据
            return;
        }
        _this.datas.showDrillBack=true;
        pubMethod.regenerateTabel(true);//更新table数据

    },
    //   表格计算
    selectTotalCount(ev,obj){
        let targetVal=ev.target.value;
        let _this=this;
        let uuid=null;
        let totalName=null;
        obj.options.forEach(function(item,index){
            if(item.name==targetVal){
                _this.$set(item,"selected",true);
                uuid=obj.uuid;
                totalName=item.value;
            }else{
                _this.$set(item,"selected",false);
            };
        });
        //找当前钻取的是哪一列数据
        let drillDataIndex=null;
        $("#dim-advanced-4>li").each(function(index,item){
                let liUuid=$(item).attr("data-id");
                let dataItem= pubMethod.globalfindObj(liUuid);
                let hasItem=false;
                _this.datas.drillDownData.forEach(function(item,index){
                    if(item.uuid==liUuid)hasItem=true;
                });
                if(!hasItem){_this.datas.drillDownData.push(dataItem)};
        });
        //获得表格显示的第一列的uuid
        var tableColumnFirstId=_this.datas.editTableSumData.metas[0].uuid;
        $("#dim-advanced-4>li").each(function(index,item){
            var dataId=$(item).attr("data-id");
            if(dataId==tableColumnFirstId){
                drillDataIndex=index;
            };
        });
        _this.totalRequestDataFn(drillDataIndex,obj);//更改列总计请求数据
        _this.datas.queryInfo.avgType = obj;
    },
    totalRequestDataFn(drillDownIndex,obj){
        var groups =[];
        var columnMessures=[];//数值条件集合
        let isRequest=true;
        let _this =this;
        _this.datas.drillDownData.forEach(function(item,index){
            var drilDataIndex=drillDownIndex == _this.datas.drillDownData.length-1?drillDownIndex:drillDownIndex+1;
            if(!drilDataIndex && _this.datas.drillDownData.length<2){
                isRequest=false;
            };
            var drillDwonDataItem = _this.datas.drillDownData[drilDataIndex?drilDataIndex:0];//得到当前所要排序的维度
            var data_id = drillDwonDataItem.uuid;

            var demisions = _this.data.originalData.data.data.demision;//从全局获得维度
            for (var x in demisions) {
                if (demisions[x].uuid === data_id) {
                    var groupByCol = {
                        sortType:drillDwonDataItem.sortord?drillDwonDataItem.sortType:"DEFAULT",
                        col:demisions[x].columnType,
                        chinese:demisions[x].chinese,
                        uuid:data_id
                    };
                    groups.forEach(function(item,index){
                        if(item.uuid==data_id)groups.splice(index,1);
                    });
                    groups.push(groupByCol);
                };
            };
            x=null;
        });

        var columnMessures=pubMethod.loopMessureDimenssion();//获得数值的条件
        var groups=pubMethod.loopNormalDimenssion();//获得维度的条件

        if(isRequest == !1)return false;

        let totalRequestData={
            "columnMessure": [],
            "groupbys": [],
            "tableName": "kylin_sales",
            "conditions": []
        };
        //列总计
        if(columnMessures.length > 1){//列总计全选
            columnMessures.forEach(function(item,index){
                _this.datas.tableCalculateData.totalColumns.forEach(function(o,i){
                        if(item.uuid == o.uuid){
                            o.options.forEach(function(k,p){
                                if(k.selected){
                                    item.agg= k.value;
                                    //添加列总计请求条件
                                    var itemObj={
                                        "agg": k.value,
                                        "sortType": "DEFAULT",
                                        "chinese": o.name,
                                        "uuid": o.uuid
                                    }
                                    totalRequestData.columnMessure.push(itemObj);
                                };

                            });
                        };
                });
            });
        }else {//列总计单选
            columnMessures.forEach(function(item,index){
                if(item.uuid==obj.uuid){
                    obj.options.forEach(function(k,p){
                        if(k.selected){
                            item.agg= k.value;
                            var itemObj={
                                "agg": k.value,
                                "sortType": "DEFAULT",
                                "chinese": obj.name,
                                "uuid": obj.uuid
                            }
                            totalRequestData.columnMessure.push(itemObj);
                        };
                    });
                };
            });
        };
        let queryObj={
            columnMessure:columnMessures,
            groupbys:groups,
            tableName:'kylin_sales',
            conditions:_this.datas.rightListConditions.conditions
        };
        //当没有条件时函数返回;
        if(!groups.length && !columnMessures.length){
            _this.datas.editTableSumData=[];
            return false;
        };
        var requestObject={
            sqlParam:queryObj,
            pageBean:_this.datas.editListPages,
            project:_this.datas.requestProject
        };
        _this.datas.tableRequestObject=requestObject;
        _this.datas.tableRequestObject.sqlParam = totalRequestData;
        //数据请求
        pubMethod.requestTabelDatas(_this.datas.tableRequestObject,null,_this.showModalFn);
    },
    showModalFn(timeId) {

    },
    //维度回显方法
    appendDimension(uuid,fatherID,chinese,item,index) {
        var appendid="#"+fatherID;
        var leftUlfather=$(".contain-left .condite-box");
        var li=null;
        if(index == 0){
            li='<li data-dimension="true" data-id="'+uuid+'">' +
            '<span class="select-name">'+chinese+'</span>' +
            '<span><i class="js-remove fa fa-times"></i></span>' +
            '</li>';
        }else{
             li='<i class="fa fa-chevron-right" style="margin-right:10px;"></i><li data-dimension="true" data-id="'+uuid+'">' +
            '<span class="select-name">'+chinese+'</span>' +
            ' <span><i class="js-remove fa fa-times"></i></span>' +
            '</li>';
        }
        if($.trim(fatherID)=='dim-advanced-3'){
            var html = "<ul class='filter-select'>";
            if(item.columnType =="DATETIME" || item.columnType == "DATE"){
				html += `<li class="shortcut-date ${item.val?'':'shortcut-date-active'}" data-time="">全部时间</li>`;
				html += `<li class="shortcut-date ${(moment().format('YYYY-MM-DD') == (item.val?item.val[0]:'') && moment().format('YYYY-MM-DD') == (item.val?item.val[1]:''))?'shortcut-date-active':''}" data-time="${moment().format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">今天</li>`;
				html += `<li class="shortcut-date ${(moment().subtract(1,'days').format('YYYY-MM-DD') == (item.val?item.val[0]:'') && moment().format('YYYY-MM-DD') == (item.val?item.val[1]:''))?'shortcut-date-active':''}" data-time="${moment().subtract(1,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">昨天</li>`;
				html += `<li class="shortcut-date ${(moment().subtract(7,'days').format('YYYY-MM-DD') == (item.val?item.val[0]:'') && moment().format('YYYY-MM-DD') == (item.val?item.val[1]:''))?'shortcut-date-active':''}" data-time="${moment().subtract(7,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近7天</li>`;
				html += `<li class="shortcut-date ${(moment().subtract(14,'days').format('YYYY-MM-DD') == (item.val?item.val[0]:'') && moment().format('YYYY-MM-DD') == (item.val?item.val[1]:''))?'shortcut-date-active':''}" data-time="${moment().subtract(14,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近14天</li>`;
				html += `<li class="shortcut-date ${(moment().subtract(30,'days').format('YYYY-MM-DD') == (item.val?item.val[0]:'') && moment().format('YYYY-MM-DD') == (item.val?item.val[1]:''))?'shortcut-date-active':''}" data-time="${moment().subtract(30,'days').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近30天</li>`;
				html += `<li class="shortcut-date ${(moment().subtract(6,'months').format('YYYY-MM-DD') == (item.val?item.val[0]:'') && moment().format('YYYY-MM-DD') == (item.val?item.val[1]:''))?'shortcut-date-active':''}" data-time="${moment().subtract(6,'months').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}">最近半年</li>`;
				html += `<li class="show-popup">自定义时间区间</li>`;
            }
            if(item.columnType=='STRING'){
                var arr = [];
                item.data.forEach(_item=>{
                    if(_item.isChecked){
                        arr.push(_item);
                    }
                })
                for(let i=0;i<arr.length;i++){
                    if(i>6){
                        html += `<li class="show-popup">等${arr.length}项</li>`;
                        break;
                    }else{
                        html += `<li>${arr[i].name}</li>`;
                    }
                }
            }
            if(item.columnType=='NUMBER'){
                // 未完成
                if(item.defaultSelect == 0){
                   html += `<li>${this.orderTypes[item.defaultSelect]}<i>${item.interval.start}</i>~<i>${item.interval.end}</i></li>`;
                }else{
                    html +=`<li>${this.orderTypes[item.defaultSelect]}<i>${item.val}</i></li>`;
                }

            }
            html += `</ul>`;

            li='<li data-dimension="true"  data-id="'+uuid+'">' +
                '<div>'+
                '<span class="select-name">'+chinese+'</span>' +
                '<span class="set-select"><i class="js-advanced-3 fa fa-sort-desc"></i></span>'+
                '<span><i class="js-remove fa fa-times"></i></span>' +
                '<span class="set-ico"><i class="fa fa-cog"></i></span>'+
                '</div>'+
                html+
                '</li>';
        };
        if($.trim(fatherID)=='dim-advanced-2'){
            li='<li data-dimension="true" data-id="'+uuid+'">'+
                '<span class="select-name">'+chinese+'</span>'+
                '<span class="js-select"><i class="js-arrow fa fa-sort-desc"></i></span>'+
                ' <span><i class="js-remove fa fa-times"></i></span>' +
                ' <ul class="drow-down-ul drow-down-ul-one">'+
                '	<li data-val="DEFAULT" class="next-level"><a href="javascript:;">设置排序</a>'+
                '		<ul class="drow-down-ul drow-down-ul-two">'+
                '			<li data-val="DEFAULT"><a href="javascript:;">默认</a></li>'+
                '			<li data-val="ASC"><a href="javascript:;">升序</a></li>'+
                '			<li data-val="DESC"><a href="javascript:;">降序</a></li>'+
                '		</ul>'+
                '	</li>'+
                ' </ul>';
                '</li>';
        };

        if($.trim(fatherID)=='num-advanced-2'){
            if(item.hasOwnProperty('newField')){
                li= '<li data-dimension="true" data-id="'+uuid+'">' +
                    '<span class="select-name">'+chinese+'</span>' +
                    '<span> <i class="js-remove fa fa-close"></i></span>' +
                    '</li>';
            }else{
                var obj = {
					SUM:'<li data-val="SUM"><a href="javascript:;">求和</a></li>',
					AVG:'<li data-val="AVG"><a href="javascript:;">平均值</a></li>',
					MAX:'<li data-val="MAX"><a href="javascript:;">最大值</a></li>',
					MIN:'<li data-val="MIN"><a href="javascript:;">最小值</a></li>',
                    COUNT:'<li data-val="COUNT"><a href="javascript:;">计数</a></li>',
                    COUNTDISTINCT:'<li data-val="COUNTDISTINCT"><a href="javascript:;">去重计数</a></li>'
				}
                li ='<li data-dimension="true" data-id="'+uuid+'">' +
                    '<span class="select-name">'+chinese+'</span>' +
                    '<span class="js-select"><i class="js-arrow fa fa-sort-desc"></i></span>'+
                    '<span> <i class="js-remove fa fa-close"></i></span>' +
                    ' <ul class="drow-down-ul drow-down-ul-one">';
                    if(item.aggTypes){
                        item.aggTypes.forEach(item=>{
                            li+=obj[item]
                        })
                    }
                    // li +='	<li data-val="SUM"><a href="javascript:;">求和</a></li>'+
                    // '	<li data-val="AVG"><a href="javascript:;">平均值</a></li>'+
                    // '	<li data-val="MAX"><a href="javascript:;">最大值</a></li>'+
                    // '	<li data-val="MIN"><a href="javascript:;">最小值</a></li>'+
                    // /*'	<li data-val="isDistinct"><a href="javascript:;">去重</a></li>'+*/
                    // '	<li data-val="COUNT"><a href="javascript:;">计数</a></li>';

                    li +='	<li data-val="isPercent"><a href="javascript:;">百分比</a></li>'+
                    // '	<li data-val="HighCal" class="next-level"><a href="javascript:;">高级计算</a>'+
                    // '		<ul class="drow-down-ul drow-down-ul-two">'+
                    // '			<li data-val="similarity"><a href="javascript:;">同比</a></li>'+
                    // // '			<li data-val="ASC"><a href="javascript:;">环比</a></li>'+
                    // '		</ul>'+
                    // '	</li>'+
                    '	<li data-val="DEFAULT" class="next-level"><a href="javascript:;">设置排序</a>'+
                    '		<ul class="drow-down-ul drow-down-ul-two">'+
                    '			<li data-val="DEFAULT"><a href="javascript:;">默认</a></li>'+
                    '			<li data-val="ASC"><a href="javascript:;">升序</a></li>'+
                    '			<li data-val="DESC"><a href="javascript:;">降序</a></li>'+
                    '		</ul>'+
                    '	</li>'+
                    '</ul>';
                    '</li>';
            }

        };
        $(appendid).append(li);
    },
    chartShow(index,str,type){
        event.preventDefault();
        event.stopPropagation();
         var chartNameArr = ['line','bar','pie','','radarMap'];
         var selectdom = $(".page-echart-item").find(`.chart_${index}`);
            var myChart =  echarts.init(selectdom[0]);
        if(str){
            var objKey = `show${str}`;
            this.datas.myChartOption[chartNameArr[index-1]][objKey] = !this.datas.myChartOption[chartNameArr[index-1]][objKey];
        }
        if(index == 1 && type){
            var lineShowArr = ['Line','Smooth','Area'];
            lineShowArr.forEach(item=>{
                if(item == type){
                    this.datas.myChartOption[chartNameArr[index-1]][`show${item}`] = true;
                }else{
                    this.datas.myChartOption[chartNameArr[index-1]][`show${item}`] = false;
                }
            })
        }
        if(index == 2 && type){
            var barShowArr = ['Bar','ReverseBar','StackedPlot','ReverseStackedPlot'];
            barShowArr.forEach(item=>{
                if(item == type){
                    this.datas.myChartOption[chartNameArr[index-1]][`show${item}`] = true;
                }else{
                    this.datas.myChartOption[chartNameArr[index-1]][`show${item}`] = false;
                }
            })
        }
        var series;
        var zAria = [], xAria = [];
            this.datas.editTableSumData.result.map((v,_i)=>{
                xAria.push(v[0]);
                zAria.push({name:v[0],value:v[v.length-1]})
            });
        if(index == 3){
            var pieShowArr = ['Pie','Radius'];
            if(type){
                pieShowArr.forEach(item=>{
                    if(item == type){
                        this.datas.myChartOption[chartNameArr[index-1]][`show${item}`] = true;
                    }else{
                        this.datas.myChartOption[chartNameArr[index-1]][`show${item}`] = false;
                    }
                })
            }
            if(this.datas.myChartOption.pie.showEntries){
                if(this.datas.myChartOption.pie.showEntries<=0){
                    this.$Message.error({content: '请正确输入数值,请输入大于0的数字',duration: 2,closable: true});
                    return false;
                }
                if(this.datas.myChartOption.pie.showEntries > zAria.length){
                    this.$Message.error({content: `输入数值过大,请输入小于${zAria.length}的数字`,duration: 2,closable: true});
                    return false;
                }
                zAria = zAria.slice(0,this.datas.myChartOption.pie.showEntries*1);
            }
            series = [{
                        name: this.datas.editTableSumData.metas[0].chinese,
                        type: 'pie',
                        radius: '55%',
                        data:zAria,
                        itemStyle:{ normal: {label : {show: this.datas.myChartOption.pie.showTag}}},
                        labelLine: {normal: {show: this.datas.myChartOption.pie.showTag}}
                    }]
            if(this.datas.myChartOption.pie.showRadius){
                series[0].radius = ['50%','70%'];
            }else{
                series[0].radius = '55%';
            }
        }else{
            series = pubMethod.getSeries(this.datas,this.datas.editTableSumData.result,chartNameArr[index-1])
        }
        var setOption;
        if(index >0 && index <4){
            setOption = {
                tooltip: {
                    show:this.datas.myChartOption[chartNameArr[index-1]].showTooltip,
                    trigger: 'axis',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend:{
                    show:this.datas.myChartOption[chartNameArr[index-1]].showLegend,
                    data:pubMethod.getLegend(this.datas)
                },
                xAxis:{
                    show:this.datas.myChartOption[chartNameArr[index-1]].showX,
                    data: xAria
                },
                yAxis:{
                    show:this.datas.myChartOption[chartNameArr[index-1]].showY,
                    name:(this.datas.myChartOption[chartNameArr[index-1]].name),
                    nameRotate:90,
                    nameLocation:'middle',
                    nameGap:80
                },
                series:series
            };
        }
        if(index == 5){
            setOption = {
                tooltip:{
                    show:this.datas.myChartOption[chartNameArr[index-1]].showTooltip
                },
                legend:{
                    show:this.datas.myChartOption[chartNameArr[index-1]].showLegend
                }
            }
        }
        // if(index == 1 && type){

        // }
        if(index ==3){
            if(setOption.tooltip.hasOwnProperty('trigger')){
                delete setOption.tooltip.trigger
                delete setOption.tooltip.axisPointer
            }
        }
        if(index == 2){
            delete setOption.tooltip.axisPointer.label;
            setOption.tooltip.axisPointer['type'] = "shadow";
            if(type){
                if(this.datas.myChartOption.bar.showReverseBar || this.datas.myChartOption.bar.showReverseStackedPlot){
                    var options = setOption.xAxis.data;
                    delete setOption.xAxis.data;
                    setOption.yAxis['data'] = options;
                }
            }
        }
        if(type){
            myChart.setOption(setOption,true);
        }else{
            myChart.setOption(setOption);
        }
    },
    checkChart(index,str){
        var chartNameArr = ['line','bar','pie','','radarMap'];
        var objKey = `show${str}`;
        return  this.datas.myChartOption[chartNameArr[index-1]][objKey];
    },
    chartSearch(){
        var _this = this;
        if(_this.datas.grayImgIndex == 0){
             _this.$layer.iframe({
                content: {
                    content: chartSearch, //传递的组件对象
                    parent: _this, //当前的vue对象
                    data: _this.coverQuery//props
                },
                area:['60%','750px'],
                title: '添加图表查询控件'
            });
        }


    }
  }

}
//合并单元格
function tablesMerge(){
	var listTable=$("#list-table");
    var tabelCols=$("#list-table tr:first-child td");
    var colsAry=[];
    tabelCols.each(function(index,item){
        colsAry.push(index);
    });
    listTable.tablesMergeCell({
        cols: colsAry
    });
};
//取消合并单元格
function untablesMerge(){
	// /ar tabelEl=$("#list-table");
    $("#list-table tbody td").removeAttr("rowspan style");
};
</script>
<style lang="less" scoped>
@import "../../../style/graph-chart.css";
// 筛选框编辑
.board-ellipsis {
  opacity: 0;
  width: 30px;
  text-align: center;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
}
.board-ellipsis:hover {
  opacity: 1;
  top: 2px;
}
// 拖拽异常
.contain-left .js-code {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  width: 210px;
  height: 30px;
  background: white;
  opacity: 0;
  z-index: 99;
}
.contain-contain .js-code {
  display: none;
}
.js-filter {
  position: relative;
}
h4 {
  margin: 10px 0;
}
.new-table-container {
  overflow: auto;
  //   height: 900px;
  min-height: 800px;
  .contain-left {
    background: #30363d;
    min-width: 200px;
    min-height: 900px;
    width: 270px;
    height: auto;
    color: #c0c2c4;
  }
  .middle-top {
    position: relative;
    z-index: 2;
  }
  .view-chart {
    margin-top: 20px;
  }
  h4 {
    font-size: 15px;
  }
  .select-option {
    position: relative;
  }
  .select-label {
    position: absolute;
    color: black;
    top: 6px;
    left: 16px;
    background: white;
    height: 20px;
    width: 150px;
  }
  .table-wrap {
    min-height: auto;
    max-height: 670px;
    //   overflow: hidden;
    position: relative;
    .table-top {
      position: absolute;
      top: 0;
      left: 0;
    }
    .table-middle {
      //   margin-top :34px;
    }
    .table-bottom {
      //   position: absolute;
      bottom: 0;
      left: 0;
    }
    td {
      vertical-align: middle;
    }
  }
  .layer-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background: #373d41;
    .banner-icon {
      float: left;
      width: 70px;
      height: 50px;
      text-align: center;
      margin-top: 5px;
      border-right: 1px solid #2c3133;
    }
    .btn-close {
      float: right;
      border: 1px solid #fff;
      width: 20px;
      height: 20px;
      margin-top: 12px;
      margin-right: 35px;
      text-align: center;
      line-height: 17px;
    }
    .banner-title {
      float: left;
      color: white;
      line-height: 45px;
      width: 200px;
      text-align: center;
      border-right: 1px solid #2c3133;
    }
  }
  .close-circle {
    position: absolute;
    top: 10px;
    right: 20px;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    color: #ccc;
    font-size: 16px;
    line-height: 22px;
    z-index: 2;
    text-align: center;
  }
  .group-input {
    position: relative;
    display: inline-block;
    //   width: 160px;
    width: 90%;
    .group-search {
      position: absolute;
      right: 20px;
      top: 9px;
      color: #ccc;
      font-size: 16px;
    }
  }
  .add-folder {
    display: inline-block;
    color: #ccc;
    margin-left: 5px;
    font-size: 16px;
    width: 5%;
  }
}
.table-bordered {
  border: none;
  margin-bottom: 0;
  display: block;
  width: 98%;
  .col-table-width {
    min-width: 150px;
    width: 300px;
    max-width: 300px;
  }
}
.gray-img {
  border: 1px solid #3b3b3b;
  padding: 5px 10px;
  margin-right: 5px;
  &:hover {
    border-color: #5dc9f4 !important;
  }
}
.gray-img > img {
  width: 24px;
  height: 24px;
}
.pages-bar {
  width: 96%;
  height: 40px;
  margin-top: 7px;
  padding: 8px 2%;
  .pagination {
    float: left;
    margin: 0;
    li {
      display: block;
      float: left;
      a {
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
      .page-control {
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
      .page-control1 {
        width: 30px;
      }
      .page-disable {
        background: #f1f1f1 !important;
        color: #d0d0d0 !important;
        cursor: no-drop;
      }
    }
  }
}
.clear-blod {
  font-weight: normal !important;
  font-size: 12px;
}
.report-item {
  display: flex;
  margin-bottom: 10px;
  input {
    border: 0;
    border-bottom: 1px solid #ffb266;
    margin-left: 8px;
  }
  span {
    font-size: 12px;
  }
}
.chart-item {
  display: inline-block;
  width: 51px;
  height: 27px;
  text-align: center;
  line-height: 25px;
  margin-left: 10px;
  background: url("../../../assets/images/charts.png");
  background-size: 116px 234px;
  transform: scale(0.9);
}
.chart-item.active {
  color: #337ab7;
  background: #337ab7;
}
.line {
  background-position: 0 78px;
}
.active-line {
  background-position: 65px 78px;
}
.smooth {
  background-position: 0 26px;
}
.active-smooth {
  background-position: 65px 26px;
}
.area {
  background-position: 0 52px;
}
.active-area {
  background-position: 65px 52px;
}
.bar {
  background-position: 0 0;
}
.active-bar {
  background-position: 65px 0;
}
.reverseBar {
  background-position: 0 -78px;
}
.active-reverseBar {
  background-position: 65px -78px;
}
.stackedPlot {
  background-position: 0 -52px;
}
.active-stackedPlot {
  background-position: 65px -52px;
}
.reverseStackedPlot {
  background-position: 0 -26px;
}
.active-reverseStackedPlot {
  background-position: 65px -26px;
}
.pie {
  background-position: 0 -104px;
}
.active-pie {
  background-position: 65px -104px;
}
.radius {
  background-position: 0 -130px;
}
.active-radius {
  background-position: 65px -130px;
}
.limit-active {
  color: red;
}
.data-item {
  margin-left: 20px;
  height: 38px;
  line-height: 36px;
}
.chart-search-content:hover {
  .hide {
    display: block !important;
  }
}
.report-head-hide {
  color: #737373 !important;
}
.calculate-table-item {
  margin: 0 0 10px 30px;
  cursor: pointer;
}
.api-string {
  width: 280px;
  height: 150px;
  min-height: 150px;
  text-align: center;
}
</style>
