<template>
<div>
   <div class="string-modal querymodel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-type="STRING" v-if="queryType.name=='STRING'" :data-id="modalUuid">
        <div role="document">
            <div class="modal-body">
                <div class="clearfix">
                    <div class="col-sm-7">
                        <div class="screen-item">
                            <label for="list-screen" class="radio-inline">
                                <!-- <input type="radio" name="screen-select" id="list-screen" checked value="list">列表筛选 -->
                            </label>
                        </div>
                        <div class="left-search input-group screen-search" >
                            <Input v-model="datas.rightStringSearchKey" placeholder="搜索关键词" @on-focus="modalStringSearchList()" @on-change="modalStringSearchList()"></Input>
                            <!-- <input type="text" placeholder="搜索关键词" class="form-control" id="string-screen-search" v-model="datas.rightStringSearchKey" /> -->
                            <!-- <span class="input-group-addon btn-warning">
                                <i class="fa fa-search"></i>
                            </span> -->
                        </div>
                        <div class="screen-list">
                            <ul class="list-group list-group-cover">
                                <li v-for="(item,index) in datas.rightStringDatas" :key="item.id"  v-if="item.isShow" >
                                    <label class="checkbox-inline" v-if="datas.rightStringDatas.length>0">
                                        <input type="checkbox" :checked="item.isChecked" @click="stringListChecked(item)">{{ item.name }}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <p style="margin-top:35px;"><span>包含以下选项</span> </p></br>
                        <div class="contains-screen">
                            <dl class="dl-horizontal">
                                <dt>所选字段包含：</dt>
                                <dd>
                                    <template v-for="(item,index) in datas.rightStringDatas" v-if="item.isChecked">
                                        {{ item.name }}
                                        <template>，</template>
                                    </template>
                                    <!--<template v-if="datas.rightStringDatas.length>5">
                                        ...等 {{ datas.rightStringDatas.length }} 项
                                    </template>-->
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="total-data pull-left">
                    <dl class="dl-horizontal">
                        <dt>数据</dt>
                        <dd>
                            <label class="checkbox-inline">
                                <input type="radio" name="in-select" :checked="datas.rightStringRadio==0" id="select-checkbox-1" value="All" @click="stringCheckAll($event)"> 全选
                            </label>
                            <label class="checkbox-inline">
                                <input type="radio" name="in-select" :checked="datas.rightStringRadio==1" id="select-checkbox-2" value="NOTIN" @click="ruleOutCheck()"> 排除
                            </label>
                            <label class="checkbox-inline">
                                <input type="radio" name="in-select" :checked="datas.rightStringRadio==2" id="select-checkbox-3" value="IN" @click="includeCheck()"> 包含
                            </label>
                        </dd>
                    </dl>
                </div>
                <el-button @click="cancelModel">取消</el-button>
                <el-button type="primary" @click="stringModalSure">确认</el-button>
            </div>
        </div>
    </div>
    <!--NUMBER Modal-->
    <div class="number-modal numbermodel" tabindex="-1" role="dialog" data-type="NUMBER" v-if="queryType.name=='NUMBER'" :data-id="modalUuid">
        <div  role="document">
            <div class="modal-body">
                <div class="clearfix">
                    <div class="col-sm-10" style="padding-top: 20px;">
                        <div class="number-select">
                            <dl class="dl-horizontal">
                                <dt>满足</dt>
                                <dd>
                                    <ul class="list-inline">
                                        <li>
                                            <select name="" id="select-num-options" class="form-control" @change="changeNumberselect($event)">
                                                <option value="LESSANDLARGE" :selected="datas.rightNumberDatas.defaultSelect==0">区间</option>
                                                <option value="LARGE" :selected="datas.rightNumberDatas.defaultSelect==1">大于</option>
                                                <option value="LESS" :selected="datas.rightNumberDatas.defaultSelect==2">小于</option>
                                                <option value="EQUAL" :selected="datas.rightNumberDatas.defaultSelect==3">等于</option>
                                                <option value="NOTEQUAL" :selected="datas.rightNumberDatas.defaultSelect==4">不等于</option>
                                                <option value="LARGEEQUAL" :selected="datas.rightNumberDatas.defaultSelect==5">大于等于</option>
                                                <option value="LESSEQUAL" :selected="datas.rightNumberDatas.defaultSelect==6">小于等于</option>
                                            </select>
                                        </li>
                                        <template v-if="!datas.rightNumberDatas.isSelectNumber||datas.rightNumberDatas.defaultSelect==0">
                                            <li>
                                                <input type="text" class="form-control number-begin" v-model="datas.rightNumberDatas.minNumber" placeholder="填正整数" @input="inputMinNumFn">
                                            </li>
                                            <li>至</li>
                                            <li>
                                                <input type="text" class="form-control number-end" v-model="datas.rightNumberDatas.maxNumber" placeholder="填正整数" @input="inputMaxNumFn">
                                            </li>
                                        </template>

                                        <li v-if="datas.rightNumberDatas.defaultSelect||datas.rightNumberDatas.defaultSelect>0">
                                            <input type="text" class="form-control number-enter" v-model="datas.rightNumberDatas.enterNumbers" placeholder="填正整数" @input="enterNumbersFn">
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <el-button @click="cancelModel">取消</el-button>
                <el-button type="primary" @click="numberModalSure">确认</el-button>
            </div>
        </div>
    </div>
    <!-- DATE Modal -->
    <div class="date-modal datemodel" tabindex="-1" role="dialog" data-type="DATE" v-if="queryType.name=='DATE'||queryType.name=='DATETIME'" :data-id="modalUuid">
        <div role="document">
            <div class="modal-body">
                <div class="clearfix">
                    <div class="col-xs-6 col-xs-offset-3">
                        <div class="begin-time">
                            <ul class="list-inline">
                                <li class="lea">开始时间：</li>
                                    <el-date-picker v-model="datas.rightDateDatas.begin" type="date" placeholder="请选择开始日期"   default-value="2017-10-01"></el-date-picker>
                            </ul>
                        </div>
                        <div class="end-time">
                            <ul class="list-inline">
                                <li class="">结束时间：</li>
                                    <el-date-picker v-model="datas.rightDateDatas.end" type="date" placeholder="请选择结束日期" ></el-date-picker>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <el-button @click="cancelModel">取消</el-button>
                <el-button type="primary" @click="dateModalSure">确认</el-button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import datas from './../../../config/datas';
import { pubMethod } from './../../../config/public';
import { DatePicker, Button } from 'element-ui';
import keyapi from './../../../data/tempApi';
import moment from 'moment';
export default {
    data() {
        return{
            datas: datas.datas,
            queryType:[],
            modalUuid:null,
            rightStringSearchKey:null,
            cancelBtn:$(".notify").eq(2).attr('id'),
            orderTypes: ['区间','大于','小于','等于','不等于','大于等于','小于等于'],
            searchBase: ''
        }
    },
    mounted() {
        this.queryType = this.$parent.coverQuery.query;
        this.modalUuid = this.queryType.uuid;
        this.datas.rightStringSearchKey = this.datas.conditionMap[this.modalUuid].searchStr;
        this.searchBase = this.datas.conditionMap[this.modalUuid].searchBase;
        this.mandatory();
    },
    methods: {
        mandatory(){
            let _this = this;
            if(_this.queryType.isMandatory && _this.queryType.name == 'DATE'){
                _this.datas.rightDateDatas.begin  = moment().subtract(1,'days').format('YYYY-MM-DD');
                _this.datas.rightDateDatas.end = moment().format('YYYY-MM-DD');
            }
            else if(_this.queryType.isMandatory && _this.queryType.name == 'STRING'){
                let isArr = _this.queryType.iscolumnVal.split(',');
                _this.datas.rightStringDatas.map(v=>{
                    isArr.map((v_m,v_i)=>{
                        if(v_m == v.name){
                            _this.$set(_this.datas.rightStringDatas[v_i],'isChecked',true);
                        }
                    })
                })

            }
        },
        modalStringSearchList(){
            let _this=this;
            $.ajax({
                type : "post",
                url:keyapi+'/fuzzy/search',
                data:{
                    modelID:_this.datas.moduleTypeId,
                    uuid:_this.queryType.uuid,
                    key:_this.datas.rightStringSearchKey || '',
                    searchBase: _this.searchBase
                },
                xhrFields: {
                    withCredentials: true
                },
                dataType:"json",
                success:function(res){
                    if(res.status == 1){
                        _this.datas.rightStringDatas = [];
                        res.data.forEach((item,_indx) =>{
                            _this.datas.rightStringDatas.push({name:item,isChecked:false,isShow:true})
                        })
                    }else{
                        _this.$Message.error({content: '接口错误,请与相应开发人员联系',duration: 2,closable: true})
                    }
                },
                error:function(e){
                    _this.$Message.error({content: '接口错误,请与相应开发人员联系',duration: 2,closable: true})
                }
            })
        },
        //string 类型列表选择
        stringListChecked(item){
            item.isChecked = !item.isChecked
            // let uuid= _this.queryType.uuid;
            // if(_this.datas.conditionMap[uuid])
            // {
            //     var dataArray=_this.datas.conditionMap[uuid].data;
            //     for(var key in dataArray)
            //     {
            //         var obj=dataArray[key];
            //         if(obj.name==item.name)
            //         {
            //             if(obj.isChecked)
            //             {
            //                 obj.isChecked=false;
            //             }else{
            //                 obj.isChecked=true;
            //             }

            //         }
            //     }
            // }
        },
        selectContains(index){//STRING类型左侧包含
            var _this=this;
            _this.datas.showModalData.STRING[index].rightRelationName='包含';
            _this.datas.showModalData.STRING[index].selectRelation='IN';
        },
        selectRuleOut(index){//STRING类型左侧排除
            var _this=this;
            _this.datas.showModalData.STRING[index].rightRelationName='排除';
            _this.datas.showModalData.STRING[index].selectRelation='NOTIN';
        },
        includeCheck(){
            var _this=this;
            // _this.datas.rightStringDatas.forEach(function(item,index){
            //     _this.$set(item,"isChecked",false);
            // });
            _this.datas.rightStringRadio=2;
        },
        ruleOutCheck(){
            var _this=this;
            _this.datas.rightStringDatas.forEach(function(item,index){
                _this.$set(item,"isChecked",false);
            });
            _this.datas.rightStringRadio=1;
        },
        stringCheckAll(ev){
            var _this=this;
            var elVal=ev.target.checked;
            if(elVal){
                _this.datas.rightStringDatas.forEach(function(item,index){
                    _this.$set(item,"isChecked",true);
                })
            }else {
                _this.datas.rightStringDatas.forEach(function(item,index){
                    _this.$set(item,"isChecked",false);
                })
            };
            _this.datas.rightStringRadio=0;
        },
        cancelModel(){
            var index = $(".notify").eq(2).attr('id');
            this.$layer.close(index);
        },
        dateModalSure(index){//DATE类型确定
            let _this = this;
            let start = _this.datas.rightDateDatas.begin;
            let end = _this.datas.rightDateDatas.end;
            if(!start || !end){
                _this.$Message.error({
                    content:'请选择开始或结束时间',
                    duration:5,
                    closable:true
                })
                return false;
            }
            let modal = $(".date-modal");
            let beginDate= pubMethod.formatDate(start);
            let endDate= pubMethod.formatDate(end);
            let uuid=modal.attr("data-id");
            if(beginDate.trim().length<1 || endDate.trim().length<1)
            {
                adalert("必须输入开始和结束时间");
                return;
            }
            var conditionInfo=_this.datas.conditionMap[uuid];
                conditionInfo.val = [beginDate,endDate]
                $('#dim-advanced-3').find(`li[data-id=${uuid}]`).find('.shortcut-date').each((_i,_item)=>{
                    var str = $(_item).attr('data-time')
                    if(conditionInfo.val.join(',') == str){
                        $(_item).addClass('shortcut-date-active').siblings().removeClass('shortcut-date-active');
                    }
                })
            _this.datas.rightDateDatas=conditionInfo.data;
          	pubMethod.removeOldCondition(uuid);
            var bcondition=pubMethod.getConditionByType(beginDate,uuid,'LARGEEQUAL');
            var econdition=pubMethod.getConditionByType(endDate,uuid,'LESSEQUAL');
	            _this.datas.rightListConditions.conditions.push(bcondition);
	            _this.datas.rightListConditions.conditions.push(econdition);
                pubMethod.regenerateTabel(false);
                _this.$layer.close(_this.cancelBtn);
        },
        numberModalSure(){//NUMBER类型modal确定

            var _this=this;
            var stringModal=$(".number-modal");
            var uuid = stringModal.attr("data-id");
            var selectVal=$("#select-num-options").val();
            var conditionInfo= _this.datas.conditionMap[uuid];
            pubMethod.removeOldCondition(uuid);
            var maxCondition,minCondition,liHtml;
            liHtml = '';
            if(_this.datas.rightNumberDatas.defaultSelect>0){
                var numberEnterVal=$(".number-enter").val();

                conditionInfo.data.enterNumber=numberEnterVal;
                conditionInfo.data.initSingle=true;
                conditionInfo.relation = selectVal;
                conditionInfo.val = numberEnterVal*1;
                var condition=null;
                if(selectVal=="LARGE")
                {
                    conditionInfo.defaultSelect=1;

                    condition= pubMethod.getConditionByType(numberEnterVal,uuid,"LARGE");
                }else if(selectVal=="LESS")
                {
                    conditionInfo.defaultSelect=2;
                    condition= pubMethod.getConditionByType(numberEnterVal,uuid,"LESS");
                }else if(selectVal=="EQUAL")
                {
                    conditionInfo.defaultSelect=3;
                    condition= pubMethod.getConditionByType(numberEnterVal,uuid,"EQUAL");
                }else if(selectVal=="NOTEQUAL")
                {
                    conditionInfo.defaultSelect=4;
                    condition= pubMethod.getConditionByType(numberEnterVal,uuid,"NOTEQUAL");
                }else if(selectVal=="LARGEEQUAL")
                {
                    conditionInfo.defaultSelect=5;
                    condition= pubMethod.getConditionByType(numberEnterVal,uuid,"LARGEEQUAL");
                }else if(selectVal=="LESSEQUAL"){
                    conditionInfo.defaultSelect=6;
                    condition= pubMethod.getConditionByType(numberEnterVal,uuid,"LESSEQUAL");
                }

                if(condition)
                {
                    _this.datas.rightListConditions.conditions.push(condition);
                }
                liHtml = `<ul class="filter-select"><li>${this.orderTypes[conditionInfo.defaultSelect]}<i>${numberEnterVal}</i></li></ul>`
                pubMethod.regenerateTabel(false);
            }else {
                conditionInfo.defaultSelect=0;
                var minVal=$(".number-begin").val();
                var maxVal=$(".number-end").val();
                conditionInfo.data.initMM=true;

                conditionInfo.data.maxVal=maxVal;
                conditionInfo.data.minVal=minVal;
                conditionInfo.relation = 'LESSANDLARGE';
                if(selectVal=="LESSANDLARGE")
                {
                    maxCondition= pubMethod.getConditionByType(maxVal,uuid,"LESSEQUAL");
                    minCondition= pubMethod.getConditionByType(minVal,uuid,"LARGEEQUAL");
                    _this.datas.rightListConditions.conditions.push(maxCondition);
                    _this.datas.rightListConditions.conditions.push(minCondition);
                }
                pubMethod.regenerateTabel(false);
                conditionInfo.interval = {
                    start:parseInt(minVal),
                    end:parseInt(maxVal)
                }
                // conditionInfo.val =[minVal,maxVal]
                liHtml = `<ul class="filter-select"><li>${this.orderTypes[conditionInfo.defaultSelect]}<i>${minVal}</i>~<i>${maxVal}</i></li></ul>`
            }
            if($('#dim-advanced-3').find(`li[data-id=${uuid}]`).find('ul')){
                $('#dim-advanced-3').find(`li[data-id=${uuid}]`).find('ul').remove();
            }
            $('#dim-advanced-3').find(`li[data-id=${uuid}]`).append(liHtml)
            _this.$layer.close(_this.cancelBtn);
        },
        stringModalSure(){//string类型确定
            let stringModal=$(".string-modal");
            let _this=this;
            let selectedData="";
            let checkedItem=$(".modal-footer [type='radio']:checked");

            let uuid=stringModal.attr("data-id");
            //pubMethod.bootstrapModal.call(stringModal,'hide');
            var conditionInfo = _this.datas.conditionMap[uuid];
            // _this.datas.rightStringRadio = 1;
            _this.datas.rightStringDatas.forEach(function(item,index){
                // if(checkedItem.val().toUpperCase()=="ALL"){
                //     selectedData+=item.name+",";
                // }else {
                    if(item.isChecked){
                        selectedData+=item.name+",";
                    }
                // }
            });
            conditionInfo.val = selectedData;
            pubMethod.removeOldCondition(uuid);
            if(_this.datas.conditionMap[uuid]){
                _this.datas.conditionMap[uuid].data = _this.datas.rightStringDatas;
                _this.datas.conditionMap[uuid].searchStr = _this.datas.rightStringSearchKey;
            }
            conditionInfo.rightStringRadio=_this.datas.rightStringRadio;
            if(checkedItem.val().toUpperCase()=="ALL" || checkedItem.val().toUpperCase()=="IN" ){
                var condition= pubMethod.getConditionByType(selectedData,uuid,"IN");
                _this.datas.rightListConditions.conditions.push(condition);
            }else{
                var condition= pubMethod.getConditionByType(selectedData,uuid,"NOTIN");
                _this.datas.rightListConditions.conditions.push(condition);
            };
            //
            _this.saveShow(uuid,'rightStringDatas');
            pubMethod.regenerateTabel(false);
            _this.$layer.close(_this.cancelBtn);
        },
        changeNumberselect(ev){//numberModal 类型选择
            let _this=this;
            let thisVal = ev.target.value;
            if(thisVal == "BETWEEN"){
                _this.$set(_this.datas.rightNumberDatas,"isSelectNumber",false);
            }else{
                _this.$set(_this.datas.rightNumberDatas,"isSelectNumber",true);
            };
            $("option",ev.target).each(function(index,item){
                if($(item).val()==thisVal){
                    _this.$set(_this.datas.rightNumberDatas,"defaultSelect",index);
                }
            });
        },
        saveShow(uuid,str){
            var html = '<ul class="filter-select">';
            var arr = [];
            this.datas[str].forEach(item=>{
                if(item.isChecked){
                    arr.push(item);
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
            html += `</ul>`;
            if($('#dim-advanced-3').find(`li[data-id=${uuid}]`).find('ul')){
                $('#dim-advanced-3').find(`li[data-id=${uuid}]`).find('ul').remove();
            }
            $('#dim-advanced-3').find(`li[data-id=${uuid}]`).append(html);
        },
        inputMinNumFn(ele){
            var _this=this;
            var viaNumTimer=null;
            var thisVal=ele.target.value;
            var isNum=pubMethod.positiveInteger(thisVal);

            if(isNum){
                _this.datas.showModalData.NUMBER.minNumber=thisVal;
            }else{
                // clearTimeout(viaNumTimer);
                viaNumTimer=setTimeout(function(){
                    // adalert("请输入正整数的数字！",800);
                    _this.datas.showModalData.NUMBER.minNumber=ele.target.value=null;
                },800);

            };
        },
        inputMaxNumFn(ele){
            var _this=this;
            var viaNumTimer=null;
            var isNum=pubMethod.positiveInteger(ele.target.value);
            if(isNum){
                _this.datas.showModalData.NUMBER.maxNumber=ele.target.value;
            }else{
                // clearTimeout(viaNumTimer);
                viaNumTimer=setTimeout(function(){
                    // adalert("请输入正整数的数字！",800);
                    _this.datas.showModalData.NUMBER.maxNumber=ele.target.value=null;
                },800);
            };
        },
        enterNumbersFn(ele){
            var _this=this;
            var viaNumTimer=null;
            var isNum=pubMethod.positiveInteger(ele.target.value);
            if(isNum){
                _this.datas.showModalData.NUMBER.enterNumbers=ele.target.value;
            }else{
                // clearTimeout(viaNumTimer);
                viaNumTimer=setTimeout(function(){
                    // adalert("请输入正整数的数字！",800);
                    _this.datas.showModalData.NUMBER.enterNumbers=ele.target.value=null;
                },800);
            };
        }
    }
}
</script>
<style scoped lang="less">
    .querymodel{
        height: 600px;
        .modal-body{
            height: 520px;
        }
    }
    .numbermodel,.date-modal{
        height: 230px;
        .modal-body,.datemodel{
            height: 150px;
        }
    }
    .list-group-cover{
        height: 420px;
        overflow: auto;
    }

</style>
