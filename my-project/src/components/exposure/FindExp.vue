<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'exposure'}">新闻</router-link></li>
	    <li class="active">查看</li>
	</ol>
	<div class="findBox">

	  <div class="panel panel-info">
	    <div class="panel-heading">
	        <h3 class="panel-title">
	            基本内容
	            <a :href="model.snapshot" target="_blank" class="pull-right" v-if="model.snapshot">预览</a>
	        </h3>
	    </div>
	    <div class="panel-body">
	        <table class="table table-bordered" id="infoTable">
			    <tr>
			      <td>正文标题</td>
			      <td>{{model.title}}</td>
			    </tr>
			    <tr>
			      <td>缩写标题</td>
			      <td>{{model.shortTitle}}</td>
			    </tr>
			    <tr>
			      <td>新闻类型</td>
			      <td v-if="model.newsType==1"  style="white-space: nowrap">曝光</td>
				  <td v-if="model.newsType==2"  style="white-space: nowrap">行业资讯</td>
				  <td v-if="model.newsType==3"  style="white-space: nowrap">正品动态</td>
			    </tr>	
			    <tr>
			      <td>缩略图</td>
			      <td><a :href="model.thumbnail" target="_blank"><img :src="model.thumbnail"></a></td>
			    </tr>
			    <tr>
			    	<td>正文大图</td>
			    	<td><a :href="item" target="_blank" v-for="item in model.img" style="margin-right: 15px;"><img :src="item"></a></td>
			    </tr>
			    <tr>
			      <td>内容概要</td>
			      <td>{{model.summary}}</td>
			    </tr>
			    <tr>
			      <td>危害等级</td>
			      <td v-if="model.hazardClass=='0'">无</td>
			      <td v-else>{{model.hazardClass}}</td>
			    </tr>	
			    <!-- <tr>
			      <td>危害等级图片</td>
			      <td><a :href="model.hazardClassimg" target="_blank"><img :src="model.hazardClassimg"></a></td>
			    </tr> -->
			    <!-- <tr>
			      <td>评论数</td>
			      <td>{{model.commentsNum}}</td>
			    </tr> -->
			    <tr>
			      <td>文章来源地名称</td>
			      <td>{{model.source}}</td>
			    </tr>
			    <tr>
			      <td>文章来源的URL</td>
			      <td>{{model.sourceUrl}}</td>
			    </tr>
			    <tr>
			      <td>来源地（作者小图标）</td>
			      <td><a :href="model.sourceImg" target="_blank"><img :src="model.sourceImg"></a></td>
			    </tr>	
			    <tr>
			      <td>是否放首页</td>
			      <td v-if="model.isFrontPage==0">不放</td>
			      <td v-if="model.isFrontPage==1">放</td>
			    </tr>
			    <tr>
			      <td>创建者</td>
			      <td>{{model.createBy}}</td>
			    </tr>  
			    <tr>
			      <td>创建时间</td>
			      <td>{{model.createDate}}</td>
			    </tr>  
			    <tr>
			      <td>更新者</td>
			      <td>{{model.updateBy}}</td>
			    </tr>  
			    <tr>
			      <td>更新时间</td>
			      <td>{{model.updateDate}}</td>
			    </tr>  
			    <tr>
			      <td>备注</td>
			      <td>{{model.remarks}}</td>
			    </tr> 
			</table>

	    </div>
	</div>

	  <div class="panel panel-info">
	    <div class="panel-heading">
	        <h3 class="panel-title">
	            文章内容
	        </h3>
	    </div>
	    <div class="panel-body">
	        <div id="contents" style="word-break: break-all"></div>
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
      	getItem:"/genuine/exposureBar/getContenById"

      },
      model:{}
      

    }
  },
   mounted(){
	start.getToken();
	
  },
  created(){
  	this.fetchData()
  		
  },
  methods:{
  	fetchData(){
  		console.log(this.$route);
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
            		
            		var imgs=self.model.img.split(",");
            		self.model.img=imgs;           		
            		$("#contents").html(self.model.contents)

                
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
