let tableDataClass = {
  //获取表格数据接口
  getTableDataUrl(type, tabName) {
    let sendObj = {};
    sendObj.state=0;
    sendObj.sendType="summary";
    if (type == "explode") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/best/list"
          break;
        case "name1":
          sendObj.configUrl = "/recommendation/best/list/details";
          break;
        case "name3":
          sendObj.sendType="recommend";
          sendObj.configUrl = "/recommendation/best/list/details";
          break;
      }
    } else if (type == "news") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/new/list"; //新品
          break;
        case "name1":
          sendObj.configUrl = "/recommendation/new/list/details";
          break;
        case "name3":
          sendObj.sendType = "recommend";
          sendObj.configUrl = "/recommendation/new/list/details";
          break;
      }
    }
    return sendObj;
  },
  //tab2表格数据接口
  getTableDataUrlForTab(type, tabName) {
    let sendObj = {};
    sendObj.state = 0;
    sendObj.sendType = "summary";
    if (type == "explode") {
      switch (tabName) {
        case "name4":
          sendObj.state = 1;
          break;
        case "name1":
          break;
        case "name3":
          sendObj.sendType = "recommend";
          break;
      }
      sendObj.configUrl = "/di/list/best/stable";
    } else if (type == "news") {
      switch (tabName) {
        case "name4":
          sendObj.state = 1;
          break;
        case "name1":
          break;
        case "name3":
          sendObj.sendType = "recommend";
          break;
      }
      sendObj.configUrl = "/di/list/new/stable";
    }
    return sendObj;
  },
  //获取表格总数
  getTableCountModel(type, tabName) {
    let sendObj = {};
    sendObj.state=0;
    if (type == "explode") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/best/row/sum"
          break;
        case "name1":
          sendObj.configUrl = "/di/common/row/sum";
          break;
        case "name3":
          sendObj.configUrl = "/di/common/row/sum";
          break;
      }
    } else if (type == "news") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/new/row/sum"; //新品
          break;
        case "name1":
          sendObj.configUrl = "/di/common/row/sum";
          break;
        case "name3":
          sendObj.configUrl = "/di/common/row/sum";
          break;
      }
    }
    return sendObj;
  },
  //收藏模型判断
  checkCollectionModel(type,platform="AMZ") {
    let sendObj={};
    if (platform == "AMZ") {
        sendObj.modelId="504";
        sendObj.cid="504";
      switch (type){
        case "list":
          sendObj.configUrl="/di/common/list/collections"
          break;
        case "total":
          sendObj.configUrl="/di/common/row/collection/sum";
          break;
        case "brandName":
        case "productName":
          sendObj.configUrl="/di/box/collection/data";
          break;

      }
    } else if (platform == "EBAY") {
      sendObj.modelId="624";
      sendObj.cid="624";
      sendObj.configUrl="/di/common/list/collections"
    }
    return sendObj;
  },
  //获取产品名称
  getProductDataModel(type, tabName) {
    let sendObj = {};
    sendObj.state=0;
    sendObj.configUrl="/di/box/data";
    if (type == "explode") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/best/list/products"
          break;
      }
    } else if (type == "news") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/new/list/products"; //新品
          break;
      }
    }
    return sendObj;
  },
  //产品名称tab
  getProductDataModelTab(type, tabName){
    let sendObj = {};
    if (type == "explode") {
      sendObj.configUrl ="/di/list/best/stable/product";
    } else if (type == "news") {
      sendObj.configUrl = "/di/list/new/stable/product"; //新品
    }
    return sendObj;
  },
  getBrandDataModelTab(type, tabName){
    let sendObj = {};
    if (type == "explode") {
      sendObj.configUrl ="/di/list/best/stable/brands";
    } else if (type == "news") {
      sendObj.configUrl = "/di/list/new/stable/brands"; //新品
    }
    return sendObj;
  },
  //获取品牌名称
  getBrandDataModel(type, tabName) {
    let sendObj = {};
    sendObj.state=0;
    sendObj.configUrl="/di/box/data";
    if (type == "explode") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/best/list/brand"
          break;
      }
    } else if (type == "news") {
      switch (tabName) {
        case "name4":
          sendObj.state=1;
          sendObj.configUrl = "/di/cross/new/list/brand"; //新品
          break;
      }
    }
    return sendObj;
  },
  //获取品牌总数
  //获取列表总数
  getListSumModel(type, tabName){
    let sendObj = {};
    sendObj.state = 0;
    sendObj.sendType = "summary";
    if (type == "explode") {
      switch (tabName) {
        case "name4":
          sendObj.state = 1;
          break;
        case "name1":
          break;
        case "name3":
          sendObj.sendType = "recommend";
          break;
      }
      sendObj.configUrl = "/di/list/best/stable/row/count";
    } else if (type == "news") {
      switch (tabName) {
        case "name4":
          sendObj.state = 1;
          break;
        case "name1":break;
        case "name3":
          sendObj.sendType = "recommend";
          break;
      }
      sendObj.configUrl = "/di/list/new/stable/row/count";
    }
    return sendObj;
  },
}
export default tableDataClass
