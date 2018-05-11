<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'preferred'}">正品优选</router-link></li>
	    <li class="active">新增</li>
	</ol>
	<div class="panel panel-info">
		<div class="panel-body">
    		<form class="form-horizontal" role="form">
						  <div class="form-group">
						    <label for="title" class="col-sm-2 control-label"><span style="color: red">*</span>正文标题</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="tltle" name="title" v-model="model.title" maxlength="60">
						      <p style="font-size: 12px;color: #999;">请输入少于60位的字符</p>
						    </div>
						  </div>
						  <div class="form-group">
						    <label for="shortTitle" class="col-sm-2 control-label"><span style="color: red">*</span>缩写标题</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="shortTitle" name="shortTitle" v-model="model.shortTitle" maxlength="60">
						      <p style="font-size: 12px;color: #999;">请输入少于60位的字符</p>
						    </div>
						  </div>
						  <div class="form-group">
						  	<label for="thumbnail" class="col-sm-2 control-label"><span style="color: red">*</span>缩略图</label>
						    <div class="col-sm-10">
							  	<div class="uploadBox danUpload">
								    <div class="row">
								    </div>
								    <input type="hidden" value="" class="imgInput" id="thumbnail" name="thumbnail" >
								    <a class="btn btn-primary selectBtn">选择图片</a>
								</div>
							</div>
						  </div>
						  <div class="form-group">
						  	<label for="img" class="col-sm-2 control-label"><span style="color: red">*</span>正文大图</label>
						    <div class="col-sm-10">
							  	<div class="uploadBox duoUpload">
								    <div class="row">
								    </div>
								    <input type="hidden" value="" class="imgInput" id="img" name="img" >
								    <a class="btn btn-primary selectBtn">选择图片</a>
								    <label style="color: #999;font-weight: normal">请上传1-3张图片</label>
								</div>
							</div>
						  </div>

						  <div class="form-group">
						  	<label for="summary" class="col-sm-2 control-label"><span style="color: red">*</span>内容概要</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="summary" name="summary" v-model="model.summary" maxlength="100">
						      <p style="font-size: 12px;color: #999;">请输入少于100位的字符</p>
						    </div>
						  </div>

						  <!-- <div class="form-group">
						  	<label for="hazardClass" class="col-sm-2 control-label"><span style="color: red">*</span>危害等级</label>
						    <div class="col-sm-10">
						      <select class="form-control" id="hazardClass" name="hazardClass" v-model="model.hazardClass">
							      <option value="1">1</option>
							      <option value="2">2</option>
							      <option value="3">3</option>							     
							   </select>
						    </div>
						  </div> -->

						  <!-- <div class="form-group">
						  	<label for="hazardClassimg" class="col-sm-2 control-label"><span style="color: red">*</span>危害等级图片</label>
						    <div class="col-sm-10">
							  	<div class="uploadBox danUpload">
								    <div class="row">
								    </div>
								    <input type="hidden"  class="imgInput" id="hazardClassimg" name="hazardClassimg">
								    <a class="btn btn-primary selectBtn">选择图片</a>
								</div>
							</div>
						  </div> -->

						  <div class="form-group">
						  	<label for="source" class="col-sm-2 control-label"><span style="color: red">*</span>文章来源地名称</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="source" name="source" v-model="model.source" maxlength="50">
						      <p style="font-size: 12px;color: #999;">请输入少于50位的字符</p>
						    </div>
						  </div>
						  <div class="form-group">
						  	<label for="sourceUrl" class="col-sm-2 control-label"><span style="color: red">*</span>文章来源地URL</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="sourceUrl" name="sourceUrl" v-model="model.sourceUrl">
						    </div>
						  </div>
						  <div class="form-group">
						  	<label for="hazardClassimg" class="col-sm-2 control-label"><span style="color: red">*</span>来源地（作者小图标）</label>
						    <div class="col-sm-10">
							  	<div class="uploadBox danUpload">
								    <div class="row">
								    </div>
								    <input type="hidden"  class="imgInput" id="sourceImg" name="sourceImg">
								    <a class="btn btn-primary selectBtn">选择图片</a>
								</div>
							</div>
						  </div>

						  <div class="form-group">
						  	<label for="contents" class="col-sm-2 control-label"><span style="color: red">*</span>文章内容</label>
						    <div class="col-sm-10">
						     <textarea class="form-control" rows="4" id="contents" name="contents"></textarea>
						    </div>
						  </div>
						  <div class="form-group">
						  	<label for="remarks" class="col-sm-2 control-label">备注信息</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="remarks" name="remarks" v-model="model.remarks" maxlength="50">
						      <p style="font-size: 12px;color: #999;">请输入少于50位的字符</p>
						    </div>
						  </div>
						  <div class="form-group">
						  	<label for="isFrontpage" class="col-sm-2 control-label"><span style="color: red">*</span>是否放首页</label>
						    <div class="col-sm-10">
						     <select class="form-control" id="isFrontPage" name="isFrontPage" v-model="model.isFrontPage">
							      <option value="0">不放</option>
							      <option value="1">放</option>							     
							   </select>
						    </div>
						  </div>
						  <!-- <div class="form-group">
						  	<label for="isBanner" class="col-sm-2 control-label"><span style="color: red">*</span>是否添加到大标题</label>
						    <div class="col-sm-10">
						     <select class="form-control" id="isBanner" name="isBanner" v-model="model.isBanner">
							      <option value="0">不放</option>
							      <option value="1">放</option>							     
							   </select>
						    </div>
						  </div>
						  <div class="form-group">
						  	<label for="banner_status" class="col-sm-2 control-label"><span style="color: red">*</span>是否设置过期时间</label>
						    <div class="col-sm-10">
						     <select class="form-control" id="banner_status" name="banner_status" v-model="model.banner_status" @change="isShowDate">
							      <option value="0">否</option>
							      <option value="1">是</option>							     
							   </select>
						    </div>
						  </div>
						  <div class="form-group" v-show="isDate">
						  	<label for="expiration_date" class="col-sm-2 control-label"><span style="color: red">*</span>过期时间</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="expiration_date" name="expiration_date" onClick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
						    </div>
						  </div> -->
						  <div class="form-group">
						    <div class="col-sm-offset-2 col-sm-10">
						      <a href="javascript:;" class="btn btn-primary" @click="addData" >保存</a>
						      
						    </div>
						  </div>					
				</form>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      isDate:false,
      api:{
      	addItem:"/genuine/server_preference/serverSave",
      	upload:"/genuine/user/uploadImage"
      },
      model:{
      	title:"",
      	shortTitle:"",
      	thumbnail:"",
      	img:"",
      	summary:"",
      	// hazardClass:1,
      	// hazardClassimg:"",
      	source:"",
      	sourceUrl:"",
      	sourceImg:"",
      	contents:"",
      	remarks:"",
      	isFrontPage:0,
      	isBanner:0,
      	banner_status:0,
      	expiration_date:""

      }
    }
  },
   mounted(){
   	var self=this;
	start.getToken();
	$('#contents').summernote({
        height: 200,    
        callbacks: {
            onImageUpload: function (files, editor, welEditable) {

                sendFile(files[0], editor, welEditable);
            }
        }

      });

	function sendFile(file, editor, welEditable) {
	    var data = new FormData();
	    data.append("file", file);
	    $.ajax({
	        data: data,
	        type: "POST",
	        processData: false,
	        contentType: false,
	        cache: false,
	        url: self.api.upload,
	        success: function (url) {
	            if(url.errorCode=="0"){
	        		$('#contents').summernote('insertImage', url.result.url);     
	        	}else{
	        			zdalert('提示',url.reason,function(){});  
	                
	        		}        
	        }
	    });
	};
	
	
  },
  created(){
  		
  },
  methods:{
	isShowDate:function(){
		var self=this;
		var val=$("#banner_status").val();
		if(val==1){
			self.isDate=true
		}else{
			self.isDate=false
			
		}

	},

	addData:function(){
		var self=this;
		self.model.thumbnail=$("#thumbnail").val();
		self.model.img=$("#img").val();
		// self.model.hazardClassimg=$("#hazardClassimg").val();
		self.model.sourceImg=$("#sourceImg").val();
		// self.model.expiration_date=$("#expiration_date").val();
		self.model.contents=$("#contents").summernote('code');
		var flag=self.verificaty();
		if(flag){
			zdconfirm('系统确认框','确认要提交数据吗',function(r){  
		     if(r)  
		      {  
		         self.axios.post(self.api.addItem, self.model)
		            .then(response => {
		            	if(response.data.errorCode=="0"){
		            		zdalert('提示',response.data.reason,function(){
		            			self.$router.push({name:'preferred'})
		            		});           			                 		
		                
		            	}else{
		            		zdalert('提示',response.data.reason,function(){});     
		            	}                        
		       		})
		      }  
		    });      
			
		}

		
  		
	},
	verificaty:function(){
		var self=this;
      	if(self.model.title==""){
      		zdalert('提示','请输入正文标题',function(){});  
      		return false
      	}else if(self.model.shortTitle==""){
      		zdalert('提示','请输入缩写标题',function(){});  
      		return false
      	}else if(self.model.thumbnail==""){
      		zdalert('提示','请上传缩略图',function(){});  
      		return false
      	}else if(self.model.img==""){
      		zdalert('提示','请上传正文大图',function(){});
      		return false
      	}else if(self.model.summary==""){
      		zdalert('提示','请输入内容概要',function(){});
      		return false
      	}/*else if(self.model.hazardClassimg==""){
      		zdalert('提示','请上传危害等级图片',function(){});
      		return false
      	}*/else if(self.model.source==""){
      		zdalert('提示','请输入文章来源地名称',function(){});
      		return false
      	}else if(self.model.sourceUrl==""){
      		zdalert('提示','请输入文章来源地URL',function(){});
      		return false
      	}else if(self.model.sourceImg==""){
      		zdalert('提示','请上传来源地（作者小图标）',function(){});
      		return false
      	}else if($.trim(self.model.contents)==""){
      		zdalert('提示','请填写文章内容',function(){});
      		return false
      	}else if(!self.checkUrl(self.model.sourceUrl)){
      		zdalert('提示','请输入正确的URL格式',function(){});
      		return false
      	}else{
      		/*if(self.model.banner_status==0){
      			return true
      		}else{
      			if(self.model.expiration_date==""){
      				zdalert('提示','请选择过期时间',function(){});
      				return false
      			}else{
      				return true
      			}
      		}*/
      		return true
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
.form-horizontal .form-group{margin-left: 0;margin-right: 0}
</style>
