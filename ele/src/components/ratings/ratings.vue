<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分 </span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper ">
            <span class="title">送达时间 </span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" @choose="change" @toggle="togglecontent"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
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
  import ratingselect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date.js';

  const ALL = 2;
  const ERR_OK =0;
  export default {
    data(){
      return {
        ratings:[],
        selectType:ALL,
        onlyContent:true,
        desc:{
          all:'全部',
          positive:'推荐',
          negative:'吐槽'
        }

      }
    },
    props:{
        seller:{
            type:Object
        }
    },
    components:{
      star,
      split,
      ratingselect
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
    },
    created(){
      this.$http.get('/api/ratings').then((response)=>{
        response = response.body;
        if(response.errno === ERR_OK){
          this.ratings = response.data;
          this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.ratings,{
              click:true
            })

          })
        }
      })
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position :absolute
    top: 174px
    bottom:0
    width: 100%
    left:0
    overflow :hidden
    .overview
      display :flex
      padding:18px 0
      .overview-left
        padding :6px 0
        flex:0 0 137
        width: 137px
        border-right:1px solid rgba(7,17,27,0.1)
        text-align :center
        @media only screen and (max-width:375px){
          flex:0 0 120px
          width: 120px
        }
        .score
          margin-bottom 6px
          font-size: 24px
          line-height: 28px
          color: rgb(255,153,0)
        .title
          margin-bottom:8px
          font-size :12px
          line-height :12px
          color :rgb(7,17,27)
        .rank
          padding-bottom: 6px
          font-size: 10px
          line-height: 14px
          color rgb(147,153,159)
      .overview-right
        flex:1
        padding:6px 0 6px 24px
        @media only screen and (max-width:375px){
          padding-left: 6px
        }

        .score-wrapper
          line-height: 18px
          margin-bottom :4px
          font-size :0
          .title
            display :inline-block
            line-height: 18px
            vertical-align :top
            color :rgb(7,17,27)
            font-size:12px
          .star
            display :inline-block
            margin :0 12px
            vertical-align :top
          .score
            display inline-block
            vertical-align :top
            line-height: 18px
            font-size :12px
            color :rgb(255,153,0)
        .delivery-wrapper
            font-size :0
            .title
              line-height :18px
              font-size: 12px
              color :rgb(7,17,27)
            .delivery
              font-size: 12px
              margin-left :12px
              color :rgb(147,153,159)




    .rating-wrapper
      padding:0 18px
      .rating-item
        display: flex
        padding :18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex :0 0 28px
          width: 28px
          margin-right :12px
          img
            border-radius :50%
        .content
          flex:1
          position :relative
          .name
            margin-bottom :4px
            font-size :10px
            line-height: 12px
            color :rgb(7,17,27)
          .star-wrapper
            font-size :0
            margin-bottom :6px
            .star
              display :inline-block
              vertical-align :top
              margin-right: 6px
            .delivery
              display :inline-block
              vertical-align :top
              font-size :10px
              line-height: 12px
              color :rgb(147,153,159)


          .text
            line-height: 18px
            color :rgb(7,17,27)
            font-size :12px
            margin-bottom :8px
          .recommend
            line-height :16px
            font-size :0
            .icon-thumb_up, .item
              margin:0 8px 4px 0
              display:inline-block
              font-size :9px
            .icon-thumb_up
              color :rgb(0,160,220)
            .item
              padding:0 6px
              border:1px solid rgba(7,17,27,0.1)
              border-radius :1px
              color:rgb(147,153,159)
              background :#fff
          .time
            position :absolute
            top:0
            right :0
            line-height :12px
            font-size :10px
            color :rgb(147,153,159)
</style>
