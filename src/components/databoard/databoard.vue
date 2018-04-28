<template>
    <div style="height: calc(100vh - 52px);">
        <folderMenu class="leftnav"></folderMenu>
        <container  style="width: calc(100% - 200px);" class="content"></container>       
    </div>
</template>

<script>
import folderMenu from './folder/folderMenu';
import container from './info/container';
export default {
  data () {
    return {
      
    }
  },
  mounted() {
  },
  components: {
      folderMenu,
      container,
  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
.leftnav{
  width: 200px;
  background :#30363d;
  height:100%;
  color: #fff;
  padding: 0;
  float: left;
}
.content{
  overflow-y: auto!important;
  height: 100%;
  float: left;
}
</style>
