import commonUtil from  "./insightCommon";
export  default{
  //校验整数数值
  checkInt(inputVal){
    if(inputVal){
      if(!/^\d+$/.test(inputVal)){
        //不是非负整数
        if(/^[0-9]+/.test(inputVal)){
          inputVal=inputVal.match(/\d+/g).join("");
        }else{
          inputVal="";
        }
      }else{
        //判断前面是否有0
        if(!/^(0|[1-9][0-9]*)$/.test(inputVal)){
          let currentNum=inputVal.match(/[1-9]+\d*/);
          if(currentNum){
            inputVal=currentNum.join("");
          }else{
            inputVal=0;
          }
        }
      }
    }
    return inputVal;
  },
  checkIntBlur(inputVal){
    if(inputVal){
      let number=parseInt(inputVal);
      if(isNaN(number)){
        inputVal="";
      }else{
        inputVal=number;
      }
    }
    return inputVal;
  },
  checkFloat(inputVal){
    if(inputVal){
      if(!/^\d+[.]?\d*$/.test(inputVal)){
        if(/^\d+[.]?\d*/.test(inputVal)){
          inputVal=inputVal.match(/\d+[.]?\d*/g).join("");
        }else{
          inputVal="";
        }
      }else{
        //判断前面是否有0
        if(!/^(0|[1-9][0-9]*)$/.test(inputVal)){
          if(!/^0[.]/.test(inputVal)){
            let currentNum=inputVal.match(/[.]?[1-9]+[.]?\d*/);
            if(currentNum){
              inputVal=currentNum.join("");
            }else{
              inputVal=0;
            }
          }
        }
      }
    }
    return inputVal;
  },
  checkFloatBlur(inputVal){
    if(inputVal){
      let number=parseFloat(inputVal);
      if(isNaN(number)){
        inputVal="";
      }else{
        inputVal=number;
      }
    }
    return inputVal;
  },
  //表格搜索重置
  //表格搜索数据组装
  searchForTabTwo(queryData,messures){
    let conditions = {
      demesion: [],
      measures: [],
      conditions: []
    };
    //配置表格控件查询条件
    for (let key in queryData) {
      let obj = queryData[key];
      //判断字段是否要发送
      //判断是否是有区间
      if (obj.hasOwnProperty("showSession")) {
        //选择了区间发送
        if (obj.showSession) {
          //判断值哪个是小哪个是大
          let value1= obj.session.sessionLeft
          let value2= obj.session.sessionRight
          if(value1>=value2){
            let temp=value1;
            value1=value2;
            value2=temp;
          }
          let objSend = {
            left: {
              "key": obj.key,
              "chinese": obj.chinese,
              "relation": "LARGEEQUAL", //>=
              "val":value1
            },
            right: {
              "key": obj.key,
              "chinese": obj.chinese,
              "relation": "LESSEQUAL", //>=
              "val":value2
            }
          }
          conditions.conditions.push(objSend.left);
          conditions.conditions.push(objSend.right);
        }
        else {
          //没有区间正常发送
          //正常类型
          if(obj.inputVal!==""){
            let objSend = {
              "key": obj.key,
              "chinese": obj.chinese,
              "relation": obj.selectValue,
              "val": obj.inputVal
            }
            conditions.conditions.push(objSend);
          }
        }
      }
      else {
        if (obj.inputVal !== "" && obj.inputVal.length != 0) {
          if (obj.type === "DATE") {
            //日期
            if(obj.inputVal[0]&&obj.inputVal[1]){
              let objSend = {
                left: {
                  "key": obj.key,
                  "chinese": obj.chinese,
                  "relation": "LARGEEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[0], "yyyy-MM-dd"),
                },
                right: {
                  "key": obj.key,
                  "chinese": obj.chinese,
                  "relation": "LESSEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[1], "yyyy-MM-dd")
                }
              }
              conditions.conditions.push(objSend.left);
              conditions.conditions.push(objSend.right);
            }
          } else if (obj.type === "ARRAY") {
            //卖家类型
            if (obj.inputVal.length == 1) {//只需传一个
              let objSend = {
                "key": obj.key,
                "chinese": obj.chinese,
                "relation": "EQUAL",
                "val": obj.inputVal[0]==='是'?'yes':'no'
              }
              conditions.conditions.push(objSend);
            }
          } else {
            if(obj.type !== "BSR"){
              //BSR分类不用发
              if(obj.type!="RATE"){
                if(obj.type=="INTNumber"||obj.type=="INTNumber2"){
                  let val1="";
                  let val2="";
                  let col1=obj.key;
                  let col2=obj.key;
                  switch(obj.type){
                    case "INTNumber":
                      val1=obj.inputVal[0]/100;
                      val2=obj.inputVal[1]/100;
                      col1="$repl$largeR";
                      col2="$repl$lessrR";
                      break;
                    case "INTNumber2":
                      val1=obj.inputVal[0];
                      val2=obj.inputVal[1];
                      col1="$repl$largeAngle";
                      col2="$repl$lessAngle";
                      break;
                  }
                  let objSend = {
                    left: {
                      "key": col1,
                      "chinese": obj.chinese,
                      "relation": "LARGEEQUAL", //>=
                      "val": val1
                    },
                    right: {
                      "key": col2,
                      "chinese": obj.chinese,
                      "relation": "LESSEQUAL", //>=
                      "val":val2
                    }
                  }
                  conditions.conditions.push(objSend.left);
                  conditions.conditions.push(objSend.right);
                }else{
                  let objSend = {
                    "key": obj.key,
                    "chinese": obj.chinese,
                    "relation": "EQUAL",
                    "val": obj.inputVal
                  }
                  conditions.conditions.push(objSend);
                }
              }
            }
          }
        }else{
          if(obj.type==="increment"&&obj.inputVal==""){
            let objSend = {
              "key": obj.key,
              "chinese": obj.chinese,
              "relation": "EQUAL",
              "val": 100000
            }
            conditions.conditions.push(objSend);
          }
        }
      }
    }
    //判断是否有排序
    let isSort=null;
    messures.forEach((row)=>{
      if(row.sortType!="DEFAULT"){
        isSort=row;
      }
    })
    if(isSort){
      let flag=false;
      conditions.conditions.forEach((item)=>{
            if(item.key==isSort.key){
                flag=true;
                item.sortType=isSort.sortType;
            }
      })
      if(!flag){
        conditions.conditions.push(isSort);
      }
    }
    return conditions.conditions;
  },
  searchForTabOthers(queryData){
    let conditions = {
      demesion: [],
      measures: [],
      conditions: []
    };
    //配置表格控件查询条件
    for (let key in queryData) {
      let obj = queryData[key];
      //判断字段是否要发送
      //判断是否是有区间
      if (obj.hasOwnProperty("showSession")) {
        //选择了区间发送
        if (obj.showSession) {
          //判断值哪个是小哪个是大
          let value1= obj.session.sessionLeft
          let value2= obj.session.sessionRight
          if(value1>=value2){
            let temp=value1;
            value1=value2;
            value2=temp;
          }
          let objSend = {
            left: {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "LARGEEQUAL", //>=
              "val": value1
            },
            right: {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "LESSEQUAL", //>=
              "val": value2
            }
          }
          conditions.conditions.push(objSend.left);
          conditions.conditions.push(objSend.right);
        }
        else {
          if(obj.inputVal!==""){
            //没有区间正常发送
            //正常类型
            let objSend = {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": obj.selectValue,
              "val": obj.inputVal
            }
            conditions.conditions.push(objSend);
          }
        }
      }
      else {
        if (obj.inputVal !== "" && obj.inputVal.length != 0) {
          if (obj.type === "DATE") {
            //日期
            if(obj.inputVal[0]&&obj.inputVal[1]){
              let objSend = {
                left: {
                  "col": obj.col,
                  "chinese": obj.chinese,
                  "uuid": obj.uuid,
                  "columnType": obj.columnType ? obj.columnType : "",
                  "relation": "LARGEEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[0], "yyyy-MM-dd"),
                },
                right: {
                  "col": obj.col,
                  "chinese": obj.chinese,
                  "uuid": obj.uuid,
                  "columnType": obj.columnType ? obj.columnType : "",
                  "relation": "LESSEQUAL", //>=
                  "val": commonUtil.formatWithDate(obj.inputVal[1], "yyyy-MM-dd")
                }
              }
              conditions.conditions.push(objSend.left);
              conditions.conditions.push(objSend.right);
            }
          } else if (obj.type === "ARRAY") {
            //卖家类型
            if (obj.inputVal.length == 1) {//只需传一个
              let objSend = {
                "col": obj.col,
                "chinese": obj.chinese,
                "uuid": obj.uuid,
                "columnType": obj.columnType ? obj.columnType : "",
                "relation": "EQUAL",
                "val": obj.inputVal[0]==='是'?'yes':'no'
              }
              conditions.conditions.push(objSend);
            }
          } else {
            if(obj.type !== "BSR"){
              //BSR分类不用发
              if(obj.type!="RATE"){
                if(obj.type=="INTNumber"||obj.type=="INTNumber2"){
                  let val1="";
                  let val2="";
                  let col1=obj.col;
                  let col2=obj.col;
                  switch(obj.type){
                    case "INTNumber":
                      val1=obj.inputVal[0]/100;
                      val2=obj.inputVal[1]/100;
                      col1="$repl$largeR";
                      col2="$repl$lessrR";
                      break;
                    case "INTNumber2":
                      val1=obj.inputVal[0];
                      val2=obj.inputVal[1];
                      col1="$repl$largeAngle";
                      col2="$repl$lessAngle";
                      break;
                  }
                  let objSend = {
                    left: {
                      "col": col1,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LARGEEQUAL", //>=
                      "val": val1
                    },
                    right: {
                      "col": col2,
                      "chinese": obj.chinese,
                      "uuid": obj.uuid,
                      "columnType": obj.columnType ? obj.columnType : "",
                      "relation": "LESSEQUAL", //>=
                      "val":val2
                    }
                  }
                  conditions.conditions.push(objSend.left);
                  conditions.conditions.push(objSend.right);
                }else{
                  let objSend = {
                    "col": obj.col,
                    "chinese": obj.chinese,
                    "uuid": obj.uuid,
                    "columnType": obj.columnType ? obj.columnType : "",
                    "relation": "EQUAL",
                    "val": obj.inputVal
                  }
                  conditions.conditions.push(objSend);
                }

              }

            }
          }
        }else{
          if(obj.type==="increment"&&obj.inputVal==""){
            let objSend = {
              "col": obj.col,
              "chinese": obj.chinese,
              "uuid": obj.uuid,
              "columnType": obj.columnType ? obj.columnType : "",
              "relation": "EQUAL",
              "val": 100000
            }
            conditions.conditions.push(objSend);
          }
        }
      }
    }
    return conditions.conditions;
  },
  /******保存配置信息****/
 //新爆品汇总推荐类型区分
  getCurrentState(pagetype,tabName,collectBtnsActive,platform="AMZ") {
    let typeState = "";
    if (pagetype == "explode") {
      if (tabName== "name1") {
        switch (collectBtnsActive) {
          case "tab1":
            if(platform=="AMZ"){
              typeState = 80;
            }else if(platform=="EBAY"){
              typeState = 81;
            }
            break;
          case "tab2":
            if(platform=="AMZ"){
              typeState = 82;
            }else if(platform=="EBAY"){
              typeState = 83;
            }
            break;
          case "tab3":
            if(platform=="AMZ"){
              typeState = 84;
            }else if(platform=="EBAY"){
              typeState = 85;
            }
            break;
        }
      } else if (tabName == "name4") {
        switch (collectBtnsActive) {
          case "tab1":
            if(platform=="AMZ"){
              typeState = 86;
            }else if(platform=="EBAY"){
              typeState = 87;
            }
            break;
          case "tab2":
            if(platform=="AMZ"){
              typeState = 88;
            }else if(platform=="EBAY"){
              typeState = 89;
            }
            break;
          case "tab3":
            if(platform=="AMZ"){
              typeState = 90;
            }else if(platform=="EBAY"){
              typeState = 91;
            }
            break;
        }
      } else if (tabName == "name3") {
        switch (collectBtnsActive) {
          case "tab1":
            if(platform=="AMZ"){
              typeState = 92;
            }else if(platform=="EBAY"){
              typeState = 93;
            }
            break;
          case "tab2":
            if(platform=="AMZ"){
              typeState =94;
            }else if(platform=="EBAY"){
              typeState = 95;
            }
            break;
          case "tab3":
            if(platform=="AMZ"){
              typeState = 96;
            }else if(platform=="EBAY"){
              typeState = 97;
            }
            break;
        }
      }
    } else {
      //新品
      if (tabName == "name1") {
        switch (collectBtnsActive) {
          case "tab1":
            if(platform=="AMZ"){
              typeState = 98;
            }else if(platform=="EBAY"){
              typeState = 99;
            }
            break;
          case "tab2":
            if(platform=="AMZ"){
              typeState = 100;
            }else if(platform=="EBAY"){
              typeState = 101;
            }
            break;
          case "tab3":
            if(platform=="AMZ"){
              typeState = 102;
            }else if(platform=="EBAY"){
              typeState = 103;
            }
            break;
        }
      } else if (tabName == "name4") {
        switch (collectBtnsActive) {
          case "tab1":
            if(platform=="AMZ"){
              typeState = 104;
            }else if(platform=="EBAY"){
              typeState = 105;
            }
            break;
          case "tab2":
            if(platform=="AMZ"){
              typeState = 106;
            }else if(platform=="EBAY"){
              typeState = 107;
            }
            break;
          case "tab3":
            if(platform=="AMZ"){
              typeState = 108;
            }else if(platform=="EBAY"){
              typeState = 109;
            }
            break;
        }

      } else if (tabName == "name3") {
        switch (collectBtnsActive) {
          case "tab1":
            if(platform=="AMZ"){
              typeState = 110;
            }else if(platform=="EBAY"){
              typeState = 111;
            }
            break;
          case "tab2":
            if(platform=="AMZ"){
              typeState = 112;
            }else if(platform=="EBAY"){
              typeState = 113;
            }
            break;
          case "tab3":
            if(platform=="AMZ"){
              typeState = 114;
            }else if(platform=="EBAY"){
              typeState = 115;
            }
            break;
        }

      }
    }
    return typeState;
  },
  //去重
  filterRepeat(arr){
    var res = [];
    var json = {};
    for(var i = 0; i < arr.length; i++){
      if(!json[arr[i]]){
        res.push(arr[i]);
        json[arr[i]] = 1;
      }
    }
    return res;
  },
  //带格式
  formatWithDate(date, fmt){
    if(date instanceof  Date){
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  },
  //日期格式处理
  formatDate(date) {
    if(date instanceof Date){
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    }else{
      return "无"
    }
  },
}

