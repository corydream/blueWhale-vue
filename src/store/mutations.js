export default {
  //改变类目
  changeCategory(state,category){
    state.category=category;
  },
  //改变bsr品类
  changeBsr(state,bsr){
    state.bsr=bsr;
  },
  changeNoMoreData(state,flag){
    state.noMoreData=flag;
  },
  //改变类目数据数组
  changeCategoryArray(state,categoryArray){
    state.categoryArray=categoryArray;
  },
  //改变表格按钮切换
  chanegTabSelect(state,tabname){
    state.selectTab=tabname;
  },
  //品牌数量
  changeBrandCount(state,brandCount){
    state.brandCount=brandCount;
  },
  //显示产品详情
  isShowAsin(state,showAsin){
    state.isShowAsin=showAsin;
  },
  changeAsinPramas(state,asin){
    state.asinParmas=asin;
  }
}
