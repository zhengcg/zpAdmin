<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'preferred'}">正品优选</router-link></li>
	    <li class="active">编辑</li>
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
								    	<div class="col-sm-2" :data-src="model.thumbnail"><a href="javascript:;" class="thumbnail"><img :src="model.thumbnail"><i class="glyphicon glyphicon-remove-circle" ></i></a></div>
								    </div>
								    <input type="hidden"  class="imgInput" id="thumbnail" name="thumbnail">
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
								    <input type="hidden"  class="imgInput" id="img" name="img">
								    <a class="btn btn-primary selectBtn">选择图片</a>
								    <label style="color: #999;font-weight: normal">请上传1-3张图片</label>
								</div>
							</div>
						  </div>

						  <div class="form-group">
						  	<label for="summary" class="col-sm-2 control-label"><span style="color: red">*</span>内容概要</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="summary" name="summary" v-model="model.summary">
						    </div>
						  </div>

						 <!--  <div class="form-group">
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
								    	<div class="col-sm-2" :data-src="model.hazardClassimg"><a href="javascript:;" class="thumbnail"><img :src="model.hazardClassimg"><i class="glyphicon glyphicon-remove-circle"></i></a></div>
								    </div>
								    <input type="hidden"  class="imgInput" id="hazardClassimg" name="hazardClassimg">
								    <a class="btn btn-primary selectBtn">选择图片</a>
								</div>
							</div>
						  </div> -->

						  <div class="form-group">
						  	<label for="source" class="col-sm-2 control-label"><span style="color: red">*</span>文章来源地名称</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="source" name="source" v-model="model.source">
						    </div>
						  </div>
						  <div class="form-group">
						  	<label for="sourceUrl" class="col-sm-2 control-label"><span style="color: red">*</span>文章来源地URL</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="sourceUrl" name="sourceUrl" v-model="model.sourceUrl">
						    </div>
						  </div>

						  <div class="form-group">
						  	<label for="thumbnail" class="col-sm-2 control-label"><span style="color: red">*</span>来源地（作者小图标）</label>
						    <div class="col-sm-10">
							  	<div class="uploadBox danUpload">
								    <div class="row">
								    	<div class="col-sm-2" :data-src="model.sourceImg"><a href="javascript:;" class="thumbnail"><img :src="model.sourceImg"><i class="glyphicon glyphicon-remove-circle" ></i></a></div>
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
						 
						  <div class="form-group">
						    <div class="col-sm-offset-2 col-sm-10">
						      <a href="javascript:;" class="btn btn-primary" @click="updateItem" >保存</a>
						      
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
      api:{
      	getItem:"/genuine/preference/getContenById",
      	updateDate:"/genuine/server_preference/serverUpdate",
      	upload:"/genuine/user/uploadImage"
      },
      model:{
      	  "id": "",
	      "title": "",
	      "shortTitle": "",
	      "thumbnail": "",
	      "img": "",
	      "summary": "",
	      // "hazardClass": "",
	      // "hazardClassimg": "",
	      "commentsnum": "",
	      "source": "",
	      "sourceUrl": "",
	      "sourceImg": "",
	      "contents": "",
	      "remarks":"",
	      "isFrontPage": "",
	      "createBy": "",
	      "createDate": "",
	      "updateBy": "",
	      "update_date": "",
	      "remarks": "",
	      "delFlag": ""
      },
      updateData:{}
      

    }
  },
   mounted(){
   	var self=this;
	start.getToken();
	$('#contents').summernote({
        height: 200,
        lang:"cs-CZ",       
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
            		self.model=response.data.result;  
            		$("#thumbnail").val(self.model.thumbnail);
            		// $("#hazardClassimg").val(self.model.hazardClassimg);
            		$("#sourceImg").val(self.model.sourceImg);
            		$("#img").val(self.model.img);
            		var imgs=self.model.img.split(",");

            		var html=""
            		for(var i=0;i<imgs.length;i++){
            			html+='<div class="col-sm-2" data-src="'+imgs[i]+'"><a href="javascript:;" class="thumbnail"><img src="'+imgs[i]+'"><i class="glyphicon glyphicon-remove-circle"></i></a></div>'
            		} 
            		$("#img").siblings("div.row").html(html);
            		$("#contents").summernote('code',self.model.contents)

                
            	}else{
            		zdalert('提示',response.data.reason,function(){}); 
            	}            
		}).catch(function (error) {
		　　zdalert('提示',error,function(){}); 
		});

	 },
	 updateItem:function(){
	 	var self=this;
	 	self.updateData.thumbnail=$("#thumbnail").val();
		self.updateData.img=$("#img").val();
		// self.updateData.hazardClassimg=$("#hazardClassimg").val();
		self.updateData.contents=$("#contents").summernote('code');
		self.updateData.remarks=self.model.remarks;
		self.updateData.id=self.model.id;
		self.updateData.title=self.model.title;
		self.updateData.shortTitle=self.model.shortTitle;
		self.updateData.summary=self.model.summary;
		// self.updateData.hazardClass=self.model.hazardClass;
		self.updateData.source=self.model.source;
		self.updateData.sourceUrl=self.model.sourceUrl;
		self.updateData.sourceImg=$("#sourceImg").val();
		self.updateData.isFrontPage=self.model.isFrontPage;
		var flag=self.verificaty();
		if(flag){
			zdconfirm('系统确认框','确认要提交数据吗',function(r){  
		     if(r)  
		      {  
		        self.axios.post(self.api.updateDate, self.updateData)
			            .then(response => {
			            	if(response.data.errorCode=="0"){
			           		zdalert('提示',response.data.reason,function(){
		            			// location.reload()
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
      	if(self.updateData.title==""){
      		zdalert('提示','请输入正文标题',function(){});  
      		return false
      	}else if(self.updateData.shortTitle==""){
      		zdalert('提示','请输入缩写标题',function(){});  
      		return false
      	}else if(self.updateData.thumbnail==""){
      		zdalert('提示','请上传缩略图',function(){});  
      		return false
      	}else if(self.updateData.img==""){
      		zdalert('提示','请上传正文大图',function(){});
      		return false
      	}else if(self.updateData.summary==""){
      		zdalert('提示','请输入内容概要',function(){});
      		return false
      	}/*else if(self.updateData.hazardClassimg==""){
      		zdalert('提示','请上传危害等级图片',function(){});
      		return false
      	}*/else if(self.updateData.source==""){
      		zdalert('提示','请输入文章来源地名称',function(){});
      		return false
      	}else if(self.updateData.sourceUrl==""){
      		zdalert('提示','请输入文章来源地URL',function(){});
      		return false
      	}else if(self.updateData.sourceImg==""){
      		zdalert('提示','请上传来源地（作者小图标）',function(){});
      		return false
      	}else if($.trim(self.updateData.contents)==""){
      		zdalert('提示','请填写文章内容',function(){});
      		return false
      	}else if(!self.checkUrl(self.model.sourceUrl)){
      		zdalert('提示','请输入正确的URL格式',function(){});
      		return false
      	}else{
      		return true;
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
