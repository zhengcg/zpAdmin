<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'feedback'}">用户反馈</router-link></li>
	    <li class="active">查看</li>
	</ol>
	<div class="findBox">

	  <div class="panel panel-info">
	    <div class="panel-heading">
	        <h3 class="panel-title">
	            反馈详情
	        </h3>
	    </div>
	    <div class="panel-body">
	        <table class="table table-bordered" id="infoTable">
	        	<tr>
			        <td>反馈类型</td>
			        <td v-if="model.type==0"  style="white-space: nowrap">产品问题</td>
		    		<td v-if="model.type==1"  style="white-space: nowrap">扫码问题</td>
		    		<td v-if="model.type==2"  style="white-space: nowrap">意见建议</td>
		    		<td v-if="model.type==3"  style="white-space: nowrap">其他</td>
			    </tr>
			    <tr>
			      <td>问题内容</td>
			      <td>{{model.question}}</td>
			    </tr>		
			    <tr>
			      <td>图片</td>
			      <td><a :href="item" target="_blank" v-for=" item in images" style="margin-right: 10px;"><img :src="item"></a></td>
			    </tr>
			    <tr>
			      <td>回复内容</td>
			      <td>{{model.answer}}</td>
			    </tr>	
			    <tr>
			      <td>手机号</td>
			      <td>{{model.mobile}}</td>
			    </tr>
			    <tr>
			    	<td>设备编号</td>
			    	<td>{{model.uuid}}</td>
			    </tr>
			    <tr>
			      <td>创建者</td>
			      <td>{{model.createBy}}</td>
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
			    <!-- <tr>
			      <td>删除标志</td>
			      <td>{{model.delFlag}}</td>
			    </tr>	 -->		    
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
      	getItem:"/genuine/feedback/findById"

      },
      images:[],
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
            		self.images=response.data.result.image.split(",")         		          		
                
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
