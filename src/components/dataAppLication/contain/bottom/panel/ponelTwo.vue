<template>
    <div class="application-panel application-panel-three">
    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
	        <div class="panel-item">
	        	<h5 class="panel-item-head">
	        		<i class="text-center">1</i> 任务采集频次
	        	</h5>
				<div class="cycle-contain">
					<el-form-item label="" prop="radioDay">
					    <el-radio-group v-model="ruleForm.radioDay">
					    	<el-radio v-for="(item,index) in intervalPeriod" :label="item.day+'天'" :key="index"></el-radio>
					    </el-radio-group>
				 	</el-form-item>
				</div>
	        </div>
	        <div class="panel-item">
	        	<h5 class="panel-item-head">
	        		<i class="text-center">2</i> 任务跟踪时间范围
	        	</h5>
				<div class="cycle-contain">
					<el-form-item label="" prop="radioTime">
					    <el-radio-group v-model="ruleForm.radioTime">
					    	<el-radio v-for="(item,index) in timeRange" :label="item.day+'天'" :key="index"></el-radio>
					    </el-radio-group>
				 	</el-form-item>
				</div>
	        </div>
	        <div class="panel-item">
	        	<h5 class="panel-item-head">
	        		<i class="text-center">3</i> 采集类型
	        	</h5>
				<div class="cycle-contain">
					<el-form-item label="" prop="radioLink">
					    <el-radio-group v-model="ruleForm.radioLink">
					    	<el-radio v-for="(item,index) in collectLinks" :label="item.name" :key="index"></el-radio>
					    </el-radio-group>
					 </el-form-item>
				</div>
	        </div>
	        <div class="panel-item">
	        	<h5 class="panel-item-head">
	        		<i class="text-center">4</i> 类目结构
	        	</h5>
				<div class="cycle-contain">
					<el-form-item label="" prop="stractText" class="el-textarea">
					    <el-input v-model="ruleForm.stractText" placeholder="请输入类目结构"></el-input>
					    <p class="acction-text">
	        					如：kitchen & Dining>Kitchen Utensils & Gadgets>Graters
	        			</p>
					</el-form-item>
				</div>
	        </div>
	        <div class="panel-item">
	        	<h5 class="panel-item-head">
	        		<i class="text-center">5</i> 输入采集链接
	        	</h5>
				<div class="cycle-contain">
					<el-form-item label="" prop="textArea">
					    <el-input type="textarea" v-model="ruleForm.textArea" placeholder="请输入采集链接"></el-input>
					</el-form-item>
				</div>
	        </div>
	        <div class="add-task text-right">
	        	<el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')">添加任务</el-button>
				</el-form-item>
	        </div>
        </el-form>
    </div>
</template>
<script>
import applicationApi from './../../../requstApi/api.js'
export default {
  data () {
    return {
    	ruleForm: {
          radioDay:"1天",
          radioTime:"3天",
          radioLink:null,
          stractText:'',
          textArea:''
        },
        rules: {
          radioDay:[
	            { required: true, message: '请选择任务采集频次', trigger: 'change' }
	          ],
          radioTime: [
            { required: true, message: '请选择任务跟踪时间范围', trigger: 'change' }
          ],
          radioLink: [
            { required: true, message: '请选择采集链接类型', trigger: 'change' }
          ],
          stractText:[
          	{ required: true, message: '请填写类目结构', trigger: 'change' }
          ],
          textArea: [
            { required: true, message: '请填写内容', trigger: 'blur' }
          ]
        },
    	intervalPeriod:[
    		{
    			day:1,
    		},{
    			day:3,
    		}/*,{
    			day:7,
    		},{
    			day:15
    		}*/
    	],
    	timeRange:[
    		{
    			day:3,
    		},
    		{
    			day:7,
    		}/*,{
    			day:15,
    		},{
    			day:30,
    		}*/
    	],
		collectLinks:[
			{
				name:"热销榜(BestSellers)",
				ajaxKey:4
			},{
				name:"新品榜(NewReleases)",
				ajaxKey:5
			}
		],
    }
  },
  mounted() {

  },
  components: {
      /*folderMenu,
      container*/
  },
  methods: {
  	submitForm(formName) {
  		let _this=this;
  		let textArea=null;
  		let reg=/^https:\/\/www\.amazon\.(com|co\.uk|co\.jp|fr|de|ca|es|in|it)\//;//较验链接名
  		let resultReg=/com|(co\.uk)|(co\.jp)|fr|de|ca|es|in|it/;//取得链接后缀
  		let radioLink="1";
  		let wtcTaskSite=null;

  		if(this.ruleForm.radioLink=="热销榜(BestSellers)"){
  			radioLink="4";
  		}else if(this.ruleForm.radioLink=="新品榜(NewReleases)"){
  			radioLink="5";
  		};
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(reg.test(_this.ruleForm.textArea)){
             if(_this.ruleForm.textArea.indexOf(".com")==-1){
               _this.$alert('目前仅支持亚马逊美站爬虫需求!', '', {
                 confirmButtonText:'确定'
               });
               return false;
             }
  			  	wtcTaskSite=_this.ruleForm.textArea.match(resultReg)[0];//.match(resultReg)[0]
  			}else{
  				_this.$alert('请输入正确的采集链接名！', '', {
			        confirmButtonText:'确定'
			        });
			    return false;
  			};
          	let ajaxData={
            	crawler:JSON.stringify({
            		wtcTaskType:radioLink,//采集类型
					wtcTaskFrequency:_this.ruleForm.radioDay.replace(/天/,""),//任务采集频次 默认1就好
					wtcTaskPeriod:_this.ruleForm.radioTime.replace(/天/,""),//任务采集周期 默认1
					wtcTaskCategory:_this.ruleForm.stractText,//类目结构名称
					wtcTaskInfo:_this.ruleForm.textArea,//_this.textareaText, 输入框中内容
					wtcTaskSite:wtcTaskSite,
					wtcPlatform:"amazon"
            	})
            };
        console.log(ajaxData);
        applicationApi("/crawler/save",ajaxData,_this.requestCallBack);//保存数据
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      requestCallBack(res){
      	let _this=this;
      	if(res.status == 1){
    		_this.$alert('添加成功', '', {
		        confirmButtonText:'确定'
		          /*callback: action => {
		            this.$message({
		              type: 'info',
		              message: `action: ${ action }`
		            });
		          }*/
		        });
        }else if(res.status == 0){
        	_this.$notify.error({
	          title: '错误',
	          duration:1600,
	          offset:400,
	          message: '今日提交任务数已达上限！'
	        });
        }else if(res.status == -1){
        	_this.$notify.error({
	          title: '错误',
	          duration:1600,
	          offset:400,
	          message: '提交任务重复！'
	        });
        }else{
        	_this.$notify.error({
	          title: '错误',
	          duration:1000,
	          offset:400,
	          message: '保存失败！'
	        });
        };
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style lang="less" scoped>
.application-panel-three{text-align:left;}
.acction-text{color:#999;}
.app-lication-bottom{background-color:#fff; margin-top:20px;}
.el-menu-item.is-active{border-bottom: 5px solid #20a0ff;}
.panel-item{margin-bottom: 30px;}
.panel-item-head{line-height:24px; padding:12px 0;
	i{display: inline-block; height:24px; width:24px; border-radius: 50%; font-style: normal; background-color:#4aa5e9; color: #fff;}
}
.collect-wrap{
	img{width:100%;}
}
.el-radio-group{
	span{color:#767676;}
}
.el-radio+.el-radio{ margin-left:68px;}
.el-textarea{width:50%;
	textarea{resize:none;}
}
.el-radio{color:#707070;}

.cycle-contain{margin-top:10px;}
.el-textarea__inner{resize:none;}
</style>
<style type="text/css">
	.application-panel{
		padding:0 24px;
	}
	.period-wrap{
		/*textarea{
			width: 50%;
		}*/
	}
</style>
