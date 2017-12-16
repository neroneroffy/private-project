<template>
  <div id="app">
    <v_header :seller="seller"></v_header>
    <div class="tab border-1px">

        <router-link v-bind:to="item.path"  class="tab-item" v-for="(item,index) in tab" >{{item.name}}</router-link>

    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "./components/header/header.vue";
  import urlParse from './common/js/util'
  const ERR_OK=0;
  export default{
      components:{
        v_header:header
      },
    data(){
      return{
        tab:[
          {name:"商品",path:"/goods"},
          {name:"评论",path:"/ratings"},
          {name:"商家",path:"/seller"},

        ],
        seller:{

        }
      }
    },
    created(){

          this.$router.push("/goods");
          this.$http.get("/api/seller").then((response)=>{
              response = response.data;
              if(response.errno===ERR_OK){
                  this.seller = response.data;

              }

          })
    }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  #app
    .tab
      display:flex
      width:100
      height:40px
      line-height:40px
      //border-bottom :1px solid rgba(7,17,21,0.1)
      border-1px(rgba(7,17,21,0.1))
      .tab-item
        flex:1
        text-align:center
        font-size :14px
        color:rgb(77,85,93)
      .router-link-active
        color:rgb(240,20,20)
</style>
