<template>
  <div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props:['category',"btnState"],
    created(){},
    components:{},
    mounted() {

    },
    methods: {},
    watch: {}
  }
</script>
<style lang="less" scoped></style>
