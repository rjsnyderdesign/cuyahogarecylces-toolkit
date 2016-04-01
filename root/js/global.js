/*
 * Cuyahoga County Solid Waste District
 * CuyahogaRecycles.org
 *
 * Global JS
 */

;( function ( window, $ ) {

    //
    // Functions
    //

    function roundUp ( w, cols ) { return w + cols - w % cols; }

    //
    // Init
    //

    $( window.document.body ).ready( function () {

        var $grid       = $( '.grid' ),
            $gridSizer  = $('#grid-sizer'),
            shuffleOpts = {
                speed: 1,
                easing: 'ease-out',
                itemSelector: '.grid-cell',
                gutterWidth: 0,
                columnWidth: function () { return $gridSizer.width(); },
                buffer: 0.01,
                throttleTime: 250,
                sequentialFadeDelay: 150,
                supported: false
            };

        //
        // Events
        //

        $( window ).resize( function () {
            // var cols;
            // if ( true ) {
            //     cols = 3;
            // } else if ( true ) {
            //     cols = 2;
            // } else {
            //     cols = 1;
            // }
            // $grid.width( roundUp ( $grid.width(), cols ) );
        } );

        //
        // SlidePanel
        //

        var sliderPanelCalendar = $( '#panel-calendar' ).slideReveal( {
            width: 480,
            push: true,
            position: 'right',
            speed: 300,
            trigger: $( '.action-open-calendar' ),
            push: true,
            overlay: true
        } );

        var sliderPanelNewsletters = $( '#panel-newsletters' ).slideReveal( {
            width: 480,
            push: true,
            position: 'right',
            speed: 300,
            trigger: $( '.action-open-newsletters' ),
            push: true,
            overlay: true
        } );
				
				

	        var sliderPanelMenu = $( '#panel-menu' ).slideReveal( {
	            width: 300,
	            position: 'left',
	            speed: 300,
	            trigger: $( '.action-open-menu' ),
	            push: true,
	            overlay: true,
							hidden: function(slider, trigger){
								// Close Sub Menu's when menu is hidden
								$("#panel-menu .dropdown").find('.trigger').removeClass('selected');
								$("#panel-menu .dropdown").find('.sub-menu').hide();
							  },
								hide: function(slider, trigger){
									$( '#panel-community' ).slideReveal("hide");
								}
	        } );
				if(window.innerWidth > 767) {
	        var sliderPanelCommunity = $( '#panel-community' ).slideReveal( {
	            width: 300,
	            position: 'left',
	            speed: 300,
	            trigger: $( '.action-open-community' ),
	            push: true,
	            overlay: true
	        } );
				}
				else {
		      var sliderPanelMenu = $( '#panel-community' ).slideReveal( {
		          width: 300,
		          position: 'left',
		          speed: 300,
		          trigger: $( '.action-open-community' ),
		          push: false,
		          overlay: false
		      } );
				}

        // Remove extra overlays
        while ( $( '.slide-reveal-overlay' ).length > 1 ) {
            $( '.slide-reveal-overlay' ).eq( 0 ).remove();
        }

        //
        // What Do I Do With?
        //

        $( '.wdidw-show' ).on( 'click', function () {
          $( '.wdidw-search-bar' ).addClass( 'active' );
        } );

        $( '.wdidw-hide' ).on( 'click', function () {
          $( '.wdidw-search-bar' ).removeClass( 'active' );
        } );
				
				
				//
				// Mega Menu + Sub Menus
				//
				
				$(".mega-menu .dropdown-menu a.trigger").on("click",function(e){	
					var current=$(this).next();
					var grandparent=$(this).parent().parent();
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
						grandparent.find('li > a.trigger').removeClass('selected');
					}
					else {
						grandparent.find('li > a.trigger').removeClass('selected');
						$(this).addClass('selected');
					}
					grandparent.find(".sub-menu:visible").not(current).hide();
					current.toggle();
					e.preventDefault()
					e.stopPropagation();
				});
	
				$(".mega-menu .dropdown-menu > li > a:not(.trigger)").on("click",function(){
					var root=$(this).closest('.dropdown');
					$('.trigger').removeClass('selected');
					root.find('.sub-menu:not(.first)').hide();
				});
				
	/*
				$('.dropdown').on('hide.bs.dropdown', function () {
				  $('.dropdown').find('.sub-menu:not(.first)').hide();
					$('.dropdown').find('li > a.trigger').removeClass('selected');
				})*/
				
				//
				// New Mega Menu (Hover)
				//
				
				var megaMenu = {
					init: function() {
						var that = this;
						$('.navbar-primary li a').hover(function() {
							that.enter(this);
						}, function() {
							that.exit(this);
						});
						/*
						$('.navbar-primary li a').hoverIntent({
							over: function() {
								that.enter(this);
							},
							out: function() {
								that.exit(this);
							}						
						});
						*/						
					},
					
					menu: $('.mega-menu'),
					currentItem: null,
					nextItem: null,
					enter: function(el){
						var elClass = $(el).attr("class");
						$(el).parent().addClass('selected');
						$('.'+ elClass + '-sub').stop().slideDown(400);
						$('.'+ elClass + '-sub').hover(function() {
							$(this).stop().slideDown(400);
						}, function() {
							$(this).stop().slideUp(400);
						  $(this).find('.sub-menu:not(.first)').hide();
							$(this).find('li > a.trigger').removeClass('selected');
						});		
					},
					exit: function(el){
						var elClass = $(el).attr("class");
						$(el).parent().removeClass('selected');
						$('.'+ elClass + '-sub').stop().slideUp(400);
					  $('.'+ elClass + '-sub').find('.sub-menu:not(.first)').hide();
						$('.'+ elClass + '-sub').find('li > a.trigger').removeClass('selected');
					}
				};
				megaMenu.init();
	
	
				//
				// Mobile Menu + Sub Menus
				//
				$("#panel-menu .dropdown a.trigger").on("click",function(e){	
					var current = $(this).next();			
					var grandparent = $(this).parent().parent();
		
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
						if($(this).parent().hasClass('dropdown')) {
							grandparent = $(this).parent();
						}
						grandparent.find('li > a.trigger').removeClass('selected');
						grandparent.find(".sub-menu:visible").not(current).slideUp(400);
						current.slideUp(400);
			
					}
					else {
						$(this).addClass('selected');
						current.slideDown(400);
					}

					e.preventDefault()
					e.stopPropagation();
				});
				$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
					var root=$(this).closest('.dropdown');
					$('.trigger').removeClass('selected');
					root.find('.sub-menu:not(.first)').slideUp(400);
				});
	
				var closeMobileDropdown = function() {
					$("#panel-menu .dropdown").find('.trigger').removeClass('selected');
					$("#panel-menu .dropdown").find('.sub-menu').hide();
				};
				
			
				
				//
				// Header Search
				//
				
				$(".search-container label").on("click",function(e){
					$('.sb-search').addClass('sb-search-open');
					$('.sb-search-input').focus();
					e.preventDefault()
					e.stopPropagation();
				});
				

    } );

} )( window, jQuery );
