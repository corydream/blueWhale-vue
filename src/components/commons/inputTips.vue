<template>
  <div id="inputTips">
      <row type="flex" justify="center" class="code-row-bg">
        <col span="12">
        <select
          v-model="inputValue"
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading">
          <option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</option>
        </select>
        </col>
      </row>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        inputValue: '',
        loading: false,
        options: [],
        //过滤出来匹配数据
        list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
          'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
          'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
          'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey',
          'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma',
          'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota',
          'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia',
          'Wisconsin', 'Wyoming']
      }
    },
    methods: {
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            const list = this.list.map(item => {
              return {
                value: item,
                label: item
              };
            });
            this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options = [];
        }
      }
    }
  }
</script>
<style lang="less" scoped>
     #inputTips {
       >.ivu-row {
         max-height: 50px;
         padding: 5px;
       }
     }

</style>
