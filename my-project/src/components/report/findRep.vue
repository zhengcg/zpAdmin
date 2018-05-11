<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'report'}">用户举报</router-link></li>
	    <li class="active">查看</li>
	</ol>
	<div class="findBox">

	  <div class="panel panel-info">
	    <div class="panel-heading">
	        <h3 class="panel-title">
	            举报详情
	        </h3>
	    </div>
	    <div class="panel-body">
	        <table class="table table-bordered" id="infoTable">
	        	<tr>
			      <td>商品二维码</td>
			      <td>{{model.sn}}</td>
			    </tr>
			    <tr>
			      <td>举报人电话</td>
			      <td>{{model.mobile}}</td>
			    </tr>
			    <tr>
			      <td>举报内容</td>
			      <td>{{model.contents}}</td>
			    </tr>
			    <tr>
			      <td>举报内容图片</td>
			       <td><a :href="item" target="_blank" v-for=" item in images" style="margin-right: 10px;"><img :src="item"></a></td>
			      <!-- <td><a :href="model.image1" target="_blank"><img :src="model.image1"></a></td> -->
			    </tr>
			    <tr>
			      <td>举报答复</td>
			      <td>{{model.answer}}</td>
			    </tr>
			    <tr>
			      <td>举报人姓名</td>
			      <td>{{model.name}}</td>
			    </tr>				
	        	<tr>
			        <td>反馈类型</td>
			        <td v-if="model.cause==0"  style="white-space: nowrap">感觉是假的</td>
				    <td v-else-if="model.cause==1"  style="white-space: nowrap">标签印刷粗糙</td>
				    <td v-else-if="model.cause==2"  style="white-space: nowrap">渠道有问题</td>
				    <td v-else-if="model.cause==3"  style="white-space: nowrap">其他</td>
				    <td v-else></td>
			    </tr>
			    <tr>
			      <td>创建者</td>
			      <td>{{model.creteBy}}</td>
			    </tr>		
			    <tr>
			      <td>创建时间</td>
			      <td>{{model.createDateStr}}</td>
			    </tr>
			    <tr>
			      <td>更新者</td>
			      <td>{{model.updateBy}}</td>
			    </tr>		
			    <tr>
			      <td>更新时间</td>
			      <td>{{model.updateDateStr}}</td>
			    </tr>
			    
			    <tr>
			      <td>备注信息</td>
			      <td>{{model.remarks}}</td>
			    </tr>
			    <tr>
			      <td>删除标志</td>
			      <td>{{model.delFlag}}</td>
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
      	getItem:"/genuine/report/findById"

      },
      model:{},
      images:[]
      

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
            		self.images=response.data.result.image1.split(",")              		          		
                
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
