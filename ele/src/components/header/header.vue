<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div @click="showDetail" class="support-count">
        <span v-if="seller.supports" class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wraper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>

            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../stars/star.vue'
  export default {
      components:{
          star
      },
      props:{
        seller:{}
      },
    data(){
      return{
          detailShow:false
      }
    },
    created(){
      this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"]
    },
    methods:{
      showDetail(){
        this.detailShow = true
      },
      hideDetail(){
        this.detailShow = false
      }
    }

  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color: #ffffff
    position :relative
    overflow :hidden
    background :rgba(7,17,27,0.5)
    .content-wrapper
      position :relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display:inline-block
        img
          width: 64px
          border-radius 2px
      .content
        margin-left: 16px
        display: inline-block
        vertical-align: top
        font-size: 12px
        .title
          margin:2px 0 8px 0
          .name
            margin-left: 16px
            font-size: 16px
            line-height :18px
            font-weight: bolder
          .brand
            display: inline-block
            vertical-align :top
            width: 30px
            height: 18px
            bg-image("brand")
            background-size :30px 18px
            background-repeat :no-repeat
        .description
          margin-bottom :10px
          font-size :12px
          line-height:12px
        .supports
          .text
            line-height: 12px
            font-size :12px
          .icon
            display: inline-block
            vertical-align: top
            width :12px
            height :12px
            margin-right :4px
            background-size :12px 12px
            background-repeat :no-repeat
            &.decrease
              bg-image("decrease_1")
            &.discount
              bg-image("discount_1")
            &.guarantee
              bg-image("guarantee_1")
            &.invoice
              bg-image("invoice_1")
            &.special
              bg-image("special_1")
      .support-count
        position :absolute
        right:12px
        bottom: 14px
        padding:0 8px
        height: 24px
        line-height:24px
        border-radius :14px
        background :rgba(0,0,0,0.2)
        text-align :center
        .count

          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height:24px
          margin-left :2px
          font-size :10px
    .bulletin-wrapper
      height :28px
      padding:0 22px 0 12px
      line-height: 28px
      white-space: nowrap
      overflow: hidden
      text-overflow :ellipsis
      position :relative
      background :rgba(7,17,27,0.2)
      .bulletin-title
        display :inline-block
        vertical-align :top
        margin-top:6px
        width :22px
        height :12px
        bg-image("bulletin")
        background-size:22px 12px
        background-repeat :no-repeat
      .bulletin-text
        font-size: 10px
        margin-left :4px
        vertical-align :top
      .icon-keyboard_arrow_right
        position :absolute
        font-size: 10px
        right: 12px
        top:8px
    .background
      position :absolute
      top:0
      left:0
      z-index :-1
      width :100%
      height :100%
      filter:blur(10px)
      img
        width:100%


    .detail
      position :fixed
      z-index:100
      top:0
      left:0
      width: 100%
      height :100%
      overflow:auto
      background :rgba(7,17,27,0.8)
      backdrop-filter:blur(10px)
      .detail-wraper
        min-height :100%
        width :100%
        .detail-main
          margin-top:64px
          padding-bottom: 64px
          .name
            line-height 16px
            font-size :16px
            font-weight :700
            text-align :center
          .star-wrapper
            margin-top :18px
            padding:2px 0
            text-align :center
          .title
            display :flex
            width :80%
            margin:28px auto 24px
            .line
              flex:1
              position :relative
              top:-6px
              border-bottom :1px solid rgba(255,255,255,0.2)
            .text
              padding :0 12px
              font-size :14px
              font-weight :700
          .supports
            width :80%
            margin:0 auto
            .support-item
              padding:0 12px
              margin-bottom :12px
              font-size :0
              &last-child
                margin-bottom :0
              .icon
                display :inline-block
                width: 16px
                height :16px
                vertical-align :top
                margin-right: 6px
                background-size :16px 16px
                background-repeat :no-repeat
                &.decrease
                  bg-image("decrease_2")
                &.discount
                  bg-image("discount_2")
                &.guarantee
                  bg-image("guarantee_2")
                &.invoice
                  bg-image("invoice_2")
                &.special
                  bg-image("special_2")

              .text
                font-size: 12px
                line-height: 16px
          .bulletin
            width: 80%
            margin:0 auto
            .content
              padding :0 12px
              line-height :24px
              font-size :12px
  .detail-close
        position :relative
        width :32px
        height :32px
        margin:-60px auto
        clear:both
        font-size :32px
        color:rgba(255,255,255,0.5)


  .fade-enter-active, .fade-leave-active
    opacity:1
    transition :all .5s
  .fade-enter, .fade-leave-active
    opacity:0


</style>
