(function($) {
  jQuery.fn.lightTabs = function(options) {

      var createTabs = function() {
          tabs = this;
          i = 0;

          showPage = function(tabs, i) {
              $(tabs).children("div").children("div").hide();
              $(tabs).children("div").children("div").eq(i).show();
              $(tabs).children("ul").children("li").removeClass("active");
              $(tabs).children("ul").children("li").eq(i).addClass("active");
          }

          showPage(tabs, 0);

          $(tabs).children("ul").children("li").each(function(index, element) {
              $(element).attr("data-page", i);
              i++;
          });

          $(tabs).children("ul").children("li").click(function() {
              showPage($(this).parent().parent(), parseInt($(this).attr("data-page")));
          });
      };
      return this.each(createTabs);
  };
})(jQuery);

function hideProjects(wrapper) {
  $showBtn = true;
  $(wrapper).find('.project__item__box').each(function(itemIndex, item) {
      if (itemIndex > 2) {
          $(item).hide();
          $showBtn = true;
      } else {
          $(item).show();
          $showBtn = false;
      }
    //   if (itemIndex >= 2) {
    //       $showBtn = true;
    //   }
  });
  return $showBtn;
}

// #####################################################
// ready

$(document).ready(function() {

  $('.tabs').each(function() {
      $(this).lightTabs();
  });

  $(".project__categories-item").each(function(wrapperIndex, wrapper) {
      hideProjects(wrapper);
      if ($showBtn == false) {
          $(wrapper).find('.btn-show_more').hide();
      } else {
          $(wrapper).find('.btn-show_more').show();
      }
  });

  // show more projects
  $('.btn-show_more').on("click", function() {
      var that = $(this);

      $(".project__categories-item").each(function(wrapperIndex, wrapper) {
          $(wrapper).find('.project__item__box').show();
      });

      $(this).hide();
  });


  // lazy scroll to section
  $('a[href*="#"]').click(function() {
      var target = $(this.hash);
      if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top
          }, 1000);
          $(".mobileMenu-overlay").removeClass("open");
          return false;
      }
  });

  // burger
  $(".open-menu-js").on("click", function() {
      $(".mobileMenu-overlay").addClass("open");
  });

  // burger close

  $(".mobileMenu__close").on("click", function() {
      $(".mobileMenu-overlay").removeClass("open");
  });

});

$(window).on("load resize", function() {
  if ($(window).width() <= 1200) {
      $('.reviews__slider').not('.slick-initialized').slick({
          dots: false,
          arrows: false,
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          speed: 300,
          prevArrow: $(".banner-prev"),
          nextArrow: $(".banner-next"),
          responsive: [{
                  breakpoint: 1920,
                  settings: "unslick",
              },
              {
                  breakpoint: 1199.98,
                  settings: {
                      slidesToShow: 3,
                      dots: true,
                      arrows: true,
                  }
              },
              {
                  breakpoint: 990.98,
                  settings: {
                      slidesToShow: 2,
                      dots: true,
                      arrows: true,
                  }
              },
              {
                  breakpoint: 767.98,
                  settings: {
                      slidesToShow: 1,
                      dots: true,
                      arrows: true,
                  }
              },
              {
                  breakpoint: 359.98,
                  settings: {
                      slidesToShow: 1,
                      dots: true,
                      arrows: false,
                  }
              },
          ]
      });
  }
});