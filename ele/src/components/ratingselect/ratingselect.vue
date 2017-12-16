<template>
  <div class="ratingselect">
    <div class="rating-type" border-1px>
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectedType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(1,$event)" class="block positive" :class="{'active':selectedType===1}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(0,$event)" class="block negative" :class="{'active':selectedType===0}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':content}" @click="toggleContent($event)">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/javascript">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    props:{
      ratings:{
        type:Array,
        default(){
          return [];
        }
      },
/*      selectType:{
        type:Number,
        default:this.All
      },
      onlyContent:{
          type:Boolean,
          default:true
      },*/
      desc:{
          type:Object,
          default(){
                return {
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
          }
      }
    },
    data(){
      return{
          selectedType:2,
          content:false
      }
    },
    methods:{
        select(type,event){
            if(!event._constructed){
                return;
            }

            this.selectedType = type;
            this.$emit("choose",this.selectedType)


        },
      toggleContent(event){
        if(!event._constructed){
          return;
        }
        this.content = !this.content;
        this.$emit("toggle",this.content);


      }
    },
    computed:{
      positives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType===POSITIVE;
        })

      },
      negatives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType===NEGATIVE;
        })
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding:18px 0
      margin:0 18px
      font-size :0
      border-1px(rgba(7,17,27,0.1))
      .block
        display :inline-block
        padding:8px 12px
        margin-right: 8px
        border-radius:1px
        font-size :12px
        line-height :16px
        color:rgb(77,85,93)
        &.active
          color:#fff
        .count
          font-size :12px
          margin-left :2px
        &.positive
          background :rgba(0,160,220,0.2)
          &.active
            background :rgba(0,160,220,1)
        &.negative
          background :rgba(77,85,93,0.2)
          &.active
            background :rgba(77,85,93,1)



    .switch
      padding:12px 18px
      line-height :24px
      border-bottom :1px solid rgba(7,17,27,0.1)
      color:rgb(147,153,159)
      font-size :0
      &.on
        .icon-check_circle
          color:#00c850
      .icon-check_circle
        display :inline-block
        vertical-align :top
        margin-right :4px
        font-size :24px
      .text
        font-size :12px

</style>
