var start={
    init:function(){
        var self=this;
        self.qinniuToken="";
        self.directory="";
        self.eventFn();
        // self.getToken();
    },
    eventFn:function(){
        var self=this;
        $(document).on('click','.uploadBox i',function(e){
            e.stopPropagation()
            var index=$(this).parents(".uploadBox").attr("id");
            $(this).parents(".col-sm-2").remove();
            console.log(index)
            $("#"+index+" .selectBtn").show()
            self.inputVal(index)
        })
    },
    getToken:function(){
        var self=this;
        var params = {};
        params.bucket = "zpsy";
        $.ajax({
            url:"/genuine/user/getUploadToken",
            type: "post",
            dataType:"json",
            async: false,
            headers:{source:'H5'},
            contentType: "application/json",
            data:JSON.stringify(params),
            success:function(res){
                var data=res;
                if(data.errorCode=="0"){
                    self.qinniuToken = data.result;
                    self.directory=data.result.directory;
                    self.initUpload()
                    
                }else{
                    alert(data.reason)
                }
            },
            error: function() {
                alert(" bad request!");
            }
        });
    },
    previewImage:function (file,callback){
        //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
        if(!file || !/image\//.test(file.type)) return; //确保文件是图片
        if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
            var fr = new mOxie.FileReader();
            fr.onload = function(){
                callback(fr.result);
                fr.destroy();
                fr = null;
            }
            fr.readAsDataURL(file.getSource());
        }else{
            var preloader = new mOxie.Image();
            preloader.onload = function() {
                preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
                var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                callback && callback(imgsrc); //callback传入的参数为预览图片的url
                preloader.destroy();
                preloader = null;
            };
            preloader.load( file.getSource() );
        }
    },
    initUpload:function(){
        var self = this;    
        for(var s=0;s<$(".uploadBox").length;s++){
            (function(s){
                var image=""
                $($(".uploadBox")[s]).attr("id","uploadBox"+s);
                $($(".uploadBox")[s]).find(".selectBtn").attr("id","selectBtn"+s);
                new QiniuJsSDK().uploader({
                    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                    browse_button: 'selectBtn'+s,         // 上传选择的点选按钮，必需
                    uptoken:self.qinniuToken.token,
                    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                    unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                    save_key: false,// 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                    //multi_selection: false,
                    domain: self.qinniuToken.domain,     // bucket域名，下载资源时用到，必需
                    container: 'uploadBox'+s,             // 上传区域DOM ID，默认是browser_button的父元素
                    max_file_size: '100mb',             // 最大文件体积限制
                    flash_swf_url: 'Moxie.swf',  //引入flash，相对路径
                    max_retries: 3,                     // 上传失败最大重试次数
                    dragdrop: false,                     // 开启可拖曳上传
                    drop_element: 'uploadBox'+s,          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                  // 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        'FilesAdded': function(up, files) {
                            var msgFlg = 0;
                            for (var i = 0, len = files.length; i < 3; i++) {
                                !function (i) {
                                    self.previewImage(files[i], function (imgsrc) {
                                        if( $('#uploadBox'+s).hasClass("danUpload")){
                                            $('#uploadBox'+s+' .row').html('<div class="col-sm-2"><a href="javascript:;" class="thumbnail"><img src="'+ imgsrc +'"><i class="glyphicon glyphicon-remove-circle" data-value="'+ files[i].id +'"></i></a></div>');
                                        }else{
                                            $('#uploadBox'+s+' .row').append('<div class="col-sm-2"><a href="javascript:;" class="thumbnail"><img src="'+ imgsrc +'"><i class="glyphicon glyphicon-remove-circle" data-value="'+ files[i].id +'"></i></a></div>');
                                        }
                                    })
                                }(i);
                            }
                        },

                        'BeforeUpload': function(up, file) {

                            // 每个文件上传前，处理相关的事情
                        },
                        'UploadProgress': function(up, file) {
                            // 每个文件上传时，处理相关的事情
                        },
                        'FileUploaded': function(up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info);
                            //获取上传成功后的文件的Url
                            if(image){
                                image = image+','+ domain +"/"+ res.key;
                            }else{
                                image =  domain +"/"+ res.key;
                            }
                        },
                        'Error': function(up, err, errTip) {
                            //上传出错时，处理相关的事情
                            alert("上传失败")
                        },
                        'UploadComplete': function() {
                            //队列文件处理完毕后，处理相关的事情
                            self.setVal(s,image)
                        },
                        'Key': function(up, file) {
                            var key = Date.parse(new Date())+Math.ceil(Math.random()*1000);
                            var nKey=self.directory+key
                            return nKey
                        }
                    }
                });
            })(s)


        }
    },
    setVal:function(s,image){
        var self=this;
        var attr=image.split(",")
        console.log(image);
        if( $('#uploadBox'+s).hasClass("danUpload")){
            $('#uploadBox'+s+' .row .col-sm-2').attr("data-src",attr[attr.length-1])
        }else{
            var l=$('#uploadBox'+s+' .row .col-sm-2').length;
            var z=attr.length;

            for(var i=0;i<attr.length;i++){


                $($('#uploadBox'+s+' .row .col-sm-2')[l-z+i]).attr("data-src",attr[i])
            }
        }
        self.inputVal('uploadBox'+s)

    },
    inputVal:function(s){
        var self=this;
        var array=[];

            $('#'+s+' .row .col-sm-2').each(function(){
            array.push($(this).attr("data-src"))
        });
        if(array.length>=3){
            $("#"+s+" .selectBtn").hide()
        }
        $("#"+s+" input[type=hidden].imgInput").val(array.toString())

    }
}
$(function(){
    start.init()
    $(document).on("click",".uploadBox .col-sm-2",function () {
        var src=$(this).attr("data-src");
        window.open(src);
    })
})


