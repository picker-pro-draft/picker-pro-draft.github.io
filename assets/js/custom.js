$(document).ready(function(){
  $('#picking-subject').tagsinput({
    tagClass: 'get-started-btn suggested-category'
  });


  $('.suggested-category').click(function(){
    $('#picking-subject').tagsinput('removeAll');
    $('#picking-subject').tagsinput('add', $(this).text());
  });
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}