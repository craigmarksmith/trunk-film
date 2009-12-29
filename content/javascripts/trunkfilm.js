TrunkFilm = {
  init: function(){
    $('#contact-details').hide();
    $('#contact a').click(function(){
      $('#contact-details').toggle();
      return false;
    });
  }
},

TrunkFilm.Movies = {
  current_position: 0,
  height: 0,
  width: 0,

  init: function(height, width){
    TrunkFilm.Movies.height = height;
    TrunkFilm.Movies.width = width;
    $('#scroll-left').click(TrunkFilm.Movies.scrollLeft);
    $('#scroll-right').click(TrunkFilm.Movies.scrollRight);
    $('.arrow').hide();
    $().mousemove(function(e){
      if(TrunkFilm.Movies.mouseIsOverVideo(e.pageX, e.pageY)){
        $('.arrow').show();
      }else{
        $('.arrow').hide();
      }
    });
    TrunkFilm.Movies.addSwobjects();
  },

  mouseIsOverVideo: function(x, y){
    var cw = $('#content-window');
    var cw_left = cw.get(0).offsetLeft;
    var cw_top = cw.get(0).offsetTop;
    if((y > cw_top) && (y < (cw_top + cw.height())) && (x > cw_left) && (x < (cw_left + cw.width()))){
      return true;
    }
    return false;
  },

  scrollLeft: function(){
    if(TrunkFilm.Movies.current_position > 0){
      TrunkFilm.Movies.scroll('+='+TrunkFilm.Movies.amount_to_move()+'px');
      $('.movie object')[TrunkFilm.Movies.current_position].api_pause();
      TrunkFilm.Movies.current_position--;
    }
    return false;
  },

  scrollRight: function(){
    if(TrunkFilm.Movies.current_position < ($('.movie').size()-1)){
      TrunkFilm.Movies.scroll('-='+TrunkFilm.Movies.amount_to_move()+'px');
      $('.movie object')[TrunkFilm.Movies.current_position].api_pause();
      TrunkFilm.Movies.current_position++;
    }
    return false;
  },

  scroll: function(scroll_amount){
    $('#movies').animate({
      marginLeft: scroll_amount
    }, 1000);
  },

  amount_to_move: function(){
    return $($('.movie')[TrunkFilm.Movies.current_position]).width();
  },

  addSwobjects: function(){
    var count = 0;
    $('.movie object').each(function(){

      var flashvars = {
        clip_id: this.id.replace(/movie_/,''),
        show_portrait: 1,
        show_byline: 1,
        show_title: 1,
        js_api: 1
      };
      var params = {
        allowscriptaccess: 'always',
        allowfullscreen: 'true',
        wmode: "transparent"
      };
      var attributes = {};
      swfobject.embedSWF("http://vimeo.com/moogaloop.swf", this.id, TrunkFilm.Movies.width, TrunkFilm.Movies.height, "9.0.0","expressInstall.swf", flashvars, params, attributes);
    });
  }

},

TrunkFilm.AboutUs = {

  current_position: 0,
  amount_to_move: 655,

  init: function(){
    $('#scroll-left').hide();
    $('#scroll-right').click(TrunkFilm.AboutUs.scrollRight);
    $('#scroll-left').click(TrunkFilm.AboutUs.scrollLeft);
  },

  scrollLeft: function(){
    TrunkFilm.AboutUs.current_position--;
    TrunkFilm.AboutUs.scroll('+');
    return false;
  },

  scrollRight: function(){
    TrunkFilm.AboutUs.current_position++;
    TrunkFilm.AboutUs.scroll('-');
    return false;
  },

  scroll: function(direction){
    $('div#about-us img').animate({
      marginLeft: direction+'='+TrunkFilm.AboutUs.amount_to_move+'px'
    }, 1000);

    $('#texts').animate({
      marginLeft: direction+'='+TrunkFilm.AboutUs.amount_to_move+'px'
    }, 1000);

    if(TrunkFilm.AboutUs.current_position == 0){
      $('#scroll-left').hide();
    } else if($('.text').size()-1 == TrunkFilm.AboutUs.current_position){
      $('#scroll-right').hide();
    } else {
      $('#scroll-left').show();
      $('#scroll-right').show();
    }
  }
}

$(document).ready(function(){
  TrunkFilm.init();
});
