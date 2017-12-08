<template>
    <div id="upload">
      <div class="upload-box">
        <div class="upload-header">
          <div class="upload-header-title">选择图片</div>
          <div class="upload-header-close" @click="closePicBox"><span class="icon-cross"></span></div>
        </div>
        <div class="upload-content">
          <div class="upload-content-left">
            <div class="upload-content-left-item upload-content-left-upload" @click="menuSelect($event,'new')" :class="{'upload-content-left-item-active':group==='new'}">上传图片</div>
            <div class="upload-content-left-item-wrapper">
              <div class="upload-content-left-item upload-content-left-group-item" @mouseenter="delGroupFlag = index" @mouseleave="delGroupFlag = ''" :class="{'upload-content-left-item-active':group===item.group}" v-for="(item,index) in menuData">
                <span  @click="menuSelect($event,item.group)">{{item.name}}</span>
                <span class="icon-cross" v-if="delGroupFlag === index && item.group!=='all'&& item.group!=='default'" @click="delGroup(item.group)"></span>
              </div>
            </div>
            <div class="upload-content-left-item upload-content-left-new" @click="newGroup">
              <span class="icon-plus"></span>
              新建分组
            </div>
            <div class="new-group" v-if="newGroupBox">
              <div class="new-group-name">
                <span>名称</span> <input type="text" v-model="groupName" >
              </div>
              <div class="new-group-btn">
                <div class="new-group-confirm" @click="addGroup">确定</div>
                <div class="new-group-cancel" @click="cancelAdd">取消</div>
              </div>
            </div>
          </div>
          <div class="upload-content-right">
            <form class="upload-content-right-top" enctype="multipart/form-data" ref="formSubmit" >
              <label class="upload-content-right-top-btn">
                上传图片
              </label>
              <input type="file" @change="uploadImage($event)" multiple="multiple" accept="image/gif, image/jpeg, image/png">
            </form>
            <iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
            <div class="upload-content-right-content" ref="picWrapper">

              <div class="upload-content-loading" v-if="uploadLoading">
                <img src="../assets/loading.gif" alt="">
              </div>
              <div class="upload-content-no-pics" v-if="newUpload">
                <p>上传图片</p>
                <p>图片将自动上传到默认分组</p>
              </div>
              <div class="upload-content-no-pics" v-if="noPic">
                暂无图片
              </div>
              <div class="upload-content-right-item-wrapper" v-for="(item,index) in fileList">
                <div class="upload-content-right-item" @click="selectThis($event,item.id,index)">
                  <!--预览图-->
                  <img :src=item.url alt="">
                  <!--进度条-->
                  <div class="upload-progress" v-if="progressShow">
                    <div class="upload-progress-inner" ref="progress" :class="{'too-large':item.size>maxSize}"></div>
                  </div>
                  <!--选择标志-->
                  <div class="upload-content-right-item-select-mark" v-if="item.isSelected"></div>
                </div>
                <div class="upload-content-right-item-info">
                  <div class="upload-content-right-pic-name">{{item.name}}</div>
                  <div class="upload-content-right-pic-size">{{item.size}}</div>
                </div>
                <div class="upload-content-right-item-del" title="删除" @click="delPic(item.id)" v-if="group !== 'all'">
                  <span class="icon-cross"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="uploader-bottom">
          <!--<div class="uploader-bottom-pagination" v-if="pageShow">
            <div class="uploader-bottom-pre" @click="lastPage">上一页</div>
            <ul class="uploader-bottom-pagegroup">
              <li class="uploader-bottom-page-item" :class="{'uploader-bottom-page-item-active':current==1}" @click="page($event)">1</li>
              <li class="uploader-bottom-page-item" v-if="preClipped">...</li>
              <li v-for="(item,index) in pageGroup" class="uploader-bottom-page-item" :class="{'uploader-bottom-page-item-active':current==item}" @click="page($event)">{{item}}</li>
              <li class="uploader-bottom-page-item" v-if="backClipped">...</li>
              <li class="uploader-bottom-page-item" :class="{'uploader-bottom-page-item-active':current==totalPage}" @click="page($event)" v-if="totalPage!==1">{{totalPage}}</li>
            </ul>
            <div class="uploader-bottom-next" @click="nextPage">下一页</div>
          </div>-->
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
    import '../assets/style.css';
    export default {
        components:{
        },
      data() {
        return {
          fileList:[],
          selectedFileList:[],
          //progress:0,
          tooLorge:false,
          maxSize :2*1024*1024,
          progressShow:false,
          uploadLoading:false,
          noPic:false,
          menuData:"",
          group:"new",
          newGroupBox:false,
          groupName:"",
          delGroupFlag:"",
          couldDel:true,
          newUpload:true,
          newPicList:[]

/*          total:0,
          pageSize:12,
          current:1,
          backClipped: true,
          preClipped: false,
          totalPage:0,
          pageShow:false*/
        };
      },
      mounted(){
          axios.get('/menudatas').then((response)=>{
            let res = response.data;
            if(res.result){
                this.menuData = res.data;
            }
          })
      },
      methods: {
        closePicBox(){
            this.$emit('close',"")
        },
        getData(group){
        /*&pageNum=${current}&pageSize=${pageSize}*/
          axios.get(`/query?mark=${group}`).then((response)=>{
            let res = response.data;
/*
            this.total = res.total;
            this.totalPage =this.total? Math.ceil(this.total/this.pageSize):1;
*/
            this.uploadLoading = false;
            if(res.result){
              this.progressShow = false;
              this.noPic = false;
              this.fileList = res.data;
            }else{
              this.noPic = true;
            }
          })
        },

        menuSelect($event,group){
          //点击设置分组、图片列表、加载图标
          this.fileList = [];
          this.uploadedCount = 0;
          //设置按钮激活状态
          this.group = group;

          //this.current = 1;
          if(group === 'new'){
            this.noPic = false;
            this.newUpload = true;
            return
          }else{
            //this.pageShow = true;
            this.newUpload = false;
            this.getData(this.group)
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
            //开始上传时，滚到底部
            _this.$refs.picWrapper.scrollTop = _this.$refs.picWrapper.scrollHeight;
            //定义axios配置信息
            let progress = 0;
            let config = {
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (progressEvent){
                console.log(`进度条的数量${_this.$refs.progress.length -1}`);
                if(progressEvent.lengthComputable){
                  progress = progressEvent.total/progressEvent.loaded;
                  //进度条
                  _this.$refs.progress[_this.$refs.progress.length-1].style.width = Number(progress).toFixed(2)*100+"%";
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
                  //发送数据
                  axios.post(`/upload?mark=${_this.group}`,formData,config).then((response)=>{
                    formData.delete('file');
                    let res = response.data;
                    console.log(res);
                    if(res.result){

                      console.log(_this.newPicList);
                      if(_this.group === 'new'){
                        _this.fileList.push(res.data);

                          _this.fileList.forEach((item,index)=>{
                              if(!item.newName){
                                _this.fileList.splice(index,1)
                              }
                          })

                        }else{
                          _this.fileList = res.data;
                        }

                      _this.newUpload = false
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
                    alert('上传失败123');
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
        delPic(id){
            //防止用户多次点击导致没有删除文件再次发起请求后台报错
            if(this.couldDel){
              this.couldDel = false;
              if(this.group === 'all'){
                this.group = 'default'
              }
              axios.get('/deletepic',{
                params:{
                  mark:this.group,
                  id:id
                }}).then((response)=>{
                let res = response.data;
                if(res.result){
                  this.couldDel = true;
                  this.fileList = res.data;
                  if(this.fileList.length === 0){
                    this.noPic = true;
                  }
                }else{
                  alert('删除失败')
                }
              })
            }
        },
        confirm(){
            this.selectedFileList = [];
            this.fileList.forEach((item)=>{
                if(item.isSelected){
                  this.selectedFileList.push(item)
                }
            });
          this.$emit('close',this.selectedFileList)
        },
        newGroup(){
            this.newGroupBox = !this.newGroupBox
        },
        addGroup(){
            if(this.groupName === ""){
                alert('分组名称不能为空');
                return
            }
            axios.post('/newgroup',{
              name:this.groupName
            }).then((response)=>{
              let res = response.data;
              if(res.result){
                this.menuData = res.data;
                this.newGroupBox = false;
                this.groupName = ""
              }
            })
        },
        cancelAdd(){
          this.newGroupBox = false;
          this.groupName = ""
        },
        delGroup(group){
          let msg = '删除分组，组内的所有图片将一同删除！';
          if(confirm(msg) === true){
            axios.post('/delgroup',{
              group:group
            }).then((response)=>{
              let res = response.data;
              if(res.result){
                this.menuData = res.data;
                this.fileList = [];
              }
            })
          }else{
              return
          }
        }
/*
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
          this.getData(this.group,this.current,this.pageSize)
          console.log(`当前页------${this.current}`)
          console.log(`总页数------${this.totalPage}`)
          console.log(`总页数------${this.pageGroup}`)

        }
*/
      },
      computed:{
/*
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
*/
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
    color: #9d9d9d;
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
    position:relative;
  }
  #upload .upload-content .upload-content-left .new-group{

    padding:20px;
    background: #fff;
    box-shadow: 1px 1px 5px 1px #ccc;
    position: absolute;
    bottom: 40px;
    right:-180px;
    z-index: 9999;
  }
  #upload .upload-content .upload-content-left .new-group .new-group-name{
    margin-bottom: 20px;
    text-align: right;
  }
  #upload .upload-content .upload-content-left .new-group .new-group-name span{
    font-size: 15px;
    color: #777777;
    margin-right:10px
  }
  #upload .upload-content .upload-content-left .new-group .new-group-name input{
    outline: none;
    padding-left: 5px;
    border:1px solid #ccc;
    border-radius: 5px;
    line-height: 30px;
  }
  #upload .upload-content .upload-content-left .upload-content-left-upload{
    position: absolute;
    top:0;
    width: 90%;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
    z-index: 9999;
  }
  #upload .upload-content .upload-content-left .upload-content-left-item-wrapper{
    height: 412px;
    padding:38px 0;
    overflow: auto;
  }
  #upload .upload-content .upload-content-left .new-group .new-group-btn{
   display: flex;
    justify-content: flex-end;
  }
  #upload .upload-content .upload-content-left .new-group .new-group-btn div{
    line-height: 30px;
    text-align: center;
    padding:0 10px;
    font-size: 15px;
    border-radius: 5px;
    margin-left: 10px;
  }
  #upload .upload-content .upload-content-left .new-group .new-group-btn div:first-child{
    background: #3eb5dd;
    color: #fff;
    cursor: pointer;
  }
  #upload .upload-content .upload-content-left .new-group .new-group-btn div:last-child{
    color: #777777;
    border:1px solid #ccc;
    cursor: pointer;
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
  #upload .upload-content .upload-content-left .upload-content-left-item.upload-content-left-group-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #upload .upload-content .upload-content-left .upload-content-left-new{
    width: 90%;
    position: absolute;
    bottom:0;
    border-top: 1px solid #e4e4e4;
    background: #fff;
    z-index: 9999;
    display: flex;
    align-items: center;
  }
  #upload .upload-content .upload-content-left .upload-content-left-new span{
    font-size: 15px;
    color: #929292;
  }
  #upload .upload-content .upload-content-left .upload-content-left-item span:nth-child(1){
    display: block;
    height: 38px;
    width: 80%;
  }
  .upload-content-left-item span:nth-child(2){
    display: block;
    width: 20%;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    color: #777777;
    padding-right: 10px;
    text-align: right;

  }
  #upload .upload-content .upload-content-left .upload-content-left-item-active{
    background: #f2f2f2;
  }
  #upload .upload-content .upload-content-left .upload-content-left-new span:nth-child(1){
    width: 15%;
    line-height: 38px;
  }
  #upload .upload-content .upload-content-left .upload-content-left-new span:nth-child(2){
    width: 85%;
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
  #upload .upload-content .upload-content-right .upload-content-right-item-del{
    width: 20px;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background: #ccc;
    position: absolute;
    right:-3px;
    top:-3px;
    z-index: 9998;
    cursor:pointer;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item-del:hover{
    background: #3eb5dd;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item-del .icon-cross{
    line-height: 20px;
  }
  #upload .upload-content .upload-content-right .upload-content-right-item-select-mark{
    width: 0;
    height: 0;
    border-top: 35px solid #3eb5dd;
    border-right: 35px solid transparent;
    position: absolute;
    left:0;
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
    left: 4px;
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
    right: -21px;
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
    position: relative;
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

    height: 40px;
    line-height: 28px;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    font-size: 20px;
    color: #ccc;

  }
  #upload .upload-content-no-pics p{
    margin:0
  }
  #upload .upload-content-no-pics p:nth-child(2){
    font-size: 14px;
  }
</style>
