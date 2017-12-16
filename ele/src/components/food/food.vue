<template>
  <transition name="slide">
    <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" >
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>

          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">原价{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
            </transition>

          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品介绍</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @choose="change" @toggle="togglecontent"></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                  </div>
                  <div class="time">
                    {{rating.rateTime | formatDate}}
                  </div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1,}"></span>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date.js';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  const POSITIVE = 1;
  const NEGATIVE = 0;
  const ALL = 2;
  export default{
    props:{
          food:{
              type:Object
          }
      },
    components:{
      cartcontrol,
      split,
      ratingselect
    },
    data(){
      return {
        showFlag:false,
        selectType:ALL,
        onlyContent:false,
        desc:{
            all:'全部',
            positive:'推荐',
            negative:'吐槽'
        }
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },
    methods:{
      show(){
          this.showFlag = true;
          this.selectType = ALL;
          this.onlyContent = false;
          console.log(this.onlyContent)
        this.$nextTick(()=>{
           if(!this.scroll){
               this.scroll = new BScroll(this.$refs.food,{
                   click:true
               })
           }else{
               this.scroll.refresh();
           }
        });
        },
      hide(){
        this.showFlag = false
      },
      addFirst(event){
          if(!event._constructed){
              return;
          }
          Vue.set(this.food,'count',1);
      },
      needShow(type,text){
        if(this.onlyContent && !text){
            return false;
        }
        if(this.selectType === ALL){
            return true;
        }else{
            return !(type === this.selectType)
        }
      },
      change(type){
        this.selectType = type;
        this.$nextTick(()=>{
          this.scroll.refresh();
        });

      },
      togglecontent(content){

        this.onlyContent = content;
        this.$nextTick(()=>{
          this.scroll.refresh();
        });

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position :fixed
    left:0
    top:0
    bottom: 48px
    z-index:30
    width :100%
    background :#fff
    .image-header
      position :relative
      width :100%
      height :0
      padding-top :100%
      img
        position :absolute
        top:0
        left:0
        width :100%
        height: 100%
      .back
        position :absolute
        top: 10px
        left:0
        .icon-arrow_lift
          display :block
          padding :10px
          font-size :20px
          color :#fff

    .content
      padding :18px
      position :relative
      .title
        line-height :14px
        margin-bottom: 8px
        font-size :14px
        font-weight :700
        color:rgb(7,17,27)
      .detail
        margin-bottom :18px
        line-height :10px
        height :10px
        font-size :0
        .sell-count,.rating
          font-size :10px
          color :rgb(147,153,159)
        .sell-count
          margin-right :12px
      .price
        line-height :24px
        .now
          margin-right: 18px
          font-size :14px
          font-weight :700
          color:rgb(240,20,20)
          .money-icon
            font-size :10px
        .old
          text-decoration :line-through
          font-size :10px
          font-weight :700
          margin-left -15px
          color :rgb(147,153,159)
      .cartcontrol-wrapper
        position :absolute
        right: 12px
        bottom: 12px
      .buy
        position :absolute
        right:18px
        bottom: 18px
        z-index: 10
        height :24px
        line-height :24px
        padding :0 12px
        box-sizing :border-box
        font-size :10px
        border-radius :12px
        color :#fff
        background :rgb(0,160,220)
    .info
      padding: 18px
      .title
        line-height :14px
        margin-bottom :6px
        font-size :14px
        color:rgb(7,17,27)
      .text
        line-height :24px
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)
    .rating
      padding-top :18px
      padding-bottom :48px
      .title
        margin-left :18px
        line-height :14px
        font-size :14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position :relative
          padding: 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position :absolute
            right:0
            top: 16px
            line-height :12px
            font-size :0
            .name
              display :inline-block
              vertical-align :top
              margin-right :6px
              font-size :10px
              color:rgb(147,153,159)
            .avatar
              border-radius :50%
          .time
            margin-bottom :6px
            line-height :12px
            font-size :10px
            color:rgb(147,153,159)
          .text
            line-height :16px
            font-size :12px
            color:rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right :4px
              line-height :24px
              font-size :12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
        .no-rating
          padding :16px 0
          font-size :12px
          color:rgb(147,153,159)
  .slide-enter-active
    transition: all .5s ease
    transform:translate3d(0,0,0)

  .slide-leave-active
    transition: all .5s ease
    transform:translate3d(0,0,0)

  .slide-enter,.slide-leave-to
    transform:translate3d(100%,0,0)

  .fade-enter-active,.fade-leave-active
    opacity :1
    transition:all 0.4s
  .fade-enter,.fade-leave-to
    opacity:0
</style>
