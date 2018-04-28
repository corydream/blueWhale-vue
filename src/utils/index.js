
import * as ajaxFun from './ajax';

import { Message } from 'iview';


export const ajax = ajaxFun
export const createAjaxAction = (httpHandle, startAction) => (reqData, cb, reject, handleCancel) => {
  // requet start
  httpHandle(reqData, handleCancel)
    .then((resp) => {
      switch (resp.status) {
      case 200:
        cb && cb(resp)
        break
      case 400:
      default:
        if (resp.status.toString() === '400') {
          location.href = 'https://data.banggood.cn/bgbdp/index#/dataBoard/0';
        }
        if (reject) {
          reject(resp)
        } else {
          Message.info(resp.msg)
        }
        break
      }
    })
    .catch((error) => {
      console.log(error, reject)
      if (reject) {
        reject({ status: 0, msg: error.message })
      } else {
        Message.error(error.message)
      }
    })
}
