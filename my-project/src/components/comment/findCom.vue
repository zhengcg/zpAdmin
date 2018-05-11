<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'comment'}">用户评论</router-link></li>
	    <li class="active">查看</li>
	</ol>
	<div class="findBox">

	  <div class="panel panel-info">
	    <div class="panel-heading">
	        <h3 class="panel-title">
	            文章详情
	        </h3>
	    </div>
	    <div class="panel-body">
	        <table class="table table-bordered" id="infoTable">
			    <tr>
			      <td style="width: 100px;">文章标题</td>
			      <td>{{model.title}}</td>
			    </tr>
			    <tr>
			      <td>文章内容</td>
			      <td>{{model.contents}}</td>
			    </tr>	    
			</table>
	    </div>
	</div>
	<div class="panel panel-info">
		    <div class="panel-heading">		    
		        <h3 class="panel-title">
		            评论列表
		            <a href="javascript:;" class="pull-right addBtn" @click="removeAll"><i class="glyphicon glyphicon-trash"></i><em>批量删除</em></a>
		        </h3>
		    </div>
		    <div class="panel-body">

		        <div class="table-responsive"  v-if="list.length>0">
				  <table class="table table-condensed table-bordered table-striped">
				    <thead>
				      <tr>

				      	<th style="width: 50px;">
						   <input type="checkbox" class="checkAll">
				      	</th>
				        <th style="width: 150px;">用户昵称</th>
				        <th>评论内容</th>				       
				        <th>发表时间</th>
				        <th>评论状态</th>
				        <th>操作</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-for="item in list">
				    		<td style="text-align: center">
					    		<input type="checkbox" class="checkItem" :value="item.id">
						    </td>
				    		<td v-text="item.userName"></td>
				    		<td v-text="item.content"></td>
				    		<td v-text="item.createDate" style="white-space: nowrap;text-align: center"></td>
				    		<td v-text="item.is_show" style="text-align:center;"></td>
				    		
				    		<td style="text-align:center;white-space: nowrap">
				    		<router-link class="btn btn-primary" :to="{name:'findComs', query: { id:item.id}}" style="margin-right: 10px;">查看</router-link>
				    		<a href="javascript:;" class="btn btn-danger" @click="removeFn(item.id)" style="margin-right: 10px;">删除</a>
				    		<a href="javascript:;" class="btn btn-default" v-if="item.is_show=='正常'" @click="update(item.id)">禁止</a>
				    		<a href="javascript:;"  @click="update(item.id)" class="btn btn-info" v-else>显示</a>
				    		
				    		</td>				    		
				    	</tr>
				      
				    </tbody>
				  </table>
				</div>
				<div style="text-align: center" v-else>暂无数据</div>
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
      api:{
      	getList:"/genuine/comment/getResourcesComments",
      	remove:"/genuine/comment/deleteCommentById",
      	update:"/genuine/comment/updateIsShow",
      	removeAll:"/genuine/comment/deleteComments"
      },
      id:'',
      type:'',
      resourcesId:'',
      content:'',
      list:[],
      model:{
      	title:'',
      	contents:''
      }
    }
  },
  created(){
  	this.fetchData() 	
  },
  mounted(){
  	var self=this;
        // 全选
        $(document).on("click",".checkAll",function(){
        	if(($(".checkAll")[0]).checked){
        		for(var i=0;i<$(".checkItem").length;i++){
        			($(".checkItem")[i]).checked=true
        		}
        	}else{
        		for(var j=0;j<$(".checkItem").length;j++){
        			($(".checkItem")[j]).checked=false
        		}
        	}
        })
        // 反选
        $(document).on("click",".checkItem",function(){
        	var l=$(".checkItem").length;
        	var s=$(".checkItem:checked").length;
        	if(l==s){
        		($(".checkAll")[0]).checked=true
        	}else{
        		($(".checkAll")[0]).checked=false
        	}
        })
  	
  },
  
  methods:{
  	fetchData(){
	  	this.id = this.$route.query.id;
	  	this.resourcesId=this.$route.query.resourcesId;
	  	this.type=this.$route.query.type;
	  	this.getList();

	 },
  	getList:function(){
  		var self=this;
  		$.ajax({
  			url:self.api.getList,
  			data:{id:self.id,resourcesId:self.resourcesId,type:1},
  			type:'post',
  			success:function(res){
  				if(res.errorCode=="0"){
					self.list = res.result.list; 
					self.model.title=res.result.title;
					self.model.contents=res.result.contents;    		         			       					                
	            	}else{
	            		zdalert('提示',res.reason,function(){}); 
	            	}      

  			}
  		})
  		

  	},
  	removeFn:function(id){
  		var self=this;
  		zdconfirm('系统确认框','确认要删除吗？',function(r){  
		     if(r)  
		      {  
		         self.axios.get(self.api.remove, {
					　　params: {id:id}
					}).then(function (response) {
					　　if(response.data.errorCode=="0"){
						zdalert('提示',"删除成功",function(){
							location.reload()  
						}); 
								   		
			                
			            	}else{
			            		zdalert('提示',response.data.reason,function(){}); 
			            	}            
					}).catch(function (error) {
					// 　　zdalert('提示',error,function(){}); 
					});
		      }  
		    }); 
  	},
  	removeAll:function(){
  		var self=this;
  		var ids=[];
  		for(var i=0;i<$(".checkItem:checked").length;i++){
  			ids.push($($(".checkItem:checked")[i]).val())
  		}
  		zdconfirm('系统确认框','确认要删除吗？',function(r){  
		     if(r)  
		      {  
		         self.axios.get(self.api.removeAll, {
					　　params:{ids:ids.toString()}
					}).then(function (response) {
					　　if(response.data.errorCode=="0"){
						zdalert('提示',response.data.reason,function(){
							location.reload()  
						}); 
								   		
			                
			            	}else{
			            		zdalert('提示',response.data.reason,function(){}); 
			            	}            
					}).catch(function (error) {
					// 　　zdalert('提示',error,function(){}); 
					});
		      }  
		    }); 

  			
  		
  		

  	},
  	update:function(id){
  		var self=this;
  		zdconfirm('系统确认框','确认要修改评论状态吗？',function(r){  
		     if(r)  
		      {  
		         self.axios.get(self.api.update, {
					　　params: {id:id}
					}).then(function (response) {
					　　if(response.data.errorCode=="0"){
						zdalert('提示',response.data.reason,function(){
							location.reload()  
						}); 
								   		
			                
			            	}else{
			            		zdalert('提示',response.data.reason,function(){}); 
			            	}            
					}).catch(function (error) {
					// 　　zdalert('提示',error,function(){}); 
					});
		      }  
		    }); 

  	}


    

  }
}
</script>

<style lang="scss">
.addBtn{color: #337ab7!important}
.addBtn i{margin-right: 5px;vertical-align: middle}
.addBtn em{vertical-align: middle;font-style: normal;}
#infoTable td{border:1px solid #ddd;padding: 10px; }
</style>
