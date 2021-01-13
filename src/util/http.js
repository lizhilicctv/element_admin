import axios from "axios";
import { Notification } from "element-ui";
import qs from "qs";
import store from "../store";

axios.defaults.baseURL = "http://think.com/api.php";

axios.interceptors.request.use(
  config => {
    if (config.method === "post") {
      // 这里使用qs对数据进行处理，防止后台$_POST接收不到
	  if (store.state.token) {
	    config.data.token = `${store.state.token}`;
	  }
	  config.data.lizhili= '0d89b868429be6158ba1ebc0f7c073de';
      config.data = qs.stringify(config.data);
    }

    const requestConfig = config;
   
    return requestConfig;
  },
  err => {
    Promise.reject(err);
  }
);

axios.interceptors.response.use(

  response => {
	  store.state.loading=false 
	  if(response.data.code==0){
		  let message = response.data.message;
		  Notification.error({
		    title: "系统提示",
		    dangerouslyUseHTMLString: true,
		    message,
		    duration: 2000
		  });
	  }
    return response.data;
  },
  error => {
	console.log(error);
	this.$store.state.loading=false 
    let message = '系统错误，请检查网络通信';
    Notification.error({
      title: "系统提示",
      dangerouslyUseHTMLString: true,
      message,
      duration: 2000
    });
    return Promise.reject(error);
  }
);

export default axios;
