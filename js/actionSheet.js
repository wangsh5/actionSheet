/**
 * Created by dayee on 2017/2/23.
 */
;(function(window,document,$,undefined){
    $.extend({
        //使用示例
        /*$.myActionSheet({
             title:'测试',
             //speed:300,
             //y:0,
             btns:[
                 {
                     name:'btns1',
                     click:function(){
                        alert('btn1')
                     }
                 },
                 {
                     name:'btns2',
                     click:function(){
                        alert('btn2')
                     }
                 }
             ]
         });*/
        myActionSheet:function(option){
            var defaultSet={
                version:'0.0.1',
                speed:'300',
                y:'0'
            };
            var options=$.extend({},defaultSet,option);
            //基本架构
            var html='<div class="slide-wrap"><div class="slide-bg"></div><div class="slide-content">';
            if(options.title){
                html+='<div class="slide-header"><h3>'+options.title+'</h3>';
                /*if(options.subTitle){
                    html+='<p>'+options.subTitle+'</p>'
                }*/
                html+='</div>'
            }
            html+='<ul class="slide-btns">';
            for(var i=0;i<options.btns.length;i++){
                html+='<li>'+(options.btns[i].name?options.btns[i].name:'')+'</li>';
            }
            html+='</ul>';
            html+='<p class="slide-cancel">取消</p></div></div>'
            $('body').append(html);
            //绑定事件
            $('.slide-btns li').each(function(i){
                $(this).on('click',function(){
                    options.btns[i].click&&options.btns[i].click();
                    _cancel();
                })
            });
            $('.slide-bg').on('click',_cancel);
            $('.slide-cancel').on('click',_cancel);
            //动画
            var slideHeight=$('.slide-content').height();
            $('.slide-content').css('bottom',-slideHeight+'px');
            $('.slide-bg').animate({opacity:0.3},options.speed);
            $('.slide-content').animate({bottom:options.y},options.speed);
            //取消
            function _cancel(){
                $('.slide-bg').animate({opacity:0},options.speed);
                $('.slide-content').animate({bottom:-slideHeight+'px'},options.speed,function(){
                    $('.slide-btns li').off();
                    $('.slide-bg').off();
                    $('.slide-cancel').off();
                    $('.slide-wrap').remove();
                })
            }
        }
    })
})(window,document,jQuery);