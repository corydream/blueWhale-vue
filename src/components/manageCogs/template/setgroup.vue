<template>
  <div class="p-wrapper">
    <p class="default-layer-title">新建/编辑用户组</p>  
    <Col span="20">
        <p class="group-item">用户组名称：
            <Input v-model="groupName" placeholder="输入用户组名称" style="width: 200px" @on-change="nameChange"></Input>
        </p>
        <p class="group-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述：
            <Input v-model="groupDesc" type="textarea" :rows="4" style="width: 240px" @on-change="descChange"></Input>
        </p>
    </Col>
  </div>
</template>

<script>
export default {
  data() {
    return {
        groupName:'',
        groupDesc:''
    };
  },
  props:['obj'],
  created() {
      if(this.obj){
          this.groupName = this.obj.groupName;
          this.groupDesc = this.obj.description;
      }
  },
  methods: {
      nameChange(){
          this.$emit('value1',this.groupName)
      },
      descChange(){
          this.$emit('value2',this.groupDesc)
      }
  }
};
</script>
<style>
.p-wrapper{
    font-size: 14px;
    height: 280px;
}
</style>
