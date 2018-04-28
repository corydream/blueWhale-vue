// 测试权限api
// const keyApi = 'https://data-backend.banggood.cn'
 // const keyApi = 'http://192.168.38.36:8611'
 // const keyApi = 'http://192.168.37.73:8611'
 // const keyApi = 'http://192.168.38.192:8611'
// const keyApi = 'https://oa-backend.banggood.cn'
// var keyApi = process.env.API_ROOT;
var keyApi;
switch (window.location.hostname) {
    case "erp.banggood.cn":
    keyApi = 'https://oa-backend.banggood.cn';
    break;
    case "erpv2.banggood.cn":
    keyApi = 'https://oa-backend.banggood.cn';
    break;
    case "localhost":
    keyApi = 'http://192.168.15.211:8611';
    // keyApi = 'http://192.168.37.96:8611';
    break;
    case "127.0.0.1":
    keyApi = 'https://data-backend.banggood.cn';
    break;
    case "data.banggood.cn":
    keyApi = 'https://data-backend.banggood.cn';
    break;
    case "192.168.15.211":
    keyApi = 'http://192.168.15.211:8611';
    break;
    default:
    keyApi = 'https://data-backend.banggood.cn';
    break;
}

export default keyApi;

