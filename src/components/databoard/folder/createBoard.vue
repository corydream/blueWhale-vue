<template>
    <div class="add-folder">
        <div class="add-folder-container">
            <p class="f-title">所属文件夹</p>
            <div class="f-border">
                <ul class="list-group">
                    <li class="list-unstyled list-data" v-for="(item, index) in roleList" :key="item.id" >
                        <div class="out" @click="arrFunc(item, index)">
                            <p class="temp-heading" >
                                <i class="fa fa-folder-open"></i>
                                <span class="temp-list-name">{{item.folderName}}</span>
                                <i class="fa fa-sort-up" :class="{'sort-rotated':item.arrow,'sort-rotate':!item.arrow,'fa-style':!item.arrow}" ></i>
                            </p>
                        </div>
                        <ul class="temp-list" v-if="item.arrow">
                            <li class="list-unstyled" v-for="(boardItem, index) in item.board" :key="boardItem.id">
                                <div class="inner">
                                    <p class="temp-heading">
                                    <i class="fa fa-file-text-o"></i>
                                    <span class="board-name">{{boardItem.boardName}}</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </li>                   
                </ul>
            </div>
            <!-- 输入框 -->
            <div class="form-group form-input">
                <label class="col-sm-3 control-label" >看板名称</label>
                <div class="col-sm-9">
                    <input type="name" class="form-control" v-model="boardName">
                </div>
            </div>
        </div>
        <div class="form-group form-button">
            <el-button @click="exitEvent">取消</el-button>
            <el-button type="primary" @click="submitEvent">确认</el-button>
        </div>
    </div>
</template>

<script>
import role from '../../../data/roles';
import { pubMethod } from './../../../config/public';
import bus from './../../../config/bus';
import datas from './../../../config/datas';
export default {
    data() {
      return{
          roleList:[],
          boardList:[],
          folderInitId:'',
          boardName:'',
          folderId:null,
          boardItem:{}, //传值编辑对象参数
          longTarget:true
      }
    },
    created() {
        this.boardItem = this.$parent.boardInfo;
        this.getFolder();
    },
    mounted() {

        
    },
    watch:{
        boardName:function(val){
            if(pubMethod.getByteLen(val) > 40) {
                this.longTarget = false;
                this.$Message.error('输入的字数过长');
            }
            else{
                this.longTarget = true;
            }
        }
    },
    components: {
        
    },
    methods: {
        getFolder(){
            let _this=this;
            // 根据uid提交folderlist
            $.ajax({
                type:'post',
                url: _this.$keyapi+"/folder/listFolder",
                dataType:'json',
                xhrFields: {
                withCredentials: true
                },
                success: data =>{
                    _this.loading = false;
                    _this.folderInitId = data.data[0].folderID;
                    data.data.map((v,i)=> {                     
                        v.arrow = false; 
                        v.board.map((v_board)=>{
                            if(v_board.boardID == _this.boardItem.boardID){
                                    v.arrow = true;
                                    _this.boardName = _this.boardItem.boardName;
                            }
                        })
                    })
                    _this.$set(_this,'roleList',data.data);
                }
            })
        },
        arrFunc (item, index) {
            item.arrow =! item.arrow;
            if(item.arrow) {
                this.folderId = item.folderID;
            }
        },
        exitEvent(){
            this.$layer.closeAll();
        },
        submitEvent(){
            let _this = this;
            if(!_this.longTarget) return false;
            if(_this.boardItem.boardID){
                $.ajax({
                    type:'post',
                    url: _this.$keyapi+"/board/update",
                    data: {
                        boardID:_this.boardItem.boardID, 
                        boardName:_this.boardName
                    },
                    dataType:'json',
                    xhrFields: {
                    withCredentials: true
                    },
                    success: data =>{
                        this.$Message.success('编辑数据看板成功');
                        bus.$emit('refreshFolder',true)
                    }
                }) 
            }
            else{
                $.ajax({
                    type:'post',
                    url: _this.$keyapi+"/auth/save/empty",
                    data: {
                        folderID:_this.folderId?_this.folderId:_this.folderInitId, 
                        boardName:_this.boardName
                    },
                    dataType:'json',
                    xhrFields: {
                    withCredentials: true
                    },
                    success: data =>{
                        this.boardList = data.data;
                        this.$Message.success('新增数据看板成功');
                        bus.$emit('refreshFolder',true)
                    }
                })                 
            }               
            this.$layer.closeAll();
        }
    }
}
</script>
<style lang="less" scoped>
.add-folder{
    width: 100%;
    height: 525px;
    .add-folder-container{
        width: 84%;
        margin-top: 20px;
        margin: 20px 8%;
        .f-title{
            font-size: 14px;
            color:#666;
        }
        .f-border{
            border: 1px solid #ccc;
            border-radius: 3px;
            height: 370px;
            padding: 20px;
            overflow: auto;
            color: rgba(51, 51, 51, 0.768627450980392);
            .temp-heading>i{
                margin:0 5px;
            }
            .fa-sort-up{
                transition: all 0.5s;
            }
            .sort-rotate{
                transform: rotate(0);
            }
            .sort-rotated{
                transform: rotate(180deg);
                vertical-align: -3px;
            }
        }
        .form-input{
            height: 30px;
            line-height: 30px;
            margin: 20px 0;
            .control-label{
                height: 30px;
                line-height: 30px;
            }
            .form-control{
                height: 30px;
            }
        }
    }
    .form-button{
        float: right;
        margin-right: 20px;
    }
}
</style>
