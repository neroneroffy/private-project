<template>
    <div id="upload">
      <div class="upload-box">
        <div class="upload-header">
          <div class="upload-header-title">选择图片</div>
          <div class="upload-header-close" @click="closePicBox">X</div>
        </div>
        <div class="upload-content">
          <div class="upload-content-left">
            <div class="upload-content-left-item">分组一</div>
            <div class="upload-content-left-item">分组二</div>
            <div class="upload-content-left-item">分组三</div>
          </div>
          <div class="upload-content-right">
            <form class="upload-content-right-top" enctype="multipart/form-data" ref="formSubmit" >
              <label class="upload-content-right-top-btn">
                上传图片
              </label>
              <input type="file" @change="uploadImage($event)" multiple="multiple">
            </form>
            <iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
            <div class="upload-content-right-content">
              <div class="upload-content-right-item" v-for="(item,index) in fileList">
                <img :src=item alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="uploader-bottom">
          <div class="uploader-bottom-confirm">确定</div>
          <div class="uploader-bottom-cancel" @click="closePicBox">取消</div>
        </div>
      </div>
      <div class="upload-modal" @click="closePicBox">

      </div>
<!--
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
-->
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        components:{
        },
      data() {
        return {
          fileList:[]
        };
      },
      methods: {
        closePicBox(){
            this.$emit('close')
        },
        uploadImage($event){
          let file=$event.target,
              formData = new FormData();
          //将数据插入表单
          for(let i = 0;i<file.files.length;i++){
            let fileReader = new FileReader();
            formData.append('file',file.files[i],file.files[i].name);
            fileReader.readAsDataURL(file.files[i]);
            fileReader.onload=()=>{
              this.fileList.push(fileReader.result)
            };
          };

          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          };
          axios.post('/upload',formData,config).then((response)=>{
            console.log(response.data)
          });

          document.forms[0].target="rfFrame";
        }
      }
    }
</script>
<style>
  #upload .upload-box{
    width: 800px;
    height: 600px;
    background: #fff;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index: 9999;
  }
  #upload .upload-modal{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index: 9998;
    background: rgba(0,0,0,0.5);
  }
  #upload .upload-header{
    height: 50px;
    padding-left:20px;
    line-height: 50px;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
  }
  #upload .upload-header-close{
    padding:0 20px;
    cursor: pointer;
  }
  #upload .uploader-bottom{
    height: 60px;
    bottom:0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #e4e4e4;
  }
  #upload .uploader-bottom div{
    width: 90px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    text-align: center;
    margin-left: 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  #upload .uploader-bottom .uploader-bottom-confirm{
    background: #3eb5dd;
    color: #fff;
  }
  #upload .uploader-bottom .uploader-bottom-cancel{
    color: #878787;
    border:1px solid #e4e4e4;
    margin-right: 20px;
  }
  #upload .upload-content{
    height: 488px;
    display: flex;
  }
  #upload .upload-content .upload-content-left{
    height: 100%;
    width: 25%;
    border-right: 1px solid #e4e4e4;
  }
  #upload .upload-content .upload-content-right{
    width: 75%
  }
  #upload .upload-content .upload-content-left .upload-content-left-item{
    height: 38px;
    padding-left: 20px;
    text-align: left;
    line-height: 38px;
    cursor: pointer;
  }
  #upload .upload-content .upload-content-left .upload-content-left-item:hover{
    background: #f2f2f2;
  }
  #upload .upload-content .upload-content-left .upload-content-left-item:nth-child(1){
    /*margin-top: 10px;*/
  }
  #upload .upload-content .upload-content-right .upload-content-right-content{
    padding:20px 15px 20px 20px;
    height: 397px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item{
    width: 120px;
    height: 120px;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    flex: 0 0 auto;
    margin:6px;
    cursor: pointer;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item:hover img{
    opacity: 0.8;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item img{
    width: 130px;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index: 9999;

  }

  #upload .upload-content-right-top{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    border-bottom: 1px solid #e4e4e4;
    position: relative;
  }
  #upload .upload-content-right-top-btn{
    height: 32px;
    background: #3eb5dd;
    line-height: 32px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    padding:0 10px;
    font-size: 14px;
    cursor: pointer;
  }
  #upload .upload-content-right-top input{
    height: 32px;
    display: block;
    opacity:0;
    width: 80px;
    position: absolute;
    top:10px;
    right:20px;
    cursor: pointer;
    font-size: 0;
  }
</style>
