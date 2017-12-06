<template>
    <div id="upload">
      <div class="upload-box">
        <div class="upload-header">
          <div class="upload-header-title">选择图片</div>
          <div class="upload-header-close" @click="closePicBox">X</div>
        </div>
        <div class="upload-content">
          <div class="upload-content-left">
            <div class="upload-content-left-item" @click="menuSelect($event,'new')" :class="{'upload-content-left-item-active':activeFlag==='new'}">上传图片</div>
            <div class="upload-content-left-item" @click="menuSelect($event,item.mark)" :class="{'upload-content-left-item-active':activeFlag===item.mark}" v-for="item in menuData">{{item.name}}</div>

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
              <div class="upload-content-loading" v-if="uploadLoading">
                <img src="../assets/loading.gif" alt="">
              </div>
              <div class="upload-content-no-pics" v-if="noPic">
                暂无图片
              </div>
              <div class="upload-content-right-item-wrapper" v-for="(item,index) in fileList">
                <div class="upload-content-right-item" @click="selectThis($event,item.id,index)">
                  <img :src=item.url alt="">
                  <div class="upload-progress" v-if="progressShow">
                    <div class="upload-progress-inner" ref="progress" :class="{'too-large':item.size>maxSize}"></div>
                  </div>
                  <div class="upload-content-right-item-select-mark" v-if="item.isSelected"></div>
                </div>
                <div class="upload-content-right-item-info">
                  <div class="upload-content-right-pic-name">{{item.name}}</div>
                  <div class="upload-content-right-pic-size">{{item.size}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="uploader-bottom">
          <div class="uploader-bottom-pagination" v-if="pageShow">
            <div class="uploader-bottom-pre" @click="lastPage">上一页</div>
            <ul class="uploader-bottom-pagegroup">
              <li class="uploader-bottom-page-item" :class="{'uploader-bottom-page-item-active':current==1}" @click="page($event)">1</li>
              <li class="uploader-bottom-page-item" v-if="preClipped">...</li>
              <li v-for="(item,index) in pageGroup" class="uploader-bottom-page-item" :class="{'uploader-bottom-page-item-active':current==item}" @click="page($event)">{{item}}</li>
              <li class="uploader-bottom-page-item" v-if="backClipped">...</li>
              <li class="uploader-bottom-page-item" :class="{'uploader-bottom-page-item-active':current==totalPage}" @click="page($event)" v-if="totalPage!==1">{{totalPage}}</li>
            </ul>
            <div class="uploader-bottom-next" @click="nextPage">下一页</div>
          </div>
          <div class="uploader-bottom-option">
            <div class="uploader-bottom-confirm" @click="confirm">确定</div>
            <div class="uploader-bottom-cancel" @click="closePicBox">取消</div>
          </div>
        </div>
      </div>
      <div class="upload-modal" @click="closePicBox">

      </div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        components:{
        },
      data() {
        return {
          fileList:[],
          selectedFileList:[],
          progress:0,
          tooLorge:false,
          maxSize :2*1024*1024,
          progressShow:false,
          uploadLoading:false,
          noPic:false,
          activeFlag:"new",
          menuData:"",
          group:"default",
          total:0,
          pageSize:12,
          current:1,
          backClipped: true,
          preClipped: false,
          totalPage:0,
          pageShow:false
        };
      },
      mounted(){
          axios.get('/menudatas').then((response)=>{
              let res = response.data;
            console.log(res);
            if(res.result){
                  this.menuData = res.data;

                  //this.group = res.data[0].data[0].mark
              }
          })
      },
      methods: {
        closePicBox(){
            this.$emit('close')
        },
        getData(group,current,pageSize){

          axios.get(`/query?mark=${group}&pageNum=${current}&pageSize=${pageSize}`).then((response)=>{
            let res = response.data;
            this.total = res.total;
            this.totalPage = Math.ceil(this.total/this.pageSize);

            console.log(res)
            this.uploadLoading = false;
            if(res.result){
              this.progressShow = false;
              this.noPic = false;
              this.fileList = res.data
            }else{
              this.noPic = true;
            }
          })
        },

        menuSelect($event,mark){
          //点击设置分组、图片列表、加载图标
          if(mark === 'new' ||mark === 'all' ){
            this.group = 'default';
          }else{
            this.group = mark;
          }
          this.fileList = [];
          //设置按钮激活状态
          this.activeFlag = mark;
          this.current = 1
          if(mark === 'new'){
            this.pageShow = false
            this.fileList = [];
            this.group = 'default';
            return
          }else{
            this.pageShow = true
            this.getData(this.group,this.current,this.pageSize)
          }
          this.uploadLoading = true;



        },
        uploadImage($event){
          let file=$event.target,
          formData = new FormData();
          //递归调用自身，实现多文件依次上传
          let _this = this;
          let count = 0;
          let previewData = {};
          function upload(){
            //定义axios配置信息
            let config = {
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (progressEvent){
                if(progressEvent.lengthComputable){
                  _this.progress = progressEvent.total/progressEvent.loaded;
                  _this.$refs.progress[_this.$refs.progress.length-1].style.width = Number(_this.progress).toFixed(2)*100+"%"
                }
              }
            };
            //向formData中插入文件

            if(file.files[count]){
            formData.append('file',file.files[count],file.files[count].name);
            let fileReader = new FileReader();

            fileReader.readAsDataURL(file.files[count]);

            fileReader.onload=()=>{
              previewData = {
                url:fileReader.result,
                name:file.files[count].name,
                size:file.files[count].size,
              };
              _this.fileList.push(previewData);
              _this.progressShow = true
            };
            fileReader.onloadend=()=>{
              //检测图片大小是否超出限制
              if(formData.get('file').size>_this.maxSize){
                formData.delete('file');
                //当图片全部上传完毕，停止递归
                count++;
                if(count > file.files.length-1){
                  return
                }
                upload()
              }else{
                  console.log(_this.group)
                  //发送数据
                  axios.post(`/upload?mark=${_this.group}`,formData,config).then((response)=>{
                    formData.delete('file');
                    let res = response.data;
                    if(res.result){
                        _this.fileList = res.data;
                    }else{
                      alert('上传失败');
                      return;

                    }
                    _this.noPic = false;
                    count++;
                    if(count > file.files.length-1){
                      return
                    }
                    upload()
                  }).catch((err)=>{
                    console.log(err)
                  });
                }
            };
            }
          }

          //第一次调用
          upload();
          document.forms[0].target="rfFrame";
        },
        selectThis($event,id,index){
          this.fileList[index].isSelected = !this.fileList[index].isSelected;
        },
        confirm(){
            this.selectedFileList = [];
            this.fileList.forEach((item)=>{
                if(item.isSelected){

                  this.selectedFileList.push(item.url)
                }
            });
          console.log(this.selectedFileList)
        },
        lastPage(){
            if(this.current>1){
              this.current--;
            }
          this.getData(this.group,this.current,this.pageSize)
        },
        nextPage(){
            if(this.current<=this.totalPage-1){
              this.current++;
            }
            console.log(this.group)
          this.getData(this.group,this.current,this.pageSize)

            console.log(this.pageGroup)
            console.log(`当前页------${this.current}`)
            console.log(`总页数------${this.totalPage}`)
        },
        page($event){
            this.current = Number($event.currentTarget.innerHTML);
          console.log(`当前页------${this.current}`)
          console.log(`总页数------${this.totalPage}`)
          console.log(`总页数------${this.pageGroup}`)

        }
      },
      computed:{
        pageGroup(){
            let pageLimit = [];
            if(this.totalPage<=5){
              this.preClipped = false;
              this.backClipped = false
              for(let i=2;i<this.totalPage;i++){
                pageLimit.push(i)
              }

            }else{
              this.backClipped = true;
              if(this.current >=4){
                if(this.current>=this.totalPage-3){
                  pageLimit.push(this.totalPage-5);
                  pageLimit.push(this.totalPage-4);
                  pageLimit.push(this.totalPage-3);
                  pageLimit.push(this.totalPage-2);
                  pageLimit.push(this.totalPage-1);
                  this.backClipped = false
                }else{
                  pageLimit.push(this.current-2);
                  pageLimit.push(this.current-1);
                  pageLimit.push(this.current);
                  pageLimit.push(this.current+1);
                  pageLimit.push(this.current+2);
                  this.backClipped = true

                }

                this.preClipped = true;
              }else{

                this.preClipped = false;
                for(let i=2;i<5;i++){
                  pageLimit.push(i)
                }
              }
            }
            return pageLimit
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
    z-index: 9996;
    user-select:none;
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
    z-index: 9995;
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
    align-items: center;
    border-top: 1px solid #e4e4e4;
  }
  #upload .uploader-bottom:after{
    clear: both;
    content: "";
    font-size: 0px;
    display: block;
  }
  #upload .uploader-bottom .uploader-bottom-pagination{
    margin-top: 14px;
    padding-left: 20px;
    float: left;
    display: flex;
    justify-content: space-between;
  }

  #upload .uploader-bottom .uploader-bottom-pagegroup{
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding:0;
    margin:0 10px
  }
  #upload .uploader-bottom .uploader-bottom-pagination>div{
    width: 60px;
    height: 30px;
    border-radius: 4px;
    border:1px solid #cbcbcb;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    cursor: pointer;
    color: #6e6e6e;
    display: inline-block;
  }
  #upload .uploader-bottom .uploader-bottom-pagegroup .uploader-bottom-page-item{

    width: 30px;
    height: 30px;
    border:1px solid #cbcbcb;
    color: #6e6e6e;
    text-align: center;
    line-height: 30px;
    margin:0 3px;
    font-size: 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  #upload .uploader-bottom .uploader-bottom-pagegroup .uploader-bottom-page-item-active{
    background: #dcdcdc!important;
  }
  #upload .uploader-bottom .uploader-bottom-pagegroup li:hover{
    background: #dcdcdc!important;
  }
  #upload .uploader-bottom .uploader-bottom-option{
    float: right;
    margin-top: 14px;
  }
  #upload .uploader-bottom .uploader-bottom-option div{
    display: inline-block;
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
  #upload .uploader-bottom .uploader-bottom-confirm:hover{
    background: #259bd6;
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
  #upload .upload-content .upload-content-left .upload-content-left-item,#upload .upload-content .upload-content-left .upload-content-left-item-active{
    height: 38px;
    padding-left: 20px;
    text-align: left;
    line-height: 38px;
    cursor: pointer;
  }
  #upload .upload-content .upload-content-left .upload-content-left-item-active{
    background: #f2f2f2;
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
    position: relative;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item{
    width: 120px;
    height: 120px;
    background: #e1e1e1;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    flex: 0 0 auto;
    margin:6px;
    cursor: pointer;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item-select-mark{
    width: 0;
    height: 0;
    border-top: 35px solid #3eb5dd;
    border-left: 35px solid transparent;
    position: absolute;
    right:0;
    z-index: 9998;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item-select-mark:before{
    content: "";
    width: 8px;
    height: 3px;
    display: block;
    background: #fff;
    border-radius: 3px;
    transform: rotate(45deg);
    position: absolute;
    top:-24px;
    left: -20px;
    z-index: 9999;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item-select-mark:after{
    content: "";
    width: 13px;
    height: 3px;
    display: block;
    background: #fff;
    border-radius: 3px;
    transform: rotate(135deg);
    position: absolute;
    top:-25px;
    right: 3px;
    z-index: 9999;
  }
  /*进度条*/
  #upload .upload-progress{
    width: 95%;
    height: 7px;
    position: absolute;
    bottom:10px;
    left:50%;
    margin-left:-47.5%;
    border-radius: 4px;
    overflow: hidden;
    z-index: 9999;
  }
  #upload .upload-progress-inner{
    width: 0;
    height: 7px;
    background: #3eb5dd;
    transition: width .2s ease-in
  }
  #upload .too-large{
    width: 100%;
    height: 10px;
    background: #e1241a!important;
  }
  #upload .upload-content-right-item-wrapper{
    margin-bottom: 10px;
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
    z-index: 9998;

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
  #upload .upload-content-right-item-info{
    font-size: 10px;
    color: #878787;
    text-align: left;
  }
  #upload .upload-content-right-item-info div{
    margin-left: 5px;
  }
  #upload .upload-content-right-item-info .upload-content-right-pic-name{
    width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  #upload .upload-content-loading{
    font-size: 0;
    width: 37px;
    height: 37px;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
  }
  #upload .upload-content-no-pics{
    width: 100px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    font-size: 20px;
    color: #ccc;
  }
</style>
