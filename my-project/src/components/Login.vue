<template>
<div class="login">
 <nav class="navbar navbar-default" role="navigation">
	    <div class="container-fluid">
	    <div class="navbar-header">
	        <a class="navbar-brand" href="#">正品溯源运营平台</a>
	    </div>
	    </div>
	</nav>
	
	<div class="loginBox">
	<h1>正品溯源运营平台</h1>
		<form class="form-horizontal" role="form" style="padding: 30px 15px;">
		  <div class="form-group">
		    <div class="col-sm-12">
		      <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="loginData.username">
		    </div>
		  </div>
		  <div class="form-group">

		    <div class="col-sm-12">
		      <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="loginData.password">
		      
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-12">
		      <a href="javascript:;" class="btn btn-primary" @click="submitForm" style="display: block;">登录</a> 
		    </div>
		  </div>
		</form>	
	</div>

</div>
</template>

<script>
export default {
  data () {
    return {
      api:{
      	login:"/genuine/server_loginUser/sysLogin"

      },
      loginData:{
      	username:'',
      	password:''
      },
      error:"",
    }
  },
  methods:{
  	submitForm:function(){
  		var self=this;
  		if(self.loginData.username==""||self.loginData.password==""){
  			zdalert('提示',"用户名或密码不能为空！",function(){});   
 
  		}else{
  			self.error="";
  			this.axios.post(self.api.login, {loginName:self.loginData.username,password:self.loginData.password})
                    .then(response => {
                    	if(response.data.errorCode=="0"){
                    		self.$store.commit("login", self.loginData.username)
                    		var path = self.$route.query;
				  			self.$router.push({
				            	path: path.redirect
				          	})
                        
                    	}else{
                    		zdalert('提示',response.data.reason,function(){});   
                    	}                        
       		})
  		}
  	}
  }
}
</script>

<style lang="scss">
.error{color: red;font-size: 12px;text-align:center}
.loginBox{height: 280px;width: 300px;position: absolute;left: 50%;top: 50%;margin: -140px 0 0 -150px;overflow: hidden}
.loginBox form{
	background: #eee;border: 1px solid #ddd;border-radius: 5px;overflow: hidden
}
.loginBox h1{text-align: center;font-size: 25px;}
.loginBox form{padding: 15px;}

</style>
