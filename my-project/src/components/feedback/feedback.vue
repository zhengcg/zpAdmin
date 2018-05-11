<template>
	<div>
	<ol class="breadcrumb">
	    <li><a href="javascript:;">用户反馈</a></li>
	    <li class="active">列表</li>
	</ol>
		<div class="panel panel-info">
		    <div class="panel-heading">		    
		        <h3 class="panel-title">
		            用户反馈
		        </h3>
		    </div>
		    <div class="panel-body">

		        <div class="table-responsive" v-if="list.length>0">
				  <table class="table table-condensed table-bordered table-striped">
				    <thead>
				      <tr>
				      	<th>反馈类型</th>
				        <th>问题内容</th>
				        <th>回复内容</th>
				        <th>手机号</th>
				        <th>设备编号</th>
				        <!-- <th>创建者</th> -->
				        <th>创建时间</th>
				        <!-- <th>更新者</th> -->
				        <th>更新时间</th>
				        <th style="min-width: 150px;">操作</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-for="item in list">
				    		<td v-if="item.type==0"  style="white-space: nowrap">产品问题</td>
				    		<td v-if="item.type==1"  style="white-space: nowrap">扫码问题</td>
				    		<td v-if="item.type==2"  style="white-space: nowrap">意见建议</td>
				    		<td v-if="item.type==3"  style="white-space: nowrap">其他</td>
				    		<td>{{item.question}}</td>
				    		<td>{{item.answer}}</td>
				    		<td style="white-space: nowrap;text-align: center">{{item.mobile}}</td>
				    		<td>{{item.uuid}}</td>
				    		<td style="white-space: nowrap;text-align: center">{{item.createDateStr}}</td>
				    		<td style="white-space: nowrap;text-align: center">{{item.updateDateStr}}</td>
				    		<td style="text-align: center">
				    		<router-link class="btn btn-primary" :to="{name:'findFee', query: { id:item.id}}" style="margin-right: 10px;">查看</router-link>
				    		<a href="javascript:;" class="btn btn-info" @click="answerFn(item.id,item.answer)">回复</a></td>
				    	</tr>
				      
				    </tbody>
				  </table>
				</div>
				<div style="text-align: center" v-else>暂无数据</div>
				<div id="Pagination" class="pagination"></div>
			</div>
		</div>

		<!-- 回复弹窗 -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">回复反馈信息</h4>
                </div>
                <div class="modal-body">

                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label for="statusCode" class="col-sm-2 control-label"><span style="color: red">*</span>回复内容</label>
                        <div class="col-sm-10">
                         <textarea v-model="answer" class="form-control" id="answer" placeholder="请输入回复内容"></textarea>
                        </div>
                      </div>
                 
                </form>
                  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="submitAnswer">回复</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>



	</div>
	
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      api:{
      	getList:"/genuine/feedback/findFeedbackList",
      	answer:"/genuine/feedback/addAnswer"
      },
      id:'',
      answer:'',
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
  	answerFn:function(id,answer){
  		var self=this;
  		$('#myModal').modal({
	        keyboard: true
	      })
  		self.id=id;
  		self.answer=answer
  		
  	},
  	submitAnswer:function(){
  		var self=this;
  		if($.trim(self.answer)==""){
  			zdalert('提示',"回复内容不能为空！",function(){}); 
  		}else{
  			this.axios.post(self.api.answer, {id:self.id,answer:self.answer})
            .then(response => {
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