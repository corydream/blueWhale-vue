import data from './datas';
import api from './root';
import keyapi from './../data/tempApi';
import echarts from 'echarts'
import bus from './bus';
import { Message } from 'iview';
var lock = false;
let pubMethod = {
	//当重新选择条件时，删除原来旧的条件
	removeOldCondition(uuid) {
	    while (true){
	        var find=false;
	        for(var i=0;i<data.datas.rightListConditions.conditions.length;i++){
                var condition= data.datas.rightListConditions.conditions[i];
	            if(condition.uuid==uuid)
	            {
	                data.datas.rightListConditions.conditions.splice(i,1);
	                find=true;
	                break;
	            }
	        };
	
	        if(!find){
	            break;
	        }
	    }
	},
    //得到日期
    getDates(sumDates){
        //设置日期，当前日期的前七天+" "+myDate.getHours()+":"+myDate.getMinutes()
        var myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - sumDates);
        var dateArray = [];
        var dateTemp;
        var flag = 1;
        for (var i = 0; i < sumDates; i++) {
            dateTemp = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
            dateArray.push(dateTemp);
            myDate.setDate(myDate.getDate() + flag);
        };
        if(sumDates==0){
            return [myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()]
        }else{
            return (sumDates==1?[dateArray[0]]:[dateArray[0],dateArray[dateArray.length-1]]);
        };

    },
    //弹出窗
    adalert(text,time,beforeDelay){
        var alertBox=$("#alert-box");
        alertBox.remove()
        var body=$("body");
        var alertHtml='<div id="alert-box"> <span class="alert-text">'+text+'</span></div>';
        body.append(alertHtml);
        $("#alert-box").delay(beforeDelay?beforeDelay:200).fadeIn(120).delay(time?time:1000).fadeOut(400,function(){
            $("#alert-box").remove();
        });
    },
    //验证正整数
    positiveInteger(num){
        return /^[1-9]*[1-9][0-9]*$/.test(num);
    },
    //遍历右侧的列表 得到已筛选的数据条件
    traverseRightList(lis){
        var obj=[];
            document.querySelectorAll("#dim-advanced-3 li").forEach(function(item,index){
                var itemData=item.getAttribute("data-datas");
                    if(itemData)obj=obj.concat(JSON.parse(itemData));
            });
        document.querySelectorAll("#num-advanced-3 li").forEach(function(item,index){
            var itemData=item.getAttribute("data-datas");
            if(itemData)obj=obj.concat(JSON.parse(itemData));
        });
        return obj;
    },
    //全局根据id找对象
    globalfindObj(id){
        var resultObj=null;
        for(var key in originalData.data.data){
            originalData.data.data[key].forEach(function(item,index){
                if(item.uuid==id){
                    resultObj=item;
                };
            });
        };
        return resultObj;
    },
    
    //根据已选的关系值查找已选择的条件
    getConditionByType(itemValue,uuid,relationType) {
        var condition=null;
        var demision = data.originalData.data.data.demision;
        for (var x in demision) {
            if (demision[x].uuid === uuid) {
                condition = {
                    col:demision[x].col,
                    chinese:demision[x].chinese,
                    uuid:uuid,
                    columnType:demision[x].columnType,
                    relation:relationType,
                    val:itemValue
                };
            }
        };
        x=null;
        if(!condition){
            var measures = data.originalData.data.data.measures;
            for(var k in measures){
                if (measures[k].uuid === uuid) {
                    condition = {
                        col:demision[k].col,
                        chinese:demision[k].chinese,
                        uuid:uuid,
                        columnType:demision[k].columnType,
                        relation:relationType,
                        val:itemValue
                    };
                };
            };
        };
        return condition;
    },
    //更新翻页信息
    upDatePageInfo(obj){
        // vm.editListPages.sumPage = obj.sumPage;
        // vm.editListPages.currentPage = obj.currentPage;
        // vm.editListPages.oldCurrentPage = obj.currentPage;
        // vm.editListPages.pageSize = obj.pageSize;
        // vm.editListPages.lastPage = obj.lastPage;
    },
    //对象复制
    objClone(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        // if (obj instanceof Date) {
        //     var copy = new Date();
        //     copy.setTime(obj.getTime());
        //     return copy;
        // }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0,len = obj.length; i < len; ++i) {
                copy[i] = this.objClone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.objClone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },
    exportExcel(tableId){
        tableToExcel(tableId);
    },
    // 表格接口数据请求
    requestTabelDatas(jsonData, pages,callback,isEmit,isLock,requestobj){
        let _this =this;
        data.datas.isLoadingShow = true;
        if(requestobj){

            jsonData.sqlParam.updateMessure = jsonData.sqlParam.columnMessure.concat(jsonData.sqlParam.groupbys);
            jsonData.sqlParam.updateMessure.map((v,i)=>{
                if(v.uuid == requestobj.uuid){
                    v.sortNum = 1;
                }
                else{
                    v.sortNum = (i++)+2;
                }
            });
            jsonData.sqlParam.columnMessure.map((v,i)=>{
                if(v.uuid == requestobj.uuid){
                    jsonData.sqlParam.columnMessure[i] = requestobj;
                }
            })
        }
        if($("#num-advanced-2>li").length== 0){
            data.datas.similarOpts = {};
            data.datas.dateCompare = {};
            
        }
        if(data.datas.dateCompare.hasOwnProperty('compareBegin')){
            jsonData.sqlParam.compareColumn = data.datas.similarOpts;
            jsonData.sqlParam.compareBegin = data.datas.dateCompare.compareBegin;
            jsonData.sqlParam.compareEnd = data.datas.dateCompare.compareEnd;
            jsonData.sqlParam.fromBegin = data.datas.dateCompare.fromBegin;
            jsonData.sqlParam.fromEnd = data.datas.dateCompare.fromEnd;
        }
        if(!pages&&isEmit){
            pages = JSON.stringify(jsonData.pageBean);
        }else if(!pages&&!isEmit){
            pages = JSON.stringify({currentPage:1,
                pageSize:20})
            data.datas.editListPages.currentPage = 1;
        }
        else{
            pages = JSON.stringify(pages);
        }
        $.ajax({
            type : "post",
            url : keyapi+"/query/kylin",
            data : {
                uid: data.datas.tableUid,
                cid: data.datas.requestCid,
                sqlParam:JSON.stringify(jsonData.sqlParam),
                project:data.datas.requestProject,
                pageBean:pages,
                modelID:data.datas.moduleTypeId,
                reportObj:JSON.stringify(data.datas.requestProject)
                
            },
            xhrFields: {
                withCredentials: true
            },
            dataType:"json",
            success : function(res) {
                if(res.status == 1){
                    data.datas.saveTarget = true;
                    data.datas.isLoadingShow = false;  
                    if(isEmit){
                        bus.$emit('defaultLoading',true)
                    }
                    if(callback){
                        _this.columnTotalCallBack(res);
                    }else{
                        data.datas.editTableSumData = res.data;
                        // if(data.datas.chartFirstStep){
                             _this.drawLine(data.datas, $(".page-echart-item")[0],isLock);
                             data.datas.chartFirstStep = false;
                             $(".page-echart-item .chart-graph").hide();
                             if(data.datas.grayImgIndex > 0){
                                 if(data.datas.grayImgIndex>4){
                                    $(".page-echart-item .chart-graph").eq((data.datas.grayImgIndex)-2).show();
                                 }
                                 else if(data.datas.grayImgIndex<4){
                                    $(".page-echart-item .chart-graph").eq((data.datas.grayImgIndex)-1).show();
                                 }
                             }
                        // }
                        //  if($(".dim-datas>li").length == 1 && $(".num-datas>li").length == 1){
                        //     data.datas.echartType = true;
                        // 	}                    
                        let numLastData=jsonData.sqlParam.columnMessure[jsonData.sqlParam.columnMessure.length-1];//数值 新字段
                        let textLastData=jsonData.sqlParam.groupbys[jsonData.sqlParam.groupbys.length-1]; //文本 新字段                    
                            if(numLastData && numLastData.newField){
                                for(let i in arguments){
                                    if(arguments[i]=="addField"){
                                        _this.addNumField(numLastData);//添加数值新字段
                                    };
                                };
                            };
                        }
                    }
                    else if(res.status == 101){
                        location.href = "https://data.banggood.cn";
                    }
                    else{
                        setTimeout(()=>{
                            data.datas.isLoadingShow = false;
                            data.datas.saveTarget = false;
                            Message.error(res.desc)  
                        }, 2000);
                    }
                }
        	});
    },
    //添加数值计算
    addNumField(numLastData){
		let iObj={
        		addition:"",
				aggTypes:["SUM"],
				chinese:numLastData.chinese,
				dimension:false,
				isChecked:false,
				isShow:true,
				relation:["EQUAL","IN"],
				sortType:numLastData.columnType,
				uuid:60000
        	};
    	data.datas.numericalListAry.push(iObj);
    	let li='<li data-dimension="true" data-id="'+iObj.uuid+'">' +
                '<span class="select-name">'+iObj.chinese+'</span>' +
                ' <i class="js-remove fa fa-close"></i>' +
                ' <ul class="drow-down-ul drow-down-ul-one">'+
                '	<li data-val="SUM"><a href="javascript:;">求和</a></li>'+
                '	<li data-val="AVG"><a href="javascript:;">平均值</a></li>'+
                '	<li data-val="MAX"><a href="javascript:;">最大值</a></li>'+
                '	<li data-val="MIN"><a href="javascript:;">最小值</a></li>'+
                '   <li data-val="COUNTDISTINCT"><a href="javascript:;">去重计数</a></li>'+
                /*'	<li data-val="isDistinct"><a href="javascript:;">去重</a></li>'+*/
                '	<li data-val="COUNT"><a href="javascript:;">计数</a></li>'+
                '	<li data-val="isPercent"><a href="javascript:;">百分比</a></li>'+
                // '	<li data-val="HighCal"><a href="javascript:;">高级计算</a></li>'+
                // '       <ul class="drow-down-ul drow-down-ul-two">'+
                // '			<li data-val="similarity"><a href="javascript:;">同比</a></li>'+
                // // '			<li data-val="ASC"><a href="javascript:;">升序</a></li>'+
                // '		</ul>'+
                '	<li data-val="DEFAULT" class="next-level"><a href="javascript:;">设置排序</a>'+
                '		<ul class="drow-down-ul drow-down-ul-two">'+
                '			<li data-val="DEFAULT"><a href="javascript:;">默认</a></li>'+
                '			<li data-val="ASC"><a href="javascript:;">升序</a></li>'+
                '			<li data-val="DESC"><a href="javascript:;">降序</a></li>'+
                '		</ul>'+
                '	</li>'+
                '</ul>';
            '</li>';
            $("#num-advanced-2").append(li);
    },
    drawLine(alldatas, chartDom, isLock){
        var echartdata;
        if(alldatas.hasOwnProperty('editTableSumData')){
            echartdata = alldatas.editTableSumData['result'];
        }else{
            return false;
        }
        if(!chartDom){
            return;
        }
        var selectdom = chartDom.querySelectorAll('.chart-graph');
        // 基于准备好的dom，初始化echarts实例
        // if (echarts != null && echarts != "" && echarts != undefined) {  
        //     echarts.dispose(selectdom[0]);
        //     echarts.dispose(selectdom[1]);  
        //     echarts.dispose(selectdom[2]);    
        // }  
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
        // 折线图
        myChart.line.setOption({
            // title: { text: 'echarts' },
            tooltip: {
                show:data.datas.myChartOption.line.showTooltip,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                show:data.datas.myChartOption.line.showLegend,
                data:_this.getLegend(alldatas)
            },
            xAxis: {
                show:data.datas.myChartOption.line.showX,
                data: xAria
            },
            yAxis: {
                show:data.datas.myChartOption.line.showY,
                name:data.datas.myChartOption.line.name,
                nameRotate:90,
                nameLocation:'middle',
                nameGap:80
            },
            series: _this.getSeries(alldatas,echartdata,'line')
        },true);
        // 树状图
        var setBarOption = {
            // title: { text: 'echarts' },
            tooltip: {
                show:data.datas.myChartOption.bar.showTooltip,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend:{
                show:data.datas.myChartOption.bar.showLegend,
                data:_this.getLegend(alldatas)
            },
            xAxis: {
                show:data.datas.myChartOption.bar.showX,
                data: xAria
            },
            yAxis: {
                show:data.datas.myChartOption.bar.showY,
                name:data.datas.myChartOption.bar.name,
                nameRotate:90,
                nameLocation:'middle',
                nameGap:80
            },
            series: _this.getSeries(alldatas,echartdata,'bar')
        };
        if(data.datas.myChartOption.bar.showReverseBar || data.datas.myChartOption.bar.showReverseStackedPlot){
            var options = setBarOption.xAxis.data;
            delete setBarOption.xAxis.data;
            setBarOption.yAxis['data'] = options;
        }
        myChart.bar.setOption(setBarOption,true);
        // 饼图
        if(data.datas.myChartOption.pie.showEntries && data.datas.myChartOption.pie.showEntries>0){
            zAria = zAria.slice(0,data.datas.myChartOption.pie.showEntries)
        }
        var setPieSeries = {
            name: alldatas.editTableSumData.metas[0].chinese,
            type: 'pie',
            radius: '50%',
            data:zAria,
            itemStyle:{ normal: {label : {show: data.datas.myChartOption.pie.showTag}}},
            labelLine: {
                normal: {
                    show: data.datas.myChartOption.pie.showTag
                }
            }
        };
        if(data.datas.myChartOption.pie.showRadius){
            setPieSeries.radius = ['50%','70%'];
        }
        myChart.pie.setOption({
            // title:{ text: 'echarts-pie' },
            tooltip: {
                show:data.datas.myChartOption.pie.showTooltip,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend:{
                show:data.datas.myChartOption.pie.showLegend,
                data:_this.getLegend(alldatas)
            },
            series : [
                setPieSeries
            ]
        },true);
        // 雷达图
        var setradarMapSeriesIndicator = [];
        var loopMessureIndex = this.loopMessureDimenssion().length;
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
                setradarMapSeriesData[_i].name = this.loopMessureDimenssion()[_i].chinese;
                setradarMapSeriesData[_i].value.push(arr[_i]);
                setradarMapLegendData[_i] =  this.loopMessureDimenssion()[_i].chinese;
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
                myChart.radarMap.resize();
            }
        })
        if(isLock || lock){
            lock = false;
            myChart.bar.on('click', function (params) {
                _this.clickMyChart(alldatas,params);
            });
            myChart.line.on('click', function (params) {
                _this.clickMyChart(alldatas,params);
            });
            myChart.pie.on('click', function (params) {
                _this.clickMyChart(alldatas,params);
            });
        }   
    },    
    clickMyChart(alldatas,params){
        var _this =this;
        if(!data.datas.isDrill)return false;
        var uuid = alldatas.editTableSumData.metas[0].uuid;
        var item = params.name;
        if(!item) return false;
        var obj = {item,uuid};
        data.datas.showDrillDown = true;
        data.datas.drillNavData.push(obj);
        let drillCondition = _this.getDrillDownCondition(item,uuid);
        data.datas.rightListConditions.conditions.push(drillCondition);
        data.datas.currentDrillDownUuid = uuid;
        _this.regenerateTabel(false);
        var drillNavDataLength = data.datas.drillNavData.length;
        var drawBackDrillIndex = _this.drawBackDrill().length;
        if((drillNavDataLength+1) >= drawBackDrillIndex){
            data.datas.isDrill = false;
        } 
    },
    getLegend(alldatas){
        var legendArr = alldatas.editTableSumData.metas;
        var resultArr = [];
        legendArr.forEach(item =>{
            resultArr.push(item.chinese);
        })
        return resultArr;
    },
    getSeries(alldatas,echartdata,str){
        if(echartdata.length == 0){
            return false;
        }
        var loopMessureIndex = this.loopMessureDimenssion().length;
        var index = echartdata[0].length;
        let series = [];
        for(let i = (index-loopMessureIndex);i < index; i++){
            let yAria = [];
            echartdata.map((v,_i)=>{
                yAria.push(v[i])
            })
            var obj = {
                name: alldatas.editTableSumData.metas[i].chinese,
                type: str,
                data: yAria,
                itemStyle:{ normal: {label : {show: data.datas.myChartOption[str].showTag, position: 'top'}}}
            }
            // 折线图
            if(str == 'line'){
                if(data.datas.myChartOption.line.showLine){
                    if(obj.hasOwnProperty('smooth')){
                        delete obj.smooth
                    }
                    if(obj.hasOwnProperty('areaStyle')){
                        delete obj.areaStyle
                    }
                }
                if(data.datas.myChartOption.line.showSmooth){
                    if(obj.hasOwnProperty('areaStyle')){
                        delete obj.areaStyle
                    }
                    obj.smooth = true;
                }
                if(data.datas.myChartOption.line.showArea){
                    obj.areaStyle = {normal: {}};
                    if(obj.hasOwnProperty('smooth')){
                        delete obj.smooth
                    }
                }
            }
            // 柱状图
            if(str == 'bar'){
                if(data.datas.myChartOption.bar.showStackedPlot || data.datas.myChartOption.bar.showReverseStackedPlot){
                    obj.stack='总量';
                    obj.itemStyle.normal.label.position = 'inside';
                }
                if(data.datas.myChartOption.bar.showReverseBar){
                    obj.itemStyle.normal.label.position = 'right';
                }
            }
            series.push(obj);
        }
        return series 
    },
    //列总计请求数据回调函数
    columnTotalCallBack(result){
        let _this = this;
        data.datas.tableFootTotalAry=[];
        data.datas.editTableSumData.metas.forEach(function(item,index){
            var iAry={};
            result.data.metas.forEach(function(i,k){
                if(i.uuid==item.uuid){
                    iAry.total=result.data.result[0][k];
                    iAry.uuid= i.uuid;
                };
            });
            data.datas.tableFootTotalAry.push(iAry);
        });
        if(data.datas.tableCalculateData.totalChartAll){
            setTimeout(_=>{
                _this.tablesMerge();
            },200)
        }
    },   
    // 刷新表格数据操作
    regenerateTabel(isDrawBack,isEmit,isLock,requestobj){
        let _this = this;
        var columnMessures= _this.loopMessureDimenssion(requestobj);//获得数值的条件
        var groups=[];
        if(isDrawBack){
            groups = _this.drawBackDrill();
        }else{
            if(data.datas.showDrillDown) {
                groups= _this.loopDrillDimenssion();
            }else{
                groups= _this.loopNormalDimenssion(requestobj);//获得维度的条件
            };
        };
        var queryObj={
            columnMessure:columnMessures,
            groupbys:groups,
            tableName:'kylin_sales',
            conditions:data.datas.rightListConditions.conditions,
            conditionMap:data.datas.conditionMap
        };
        //当没有条件时函数返回;
        if(!groups.length && !columnMessures.length){
            data.datas.editTableSumData=[];
            return false;
        };
        var requestObject={
            sqlParam:queryObj,
            pageBean:data.datas.editListPages,
            project:data.datas.requestProject
        };
        // pubMethod.requestTabelDatas(_this.datas.saveKylinInfo);
        data.datas.tableRequestObject=requestObject;
        //数据请求
        // data.datas.saveKylinInfo.sqlParam = requestObject;
        if(data.datas.saveKylinInfo.sqlParam){
            data.datas.saveKylinInfo = requestObject;
            this.requestTabelDatas(data.datas.saveKylinInfo,null,null,isEmit,isLock,requestobj);
        }
        else{
            this.requestTabelDatas(requestObject,null,null,isEmit,isLock,requestobj);
        }
        
    },
    loopDrillDimenssion() {
        var groups =[];
        var demisions = data.originalData.data.data['demision'];
        var find=false;
        $("#dim-advanced-4>li").each(function(index,item){
            var data_id=$(item).attr("data-id");
            if(data.datas.currentDrillDownUuid==null)
            {
                find=true;
            };
            
            if(find) {
                for (var x in demisions) {
                    if (demisions[x].uuid === data_id) {
    
                        var sortType="DEFAULT";
                        if(data.datas.aggregationConditionNum[data_id]){
                            sortType=data.datas.aggregationConditionNum[data_id].sortord;
                        };
                        var groupByCol = {
                                col:demisions[x].columnType,
                                chinese:demisions[x].chinese,
                                uuid:data_id,
                                sortType:sortType,
                                isMaxMin:demisions[x].isMaxMin
                            };
                            groups.forEach(function(item,index){
                                if(item.uuid==data_id)groups.splice(index,1);
                            });
                            groups.push(groupByCol);
                            break;
                    };
                };
            }
            if(data_id==data.datas.currentDrillDownUuid ){
                find=true;
            }
        });
        return groups;
    },
    loopNormalDimenssion(dimobj) {//获得维度的条件的方法
        var groups =[];
        var demisions = data.originalData.data.data.demision;
        var numLiLen=$("#num-advanced-2>li").length;
        $("#dim-advanced-2>li").each(function(index,item){
            var data_id=$(item).attr("data-id");
            var isMaxMinBlean=!!(numLiLen && index==0);
            for (var x in demisions) {
                if (demisions[x].uuid === data_id) {
                    // var sortType="DEFAULT";
                    // if(data.datas.aggregationConditionDim && data.datas.aggregationConditionDim[data_id]){
                    //     sortType=data.datas.aggregationConditionDim[data_id].sortord;
                    // };
                    var groupByCol = {
                            col:demisions[x].columnType,
                            sortType:demisions[x].sortType,
                            //agg:"SUM",
                            chinese:demisions[x].chinese,
                            isMaxMin:isMaxMinBlean,
                            uuid:data_id
                        };
                    groups.forEach(function(item,index){
                        if(item.uuid==data_id)groups.splice(index,1);
                    });
                    groups.push(groupByCol);
                    break;
                };
            };
        });
        return groups;
    },
    loopMessureDimenssion(requestobj) {//获取数值的条件
        var columnMessures=[];
        $("#num-advanced-2>li").each(function (index,item) {
            var data_id=$(this).attr("data-id");
            var measures = data.originalData.data.data.measures;
            for (var x in measures) {
                if (measures[x].uuid === data_id ) {
                    var aggField= measures[x].aggTypes[0];
                    //currentNumUuid==data_id && data.datas.aggregationConditionNum[data_id]
                    // if(data.datas.aggregationConditionNum && data.datas.aggregationConditionNum[data_id]){
                    //     aggField=data.datas.aggregationConditionNum[data_id].agg;
                    // };
                    // 每次计数赋值datas.datas.queryInfo
                    if(data.datas.queryInfo.avgType!=null && data.datas.queryInfo.avgType.uuid==data_id){
                        var aggType=null;
                        var aggItemArray=data.datas.queryInfo.avgType.options;
                        for(var key in aggItemArray){
                            if(aggItemArray[key].selected==true){
                                aggType=aggItemArray[key].value;
                                break;
                            };
                        };
                        var sortType="DEFAULT";
                        if(data.datas.aggregationConditionNum && data.datas.aggregationConditionNum[data_id]){
                            sortType=data.datas.aggregationConditionNum[data_id].sortord;
                        };
                        var columnMessure;
                        columnMessure = {
                                col:measures[x].col,
                                agg:measures[x].aggTypes[0],
                                sortType:measures[x].sortType,
                                //isPercent:data.datas.aggregationConditionNum.isPercent?true:false,
                                aggTypes:measures[x].aggTypes,
                                chinese:measures[x].chinese,
                                uuid:data_id
                            };
                        var hasItem=false;
                        columnMessures.forEach(function(item,index){
                            if(item.uuid==data_id){
                                hasItem=true;
                            };
                        });
                        if(!hasItem)columnMessures.push(columnMessure);
                    }else{
                        var percent=false;//百分比默认为false；
                        if(data.datas.aggregationConditionNum[data_id] && data.datas.aggregationConditionNum[data_id].isPercent){//当前字段百分比设置为true
                            percent=true;
                        };

                        var isDistinct=false;//去重默认为false；
                        if(data.datas.aggregationConditionNum[data_id] && data.datas.aggregationConditionNum[data_id].isDistinct){//当前字段百分比设置为true
                            isDistinct=true;
                        };
                        if(data.datas.aggregationConditionNum && data.datas.aggregationConditionNum[data_id]){
                            sortType=data.datas.aggregationConditionNum[data_id].sortord;
                        };
                        // if(percent){
                            // aggField= 'SUM';
                        // }
                        // else aggField= data.datas.aggregationConditionNum[data_id]?data.datas.aggregationConditionNum[data_id].agg:'SUM';
                        var columnMessure;
                        if(!measures[x].hasOwnProperty('ishide')){
                            columnMessure = {
                                col:measures[x].col,
                                agg:measures[x].aggTypes[0],
                                // sortType:data.datas.aggregationConditionNum[data_id]?data.datas.aggregationConditionNum[data_id].sortord:"DEFAULT",
                                sortType:measures[x].sortType,
                                isDistinct:isDistinct,
                                isPercent:percent,
                                aggTypes:measures[x].aggTypes,
                                chinese:measures[x].chinese,
                                isCompare:measures[x].isCompare,
                                uuid:data_id
                            }
                        }else{
                            columnMessure = {
                                agg:measures[x].aggTypes[0],
                                chinese:measures[x].chinese,
                                uuid:data_id,
                                newField:data_id,
                                'columnType': 'NUMBER'
                            };
                        }
                        var hasItem=false;
                        columnMessures.forEach(function(item,index){
                            if(item.uuid==data_id){
                                hasItem=true;
                            };
                        });
                        if(!hasItem)columnMessures.push(columnMessure);
                    }
                }
            }
            x=null;
        });
        var cloneColumnMessures=[];
        columnMessures.forEach(function(item,index){
            cloneColumnMessures.push(item);
        });

        cloneColumnMessures.forEach(function(item,index){//数值条件去重
            var itemUuid=item.uuid;
            var iLen=0;//记录重复的item
            columnMessures.forEach(function(o,i){
                if(o.uuid==itemUuid){
                    iLen+=1;
                    if(iLen>1)columnMessures.splice(i,1);
                };
            });
        });
        // console.log(columnMessures)
        return columnMessures;
    },
    drawBackDrill() {//获得钻取的条件
        var groups =[];
        data.datas.isDrawBack=false;
        var demisions = data.originalData.data.data.demision;
        var find=false;
        $("#dim-advanced-4>li").each(function(index,item) {
            var data_id=$(item).attr("data-id");
    
            if(data.datas.drawBackUuid==null){
                find=true;
            };
    
            if(find){
                for (var x in demisions){
                    if (demisions[x].uuid === data_id) {
                        var groupByCol = {
                            col:demisions[x].columnType,
                            chinese:demisions[x].chinese,
                            uuid:data_id,
                            isMaxMin:demisions[x].isMaxMin
                        };
                        groups.forEach(function(item,index){
                            if(item.uuid==data_id)groups.splice(index,1);
                        });
                        groups.push(groupByCol);
                        break;
                    };
                };
            }
    
            if(data.datas.drawBackUuid==data_id)
            {
                find=true;
            }
        });
        return groups;
    },
    //保存已选择的条件
    saveConditionInfo(uuid) {
        let objItem = this.globalfindObj(uuid);
        var conditionInfo=new Object();
            conditionInfo.columnType=objItem.columnType;
            conditionInfo.chinese=objItem.chinese;
            conditionInfo.isShow=true;
            conditionInfo.uuid = '';
            conditionInfo.val = null;
        if(objItem.columnType=="DATE" || objItem.columnType=="DATETIME")
        {
            var obj=new Object();
            obj.begin="";
            obj.end="";
            conditionInfo.data=obj;
            conditionInfo.relation = null;
            conditionInfo.interval = {
                dateStart: null,
                dateEnd: null
            }
            if(objItem.isMandatory){
                conditionInfo.isMandatory = objItem.isMandatory;
                conditionInfo.val = objItem.val;
            }
            data.datas.conditionMap[uuid]=conditionInfo;
        }else if(objItem.columnType=="STRING")
        {
            var dataArray=[];

            for(var key in objItem.addition.data)
            {
                var obj=new Object();
                obj.isShow=true,
                    obj.isChecked=false,
                    obj.name=objItem.addition.data[key];
                dataArray.push(obj);
            };
            conditionInfo.data=dataArray;
            conditionInfo.rightStringRadio=data.datas.rightStringRadio;
            conditionInfo.relation = 'IN';
            if(objItem.isMandatory){
                conditionInfo.isMandatory = objItem.isMandatory;
                conditionInfo.val = objItem.val;
            }
            data.datas.conditionMap[uuid]=conditionInfo;
        }else if(objItem.columnType=="NUMBER"){
            var obj=new Object();
            obj.maxVal=1;
            obj.minVal=0;
            obj.initMM=false;
            obj.enterNumber=0;
            obj.initSingle=false;
            obj.relation="LESS";
            conditionInfo.data=obj;
            conditionInfo.defaultSelect=0;
            conditionInfo.relation = null;
            conditionInfo.interval = {
                start:null,
                end:null
            }
            // conditionInfo.relation = {
            //     value:'LESS',
            //     value:'LARGE',
            //     value:'EQUAL',
            //     value:'NOTEQUAL',
            //     value:'LARGEEQUAL',
            //     value:'LESSEQUAL',
            // };
            data.datas.conditionMap[uuid]=conditionInfo;
        };
    },
    // 获取column name
    getColName(id){
        var colName=null;
        for(var i in data.originalData.data.data){
            data.originalData.data.data[i].forEach(function(item,index){
                if(item.uuid==id)colName=item.column;
            });
        };
        return colName;
    },
    //全局根据id找对象
    globalfindObj(id){
        var resultObj=null;
        for(var key in data.originalData.data.data){
            data.originalData.data.data[key].forEach(function(item,index){
                if(item.uuid==id){
                    resultObj=item;
                };
            });
        };
        return resultObj;
    },
    getDrillDownCondition(itemValue,uuid){
        var demision = data.originalData.data.data.demision;
        for (var x in demision){
            if (demision[x].uuid === uuid) {
                var condition = {
                    col:demision[x].col,
                    chinese:demision[x].chinese,
                    uuid:uuid,
                    columnType:demision[x].columnType,
                    relation:'EQUAL',
                    val:itemValue
                };
                return condition;
            }
        }
    },
    formatDate(date) {  
        var y = new Date(date).getFullYear();  
        var m = new Date(date).getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = new Date(date).getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + '-' + m + '-' + d;  
    },
    //合并单元格
    tablesMerge(){
        var listTable=$("#list-table");
        var tabelCols=$("#list-table tr:first-child td");
        var colsAry=[];
        tabelCols.each(function(index,item){
            colsAry.push(index);
        });
        listTable.tablesMergeCell({
            cols: colsAry
        });
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
    // add function 
}
    let tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="Content-Type" charset=utf-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g,
            function(m, p) { return c[p]; }) }
        return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        window.location.href = uri + base64(format(template, ctx))
        }
    })()
export  {
    pubMethod
}
bus.$on('islock',data=>{
    lock  = true;
})