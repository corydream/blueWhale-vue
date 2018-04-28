<template>
  <div v-loading="loading">
    <div class="form-group user-input">
        <el-input v-model="value2"  size="small" @keyup.13.native="searchEvent($event)" placeholder="搜索关键词"></el-input>
        <span class="input-search"><i class="fa fa-search"></i></span>
        <Poptip placement="bottom-start" width="160" style="position: absolute;top: -2px;right: 8px;">
        <i class=" add-folder">+</i>
        <div class="api" slot="content" style="font-size:16px;color:#2c3e50;cursor:pointer">
            <div @click="createBoard">新增文件夹</div>
            <div @click="createBoardList">新增数据看板</div>
        </div>
    </Poptip>
        <!-- <i class=" add-folder" @click="createBoard">+</i> -->
    </div>
        <ul class="list-group">
            <li class="list-unstyled list-data" v-for="(item, index) in roleList" :key="item.id" >
                <div class="out" >
                    <p class="temp-heading" >
                        <i class="fa fa-folder-open"></i>
                        <span :title="item.folderName" class="temp-list-name" @click="arrFolder(item, roleList,index)">{{item.folderName}}</span>
                        <i class="fa iconSelect fa-sort-up" @click="arrFolder(item, roleList,index)" :class="{'sort-rotated':item.arrow,'sort-rotate':!item.arrow,'fa-style':!item.arrow}" ></i>
                        <Poptip placement="bottom-start" width="50">
                            <span class="folder-ellipsis"><i class="fa fa-ellipsis-v"></i></span>
                            <div class="api" slot="content" style="font-size:16px;color:#2c3e50;cursor:pointer">
                                <div @click="createBoard(item)">编辑</div>
                                <div @click="item.modal2 = true">删除</div>
                            </div>
                        </Poptip>
                        <Modal v-model="item.modal2" title="删除文件夹" @on-ok="delFolder(item)">
                            <p>确定要删除<span>{{item.folderName}}吗？</span></p>
                        </Modal>                      
                    </p>
                </div>
                <ul class="temp-list" v-if="item.arrow">
                    <li class="list-unstyled list-inner-item" v-for="(boardItem, index) in item.board" :key="boardItem.id"  :class="{'active':boardItem.active}">
                        <div class="inner">
                            <p class="temp-heading">
                            <i class="fa fa-bar-chart bar-chart"></i>
                            <span class="board-name" :title="boardItem.boardName" @click="arrList(boardItem, index, item)">{{boardItem.boardName}}</span>
                            </p>
                        </div>
                        <Poptip placement="bottom-start" width="50">
                            <span class="board-ellipsis"><i class="fa fa-ellipsis-v"></i></span>
                            <div class="api" slot="content" style="font-size:16px;color:#2c3e50;cursor:pointer">
                                <div @click="createBoardList(boardItem)">编辑</div>
                                <div @click="boardItem.modal1 = true">删除</div>
                            </div>
                        </Poptip>
                        <Modal v-model="boardItem.modal1" title="删除看板" @on-ok="delBoardList(boardItem)">
                            <p>确定要删除<span>{{boardItem.boardName}}吗？</span></p>
                        </Modal>
                    </li>
                </ul>
            </li>
        </ul>
  </div>
</template>

<script>
import role from '../../../data/roles';
import { pubMethod } from './../../../config/public';
import bus from './../../../config/bus';
import datas from './../../../config/datas';
import createFolder from './createFolder';
import createBoard  from './createBoard';
export default {
    data() {
      return{
          datas: datas.datas,
          roleList: [],
          boardList: [],
          userInfo:[],
          loading: true,
          selectedObj: {},
          value2:'',
          boardInfo:{},
          folderInfo:{},
          autoClick :false, //是否刷新左侧列表时自动点击
      }
    },
    created() {
        var _this = this;
        _this.datas.folderLock = true;
        // bus.$on('pushData',data =>{
        //     if(data){
        //          _this.getFolder();
        //     }
        // });
        _this.getFolder();
        bus.$on('refresh',data=>{
            if(data){
                _this.refreshData();
            }
        });
        bus.$on('refreshFolder',data=>{
            if(data){
                _this.autoClick = true;
                _this.getFolder(true);
            }
        });
        // if(role.userInfo.hasOwnProperty('UserId')){
        //     _this.getFolder();
        // }
    },
    mounted() {

    },
    components: {
        createFolder,
        createBoard
    },
    methods: {
        // 搜索条件
        searchEvent(){
            let _this = this;
            // /folder/search name
            if(_this.value2){
                $.ajax({
                    type:'post',
                    url: _this.$keyapi+"/folder/search",
                    dataType:'json',
                    data:{
                        name:_this.value2
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    success: data =>{
                        data.data.map((v,i)=> {
                            v.arrow = true;
                            v.modal2 = false;
                        })
                        _this.$set(_this,'roleList',data.data);
                        console.log(_this.roleList)
                        if(data.data[0].board.length>0){
                            bus.$emit('boardList',_this.roleList[0].board[0]);
                            _this.roleList[0].board[0].active = true;
                        }
                    }
                })
            }
            else{
                this.getFolder();
            }
        },
        arrFolder(item, roleList,str){
            let _this = this;        
            item.arrow = !item.arrow; 
      
        },
        arrList(item,index,total) {
            let _this  = this;
            if(total.arrow){
                _this.roleList.forEach(item => { 
                    if(total == item){
                        total.board.map((v,i)=>{
                            _this.$set(v,'active',false);
                            _this.$set(v,'modal1',false)
                            if(i == index){
                                v.active = true;
                            }
                            else{
                                v.active = false;
                            }
                        })
                    }else{
                        item.board.forEach((v_inner,i_inner)=>{
                            _this.$set(v_inner,'active',false);
                            _this.$set(v_inner,'modal1',false)
                        })
                    } 
                })
            }
            else{
            }
            this.selectedObj.item = item;
            this.selectedObj.index = index;
            this.selectedObj.total = total;
            if(!_this.datas.folderLock){
                return false;
            }
            bus.$emit('boardList',item);
        },
        getFolder(str){
            let _this=this;
            _this.selectedObj = {};
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
                    data.data.map((v,i)=> {
                        v.arrow = false;
                        v.modal2 = false;
                    })
                    _this.$set(_this,'roleList',data.data);
                    _this.selectedObj.item = _this.selectedObj.item ?_this.selectedObj.item: _this.roleList[0].board[0];
                    _this.selectedObj.index = _this.selectedObj.index ?_this.selectedObj.index : 0;
                    _this.selectedObj.total = _this.selectedObj.total ?_this.selectedObj.total: _this.roleList[0];
                    _this.arrFolder(_this.selectedObj.total,_this.roleList,str);
                    _this.arrList(_this.selectedObj.item,_this.selectedObj.index,_this.selectedObj.total);
                }
            })
        },
        refreshData(){
            this.arrList(this.selectedObj.item,this.selectedObj.index,this.selectedObj.total);
        },
        createBoard(item){
            // /auth/check//add/folder
            let _this = this;
            $.ajax({
                type:'post',
                url: _this.$keyapi+"/auth/check/add/folder",
                dataType:'json',
                xhrFields: {
                withCredentials: true
                },
                success: data =>{
                    if(data.status == 1){
                        _this.folderInfo = item; 
                        _this.$layer.iframe({
                            content: {
                                content: createFolder, //传递的组件对象
                                parent: _this,//当前的vue对象
                                data: _this.folderInfo//props
                            },
                            area:['500px','600px'],
                            title: item.folderID?'编辑文件夹':'创建文件夹'
                        });
                    }
                    else if(data.status == 101){
                      location.href = "https://data.banggood.cn";
                    }
                    else{
                        this.$Message.error(data.desc);
                    }
                }
            })
        },
        // 删除文件夹
        delFolder(folderArr){
            $.ajax({
                type:'post',
                url: this.$keyapi+"/folder/delete",
                dataType:'json',
                xhrFields: {
                    withCredentials: true
                },
                data:{id:folderArr.folderID},
                success: data =>{
                    if(data.status == 1){
                        this.$Message.success('删除文件夹成功');
                        bus.$emit('refreshFolder',true)   
                    }
                    else{
                        this.$Message.error('删除文件夹失败');
                    }
                }
            })
        },
        // 新增编辑看板
        createBoardList(boardArr){
            let _this = this;
            $.ajax({
                type:'post',
                url: this.$keyapi+"/auth/check/add/folder",
                dataType:'json',
                xhrFields: {
                withCredentials: true
                },
                success: data =>{
                    if(data.status == 1){                   
                        // if(boardArr.boardID){  
                            _this.boardInfo = boardArr;                 
                            _this.$layer.iframe({
                                content: {
                                    content: createBoard, //传递的组件对象
                                    parent: this,//当前的vue对象
                                    data: _this.boardInfo//props
                                },
                                area:['500px','600px'],
                                title: boardArr.boardID?'编辑数据看板':'创建数据看板'
                            });
                        // }
                        // else{
                        //     _this.boardInfo = [];
                        //     _this.$layer.iframe({
                        //         content: {
                        //             content: createBoard, //传递的组件对象
                        //             parent: _this,//当前的vue对象
                        //             data: []//props
                        //         },
                        //         area:['500px','600px'],
                        //         title: '新增数据看板'
                        //     });                            
                        // }
                    }
                    else{
                        this.$Message.error(data.desc);
                    }
                }
            })           
        },
        delBoardList(boardArr){
            $.ajax({
                type:'post',
                url: this.$keyapi+"/board/delete",
                dataType:'json',
                xhrFields: {
                    withCredentials: true
                },
                data:{boardID:boardArr.boardID},
                success: data =>{
                    if(data.status == 1){
                        this.$Message.success('删除数据看板成功');
                        bus.$emit('refreshFolder',true)   
                    }
                    else{
                        this.$Message.error('删除数据看板失败');
                    }
                }
            })            
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../style/show-graph.css';   
    .fa-style{
          vertical-align: -2px;
    }
    .temp-heading{
        position: relative;
      .temp-list-name{
        margin-right: 25px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: -8px;
      }
      .folder-ellipsis{
        position: absolute;
        top: 0;
        right: -7px;
        font-size: 18px;
        opacity: 0;
      }
      .folder-ellipsis:hover{
          opacity: 1;
      }
    }
    .user-input{
        position: relative;
        margin: 14px 0;
        padding: 0 15px;
        width: 180px;
        border-radius: 5px;
        .from-keywords{
            width: 90%;
        }
        .user-search{
            position: absolute;
            right: 30px;
            top: 9px;
            color: #ccc;
            font-size: 16px;
        }
        .add-folder {
            color: #ccc;
            font-size: 25px;
            cursor: pointer;
        }
    }
    .list-data{
      width: 200px;
      background: #485464;
      padding: 8px 15px 0 15px;
      text-align: left;
        .fa-sort-up{
            transition: all 0.5s;
        }
        .sort-rotate{
            transform: rotate(0);
            vertical-align: -3px;
        }
        .sort-rotated{
            transform: rotate(180deg);
            vertical-align: 3px;
        }
      .temp-list-name{
        height: 28px;
        line-height: 28px;
        margin-left: 10px;
        width: 125px;
        margin-right: 0;
        display: inline-block;
        cursor: pointer;
      }
      .bar-chart{
          vertical-align: 6px;
      }
      .board-name{
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        width: 112px;
        display: inline-block;
        text-overflow: ellipsis;
      }
      .board-ellipsis{
        opacity: 1;
        width: 30px;
        text-align: center;
        font-size: 16px;
        position: absolute;
        top: 10px;
        right: 10px;
      }
      .board-ellipsis:hover{
          opacity: 1;
      }
      .temp-list{
          padding: 0;
          background: #30363d;
          margin-left: -20px;
          width: 205px;
          .list-inner-item{
              padding-left: 40px;
              position: relative;
              height: 40px;
          }
          .list-inner-item.active{
             background: #4aa5e9;
          }
          .inner{
            width: 135px;
            height: 40px;
            overflow: hidden;
            display: inline-block;
            .temp-heading{
                margin: 10px 0;
            }
          }
      }
    }
</style>
