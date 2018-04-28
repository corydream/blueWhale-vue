<template>
    <div>
      <div class="competing-goods">
        <ul class="row">
          <li class="items" v-for="(product,index) in dataList">
            <div class="good col-xs-1"  v-for="item in product.products">
              <img :src=item.img alt=""/>
              <span>{{item.name}}</span>
            </div>
            <div class="title"></div>
            <span class="title-content">{{title}}</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
          return{

          }
        },
        props:['dataList','title']

    }
</script>
<style scoped lang="less">
  .competing-goods{
    >ul{
      list-style: none;
      margin: 0px;
      padding: 0px;
      background: #f2f7fa;
      >.items{
        width: 100%;
        overflow: hidden;
        background: #fff;
        border: 1px solid #fff;
        padding-top: 48px;
        padding-left: 127px;
        margin-bottom: 14px;
        position: relative;

        &:hover{
          box-shadow: 5px 5px 8px #e8eef2;
        }
        >.title {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          border-top: 105px solid #4aa5e9;
          border-right: 140px solid transparent;
        }
        >.title-content{
          font-size: 16px;
          width: 136px;
          text-align: left;
          color: #fff;
          position: absolute;
          left: 8px;
          top:15px;
          z-index: 100;
        }
        .good{
          float: left;
          background: #fff;
          margin-right: 134px;
          margin-bottom: 34px;
          font-size: 0;
          &:last-of-type{
            margin-bottom: 0px;
          }
          >img{
            display: block;
            margin: 0 auto;
            transform: scale(1);
            &:hover{
              cursor: pointer;
              transform: scale(1.1);
              transition: all .4s ease-in-out;
            }

          }
          >span{
            width: 126px;
            display: block;
            font-size: 14px;
            color:#585858;
            text-align: center;
            margin-top: 8px;
          }
        }
      }
    }
  }
</style>
