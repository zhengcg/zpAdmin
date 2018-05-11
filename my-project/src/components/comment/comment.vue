<template>
	<div>
		<ol class="breadcrumb">
		    <li><a href="javascript:;">用户评论</a></li>
		    <li class="active">列表</li>
		</ol>
		<div class="panel panel-info">
	        <div class="panel-body">
	        	<form class="form-inline" role="form">
				  <div class="form-group" style="margin-right: 10px;">
				    <label>评论内容:</label>
				    <input type="text" class="form-control" placeholder="请输入关键字" v-model="content">
				  </div>
				  <div class="form-group">
				    <label>日期:</label>
				    <input type="text" class="form-control" id="searchDate">
				  </div>
				  <a href="javascript:;" class="btn btn-primary" @click="submitData">查找</a>
				</form>
				
	        </div>
        </div>
        <div class="panel panel-info">
		    <div class="panel-heading">		    
		        <h3 class="panel-title">
		            用户评论
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
				      	 <!-- <th>文章标题</th> -->
				       
				        <th style="width: 100px;">文章类型</th>
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
						    <!-- <td t-text="item.title"></td>				    		 -->
				    		<td v-text="item.type"></td>
				    		<td v-text="item.userName"></td>
				    		<td v-text="item.content"></td>
				    		<td v-text="item.createDate" style="white-space: nowrap;text-align: center"></td>
				    		<td v-text="item.is_show" style="text-align:center;"></td>
				    		
				    		<td style="text-align:center;white-space: nowrap">
				    		<router-link class="btn btn-primary" :to="{name:'findCom', query: { id:item.id,type:item.type,resourcesId:item.resourcesId}}" style="margin-right: 10px;">查看</router-link>
				    		<a href="javascript:;" class="btn btn-danger" @click="removeFn(item.id)" style="margin-right: 10px;">删除</a>
				    		<a href="javascript:;" class="btn btn-default" v-if="item.is_show=='正常'" @click="update(item.id)">禁止</a>
				    		<a href="javascript:;"  @click="update(item.id)" class="btn btn-info" v-else>显示</a>
				    		
				    		</td>				    		
				    	</tr>
				      
				    </tbody>
				  </table>
				</div>
				<div style="text-align: center" v-else>暂无数据</div>
				<div id="Pagination" class="pagination"></div>
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
      	getList:"/genuine/comment/getCommentList",
      	remove:"/genuine/comment/deleteCommentById",
      	update:"/genuine/comment/updateIsShow",
      	removeAll:"/genuine/comment/deleteComments"
      },
      content:'',
      list:[],
      count:0,
      searchDate:'',
      isInitPage:false,
    }
  },
  created(){
  	this.getList(1,10);	
  },
  mounted(){
  	var self=this;
  	$('#searchDate').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear',
                format: 'YYYY-MM-DD',
            }
        });

        $('#searchDate').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('YYYY-MM-DD') + '~' + picker.endDate.format('YYYY-MM-DD'));
            self.searchDate=$(this).val()

        });

        $('#searchDate').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
            self.searchDate=$(this).val()
        });
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
  	getList:function(pageNo,pageSize){
  		var self=this;
  		$.ajax({
  			url:self.api.getList,
  			data:{pageNo:pageNo,pageSize:pageSize,content:self.content,searchDate:self.searchDate},
  			type:'post',
  			success:function(res){
  				if(res.errorCode=="0"){
					self.list = res.result.list;         		         		
	       			self.count=Math.ceil(res.result.count/10);
	       			if(!self.isInitPage){
	       				self.initPage();
	       			}
	           			                 		
	                
	            	}else{
	            		zdalert('提示',res.reason,function(){}); 
	            	}      

  			}
  		})
  		/*this.axios.post(self.api.getList, {pageNo:pageNo,pageSize:pageSize,content:self.content,searchDate:self.searchDate})
            .then(response => {
            	if(response.data.errorCode=="0"){
					self.list = response.data.result.list;         		         		
	       			self.count=Math.ceil(response.data.result.count/10);
	       			if(!self.isInitPage){
	       				self.initPage();
	       			}
	           			                 		
	                
	            	}else{
	            		zdalert('提示',response.data.reason,function(){}); 
	            	}                          
       		}).catch(function (error) {
		// 　　zdalert('提示',error,function(){}); 
			});*/
  		/*this.axios.get(self.api.getList, {
		　　params: {pageNo:pageNo,pageSize:pageSize,content:self.content,searchDate:self.searchDate}
		}).then(function (response) {
		　　if(response.data.errorCode=="0"){
				self.list = response.data.result.list;         		         		
       			self.count=Math.ceil(response.data.result.count/10);
       			if(!self.isInitPage){
       				self.initPage();
       			}
           			                 		
                
            	}else{
            		zdalert('提示',response.data.reason,function(){}); 
            	}            
		}).catch(function (error) {
		// 　　zdalert('提示',error,function(){}); 
		});*/

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

  	},
  	initPage:function(){
	  	var self=this;	
	  	self.isInitPage=true
	  	var initPagination = function() {
			// 创建分页
			$("#Pagination").pagination(self.count, {
				num_edge_entries: 1, //边缘页数
				num_display_entries: 4, //主体页数
				callback: pageselectCallback,
				items_per_page: 1, //每页显示1项
				prev_text: "前一页",
				next_text: "后一页"
			});
		 };
		 initPagination()
		function pageselectCallback(page_index, jq){
			self.getList(page_index+1,10)			
			return false;
		} 
		
	  },

    submitData:function(){ 
    	var self=this; 
    	// if($.trim(self.searchDate)==""&&$.trim(self.content)==""){
    	// 	zdalert('提示',"请填写搜索字段！",function(){});
    	// }else{
    		self.isInitPage=false;
    		this.getList(1,10);	  
    	// }
    					
    }
    

  }
}
</script>

<style lang="scss">
.addBtn{color: #337ab7!important}
.addBtn i{margin-right: 5px;vertical-align: middle}
.addBtn em{vertical-align: middle;font-style: normal;}
</style>