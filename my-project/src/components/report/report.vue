<template>
	<div>
	<ol class="breadcrumb">
	    <li><a href="javascript:;">用户举报</a></li>
	    <li class="active">列表</li>
	</ol>
		<div class="panel panel-info">
		    <div class="panel-heading">		    
		        <h3 class="panel-title">
		            用户举报
		        </h3>
		    </div>
		    <div class="panel-body">

		        <div class="table-responsive" v-if="list.length>0">
				  <table class="table table-condensed table-bordered table-striped">
				    <thead>
				      <tr>
				      	<th>商品二维码</th>
				        <th>举报人电话</th>
				        <th>举报人姓名</th>
				        <th>举报原因</th>
				        <th>创建者</th>
				        <th>创建时间</th>
				        <th>更新者</th>
				        <th>更新时间</th>
				        <th>操作</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-for="item in list">
				    		<td>{{item.sn}}</td>
				    		<td style="white-space: nowrap;text-align: center">{{item.mobile}}</td>
				    		<td style="white-space: nowrap;">{{item.name}}</td>
				    		<td v-if="item.cause==0"  style="white-space: nowrap">感觉是假的</td>
				    		<td v-else-if="item.cause==1"  style="white-space: nowrap">标签印刷粗糙</td>
				    		<td v-else-if="item.cause==2"  style="white-space: nowrap">渠道有问题</td>
				    		<td v-else-if="item.cause==3"  style="white-space: nowrap">其他</td>
				    		<td v-else></td>
				    		
				    		
				    		<td style="white-space: nowrap;text-align: center">{{item.createBy}}</td>
				    		<td style="white-space: nowrap;text-align: center">{{item.createDateStr}}</td>
				    		<td style="white-space: nowrap;text-align: center">{{item.updateBy}}</td>
				    		<td style="white-space: nowrap;text-align: center">{{item.updateDateStr}}</td>
				    		<td style="text-align: center">
				    		<router-link class="btn btn-primary" :to="{name:'findRep', query: { id:item.id}}" style="margin-right: 10px;">查看</router-link>
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
      	getList:"/genuine/report/findList"

      },
      list:[],
      count:0,
      isInitPage:false,    
    }
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
		
	  }

  }
}
</script>

<style lang="scss">
.addBtn{margin-bottom: 15px;}
</style>