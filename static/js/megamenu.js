$(document).on('click', '.megamenu', function (e) {
  e.stopPropagation();
});
/*
$('.dropdown-item').click(function() {
    $('a.dropdown-item').removeClass('active'); // remove from all other <SPAN>s
    $(this).addClass('active'); // add onto current
});
*/
$('.dropdown-item').hover(function() {
    $('a.dropdown-item').removeClass('active'); 
    $('div.megamenu-item-tab').removeClass('active'); 
    $(this).addClass('active');
    var elem = document.getElementById('item-'.concat($(this)[0].id));
    $(elem).addClass('active');
});
