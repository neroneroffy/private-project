<template>
  <div class="hello">
    <Upload @close="closeThis" v-if="isShow"></Upload>
    <div class="pic-btn" @click="showPicModal">图片管理</div>
  </div>
</template>

<script>
  import Upload from './Upload.vue';
  export default {
    name: 'HelloWorld',
    components:{
        Upload
    },
    data () {
      return {
        isShow:false
      }
    },
    methods:{
      showPicModal(){
         this.isShow=true;
      },
      closeThis(){
         this.isShow=false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pic-btn{
    width: 80px;
    height: 38px;
    border-radius: 5px;
    line-height: 38px;
    text-align: center;
    border:1px solid #ccc;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    font-size: 12px;
    color: #939393;
    cursor: pointer;
  }
</style>
