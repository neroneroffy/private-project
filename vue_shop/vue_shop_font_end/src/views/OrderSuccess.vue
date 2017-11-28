<template>
  <div class="container">
    <NavHeader></NavHeader>
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>check out</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
        <li class="cur"><span>Confirm</span> address</li>
        <li class="cur"><span>View your</span> order</li>
        <li class="cur"><span>Make</span> payment</li>
        <li class="cur"><span>Order</span> confirmation</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>Congratulations! <br>Your order is under processing!</h3>
        <p>
          <span>Order ID：{{orderId}}</span>
          <span>Order total：{{orderTotal | currency('¥')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link to='/cart' class="btn btn--m">购物车</router-link>
          </div>
          <div class="btn-r-wrap">
            <router-link to="/" class="btn btn--m">继续购物</router-link>
          </div>
        </div>
      </div>
    </div>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
  import '../assets/css/base.css';
  import '../assets/css/product.css';
  import NavHeader from '@/components/NavHeader.vue';
  import NavFooter from '@/components/NavFooter.vue';
  import axios from 'axios';
  export default {
      data(){
          return {
              orderId:"",
              orderTotal:0
          }
      },
      components:{
        NavHeader,
        NavFooter,
      },
    mounted(){

          let orderId = this.$route.query.orderId;
          if(!orderId){
              return;
          }
          axios.get('/users/orderDetail',{params:{
            orderId:orderId
          }}).then((response)=>{
              let res = response.data;
              if(res.status === '0'){
                this.orderId = orderId;
                this.orderTotal = res.result.orderTotal;
              }
          })
    }
  }
</script>
<style>

</style>
