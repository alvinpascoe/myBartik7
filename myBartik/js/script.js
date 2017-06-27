(function ($) {
  // Carousel initialisation
  Drupal.behaviors.carousel = {
    attach: function (context, settings){

      // Selectors
      var carousel = '.main-carousel';
      var previousLink = '.js-carousel-pager .prev a';
      var nextLink = '.js-carousel-pager .next a';

      var mainContentWrapper = '.main-carousel-wrapper';
      // 'mainContent' selects the content that needs to be updated.
      // This is the element directly below the '.slick-current' element.
      var mainContent = '.slick-current > .slide-content';

      // Initialise carousel
      $(carousel, context).once().slick({
        prevArrow: previousLink,
        nextArrow: nextLink,
        infinite: true
      });

      // Before slide transition
      $(carousel, context).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        // Show Loader
        //$(loader).fadeIn();
        //$('.ajax-loader-notice').fadeIn();
        $(mainContentWrapper).addClass('js-carousel-loading');
        $(mainContentWrapper).removeClass('js-carousel-loaded');
      });

      // After slide transition
      $(carousel, context).on('afterChange', function(event, slick, currentSlide){
        // Remove old slide
        $(carousel).slick('slickRemove', currentSlide, true);
        $(mainContentWrapper).removeClass('js-carousel-loading');
        $(mainContentWrapper).addClass('js-carousel-loaded');
      });

      // Initialise next/prev event handlers
      initPreviousSlide(previousLink, carousel);
      initNextSlide(nextLink, carousel);

      function initPreviousSlide(trigger, carousel){
        $(trigger).once().on('click', function(){
          $(carousel).slick('slickAdd', _initSlideContent(mainContent));
          $(carousel).slick('slickPrev');
        });
      }

      function initNextSlide(trigger, carousel){
        $(trigger).once().on('click', function(){
          $(carousel).slick('slickAdd', _initSlideContent(mainContent));
          $(carousel).slick('slickNext');
        });
      }

      function _initSlideContent(selector){
        var content = $(selector)[0].outerHTML;
        var output = '<div class="slide">' + content +'</div>';
        return output;
      }

    }
  };
})(jQuery);
