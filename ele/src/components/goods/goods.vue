<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper" >
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name"><span>{{food.name}}</span></h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now"><span class="money-icon">￥</span>{{food.price}}</span><span class="old" v-show="food.oldPrice">原价{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"  @cartAdd="addToCart"></cartcontrol>
                  </div>
                </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>

</template>

<script type="text/javascript">
  import Bscroll from "better-scroll";
  import shopcart from "../shopcart/shopcart.vue";
  import cartcontrol from "../cartcontrol/cartcontrol.vue";
  import food from "../food/food.vue"
  const ERR_OK=0;
  export default {
    components:{
      shopcart,
      cartcontrol,
      food
    },
    props:{
        seller:{}
    },
    data(){
        return{
            goods:{},
            listHeight:[],
            scrollY:0,
            selectedFood:{}
        }
    },
    created(){
        this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
        this.$http.get("/api/goods").then((response)=>{

            if(response.data.errno === ERR_OK){
                this.goods = response.data.data;
                this.$nextTick(()=>{
                  this._initScroll();
                  this.calculateHqeight();
                });

            }

        }).catch(()=>{})
    },

    methods:{
        _initScroll(){
            this.menuScroll = new Bscroll(this.$refs.menuWrapper,{
                click:true
            });
            this.foodsScroll = new Bscroll(this.$refs.foodsWrapper,{
                probeType:3,
                click:true
            });
          this.foodsScroll.on("scroll",(pos)=>{
            this.scrollY = Math.abs(Math.round(pos.y));

          });
        },

      selectFood(food,event){
        if(!event._constructed){
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      addToCart(){
        this._drop(event.target)
        //console.log(event.target)
      },
      _drop(target){
          this.$refs.shopcart.drop(target);//调用shopcart内的方法
      },
      selectMenu(index,event){
        if(!event._constructed){
            return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el,300)
      },
        calculateHqeight(){
         let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");

         let height = 0;
         this.listHeight.push(height);
         for(let i=0;i<foodList.length;i++){
             let item = foodList[i];
             height += item.clientHeight;
           this.listHeight.push(height);
         }
        }


    },
    computed:{
        currentIndex(){

            for(let i=0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
                    return i;
                }
            }
            return 0;

        },

        selectFoods(){
/*
          let foods = [];
            for(let i=0;i<this.goods.lenght;i++){
                for(var j=0;j<this.goods[i].foods.length;j++){
                    if(this.goods[i].foods[j].count){
                        food.push(this.goods[i].foods[j])
                    }
                }
            }
*/

          let foods = [];
          for(let k in this.goods){
            this.goods[k].foods.forEach((food)=>{
              if(food.count){
                foods.push(food);
              }
            });
          }
/*          this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food);
                    }
                });
            });*/

            return foods;
        }

    },
    events:{
        'cart.add'(target){
            this._drop(target)
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display :flex
    overflow :hidden
    position :absolute
    top: 174px
    bottom :46px
    width: 100%
    .menu-wrapper
      flex:0 0 80px
      width :80px
      background :#f3f5f7
      .menu-item
        display :table
        height :54px
        width: 56px
        padding:0 12px
        line-height :14px
        .icon
          display: inline-block
          vertical-align: top
          width :12px
          height :12px
          margin-right :2px
          background-size :12px 12px
          background-repeat :no-repeat
          &.decrease
            bg-image("decrease_3")
          &.discount
            bg-image("discount_3")
          &.guarantee
            bg-image("guarantee_3")
          &.invoice
            bg-image("invoice_3")
          &.special
            bg-image("special_3")
        .text
          display: table-cell
          width :56px
          vertical-align: middle
          font-size :12px
          border-1px(rgba(7,17,27,0.1))
        &.current
          position :relative
          margin-top :-1px
          z-index :10
          font-weight :700
          background :#ffffff
          .text
            border-none()
    .foods-wrapper
      flex:1
      .title
        padding-left :14px
        height: 26px
        line-height :26px
        border-left :2px solid #d9dde1
        font-size :12px
        color:rgb(147,153,159)
        background :#f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom :18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border:none
          margin-bottom :0
        .icon
          flex:0 0 57px
          margin-right :10px
          border-radius :2px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height :14px
            line-height :14px
            font-size :14px
            color :rgb(7,17,27)
          .desc,.extra

            line-height :10px
            font-size :10px
            color :rgb(147,153,159)
          .desc
            margin-bottom :8px
            line-height :14px
          .extra
            &.count
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
            right:0
            bottom :12px
</style>
