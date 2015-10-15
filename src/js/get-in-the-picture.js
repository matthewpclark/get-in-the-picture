

//jcarousel configuration
(function($) {
    $(function() {
        $('.homepage-carousel').jcarousel({
          lists: '/jcarousel-list',
          items: '.jcarousel-item',
          wrap: "circular",
        });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    });
})(jQuery);
