
$(document).ready(function () {
  /*
   * This stuff is carried over from the Uno framework that I built this site on top of
   */
  $('a.blog-button').click(function (e) {
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return
    currentWidth = $('.panel-cover').width()

    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
      $('.content-wrapper').addClass('animated slideInRight')
    } else {
      $('.panel-cover').css('max-width', currentWidth)
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
    }
  })
  $('.panel-cover').addClass('panel-cover--collapsed')

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })


  /*
   * This section was added to implement moving pages (TODO)
   */
  var cur_page = $('#demo-page');
  var cur_btn = $('#demo');

  var addSwitchClick = function(btn, page) {
    btn.click(function() {
      if (!btn.hasClass('vis-pg')) {
        cur_page.hide();
        page.show();

        cur_btn.removeClass('vis-pg');
        btn.addClass('vis-pg');

        cur_page = page;
        cur_btn = btn;
      }
    })
  }

  var demo = $('#demo');
  demo.addClass('vis-pg');
  addSwitchClick(demo, $('#demo-page'));

  var feat_page = $('#feat-page');
  feat_page.hide();
  addSwitchClick($('#feat'), feat_page);

  var tutr_page = $('#tutr-page');
  tutr_page.hide();
  addSwitchClick($('#tutr'), tutr_page);

})
