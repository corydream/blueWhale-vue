<template>
    <div>
        我是测试
        <div class="modal-footer">
            <el-button @click="cancelModel">取消</el-button>
            <el-button type="primary" @click="modalSure">确认</el-button>
        </div>
    </div> 
</template>
<script>
export default{
    data(){
        return{

        }
    },
    components:{

    },
    created(){
        
    },
    methods:{
        cancelModel(){
            var index = $(".notify").eq(2).attr('id');
            this.$layer.close(index);
        },
        modalSure(){

        }
    }
}

</script>
<style lang="less" scoped>
    .modal-footer{
        width: 100%;
        position: fixed;
        right: 0;
        padding: 15px;
        text-align: right;
        border-top: 1px solid #e5e5e5;
        bottom: 0;
    }
</style>
