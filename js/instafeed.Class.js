var feed = new Instafeed({
        get: 'tagged',
        clientId: '5b96ba9e2a63409aa9be63f89ed9bb26',
        id : 'instafeed',
        mock: true,
        success: function(data){
            var toConsole = data;console.log(toConsole);
            $("#"+this.options.id).html("");
            for (var i = 0; i < this.options.limit; i++) {

                var captionText = "";
                try{
                    captionText = data.data[i].caption.text;
                }
                catch(e){
                    var tags = 5;
                    if(data.data[i].tags.length < 5){
                        tages = data.data[i].tags.length;
                    }
                    for (var i = 0; i < tags; i++) {
                        captionText += "#"+data.data[i].tags[i] + " ";
                    }
               }

               var searchPlay = "";
               switch(data.data[i].type){
                case "image":
                    searchPlay = "fa-search";
                break;
                case "video":
                    searchPlay = "fa-play";
                break;
               }

                $("#"+this.options.id).prepend("\
                    <div class=\"col-xs-12 col-sm-4 col-md-3 hiddenThumb\">\
                        <div class=\"thumbnail\">\
                            <div class=\"links\">\
                                <a href=\"http://vkontakte.ru/share.php?url="+encodeURIComponent("http://ulgorod.ru/#!/p/"+data.data[i].id+"/&image="+data.data[i].images.thumbnail.url)+"\" target=\"_blank\"><i class=\"fa fa-retweet fa-fw\" title=\"Репостнуть\"></i></a>\
                                <a href=\"#!/p/"+data.data[i].id+"/\"><i class=\"fa "+searchPlay+" fa-fw\" title=\"Увеличить размер\"></i></a>\
                            </div>\
                            <div class=\"overlay\">\
                                <img src=\""+data.data[i].images.standard_resolution.url+"\"  class=\"img-responsive main\" alt=\""+captionText+"\"/>\
                            </div>\
                            <div class=\"media\">\
                                <a class=\"pull-left\" href=\"http://instagram.com/"+data.data[i].user.username+"/#\" title=\""+data.data[i].user.full_name+"\" target=\"_blank\">\
                                    <img class=\"media-object\" src=\""+data.data[i].user.profile_picture+"\" alt=\""+data.data[i].user.full_name+"\">\
                                </a>\
                                <div class=\"media-body\">\
                                    <h4 class=\"media-heading\" title=\""+captionText+"\">"+captionText+"</h4>\
                                    <a href=\""+data.data[i].link+"\" title=\"Посмотреть в instagram`е\" target=\"_blank\">"+data.data[i].link+"</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                ");
                $(".hiddenThumb").first().fadeIn('slow');
            };
        }
});
//getSingleMedia
Instafeed.prototype.getSingleMedia = function(id){
  $.ajax({
    dataType: "jsonp",
    url: "https://api.instagram.com/v1/media/"+id+"?client_id="+feed.options.clientId
  })
  .done(function( data ) {
    var toConsole = data;console.log(toConsole);
    var captionText = "";
        try{
            captionText = data.data.caption.text;
        }
        catch(e){
            var tags = 5;
            if(data.data.tags.length < 5){
                tages = data.data.tags.length;
            }
            for (var i = 0; i < tags; i++) {
                captionText += "#"+data.data.tags[i] + " ";
            }
        }
    var photoVideo = "";
    switch(data.data.type){
        case "image":
            photoVideo = "<img src=\""+data.data.images.standard_resolution.url+"\"  class=\"img-responsive thumbnail\" alt=\""+captionText+"\"/>";
        break;
        case "video":
            photoVideo = "<video poster=\""+data.data.images.standard_resolution.url+"\" src=\""+data.data.videos.standard_resolution.url+"\" class=\"img-responsive center-block thumbnail\" autoplay=\"autoplay\" type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"'  controls=\"controls\" loop=\"loop\"></video>";
        break;
    }
    $("#"+feed.options.id).html("\
        <ol class=\"breadcrumb\">\
            <li><a href=\"#!/\">Главная</a></li>\
            <li class=\"active\">"+data.data.user.full_name+"</li>\
        </ol>\
        <div class=\"col-xs-12 hiddenThumb\">\
           <div class=\"thumbnail single\">\
            <!--if it's photo-->\
                "+photoVideo+"\
               <div class=\"media\">\
                   <a class=\"pull-left\" href=\"http://instagram.com/"+data.data.user.username+"/#\" title=\""+data.data.user.full_name+"\" target=\"_blank\">\
                       <img class=\"media-object\" src=\""+data.data.user.profile_picture+"\" alt=\""+data.data.user.full_name+"\">\
                    </a>\
                    <div class=\"media-body\">\
                       <h4 class=\"media-heading\" title=\""+captionText+"\">"+captionText+"</h4>\
                        <a href=\""+data.data.link+"\" title=\"Посмотреть в instagram`е\" target=\"_blank\">"+data.data.link+"</a>\
                     </div>\
                </div>\
            </div>\
        </div>\
   ");
    $(".hiddenThumb").fadeIn('slow');
  });
};