<template>
    <span class="expression-item-wrap">
    	<template v-if="curData.divisor.shorhand == 'DISTINCT'">
	        <span style="color:#ff9c4c;">COUNT</span>
	        <span class="expression-name" @click.stop="" v-if="!curData.divisorShow"> (DISTINCT [{{ curData.divisorName }}])</span>
	        <input type="text" @click.stop="" class="expression-input" v-model="curData.divisorName" v-if="curData.divisorShow">
        </template>
		<template v-else>
			<span style="color:#ff9c4c;">{{curData.divisor.shorhand}}</span>
	        <span class="expression-name" @click.stop="" v-if="!curData.divisorShow"> ([{{ curData.divisorName }}])</span>
	        <input type="text" @click.stop="" class="expression-input" v-model="curData.divisorName" v-if="curData.divisorShow">
		</template>

        <span class="operator-name" @click.stop="expressionShowFn(curData)" v-if="!curData.expressionShow"> {{ curData.expression }} </span>
        <input type="text" @click.stop="" @input="changeExpression(curData)" @focus="expressFocus(curData)" class="expression-input" v-model="curData.expression" v-if="curData.expressionShow">
		
		<template v-if="curData.dividend.shorhand == 'DISTINCT'">
			<span style="color:#ff9c4c;">COUNT</span>
	        <span class="expression-name" @click.stop="" v-if="!curData.dividendShow">(DISTINCT [{{ curData.dividendName }}])</span>
	        <input type="text" @click.stop="" class="expression-input" v-model="curData.dividendName" v-if="curData.dividendShow">
		</template>
		<template v-else>
			<span style="color:#ff9c4c;">{{curData.dividend.shorhand}}</span>
	        <span class="expression-name" @click.stop="" v-if="!curData.dividendShow">([{{ curData.dividendName }}])</span>
	        <input type="text" @click.stop="" class="expression-input" v-model="curData.dividendName" v-if="curData.dividendShow">
		</template>
    </span>
</template>

<script>
import { pubMethod } from './../../../../config/public';
export default {
   props:["leftModalDataAry","loadReturn","curIndex","curData"],
   /*props:{
         "leftModalDataAry":{
            type:String,
            default:' '
         },
         "loadReturn":{
			type:String,
			default:' '
         },
         "curIndex":{
            type:Number,
            default:1
         },
         "curData":{
             type:Object,
             default:' '
         }
     },*/
    mounted:function () {
        let _this=this;
            this.$nextTick(function () {
            this.$on('childMethod', function (data) {
                _this.inputShow = !_this.inputShow;
                console.log('触发了第 '+data+' 个expression-item组件的方法！');
            });
        });
        _this.componentIndex=_this.$props.curIndex;
        _this.oldExpress=_this.$props.curData.expression;
    },
    data:function(){
        return {
            toggleInputText:"自定义表达式组件",
            inputShow:false,
            componentIndex:222,
            oldExpress:null
        }
    },
    methods:{
        expressFocus(curData){
            curData.expression=null;
        },
        changeExpression(curData){
            let _this=this;
            let expressionStr=curData.expression.trim();
            let express=expressionStr=="+" || expressionStr=="-" || expressionStr=="*" || expressionStr=="/";
            if(!express){
                /*setTimeout(function(){
                    curData.expression=_this.oldExpress;
                },500);*/
                curData.expressionSure=false;
                pubMethod.adalert("请输入四则运算符！");
            }else{
            	curData.expressionSure=true;
            };
            console.log(this.oldExpress);
        },
        expressionShowFn(curData){
            let _this=this;
            curData.expressionShow=!curData.expressionShow;
        },
        toggleDivisor(curData){
            let _this=this;
            curData.divisorShow=!curData.divisorShow;
            _this.$emit("record-index",_this.componentIndex);
        },
        toggleDividend(curData){
            let _this=this;
            curData.dividendShow=!curData.dividendShow;
        }
    }
}
</script>
<style lang="less" scoped>
 	.expression-input{
 		width:32px;
 		
 	}
</style>
