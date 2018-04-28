<template>
<div @click="hideSearchFieldList">
	<div class="modal-body">				
			<div class="clearfix">
				<div class="col-xs-6">
				<h5 class="field-head field-head-left">表达式：</h5>
				<div class="num-expression-panal" v-if="numExpressionPanal">
					<div class="expression-wrap">
						<div class="search-input">
							<div class="expression-checked" >
                <p class="back-arrow" @click="delEvent($event)"><i class="fa fa-mail-reply"></i></p>
                <Modal v-model="modal1" title="删除表达式"   @on-ok="ok"  okText='删除新字段' cancelText='清空表达式' @on-cancel="cancel">
                    <p>确定要删除该表达式吗？</p>
                </Modal>
                <p class="expression-text"></p>
								<template v-for="(item,index) in expressionData">
									<span v-html="item.name"></span>
								</template>
							</div>
							<div class="expression-item-wrap" v-for="(item,index) in expressionItemData">
                                <expression-item @record-index="recordIndexFn" :cur-index="index" :cur-data="item" ref="child"></expression-item>
                                <!--<expression-item-input></expression-item-input>-->
                            </div>
                            <div class="expression-box">
							<el-row :gutter="10">
							  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="padding:0!important;border-right:1px solid #ddd;">
							  	<h5 class="header express-header" :class="{'current-click':whichOne==2}">聚合函数</h5>
							  	<div class="grid-content bg-purple">
							  		<ul class="list-group">
							  			<li @click.prevent="addFields('SUM',0)"><a href="javascript:;">SUM</a></li>
							  			<li @click.prevent="addFields('AVG',0)"><a href="javascript:;">AVG</a></li>
                      <li @click.prevent="addFields('MAX',0)"><a href="javascript:;">MAX</a></li>
                      <li @click.prevent="addFields('MIN',0)"><a href="javascript:;">MIN</a></li>
							  			<!--<li @click.prevent="addFields('DISTINCT',0)"><a href="javascript:;">COUNT(DISTINCT)</a></li>-->
							  			<li @click.prevent="addFields('COUNT',0)"><a href="javascript:;">COUNT</a></li>
                      <li @click.prevent="addFields('COUNT(distinct)',0)"><a href="javascript:;">COUNT（distinct）</a></li> 
							  		</ul>
							  	</div>
							  </el-col>
							  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="padding:0!important;border-right:1px solid #ddd;">
							  	<div class="grid-content bg-purple-light">
							  		<h5 class="header express-header" :class="{'current-click':whichOne==0}">字段选择</h5>
							  		<ul class="list-group" >
							  			<li v-for="(item,index) in fnExprssionData" @click.prevent="addFields(item,1)" :class="{'isclick-active':!item.isClick}">
                        <a href="javascript:;" v-text="item.chinese"></a>
                      </li>
							  		</ul>
							  	</div>
							  </el-col>
							  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="padding:0!important;">
							  	<h5 class="header express-header" :class="{'current-click':whichOne==1}">计算方式</h5>
							  	<div class="grid-content bg-purple">
							  		<ul class="list-group">
							  			<li @click.prevent="addFields('+',2)"><a href="javascript:;">+ 加</a></li>
							  			<li @click.prevent="addFields('-',2)"><a href="javascript:;">- 减</a></li>
							  			<li @click.prevent="addFields('*',2)"><a href="javascript:;">* 乘</a></li>
							  			<li @click.prevent="addFields('/',2)"><a href="javascript:;">/ 除</a></li>
                      <li @click.prevent="addFields('*100',3)"><a href="javascript:;">(*100) 乘100</a></li>
                      <li @click.prevent="addFields('/100',3)"><a href="javascript:;">(/100) 除100</a></li>
							  		</ul>
							  	</div>
							  </el-col>
							</el-row>
							</div>
						</div>
					</div>
					<div class="field-names form-group" @click.stop="">
						<label for="" class="control-label">字段名称： </label>
						<input type="text" style="width:calc(100% - 75px);border-color:#ccc;" placeholder="字段名称只能由中英文、数字和下划线组成，长度不超过50个字符" v-model="newFieldName">
					</div>
					</div>
					<div class="text-expression-panal" v-if="textExpressionPanal">
					<div class="selcted-text">
						<h5>已选择的文本：</h5>
						{{ textExpressionSelect.chinese.join(",") }}
					</div>
						<ul class="text-expression-list">
							<template v-for="(item,index) in textExprssionData" v-if="item.columnType == 'STRING'">	
								<li  @click="selectText(item.uuid,item.chinese)" >
									<a href="javascript:;" v-text="item.chinese"></a>									
								</li><br>
							</template>
						</ul>
					</div>
					<div class="field-type">
						<label for="" class="control-label">字段类型： </label>
						<label class="radio-inline">
							<input type="radio" name="fieldType" id="fieldType1" value="fieldType1" checked @change="numField($event)"> 数值
						</label>
						<label class="radio-inline" style="color:#999;">
							<input type="radio" name="fieldType" id="fieldType2" value="fieldType2" disabled @change="textField($event)"> 文本
						</label>
						<label class="radio-inline" style="color:#999;">
							<input type="radio" name="fieldType" id="fieldType3" value="fieldType3" disabled  @change="dateField($event)"> 时间日期
						</label>
					</div>
				</div>
				<div class="col-xs-6">
					<h5 class="field-head field-head-right">函数示例：</h5>
					<div class="expression-wrap fn-sample">
						<ul class="list-inline">
							<template v-for="(item,key) in sampleData">
			                   <li v-for="(i,k) in item.countAry">
			                        <dl>
			                        	<dt>
			                            	<span class="expression-name-title">{{ i.name }}</span>
			                            </dt>
			                            <dd style="width:calc(100% - 195px)">
			                            	<span class="expression-name">{{ i.shorhand }}</span>
			                            	<span class="field-name">{{ i.chinese || item.chinese }}</span>
			                            </dd>
			                        </dl>
			                    </li>
				            </template>
							<!-- <li>
								<dl>
									<dt style="color:#ff9c4c;">
										<span class="expression-name-title">四则运算</span>
									</dt>
									<dd style="color:#999;">
										<span class="expression-name"></span>
										([<span class="field-name"></span>])
									</dd>
								</dl>
			                </li> -->
						</ul>
					</div>
				</div>
			</div>
	   </div>
	   <div class="modal-footer">
			<button type="button" class="btn btn-default" @click="cancelClick">取消</button>
			<button type="button" class="btn btn-primary" :disabled="isDisabled" @click="countModalSure">确定</button>
	   </div>
</div>
</template>
<script>
import datas from "./../../../config/datas";
import expressDrilldown from "./filter/drilldown";
import expressionItem from "./filter/expression";
import { pubMethod } from "./../../../config/public";
import  bus  from './../../../config/bus';

export default {
  created(){
    // auth/delete/newcolumn  参数modelID,uuid/
    if(this.$parent.filterAuto.uuid){
      let _this = this;
        $.ajax({
            type:'post',
            url: _this.$keyapi+"/auth/get/newcolumn",
            dataType:'json',
            data:{
              modelID:_this.datas.moduleTypeId,
              uuid:_this.$parent.filterAuto.uuid
            },
            xhrFields: {
            withCredentials: true
            },
            success: data =>{
                if(data.status == 1){
                    _this.newFieldName = data.data.chinese;
                    // console.log(data.data);
                    $('.expression-text').html(data.data.val);
                }
                else if(data.status == 101){
                  location.href = "https://data.banggood.cn";
                }
                else{
                    _this.$Message.error(data.desc);
                }
            }
        })
    }
    else{
      $('.expression-text').empty();
    }
  },
  mounted: function() {
    let _this = this;
    this.textExprssionData = this.datas.dimensionListAry;
    this.fnExprssionData = this.datas.numericalListAry;
    this.fnExprssionData.forEach(item=>{
      if(item.ishide){
        item.isClick = false;
      }else{
        item.isClick = true;
      }
    })
  },
  components: {
    expressDrilldown,
    expressionItem
  },
  computed: {
    clickCountComputed() {
      return this.expressionClickCount % 3;
    }
  },
  data() {
    return {
      modal1:false,
      backArrow: -1,
      isDisabled: false, 
      cancelBtn: $(".notify")
        .eq(2)
        .attr("id"),
      datas: datas.datas,
      expressionClickCount: 0, //表达式的点击次数 平均值
      fnExprssionData: null, //字段选择数据
      textExprssionData: null,
      numExpressionPanal: true, //数值面板
      textExpressionPanal: false, //文本面板
      dateExpressionPanal: false, //日期面板
      searchFieldListShow: false,
      searchFieldKeyWord: null,
      expressionData: [], //表达式
      textExpressionSelect: {
        chinese: [],
        newField: []
      },
      sampleData: [
        {
          uuid: 10001,
          chinese: "([订单金额])",
          countAry: [
            { shorhand: "SUM", name: "求和聚合",chinese:null},
            { shorhand: "AVG", name: "平均值聚合",chinese:null },
			{ shorhand: "MAX", name: "最大值聚合" ,chinese:null},
			{ shorhand: "MIN", name: "最小值聚合",chinese:null },
            { shorhand: "COUNT", name: "计算聚合" ,chinese:'([客户名称])'},
            { shorhand: "COUNT", name: "计数（去重）聚合",chinese:'(DISTINCT[客户名称])' },
			{ shorhand: "", name: "四则运算" ,chinese:'([订单金额]-[利润金额])/100'},
            { shorhand: "SUM", name: "复合聚合度量（客单价）",chinese:'([订单金额])/COUNT(DISTINCT[客户名称])' }
          ]
        }
      ],
      realDatas: [
        {
          uuid: 10001,
          chinese: "订单金额",
          countAry: [
            { shorhand: "SUM", name: "求和" },
            { shorhand: "AVG", name: "平均值" },
            { shorhand: "COUNT", name: "计算" },
            { shorhand: "DISTINCT", name: "计数（去重）" }
          ]
        }
      ],
      fieldDatas: {},
      newFieldName: null,
      currentIndex: null,
      expressionItemData: [
        /*{
                    uuid1:null,
                    divisor:null,
                    divisorName:null,
                    divisorShow:false,
                    
                    expression:null,
                    expressionShow:false,
                    expressionSure:true,
                    
                    uuid2:null,
                    dividend:null,
                    dividendName:null,
                    dividendShow:false
                 }*/
      ],
      argumentFirst: null, //记录是否为去重计算
      whichOne: 2,
      whichTag: false,
      argumentPer: '', //存储选择*100时的变量
      argumentPerSign: false, //判断是否点击100
      expSign: true, //判定先点不是100的符号的时候
      whichArr:[]
    };
  },
  methods: {
    // 删除所选字段
    delEvent(e){
      this.expressionData = [];
      $('.expression-text').empty();
      this.backArrow = 0;
      this.whichOne = 2;
      if(this.$parent.filterAuto.uuid){
        this.modal1 = true;
      }
    },
    ok(){
        let _this = this;
        $.ajax({
            type:'post',
            url: _this.$keyapi+"/auth/delete/newcolumn",
            dataType:'json',
            data:{
              modelID:_this.datas.moduleTypeId,
              uuid:_this.$parent.filterAuto.uuid
            },
            xhrFields: {
            withCredentials: true
            },
            success: data =>{
                if(data.status == 1){
                   _this.datas.numericalListAry.map((v,i)=>{
                      if(v.uuid == _this.$parent.filterAuto.uuid){
                         _this.datas.numericalListAry.splice(i,1);
                         _this.cancelClick();
                      }
                   });
                }
                else if(data.status == 101){
                  location.href = "https://data.banggood.cn";
                }
                else{
                    _this.$Message.error(data.desc);
                }
            }
        })
    },
    cancel(){

    },
    addFields(str) {

      let _this = this;
      let clickCol = this.backArrow == 0? 0 :arguments[1];
      $('.expression-text').empty();
      _this.whichArr = [];
      // if(_this.whichTag){
      //   _this.whichOne = 1;
      // }
      // debugger;
      // if(clickCol == 2){
      //   // if(str.indexOf('100')>0){
      //   //   _this.whichTag = true;
      //   // }
      //   // else{
      //      _this.whichTag = false;
      //   // }
      //   // if(_this.argumentPerSign){
      //   //   _this.expressionData.splice(_this.expressionData.length-1,1);
      //   // }
      // }
      _this.whichArr.push({num:_this.whichOne});
      switch (clickCol) {
        case 0:
          if (_this.whichOne == 0) {
            _this.$Message.error({
              content: "请选择字段",
              duration: 10,
              closable: true
            });
            return false;
          }
           else if (_this.whichOne == 1) {
            _this.$Message.error({
              content: "请选择计算方式",
              duration: 10,
              closable: true
            });
            return false;
          }
           /*else if(_this.whichOne==2){
    						pubMethod.adalert("请选择聚合函数");
    						return false;
    					}*/
          _this.argumentFirst = arguments[0];
          _this.backArrow = -1;
          if(_this.argumentFirst == 'COUNT(distinct)'){
            _this.argumentFirst = 'COUNTDISTINCT';
          }
          if (_this.argumentFirst == "DISTINCT") {
            _this.expressionData.push({
              name: '<span class="mol-item">COUNT</span>',
              chinese: "DISTINCT",
              type:0
            });
          } else {
            _this.expressionData.push({
              name: '<span class="mol-item">' + arguments[0] + "</span>",
              chinese: arguments[0],
              type:0
            });
          }
          _this.whichOne = clickCol;
          this.fnExprssionData.forEach(item=>{
            if(item.ishide){
              item.isClick = false;
            }else{
              if($.inArray( _this.argumentFirst, item.aggTypes)<0){
                item.isClick = false;
              }else{
                item.isClick = true;
              }
            }
          })
          break;
        case 1:
          if(!str.isClick) return false;
          if (_this.whichOne == 1) {
            // pubMethod.adalert("请选择计算方式");
			_this.$Message.error({
              content: "请选择计算方式",
              duration: 10,
              closable: true
            });
            return false;
          } else if (_this.whichOne == 2) {
            // pubMethod.adalert("请选择聚合函数");
			_this.$Message.error({
              content: "请选择聚合函数",
              duration: 10,
              closable: true
            });
            return false;
          } /*else if(_this.whichOne==0){
    						pubMethod.adalert("请选择字段");
    						return false;
    					}*/
          if (_this.argumentFirst == "DISTINCT") {
            _this.expressionData.push({
              name:
                '<span class="mol-text">(DISTINCT[' +
                arguments[0].chinese +
                "])</span>",
              chinese: arguments[0].chinese,
              uuid: arguments[0].uuid,
              col:arguments[0].col,
              type:1
            });
          } else {
            _this.expressionData.push({
              name:
                '<span class="mol-text">([' +
                arguments[0].chinese +
                "])</span>",
              uuid: arguments[0].uuid,
              chinese: arguments[0].chinese,
              col:arguments[0].col,
              type:1
            });
          }
          _this.whichOne = clickCol;
          break;
        case 2:
          if (_this.whichOne == 2) {
			_this.$Message.error({
              content: "请选择聚合函数",
              duration: 10,
              closable: true
            });
            return false;
          } else if (_this.whichOne == 0) {
            // pubMethod.adalert("请选择字段");
			_this.$Message.error({
              content: "请选择字段",
              duration: 10,
              closable: true
            });
            return false;
          } /*else if(_this.whichOne==1){
    						pubMethod.adalert("请选择计算方式");
    						return false;
    					}else if(_this.whichOne==0){
    						pubMethod.adalert("请选择字段");
    						return false;
              }*/
         
            _this.argumentPer = arguments[0]; 
            _this.expressionData.push({
              name: '<span class="mol-symbol">'+ arguments[0] + "</span>",
              chinese: arguments[0],
              type:2
            }); 
          //    if(arguments[0].indexOf('100')>0){
          //       _this.argumentPerSign = false;
          //    }
          //    else{
          //       // _this.argumentPerSign = true;
          //    }
          // // }
          // // else{
          // //   _this.expressionData.push({
          // //     name: '<span class="mol-symbol">' + _this.argumentPer+' ' + arguments[0] + "</span>",
          // //     chinese: _this.argumentPer + arguments[0]
          // //   }); 
          // //   _this.argumentPer = '';    
          // //   _this.argumentPerSign = false;       
          // // }    
          _this.whichOne = clickCol;
          break;
        case 3:
            if (_this.whichOne == 2) {
            _this.$Message.error({
                    content: "请选择聚合函数",
                    duration: 10,
                    closable: true
            });
            return false;
          } else if (_this.whichOne == 0) {
            _this.$Message.error({
                    content: "请选择字段",
                    duration: 10,
                    closable: true
                  });
                  return false;
          }
            _this.argumentPer = arguments[0]; 
            _this.expressionData.push({
              name: '<span class="mol-symbol">'+ arguments[0] + "</span>",
              chinese: arguments[0],
              type:3
            }); 
        break;
      }
    },
    selectText(uuid, chinese) {
      let _this = this;
      let hasItem = false;
      _this.textExpressionSelect.newField.forEach(function(id, index) {
        if (id == uuid) {
          hasItem = true;
        }
      });
      if (!hasItem) {
        //_this.datas.leftmodelde
        if (_this.textExpressionSelect.chinese.length == 2) {
          // pubMethod.adalert("至多可选择两项！");
          _this.$Message.error({
            content: "至多可选择两项！",
            duration: 10,
            closable: true
          });
          return;
        }
        _this.textExpressionSelect.chinese.push(chinese);
        _this.textExpressionSelect.newField.push(uuid);
      } else {
        // pubMethod.adalert("已选择！");
        _this.$Message.error({
          content: "已选择！",
          duration: 10,
          closable: true
        });
      }
    },
    numField(ev) {
      var checked = ev.target.checked;
      if (checked) {
        this.numExpressionPanal = true;
        this.textExpressionPanal = false;
        this.dateExpressionPanal = false;
      }
    },
    textField(ev) {
      var checked = ev.target.checked;
      if (checked) {
        this.numExpressionPanal = false;
        this.textExpressionPanal = true;
        this.dateExpressionPanal = false;
      }
    },
    dateField(ev) {
      return false;
      var checked = ev.target.checked;
      if (checked) {
        this.numExpressionPanal = false;
        this.textExpressionPanal = false;
        this.dateExpressionPanal = true;
      }
    },
    expressInputSure() {
      let _this = this;
      //(\-|\+|\*|\/)
      let exKeyReg = /.*\s\(\[.*\]\)\s([^\u4e00-\u9fa5])\s.*\s\(\[.*\]\)$/;

      if (!exKeyReg.test(_this.searchFieldKeyWord)) {
        // pubMethod.adalert("请输入正确的表达式！");
        _this.$Message.error({
          content: "请输入正确的表达式！",
          duration: 10,
          closable: true
        });
      } else {
        let isFindItem = false;
        _this.expressionInputData.forEach(function(item, index) {
          //判断表达式是否存在
          if (item == _this.searchFieldKeyWord) {
            // pubMethod.adalert("此表达式已存在，请重新输入！");
            _this.$Message.error({
              content: "此表达式已存在，请重新输入！",
              duration: 10,
              closable: true
            });
            //_this.searchFieldKeyWord=null;
            isFindItem = true;
          }
        });
        if (isFindItem) return;
        _this.expressionInputData.push(_this.searchFieldKeyWord);

        var keyWordAry = _this.searchFieldKeyWord.split(" ");

        var dataItem = {
          uuid1: 1000,
          divisor: null,
          divisorName: null,
          divisorShow: false,

          expression: null,
          expressionShow: false,
          expressionSure: true,

          uuid2: 2000,
          dividend: null,
          dividendName: null,
          dividendShow: false
        };

        dataItem.divisor = keyWordAry[0];
        dataItem.divisorName = keyWordAry[1].substr(
          2,
          keyWordAry[1].length - 4
        );
        dataItem.expression = keyWordAry[2];
        dataItem.dividend = keyWordAry[3];
        dataItem.dividendName = keyWordAry[4].substr(
          2,
          keyWordAry[4].length - 4
        );

        _this.expressionItemData.push(dataItem);
      }
      _this.searchFieldKeyWord = null;
    },
    countModalSure() {
      let _this = this;
      if (_this.textExpressionPanal) {
        //文本类型
        let addGroupby = {
          chinese: _this.textExpressionSelect.chinese.join(","),
          columnType: "STRING",
          maxMin: false,
          newField:"concat(" + _this.textExpressionSelect.newField.join(",") + ")",
          sortType: "DEFAULT"
        };

        _this.datas.tableRequestObject.sqlParam.groupbys.push(addGroupby);
		//数据请求
        // pubMethod.requestTabelDatas(_this.datas.tableRequestObject);
        // 关闭弹窗
        // _this.$layer.close(_this.cancelBtn);
      } else {
        //数值类型
      
        if(!_this.$parent.filterAuto.uuid){
          if(_this.expressionData.length == 0){
            _this.$Message.error({
              content: "表达式不能为空！",
              duration: 10,
              closable: true
            });
            return false;
          }
          let lastChinese =_this.expressionData[_this.expressionData.length - 1].name;
          var regTest = /\)|100/.test(lastChinese);
          // // if(lastChinese.indexOf('100')>0){
          // //   regTest  = true;
          // // }
          if (!regTest) {
            // pubMethod.adalert("表达式不完整！");
            _this.$Message.error({
              content: "表达式不完整！",
              duration: 10,
              closable: true
            });
            return false;
          }
          
          if (!_this.newFieldName) {
            // pubMethod.adalert("请输入字段名称");
            _this.$Message.error({
              content: "请输入字段名称",
              duration: 10,
              closable: true
            });
            return;
          }
        }
        
        let newFieldObj = {
          'col': 'RPT.RPT_PRODUCTUNSALABLE_DD.STOREAMOUNT',
          'show': false,
          'uuid': '9fff9957-8a5f-4450-a4fc-d0766050ca45',
          'isChecked': true,
          'relation': [
            'EQUAL',
            'IN'
          ],
          'ishide':true,
          'isShow': true,
          'chinese': 'test',
          'sortType': 'DEFAULT',
          'aggTypes': [
            'SUM'
          ],
          'checked': false,
          'canSeeWords': [
          ],
          'dimension': false,
          'addition': {
            'data': [
              ''
            ],
            'lazy': false
          }
        };
        /*_this.expressionItemData.forEach(function(item,index){
                	//注意 去重  时需特殊处理
                    newFieldObj.chinese=_this.newFieldName;
                    if(item.dividend.shorhand=="DISTINCT"){//当第一个数值为去重时
                    	newFieldObj.newField="COUNT(DISTINCT "+item.uuid1+")"+item.expression+item.divisor.shorhand+"("+item.uuid2+")";
                    }else if(item.divisor.shorhand=="DISTINCT"){//当第二个数值为去重时
                    	newFieldObj.newField=item.dividend.shorhand+"("+item.uuid1+")"+item.expression+"COUNT(DISTINCT "+item.uuid2+")";
                    }else{
                    	newFieldObj.newField=item.dividend.shorhand+"("+item.uuid1+")"+item.expression+item.divisor.shorhand+"("+item.uuid2+")";
                    };
                    _this.datas.tableRequestObject.sqlParam.columnMessure.push(newFieldObj);//给查询请求数据添加查询条件
                });*/
        // 逻辑处理
        newFieldObj.chinese = _this.newFieldName;
        let fieldStr = "",colStr = '';
        _this.expressionData.map(v=>{
             if(v.type == 1){
                fieldStr += '('+v.uuid+')';
             }
             else{
               fieldStr += v.chinese;
             }
        })
        // console.log(fieldStr);
        // let newLen = _this.expressionData.length;
        // let fieldStr = "",colStr = '';
        // for (let i = 0; i < newLen; i++) {
        //   let rem = Math.ceil(i % 4);
        //   switch (rem) {
        //     case 0:
        //       fieldStr += _this.expressionData[i].chinese;
        //       colStr += _this.expressionData[i].chinese;
        //       break;
        //     case 1:
        //       fieldStr += "(" + _this.expressionData[i].uuid + ")";
        //       colStr += `(${_this.expressionData[i].col})`;
        //       break;
        //     case 2:
        //       fieldStr += _this.expressionData[i].chinese;
        //       colStr += _this.expressionData[i].chinese;
        //       break;
        //   }
        // }
        if(_this.$parent.filterAuto.uuid){
          newFieldObj.uuid = _this.$parent.filterAuto.uuid;
        }
        else{
          //修改此处逻辑
          newFieldObj.uuid = fieldStr;
        }
        newFieldObj.col = colStr;
        //_this.datas.tableRequestObject.sqlParam.columnMessure.push(newFieldObj); //给查询请求数据添加查询条件
        let isComeOn = true;
        let models = '';
        if(!_this.$parent.filterAuto.uuid){
          _this.datas.numericalListAry.forEach(item=>{
            if(item.uuid == newFieldObj.uuid){
              isComeOn = false;
              _this.$Message.info({
                content:`计算数值与 ${item.chinese} 相同`,
                duration: 5
              })
              return false;
            }
          })
          if(!isComeOn){
            return false;
          }
          if(newFieldObj.uuid.indexOf('(distinct)')>0){
            let arrsum = '';
            newFieldObj.uuid.split(')(').map(v=>{
              arrsum+=v+' ';
            })
            newFieldObj.uuid = arrsum;
          }
          // return false;
          _this.datas.numericalListAry.push(newFieldObj);
          models = JSON.stringify({
            demision:_this.datas.dimensionListAry,
            measures:_this.datas.numericalListAry
          })
        }
        else{
          _this.datas.numericalListAry.map(v=>{
              if(v.uuid == _this.$parent.filterAuto.uuid){
                v.chinese = _this.newFieldName;
                models = JSON.stringify({
                  demision:[], 
                  measures:v
                });
              }
          })
        }
        //数据请求
        // pubMethod.requestTabelDatas(
        //   _this.datas.tableRequestObject,
        //   _this.datas.editListPages,
        //   null,
        //   "addField"
        // ); //addField 标识为添加字段

        var data = {
          cid:_this.datas.moduleTypeId,
          model:models,
          uuid:_this.$parent.filterAuto.uuid
        }
        _this.isDisabled = true;
        $.ajax({
            type : "post",
            url : _this.$keyapi+"/auth/update/column",
            dataType: 'json',
            data: data,
            xhrFields: {
              withCredentials: true
            },
            success:function(data){
              if(data.status == 1){
                _this.$Message.success({
                  content:'数据更新成功',
                  duration: 3,
                  closable: true
                })
                _this.$layer.close(_this.cancelBtn);
                // bus.$emit('addAdvanced',true);
                _this.isDisabled = false;
              }
              else{

              }
            }
        })
      // 关闭弹窗
        //清空自定义表达式对象
        _this.expressionItemData = [];
        // _this.newFieldName = null;
        //_this.$refs.drilldowncomponent.restoreInital();
      }
    },
    countCallBack() {
      //添加字段确定回调
    },
    //取消
    cancelClick() {
      let _this = this;
      _this.$layer.close(_this.cancelBtn);
    },
    addExpressionData(data) {
      this.expressionItemData.push(data);
    },
    recordIndexFn(index) {
      this.currentIndex = index;
    },
    hideSearchFieldList(index) {
      let _this = this;
      _this.searchFieldListShow = false;
      if (_this.currentIndex || _this.currentIndex == 0) {
        _this.$refs.child[_this.currentIndex].$emit(
          "childMethod",
          _this.currentIndex
        );
        _this.currentIndex = null; //重置当前自定义表达式的索引
      }

      _this.expressionItemData.forEach(function(item, index) {
        if (item.expressionSure) {
          _this.$set(item, "divisorShow", false);
          _this.$set(item, "dividendShow", false);
          _this.$set(item, "expressionShow", false);
        }
      });
    },
    searchFieldKeyFn(ev) {
      var _this = this;
      if (!this.searchFieldKeyWord) return;
      if (this.searchFieldKeyWord.trim() == "[") {
        _this.fieldDatas = [];
        _this.searchFieldListShow = true;
        $("#num-advanced-2>li").each(function(index, item) {
          var uuid = $(item).attr("data-id");
          var selectName = $(".select-name", item).text();
          _this.fieldDatas.push({
            uuid: uuid,
            chinese: selectName,
            countAry: [
              { shorhand: "SUM", name: "求和" },
              { shorhand: "AVG", name: "平均值" },
              { shorhand: "COUNT", name: "计算" },
              { shorhand: "DISTINCT", name: "去重" }
            ]
          });
          //_this.countAry(["index","count","distinct"]);
          //_this.fieldDatas[uuid]=["SUM","AVG","MAX","MIN","COUNT","DISTINCT"];
        });
      } else {
        // pubMethod.adalert("请输入 [ 查询！");
        _this.$Message.error({
          content: "请输入 [ 查询！",
          duration: 10,
          closable: true
        });
        this.searchFieldListShow = false;
      }
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.back-arrow {
  position: absolute;
  top: 35px;
  right: 29px;
  border-radius: 50%;
  color: black;
  border: 1px solid black;
  width: 21px;
  height: 21px;
  display: block;
  text-align: center;
}
.fn-sample {
  max-height: 350px;
  padding: 20px;
  overflow: auto;
  background: #f5f5f5;
  li {
    margin-bottom: 15px;
  }
  dl {
    margin-bottom: 10px;
  }
  dt {
    font-weight: normal;
    width: 190px;
    vertical-align: top;
  }
  dt,
  dd {
    color: #9c9c9c;
    display: inline-block;
  }
}
.expression-wrap {
  min-height: 450px;
  border-color: #cccccc;
}
.field-head {
  margin-bottom: 10px;
  color: #585858;
}
.el-row {
  margin: 0 !important;
  background: #f5f5f5;
}
.leftnav {
  float: left;
  width: 200px;
  margin-top: -20px;
  background: #f0f0f0;
  height: 900px;
  color: #999;
}
.templetes {
  float: left;
  min-width: 965px;
}
.search-field {
  width: 100%;
}
.express-header {
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  border-bottom: 1px solid #ddd;
}
.expression-box {
  margin-top: 20px;
}
.search-input {
  word-wrap: break-word;
  li {
    a {
      color: #333;
    }
    &:hover {
      a {
        color: #4aa5e9;
      }
    }
  }
}
.mol-item {
  color: #4aa5e9;
}
.mol-text {
  color: #333;
}
.list-group {
  overflow-y: auto;
  height: 238px;
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  align-items: center;
}
.expression-checked {
  height: 150px;
  padding: 8px;
}
.modal-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
}
.field-names {
  margin-top: 85px;
  font-size: 14px;
}
.field-names input:-ms-input-placeholder {
  color: #b8b8b8;
}

.field-names input::-webkit-input-placeholder {
  color: #b8b8b8;
}
.field-names label {
  color: rgb(73, 80, 96);
  font-weight: bold;
}
.list-inline > li {
  display: block;
}

.text-expression-list > li {
  display: inline;
}
.field-type {
  position: fixed;
  bottom: 70px;
}
.btn {
  padding: 6px 15px !important;
}
.btn-primary {
  background: #4aa5e9;
  color: #fff;
  border-color: #4aa5e9;
}
</style>
<style>
.mol-item {
  color: #4aa5e9;
}
.mol-text {
  color: #333;
}
.current-click {
  color: #fff;
  background: #4aa5e9;
}
.mol-symbol {
  color: red;
  margin: 0 5px;
  font-weight: 600;
}
.isclick-active a {
  color: #999999 !important;
  cursor: not-allowed;
}
</style>
