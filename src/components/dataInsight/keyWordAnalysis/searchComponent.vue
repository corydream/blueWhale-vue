<template>
  <div class="search-wrap">
  	<div class="search-head text-left">
  		<Row>
  			<Col span="20">
  				<h3 class="key-text">当前关键词：<span class="current-text">{{currentKey|handelKeyword}}({{currentCategory|handelText}})</span></h3>
  				<p class="key-time">* 数据源为:{{dateTime}}</p>
  			</col>
  			<Col span="4">
        <Button type="ghost" class="addBtns"  @click="addKeyCallBack('keywordManage')">关键词管理</Button>
        <Button type="ghost" class="addBtns" @click="addKeyCallBack('ponelOne')">添加关键词</Button>
        <Tooltip placement="left" class="keywordManage">
          <i class="fa fa-question-circle-o myhelp"></i>
          <div slot="content" class="mytipsContent">
            <p>{{keywordsTips}}</p>
          </div>
        </Tooltip>
  			</Col>
  		</Row>
  	</div>
  	<div class="search-input">
  			<!--<Col span="3">-->
          <!--<Select v-model="site" disabled class="site">-->
            <!--<Option v-for="item in keywordItem.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->
  			<!--</Col>-->
      <div class="flexBox">
        <div class="categoryBox">
          <Cascader v-model="chooseType"  size="large" :data="categoryFilter" class="typeSearch" :render-format="formatValue" :clearable=false filterable
                    placeholder="类目选择" change-on-select @on-change="testCategory"> </Cascader>
        </div>
        <div class="searchWrapper">
          <Select
            v-model="inputVal"
            placeholder="搜索关键词"
            filterable
            remote
            clearable
            :remote-method="getCrawlKeyword"
            :loading="getCrawlLoading"
            @on-change="chooseKeyword"
          >
            <Option v-for="(option, index) in crawlDatas" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
          <Tooltip placement="right" class="keywordTips">
            <i class="fa fa-question-circle-o myhelp"></i>
            <div class="tip-contain" slot="content">
              <p>搜索添加成功的关键词信息,分析该关键词TOP1000 列表商品数据，以最新采集时间为准</p>
            </div>
          </Tooltip>
        </div>
        <div class="btnWrapper">
          <Button type="info" @click="addKey" class="add-search">搜索</Button>
        </div>
      </div>
    </div>
   <div class="fix-key text-left">
        <div class="flexBox">
          <div class="keyword">
            <a class="fix-text" :class="{active:item.isClick}" v-for="(item,i) in showNewest" :key="i" @click="checkKeyword(item,i)">{{item.keyword}}、</a>
          </div>
          <div class="more">
            <a href="javascript:;" class="more-text" @click="addKeyCallBack('keywordManage')">更多</a>
          </div>
        </div>
   </div>
	</div>
</template>
<script>
  import keywordCategory from "../../../config/insight/categoryDatas/keywordCategory";
  //通用方法
  import commonUtil from "../../../config/insight/commons/insightCommon";
  export default {
    data(){
      return{
        //站点
        site: '美站',
        //站点类目选择数据
        categoryFilter:keywordCategory.datas,
        //数据源日期
        dateTime:"",
        nextTime:"",
        inputVal:"",
        //当前关键词
        currentKey:"",
        currentCategory:"",
        //最新的前5条关键词数据
        showNewest:[],
        //显示添加成功模态窗
        showAddModel: false,
        //远程获取已爬取数据
        getCrawlLoading:false,
        crawlDatas:[],
        list:[],
        allRemoteList:[],
        showCategory:false,
        initCrawData:true,
        initCrawAll:[],
        //激活那个最新关键词
        wordIndex:0,
        isCurrentTab:false,
        pageType:"search",
        taskID:"",
        keywordsTips:"首次添加关键词进入爬虫采集器进行关键词爬取，完成之后可查看关键词数据分析结果，已爬取关键词可进入关键词管理模块进行管理。"
      }
    },
    created(){
      //初始化信息
      if(this.keywordItem.keywordObj){
        this.currentKey=this.keywordItem.keywordObj.keyword;
        this.currentCategory=this.keywordItem.keywordObj.category;
        this.dateTime=this.keywordItem.keywordObj.time;
        this.taskID=this.keywordItem.keywordObj.taskID;
      }else if(this.keywordItem.wordBackObj){
        this.currentKey=this.keywordItem.wordBackObj.keyword;
        this.currentCategory=this.keywordItem.wordBackObj.category;
        this.dateTime=this.keywordItem.wordBackObj.time;
        this.taskID=this.keywordItem.wordBackObj.taskID;
      }
      this.getNewestWord();
    },
    filters:{
      handelText(text){
         return text;
      },
      handelKeyword(keyword){
        return keyword?keyword:"无关键词"
      }
    },
    computed:{
    	categoryFormat(){
    		return commonUtil.handelFormat(this.chooseType);
    	},
    },
    props:['keywordItem','chooseType','showMessage','currentKeyword'],
    methods:{
       //设置时间
       handleTime(newTime){
        let str=newTime.split(" ")[0];
        this.nextTime=commonUtil.formatTomorrow(str);
        let arr=[];
        arr.push(str);
        arr.push(this.nextTime);
        this.$emit("getDateTime",arr);
      },
      //获取最新的关键词
      getNewestWord(){
        commonUtil.queryData({
          url:"/crawler/list/keyword",
          queryParams: {
            pageBean: JSON.stringify({
              "currentPage": 1, "pageSize": 5,
            }),
            "wtcTaskSite":"com"
          },
          callback:(res)=>{
              commonUtil.clearArray(this.showNewest);
              if(res.status==1){
                if(res.data.length!=0){
                  res.data.forEach((row,i)=>{
                    this.showNewest.push({
                        category:row.wtcTaskCategory.toLowerCase(),
                        keyword:row.wtcTaskInfo,
                        time:commonUtil.formatDateTime(new Date(row.wtcCreateTime)),
                        compareText:row.wtcTaskInfo+"("+row.wtcTaskCategory.toLowerCase()+")"+"#"+row.wtcCreateTime,
                        isClick:false,
                        wtcId:row.wtcId
                      }
                    )
                  })
                  //当前关键词
                  this.currentKey=this.currentKey!=""?this.currentKey:this.showNewest[0].keyword;
                  this.dateTime=this.dateTime!=""?this.dateTime:this.showNewest[0].time;
                  this.currentCategory=this.currentCategory!=""?this.currentCategory:this.showNewest[0].category
                  this.taskID=this.taskID!=""?this.taskID:this.showNewest[0].wtcId
                  this.getCrawlKeyword("");
                  let compareText=this.currentKey+"("+ this.currentCategory+")"+"#"+this.dateTime;
                  this.showNewest.forEach((item,i)=>{
                    let text=item.keyword+"("+item.category+")"+"#"+item.time;
                    if(compareText===text){
                      item.isClick=true;
                    }
                  })
                  this.handleTime(this.dateTime);
                  this.$emit("getTaskID",this.taskID);
                  this.$emit("chooseType",this.formateCategory(this.currentCategory));
                  this.$emit("getCurrentKeyword",this.currentKey);
                }else{
                  //用户没有添加关键词时
                  this.currentKey=this.currentKey!=""?this.currentKey:"pillow massager";
                  this.$emit("chooseType",["health & household & baby care"]);
                  this.$emit("getCurrentKeyword",this.currentKey);
                }
              }
          }
        })
      },
      //类目处理
      formateCategory(category){
       if(category.indexOf(">")!=-1){
          return category.split(">")
       }else{
         return category.split()
       }
      },
      //远程爬取已添加的关键词
      getCrawlKeyword (query) {
            this.getCrawlLoading = true;
            commonUtil.queryData({
              url: "/crawler/search/keyword",
              queryParams: {
                "keyWord": query,
                "wtcTaskSite":"com",
                "wtcTaskCategory":this.currentCategory
              },
              callback: (res) => {
                this.getCrawlLoading = false;
                commonUtil.clearArray(this.crawlDatas);
                commonUtil.clearArray(this.allRemoteList);
                if (res.status == 1) {
                  if (res.data.length != 0) {
                    res.data.forEach((row, i) => {
                      if (row.wtcTaskInfo) {
                        this.crawlDatas.push({
                          label: row.wtcTaskInfo,
                          value: row.wtcTaskInfo+"("+row.wtcTaskCategory.toLowerCase()+")"+"#"+row.wtcCreateTime
                        })
                        if(this.initCrawData){
                         this.initCrawAll.push({
                           label: row.wtcTaskInfo,
                           value: row.wtcTaskInfo+"("+row.wtcTaskCategory.toLowerCase()+")"+"#"+row.wtcCreateTime
                         })
                        }
                        this.allRemoteList.push({
                          category: row.wtcTaskCategory.toLowerCase(),
                          keyword: row.wtcTaskInfo,
                          time: commonUtil.formatDateTime(new Date(row.wtcCreateTime)),
                          compareText:row.wtcTaskInfo+"("+row.wtcTaskCategory.toLowerCase()+")"+"#"+row.wtcCreateTime,
                          wtcId:row.wtcId
                        })
                      }
                    })
                    this.initCrawData=false;
                  }

                }
              }
            })
      },
      //前往查看进度
    	lookTask(){
    		this.$router.push({ name:'ponelThree',params: {name: "ponelThree" }});
    	},
      //前往关键词管理
    	addKeyCallBack(pathName){
        this.$router.push({
          name: pathName,
          params:{
            id:"0"
          }
        }
        );
    	},
    	//类目选择文字格式处理
      testCategory(value, selectedData) {
        this.$emit("chooseType",value);
        this.currentCategory=value.join(">");
        //重新加载关键词
        this.getCrawlKeyword("");
      },
      //格式化类目选择显示的文字 a>b>c
      formatValue(labels, selectedData) {
        return commonUtil.handelFormat(labels);
      },
      //选中关键词
      chooseKeyword(val){
    	  if(val){
          //设置当前最新的关键词
          this.allRemoteList.forEach((item,i)=>{
            if(item.compareText==val){
              //当前关键词
              this.currentKey=item.keyword;
              this.currentCategory=item.category;
              this.dateTime=item.time;
              this.handleTime(this.dateTime);
              this.$emit("getTaskID",item.wtcId);
              this.$emit("chooseType",this.formateCategory(item.category));
            }
          })
          this.$emit("getCurrentKeyword",this.currentKey);
          this.showNewest.forEach((row,i)=>{
            row.isClick=false;
            if(row.keyword===this.currentKey&&this.currentCategory===row.category){
              row.isClick=true;
            }
          })
        }
      },
      //搜索
			addKey(){
        //重新调用新品指标
        this.$parent.$refs.indicator.getIndicator();
        this.$parent.$refs.charts.getechartData();
        commonUtil.clearArray(this.keywordItem.initCondition.condition);
        commonUtil.clearArray(this.showMessage);
        //品牌名清空
        this.$set(this.$parent.$refs.table.TableItem.tableContainer.queryData.brand,"inputVal","");
        //重新获取品牌数
        if(this.$parent.type==="explode"){
          this.$parent.$refs.table.getBrandCount();
        }
        this.$parent.$refs.table.searchData(true);
    	  },
    	//切换前5个关键词
      checkKeyword(item,index){
			  if(item.isClick){
			    return;
        }
			  this.showNewest.forEach((row,i)=>{
			    row.isClick=false;
        })
        item.isClick=true;
        this.inputVal="";
        this.isCurrentTab=true;
			  //更新关键词以及类目
        this.currentCategory=item.category;
        this.$emit("chooseType",this.formateCategory(this.currentCategory));
        this.$emit("getTaskID",item.wtcId);
        this.currentKey=item.keyword;
        this.$emit("getCurrentKeyword",this.currentKey);
        this.dateTime=item.time;
        this.handleTime(this.dateTime);
      }
    },
    watch:{
      dateTime:function(newValue){
        if(this.isCurrentTab){
          this.isCurrentTab=false;
          this.addKey();
        }
      }
  }
  }
</script>
<style lang="less">
  @import "../../../style/insight/keywordSearchBox.less";
</style>
