<template>
    <div class="application-panel text-left application-panel-one">
        <div class="panel-item">
        	<h5 class="panel-item-head">
        		<i class="text-center">1</i> 采集类型
        	</h5>
        	<el-row class="collect-wrap" :gutter="40">
        		<el-col :xs="4" :sm="4" :md="4" :lg="4" v-for="(item,index) in collectDatas" :key="index">
        			<h6><el-radio-group v-model="radioSelect" @change="selectChange">
        					<el-radio class="radio" :label="index+1">{{ item.title }}</el-radio>
        				</el-radio-group>
        			</h6>
		        	<div class="item-img">
		        		<img :src="item.src"/>
		        	</div>
        		</el-col>
        	</el-row>
        </div>
        <div class="panel-item period-wrap">
        	<h5 class="panel-item-head">
        		<i class="text-center">2</i>{{ showText }}
        	</h5>
        	<el-row>
        		<el-col :xs="13" :sm="13" :md="13" :lg="13">
        			<span class="key-world" v-if="inputContainerLabel">
        				{{ inputContainerLabel }}
        			</span>
        			<template v-if="structure">
        				<el-input v-model="structureText" placeholder="请输入类目结构" style="width:50%;"></el-input><br />
        				<p class="acction-text">
        					如：kitchen & Dining>Kitchen Utensils & Gadgets>Graters
        				</p>
        			</template>
              <template v-if="keyword">
                <Cascader v-model="categoryType" size="large" :data="categoryFilter" class="typeSearch" :render-format="formatValue" :clearable=false filterable
                          placeholder="请选择或输入类目" change-on-select @on-change="testCategory"> </Cascader>
                <h5 class="panel-item-head" style="margin-top: 10px">
                  <i class="text-center">3</i>输入采集关键词
                </h5>
              </template>
        			<el-input type="textarea" v-model="textareaText" :placeholder="inputText"
                        style="width:80%; vertical-align: top;"
              ></el-input><!--
        			<el-input v-model="textareaText" :placeholder="inputText" style="width:220px;"></el-input>-->
        		</el-col>
        		<el-col :xs="12" :sm="12" :md="12" :lg="12" v-if="isShowSiteArea" style="margin-top:18px;">
        			<span class="site-select">
        				站点:
        			</span>
        			<el-select v-model="optionValue" placeholder="请选择">
					    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				  </el-select>
        		</el-col>
        	</el-row>

        </div>
        <div class="add-task text-right">
        	<el-button type="primary" @click="submitForm">添加任务</el-button>
        </div>
    </div>
</template>
<script>
import applicationApi from './../../../requstApi/api.js'
/*import container from './info/container';*/
// import charts from './info/charts';
import keywordCategory from "../../../../../config/insight/categoryDatas/applicationCategory";
export default {
  data () {
    return {
    	structure:false,//是否显示类目结构
    	structureText:'',//类目结构内容
    	placeholderText:'请输入内容',
    	radioSelect:1,
    	textareaText:"",
    	inputText:"输入产品ASIN，如需多个请用英文逗号隔开，单次不可超过10个，例：B006W2SZT8,B074G32FLX",
    	selectIndex:1,
    	inputContainerLabel:"asin",
    	optionValue:'com',//已选择的站点
    	isLink:false,//是否采集链接
      keyword:false,//是否是关键词搜索
      //关键词类目站点
      categoryType:["Beauty & Personal Care"],
      //站点类目选择数据
      categoryFilter:keywordCategory.datas,
    	collectDatas:[
    		{
    			title:"产品页",
    			checked:true,
    			src:require('../../../../../assets/images/application-panel/p-4.png')
    		},{
    			title:"列表页 ",
    			checked:false,
    			src:require('../../../../../assets/images/application-panel/p-1.png'),
    		},{
    			title:"关键词搜索 ",
    			checked:false,
    			src:require('../../../../../assets/images/application-panel/p-5.png'),
    		},{
    			title:"热销榜(BestSellers)",
    			checked:false,
    			src:require('../../../../../assets/images/application-panel/p-2.png'),
    		},{
    			title:"新品榜(NewReleases)",
    			src:require('../../../../../assets/images/application-panel/p-3.png'),
    		}
    	],
    	options: [
    	  {
			          value: 'com',
			          label: 'com'
							},
					// 		 {
			    //       value: 'co.uk',
			    //       label: 'co.uk'
			    //     }, {
			    //       value: 'co.jp',
			    //       label: 'co.jp'
			    //     }, {
			    //       value: 'fr',
			    //       label: 'fr'
			    //     }, {
			    //       value: 'de',
			    //       label: 'de'
					//   }, {
				  //         value: 'ca',
				  //         label: 'ca'
					//   }, {
				  //         value: 'es',
				  //         label: 'es'
					//   }, {
				  //         value: 'in',
				  //         label: 'in'
					//   },{
				  //         value: 'it',
				  //         label: 'it'
					// }
					],
      showText:"输入产品ASIN"
    }
  },
  computed:{
  	isShowSiteArea(){
  		if(this.selectIndex==1 || this.selectIndex==3){
  			return true;
  		}else{
  			return false;
  		};
  	}
  },
  mounted() {
  	//this.inputText=this.collectDatas[0].title;
  },
  components: {
      /*folderMenu,
      container*/
  },
  methods: {
    //类目选择文字格式处理
    testCategory(value, selectedData) {
      this.categoryType=value;
    },
    //格式化类目选择显示的文字 a>b>c
    formatValue(labels, selectedData) {
      return this.handelFormat(labels);
    },
    //字符串格式处理
    handelFormat(arr) {
      if(arr instanceof Array){
        return arr&&arr.join(">");
      }
    },
  	submitForm() {
  		let _this=this;
  		let wtcTaskProductId=null;
  		let wtcInfo=null;
  		let wtcTaskSite=null;
  		let reg=/^https:\/\/www\.amazon\.(com|co\.uk|co\.jp|fr|de|ca|es|in|it)\//;
  		let resultReg=/com|(co\.uk)|(co\.jp)|fr|de|ca|es|in|it/;
  		let regChinese=/[\u4e00-\u9fa5]/;
  		let regAsin=/^([A-Za-z0-9 ]+[,])*([A-Za-z0-9]+)$/;
  		wtcTaskSite=_this.optionValue;
  		if(_this.selectIndex==4||_this.selectIndex==5){
        if(_this.structureText==""){
          _this.$alert('类目名不能为空！', '', {
            confirmButtonText:'确定'
          });
          return false;
        }
      }
      console.log(regChinese.test(_this.structureText))
      if(regChinese.test(_this.structureText)){
        _this.$alert('类目名不符合规范！', '', {
          confirmButtonText:'确定'
        });
        return false;
      };
  		if(_this.selectIndex==2||_this.selectIndex==4||_this.selectIndex==5){
  		  if(_this.textareaText==""){
          _this.$alert('输入的采集链接名不能为空！','',{
            confirmButtonText:'确定'
          });
          return false;
        }else{
          if(reg.test(_this.textareaText)){
            wtcInfo=_this.textareaText;
            wtcTaskSite=_this.textareaText.match(resultReg)[0];
          }else{
            _this.$alert('请输入正确的采集链接名！','',{
              confirmButtonText:'确定'
            });
            return false;
          };
        }
  		}else if(_this.selectIndex==3){
  		  if(_this.textareaText==""){
          _this.$alert('输入的关键词不能为空！','',{
            confirmButtonText:'确定'
          });
  		    return false;
        }
  			wtcInfo=_this.textareaText;
        _this.structureText=this.handelFormat(this.categoryType);//类目结构
  		}else if(_this.selectIndex==1){
        if(_this.textareaText==""){
          _this.$alert('输入的产品ASIN不能为空！','',{
            confirmButtonText:'确定'
          });
          return false;
				}
				if(regAsin.test(_this.textareaText)){
          let arr= _this.textareaText.split(",");
          if(arr.length>10){
            _this.$alert('输入多个ASIN的个数不能超过10！','',{
              confirmButtonText:'确定'
            });
            return false;
          }
          wtcTaskProductId =_this.textareaText;
        }else{
          _this.$alert('输入多个ASIN时每个ASIN只能以一个英文逗号隔开！','',{
            confirmButtonText:'确定'
          });
          return false;
        }
				// wtcInfo=_this.textareaText;
			} else{//当没提供站点选择时，存储 asin
  			wtcTaskProductId=_this.textareaText;//_this.isShowSiteArea?_this.optionValue:null
  		};
  		// return false;
        let ajaxData={
            	crawler:JSON.stringify({
            		wtcTaskCategory:_this.structureText, //类目结构
            		wtcTaskType:_this.selectIndex,//采集链接类型
								wtcTaskFrequency:1,//任务采集频次 默认1就好
								wtcTaskPeriod:1,//任务采集周期 默认1
								wtcTaskInfo:wtcInfo,//_this.textareaText, 输入框中内容  //关键词和链接
								wtcTaskProductId:wtcTaskProductId,//任务产品ID //asin
								wtcTaskSite:wtcTaskSite,//根据站点(com/co.uk/co.jp/fr/it/es/de)
								wtcPlatform:"amazon"//数据平台 暂时默认amazon
            	})
						};
					$.ajax({
							type:'post',
							url: _this.$keyapi+"/crawler/save",
							dataType:'json',
							xhrFields: {
									withCredentials: true
							},
							data:ajaxData,
							crossDomain: true,
							success: res =>{
    					if(res.status == 1){
								_this.$alert('添加成功', '成功', {
									confirmButtonText:'确定',
										callback: action => {
											_this.$router.push({
												path:"/dataApplication/ponelThree"
											})
										}
									});
								}else if(res.status == 0){
									_this.$Message.error('今日提交任务数已达上限');
								}else if(res.status == -1){
									_this.$Message.error('提交任务重复！');
								}else if(data.status == 101){
											location.href = "https://data.banggood.cn";
								}else{
									_this.$Message.error('保存失败！');
								}
							}
					})
        // applicationApi("/crawler/save",ajaxData,_this.requestCallBack);//保存数据
    },
    selectChange(key, keyPath) {
      	let _this=this;
      	_this.selectIndex=key;
      	switch (key){
      		case 1:
      		_this.inputText="输入产品ASIN";
      		_this.showText="输入产品ASIN";
      		_this.inputContainerLabel="asin：";
      		_this.isLink=false;
      		_this.structure=false;
          _this.keyword=false;
      			break;
      		case 2:
      		_this.inputText="输入采集链接";
      		_this.showText="输入采集链接";
      		_this.inputContainerLabel=null;
      		_this.isLink=true;
      		_this.structure=false;
            _this.keyword=false;
      			break;
      		case 4:
      		_this.inputText="输入采集链接";
      		_this.showText="输入采集链接和类目";
      		_this.inputContainerLabel=null;
      		_this.isLink=true;
      		_this.structure=true;
            _this.keyword=false;
      			break;
      		case 5:
      		_this.inputText="输入采集链接";
      		_this.showText="输入采集链接和类目";
      		_this.inputContainerLabel=null;
      		_this.isLink=true;
      		_this.structure=true;
            _this.keyword=false;
      			break;
      		case 3:
      		_this.inputText="输入采集关键词";
      		_this.showText="选择类目结构";
      		_this.inputContainerLabel="类目：";
      		_this.isLink=false;
      		_this.structure=false;
      		_this.keyword=true;
      			break;
      		default:
      			break;
      	}
      }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../style/show-graph.css';
.acction-text{color:#999; margin-bottom: 24px;}
.el-input{display: inline-block;}
.key-world{display: inline-block; width:50px;text-align: left;}
.site-select{display: inline-block;width:50px;text-align: left;}
.app-lication-bottom{background-color:#fff; margin-top:20px;}
.el-menu-item.is-active{border-bottom: 5px solid #20a0ff;}
.panel-item{margin-bottom: 30px;}
.panel-item-head{line-height:24px; padding:12px 0;
.el-select{border:none!important;}
	i{
		display:inline-block;
		height:24px;
		width:24px;
		border-radius:50%;
		-webkit-border-radius:50%;
		font-style:normal;
		background-color:#4aa5e9;
		color: #fff;
	}
}
.typeSearch{
  width: 250px;
  display: inline-block;
}
.text-center{
  margin-right: 8px;
}

.collect-wrap{
		img{width:100%;}
	}
	.application-panel{
		padding:0 24px 24px;
		text-align: left;
	}
	.period-wrap{
		textarea{
			width: 50%;
		}
	}
	textarea{resize: none;}
</style>
