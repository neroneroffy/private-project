<template>
  <div class="cartcontrol">
    <transition name="slide-fade">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart"></div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script type="text/javascript">
  import Vue from "vue";
  export default{
      props:{
          food:{
              type:Object
          }
      },
      data(){
        return {
        }
      },
    methods:{
        addCart(event){
            if(!event._constructed){
                return
            };

            if(!this.food.count){
                Vue.set(this.food,"count" ,1);
            }else{
                this.food.count++;
            };
            this.$emit('cartAdd',event.target)
        },
        decreaseCart(){
          if(!event._constructed){
            return
          };
          if(event._constructed){
            this.food.count--;
          };
          this.$emit('cartDearease')
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size :0
    .cart-decrease
      display: inline-block
      padding:6px
      line-height :24px
      font-size :24px
      color :rgb(0,160,220)
    .cart-count
      display: inline-block
      vertical-align :top
      width :12px
      padding-top :6px
      line-height :24px
      text-align :center
      font-size :10px
      color:rgb(147,153,159)
    .cart-add
      display: inline-block
      padding:6px
      line-height :24px
      font-size :24px
      color :rgb(0,160,220)
  .slide-fade-enter-active,.slide-fade-leave-active
    transform :translate3d(0,0,0) rotateZ(0deg)
    opacity :1
    transition: all .5s ease

  .slide-fade-enter,.slide-fade-leave-active
    transform :translate3d(24px,0,0) rotateZ(360deg)
    opacity :0
</style>
