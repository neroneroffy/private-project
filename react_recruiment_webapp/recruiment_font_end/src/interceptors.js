/**
 * Created by haita on 2017/12/14 0014.
 */
import axios from 'axios';
import { Toast } from 'antd-mobile'
axios.interceptors.request.use((config)=>{
    Toast.loading('加载中',0);
    return config
})
axios.interceptors.response.use((config)=>{
    Toast.hide()
    return config
})
