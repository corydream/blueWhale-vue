import api from './../../../data/tempApi'

const applicationApi=function(urlStr,datas,callBack){
	$.ajax({
            type : "post",
            url :api+urlStr,
            xhrFields: {
                withCredentials: true
            },
            dataType:"json",
            data:datas,
            success :(res)=>{
            	if(callBack)callBack(res);
            }
        });
}
export default applicationApi;