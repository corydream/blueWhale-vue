<template>
  <div>
    <row>
      <col span="12">
      <DatePicker type="daterange" format="yyyy-MM-dd HH:mm" placement="bottom-end" placeholder="选择日期" style="width: 250px"></DatePicker>
      </col>
    </row>
  </div>
</template>
<script>
  export default {
      data(){
        return{
            dateTime:""
        }
      },
    components:{

    },
    methods:{

    }
  }
</script>

