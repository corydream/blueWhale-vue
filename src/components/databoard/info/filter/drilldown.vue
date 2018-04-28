<template>
    <div class="drill-down-wrap">
        <ul class="expression-field-list" v-if="searchListShow && drillDownNumberCom!=1" @click.stop="" :data-com="drillDownNumberCom">
            <template v-for="(item,key) in fieldDatas">
                   <li v-for="(i,k) in item.countAry">
                        <dl>
                            <dt style="color: #ff9c4c;"><span class="expression-name-title">{{ i.name }}</span>聚合</dt>
                            <dd style="color: #999;" @click.stop="selectExpression(i,item.chinese,item.uuid)" v-if="i.shorhand == 'DISTINCT'"><span class="expression-name">COUNT</span>(DISTINCT [<span class="field-name">{{ item.chinese }}</span>])</dd>
                            <dd style="color: #999;" @click.stop="selectExpression(i,item.chinese,item.uuid)" v-else><span class="expression-name">{{ i.shorhand }}</span>([<span class="field-name">{{ item.chinese }}</span>])</dd>
                        </dl>
                    </li>
            </template>
        </ul>
        <ul class="list-inline" v-if="drillDownNumberCom==1">
            <li @click.stop="selectExpression('+')">+</li>
            <li @click.stop="selectExpression('-')">-</li>
            <li @click.stop="selectExpression('*')">*</li>
            <li @click.stop="selectExpression('/')">/</li>
        </ul>
    </div>
</template>
<script>
//import datas from './../../../config/datas';
import { pubMethod } from './../../../../config/public';
export default {
   props:["searchListShow","fieldDatas"],
    mounted: function () {
        this.$nextTick(function () {
            this.$on('childMethod', function () {
                console.log('触发了 express-drilldown 组件的方法!');
            })
        });
        //this.fieldListData=this.$props.fieldDatas;
    },
    data:function(){
        return {
            toggleInputText:"自定义下拉选择组件",
            searchFieldListShow:false,
            inputShow:false,
            drillDownNumber:0,//记录自定义下拉选择的次数
            fieldListData:{
                "订单金额":["SUM","AVG","COUNT","DISTINCT"]
            },
            expressionObj:{
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
            }
        }
    },
    computed:{
        drillDownNumberCom:function(){
            return this.drillDownNumber%3;
        }
    },
    methods:{
        restoreInital(data){
            this.drillDownNumber=0;
        },
        selectExpression(arg){
            let _this=this;
            if(_this.drillDownNumberCom==0){//第一个
                _this.expressionObj.divisor=arguments[0];
                _this.expressionObj.divisorName=arguments[1];
                _this.expressionObj.uuid1=arguments[2];
            }else if(_this.drillDownNumberCom==1){//运算规则
            	
                _this.expressionObj.expression=arguments[0];
                
            }else if(_this.drillDownNumberCom==2){//第二个
            	
                let min=_this.expressionObj.divisor=="MIN" && (arguments[0]=="MIN"||arguments[0]=="MAX");
                let max=_this.expressionObj.divisor=="MAX" && (arguments[0]=="MIN"||arguments[0]=="MAX");
                
                if(min || max){
                    pubMethod.adalert("不能同时计算最大或最小值");
                    return;
                };
                
                _this.expressionObj.dividend=arguments[0];
                _this.expressionObj.dividendName=arguments[1];
                _this.expressionObj.uuid2=arguments[2];
            };
            let isEmit=true;
            for(var k in _this.expressionObj){
                if(_this.expressionObj[k]==null){//当判断有一个为null时不允许确定
                    isEmit=false;
                    break;
                };
            };
            k=null;
            if(isEmit){
                _this.$emit("add-expression-data",_this.expressionObj);
                console.log("已经添加!");
                _this.expressionObj={
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
                                };
            };
            _this.drillDownNumber+=1;
           //console.log(vm.tableRequestObject);
        },
        childMethod(){
            console.log("子组件事件！");
        },
        selectExpressionSymbol(arg){
            let _this=this;
            _this.drillDownNumber+=1;
        }
    }
}
</script>
<style lang="less" scoped>
.drill-down-wrap{
	dl{margin-bottom:10px;}
}
.expression-field-list{
 	max-height:400px;
 	overflow: auto;
 }
</style>
