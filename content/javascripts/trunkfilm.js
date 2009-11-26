TrunkFilm = {}
TrunkFilm.Movies = {
  amount_to_move: 900,

  init: function(){
    current_position = 0;
    $('#scroll-left').click(TrunkFilm.Movies.scrollLeft);
    $('#scroll-right').click(TrunkFilm.Movies.scrollRight);
    $('#contact-details').hide();
    $('#contact a').mouseover(function(){
      $('#contact-details').show();
      return false;
    });
    $('#contact a').mouseout(function(){
      $('#contact-details').hide();
      return false;
    });
  },

  scrollLeft: function(){
    if(current_position > 0){
      TrunkFilm.Movies.scroll('+='+TrunkFilm.Movies.amount_to_move+'px');
      current_position -= 1;
    }
    return false;
  },

  scrollRight: function(){
    if(current_position < ($('.movie').size()-1)){
      TrunkFilm.Movies.scroll('-='+TrunkFilm.Movies.amount_to_move+'px');
      current_position += 1;
    }
    return false;
  },

  scroll: function(scroll_amount){
    $('#movies').animate({
      marginLeft: scroll_amount
    }, 1000);
  }

}

$(document).ready(TrunkFilm.Movies.init);
