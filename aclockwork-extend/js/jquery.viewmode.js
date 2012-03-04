(function($) {
    $(function() {

        /*** View mode ***/

        if ( $.cookie('mode') == 'list_mosaic one_third_list' ) {
            grid_update();
        } else if ( $.cookie('mode') == 'list_full' ) {
            list_update();
        }

        $('#mode').toggle(
            function(){
                if ( $.cookie('mode') == 'list_mosaic one_third_list' ) {
                    $.cookie('mode','list_full');
                    list();
                } else {
                    $.cookie('mode','list_mosaic one_third_list');
                    grid();
                }
            },
            function(){
                if ( $.cookie('mode') == 'list_full') {
                    $.cookie('mode','list_mosaic one_third_list');
                    grid();
                } else {
                    $.cookie('mode','list_full');
                    list();
                }
            }
        );

        function grid(){
            $('#mode').addClass('flip');
            $('#js-list-view')
                .fadeOut('fast', function(){
                    grid_update();
                    $(this).fadeIn('fast');
                })
            ;
            return false;
        }

        function list(){
            $('#mode').removeClass('flip');

            $('#js-list-view')
                .fadeOut('fast', function(){
                    list_update();
                    $(this).fadeIn('fast');
                })
            ;
            return false;
        }

        function grid_update(){
            $('#js-list-view').addClass('list_mosaic one_third_list').removeClass('list_full');
            // $('#js-list-view').find('.thumb img').attr({'width': '190', 'height': '190'});
            $('#js-list-view').find('#js-list-view .block')
                .mouseenter(function(){
                    $(this)
                        .css('background-color','#FFEA97')
                        //.find('.thumb').hide()
                        .css('z-index','-1');
                })
                .mouseleave(function(){
                    $(this)
                        .css('background-color','#f5f5f5')
                        //.find('.thumb').show()
                        .css('z-index','1');
                });
            $('#js-list-view').find('#js-list-view .block').click(function(){
                location.href=$(this).find('h2 a').attr('href');
            });
            $.cookie('mode','list_mosaic one_third_list');
        }

        function list_update(){
            $('#js-list-view').addClass('list_full').removeClass('list_mosaic one_third_list');
            $('#js-list-view').find('#js-list-view .block').removeAttr('style').unbind('mouseenter').unbind('mouseleave');
            // $('#js-list-view').find('.thumb img').attr({'width': '290', 'height': '290'});
            $.cookie('mode', 'list_full');
        }
    })
})(jQuery)