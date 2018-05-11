<template>
	<div>
	<ol class="breadcrumb">
	    <li><a href="javascript:;">Banner</a></li>
	    <li class="active">列表</li>
	</ol>
		<div class="panel panel-info">
		    <div class="panel-heading">		    
		        <h3 class="panel-title">
		            Banner
		            <router-link class="pull-right addBtn" :to="{name:'addBanner'}"><i class="glyphicon glyphicon-plus"></i>添加</router-link>
		        </h3>
		    </div>
		    <div class="panel-body">

		        <div class="table-responsive" v-if="list.length>0">
				  <table class="table table-condensed table-bordered table-striped">
				    <thead>
				      <tr>
				      	<th>标题</th>
				        <th>类型</th>
				        <!-- <th>资源id</th> -->
				        <th>过期时间</th>
				        <!-- <th>状态</th> -->
				        <th>创建者</th>
				        <th>创建时间</th>
				        <th>更新者</th>
				        <th>更新时间</th>
				        <!-- <th>备注信息</th> -->
				        <th style="min-width: 150px;">操作</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-for="item in list">
				    	    <td>{{item.title}}</td>
				    		<td v-if="item.type==3"  style="white-space: nowrap">其他</td>
				    		<td v-if="item.type==1"  style="white-space: nowrap">曝光品</td>
				    		<td v-if="item.type==2"  style="white-space: nowrap">正品优选</td>
				    		<!-- <td>{{item.resourceId}}</td> -->
				    		<td style="white-space: nowrap">{{item.expirationDate}}</td>
				    		<!-- <td v-if="item.statusCode==0">没有过期时间</td>
				    		<td v-if="item.statusCode==1">有过期时间</td> -->
				    		<td>{{item.createBy}}</td>
				    		<td style="white-space: nowrap">{{item.createDateStr}}</td>
				    		<td>{{item.updateBy}}</td>
				    		<td style="white-space: nowrap">{{item.updateDateStr}}</td>
				    		<!-- <td>{{item.remarks}}</td> -->
				    		<td style="text-align: center"><a href="javascript:;" class="btn btn-danger" @click="removeFn(item.id)" style="margin-right: 10px;">删除</a><!-- <a href="javascript:;" class="btn btn-primary" @click="addBanner(item.id,item.expirationDate,item.statusCode)">修改</a> -->
				    		<router-link class="btn btn-primary" :to="{name:'editBanner',query: { id:item.id}}">修改</router-link>
				    		</td>
				    	</tr>
				      
				    </tbody>
				  </table>
				</div>
				<div style="text-align: center" v-else>暂无数据</div>
				<div id="Pagination" class="pagination"></div>
			</div>
		</div>



		<!-- 修改 -->
		<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">修改banner</h4>
                </div>
                <div class="modal-body">

                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label for="statusCode" class="col-sm-4 control-label"><span style="color: red">*</span>是否设置过期时间</label>
                        <div class="col-sm-8">
                         <select class="form-control" id="statusCode" name="statusCode" v-model="updata.statusCode" @change="isShowDate">
                            <option value="0">否</option>
                            <option value="1">是</option>                   
                         </select>
                        </div>
                      </div>
                      <div class="form-group" v-show="isDate">
                        <label for="expiration_date" class="col-sm-4 control-label"><span style="color: red">*</span>过期时间</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="expirationDate" name="expirationDate" v-model="updata.expirationDate" onClick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                        </div>
                      </div>
                 
                </form>
                  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="submitData">修改</button>
                </div>
            </div>
        </div>
    </div>
 -->

		

	</div>
	
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      api:{
      	getList:"/genuine/banner/getAllBanner",
      	remove:"/genuine/banner/deleteBanner",
      	addItem:"/genuine/banner/updateBanner"
      },
      list:[],
      count:0,
      isInitPage:false,
      model:{},
      updata:{statusCode:1,expirationDate:'',id:""},
      isDate:false
    }
  },
  created(){
  	this.getList(1,10);	
  },
  
  methods:{
  	isShowDate:function(){
      var self=this;
      var val=$("#statusCode").val();
      if(val==1){
        self.isDate=true
      }else{
        self.isDate=false
        
      }

  },
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
	  /*addBanner:function(id,expirationDate,statusCode){
	      var self=this;
	      self.updata.id=id;
	      
	      self.updata.expirationDate=expirationDate;
	      self.updata.statusCode=statusCode;
	      var val=statusCode;
		      if(val==1){
		        self.isDate=true
		      }else{
		        self.isDate=false
		        
		      }
	        $('#myModal').modal({
	        keyboard: true
	      })
    },
    submitData:function(){ 
    var self=this;    
      var flag=false;
      if(self.updata.statusCode==0){
      	self.updata.expirationDate=""
            flag=true
          }else{
            self.updata.expirationDate=$("#expirationDate").val();
            if(self.updata.expirationDate==""){
              zdalert('提示','请选择过期时间',function(){});
              flag=false;
            }else{
              flag=true
            }
          }


          if(flag){
            zdconfirm('系统确认框','确认要提交数据吗',function(r){  
             if(r)  
              {  
                 self.axios.post(self.api.addItem, self.updata)
                    .then(response => {
                      if(response.data.errorCode=="0"){
                        zdalert('提示',response.data.reason,function(){
                          $('#myModal').modal('hide');
                          location.reload()
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
    }*/

  }
}
</script>

<style lang="scss">
.addBtn{margin-bottom: 15px;}
</style>