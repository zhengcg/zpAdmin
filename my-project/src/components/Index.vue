<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	    <div class="container-fluid">
	    <div class="navbar-header">
	        <a class="navbar-brand" href="javascript:;" style="color: #fff">正品溯源运营平台</a>
	    </div>
	    <div>
	        
	        <div class="dropdown pull-right navbar-text">
	                <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="color: #fff;text-decoration: none;">
	                    {{token}}
	                    <b class="caret"></b>
	                </a>
	                <ul class="dropdown-menu">
	                    <li><a href="javascript:;" @click="logout">退出</a></li>
	                </ul>
	         </div>
	    </div>
	    </div>
	</nav>
  <div style="height:60px"></div>

	
	<div class="mainBox">
		<div class="row">
            <div class="col-md-2" style="margin-bottom: 20px;">
            	<router-link :to="{name:'preferred'}" class="list-group-item" activeClass="active" @click.native="flushCom">正品优选</router-link>
            	<router-link :to="{name:'exposure'}" class="list-group-item" activeClass="active" @click.native="flushCom">新闻</router-link>
            	<router-link :to="{name:'banner'}" class="list-group-item" activeClass="active" @click.native="flushCom">Banner</router-link>
              <router-link :to="{name:'comment'}" class="list-group-item" activeClass="active" @click.native="flushCom">用户评论</router-link>
              <router-link :to="{name:'feedback'}" class="list-group-item" activeClass="active" @click.native="flushCom">用户反馈</router-link>
              <router-link :to="{name:'report'}" class="list-group-item" activeClass="active" @click.native="flushCom">用户举报</router-link>
            </div>
            <div class="col-md-10">
                <router-view></router-view>
            </div>
        </div>		
	</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  
  computed: mapState({
            token: state => state.token

        }),
  mounted(){
  	
  },
  methods: {
    flushCom:function(){
　　　　　　this.$router.go(0);  
　　　　},
      logout(){
        var self=this;

          zdconfirm('系统确认框','你确认要退出吗',function(r){  
           if(r)  
            {  
               self.$store.commit("logout")
                self.$router.push({
                  path: '/login',
                  query: {redirect: self.$router.currentRoute.fullPath}  
                }) 
            }  
          });       
        

        
      }
  }
}
</script>

<style lang="scss">
#app{width: 100%;height: 100%;}
.router-link-active{background: #eee!important;}
.mainBox{padding: 15px;}
.uploadBox{padding: 20px;border: 1px solid #eee;}
.uploadBox .thumbnail{position: relative;}
.uploadBox .thumbnail img{height: 80px;}
.uploadBox .thumbnail i{position: absolute;display: block;width: 20px;height: 20px;right: -10px;top: -10px;font-size: 20px;}
table{font-size: 12px;}
.btn{font-size: 12px;}
.panel{font-size: 12px;}
form{font-size: 12px!important;}
input,textarea,select{font-size: 12px!important;}
th{font-weight: normal;text-align: center;white-space: nowrap;}
.table-bordered>thead>tr>td, .table-bordered>thead>tr>th{border-bottom-width: 1px;}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{vertical-align: middle;word-break: break-all}
.table>thead>tr>th{color: #333;font-weight: bolder;}
.pagination a {
    text-decoration: none;
	border: 1px solid #AAE;
	color: #15B;
}
td img{width: 50px;}
td{vertical-align: middle;color: #666;}
.pagination a, .pagination span {
    display: inline-block;
    padding: 0.1em 0.4em;
    margin-right: 5px;
	margin-bottom: 5px;
}

.pagination .current {
    background: #26B;
    color: #fff;
	border: 1px solid #AAE;
}
.pagination .current.prev, .pagination .current.next{
	color:#999;
	border-color:#999;
	background:#fff;
}
#Pagination{float: right;margin: 0}
.breadcrumb{background: none;font-weight:bold;border:1px solid #bce8f1; margin-bottom: 10px;}
// .list-group-item{background: #d9edf7;border: 1px solid #bce8f1}
.table-bordered{border: 1px solid #bce8f1}
.table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th{
  border: 1px solid #bce8f1
}
.navbar-inverse{background: #337ab7;border-color: #2e6da4;}
// .table-striped>tbody>tr:nth-of-type(odd){background: #efefef;}
</style>
