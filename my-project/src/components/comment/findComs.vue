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
	            评论详情
	        </h3>
	    </div>
	    <div class="panel-body">
	        <table class="table table-bordered" id="infoTable">
			    <tr>
			      <td>用户头像</td>
			      <td><a :href="model.avatar" target="_blank"><img :src="model.avatar"></a></td>
			    </tr>
			    <tr>
			      <td>用户昵称</td>
			      <td>{{model.nickName}}</td>
			    </tr>	
			    <tr>
			      <td>评论内容</td>
			      <td>{{model.content}}</td>
			    </tr>
			    <tr>
			    	<td>文章类型</td>
			    	<td>{{model.type}}</td>
			    </tr>
			    <tr>
			      <td>点赞数</td>
			      <td>{{model.praiseNum}}</td>
			    </tr>
			    <tr>
			      <td>文章标题（商品为商品名称）</td>
			      <td>{{model.title}}</td>
			    </tr>	
			    
			    <tr>
			      <td>发表时间</td>
			      <td>{{model.createDate}}</td>
			    </tr>
			    <tr>
			      <td>评论状态</td>
			      <td>{{model.is_show}}</td>
			    </tr>			    
			</table>

	    </div>
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
      	getItem:"/genuine/comment/getCommentById"

      },
      model:{}
      

    }
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
                
            	}else{
            		zdalert('提示',response.data.reason,function(){});
            	}            
		}).catch(function (error) {
		// 　　alert(error);
		});

	 }
	

  }

}
</script>

<style lang="scss">
.findBox{
	#infoTable{
		td{
			border: 1px solid #ddd;
			padding: 5px 15px;
			word-break: break-all;
		}
		td:first-of-type{
			font-weight: bolder;
			width: 160px;
			text-align: right;
		}

	}
}

</style>
