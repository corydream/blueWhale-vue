export default {
  //获取列表标题拆分
  getListTitle(data) {
    let listData = {};
    listData.demesion = [];
    listData.messures = [];
    listData.extra=[];
    if (data) {
      if (data.demision && data.demision.length != 0) {
        let demision = data.demision;
        //获取demesion
        for (let i = 0; i < demision.length; i++) {
          if(demision[i].chinese==="站点"){
            listData.extra.push({
              "chinese": demision[i].chinese, //要
              "col": demision[i].col,//要
              "columnType": demision[i].columnType,//要
              "uuid": demision[i].uuid,//要
              "relation": "EQUAL",//要
              "val":"美站"
            });
          }else if(demision[i].chinese==="类目"){
            let obj={
              "chinese": demision[i].chinese, //要
              "col": demision[i].col,//要
              "columnType": demision[i].columnType,//要
              "uuid": demision[i].uuid,//要
              "relation": "EQUAL",//要
              "val":""
            }
            listData.extra.push(obj);
            listData.demesion.push(obj);
          }else if(demision[i].chinese==="BSR分类"){
            listData.extra.push({
              "chinese": demision[i].chinese, //要
              "col": demision[i].col,//要
              "columnType": demision[i].columnType,//要
              "uuid": demision[i].uuid,//要
              "relation": "EQUAL",//要
              "val":""
            });
            listData.demesion.push({
              "chinese": demision[i].chinese, //要
              "col": demision[i].col,//要
              "columnType": demision[i].columnType,//要
              "dimension": demision[i].dimension,//是否是维度 //要
              "uuid": demision[i].uuid,//要
              "addition": demision[i].addition,
              "relation": demision[i].relation,//要
              "sortType": demision[i].chinese == "上架时间"?"DESC":demision[i].sortType,//要
              // "sortType": "DESC",//要
              "sortable":demision[i].chinese=="BSR排名"||demision[i].chinese=="上架时间"?"custom":false,
            });
          } else{
            listData.demesion.push({
              "chinese": demision[i].chinese, //要
              "col": demision[i].col,//要
              "columnType": demision[i].columnType,//要
              "dimension": demision[i].dimension,//是否是维度 //要
              "uuid": demision[i].uuid,//要
              "addition": demision[i].addition,
              "relation": demision[i].relation,//要
              "sortType": demision[i].chinese == "BSR排名"?"DESC":demision[i].sortType,//要
              // "sortType": "DESC",//要
              "sortable":demision[i].chinese=="BSR排名"||
              demision[i].chinese=="是否进榜"||demision[i].chinese=="上架时间" ?"custom":false,
            });
          }
        }
      }
      if (data.measures && data.measures.length != 0) {
        //获取messures
        let measures = data.measures;
        for (let i = 0; i < measures.length; i++) {
          listData.messures.push({
            "chinese": measures[i].chinese,
            "col": measures[i].col,
            "agg": measures[i].aggTypes,//聚合方式
            "dimension": measures[i].dimension,
            "uuid": measures[i].uuid,
            "addition": measures[i].addition,
            "relation": measures[i].relation,
            "sortable": "custom",
            "sortType": measures[i].sortType,//要
          });
        }
      }
    }
    return listData;
  },
  //获取列表数据
  getListData(data,vue) {
    let dataList = {};
    if (data) {
      dataList.metas = data.metas;//列名
      dataList.pageBean = data.pageBean;//分页
      dataList.datas = [];//列数据
      dataList.links=[];//链接
      if (data.result && data.result.length != 0) {
        dataList.links=[];
        data.result.forEach((row, index) => {
          let tempObj = {};
          row.forEach((val, i) => {
            let key="";
            if(dataList.metas[i].chinese==="是否收藏"){
              key = "collection";
            }else if(dataList.metas[i].chinese==="是否提交oa"){
              key = "commitState";
            }else{
              key = dataList.metas[i].uuid;
            }
            if(dataList.metas[i].chinese==="评分数"){
              if(val!=null&&val!==""){
                val=Math.round(val*10)/10;
              }
            }
           if(dataList.metas[i].chinese==="售价"||dataList.metas[i].chinese==="跟售最低价"){
             if(val!=null&&val!==""){
               val=Math.round(val*100)/100;
             }
            }
            vue.$set(tempObj, key, (val!=null&&val!=="")?val:"无");
            if(dataList.metas[i].chinese==="是否提交oa"){
                dataList.links.push(val);
            }
          })
          //新增操作列
          // vue.$set(tempObj, "options", "新品开发");
          vue.$set(tempObj, "orderNumber", 0);
          dataList.datas.push(tempObj);
        })
      }
      return dataList;
    }
  },
  /**********稳定榜单*****************/
  setTableDataFormat(datas){
    let newArray=[];
    let links=[];
    datas.forEach((row)=>{
      //新增操作序号
      for(let col in row){
        if(row[col]===""||row[col]===null){
          row[col]='无'
        }else{
          if(col==="grade"){
            row[col]=Math.round( row[col]*10)/10;
          }
        }
        if(col==="productUrl"){
          links.push(row[col]);
        }
      }
      row.options="";
      row.orderNumber=0;
      newArray.push(row);
    })
    return {
      result:newArray,
      links:links
    }
  }
}
