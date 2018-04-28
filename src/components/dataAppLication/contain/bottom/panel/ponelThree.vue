<template>
    <div class="application-panel application-panel-three">
        <div class="search-time">
        	<el-row :gutter="0">
				<el-col :xs="3" :sm="3" :md="3" :lg="3">
					<Button type="primary" @click="requestListFn('',1)">我提交的任务</Button> 
				</el-col>
			  <el-col :xs="10" :sm="10" :md="10" :lg="10">
				
			  	<div class="grid-content bg-purple">  
			  		<div class="block">
					    <span class="demonstration">创建时间：</span>
					    <!-- <el-date-picker  v-model="dateTime" type="datetimerange"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间范围" @change="requestListFn(stateRemember)"></el-date-picker> -->
							<DatePicker type="datetimerange" value="yyyy-MM-dd HH:mm:ss" v-model="dateTime" placeholder="选择时间范围" style="width: 300px" @on-ok="requestListFn(stateRemember)"></DatePicker>
					  </div>
			  	</div>
			  </el-col>
			  <el-col :xs="11" :sm="11" :md="11" :lg="11">
			  	<div class="grid-content bg-purple-light text-right">
			  		<el-button-group>
					  <el-button :type="activeBtn==0?'primary':'default'" @click="gatheringEvent('100')">全部</el-button>
					  <el-button :type="activeBtn==1?'primary':'default'" @click="gatheringEvent('0')">等待采集</el-button>
					  <el-button :type="activeBtn==2?'primary':'default'" @click="gatheringEvent('1')">采集中</el-button>
					  <el-button :type="activeBtn==3?'primary':'default'" @click="gatheringEvent('-1')">采集失败</el-button>
					  <el-button :type="activeBtn==4?'primary':'default'" @click="gatheringEvent('2')">采集完成</el-button>
					</el-button-group>
			  	</div>
			  </el-col>			
			</el-row>
        </div>
        <div class="collect-list">
        	<el-table :data="filterTabelData" style="width: 100%" v-loading="loading">
			    <el-table-column prop="date" label="列表">
			    	<div scope="scope" v-if="!scope.row.collectInfo.wtcIsDelete">
				        <div class="first-td">
				        	<el-row :gutter="10">
							  <el-col :xs="3" :sm="3" :md="3" :lg="3">
							  	<div class="grid-content bg-purple single-text">
							  		<el-button v-if="scope.row.collectInfo.single" type="primary">单</el-button>
							  		<el-button v-else type="warning">循</el-button>
							  	</div>
							  </el-col>
							  <el-col :xs="21" :sm="21" :md="21" :lg="21">
							  	<div class="grid-content bg-purple-light text-left">
							  		<div class="first-td-top">
							  			<el-row>
							  				<el-col :xs="14" :md="14" :lg="14">
							  					<span class="list-name">
									  				{{ scope.row.collectInfo.whichPage }}
									  			</span>
									  			<span class="single-collect">
									  				{{ scope.row.collectInfo.whichCollect }}
									  			</span>
							  				</el-col>
							  				<el-col :xs="10" :md="10" :lg="10">
							  					<div class="bage-info" v-if="scope.row.collectInfo.collectStatus==0"> 等待采集
									  				<sup class="bage-sup bage-sup-1"></sup>
									  				<span class="jobs-text">(排队任务数:{{scope.row.collectInfo.waitCount}})</span>
									  			</div>
									  			<div class="bage-info" v-if="scope.row.collectInfo.collectStatus==1"> 采集中
									  				<sup class="bage-sup bage-sup-2"></sup>
									  			</div>
									  			<div class="bage-info" v-if="scope.row.collectInfo.collectStatus==-1"> 采集失败
									  				<sup class="bage-sup bage-sup-3"></sup>
									  			</div>
									  			<div class="bage-info" v-if="scope.row.collectInfo.collectStatus==2"> 采集完成
									  				<sup class="bage-sup bage-sup-4"></sup>
									  			</div>
							  				</el-col>
							  			</el-row>
							  		</div>
							  		<div class="first-td-bottom" v-html="scope.row.collectInfo.collectAddress">

							  		</div>
							  	</div>
							  </el-col>
							</el-row>
				        </div>
			      </div>
			    </el-table-column>
			    <el-table-column prop="creatTime" label="时间 " width="260"> </el-table-column>
			    <el-table-column prop="address" label="操作" width="200">
			    	<div scope="scope">
			    		<el-row>
                <el-col :xs="9" :sm="9" :md="9" :lg="9">
                  <el-button size="small" @click="goAnaysis(scope.$index, scope.row)" type="text" class="go-anaysis" v-if="scope.row.collectInfo.collectStatus==2&&scope.row.collectInfo.wtcTaskType==3&&scope.row.collectInfo.collectAddress.indexOf('站点：com')>0">前往分析</el-button> &nbsp;
                </el-col>
			    			<el-col :xs="9" :sm="9" :md="9" :lg="9">
			    				<el-button size="small" @click="handleExport(scope.$index, scope.row)" type="text" class="export-csv" v-if="scope.row.collectInfo.collectStatus==2">导出CSV</el-button> &nbsp;
			    			</el-col>
			    			<el-col :xs="6" :sm="6" :md="6" :lg="6">
			    				<el-button size="small" @click="handleDelete(scope.$index, scope.row)" type="text" class="delete-row">删除</el-button> &nbsp;
			    			</el-col>
			    		</el-row>
			      </div>
			    </el-table-column>
		  </el-table>
        </div>
        <div class="page-bar text-right">
        	<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="pageSizes"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="totalSize">
		    </el-pagination>
        </div>
    </div>
</template>
<script>
import applicationApi from './../../../requstApi/api.js'

export default {
  data () {
    return {
			datepicker: {
				begin:'',
				end:''
			},
    	activeBtn:0,
    	loading:true,
    	currentPage:1,
    	pageSize:20,
    	pageSizes:[10,20,30,40],
		totalSize:100,
			// dateTime:[this.getLastMonthYestdy(),new Date()],
			dateTime:[null,null],
      tableData: [
        {
          collectInfo:{
	    	single:false,
	    	whichPage:"新品榜(New Releases)",
	    	whichCollect:"单次采集",
	    	collectAddress:"http://www.zmazon.com/about-me/c/ref=dp_f",
	    	collectStatus:0,
	      },
          creatTime: '创建时间：2016-09-11'
        }, {
          collectInfo:{
	    	single:false,
	    	whichPage:"产品页",
	    	whichCollect:"单次采集",
	    	collectAddress:"http://www.zmazon.com/about-me/c/ref=dp_y",
	    	collectStatus:1,
	      },
          creatTime: '创建时间：2016-09-12'
        }, {
          collectInfo:{
	    	single:true,
	    	whichPage:"产品页",
	    	whichCollect:"单次采集",
	    	collectAddress:"http://www.zmazon.com/about-me/c/ref=dp_y",
	    	collectStatus:2,
	      },
          creatTime: '创建时间：2016-09-12'
        }, {
          collectInfo:{
	    	single:true,
	    	whichPage:"产品页",
	    	whichCollect:"单次采集",
	    	collectAddress:"http://www.zmazon.com/about-me/c/ref=dp_y",
	    	collectStatus:-1,
	      },
          creatTime: '创建时间：2016-09-12'
        }],
      filterTabelData:null,//经过过滤的表格数据
      stateRemember:"100"//全部

    }
  },
  watch:{
  	// dateTime(){
  	// 	let _this=this;
  	// 	_this.requestListFn();//请求数据方法
  	// },
  },
  mounted() {
  	this.filterTabelData=this.tableData;
  	this.requestData();//初始化数据
  },
  computed:{

  },
  components: {

  },
  methods: {
//获取一个月前的日期
	getLastMonthYestdy(){
			var date = new Date();
			var daysInMonth = new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]);
			var strYear = date.getFullYear();
			var strDay = date.getDate();
			var strMonth = date.getMonth()+1;
			var h = date.getHours();
			var mm = date.getMinutes();
			var s = date.getSeconds();
			if(strYear%4 == 0 && strYear % 100 != 0){
				daysInMonth[2] = 29;
			}
			if(strMonth - 1 == 0){
				strYear -= 1;
				strMonth = 12;
			} else {
				strMonth -= 1;
			}
			strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
			return new Date(strYear,strMonth-1,strDay,h,mm,s);
	},
	requestData(){
		let _this=this;
		_this.requestListFn();//请求数据方法
	},
	requestCallBack(res){
		let _this=this;
		_this.loading=false;
		if(res.status == 1){
				// _this.dateTime[0] = new Date(res.data.pageBean.beginTime);
				// _this.dateTime[1] = new Date(res.data.pageBean.endTime+86400);
				_this.dateTime[0] = _this.formatDate(res.data.pageBean.beginTime);
				_this.dateTime[1] = _this.formatDate(res.data.pageBean.endTime);
				$('.ivu-input').val(_this.dateTime[0]+' - '+_this.dateTime[1]);
				_this.formatData(res.data.crawlerInfos);//更新表格数据
							_this.upDatePageInfo(res.data.pageBean);//更新分页信息
							_this.loading=false;
						}else{
							/*_this.$notify.error({
						title: '错误',
						duration:1000,
						offset:400,
						message: '保存失败！'
					});*/
						};			
  		},
		formatDate(shijianchuo){
  		var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			if(m<=9)m='0'+m;
			if(d<=9)d='0'+d;
			if(h<=9)h='0'+h;
			if(mm<=9)mm='0'+mm;
			if(s<=9)s='0'+s;
			if(s==0)s='00';
			return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
  		},
  		formatData(listDatas){
  			let _this=this;
			_this.tableData=[];
	       listDatas.forEach(function(item,index){
	       		let wtcId=null;
	       		let creatTime=null;
	       		let single=null;
	       		let whichPage=null;
	       		let whichCollect=null;
	       		let collectAddress=null;
	       		let collectStatus=null;
	       		let wtcIsDelete=null;
	       		let wtcTaskType=null;
	       		let waitCount=null;
	       		let keyword=null;
	       		let category=null;
	       		wtcId=item.wtcId;
	       		creatTime=_this.formatDate(item.wtcCreateTime);
	       		if(item.wtcTaskFrequency==1 && item.wtcTaskPeriod==1){
	       			single=true;
	       		}else{
	       			single=false;
	       		};
	       		collectStatus=item.wtcStatus;
	       		wtcIsDelete=item.wtcIsDelete;
            wtcTaskType=item.wtcTaskType;
            keyword=item.wtcTaskInfo;
            category=item.wtcTaskCategory;
	       		if(item.wtcTaskType==1){
	       			whichCollect="产品页";
	       			//wtcTaskType="ASIN和站点：";

	       			collectAddress="asin：" + (item.wtcTaskProductId?item.wtcTaskProductId:item.wtcTaskInfo) + " 站点：" + (item.wtcTaskSite?item.wtcTaskSite:"");
	       		}else if(item.wtcTaskType==2){
	       			whichCollect="列表页";
//	       			wtcTaskType="采集链接：";
	       			collectAddress=item.wtcTaskInfo?item.wtcTaskInfo:"";
	       		}else if(item.wtcTaskType==3){
	       			whichCollect="关键词搜索";
//	       			wtcTaskType="采集关键词";
	       			collectAddress="关键词："+(item.wtcTaskInfo?item.wtcTaskInfo:"")+" 站点："+ (item.wtcTaskSite?item.wtcTaskSite:"");
	       		} else if(item.wtcTaskType==4){
	       			whichCollect="热销榜(Best Sellers)";
//	       			wtcTaskType="采集链接：";
	       			collectAddress=item.wtcTaskInfo?item.wtcTaskInfo:"";
	       		}else if(item.wtcTaskType==5){
	       			whichCollect="新品榜(New Releases)";
//	       			wtcTaskType="采集链接：";
	       			collectAddress=item.wtcTaskInfo?item.wtcTaskInfo:"";
	       		};
	       		waitCount=item.waitCount;
	       		let tableListItem={
				          collectInfo:{
				          	wtcId:wtcId,
					    	single:single,
					    	whichPage:whichPage,
					    	whichCollect:whichCollect,
					    	wtcIsDelete:wtcIsDelete,
					    	collectAddress:collectAddress,
					    	collectStatus:collectStatus,
					    	waitCount:waitCount,
                wtcTaskType:wtcTaskType,
                time:creatTime,
                keyword:keyword,
                category:category.toLowerCase()
					      },
				          creatTime:"创建时间："+creatTime
				      };
	       	_this.tableData.push(tableListItem);
	       });
	       _this.filterTabelData=_this.tableData;
  		},
  		upDatePageInfo(pageBean){
  			let _this=this;
  			_this.totalSize=pageBean.totalSize;
  			_this.pageSize=pageBean.pageSize;
  		},
  		handleSizeChange(val) {
	        let _this=this;
	        _this.pageSize=val;
  			_this.requestListFn();//请求数据方法

	      },
      handleCurrentChange(val) {
      		let _this=this;
	        _this.currentPage=val;
	        _this.requestListFn();//请求数据方法
	      },
      handleDelete(index,row) {
      	let _this=this;
        this.$confirm('删除该信息, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	let ajaxData={
            		wtcId:row.collectInfo.wtcId
            	};

            _this.loading=true;
            applicationApi("/crawler/delete",ajaxData,_this.deleteCallBack);//请求数据
	        	row.collectInfo.wtcIsDelete=true;
	        }).catch(() => {
	        	this.$Message.info('已取消删除!');
	        });
      },
      requestListFn(currentStatus, belong){
				let _this=this;
				if(_this.dateTime[0]&&typeof(_this.dateTime[0])=='object'){
					_this.datepicker = {
						begin:_this.formatDate(_this.dateTime[0].getTime()),
						end:_this.formatDate(_this.dateTime[1].getTime())
					}
				}
				else{
					_this.datepicker = {
						begin:_this.dateTime[0],
						end:_this.dateTime[1]
					}
				}
      	let ajaxData={
        	crawler:JSON.stringify({
        		wtcStatus:currentStatus?currentStatus:_this.stateRemember
					}),
        	pageBean:JSON.stringify({
		        currentPage:_this.currentPage,
		        pageSize:_this.pageSize,
		        //sumPage:6,
		        beginTime:_this.datepicker.begin,
		        endTime:_this.datepicker.end
			}),
			isBelong:belong?belong:0
				};
        _this.loading=true;
        applicationApi("/crawler/list",ajaxData,_this.requestCallBack);//请求数据
      },
      deleteCallBack(res){
		  let _this=this;
		  if(res.status == 1){
	      	 _this.$Message.success('删除成功') 
		     _this.requestListFn();//请求数据方法
		  }
		  else{
			 	_this.$Message.error(res.desc) 
				_this.requestListFn();
		  }	
      },
      handleExport(index,row){
      	let _this=this;
        location.href="https://data-backend.banggood.cn/crawler/download?wtcId="+row.collectInfo.wtcId;//row.collectInfo.wtcId;
      },
      gatheringEvent(num) {
		  let _this=this;
		  _this.dateTime = [null,null];
      	if(num=="100"){
      		_this.activeBtn=0;
      	}else if(num=="0"){
      		_this.activeBtn=1;
      	}else if(num=="1"){
      		_this.activeBtn=2;
      	}else if(num=="-1"){
      		_this.activeBtn=3;
      	}else if(num=="2"){
      		_this.activeBtn=4;
      	};
         this.stateRemember=num;
      	_this.requestListFn(num);//请求数据方法
      	let getData;
      	/*let filterData={
	      		"100":function(){//全部
	      			_this.filterTabelData=_this.tableData.filter(function(item,index){
	      				return item;
	      			});
	      		},
	      		"0":function(){//等待采集
	      			_this.filterTabelData=_this.tableData.filter(function(item,index){
	      				return (item.collectInfo.collectStatus==0);
	      			});
	      		},
	      		"1":function(){//采集中
	      			_this.filterTabelData=_this.tableData.filter(function(item,index){
	      				return (item.collectInfo.collectStatus==1);
	      			});
	      		},
	      		"2":function(){//采集成功
	      			_this.filterTabelData=_this.tableData.filter(function(item,index){
	      				return item.collectInfo.collectStatus==2;
	      			});
	      		},
	      		"-1":function(){//采集失败
	      			_this.filterTabelData=_this.tableData.filter(function(item,index){
	      				return item.collectInfo.collectStatus==-1;
	      			});
	      		},
	      	};*/
	    //filterData[num]();
      },
      //去关键词产品分析
      goAnaysis(index,row){
        this.$router.push({
          name:'keywordContain',
          params:{
            "keywordObj":{
              keyword:row.collectInfo.keyword,
//              category:row.collectInfo.category=="all"?"":row.collectInfo.category,
              category:row.collectInfo.category,
              time:row.collectInfo.time
            },
            id:"0"
          }
        })
      }
  }
}
</script>
<style lang="less" >
.application-panel-three{padding:12px;}
.search-time{padding:18px 0;}
.app-lication-bottom{background-color:#fff; margin-top:20px;}
.el-menu-item.is-active{
  border-bottom: 5px solid #20a0ff;

}
.el-menu-item a{
  text-decoration: none;
}
.el-table__header{display:none;}
.list-name{font-size:14px;}
.jobs-text{color:#ffac68; margin-left:12px;}

.bage-info{
	vertical-align: top;
	position: relative;
    vertical-align: middle;
    display: inline-block;
}
.bage-sup{
    border-radius:10px;
    color:#fff;
    display:inline-block;
    font-size:12px;
    height:18px;
    line-height:18px;
    padding:0 6px;
    text-align:center;
    border:1px solid #fff;
	top:12px;
    left:-18px;
    position:absolute;
    -ms-transform:translateY(-50%) translateX(100%);
    transform:translateY(-50%) translateX(100%);
    width:8px;
    height:8px;
    padding:0;
    right:0;
    border-radius:50%
}

.el-table .el-table_1_column_2{vertical-align:top;}
.go-anaysis{  color:#7ec1f0;}
.export-csv{color:#62aa6b;}
.delete-row{color:#ff5858;}
.page-bar{margin-top:24px;}
.bage-sup-0{
	background-color:#50b0ec;
}
.bage-sup-1{
	background-color:#f3da82;
}
.bage-sup-2{
	background-color:#ff4949;
}
.bage-sup-3{
	background-color:#ccc;
}
.bage-sup-4{
	background-color:#32b16c;
}
.single-collect{
	color:#ffac68;
	-webkit-transform: scale(0.5);
	transform:scale(0.5);
}
.collect-list{
	max-height:420px;
	overflow-y: auto;
}
</style>
<style>
.el-table__header{display:none;}
.single-text span{
	font-size:20px;
}
.el-table--enable-row-transition .el-table__body td{padding:12px 0;}
.collect-list .el-table--enable-row-transition .el-table__body td{vertical-align: top;}
</style>
