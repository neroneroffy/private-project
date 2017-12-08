<template>
  <div class="hello">
    <Upload @close="closeThis" v-if="isShow" ></Upload>
    <div class="pic-btn" @click="showPicModal">图片管理</div>
    <div class="my-picture">
      <p>已选择的图片</p>
      <div class="selected">
        <div class="pic" v-for="(item,index) in picUrlGroup">
          <img :src=item.url alt="图片加载失败">
          <div class="del-mask">
            <div class="del" @click="delThis(index)">
              <span class="icon-cross"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Upload from './Upload.vue';
  import '../assets/style.css'
  export default {
    name: 'HelloWorld',
    components:{
        Upload
    },
    data () {
      return {
        isShow:false,
        picUrlGroup:[]
      }
    },
    methods:{
      showPicModal(){
         this.isShow=true;
      },
      closeThis(fileList){
         this.isShow=false;
         if(fileList !==""){
             this.picUrlGroup = this.picUrlGroup.concat(fileList)
         }
      },
      delThis(index){
        this.picUrlGroup.splice(index,1)
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

  .my-picture{
    position: absolute;
    top:60%;
    left:50%;
    width: 80%;
    margin-left: -40%;
    text-align:center;
    color: #a0a0a0;
  }
  .my-picture .selected{
    display: inline-block;
  }

  .del-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 100;
    display: none;
  }
  .del{
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    width: 40px;
    height: 40px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
  }
  .del span{
    line-height: 20px;
  }
  .pic{
    width: 120px;
    height: 120px;
    border-radius: 10px;
    background: #e1e1e1;
    box-shadow: 2px 2px 5px 0px #ccc;
    overflow: hidden;
    display: inline-block;
    margin:0 10px;
    position: relative;
  }
  .pic:hover .del-mask{
    display: block;

  }
  .pic img{
    width: 120px;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
  }
</style>
