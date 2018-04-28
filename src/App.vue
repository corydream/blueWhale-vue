<template>
  <div id="app">
    <banner v-if="urlTag"></banner>
    <container v-if="urlTag"></container>
    <share v-if="!urlTag"></share>
  </div>
</template>

<script>
import banner from './components/header/banner'
import container from './components/container/container'
import share from './components/container/share'

export default {
  components: {
    banner,
    container,
    share
  },
  data(){
    return{
      urlTag: false
    }
  },
  created(){
    let url = document.location.toString();
    let urlStr = url.split('#/')[1];
    if(urlStr.indexOf('share')<0){
       this.urlTag = true;
    }
    else{
      this.urlTag = false;
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1200px;
}
.notify-content{
  height: auto!important;
}
</style>
