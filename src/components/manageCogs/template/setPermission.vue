<template>
  <div class="p-wrapper">
    <p class="default-layer-title">设置权限</p>  
    <Col span="20">
        <p class="default-p">用户/用户组：{{this.name}}</p>
        <p class="default-p">权限：
            <Checkbox v-model="arr[0]">查看</Checkbox>
            <Checkbox v-model="arr[1]">导出</Checkbox>
            <Checkbox v-model="arr[2]">编辑</Checkbox>
            <Checkbox v-model="arr[3]">删除</Checkbox>
        </p>
    </Col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:"",
      arr:[false, false, false, false]
    };
  },
  props:['obj'],
  created() {
    this.name = this.obj.detailName;
    if(!this.obj.hasOwnProperty('actionType')){
      return false;
    }
    this.obj.actionType.map(v=>{
      switch(v){
        case 'SELECT': this.arr[0] = true;break;
        case 'EXPORT': this.arr[1] = true;break;
        case 'UPDATE': this.arr[2] = true;break;
        case 'DELETE': this.arr[3] = true;break;
      }
    })
  },
  watch:{
      arr:function(val){
        let data = [1,2,3,4];
        val[0] == true?data[0] ='SELECT':'';
        val[1] == true?data[1] ='EXPORT':'';
        val[2] == true?data[2] ='UPDATE':'';
        val[3] == true?data[3] ='DELETE':'';
        data = data.filter(data=>data.length>5)
        this.$emit('selected',data)
      }
  },
  methods: {}
};
</script>
<style>
.p-wrapper{
    font-size: 14px;
    height: 160px;
}
</style>
