<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block no-border">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              <span>分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref = 'picList'>
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120px" height="90px" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll';
  import star from '../stars/star.vue';
  import split from '../split/split.vue';
  import { saveToLocal,loadFromLocal } from '../../common/js/store'
  export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
      return {
        favorite:loadFromLocal(this.seller.id,'favourite',false)
      }
    },
    created(){
      this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"]
    },
    mounted(){
        console.log(this.seller)
      this._initScroll();
      if(this.seller.pics){
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width +'px'
        this.$nextTick(()=>{
            this.picScroll = new BScroll(this.$refs.picWrapper,{
                scrollX:true,
                eventPassThrow:'vertical'
            })
        })

      }
    },
    components:{
      star,
      split
    },
    methods:{
        _initScroll(){
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.seller,{
                click:true
              })
            }
        },
      toggleFavorite(event){
        if(!event._constructed){
            return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id,'favourite',this.favorite)
      }
    },
    computed:{
      favoriteText(){
          return this.favorite?'已收藏':'收藏'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position :absolute
    top: 174px
    bottom:0
    width: 100%
    left:0
    overflow :hidden
    .overview
      position :relative
      padding: 18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        margin-bottom: 8px
      .desc
        padding-bottom :18px
        border-1px(rgba(7,17,27,0.1))
        font-size :0
        .star
          display: inline-block
          vertical-align :top
          margin-right :8px
        .text
          margin-right :12px
          font-size :10px
          line-height :18px
          color :rgb(77,85,93)
          display :inline-block
          vertical-align :top

      .remark
        display :flex
        padding-top :18px
        .block
          flex:1
          text-align :center
          border-right:1px solid rgba(7,17,27,0.1)
          &:last-child
            border:none
          h2
            font-size :10px
            color :rgb(157,153,159)
            margin-bottom :4px
          .content
            line-height :24px
            font-size :10px
            font-weight :200
            color :rgb(7,17,27)
            .stress
              font-size :24px


      .favorite
        position :absolute
        width: 50px
        top: 18px
        right: 11px
        text-align :center
        .icon-favorite
          display :block
          line-height :24px
          font-size :24px
          margin-bottom :4px
          color #d4d6d9
        .active
          color :rgb(240,20,20)
        .text
          line-height :10px
          font-size :10px
          color :rgb(77,85,93)
    .bulletin
      padding:18px 18px 0 18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        margin-bottom: 8px
      .content-wrapper
        padding:0 12px 16px 12px
        border-1px(rgba(7,17,27,0.1))
        .content
          font-size :12px
          font-weight :200
          line-height :24px
          color :rgb(240,20,20)

      .supports
        .support-item
          padding:16px 12px
          font-size :0
          border-bottom:1px solid rgba(7,17,27,0.1)
          &:last-child
            border:none
        .icon
          display :inline-block
          width: 16px
          height :16px
          vertical-align :top
          margin-right: 6px
          background-size :16px 16px
          background-repeat :no-repeat
          &.decrease
            bg-image("decrease_4")
          &.discount
            bg-image("discount_4")
          &.guarantee
            bg-image("guarantee_4")
          &.invoice
            bg-image("invoice_4")
          &.special
            bg-image("special_4")

        .text
          font-size :12px
          line-height :16px
          font-weight :200
          color:rgb(7,17,27)

    .pics
      padding:18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        margin-bottom: 12px
      .pic-wrapper
        width: 100%
        overflow :hidden
        white-space :nowrap
        .pic-list
          font-size :0
          .pic-item
            display :inline-block
            margin-right :6px
            width: 120px
            height: 90px
            &:last-child
              margin:0


    .info
      padding:18px 18px 0 18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        padding-bottom: 12px
        border-1px(rgba(7,17,27,0.1))
      .info-item
        padding: 16px 12px
        font-size :12px
        line-height :16px
        color :rgb(7,17,27)
        border-1px(rgba(7,17,27,0.1))

</style>
