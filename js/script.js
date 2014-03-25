var Program = function(clean_hash){

    var type = ["!/p/"];

    switch(clean_hash){
        case type[0]:
            console.log("Opening the media");
            feed.getSingleMedia(Hash.getId(window.location.hash.split('/')));
        break;
        default:
            feed.options.limit = 10;
            feed.options.id = "instafeed";
            feed.options.tagName = "ulsk";
            feed.options.sortBy = "random";
            feed.run();
            console.log("Opening a list");
        break;
    }
}

//MAIN
$(document).ready(function() {

    //START POINT
    var localHash = new Hash(window.location.hash);
    Program(localHash.mediaType);

    //HASH CHANGE
    $(window).bind('hashchange', function() {
        var localHash = new Hash(window.location.hash);
        Program(localHash.mediaType);
    });
});