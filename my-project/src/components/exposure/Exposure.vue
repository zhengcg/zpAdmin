<template>
	<div>
	<ol class="breadcrumb">
	    <li><a href="javascript:;">新闻</a></li>
	    <li class="active">列表</li>
	</ol>
		
		<div class="panel panel-info">
		    <div class="panel-heading">		    
		        <h3 class="panel-title">
		            新闻
		            <router-link class="pull-right addBtn" :to="{name:'addExp'}"><i class="glyphicon glyphicon-plus"></i>添加</router-link>
		        </h3>
		    </div>
		    <div class="panel-body">

		        <div class="table-responsive" v-if="list.length>0">
				  <table class="table table-condensed table-bordered table-striped">
				    <thead>
				      <tr>
				        <th>正文标题</th>
				        <th>新闻类型</th>
				        <th>是否在首页显示</th>
				        <th>危害等级</th>
				        <th>文章来源地名称</th>
				        <th>创建时间</th>
				        <th>更新时间</th>
				        <th style="min-width:220px;">操作</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-for="item in list">
				    		<td>{{item.title}}</td>
				    		<td v-if="item.newsType==1"  style="white-space: nowrap">曝光</td>
				    		<td v-if="item.newsType==2"  style="white-space: nowrap">行业资讯</td>
				    		<td v-if="item.newsType==3"  style="white-space: nowrap">正品动态</td>
				    		<td v-if="item.isFrontPage==0" style="text-align: center">否</td>
				    		<td v-if="item.isFrontPage==1" style="text-align: center">是</td>
				    		
				    		<td style="text-align: center;" v-if="item.hazardClass=='0'">无</td>
			      			<td style="text-align: center;" v-else>{{item.hazardClass}}</td>
				    		<td>{{item.source}}</td>
				    		<td style="white-space: nowrap">{{item.createDateStr}}</td>
				    		<td style="white-space: nowrap">{{item.updateDateStr}}</td>
				    		<td style="white-space: nowrap"><router-link class="btn btn-default" :to="{name:'updateExp', query: { id:item.id}}" style="margin-right:10px;">修改</router-link><router-link class="btn btn-primary" :to="{name:'findExp', query: { id:item.id}}" style="margin-right: 10px;">查看</router-link><a href="javascript:;" class="btn btn-danger" @click="removeFn(item.id)" style="margin-right: 10px;">删除</a><a :href="item.snapshot" target="_blank" class="btn btn-info" v-if="item.snapshot">预览</a></td>				    		
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
      	getList:"/genuine/server_exposureBar/serverList",
      	remove:"/genuine/server_exposureBar/serverDelete"
      },
      list:[],
      count:0,
      isInitPage:false
    }
  },
  mounted(){
  	
  },
  created(){
  	this.getList(1,10);

  	
  },
  methods:{
  	getList:function(pageNo,pageSize){
  		var self=this;
  		this.axios.get(self.api.getList, {
		　　params: {pageNo:pageNo,pageSize:pageSize}
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
	  }

  }
  
}
</script>

<style lang="scss">
.addBtn{color: #337ab7!important}
.addBtn i{margin-right: 5px;}
</style>