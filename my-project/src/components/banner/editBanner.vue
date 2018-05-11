<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'banner'}">Banner</router-link></li>
	    <li class="active">修改</li>
	</ol>
	<div>

      <div class="panel panel-info">
        <div class="panel-body">
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label  class="col-sm-2 control-label">类型</label>
                    <div class="col-sm-10">
                      <select class="form-control" v-model="params.type" disabled>
                        <option value="1">曝光栏</option>
                        <option value="2">正品优选</option>
                        <option value="3">其他</option>
                      </select>
                    </div>                   
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label"><span style="color: red">*</span>标题</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="title" :disabled="flag" v-model="params.title">
                    </div>
                  </div>
                  <div class="form-group" v-show="!flag">
                    <label class="col-sm-2 control-label"><span style="color: red">*</span>跳转地址</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="url" v-model="params.jumpUrl">
                    </div>
                  </div>
                   <div class="form-group">
                      <label for="thumbnail" class="col-sm-2 control-label"><span style="color: red">*</span>图片</label>
                      <div class="col-sm-10">
                        <div class="uploadBox danUpload">
                          <div class="row" id="imgList">
                            <div class="col-sm-2" :data-src="params.img" v-show="params.img"><a href="javascript:;" class="thumbnail"><img :src="params.img"><i class="glyphicon glyphicon-remove-circle" ></i></a></div>
                          </div>
                          <input type="hidden" v-model="params.img" class="imgInput" id="picture" name="picture" >
                          <a class="btn btn-primary selectBtn">选择图片</a>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                        <label for="statusCode" class="col-sm-2 control-label">是否设置过期时间</label>
                        <div class="col-sm-10">
                         <select class="form-control" id="statusCode" name="statusCode" v-model="params.statusCode" @change="isShowDate">
                            <option value="0">否</option>
                            <option value="1">是</option>                   
                         </select>
                        </div>
                      </div>
                      <div class="form-group" v-show="isDate">
                        <label for="expiration_date" class="col-sm-2 control-label"><span style="color: red">*</span>过期时间</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="expirationDate" name="expirationDate" onClick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <a href="javascript:;" class="btn btn-primary" @click="submitDatas">提交</a>
                        </div>
                      </div>
                </form>



          
        </div>
      </div>




    </div>

  		
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      id:'',
      api:{
        addItem:"/genuine/banner/updateBanner",
        getItem:"/genuine/banner/getBannerById"
      },
      flag:true,
      params:{
       /* resourcesId:'',
        type:1,
        title:'',
        jumpUrl:'',
        img:'',
        statusCode:0,
        expirationDate:""*/
      },
      submitData:{},
      isDate:false
    }
  },
  mounted(){
    start.getToken();
    
  },
  created(){
    this.fetchData() 
  },
  methods:{
    fetchData(){
      this.id = this.$route.query.id;
      this.getItem();

   },
   getItem:function(){
      var self=this;
        this.axios.get(self.api.getItem, {
    　　params: {id:self.id}
    }).then(function (response) {
    　　if(response.data.errorCode=="0"){
                var res=response.data.result;
                if(res.type==3){
                  self.flag=false
                }else{
                  self.flag=true
                } 
                var val=res.statusCode;
                // alert(typeof val)
                  if(val){
                    self.isDate=true;
                    $("#expirationDate").val(res.expirationDate)
                  }else{
                    self.isDate=false;  
                    $("#expirationDate").val("")                  
                  }   

                  self.params=res;                 

              }else{
                zdalert('提示',response.data.reason,function(){});
              }            
    }).catch(function (error) {
    // 　　alert(error);
    });
    
   },
    isShowDate:function(){
      var self=this;
      var val=$("#statusCode").val();
      if(val==1){
        self.isDate=true
      }else{
        self.isDate=false
        
      }

  },
    submitDatas:function(){ 
    var self=this;    
      var flag=false;
      self.submitData.id=self.params.id;
      self.submitData.type=self.params.type;
      self.submitData.title=self.params.title;
      self.submitData.jumpUrl=self.params.jumpUrl;
      self.submitData.img=self.params.img;
      self.submitData.statusCode=self.params.statusCode
      self.submitData.expirationDate=$("#expirationDate").val();

          if(self.submitData.type==3){
            if($.trim($("#title").val())==""){
              zdalert('提示','请填写标题',function(){});
              flag=false;
            }else if($.trim($("#url").val())==""){
              zdalert('提示','请填写跳转地址',function(){});
              flag=false;
            }else if(!self.checkUrl($.trim($("#url").val()))){
              zdalert('提示','请输入正确的URL格式',function(){});
              return false
            }else if($("#picture").val()==""){
              zdalert('提示','请上传图片',function(){});
              flag=false;
            }else{
              if(self.submitData.statusCode==0){
                    self.submitData.expirationDate=""
                    flag=true
                  }else{
                    self.submitData.expirationDate=$("#expirationDate").val();
                    if(self.submitData.expirationDate==""){
                      zdalert('提示','请选择过期时间',function(){});
                      flag=false;
                    }else{
                      flag=true
                    }
                  }
            }
          }else{
            if($.trim($("#title").val())==""){
              zdalert('提示','请填写标题',function(){});
              flag=false;
            }else if($("#picture").val()==""){
              zdalert('提示','请上传图片',function(){});
              flag=false;
            }else{
              if(self.submitData.statusCode==0){
                    self.submitData.expirationDate=""
                    flag=true
                  }else{
                    self.submitData.expirationDate=$("#expirationDate").val();
                    if(self.submitData.expirationDate==""){
                      zdalert('提示','请选择过期时间',function(){});
                      flag=false;
                    }else{
                      flag=true
                    }
                  }
            }

          }

          if(flag){
            self.submitData.img=$("#picture").val();
            zdconfirm('系统确认框','确认要提交数据吗',function(r){  
             if(r)  
              {  
                 self.axios.post(self.api.addItem, self.submitData)
                    .then(response => {
                      if(response.data.errorCode=="0"){
                        zdalert('提示',response.data.reason,function(){
                          $('#myModal').modal('hide')
                          self.$router.push({name:'banner'})
                        });                                     
                        
                      }else{
                        zdalert('提示',response.data.reason,function(){
                          $('#myModal').modal('hide')
                        });     
                      }                        
                  })
              }  
            });      
          }
    },
    checkUrl:function(str_url){
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      
      var re = new RegExp(strRegex);
      return re.test(str_url);
  }

  }
  
}
</script>

<style lang="scss">
.addBtn{color: #337ab7!important}
.addBtn i{margin-right: 5px;}

</style>