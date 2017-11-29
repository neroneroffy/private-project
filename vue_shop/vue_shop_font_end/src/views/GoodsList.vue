<template>
    <div id="good-list">
      <NavHeader></NavHeader>
      <NavBread>
        <span>商品列表</span>
      </NavBread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="price" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBuy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked === 'all'}" @click="selectAll" >All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked === index }">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                  <ul>
                    <li v-for="item in goodsList" v-if="goodsList.length === 0?false:true">
                      <div class="pic">
                        <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">{{item.productName}}</div>
                        <div class="price">{{item.salePrice}}</div>
                        <div class="btn-area">
                          <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                <div v-show="loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="pagination-loading">
                  <img src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal v-bind:mdShow="mdShow" @close="closeModal">
        <p slot="message">
          请先登录，否则无法加入到购物车中!
        </p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn-m" @click="mdShow=false">关闭</a>
        </div>
      </Modal>
      <Modal v-bind:mdShow="mdShowCart" @close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
          </svg>
          加入购物车成功
        </p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn-m" @click="mdShowCart=false">继续购物</a>
          <router-link class="btn btn-m" @click="mdShow=false" to="/cart">查看购物车</router-link>
        </div>
      </Modal>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <NavFooter></NavFooter>
    </div>
</template>
<style>
  .pagination-loading{
    text-align: center;
  }
  .btn:hover{
    background:#ffe5e6 ;
    transition:all .3s ease-out
  }
  .icon-status-ok{
    font-size: 30px;
  }
</style>
<script>
    import '../assets/css/base.css';
    import '../assets/css/product.css';
    import NavHeader from '@/components/NavHeader.vue';
    import NavFooter from '@/components/NavFooter.vue';
    import NavBread from '@/components/NavBread.vue';
    import axios from 'axios';
    import Modal from '../components/Modal.vue';
    export default {
      mounted(){
          this.getGoodsData()
      },
      data(){
        return {
          goodsList:[],
          priceFilter:[
            {
                startPrice:'0.00',
                endPrice:'100.00'
            },
            {
                startPrice:'100.00',
                endPrice:'500.00'
            },
            {
                startPrice:'500.00',
                endPrice:'1000.00'
            },
            {
                startPrice:'1000.00',
                endPrice:'5000.00'
            },
          ],
          priceChecked:"all",
          filterBuy:false,
          overLayFlag:false,
          sortFlag:true,
          page:1,
          pageSize:8,
          busy:true,
          loading: false,
          mdShow:false,
          mdShowCart:false
        }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread,
        Modal
      },
      methods:{
        getGoodsData(flag){
            let param = {
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1,
                priceLevel:this.priceChecked
            };
          this.loading = true;
          axios.get(`/goods/list`,{
              params:param
          }).then((res)=>{
            this.loading = false;
              if(res.status ===200){
                //如果是分页请求，那么数据累加
                if(flag){
                  this.goodsList = this.goodsList.concat(res.data.result.list);
                  if(res.data.result.count === 0){
                    this.busy = true
                  }else{
                    this.busy = false
                  }
                }else{
                  this.goodsList = res.data.result.list;
                  if(res.data.result.count < this.pageSize){
                    this.busy = true;
                  }else{
                    this.busy = false;

                  }

                }

              }else{
                  this.goodsList = []
              }

          })
        },
        //排序
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          console.log(this.busy)
          this.getGoodsData()
        },
        //滚动加载分页数据
        loadMore(){
          this.busy = false;
          setTimeout(()=>{
            this.page++;
            this.getGoodsData(true);
            this.busy = false
          },500)
        },
        setPriceFilter(index){
          this.priceChecked = index;
          this.overLayFlag = true;
          this.filterBuy = false;
          this.overLayFlag = false;
          this.page = 1;
          this.getGoodsData()
        },
        //加入购物车
        addCart(productId){
          axios.post('/goods/addCart',{
              productId:productId
          }).then(res=>{
              if(res.data.status === "0"){
                this.mdShowCart = true;
                this.$store.commit('updateCartCount',1)
              }else{
                  this.mdShow = true

              }
          })
        },
        selectAll(){
          this.priceChecked = "all";
          this.overLayFlag = true;
          this.filterBuy = false;
          this.overLayFlag = false;
          this.page = 1;
          console.log(this.busy);
          this.getGoodsData()

        },
        showFilterPop(){
          this.filterBuy = true;
          this.overLayFlag = true
        },
        closePop(){
          this.filterBuy = false;
          this.overLayFlag = false
        },
        closeModal(){
            this.mdShow = false;
            this.mdShowCart = false
        }
      }
    }
</script>
<style>

</style>

