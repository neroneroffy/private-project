<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
<!--      <div class="ball-container">
        <transition
          v-for="ball in balls"
          name="drop"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
        >
          <div class="ball" v-show="ball.show" >
            <transition name="horizontal">
              <div class="inner inner-hook"></div>
            </transition>
          </div>
        </transition>

      </div>-->
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @cartDearease="dearease"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="hideList">

    </div>
  </div>

</template>

<script type="text/javascript">
  import Bscroll from "better-scroll";
  import cartcontrol from "../cartcontrol/cartcontrol.vue";
  export default{
      components:{
        cartcontrol
      },
      props:{
        selectFoods:{
            type:Array,
            default(){
                return [
                ]
            }
        },
        deliveryPrice:{
            type:Number,
            default:0
        },
        minPrice:{
          type:Number,
          default:0
        }
      },
    mounted(){
          this.$on("cartAdd",function(){

          })
    },
    data(){
      return {
        fold:true,

        balls:[
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          }
        ],
        dropedBalls:[]

      }
    },
    computed:{
      totalPrice(){
              let total = 0;
              this.selectFoods.forEach((food)=>{
                  total+=food.price * food.count
              });
            return total
          },
      totalCount(){
              let count = 0;
              this.selectFoods.forEach((food)=>{
                  count += food.count;
              });
        return count
      },
      payDesc(){
          if(this.totalPrice === 0){
              return `￥${this.minPrice}元起送`;
          }else if(this.totalPrice < this.minPrice){
              return `还差${this.minPrice-this.totalPrice}元起送`
          }else{
              return `去结算`
          };
      },
      payClass(){
          if(this.totalPrice<this.minPrice){
              return "not-enough"
          }else{
              return "enough"
          }
      },
      listShow(){
          if(!this.totalCount){
              this.fold=true;
              return false;
          }
          let show = !this.fold;
          if(show){
              this.$nextTick(()=>{
                  if(!this.scroll){
                    this.scroll = new Bscroll(this.$refs.listContent,{
                      click:true
                    })
                  } else{
                      this.scroll.refresh();
                  }

              });
          }
          return show;
      }
    },
    methods:{
      drop(el){

        for(let i=0;i<this.balls.length;i++){
            let ball = this.balls[i];
            if(!ball.show){
                ball.show=true;
                ball.el = el;
                this.dropedBalls.push(ball);
                return;
            }
        }
      },
      beforeEnter(el){
        let count = this.balls.length;
        while(count--){
          let ball = this.balls[count];
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left-32;
            let y = -(window.innerHeight - rect.top - 50);
            console.log(el)
            el.style.display = "";
            el.style.webkitTransform = `translateX(${x}px) translateY(${y}px)`;
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
/*            let inner = el.getElementsByClassName("inner-hook")[0];
            console.log(inner)
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;*/
          }
        }

      },
      enter(el){
        /* eslint-disable no-unsed-vars */
        let rf = el.offsetHeight;
        this.$nextTick(()=>{
/*          el.style.webkitTransform = 'translateX(0) translateY(0)';
          el.style.transform = 'translateX(0) translateY(0)';*/
/*          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';*/

        })
      },
      afterEnter(el){
          let ball = this.dropedBalls.shift();
          if(ball){
              ball.show = false
            el.style.display = 'none'
          }
      },
      empty(){
        this.selectFoods.forEach((food)=>{
            food.count = 0;
        })
      },
      hideList(){
          this.fold = true;
      },
      pay(){
         if(this.totalPrice<this.minPrice){
             return;
         }
         window.alert(`支付${this.totalPrice}元`)
      },
      dearease(){
        this.cartListHeight();
        console.log(3333333333)
      },

      toggleList(){

            if(!this.totalCount){
                return;
            }
            this.fold = !this.fold;
            this.cartListHeight();
      },
      cartListHeight(){
        this.$nextTick(()=>{
          let cartList = document.getElementsByClassName("list-content")[0];
          let shopCart = document.getElementsByClassName("shopcart-list")[0];
          shopCart.style.top = -(cartList.offsetHeight+48)+'px'
        });

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position :fixed
    left:0
    bottom :0
    z-index:50
    width :100%
    height :48px
    background :#000
    .content
      display :flex
      background: #141d27
      color:rgba(255,255,255,0.4)
      .content-left
        flex:1
        font-size :0
        .logo-wrapper
          display :inline-block
          position :relative
          top: -10px
          margin:0 12px
          padding:6px
          width: 56px
          height :56px
          box-sizing :border-box
          vertical-align:top
          border-radius :50%
          background :#141d27
          .logo
            width: 100%
            height: 100%
            border-radius :50%
            background :#2b343c
            text-align :center
            &.highlight
              background :rgb(0,160,220)
            .icon-shopping_cart
              display :inline-block
              line-height :44px
              font-size :24px
              color:#80858a
              &.highlight
                color:#fff
          .num
            position :absolute
            top:0
            right:0
            width :24px
            height :16px
            line-height :16px
            text-align :center
            border-radius :16px
            font-size :9px
            font-weight :700
            color :#fff
            background :rgb(240,20,20)
            box-shadow :0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display :inline-block
          vertical-align :top
          line-height :24px
          margin-top :12px
          padding-right :12px
          box-sizing :border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size :16px
          font-weight :700
          &.highlight
            color:#fff

        .desc
          display :inline-block
          vertical-align :top
          margin :12px 0 0 12px
          line-height :24px
          font-size :10px
          color:#80858a
      .content-right
        flex:0 0 105px
        width :105px
        .pay
          height :48px
          line-height :48px
          text-align :center
          font-size :12px
          font-weight :700
          background :#2b333b
          &.not-enough
            background :#2b333b
          &.enough
            background:#00b43c
            color :#fff

    .ball-container
      .ball
        position :fixed
        left: 32px
        bottom: 22px
        z-index :200
        .inner
          width: 16px
          height: 16px
          border-radius :50%
          background :rgb(0,160,220)


    .shopcart-list
      position :absolute
      left:0

      z-index:-1
      width :100%
      padding-bottom: 12px
      background-color: #fff

      .list-header
        height :40px
        line-height 40px
        padding :0 18px
        background :#f3f5f7
        border-bottom:1px solid rgba(7,17,27,0.1)

        .title
          float: left
          font-size :14px
          color:rgb(7,17,27)
        .empty
          float :right
          font-size :12px
          color:rgb(0,160,220)

      .list-content
        padding:0 18px
        max-height :217px
        overflow :hidden
        background :#fff
        .food
          position :relative
          padding :12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height :24px
            font-size :14px
            color:rgb(7,17,27)
          .price
            position :absolute
            right: 90px
            bottom: 12px
            line-height :24px
            font-weight :700
            font-size :14px
            color:rgb(240,20,20)
          .cartcontrol-wrapper
            position :absolute
            right:0
            bottom: 6px


  .move-enter-active,.move-leave-active
    transition: all .5s ease
    transform:translate3d(0,0,0)
  .move-enter,.move-leave-active
    transform:translate3d(0,100%,0)
    opacity :0


 .drop-enter-active
   transform:translateY 2s cubic-bezier(.73,-1.03,1,.74), translateX 2s linear



  .drop-enter


/*  .horizontal-enter-active
    transform:translateY 0.4s cubic-bezier(.73,-1.03,1,.74), translateX 0.4s linear*!
  .horizontal-enter*/

  .list-mask
    position :fixed
    top:0
    left:0
    height :100%
    width :100%
    z-index :40
    background :rgba(7,17,27,0.6)
    backdrop-filter:blur(10px)
</style>
