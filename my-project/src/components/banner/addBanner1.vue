<template>
  <div>
  <ol class="breadcrumb">
	    <li><router-link :to="{name:'banner'}">Banner</router-link></li>
	    <li class="active">添加</li>
	</ol>
	<div>

      <div class="panel panel-default">
        <div class="panel-body">
          <form class="form-inline" role="form">
            <div class="form-group">
              <select class="form-control" v-model="params.type">
                <option value="1">曝光栏</option>
                <option value="2">正品优选</option>
                <option value="3">其他</option>
              </select>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="name" placeholder="请输入搜索关键字" style="width: 300px;" v-model="params.key">
            </div>
            <a href="javascript:;" class="btn btn-primary" @click="getList1(1,10)">搜索</a>
          </form>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">       
            <h3 class="panel-title">
                列表
            </h3>
        </div>
        <div class="panel-body">

            <div class="table-responsive" v-if="list.length>0">
          <table class="table table-condensed table-bordered table-striped">
            <thead>
              <tr>
                <th>正文标题</th>
                <th>缩写标题</th>
                <th>危害等级</th>
                <th>文章来源地名称</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>操作</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in list">
                <td>{{item.title}}</td>
                <td>{{item.shortTitle}}</td>
                <td style="text-align: center;">{{item.hazardClass}}</td>
                <td>{{item.source}}</td>
                <td style="white-space: nowrap">{{item.createDateStr}}</td>
                <td style="white-space: nowrap">{{item.updateDateStr}}</td>
                <td style="text-align:center"><a href="javascript:;" class="btn btn-primary" @click="addBanner(item.type,item.id)">添加</a></td>                
              </tr>
              
            </tbody>
          </table>
        </div>
        <div style="text-align: center" v-else>暂无数据</div>
        <div id="Pagination" class="pagination"></div>
      </div>
    </div>

  		
	</div>
<!-- 添加 -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">添加banner</h4>
                </div>
                <div class="modal-body">

                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label for="statusCode" class="col-sm-4 control-label"><span style="color: red">*</span>是否设置过期时间</label>
                        <div class="col-sm-8">
                         <select class="form-control" id="statusCode" name="statusCode" v-model="model.statusCode" @change="isShowDate">
                            <option value="0">否</option>
                            <option value="1">是</option>                   
                         </select>
                        </div>
                      </div>
                      <div class="form-group" v-show="isDate">
                        <label for="expiration_date" class="col-sm-4 control-label"><span style="color: red">*</span>过期时间</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="expirationDate" name="expirationDate" onClick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                        </div>
                      </div>
                 
                </form>
                  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="submitData">添加</button>
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
        getList:"/genuine/banner/search",
        addItem:"/genuine/banner/addBanner"
      },
      list:[],
      params:{
        type:1,
        key:""
      },
      model:{
        type:"",
        resourcesId:"",
        statusCode:0,
        expirationDate:"",
      },
      count:0,
      isInitPage:false,
      isDate:false
    }
  },
  mounted(){
    
  },
  created(){
    // this.getList(1,10);   
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
        　　params: {pageNo:pageNo,pageSize:pageSize,type:self.params.type,key:self.params.key}
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
        　　zdalert('提示',error,function(){});   
        });

      
    },
     getList1:function(pageNo,pageSize){
      var self=this;
            this.axios.get(self.api.getList, {
        　　params: {pageNo:pageNo,pageSize:pageSize,type:self.params.type,key:self.params.key}
        }).then(function (response) {
        　　if(response.data.errorCode=="0"){
                    self.list = response.data.result.list;
                    self.count=Math.ceil(response.data.result.count/10);
                    
                      self.initPage();                                                                           
                  }else{
                    zdalert('提示',response.data.reason,function(){});   
                  }            
        }).catch(function (error) {
        　　zdalert('提示',error,function(){});   
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
    addBanner:function(type,resourcesId){
      var self=this;     
      self.model.type=type;
      self.model.resourcesId=resourcesId;
        $('#myModal').modal({
        keyboard: true
      })
    },
    submitData:function(){ 
    var self=this;    
      var flag=false;
      if(self.model.statusCode==0){
        self.model.expirationDate=""
            flag=true
          }else{
            self.model.expirationDate=$("#expirationDate").val();
            if(self.model.expirationDate==""){
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
                 self.axios.post(self.api.addItem, self.model)
                    .then(response => {
                      if(response.data.errorCode=="0"){
                        zdalert('提示',response.data.reason,function(){
                          $('#myModal').modal('hide')
                          self.$router.push({name:'banner'})
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
    }

  }
  
}
</script>

<style lang="scss">
.addBtn{color: #337ab7!important}
.addBtn i{margin-right: 5px;}
</style>