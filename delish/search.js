let form = document.querySelecter('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  return false;
});

browserWindow.on('load', function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
});

var searchwrapper = $('.search-wrapper');
$('.search-btn').on('click', function () {
    searchwrapper.toggleClass('on');
});
$('.close-btn').on('click', function () {
    searchwrapper.removeClass('on');
});